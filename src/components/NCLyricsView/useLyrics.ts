import { LYRICS } from "@/constants/lyrics";
import { getLyricsBySongId } from "@/service/songService";
import { usePlayerStore } from "@/store/player";
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

  const { currentSong } = usePlayerStore();

  // 初始化
  useEffect(() => {
    fetchLyrics();
  }, []);

  // 监听活跃歌词行变化
  useEffect(() => {
    console.log("activeLineIndex", activeLineIndex);
  }, [activeLineIndex]);

  useEffect(() => {
    if (!lyricsDimensions) return;
    console.log("lyricsDimensions", lyricsDimensions);
  }, [lyricsDimensions]);

  const fetchLyrics = async () => {
    if (!currentSong) return;

    const res = await getLyricsBySongId({ songId: currentSong.songId });
    const lyricLines = lrcParser(res);
    setLyricsLines(lyricLines);

    setTimeout(() => {
      getLyricDimensions();
    }, 0);
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
