import { create } from "zustand";
import { User } from "../models/user";

interface PlaylistState {
  user: User | null;
  setUser: (user: User) => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  user: null,
  setUser: (user) => {
    set({ user: user });
  },
}));
