import { ScrollView, View } from "@tarojs/components";
import "./indexSLH.scss";
import SongContainerHorizental from "../SongContainerHorizental";

export default function SongListHorizental(
    {
        items
    }
) {

  return (
    <ScrollView 
        scrollX
        showScrollbar={false}>
        <View className="containerSLH">
            {
                items.map((item, index) => (
                    <SongContainerHorizental
                        imgUrl={item.imgUrl}
                        title={item.title}
                        key={item.id || index}
                     />
                ))
            }
        </View>
    </ScrollView>
  );
}
