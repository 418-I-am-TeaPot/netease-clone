import { Slider } from "@taroify/core";
import { View } from "@tarojs/components";
import { ArrowLeft, Play, Pause, ArrowRight } from "@taroify/icons";
import { usePlayerStore } from "@/store/player";

import "./index.scss";

import { useEffect, useState } from "react";
export default function PlayerControls() {
  const { playing, togglePlay, player } = usePlayerStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSiderValue] = useState(0);

  player?.onTimeUpdate(() => {
    setCurrentTime(player.currentTime);
    setSiderValue(player ? (100 * player.currentTime) / player.duration : 0);
  });

  const handleStartClick = () => {
    playing ? player?.pause() : player?.play();
    togglePlay();
  };

  const handlePreSong = () => {};
  const handleNextSong = () => {};

  const CurrentTime = () => {
    if (!player?.currentTime) return <></>;
    const currentMinute = Math.floor(currentTime / 60)
      .toString()
      .padStart(2, "0");
    const currentSecond = Math.floor(currentTime % 60)
      .toString()
      .padStart(2, "0");
    return (
      <>
        <View>
          {currentMinute}:{currentSecond}
        </View>
      </>
    );
  };
  const DurationTime = () => {
    if (!player?.duration) return <></>;
    const durationSecond = Math.floor(player.duration % 60)
      .toString()
      .padStart(2, "0");
    const durationMinute = Math.floor(player.duration / 60)
      .toString()
      .padStart(2, "0");
    return (
      <>
        <View>
          {durationMinute}:{durationSecond}
        </View>
      </>
    );
  };

  useEffect(() => {
    if (!player) return;
    player.src = "http://music.163.com/song/media/outer/url?id=317151.mp3";
  }, []);

  return (
    <View className="playerControls container-v grow">
      {/* 歌曲进度条 */}
      <View className="songProcess">
        <Slider
          max={100}
          min={0}
          size={5}
          value={sliderValue}
          onChange={(value) => {
            setSiderValue(value);
            player?.seek((value / 100) * player.duration);
          }}
        />
        <View className="container-h songTime">
          <CurrentTime />
          <DurationTime />
        </View>
      </View>

      {/* 歌曲播放控件 */}
      <View className="songButtonGroups container-h grow">
        <ArrowLeft onClick={handlePreSong} size={40} />
        {playing ? (
          <Pause size={40} onClick={handleStartClick} />
        ) : (
          <Play size={40} onClick={handleStartClick} />
        )}
        <ArrowRight size={40} onClick={handleNextSong} />
      </View>
    </View>
  );
}
