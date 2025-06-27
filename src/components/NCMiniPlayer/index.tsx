// components/MiniPlayer/index.tsx
import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";

export default function NCMiniPlayer() {
  const openPlayer = () => {
    Taro.navigateTo({ url: "/pages/player/index" });
  };

  return (
    <View className="mini-player" onClick={openPlayer}>
      <View className="info">
        <Text className="title">{"asdf"}</Text>
        <Text className="artist">{"Asdf"}</Text>
      </View>
    </View>
  );
}
