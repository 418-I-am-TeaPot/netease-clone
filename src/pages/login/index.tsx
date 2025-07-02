import { Text, View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { Button, Image } from "@taroify/core";
import { useUserStore } from "@/store/user";
import {
  checkUserRegistered,
  getOpenid,
  getUserInfo,
} from "@/service/userService";
import "./index.scss";
import logoIcon from "@/assets/icons/logo.png";

export default function Login() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const { setUser } = useUserStore();

  const handleLogin = async () => {
    const openid = await getOpenid();
    if (!openid) return;

    console.log("获取到了openid！", openid);

    const userExist = await checkUserRegistered({ openid });
    console.log("用户是否存在：", userExist);
    if (!userExist) {
      setUser({
        avatarUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        openid,
        name: "默认用户名",
        bio: "请完善你的个人简介！",
        gender: 0,
        registeredAt: Number(new Date()),
      });
      Taro.navigateBack();
      return;
    }

    const userInfo = await getUserInfo({ openid });
    console.log("用户信息：", userInfo);
    setUser(userInfo);
    Taro.navigateBack();
  };

  return (
    <View className="login container-v">
      <View className="container-v grow logo-container">
        <Image
          shape="circle"
          height={280}
          width={280}
          mode="aspectFit"
          src={logoIcon}
        />
        <View className="container-v text-container">
          <Text className="logo-text">网易云音乐</Text>
          <Text className="subtitle">项目已在 GitHub 上开源</Text>
        </View>
      </View>
      <View className="btn-container container-v">
        <Button className="btn" onClick={handleLogin}>
          微信账号一键登录
        </Button>
      </View>
    </View>
  );
}
