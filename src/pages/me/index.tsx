import { View } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import "./index.scss";
import { Flex,Image,Cell,Sticky,PullRefresh } from "@taroify/core";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import { usePlaylistStore } from "@/store/playlist";
import NCPlaylist from "@/components/NCPlaylist";
import SongListFav from "@/components/SongLIstFav";
import { useEffect, useState } from "react";
import { User } from "@/models/user";
import { usePageScroll } from "@tarojs/taro";
import { useUserStore } from "@/store/user";
import { BASE_URL } from "@/service/config";

export default function Me() {
  //const user: User = {openid: "1", name: "alan", bio: "我是alan", avatarUrl: "syljbh00m.hd-bkt.clouddn.com/8ae0c571-e5dc-41a2-a534-ba653c54bb75.jpg", registeredAt: 1751163646102, gender: 1};
  const {user, setUser} = useUserStore()
  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const editProfile = () => {
    Taro.navigateTo({ url: "/pages/profile/index" });
  };

    useLoad(() => {
      console.log("Page loaded.");
    });

    useDidShow(() => {
      console.log("Page show.");
      setReload(!reload);
    });
  
    const [pullLoading, setPullLoading] = useState(false)
    const [reachTop, setReachTop] = useState(true)
    const [reload, setReload] = useState(true)

    usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

    useEffect(()=> {
      console.log("user avatar",user?.avatarUrl)
    },[user])

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
        <View style={{ height: '20px' }} />
        <Flex justify="center">  
          <Flex.Item span={6}></Flex.Item>
          <Flex.Item span={6}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image shape="circle" width={200} height={200} src={user?.avatarUrl} onClick={editProfile}/>
            </View>
          </Flex.Item>
          <Flex.Item span={6}></Flex.Item>
        </Flex>

        <View style={{ height: '20px' }} />

        <View style={{ textAlign: 'center' }}  className="taroify-ellipsis">
          {user?.name}
        </View>
        <View style={{ height: '50px' }} />


      <Sticky>
        <Cell>我喜欢的</Cell>
      </Sticky>
      
      <View style= {{
        minHeight: 400,
        backgroundColor: "white"
      }}>
        <SongListFav
            reload={reload}
            user={user}
        />
      </View>

      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </PullRefresh>
  );

}
