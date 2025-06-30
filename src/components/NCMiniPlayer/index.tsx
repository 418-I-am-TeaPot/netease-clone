// components/MiniPlayer/index.tsx
import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { Image, NoticeBar } from "@taroify/core";
import pauseIcon from "@/assets/icons/player/pause-sm.png";
import playIcon from "@/assets/icons/player/play-sm.png";
import playlistIcon from "@/assets/icons/player/playlist-sm.png";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";

export default function NCMiniPlayer() {
  const { playing, currentSong, resume, pause } = usePlayerStore();
  const { togglePlaylist } = usePlaylistStore();

  const openPlayer = () => {
    Taro.navigateTo({ url: "/pages/player/index" });
  };

  const handlePlayAndPause = () => {
    playing ? pause() : resume();
  };

  return (
    <View className="mini-player container-h">
      <View className="container cover-container" onClick={openPlayer}>
        <Image
          className="cover"
          height={60}
          width={60}
          src={currentSong?.coverUrl}
        />
      </View>
      <NoticeBar
        speed={40}
        onClick={openPlayer}
        className="container-h grow"
        style={{ backgroundColor: "rgba(250, 252, 255, 0.8)" }}
        scrollable
      >
        <View className="line-wrapper">
          <Text className="song-title">{currentSong?.name}</Text>
          <Text className="singer">{` - ${currentSong?.artists}`}</Text>
        </View>
      </NoticeBar>
      <View className="icon-container container">
        <Image
          height={52}
          width={52}
          src={playing ? pauseIcon : playIcon}
          onClick={handlePlayAndPause}
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
