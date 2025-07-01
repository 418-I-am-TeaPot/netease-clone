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
import { useState, useRef, useEffect } from "react";
import { useSearch } from "../search/useSearch";
import { User } from "@/models/user";
import { useUserStore } from "@/store/user";

export default function Index() {
  const { user } = useUserStore();

  const [ loadStart, setLoadStart] = useState(false);

  useEffect(() => {
    if(user) {
      setLoadStart(true);
    }
  },[user]);

  useLoad(() => {
    console.log("Page loaded.");
  });

  const searchRef = useRef<any>(null);

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

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
      
      {loadStart && <View>
        <SongListHorizental
          user={user}
        />
      </View>}

      <View className="liberaryTitle">
        {"全部歌曲"}
      </View>

      {loadStart && <View style="
        width: 90%;
        margin-left: 5%;">
        <SongListVertical
          user = {user}
          search= {""}
        />
      </View>}
      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );
}
