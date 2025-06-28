// components/MiniPlayer/index.tsx
import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { Image } from "@taroify/core";
import pauseIcon from "@/assets/icons/player/pause-sm.png";
import playIcon from "@/assets/icons/player/play-sm.png";
import playlistIcon from "@/assets/icons/player/playlist-sm.png";
import cover from "@/assets/images/cover.png";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";

export default function NCMiniPlayer() {
  const { togglePlay, playing } = usePlayerStore();
  const { togglePlaylist } = usePlaylistStore();

  const openPlayer = () => {
    Taro.navigateTo({ url: "/pages/player/index" });
  };

  return (
    <View className="mini-player container-h">
      <View className="container cover-container" onClick={openPlayer}>
        <Image className="cover" height={60} width={60} src={cover} />
      </View>
      <View
        className="grow song-title-container container-h"
        onClick={openPlayer}
      >
        <Text className="song-title">Song title</Text>
        <Text className="singer">{` - ${"singer"}`}</Text>
      </View>
      <View className="icon-container container">
        <Image
          height={52}
          width={52}
          src={playing ? pauseIcon : playIcon}
          onClick={togglePlay}
        />
        <Image
          height={52}
          width={52}
          src={playlistIcon}
          onClick={togglePlaylist}
        />
      </View>
    </View>
  );
}
