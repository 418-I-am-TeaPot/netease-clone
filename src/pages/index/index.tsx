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
import { useState, useRef } from "react";
import { useSearch } from "../search/useSearch";
import { User } from "@/models/user";

export default function Index() {
  const user: User = {openid: "1", name: "alan", bio: "我是alan", avatarUrl: "syljbh00m.hd-bkt.clouddn.com/8ae0c571-e5dc-41a2-a534-ba653c54bb75.jpg", registeredAt: 1751163646102, gender: 1};

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
      
      <View>
        <SongListHorizental
          user={user}
        />
      </View>

      <View className="liberaryTitle">
        {"全部歌曲"}
      </View>

      <View style="
        width: 90%;
        margin-left: 5%;">
        <SongListVertical
          user = {user}
          search= {""}
        />
      </View>
      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );
}
