import { updateUserInfo } from "@/service/userService";
import { useUserStore } from "@/store/user";
import { Picker, Popup } from "@taroify/core";
import { useState } from "react";

interface NCGenderPickerProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const columns = [
  { label: "未知", value: "0" },
  { label: "男", value: "1" },
  { label: "女", value: "2" },
];
function NCGenderPicker({
  open,
  onClose,
  onConfirm = () => {},
}: NCGenderPickerProps) {
  const [value, setValue] = useState("0");

  const { user, setUser } = useUserStore();

  const handleConfirm = async () => {
    if (!user) return;
    const data = user;
    data.gender = Number(value);
    const res = await updateUserInfo({
      openid: user.openid,
      userinfo: data,
    });

    if (!res) return;
    setUser(data);
    onConfirm();
  };

  return (
    <Popup
      open={open}
      placement="bottom"
      style={{ height: "40%", overflowY: "hidden" }}
    >
      <Picker
        title="修改性别"
        onChange={(val) => setValue(val[0])}
        value={`${user?.gender ?? 0}`}
        onCancel={onClose}
        onConfirm={handleConfirm}
        columns={columns}
      ></Picker>
    </Popup>
  );
}

export default NCGenderPicker;
