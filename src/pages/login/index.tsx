import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { Button } from "@taroify/core";
import { useUserStore } from "@/store/user";
import {
  checkUserRegistered,
  getOpenid,
  getUserInfo,
} from "@/service/userService";

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
    <View>
      <Button onClick={handleLogin}>使用微信账号登录</Button>
    </View>
  );
}
