import { View, Text, Image } from "@tarojs/components";
import "./indexSCV.scss";
import { Play } from "@taroify/icons";

export default function SongContainerVertical({
  imgUrl,
  title,
  artist,
  onClick,
}) {
  return (
    <View className="containerSCV" onClick={onClick}>
      <Image className="coverSCV" src={imgUrl} />
      <View className="textContainerSCV">
        <Text className="titleSCV">{title}</Text>
        <View className="artistSCV">{artist}</View>
      </View>
      <Play className="playIconSCV" size="25px" />
    </View>
  );
}
