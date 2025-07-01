import { Song } from "@/models/song";
import { create } from "zustand";
import { usePlayerStore } from "./player";
interface PlaylistState {
  playlistOpen: boolean;
  togglePlaylist: () => void;
  playlistData: Song[];
  setPlaylistData: (playlist: Song[]) => void;
  currentItemIndex: number;
  setCurrentItemIndex: (newIndex: number) => void;
  playPrevSong: () => void;
  playNextSong: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlistOpen: false,
  togglePlaylist: () => set((state) => ({ playlistOpen: !state.playlistOpen })),
  playlistData: [],
  setPlaylistData: (playlist) => set({ playlistData: playlist }),
  currentItemIndex: 0,
  setCurrentItemIndex: (newIndex) => set({ currentItemIndex: newIndex }),
  playPrevSong: () => {
    const { playlistData, currentItemIndex } = get();
    const newIndex =
      currentItemIndex === 0 ? playlistData.length - 1 : currentItemIndex - 1;

    set({ currentItemIndex: newIndex });

    const prevSong = playlistData[newIndex];
    const player = usePlayerStore.getState();
    player.setSong(prevSong);
    player.resume();
  },
  playNextSong: () => {
    const { playlistData, currentItemIndex } = get();
    const newIndex = (currentItemIndex + 1) % playlistData.length;

    set({ currentItemIndex: newIndex });

    const nextSong = playlistData[newIndex];
    const player = usePlayerStore.getState();
    player.setSong(nextSong);
    player.resume();
  },
}));
