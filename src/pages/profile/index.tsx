import { View} from "@tarojs/components";
import { Flex,Image,Cell,Button,Backdrop,Field,Input} from "@taroify/core";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useUserStore } from "@/store/user";
import { useState } from "react";

export default function Profile() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  var user= {
  openid: '123456',
  name: 'username',
  bio: 'bio',
  avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
  gender: 1,
  registeredAt: 1751263192,
}
/*   useUserStore((state)=>state.setUser(Userinfo))

  const user = useUserStore((state)=>state.user);  */

  const setUser = useUserStore(state => state.setUser)

  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)


  const [nName, setnName] = useState('')
  const [nBio,setnBio] = useState('')
  const alterInfo  = ()=>{
    
    setOpen1(false)
  }
  const alterImg = ()=>{
    setOpen2(true)
  }
  return (
    <View className="profile">
        <View style={{ height: '20px' }} />
          <Flex justify="center">  
            <Flex.Item span={6}></Flex.Item>
              <Flex.Item span={6}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image shape="circle" width={200} height={200} src={user?.avatarUrl}/>
                </View>
              </Flex.Item>
            <Flex.Item span={6}></Flex.Item>
        </Flex>

      <View style={{ height: '40px' }} />

      <Cell title="昵称" size="large">{user?.name}</Cell>
      <Cell title="性别" size="large">{user?.gender}</Cell>
      <Cell title="简介" size="large">{user?.bio}</Cell>
      <Cell title="用户ID" size="large">{user?.openid}</Cell>
      <Button variant="outlined" color="primary" size="large" hairline onClick={() => setOpen1(true)}>修改个人信息</Button>
      <Button variant="outlined" color="primary" size="large" hairline onClick={() => setOpen2(true)}>更换头像</Button>
      
      <Backdrop open={open1} closeable onClose={() => setOpen1(false)}>
        <View >
          <Cell.Group inset>
            <Field label="昵称">
              <Input placeholder="请输入文本" value={nName} onChange={(e) => setnName(e.detail.value)} />
            </Field>
            <Field label="简介">
              <Input placeholder="请输入文本" value={nBio} onChange={(e) => setnBio(e.detail.value)} />
            </Field>
          </Cell.Group>
                    <Cell.Group inset>
            <Field>
              <Button variant="outlined" block color="primary" hairline onClick={alterInfo}>确认修改</Button>
            </Field>
            <Field>
              <Button variant="outlined" block color="danger" hairline onClick={() => setOpen1(false)} >放弃修改</Button>
            </Field>
          </Cell.Group>
          
          
        </View>
      </Backdrop>

      <Backdrop open={open2} closeable onClose={() => setOpen2(false)}>
        <View >123
        </View>
      </Backdrop> 

    </View>
  );
}
