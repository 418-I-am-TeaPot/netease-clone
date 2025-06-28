import { Popup } from "@taroify/core";

interface NCPlaylistProps {
  open?: boolean;
  onClose?: () => void;
}

function NCPlaylist({ open, onClose }: NCPlaylistProps) {
  return (
    <Popup
      open={open}
      onClose={onClose}
      placement="bottom"
      style={{ height: "30%" }}
    />
  );
}

export default NCPlaylist;
