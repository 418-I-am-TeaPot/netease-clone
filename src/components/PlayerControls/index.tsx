import { Slider } from "@taroify/core";
import { View } from "@tarojs/components";
import { ArrowLeft, Play, Pause, ArrowRight } from "@taroify/icons";
import { usePlayerStore } from "@/store/player";

import "./index.scss";

import { useEffect, useState } from "react";
import { usePlaylistStore } from "@/store/playlist";
export default function PlayerControls() {
  const { playing, player, setSong, currentTime, currentSong, resume, pause } =
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
      setSong(playlistData[currentItemIndex - 1]);
      setCurrentItemIndex[currentItemIndex - 1];
    }
    setSiderValue(0);
  };
  const handleNextSong = () => {
    setSong(playlistData[(currentItemIndex + 1) % playlistData.length]);
    setCurrentItemIndex((currentItemIndex + 1) % playlistData.length);
    setSiderValue(0);
  };

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
    if (!player?.currentTime) return <></>;
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
    if (!player?.duration) return;
    setSiderValue((100 * currentTime) / player.duration);
  }, [currentTime]);

  useEffect(() => {
    resume();
  }, [currentSong]);
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
