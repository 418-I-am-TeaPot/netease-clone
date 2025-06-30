import { PropsWithChildren, useEffect } from "react";
import { useLaunch } from "@tarojs/taro";

import "./app.scss";
import { usePlayerStore } from "./store/player";
import { MOCK_SONGS } from "./constants/songs";
import { usePlaylistStore } from "./store/playlist";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  const { setSong } = usePlayerStore();
  const { playlistData, setPlaylistData } = usePlaylistStore();

  // 初始化播放列表
  useEffect(() => {
    setPlaylistData(MOCK_SONGS);
  }, []);

  // 播放列表有数据之后，将播放列表的第一首歌设置为 currentSong
  useEffect(() => {
    if (!playlistData.length) return;
    setSong(playlistData[0]);
  }, [playlistData]);

  // children 是将要会渲染的页面
  return children;
}

export default App;
