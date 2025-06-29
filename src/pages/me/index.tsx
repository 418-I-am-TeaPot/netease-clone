import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { Avatar } from "@taroify/core";
import NCMiniPlayer from "@/components/NCMiniPlayer";
import { usePlaylistStore } from "@/store/playlist";
import NCPlaylist from "@/components/NCPlaylist";

export default function Me() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { playlistOpen, togglePlaylist } = usePlaylistStore();

  const editProfile = () => {
    Taro.navigateTo({ url: "/pages/profile/index" });
  };

  return (
    <View className="me">
      <Flex justify="center">  
      <Flex.Item span={6}></Flex.Item>
      <Flex.Item span={6}>
        <Image shape="circle" width={200} height={200} src="https://img.yzcdn.cn/vant/cat.jpeg" onClick={editProfile}/>
      </Flex.Item>
      <Flex.Item span={6}></Flex.Item>
    </Flex>
    
    <Flex justify="center">
  <Flex.Item span={6}></Flex.Item>
  <Flex.Item span={6}>username</Flex.Item>
  <Flex.Item span={6}></Flex.Item>
</Flex>
      
      <NCMiniPlayer />
      <NCPlaylist open={playlistOpen} onClose={togglePlaylist} />
    </View>
  );

}
