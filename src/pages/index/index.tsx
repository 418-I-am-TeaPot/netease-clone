import { Search } from "@taroify/core";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import NCPlaylist from "@/components/NCPlaylist";
import { usePlaylistStore } from "@/store/playlist";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const handleSearch = () => {
    Taro.navigateTo({ url: "/pages/search/index" });
  };

  return (
    <View className="index">
      <Search placeholder="搜索曲目" onClick={handleSearch} />
      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );
}
