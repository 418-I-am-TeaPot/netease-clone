import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Avatar } from "@taroify/core";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import { usePlaylistStore } from "@/store/playlist";
import NCPlaylist from "@/components/NCPlaylist";

export default function Me() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const editProfile = () => {
    Taro.navigateTo({ url: "/pages/profile/index" });
  };

  return (
    <View className="me">
      <Avatar onClick={editProfile}>P</Avatar>
      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );
}
