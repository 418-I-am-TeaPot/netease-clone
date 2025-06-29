import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";
import NCLyricsView from "@/components/NCLyricsView";
import PlayerControls from "@/components/PlayerControls";
import SongInfo from "@/components/SongInfo";

export default function Player() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <View
      className="player container-v grow"
      style={{ height: "100vh" }}
      disableScroll
    >
      <View
        onClick={() => setShowLyrics((prev) => !prev)}
        className="container"
        style={{ height: "70%" }}
      >
        {showLyrics ? <NCLyricsView /> : <SongInfo />}
      </View>
      <View className="container" style={{ height: "20%" }}>
        <PlayerControls />
      </View>
    </View>
  );
}
