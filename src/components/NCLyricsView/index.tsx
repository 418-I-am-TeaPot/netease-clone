import {
  BaseEventOrig,
  ScrollView,
  ScrollViewProps,
  Text,
  View,
} from "@tarojs/components";
import "./index.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { Play } from "@taroify/icons";
import { Divider } from "@taroify/core";
import { useLyrics } from "./useLyrics";
import { formatSecondsToMMSS } from "@/utils/time";
import { debounce } from "lodash";
import { usePlayerStore } from "@/store/player";

interface NCLyricsViewProps {
  showLyricsCb: () => void;
}

function NCLyricsView({ showLyricsCb }: NCLyricsViewProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [centerIndicatorVisible, setCenterIndicatorVisible] = useState(true);
  const {
    lyricsLines,
    activeLineIndex,
    setActiveLineIndex,
    lyricsDimensions,
    centeredLineIndex,
    setCenteredLineIndex,
  } = useLyrics();
  const { currentTime, setCurrentTime, player } = usePlayerStore();

  const isScrollingRef = useRef<boolean>(false);

  // 监听：中线可见性 (centerIndicatorVisible)
  // 功能：实现歌词自动吸附
  useEffect(() => {
    if (!centerIndicatorVisible) scrollToLine(centeredLineIndex);
  }, [centerIndicatorVisible]);

  // 监听：歌曲进度 (currentTime)
  // 功能：实现歌词自动滚动
  useEffect(() => {
    if (!lyricsLines.length || !lyricsDimensions.length) return;
    const newActiveLineIndex = findMatchingLine(); // 找到与时间匹配的歌词行
    setActiveLineIndex(newActiveLineIndex);
    scrollToLine(newActiveLineIndex); // 滚动到定位到的歌词行
    console.log("currentTime here", currentTime);
  }, [currentTime, lyricsLines, lyricsDimensions]);

  // 监听：活跃歌词行下标 (activeLineIndex)
  // 功能：滚动到用户点击的歌词行 - 对应 seekToLine 函数
  useEffect(() => {
    if (!lyricsLines.length || !lyricsDimensions.length) return;
    scrollToLine(activeLineIndex); // 滚动到定位到的歌词行
  }, [activeLineIndex, lyricsLines, lyricsDimensions]);

  // 响应用户拖动歌词的事件
  const handleScroll = (e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      setCenterIndicatorVisible(true);
    }
    debouncedOnScrollEnd();
    lyricsDimensions.some(({ top, height }, index) => {
      const scrollTop = e.detail.scrollTop;
      if (top < scrollTop && scrollTop < top + height) {
        setCenteredLineIndex(index);
        return true;
      }
    });
  };

  // 使用防抖来模拟 onScrollEnd API
  const debouncedOnScrollEnd = useMemo(
    () =>
      debounce(() => {
        isScrollingRef.current = false;
        setCenterIndicatorVisible(false);
      }, 500),
    []
  );

  // 活跃歌词行变化时，滚动到该歌词行
  const scrollToLine = (index: number) => {
    const { top, height } = lyricsDimensions[index];
    const newScrollTop = top + height / 2 + 15;
    setScrollTop(newScrollTop);
  };

  // currentTime变化时，找到当前正在播放的歌词index
  const findMatchingLine = () => {
    return lyricsLines.findIndex((lyricLine, index, arr) => {
      const thisLineTime = lyricLine.time;
      const nextLineTime = arr[index + 1].time;
      return thisLineTime <= currentTime && currentTime < nextLineTime;
    });
  };

  // 找到用户点击的歌词行，并将其设置为活跃状态
  const seekToLine = (index: number) => {
    console.log(index);
    setActiveLineIndex(index);
    const newTime = lyricsLines[index].time;
    console.log("newTime", newTime);
    setCurrentTime(newTime);
    player?.seek(newTime);
  };

  // 获取歌词的「文本」样式
  const getLineTextStyle = (index: number): string => {
    const textStyle: string[] = ["lyric-text"];
    if (index === activeLineIndex) textStyle.push("lyric-text-active");
    if (index === centeredLineIndex) textStyle.push("lyric-text-centered");

    return textStyle.join(" ");
  };

  // 获取歌词的「背景」样式
  const getLineBgStyle = (index: number): string => {
    const bgStyle = ["lyric-line"];

    if (centeredLineIndex === index) bgStyle.push("lyric-line-active");

    return bgStyle.join(" ");
  };

  return (
    <View className="lyrics-view container-h">
      <View className="center-indicator container-h">
        <Text style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
          {formatSecondsToMMSS(lyricsLines[centeredLineIndex]?.time) ?? "xx:xx"}
        </Text>
        <View className="container grow">
          <Divider className="grow" />
        </View>
        <Play size={20} color="#ada4a4" />
      </View>
      <ScrollView
        showScrollbar={false}
        scrollTop={scrollTop}
        scrollWithAnimation
        enableFlex
        scrollY
        className="container-v lyrics-scroll-view grow"
        onScroll={handleScroll}
      >
        <View className="container" style={{ paddingTop: 296 }} />
        {lyricsLines.map((l, index) => (
          <View
            onClick={() => {
              index === centeredLineIndex ? seekToLine(index) : showLyricsCb();
            }}
            id={`line-${index}`}
            className={getLineBgStyle(index)}
          >
            <Text className={getLineTextStyle(index)}>{l.text}</Text>
          </View>
        ))}
        <View className="container" style={{ paddingBottom: 245 }} />
      </ScrollView>
    </View>
  );
}

export default NCLyricsView;
