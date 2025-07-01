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
  currentItemIndex: -1,
  setCurrentItemIndex: (newIndex) => set({ currentItemIndex: newIndex }),
  playPrevSong: () => {
    const { playlistData, currentItemIndex } = get();
    const playerStore = usePlayerStore.getState();

    playerStore.setCanPlay(false);
    playerStore.player?.stop();

    const newIndex =
      currentItemIndex === 0 ? playlistData.length - 1 : currentItemIndex - 1;
    set({ currentItemIndex: newIndex });
    const prevSong = playlistData[newIndex];

    playerStore.setSong(prevSong);
    playerStore.player?.seek(0);
    playerStore.resume();
  },
  playNextSong: () => {
    const { playlistData, currentItemIndex } = get();
    const playerStore = usePlayerStore.getState();

    playerStore.setCanPlay(false);

    const newIndex = (currentItemIndex + 1) % playlistData.length;
    set({ currentItemIndex: newIndex });
    const nextSong = playlistData[newIndex];

    playerStore.setSong(nextSong);
    playerStore.player?.seek(0);
    playerStore.resume();
  },
}));
