import { Text, View } from "@tarojs/components";
import { Image, Loading } from "@taroify/core";
import { Like, LikeOutlined } from "@taroify/icons";
import { usePlayerStore } from "@/store/player";

import "./index.scss";

interface SongInfoProps {
  showLyricsCb: () => void;
}

export default function SongInfo({ showLyricsCb }: SongInfoProps) {
  const { currentSong, isLike, setIsLike } = usePlayerStore();

  const handleLike = () => {
    setIsLike();
  };

  return (
    <View className="songInfo container-v grow">
      {/* 封面信息 */}
      <View onClick={showLyricsCb} className="songImg container-v grow">
        <Image
          style={{ borderRadius: 8 }}
          height={650}
          width={650}
          mode="aspectFit"
          lazyLoad
          src={currentSong?.coverUrl || "https://img.yzcdn.cn/vant/cat.jpeg"}
          shape="square"
          placeholder={<Loading />}
          fallback={
            <text style={{ marginTop: "40%" }}>failed loading image</text>
          }
        />
      </View>
      {/* 歌曲信息与收藏功能 */}
      <View className="songDetail container-h">
        <View style={{ gap: 2 }} className="container-v">
          <Text className="song-title">{currentSong?.name || "unknowed"}</Text>
          <Text className="song-artist">
            {currentSong?.artists || "unknowed"}
          </Text>
        </View>
        {isLike ? (
          <Like color="rgba(255, 0, 0, 0.7)" onClick={handleLike} size={28} />
        ) : (
          <LikeOutlined
            color="rgba(255, 255, 255, 0.4)"
            onClick={handleLike}
            size={28}
          />
        )}
      </View>
    </View>
  );
}
