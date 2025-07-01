import Taro from "@tarojs/taro";
import { APP_ID, APP_SECRET, BASE_URL } from "./config";

export const getOpenid = async (): Promise<string | undefined> => {
  try {
    const res = await Taro.login();
    if (!res.code) {
      console.log("获取code失败：", res.errMsg);
      return;
    }

    const data = await Taro.request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${res.code}&grant_type=authorization_code`,
    });
    if (!data) {
      console.log("获取openid失败", data);
      return;
    }

    return data.data.openid;
  } catch (error) {
    console.error(error);
  }
};

interface CheckUserRegisteredParams {
  openid: string;
}

export const checkUserRegistered = async ({
  openid,
}: CheckUserRegisteredParams) => {
  const url = BASE_URL + "/user";

  try {
    const res = await Taro.request({ url, method: "POST", header: { openid } });
    if (res.data !== "用户已存在") return false;
    else return true;
  } catch (error) {
    console.error(error);
  }
};

interface GetUserInfoParams {
  openid: string;
}

export const getUserInfo = async ({ openid }: GetUserInfoParams) => {
  const url = BASE_URL + "/user";
  try {
    const res = await Taro.request({ url, method: "GET", header: { openid } });
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
