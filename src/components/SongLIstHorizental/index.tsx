import { ScrollView, View } from "@tarojs/components";
import "./indexSLH.scss";
import SongContainerHorizental from "../SongContainerHorizental";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";
import { Toast } from "@taroify/core";
import Taro from "@tarojs/taro";

export default function SongListHorizental(
    {
        items,
        loadStart = true
    }
) {

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
    <ScrollView 
        scrollX
        showScrollbar={false}>
        {loadStart && <View className="containerSLH">
            {
                items.map((item: Song) => (
                    <SongContainerHorizental
                        imgUrl={item.coverUrl}
                        title={item.name}
                        onClick={() => handleItemClick(item)}
                     />
                ))
            }
        </View>}
    </ScrollView>
  );
}
