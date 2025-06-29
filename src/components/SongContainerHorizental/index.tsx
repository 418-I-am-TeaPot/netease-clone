import { View, Text, Image } from "@tarojs/components";
import "./indexSCH.scss";

export default function SongContainerHorizental(
    {
        imgUrl,
        title,
        onClick
    }
) {

  return (
    <View className="containerSCH"
      onClick={onClick}>
      <Image className="coverSCH" src={ imgUrl } > </Image>
      <View className="textContainerSCH">
        <Text className="titleSCH">{title}</Text>
      </View>
    </View>
  );
}
