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

function NCLyricsView() {
  const [scrollTop, setScrollTop] = useState(0);
  const [currentTime, setCurrentTime] = useState(1);
  const [centerIndicatorVisible, setCenterIndicatorVisible] = useState(true);
  const {
    lyricsLines,
    activeLineIndex,
    setActiveLineIndex,
    lyricsDimensions,
    centeredLineIndex,
    setCenteredLineIndex,
  } = useLyrics();

  // useEffect(() => {
  //   setInterval(() => {
  //     setCurrentTime((prev) => prev + 1);
  //   }, 1000);
  // }, []);

  const isScrollingRef = useRef<boolean>(false);

  // 当播放时间(currentTime)发生变化时
  useEffect(() => {
    if (!lyricsLines.length || !lyricsDimensions.length) return;
    const newActiveLineIndex = findMatchingLine(); // 找到与时间匹配的歌词行
    setActiveLineIndex(newActiveLineIndex);
    scrollToLine(newActiveLineIndex); // 滚动到定位到的歌词行
  }, [currentTime, lyricsLines, lyricsDimensions]);

  useEffect(() => {
    if (!lyricsLines.length || !lyricsDimensions.length) return;
    scrollToLine(activeLineIndex); // 滚动到定位到的歌词行
  }, [activeLineIndex, lyricsLines, lyricsDimensions]);

  useEffect(() => {
    if (!centerIndicatorVisible) scrollToLine(centeredLineIndex);
  }, [centerIndicatorVisible]);

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
    const newScrollTop = top + height / 2 - 1;
    setScrollTop(newScrollTop);
  };

  const findMatchingLine = () =>
    lyricsLines.findIndex((lyricLine, index, arr) => {
      const thisLineTime = lyricLine.time;
      const nextLineTime = arr[index + 1].time;
      return thisLineTime <= currentTime && currentTime < nextLineTime;
    });

  const seekToLine = (index: number) => {
    console.log(index);
    setActiveLineIndex(index);
  };

  const getLineTextStyle = (index: number): string => {
    const textStyle: string[] = ["lyric-text"];
    if (index === activeLineIndex) textStyle.push("lyric-text-active");
    if (index === centeredLineIndex) textStyle.push("lyric-text-centered");

    return textStyle.join(" ");
  };

  const getLineBgStyle = (index: number): string => {
    const bgStyle = ["lyric-line"];

    if (centeredLineIndex === index)
      console.log(
        `centeredLineIndex: ${centeredLineIndex}; isScrolling: ${isScrollingRef.current}; centerIndicatorVisible: ${centerIndicatorVisible}`
      );

    if (
      centeredLineIndex === index &&
      isScrollingRef.current === false &&
      centerIndicatorVisible
    ) {
      console.log("here");
      bgStyle.push("lyric-line-active");
    }

    return bgStyle.join(" ");
  };

  return (
    <View className="lyrics-view container-h" style={{ zIndex: 6 }}>
      <View
        className="center-indicator container-h"
        style={{
          opacity: isScrollingRef.current ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
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
            onClick={() => seekToLine(index)}
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
