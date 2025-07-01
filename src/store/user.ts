import { create } from "zustand";
import {
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from "@tarojs/taro";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../models/user";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user: user });
      },
    }),
    {
      name: "user_cache",
      storage: createJSONStorage(() => ({
        getItem: (key) => getStorageSync(key),
        setItem: (key, value) => setStorageSync(key, value),
        removeItem: (key) => removeStorageSync(key),
      })),
    }
  )
);
