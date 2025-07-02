import { Loading, Popup, Tabs } from "@taroify/core";
import { Text, View } from "@tarojs/components";
import "./index.scss";
import { Cross } from "@taroify/icons";
import { MOCK_SONGS } from "@/constants/songs";
import { usePlaylistStore } from "@/store/playlist";
import { usePlayerStore } from "@/store/player";
import { useEffect } from "react";

interface NCPlaylistProps {
  open?: boolean;
  onClose?: () => void;
}

function NCPlaylist({ open, onClose }: NCPlaylistProps) {
  const {
    currentItemIndex,
    setCurrentItemIndex,
    playlistData,
    setPlaylistData,
    togglePlaylist,
  } = usePlaylistStore();
  const { setSong, playing, resume, setPlaying, pause } = usePlayerStore();

  useEffect(() => {
    setPlaylistData([...playlistData]);
  }, [currentItemIndex]);

  const handleItemSelect = (index: number) => {
    if (index === currentItemIndex) return;
    setCurrentItemIndex(index);
    setSong(playlistData[index]);
    setTimeout(() => {
      setPlaying(true);
      resume();
    }, 0);
  };

  const handleItemRemove = (index: number) => {
    const newPlaylistData = playlistData.filter((_, idx) => idx !== index);

    if (index < currentItemIndex) {
      // 移除当前正在播放音乐之前的歌
      setCurrentItemIndex(currentItemIndex - 1);
    } else if (index === currentItemIndex) {
      // 移除当前正在播放的歌
      if (index === playlistData.length - 1) {
        // 当前播放的歌是列表中最后一首
        if (currentItemIndex === 0) {
          // 列表中仅剩一首
          setCurrentItemIndex(-1);
        } else {
          // 列表中不止一首
          setCurrentItemIndex(0);
          setSong(playlistData[0]);
          resume();
        }
      } else {
        // 当前播放的歌不是列表中最后一首
        setSong(playlistData[currentItemIndex + 1]);
        resume();
      }
    }

    setPlaylistData(newPlaylistData);
    if (!newPlaylistData.length) {
      setSong(null);
      setPlaying(false);
      pause();
      togglePlaylist();
    }
  };

  return (
    <Popup
      open={open}
      onClose={onClose}
      placement="bottom"
      style={{ height: "70%" }}
    >
      <Tabs shrink>
        <Tabs.TabPane title="播放列表">
          {playlistData.map((song, index) => (
            <View
              className={`container-h list-item ${
                currentItemIndex === index ? "list-item-active" : ""
              }`}
            >
              <View
                className="song-info container-v grow"
                onClick={() => handleItemSelect(index)}
              >
                <View
                  className="container-h"
                  style={{ alignItems: "center", gap: 8 }}
                >
                  {playing && currentItemIndex === index && (
                    <Loading size={16} className="custom-spinner-color" />
                  )}
                  <Text
                    className={`song-name ${
                      currentItemIndex === index ? "active-text" : ""
                    }`}
                  >
                    {song.name}
                  </Text>
                </View>
                <View className="container-h grow">
                  <Text
                    className={`artist-name ${
                      currentItemIndex === index ? "active-text" : ""
                    }`}
                  >{`${song.artists}`}</Text>
                </View>
              </View>
              <Cross color="#bcbcbd" onClick={() => handleItemRemove(index)} />
            </View>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Popup>
  );
}

export default NCPlaylist;
