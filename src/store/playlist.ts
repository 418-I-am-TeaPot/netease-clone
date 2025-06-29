import { Song } from "@/models/song";
import { create } from "zustand";
interface PlaylistState {
  playlistOpen: boolean;
  togglePlaylist: () => void;
  playlistData: Song[];
  setPlaylistData: (playlist: Song[]) => void;
  currentItemIndex: number;
  setCurrentItemIndex: (newIndex: number) => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlistOpen: false,
  togglePlaylist: () => set((state) => ({ playlistOpen: !state.playlistOpen })),
  playlistData: [],
  setPlaylistData: (playlist) => set({ playlistData: playlist }),
  currentItemIndex: -1,
  setCurrentItemIndex: (newIndex) => set({ currentItemIndex: newIndex }),
}));
