import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Avatar } from "@taroify/core";
import NCMiniPlayer from "@/components/NCMiniPlayer";

export default function Me() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const editProfile = () => {
    Taro.navigateTo({ url: "/pages/profile/index" });
  };

  return (
    <View className="me">
      <Avatar onClick={editProfile}>P</Avatar>
      <NCMiniPlayer />
    </View>
  );
}
