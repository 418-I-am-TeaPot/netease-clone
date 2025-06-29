import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Flex,Image,List,Cell,Loading,Sticky } from "@taroify/core";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import { usePlaylistStore } from "@/store/playlist";
import NCPlaylist from "@/components/NCPlaylist";
import { useState } from "react";

export default function Me() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const editProfile = () => {
    Taro.navigateTo({ url: "/pages/profile/index" });
  };


  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
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
        <Cell>内容</Cell>
      </Sticky>

      <List
      loading={loading}
      hasMore={hasMore}
      onLoad={() => {
        setLoading(true)
        setTimeout(() => {
          for (let i = 0; i < 20; i++) {
            const text = list.length + 1
            list.push(text < 20 ? "0" + text : String(text))
          }
          setList([...list])
          setHasMore(list.length < 40)
          setLoading(false)
        }, 100)
      }}
    >
      {
        //
        list.map((item) => (
          <Cell key={item}>{item}</Cell>
        ))
      }
      <List.Placeholder>
        {loading && <Loading>加载中...</Loading>}
        {!hasMore && "没有更多了"}
      </List.Placeholder>
    </List>
      

      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );

}
