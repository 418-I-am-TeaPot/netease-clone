import { Song } from "@/models/song";
import Taro from "@tarojs/taro";
import { InnerAudioContext } from "@tarojs/taro";
import { create } from "zustand";
const innerAudioContext = Taro.createInnerAudioContext();
innerAudioContext.src = "";
innerAudioContext.onPlay(() => {
  console.log("开始播放");
});
innerAudioContext.onPause(() => {
  console.log("暂停播放");
});
innerAudioContext.onError((res) => {
  console.log(res);
});

interface PlayerState {
  currentSong: Song | null;
  playing: boolean;
  setSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  player: InnerAudioContext | null;
  isLike: Boolean;
  setIsLike: () => void;
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
  player: innerAudioContext || null,
  isLike: false,
  setIsLike: () => set((state) => ({ isLike: !state.isLike })),
}));
