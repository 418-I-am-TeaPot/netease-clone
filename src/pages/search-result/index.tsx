import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { Search } from "@taroify/core";
import { useSearch } from "../search/useSearch";
import { useState, useRef } from "react";
import "./index.scss";
import SongListVertical from "@/components/SongLIstVertical";

export default function SearchResult() {
  const [items, setItems] = useState<{id:string, artist:string, title: string, imgUrl: string}[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [resultNum, setResultNum] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<any>(null);

  useLoad((options: Record<string, string>) => {
    if (!options.q) return;
    Taro.setNavigationBarTitle({ title: options.q });
    setSearchKey(options.q);
    setTextInput(options.q);
    const newItem = [
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
    setItems(newItem)
    setResultNum(newItem.length);
    setLoading(true);
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
      Taro.navigateTo({ url: `/pages/search-result/index?q=${textInput}` });
    };

  const handleCancel = () => {
    if (searchRef.current) {
      searchRef.current.clear();
    }
  }
    
  return (
    <View>
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

      {loading && <View className="resultNum">
        搜索到{resultNum}个结果
      </View>}
      {loading && <View style="
        width: 90%;
        margin-left: 5%;">
          <SongListVertical
            items={items}
            search={searchKey}
            loadingMore={false}
          />
      </View>}
    </View>
  );
}
