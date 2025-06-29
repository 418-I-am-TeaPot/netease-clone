import { View} from "@tarojs/components";
import { Flex,Image,Cell,Button } from "@taroify/core";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Profile() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="profile">
        <View style={{ height: '20px' }} />
          <Flex justify="center">  
            <Flex.Item span={6}></Flex.Item>
              <Flex.Item span={6}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image shape="circle" width={200} height={200} src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                </View>
              </Flex.Item>
            <Flex.Item span={6}></Flex.Item>
        </Flex>

      <View style={{ height: '40px' }} />

      <Cell title="昵称" size="large">username</Cell>
      <Cell title="性别" size="large">gender</Cell>
      <Cell title="简介" size="large">bio</Cell>
      <Cell title="用户ID" size="large">123456</Cell>
      <Button variant="outlined" color="primary" size="large" hairline>更换头像</Button>
      <Button variant="outlined" color="primary" size="large" hairline>修改个人信息</Button>


    </View>
  );
}
