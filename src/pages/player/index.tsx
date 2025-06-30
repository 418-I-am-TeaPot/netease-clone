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

  const showLyricsCallback = () => {
    setShowLyrics((prev) => !prev);
  };

  return (
    <View
      className="player container-v grow"
      style={{ height: "100vh" }}
      disableScroll
    >
      <View className="container" style={{ height: "70%" }}>
        {showLyrics ? (
          <NCLyricsView showLyricsCb={showLyricsCallback} />
        ) : (
          <SongInfo showLyricsCb={showLyricsCallback} />
        )}
      </View>
      <View className="container" style={{ height: "20%" }}>
        <PlayerControls />
      </View>
    </View>
  );
}
