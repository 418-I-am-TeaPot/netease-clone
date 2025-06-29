import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Flex,Image,List,Cell,Loading,Sticky } from "@taroify/core";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import { usePlaylistStore } from "@/store/playlist";
import NCPlaylist from "@/components/NCPlaylist";
import SongListFav from "@/components/SongLIstFav";
import { useState } from "react";
import { Song } from "@/models/song";

export default function Me() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const editProfile = () => {
    Taro.navigateTo({ url: "/pages/profile/index" });
  };

    const [songs, setSongs] = useState<Song[]>([])
    const [loading, setLoading] = useState<boolean>(false)
  
    useLoad(() => {
      console.log("Page loaded.");
      const loadSongs = () => { Taro.request({
          url: 'http://localhost:8080/songs',
          method: 'GET', 
          success: (res) => {
            console.log('Data:', res.data);
            setSongs(res.data.data);
            setLoading(true);
          },
          fail: (err) => {
            console.error('Request failed:', err);
            Taro.showToast({
              title: '加载歌曲失败，请稍后重试',
              icon: 'none',
              duration: 2000,
            });
          }
        });
      }
      loadSongs();
    });
  
  return (
    <View className="me">
        <View style={{ height: '20px' }} />
        <Flex justify="center">  
          <Flex.Item span={6}></Flex.Item>
          <Flex.Item span={6}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image shape="circle" width={200} height={200} src="https://img.yzcdn.cn/vant/cat.jpeg" onClick={editProfile}/>
            </View>
          </Flex.Item>
          <Flex.Item span={6}></Flex.Item>
        </Flex>

        <View style={{ height: '20px' }} />

        <View style={{ textAlign: 'center' }}  className="taroify-ellipsis">
          username
        </View>
        <View style={{ height: '50px' }} />


      <Sticky>
        <Cell>我喜欢的</Cell>
      </Sticky>
      
      <View>
        <SongListFav
          items={songs}
          search={""}
          loadStart={loading}
        />
      </View>

      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );

}
