import { LYRICS } from "@/constants/lyrics";
import { lrcParser, LyricLine } from "@/utils/lyrics";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

type LyricsDimension = { top: number; height: number };

export const useLyrics = () => {
  const [lyricsLines, setLyricsLines] = useState<LyricLine[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [centeredLineIndex, setCenteredLineIndex] = useState(0);
  const [lyricsDimensions, setLyricsDimensions] = useState<LyricsDimension[]>(
    []
  );

  // 初始化
  useEffect(() => {
    fetchLyrics();
    getLyricDimensions();
  }, []);

  // 监听活跃歌词行变化
  useEffect(() => {
    console.log("activeLineIndex", activeLineIndex);
  }, [activeLineIndex]);

  const fetchLyrics = async () => {
    const { lyricLines, contributor } = lrcParser(LYRICS.lyric);
    setLyricsLines(lyricLines);
  };

  const getLyricDimensions = () => {
    Taro.createSelectorQuery()
      .selectAll(".lyric-line")
      .boundingClientRect((rects) => {
        if (!Array.isArray(rects)) return;

        rects.forEach((rect) => {
          if (!rect) return;
          setLyricsDimensions((prev) => [
            ...prev,
            { top: rect.top - 296, height: rect.height },
          ]);
        });
      })
      .exec();
  };

  return {
    lyricsLines,
    setLyricsLines,
    activeLineIndex,
    setActiveLineIndex,
    lyricsDimensions,
    getLyricDimensions,
    centeredLineIndex,
    setCenteredLineIndex,
  };
};
