import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function SearchResult() {
  useLoad((options: Record<string, string>) => {
    if (!options.q) return;

    Taro.setNavigationBarTitle({ title: options.q });
  });

  return (
    <View className="search-result">
      <Text>搜索结果界面</Text>
    </View>
  );
}
