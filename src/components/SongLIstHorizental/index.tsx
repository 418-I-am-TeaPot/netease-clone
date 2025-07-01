import { ScrollView, View } from "@tarojs/components";
import "./indexSLH.scss";
import SongContainerHorizental from "../SongContainerHorizental";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";
import { Toast } from "@taroify/core";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/service/config";

export default function SongListHorizental({ user }) {
  const {
    playlistData,
    setPlaylistData,
    currentItemIndex,
    setCurrentItemIndex,
  } = usePlaylistStore();
  const { setSong, currentSong, resume } = usePlayerStore();

  const [items, setItems] = useState<Song[]>([]);

  const requestWithLoading = async () => {
    try {
      Taro.showLoading({
        title: "加载中",
        mask: true, // 添加遮罩防止触摸穿透
      });

      const response = await Taro.request({
        url: BASE_URL + "/songs",
        method: "GET",
        header: {
          "content-type": "application/json",
          Accept: "application/json",
          openid: user.openid,
        },
        success: (res) => {
          setItems(res.data.data.slice(0, 10));
        },
        fail: (err) => {
          Taro.showToast({
            title: "加载歌曲失败，请稍后重试",
            icon: "none",
            duration: 2000,
          });
        },
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      Taro.hideLoading();
    }
  };

  useEffect(() => {
    requestWithLoading();
  }, []);

  const handleItemClick = (song: Song) => {
    if (currentSong?.songId == song.songId) {
      Taro.navigateTo({ url: "/pages/player/index" });
      return;
    }
    let playlist: Song[] = playlistData;
    let flag = false;
    for (let i = 0; i < playlistData.length; i++) {
      if (playlistData[i].songId == song.songId) {
        setCurrentItemIndex(i);
        flag = true;
        break;
      }
    }
    if (!flag) {
      playlist.splice(currentItemIndex + 1, 0, song);
      setCurrentItemIndex(currentItemIndex + 1);
    }
    setPlaylistData(playlist);
    setSong(song);
    resume();
  };

  if (!items || items == undefined || items.length == 0)
    return (
      <View
        style="
            width: 100%;
            margin-top: 40px;
            text-align: center;
            font-size: 30px;
            color: #444444;"
      >
        {"暂无数据"}
      </View>
    );

  return (
    <ScrollView scrollX showScrollbar={false}>
      <View className="containerSLH">
        {items.map((item: Song) => (
          <SongContainerHorizental
            imgUrl={item.coverUrl}
            title={item.name}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
