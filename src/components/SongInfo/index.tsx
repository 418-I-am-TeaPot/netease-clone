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
    <View onClick={showLyricsCb} className="songInfo container-v grow">
      {/* 封面信息 */}
      <View
        style={{ justifyContent: "center", height: "80%" }}
        className="songImg container-h grow"
      >
        <Image
          width={600}
          height={600}
          className="border"
          lazyLoad
          src={currentSong?.coverUrl || "https://img.yzcdn.cn/vant/cat.jpeg"}
          shape="circle"
          placeholder={<Loading />}
          fallback={
            <text style={{ marginTop: "40%" }}>failed loading image</text>
          }
        />
      </View>
      {/* 歌曲信息与收藏功能 */}
      <View className="songDetail  container-h grow">
        <View className="container-v">
          <Text>歌手：{currentSong?.name || "unknowed"}</Text>
          <Text>歌名：{currentSong?.artists || "unknowed"}</Text>
        </View>
        {isLike ? (
          <Like onClick={handleLike} size={20} />
        ) : (
          <LikeOutlined onClick={handleLike} size={20} />
        )}
      </View>
    </View>
  );
}
