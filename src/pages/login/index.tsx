import { View } from "@tarojs/components";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { User } from "@/models/user";
import {Button} from "@taroify/core";
import { useUserStore } from "@/store/user";
import { BASE_URL } from "@/service/config";

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

/*   useEffect(() => {
    console.log("Updated user:", user);
    
  }, [user]); */

  const getInfo = async (id)=>{
        const userInfo= await Taro.request({
            url: BASE_URL+'/user',
            method: 'GET',
            header:{
              'openid':id
            },
            data: {
        },
        success:function (res){
          console.log("res.data",res.data.data)
            setUser(res.data.data)
            
            console.log(user)

            Taro.navigateBack()
        },
        fail:  err => {
          console.error('请求openid失败:', err.errMsg);
        }
        })
  }

  const createAccount = async (id)=>{
    const res = await Taro.request({
            url: BASE_URL+'/user',
            method: 'POST',
            header:{
              openid:id
            },
            data: {
        },
        success:function (res){
            console.log(res)
            if(res.data.data=="用户已存在")
            {
              console.log("用户已存在")
            }
            getInfo(id)

        },
        fail:  err => {
          console.error('请求用户状态失败:', err.errMsg);
        }
        })
  }
  
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
            createAccount(res.data.openid)
            
        },
        fail:  err => {
          console.error('请求openid失败:', err.errMsg);
        }
        })
    } catch (error) {
        console.error('获取用户信息失败:', error);
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