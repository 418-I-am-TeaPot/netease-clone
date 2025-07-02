import { View} from "@tarojs/components";
import { Flex,Image,Cell,Button,Backdrop,Field,Input,Uploader, Tabs} from "@taroify/core";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import Taro from "@tarojs/taro";
import CellGroup from "@taroify/core/cell/cell-group";
import { BASE_URL } from "@/service/config";
import { User } from "@/models/user";

export default function Profile() {
  const user = useUserStore((state)=>state.user);  
  const [gender, setGender] = useState('')
  const handleGender= (number)=>{
    if(number==1){
      return '男'
    }
    else if(number==2){
      return '女'
    }
    else{
      return '未知'
    }
  }
  

  useLoad(() => {
    setGender(handleGender(user?.gender))
    console.log("Page loaded.");
  });

  var nUser={
    openid: "1", name: "alan", bio: "我是alan", avatarUrl: "syljbh00m.hd-bkt.clouddn.com/8ae0c571-e5dc-41a2-a534-ba653c54bb75.jpg", registeredAt: 1751163646102, gender: 1
  }
  const setUser = useUserStore(state => state.setUser)

  



  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [nName, setnName] = useState('')
  const [nBio,setnBio] = useState('')
  const [nGender,setnGender] = useState(0)
  const [gvalue,setgvalue] = useState('')
  const openAlterPage = ()=>{
    setOpen1(true)
    if(user!==null)
    {
      setnBio(user.bio)
      setnName(user.name)
      setnGender(user.gender)
    }
    else{
      console.log("invalid userinfo")
    }
    
  }

  const [file, setFile] = useState<Uploader.File>()
  function onUpload() {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFile({
        url: tempFiles[0].path,
        type: tempFiles[0].type,
        name: tempFiles[0].originalFileObj?.name,
      })
    })
  }

  const alterInfo  =async  ()=>{
    setOpen1(false)
    if(user)
      nUser=user
/*     const res = await Taro.uploadFile({
      url: BASE_URL + '/user',
      filePath: ,
      name: "",
      formData:{
        name:nName,
        bio:nBio,
        gender:nGender
      },
      header:{'openid':user?.openid },
        
    })
    console.log("用户信息修改",res) */


    

        Taro.request({
                url: BASE_URL+'/user',
                method: 'PUT',
                header:{
                  'openid':user?.openid,
                  //'content-type':'application/x-www-form-urlencoded'
                },
                
                data:{
                  'name':nName,
                  'bio':nBio,
                  'gender':nGender
                }
                

            ,
            success:function (res){
                console.log("用户信息修改成功")
             
                nUser.name=nName
                nUser.bio=nBio
            nUser.gender=nGender
                setUser({...user,...nUser})
            },
            fail:  err => {
              console.error('请求失败:', err.errMsg);
            }
            })

  }
  const alterImg = async ()=>{
    setOpen2(false)
    if(user)
     nUser=user
    if(file?.url)
    {
      const res = await Taro.uploadFile({
      url: BASE_URL + '/user/avatar',
      filePath: file.url,
      name: "image",
      header:{'openid':user?.openid,
       },
       success:(res)=>{
           console.log("用户头像修改" +typeof  res.data)
           const obj = JSON.parse(res.data)
           if(!obj || !user) return
        //   if(!res.data?.data) return 
          setUser({...user,avatarUrl:obj?.data ?? ""})
       }
      
    })
    
    }
    else{
      console.log("图片格式错误")
    }

/*     Taro.request({
                url: BASE_URL+'/user/avatar',
                method: 'POST',
                header:{
                  'openid':user?.openid,
                  'Content-Type':'multipart/form-data'
                },
                data: {
                  image:file?.url
            },
            success:function (res){
              console.log("头像修改成功")
            },
            fail:  err => {
              console.error('请求失败:', err.errMsg);
            }
            }) */

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
      <Cell title="性别" size="large">{handleGender(user?.gender)}</Cell>
      <Cell title="简介" size="large">{user?.bio}</Cell>
      <Cell title="用户ID" size="large">{user?.openid}</Cell>
      <Button variant="outlined" color="primary" size="large" hairline onClick={openAlterPage}>修改个人信息</Button>
      <Button variant="outlined" color="primary" size="large" hairline onClick={() => setOpen2(true)}>更换头像</Button>
      
      <Backdrop open={open1} >
        <View >
          <Cell.Group inset>
            <Field label="昵称">
              <Input placeholder="新昵称" value={nName} onInput={(e)=>setnName(e.detail.value)}/>
            </Field>
            <Field label="简介">
              <Input placeholder="输入简介" value={nBio} onInput={(e)=>setnBio(e.detail.value)}/>
            </Field>
            <Field label="性别展示">
              <Tabs value={nGender} onChange={setnGender} theme="card">
                <Tabs.TabPane title="未知"></Tabs.TabPane>
                <Tabs.TabPane title="男"></Tabs.TabPane>
                <Tabs.TabPane title="女"></Tabs.TabPane>
              </Tabs>
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

      <Backdrop open={open2} >
        <View >
          <CellGroup inset>
            <Field>
              <Uploader maxFiles={1} value={file} onUpload={onUpload} onChange={setFile} />
            </Field>
            <Field>
              <Button variant="outlined" block color="primary" hairline onClick={alterImg}>确认修改</Button>
            </Field>
            <Field>
              <Button variant="outlined" block color="danger" hairline onClick={() => setOpen2(false)} >放弃修改</Button>
            </Field>
          </CellGroup>
          
        </View>
      </Backdrop> 

    </View>
  );
}
