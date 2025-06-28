import { Song } from "@/models/song";
import { create } from "zustand";

interface PlayerState {
  currentSong: Song | null;
  playing: boolean;
  setSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  playing: false,
  setSong: (song) =>
    set({
      currentSong: song,
      playing: true,
    }),
  togglePlay: () => set((state) => ({ playing: !state.playing })),
  pause: () => set({ playing: false }),
  resume: () => set({ playing: true }),
}));
