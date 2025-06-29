import { View } from "@tarojs/components";
import { List, Loading } from "@taroify/core"
import "./indexSLF.scss";
import { useState, useEffect } from "react";
import SongContainerFav from "../SongContainerFav";
import { Song } from "@/models/song";
import { Popup } from "@taroify/core";
import { Play, Like } from "@taroify/icons"
import { usePlayerStore } from "@/store/player";

export default function SongListFav(
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
    
    let initSong: Song = {artists:"", coverUrl:"", isLike:true, name:"", songId: ""}

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupSong, setPopupSong] = useState<Song>(initSong);
    const [popupSongIndex, setPopupSongIndex] = useState(-1);

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

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
        console.log(song.songId);
    }
    const handleItemIconClick = (song: Song, index: number, event: React.MouseEvent) => {
        event.stopPropagation();
        setPopupSong(song);
        setPopupSongIndex(index);
        setIsPopupVisible(true);
    }

    const handlePopupNextClick = () => {
        console.log("next" + popupSong.songId);
        setIsPopupVisible(false);
    }

    const handlePopupLikeClick = () => {
        console.log((popupSong.isLike?"dislike":"like") + popupSong.songId);
        let listChange: Song[] = list;
        listChange[popupSongIndex].isLike = !listChange[popupSongIndex].isLike;
        setIsPopupVisible(false);
        setList(listChange);
    }

  return (
    <View style="
            width: 90%;
            padding-left: 5%;
            padding-right: 5%;
            display: flex;
            flex-direction: column;
            background-color: white;">

        <Popup
            open={isPopupVisible}
            onClose={handleClosePopup}
            placement="bottom"
            style={{ height: "30%" }}
            rounded
            lock>
                <View className="popupTitle"> 
                    {"歌曲：" + popupSong?.name} 
                </View>
                <View className="popupNextContainer"
                    onClick={handlePopupNextClick}>
                    <Play className="popupNextIcon" size="28px"></Play>
                    <View className="popupNextText">
                        下一首播放
                    </View>
                </View>
                <View className="popupLikeContainer"
                    onClick={handlePopupLikeClick}>
                    <Like className="popupLikeIcon" size="28px"
                        style={popupSong?.isLike?{color: "#ff0000"}:{color: "#f888888"}}>
                    </Like>
                    <View className="popupNextText">
                        {popupSong?.isLike?"取消喜欢":"喜欢"}
                    </View>
                </View>
        </Popup>

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
                list.map((item, index) => (
                    <SongContainerFav
                        imgUrl={item.coverUrl}
                        title={item.name}
                        artist={item.artists}
                        onClick={() => handleItemClick(item)}
                        onIconClick={(event) => handleItemIconClick(item, index, event)}
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
