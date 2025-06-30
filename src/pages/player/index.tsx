import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";
import NCLyricsView from "@/components/NCLyricsView";
import PlayerControls from "@/components/PlayerControls";
import SongInfo from "@/components/SongInfo";
import { usePlayerStore } from "@/store/player";
export default function Player() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [showLyrics, setShowLyrics] = useState(false);
  const { currentSong } = usePlayerStore();

  const showLyricsCallback = () => {
    setShowLyrics((prev) => !prev);
  };

  return (
    <View
      className="player container-v grow"
      style={{
        backgroundImage: `url(${currentSong?.coverUrl})`,
      }}
      disableScroll
    >
      <View className="glass-cover"></View>
      <View className="container" style={{ height: "75%" }}>
        {showLyrics ? (
          <NCLyricsView showLyricsCb={showLyricsCallback} />
        ) : (
          <SongInfo showLyricsCb={showLyricsCallback} />
        )}
      </View>
      <View className="container" style={{ height: "25%" }}>
        <PlayerControls />
      </View>
    </View>
  );
}
