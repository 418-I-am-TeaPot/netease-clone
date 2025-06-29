import { Search } from "@taroify/core";
import { View, ScrollView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import NCPlaylist from "@/components/NCPlaylist";
import { usePlaylistStore } from "@/store/playlist";
import SongListVertical from "@/components/SongLIstVertical";
import SongListHorizental from "@/components/SongLIstHorizental";
import { useState, useRef } from "react";
import { useSearch } from "../search/useSearch"; 
import { title } from "process";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const searchRef = useRef<any>(null);

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const items = [
    {
      imgUrl: "https://p1.music.126.net/FcsrgetFoSqZmxRjkBh6BA==/109951169522292175.jpg?param=200y200",
      title: "Viyella's Memory",
      artist: "123",
      id: "123456"
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: "1234567"
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: "1234567"
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: "1234567"
    },
    {
      imgUrl: "../../assets/icons/tab/vault.png",
      title: "87654321",
      artist: "321",
      id: "1234567"
    },
    {
      imgUrl: "https://p1.music.126.net/FcsrgetFoSqZmxRjkBh6BA==/109951169522292175.jpg?param=200y200",
      title: "87654321",
      artist: "321",
      id: "1234567"
    }
  ]

  const [showOverlay, setShowOverlay] = useState(false);

  const handleSearchClick = () => {
    setShowOverlay(true);
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    setShowOverlay(false);
  };

  // 阻止遮罩层下的所有触摸事件
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const { textInput, setTextInput } = useSearch();

  const handleSearch = () => {
      Taro.navigateTo({ url: `/pages/search-result/index?q=${textInput}` });
    };

  const handleCancel = (e) => {
    if (searchRef.current) {
      searchRef.current.clear();
    }
  }

  return (
    <View className="index">
      <Search className="searchIndex" placeholder="搜索曲目" 
        onClick={handleSearchClick}
        value={textInput}
        onChange={(e) => setTextInput(e.detail.value)}
        onSearch={handleSearch}
        onCancel={handleCancel}/>

      {showOverlay && (
        <View 
          className='overlayIndex' 
          onClick={handleOverlayClick}
          onTouchMove={handleTouchMove}
          catchMove
        >
        </View>
      )}

      <View className="recommendTitle">
        {"推荐曲目"}
      </View>
      
      <View>
        <SongListHorizental
          items={items}
        />
      </View>

      <View className="liberaryTitle">
        {"全部歌曲"}
      </View>

      <View style="
        width: 90%;
        margin-left: 5%;">
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
