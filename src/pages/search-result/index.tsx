import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { Search } from "@taroify/core";
import { useSearch } from "../search/useSearch";
import { useState, useRef } from "react";
import "./index.scss";
import SongListVertical from "@/components/SongLIstVertical";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import NCPlaylist from "@/components/NCPlaylist";
import { usePlaylistStore } from "@/store/playlist";
import { User } from "@/models/user";
import { useUserStore } from "@/store/user";
import { PullRefresh } from "@taroify/core";
import { usePageScroll } from "@tarojs/taro";

export default function SearchResult() {
  const { user } = useUserStore();

  const [searchKey, setSearchKey] = useState<string>("");

  const searchRef = useRef<any>(null);

  useLoad((options: Record<string, string>) => {
    if (!options.q) return;
    Taro.setNavigationBarTitle({ title: options.q });
    setSearchKey(options.q);
    setTextInput(options.q);
  });

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
    setTextInput("");
  };

  const { textInput, setTextInput } = useSearch();

  const handleSearch = () => {
      Taro.setNavigationBarTitle({ title: textInput});
      setSearchKey(textInput);
    };

  const handleCancel = () => {
    if (searchRef.current) {
      searchRef.current.clear();
    }
  }

  const { playlistOpen, togglePlaylist } = usePlaylistStore();
    
  const [pullLoading, setPullLoading] = useState(false)
  const [reachTop, setReachTop] = useState(true)
  const [reload, setReload] = useState(true)
  
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))
  
  return (
    <PullRefresh
      loading = {pullLoading}
      reachTop = {reachTop}
      onRefresh={() => {
        console.log(reload);
        setPullLoading(true);
        setReload(!reload);
        setTimeout(() => {
          setPullLoading(false);
        }, 1000)
      }}>
      <Search className="searchSR" placeholder="搜索曲目" 
        onClick={handleSearchClick}
        value={textInput}
        onChange={(e) => setTextInput(e.detail.value)}
        onSearch={handleSearch}
        onCancel={handleCancel}/>

      {showOverlay && (
        <View 
          className='overlaySR' 
          onClick={handleOverlayClick}
          onTouchMove={handleTouchMove}
          catchMove
        >
        </View>
      )}

      <View className="resultNum">
      </View>
       <View style="
        width: 90%;
        margin-left: 5%;">
          <SongListVertical
            user={user}
            search={searchKey}
            useSearch={true}
            reload={reload}
          />
      </View> 
      {/* <View style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 100,
        marginBottom: 50,
        paddingBottom: 50,
        backgroundColor: "black"
      }}> */}
        <NCMiniPlayer />
        <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
      {/* </View> */}
    </PullRefresh>
    
  );
}
