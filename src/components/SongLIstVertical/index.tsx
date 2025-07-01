import { View } from "@tarojs/components";
import { List, Loading } from "@taroify/core";
import "./indexSLV.scss";
import { useState, useEffect } from "react";
import SongContainerVertical from "../SongContainerVertical";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";
import Taro from "@tarojs/taro";
import { BASE_URL } from "@/service/config";

export default function SongListVertical({
  user,
  search,
  useSearch = false,
  reload,
}) {
  let url: String;
  let searchkey = search;

  if (useSearch && (!searchkey || searchkey == undefined))
    return (
      <View
        style={{
          width: "100%",
          paddingTop: 20,
          fontSize: 20,
          color: "#444444",
          textAlign: "center",
        }}
      >
        {"没有搜索到歌曲"}
      </View>
    );
  const [items, setItems] = useState<Song[]>([]);
  if (!useSearch) {
    url = BASE_URL + "/songs";
  } else {
    url = BASE_URL + "/songs/search?q=" + searchkey;
  }

  const requestWithLoading = async (url) => {
    try {
      Taro.showLoading({
        title: "加载中",
        mask: true, // 添加遮罩防止触摸穿透
      });
      const response = await Taro.request({
        url: url,
        method: "GET",
        header: {
          "content-type": "application/json",
          Accept: "application/json",
          openid: user.openid,
        },
        success: (res) => {
          setItems(res.data.data);
          if (res.data.data != undefined) {
            let initItems: Song[];
            if (res.data.data.length < 10) initItems = res.data.data;
            else initItems = res.data.data.slice(0, 10);
            setList(initItems);
          } else setList([]);
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
    requestWithLoading(url);
  }, [search, reload]);

  const [hasMore, setHasMore] = useState(true);
  let initItems: Song[];
  if (items.length < 10) initItems = items;
  else initItems = items.slice(0, 10);
  const [list, setList] = useState<Song[]>(initItems);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // 当没有更多数据时显示，2秒后自动隐藏
  useEffect(() => {
    if (!hasMore) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasMore]);

  const {
    playlistData,
    setPlaylistData,
    currentItemIndex,
    setCurrentItemIndex,
  } = usePlaylistStore();
  const { setSong, currentSong, resume } = usePlayerStore();

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
    if (useSearch) Taro.navigateTo({ url: "/pages/player/index" });
  };

  if (!items || items == undefined || items.length == 0)
    return (
      <View
        style={{
          width: "100%",
          paddingTop: 20,
          fontSize: 20,
          color: "#444444",
          textAlign: "center",
        }}
      >
        {useSearch ? "没有搜索到歌曲" : "暂无数据"}
      </View>
    );

  return (
    <View
      style="
            width: 100%;
            display: flex;
            flex-direction: column;
            background-color: #f3f7f9;"
    >
      <List
        style="
            width: 100%;
            flex: 1;"
        loading={loading}
        hasMore={hasMore}
        onLoad={() => {
          setLoading(true);
          setTimeout(() => {
            let length = list.length;
            for (
              let i = length;
              i < (items.length < length + 10 ? items.length : length + 10);
              i++
            ) {
              list.push(items[list.length]);
            }
            setList([...list]);
            setHasMore(list.length < items.length);
            setLoading(false);
          }, 1000);
        }}
      >
        {list.map((item) => (
          <SongContainerVertical
            imgUrl={item.coverUrl}
            title={item.name}
            artist={item.artists}
            onClick={() => handleItemClick(item)}
          />
        ))}
        {showLoading ? (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder>
        ): <></>}
        {/* 为音乐播放器留的空间 */}
        <List.Placeholder
          style="
                width: 100%;
                height: 20px;"
        ></List.Placeholder>
      </List>
    </View>
  );
}
