import { ScrollView, View } from "@tarojs/components";
import "./indexSLH.scss";
import SongContainerHorizental from "../SongContainerHorizental";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/store/player";
import { usePlaylistStore } from "@/store/playlist";

export default function SongListHorizental(
    {
        items,
        loadStart = true
    }
) {

    const handleItemClick = (song: Song) =>{
        console.log(song.songId);
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
