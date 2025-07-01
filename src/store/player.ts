import { Song } from "@/models/song";
import Taro from "@tarojs/taro";
import { InnerAudioContext } from "@tarojs/taro";
import { create } from "zustand";
import { usePlaylistStore } from "./playlist";

const innerAudioContext = Taro.createInnerAudioContext();

interface PlayerState {
  currentSong: Song | null;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  setSong: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  player: InnerAudioContext | null;
  isLike: boolean;
  setIsLike: () => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => {
  const player = innerAudioContext;
  const playlist = usePlaylistStore.getState();

  player.onPlay(() => {
    console.log("开始播放");
  });
  player.onPause(() => {
    console.log("暂停播放");
  });
  player.onError((res) => {
    console.log(res);
  });
  // 时间更新：设置 currentTime 全局状态
  player.onTimeUpdate(() => {
    set({ currentTime: player.currentTime });
    console.log("buffered", player.buffered);
  });
  // 用于调试：自动播放
  player.onCanplay(() => {
    //player.play();
    //set({ playing: true });
  });
  player.onEnded(() => {
    playlist.playNextSong();
  });

  return {
    player,
    currentSong: null,
    playing: false,
    setPlaying: (playing) => set({ playing }),
    setSong: (song) => {
      player.src = `http://music.163.com/song/media/outer/url?id=${song.songId}.mp3`; // 设置播放器音频源
      return set({ currentSong: song, currentTime: 0 });
    },

    pause: () => {
      player.pause();
      return set({ playing: false });
    },
    resume: () => {
      player.play();
      return set({ playing: true });
    },
    isLike: false,
    setIsLike: () => set((state) => ({ isLike: !state.isLike })),
    currentTime: 0,
    setCurrentTime: (time) => set({ currentTime: time }),
  };
});
