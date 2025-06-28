import { create } from "zustand";

interface PlaylistState {
  playlistOpen: boolean;
  togglePlaylist: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlistOpen: false,
  togglePlaylist: () => set((state) => ({ playlistOpen: !state.playlistOpen })),
}));
