import { View } from "@tarojs/components";
import { List, Loading } from "@taroify/core"
import "./indexSLV.scss";
import { useState, useEffect } from "react";
import SongContainerVertical from "../SongContainerVertical";

export default function SongListVertical(
    {
        items,
        search,
        loadingMore = true
    }
) {
    const [hasMore, setHasMore] = useState(true)
    const [list, setList] = useState<any>(items)
    const [loading, setLoading] = useState(false)
    const [showLoading, setShowLoading] = useState(true);
    
    // 当没有更多数据时显示，2秒后自动隐藏
    useEffect(() => {
        if (!hasMore) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 1000);
            return () => clearTimeout(timer); // 清除定时器
        }
    }, [hasMore]);

  return (
    <View style="
            width: 100%;
            display: flex;
            flex-direction: column;
            background-color: #f3f7f9;">
        <List style="
            width: 100%;
            flex: 1;"
            loading={loading && loadingMore}
            hasMore={hasMore && loadingMore}
            onLoad={() => {
                if(!loadingMore) return;
                setLoading(true)
                setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    list.push({
                        imgUrl: "../../assets/icons/tab/vault.png",
                        title: "12345678",
                        artist: "123",
                        id: "123456"
                    })
                }
                setList([...list])
                setHasMore(list.length < 40)
                setLoading(false)
                }, 1000)
            }}
        >
            {
                list.map((item, index) => (
                    <SongContainerVertical
                        imgUrl={item.imgUrl}
                        title={item.title}
                        artist={item.artist}
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
        </List>
    </View>
  );
}
