import { Search } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useSearch } from "./useSearch";

export default function SearchPage() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { textInput, setTextInput } = useSearch();

  const handleSearch = () => {
    console.log(textInput);
    Taro.navigateTo({ url: `/pages/search-result/index?q=${textInput}` });
  };

  return (
    <View className="search">
      <Search
        placeholder="搜索曲目"
        value={textInput}
        onChange={(e) => setTextInput(e.detail.value)}
        onSearch={handleSearch}
      />
      <Text>搜索界面</Text>
    </View>
  );
}
