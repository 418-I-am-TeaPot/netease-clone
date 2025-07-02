import { Text, View } from "@tarojs/components";
import { Image, Loading } from "@taroify/core";
import { Like, LikeOutlined } from "@taroify/icons";
import { usePlayerStore } from "@/store/player";

import "./index.scss";
import Taro from "@tarojs/taro";
import { BASE_URL } from "@/service/config";
import { useUserStore } from "@/store/user";
import { usePlaylistStore } from "@/store/playlist";

interface SongInfoProps {
  showLyricsCb: () => void;
}

export default function SongInfo({ showLyricsCb }: SongInfoProps) {
  const { currentSong, setIsLike } = usePlayerStore();
  const { currentItemIndex, playlistData, setPlaylistData } =
    usePlaylistStore();
  const { user } = useUserStore();

  const handleLike = () => {
    if (currentSong?.isLike) {
      Taro.request({
        url: `${BASE_URL}/user/favorites/${currentSong?.songId}`,
        method: "DELETE",
        header: {
          "content-type": "application/json",
          openid: user?.openid,
        },
        success: function (res) {
          console.log(res.data);
          setIsLike();
          const newlist = playlistData;
          newlist[currentItemIndex].isLike = !newlist[currentItemIndex].isLike;
          setPlaylistData(newlist);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    } else {
      Taro.request({
        url: `${BASE_URL}/user/favorites`,
        method: "POST",
        data: { sid: currentSong?.songId },
        header: {
          "content-type": "application/json",
          openid: user?.openid,
        },
        success: function (res) {
          console.log(res.data);
          setIsLike();
          const newlist = playlistData;
          newlist[currentItemIndex].isLike = !newlist[currentItemIndex].isLike;
          setPlaylistData(newlist);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    }
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
        {currentSong?.isLike ? (
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
