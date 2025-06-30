import { create } from "zustand";
import { User } from "../models/user";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user) => {
    set({ user: user });
  },
}));
