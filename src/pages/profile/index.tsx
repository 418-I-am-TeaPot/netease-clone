import { View } from "@tarojs/components";
import { Flex, Cell, Uploader } from "@taroify/core";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import { EditType } from "../profile-edit";
import NCGenderPicker from "@/components/NCGenderPicker";
import { updateUserAvatar } from "@/service/userService";

export default function Profile() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const [genderPickerOpen, setGenderPickerOpen] = useState(false);

  const { user, setUser } = useUserStore();

  const [file, setFile] = useState<Uploader.File>({ url: user?.avatarUrl });
  function onUpload() {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      console.log("tempFile", tempFiles);
      setFile({
        url: tempFiles[0].path,
        type: tempFiles[0].type,
        name: tempFiles[0].originalFileObj?.name,
      });
      alterImg(tempFiles[0].path);
    });
  }

  const handleGender = (number) => {
    if (number == 1) {
      return "男";
    } else if (number == 2) {
      return "女";
    } else {
      return "未知";
    }
  };

  const alterImg = async (tempFilePath: string) => {
    if (!user || !tempFilePath) return;
    if (tempFilePath) {
      const res = await updateUserAvatar({
        openid: user?.openid,
        filePath: tempFilePath,
      });
      if (!res) return;

      const obj = JSON.parse(res.data);
      if (!obj || !user) return;
      setUser({ ...user, avatarUrl: obj?.data ?? "" });
    } else {
      console.log("图片格式错误");
    }
  };

  const editInfo = (type: EditType) => {
    Taro.navigateTo({ url: `/pages/profile-edit/index?type=${type}` });
  };

  const editGender = () => {
    setGenderPickerOpen(true);
  };

  return (
    <View className="profile">
      <View style={{ height: "20px" }} />
      <Flex justify="center">
        <Flex.Item span={6}></Flex.Item>
        <Flex.Item span={6}>
          <View className="avatar-container container ">
            <Uploader
              className="uploader container-v"
              onClick={() => onUpload()}
              onUpload={() => setFile({})}
              removable={false}
              maxFiles={1}
              onChange={setFile}
              value={file}
            ></Uploader>
          </View>
        </Flex.Item>
        <Flex.Item span={6}></Flex.Item>
      </Flex>

      <View style={{ height: "40px" }} />

      <Cell.Group bordered={false}>
        <Cell
          isLink
          bordered={false}
          className="cell-item"
          title="昵称"
          size="large"
          onClick={() => editInfo("name")}
        >
          {user?.name}
        </Cell>
        <Cell
          isLink
          bordered={false}
          className="cell-item"
          title="性别"
          size="large"
          onClick={editGender}
        >
          {handleGender(user?.gender)}
        </Cell>
        <Cell
          isLink
          bordered={false}
          className="cell-item"
          title="简介"
          size="large"
          onClick={() => editInfo("bio")}
        >
          {user?.bio}
        </Cell>
      </Cell.Group>

      <NCGenderPicker
        onClose={() => setGenderPickerOpen(false)}
        open={genderPickerOpen}
        onConfirm={() => setGenderPickerOpen(false)}
      />
    </View>
  );
}
