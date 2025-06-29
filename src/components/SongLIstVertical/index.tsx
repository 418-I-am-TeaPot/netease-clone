import { View } from "@tarojs/components";
import { List, Loading } from "@taroify/core"
import "./indexSLV.scss";
import { useState, useEffect } from "react";
import SongContainerVertical from "../SongContainerVertical";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";
import { Toast } from "@taroify/core";

export default function SongListVertical(
    {
        items,
        search,
        loadStart = true,
        loadingMore = true
    }
) {
    const [hasMore, setHasMore] = useState(true);
    let initItems: Song[];
    if(items.length < 10)
        initItems = items;
    else
        initItems = items.slice(0, 10);
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

    const {playlistData, setPlaylistData, currentItemIndex, setCurrentItemIndex} = usePlaylistStore();
    const {setSong, currentSong, playing} = usePlayerStore();

    const handleItemClick = (song: Song) => {
        if(currentSong?.songId == song.songId) {
            Toast.open("歌曲已在播放");
            return;
        }
        let playlist: Song[] = playlistData;
        console.log(playlistData);
        console.log("currentItemIndex:" + currentItemIndex);
        console.log("currentSong:" + (currentSong?currentSong.name:undefined));
        console.log("playing:" + playing);
        let flag = false;
        for (let i = 0; i < playlistData.length; i++) {
            if (playlistData[i].songId == song.songId) {
                setCurrentItemIndex(i);
                flag = true;
                break;
            }
        }
        if(!flag) {
            playlist.splice(currentItemIndex + 1, 0, song);
            setCurrentItemIndex(currentItemIndex + 1);
        }
        setPlaylistData(playlist);
        setSong(song);
    }

  return (
    <View style="
            width: 100%;
            display: flex;
            flex-direction: column;
            background-color: #f3f7f9;">
        {loadStart && <List style="
            width: 100%;
            flex: 1;"
            loading={loading && loadingMore}
            hasMore={hasMore && loadingMore}
            onLoad={() => {
                setLoading(true)
                setTimeout(() => {
                let length = list.length;
                for (let i = length; i < (items.length<length+10 ? items.length:length+10); i++) {
                    list.push(items[list.length])
                }
                setList([...list])
                setHasMore(list.length < items.length)
                setLoading(false)
                }, 1000)
            }}
        >
            {
                list.map((item) => (
                    <SongContainerVertical
                        imgUrl={item.coverUrl}
                        title={item.name}
                        artist={item.artists}
                        onClick={() => handleItemClick(item)}
                    />
                ))
            }
            {showLoading && <List.Placeholder>
                {loading && <Loading>加载中...</Loading>}
                {!hasMore &&  "没有更多了"}
            </List.Placeholder>}
            {/* 为音乐播放器留的空间 */}
            <List.Placeholder style="
                width: 100%;
                height: 20px;">
            </List.Placeholder>
        </List>}
    </View>
  );
}
