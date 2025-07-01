import { Image, RollingText, Slider } from "@taroify/core";
import { Text, View } from "@tarojs/components";
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

  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleStartClick = () => {
    playing ? pause() : resume();
  };

  // 开始拖动进度条
  const handleSeekStart = () => {
    setIsDragging(true);
  };

  // 监听进度条值
  const handleSeek = (value: number) => {
    setSliderValue(value);
    if (!isDragging) player?.seek((value / 100) * player.duration);
  };

  // 结束拖动进度条
  const handleSeekEnd = () => {
    setIsDragging(false);
    player?.seek((sliderValue / 100) * player.duration);
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
    setSliderValue(0);
    resume();
  };

  const handleNextSong = () => {
    const index = currentItemIndex;
    setSong(playlistData[(index + 1) % playlistData.length]);
    setCurrentItemIndex((index + 1) % playlistData.length);
    setSliderValue(0);
    resume();
  };

  useEffect(() => {
    // 如果正在拖动进度条，就优先处理用户的时间定位，不使进度条依赖 currentTime 进行变化
    if (!player?.duration || isDragging) return;
    setSliderValue((100 * currentTime) / player.duration);
  }, [currentTime]);

  return (
    <View className="playerControls container-v grow">
      {/* 歌曲进度条 */}
      <View className="songProcess container-h grow">
        <Slider
          className="slider"
          style={{ transition: "height 0.1s ease" }}
          max={100}
          min={0}
          size={isDragging ? 5 : 3}
          value={sliderValue}
          onTouchStart={handleSeekStart}
          onTouchEnd={handleSeekEnd}
          onChange={handleSeek}
        />
        <View className="container-h songTime grow">
          <Text className="progress-text">
            {formatSecondsToMMSS((sliderValue / 100) * (player?.duration || 0))}
          </Text>
          <Text className="progress-text">
            {formatSecondsToMMSS(player?.duration || 0)}
          </Text>
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
