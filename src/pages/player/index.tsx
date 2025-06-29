import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";
import NCLyricsView from "@/components/NCLyricsView";

export default function Player() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [showLyrics, setShowLyrics] = useState(true);

  return (
    <View
      className="player container-v grow"
      style={{ height: "100%" }}
      disableScroll
    >
      <View
        onClick={() => {
          setShowLyrics((prev) => !prev);
        }}
        className="container grow"
        style={{ height: "75%" }}
      >
        {showLyrics ? (
          <NCLyricsView />
        ) : (
          <View className="container grow" style={{ backgroundColor: "pink" }}>
            {/* 封面 + 信息 */}
          </View>
        )}
      </View>
      {/* 滚动歌词 */}

      {/* 播放控件 */}
      <View
        className="container"
        style={{
          height: "25%",
          backgroundColor: "pink",
        }}
      ></View>
    </View>
  );
}
