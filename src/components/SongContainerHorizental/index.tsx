import { View, Text, Image } from "@tarojs/components";
import "./indexSCH.scss";
import Taro from "@tarojs/taro";
import { Play } from "@taroify/icons"

export default function SongContainerHorizental(
    {
        imgUrl,
        title,
    }
) {

  return (
    <View className="containerSCH">
      <Image className="coverSCH" src={ imgUrl }> </Image>
      <View className="textContainerSCH">
        <Text className="titleSCH">{title}</Text>
      </View>
    </View>
  );
}
