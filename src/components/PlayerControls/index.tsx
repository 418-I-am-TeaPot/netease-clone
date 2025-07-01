import { Image, Slider } from "@taroify/core";
import { Text, View } from "@tarojs/components";
import { ArrowLeft, Play, Pause, ArrowRight } from "@taroify/icons";
import { usePlayerStore } from "@/store/player";
import playIcon from "@/assets/icons/player/play-xl.png";
import pauseIcon from "@/assets/icons/player/pause.png";
import backIcon from "@/assets/icons/player/back.png";
import forwardIcon from "@/assets/icons/player/forward.png";

import "./index.scss";

import { useEffect, useState } from "react";
import { usePlaylistStore } from "@/store/playlist";
import { formatSecondsToMMSS } from "@/utils/time";
export default function PlayerControls() {
  const { playing, player, setSong, currentTime, resume, pause } =
    usePlayerStore();
  const { currentItemIndex, playlistData, setCurrentItemIndex } =
    usePlaylistStore();

  const [sliderValue, setSiderValue] = useState(0);

  const handleStartClick = () => {
    playing ? pause() : resume();
  };

  const handlePreSong = () => {
    if (currentItemIndex == 0) {
      setSong(playlistData[playlistData.length - 1]);
      setCurrentItemIndex(playlistData.length - 1);
    } else {
      const index = currentItemIndex;
      setSong(playlistData[index - 1]);
      setCurrentItemIndex(index - 1);
    }
    setSiderValue(0);
    resume();
  };
  const handleNextSong = () => {
    const index = currentItemIndex;
    setSong(playlistData[(index + 1) % playlistData.length]);
    setCurrentItemIndex((index + 1) % playlistData.length);
    setSiderValue(0);
    resume();
  };

  useEffect(() => {
    if (!player?.duration) return;
    setSiderValue((100 * currentTime) / player.duration);
  }, [currentTime]);

  return (
    <View className="playerControls container-v grow">
      {/* 歌曲进度条 */}
      <View className="songProcess container-h grow">
        <View style={{ gap: 12 }} className="container-v grow">
          <Slider
            max={100}
            min={0}
            size={2}
            value={sliderValue}
            onChange={(value) => {
              setSiderValue(value);
              player?.seek((value / 100) * player.duration);
            }}
          />
          <View className="container-h  songTime">
            <Text className="progress-text">
              {formatSecondsToMMSS(currentTime)}
            </Text>
            <Text className="progress-text">
              {formatSecondsToMMSS(player?.duration || 0)}
            </Text>
          </View>
        </View>
      </View>

      {/* 歌曲播放控件 */}
      <View className="songButtonGroupsWrapper container-h grow">
        <View className="songButtonGroups container-h grow">
          <Image
            className="control-button"
            onClick={handlePreSong}
            height={48}
            width={48}
            src={backIcon}
          />

          {playing ? (
            <Image
              className="control-button"
              onClick={handleStartClick}
              height={64}
              width={64}
              src={pauseIcon}
            />
          ) : (
            <Image
              className="control-button"
              onClick={handleStartClick}
              height={64}
              width={64}
              src={playIcon}
            />
          )}
          <Image
            className="control-button"
            onClick={handleNextSong}
            height={48}
            width={48}
            src={forwardIcon}
          />
        </View>
      </View>
      <View className="container-v grow"></View>
    </View>
  );
}
