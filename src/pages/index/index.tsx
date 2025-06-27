import { Search } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import NCMiniPlayer from "@/components/NCMiniPlayer";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleSearch = () => {
    Taro.navigateTo({ url: "/pages/search/index" });
  };

  return (
    <View className="index">
      <Search placeholder="搜索曲目" onClick={handleSearch} />
      <NCMiniPlayer />
    </View>
  );
}
