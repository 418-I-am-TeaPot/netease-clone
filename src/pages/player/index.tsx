import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Player() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="player">
      <Text>歌曲播放器</Text>
    </View>
  );
}
