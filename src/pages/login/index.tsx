import { View } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import { useState } from "react";
import { User } from "@/models/user";
import {Button} from "@taroify/core";
import { useUserStore } from "@/store/user";

export default function Profile() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  var defaultUser = {
  openid: '',
  name: '',
  bio: '无',
  avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
  gender: 0,
  registeredAt: 1751273205
}
    const{user,setUser} =useUserStore();
  
  const [openid,setopenid]=useState("")
  
  const handlelogin = async ()=>{
    try {
        const res = await Taro.login();
        const jscode = res.code;
        console.log('jscode:', jscode);
            const response = await Taro.request({
            url: 'http://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
            appid:'wxe39ec7b9d8fdcc68',
            secret:'8b8e4b37c9ec5e42c587d1dc22864c77',
            js_code: res.code,
            grant_type: 'authorization_code'
        },
        success:function (res){
            console.log("asdfasdf")
            // Taro.navigateBack()

            console.log(res.data)
            setopenid(res.data.openid)

            defaultUser.openid=res.data.openid
            defaultUser.name=res.data.openid
            setUser(defaultUser)
            
            Taro.navigateBack()
        },
        fail:  err => {
          console.error('请求失败:', err.errMsg);
        }
        })
    } catch (error) {
        console.error('获取 openid 失败:', error);
    }
    
  }


  return(
    <View>
        <Button onClick={handlelogin}>
            使用微信账号登录
        </Button>
    </View>
  )
}