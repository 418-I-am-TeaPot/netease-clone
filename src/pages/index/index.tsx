import { Search } from "@taroify/core";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import NCPlaylist from "@/components/NCPlaylist";
import { usePlaylistStore } from "@/store/playlist";
import SongListVertical from "@/components/SongLIstVertical";
import SongListHorizental from "@/components/SongLIstHorizental";
import { useState } from "react";
import { title } from "process";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const handleSearch = () => {
    Taro.navigateTo({ url: "/pages/search/index" });
  };

  const items = [
    {
      imgUrl: "https://p1.music.126.net/FcsrgetFoSqZmxRjkBh6BA==/109951169522292175.jpg?param=200y200",
      title: "Viyella's Memory",
      artist: "123",
      id: 123456
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: 1234567
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: 1234567
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: 1234567
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: 1234567
    },
    {
      imgUrl: "https://p1.music.126.net/FcsrgetFoSqZmxRjkBh6BA==/109951169522292175.jpg?param=200y200",
      title: "87654321",
      artist: "321",
      id: 1234567
    }
  ]

  return (
    <View className="index">
      <Search placeholder="搜索曲目" onClick={handleSearch} />

      <View>
        <SongListHorizental
          items={items}
        />
      </View>

      <View style="
        width: 80%;
        margin-left: 10%;">
        <SongListVertical
          items={items}
          search={""}
        />
      </View>
      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );
}
