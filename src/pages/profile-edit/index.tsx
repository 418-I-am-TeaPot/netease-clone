import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import Taro from "@tarojs/taro";
import { Button, Cell, Field, Input, Textarea } from "@taroify/core";
import { useState } from "react";
import { User } from "@/models/user";
import { useUserStore } from "@/store/user";
import { updateUserInfo, UserInfoUpdate } from "@/service/userService";

export type EditType = "name" | "bio";
const TitleConfigs: Record<EditType, string> = {
  name: "修改昵称",
  bio: "修改简介",
};

export default function ProfileEdit() {
  const { user, setUser } = useUserStore();

  useLoad((options: Record<string, string>) => {
    Taro.setNavigationBarTitle({
      title: options?.type ? TitleConfigs[options.type] : "修改用户信息",
    });
    if (!options?.type) return;

    const type = options.type as EditType;
    setEditFieldType(type);
    if (type === "name") setTextInput(user?.name ?? "未读取到全局变量");
    if (type === "bio") setTextInput(user?.bio ?? "未读取到全局变量");
  });

  const [textInput, setTextInput] = useState("");
  const [editFieldType, setEditFieldType] = useState<EditType | null>(null);

  const handleSubmit = async () => {
    if (!user || !editFieldType) return;

    const data: UserInfoUpdate = {
      name: user.name,
      bio: user.bio,
      gender: user.gender,
    };
    console.log("textinput value", textInput);
    if (editFieldType === "name") data.name = textInput;
    if (editFieldType === "bio") data.bio = textInput;

    const res = await updateUserInfo({ openid: user.openid, userinfo: data });
    if (!res) return;
    setUser({ ...user, ...data });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  };

  const getInputLimit = () => {
    if (editFieldType === "name") return 20;
    if (editFieldType === "bio") return 100;
    return 5;
  };

  return (
    <View className="profile-edit container-v">
      <Cell.Group inset>
        <Field size="large">
          <Textarea
            className="container-v"
            autoHeight
            limit={getInputLimit()}
            value={textInput}
            onChange={(e) => setTextInput(e.detail.value)}
          />
        </Field>
      </Cell.Group>
      <View className="container-v btn-container">
        <Button className="btn" onClick={handleSubmit}>
          完成
        </Button>
      </View>
    </View>
  );
}
