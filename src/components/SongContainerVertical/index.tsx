import { View, Text, Image } from "@tarojs/components";
import "./indexSCV.scss";
import { Play } from "@taroify/icons"

export default function SongContainerVertical(
    {
        imgUrl,
        title,
        artist,
        onClick
    }
) {

  return (
    <View className="containerSCV"
      onClick={onClick}>
      <Image className="coverSCV" src={ imgUrl }> </Image>
      <View className="textContainerSCV">
        <Text className="titleSCV">{title}</Text>
        <Text className="artistSCV">{artist}</Text>
      </View>
      <Play className="playIconSCV" size="25px"/>
    </View>
  );
}
