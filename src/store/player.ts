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
  setSong: (song: Song | null) => void;
  pause: () => void;
  resume: () => void;
  player: InnerAudioContext | null;
  setIsLike: () => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  canPlay: boolean;
  setCanPlay: (state: boolean) => void;
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
  });
  player.onEnded(() => {
    playlist.playNextSong();
  });
  player.onCanplay(() => {
    set({ canPlay: true });
  });

  return {
    player,
    currentSong: null,
    playing: false,
    setPlaying: (playing) => set({ playing }),
    setSong: (song) => {
      if (!song) return;
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

    setIsLike: () => {
      const { setSong, currentSong } = get();
      if (currentSong)
        setSong({ ...currentSong, isLike: !currentSong?.isLike });
    },
    currentTime: 0,
    setCurrentTime: (time) => set({ currentTime: time }),
    canPlay: false,
    setCanPlay: (state) => set({ canPlay: state }),
  };
});
