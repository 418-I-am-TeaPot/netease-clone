import { View, Text, Image } from "@tarojs/components";
import "./indexSCH.scss";


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
