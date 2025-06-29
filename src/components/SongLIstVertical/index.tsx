import { View } from "@tarojs/components";
import { List, Loading } from "@taroify/core"
import "./indexSLV.scss";
import { useState, useEffect } from "react";
import SongContainerVertical from "../SongContainerVertical";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/store/player";

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

    const handleItemClick = (song: Song) => {
        console.log(song.songId)
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
