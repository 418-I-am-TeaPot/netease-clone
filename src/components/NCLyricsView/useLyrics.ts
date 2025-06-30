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
  }, [currentSong]);

  // 监听活跃歌词行变化
  useEffect(() => {
    console.log("activeLineIndex", activeLineIndex);
  }, [activeLineIndex]);

  useEffect(() => {
    if (!lyricsDimensions) return;
    console.log("lyricsDimensions", lyricsDimensions);
  }, [lyricsDimensions]);

  // 监听：歌词数据
  // 功能：歌词数据重置了，再获取页面元素的维度信息
  useEffect(() => {
    if (!lyricsLines.length) return;
    Taro.nextTick(() => getLyricDimensions());
  }, [lyricsLines]);

  const fetchLyrics = async () => {
    if (!currentSong) return;
    const res = await getLyricsBySongId({ songId: currentSong.songId });
    const lyricLines = lrcParser(res);
    setLyricsLines(lyricLines);
  };

  const getLyricDimensions = () => {
    Taro.createSelectorQuery()
      .selectAll(".lyric-line")
      .boundingClientRect((rects) => {
        if (!Array.isArray(rects)) return;
        const dims = rects
          .filter((r) => r)
          .map(({ top, height }) => ({ top: top - 296, height }));
        setLyricsDimensions(dims);
      })
      .exec();
  };

  return {
    lyricsLines,
    setLyricsLines,
    activeLineIndex,
    setActiveLineIndex,
    lyricsDimensions,
    centeredLineIndex,
    setCenteredLineIndex,
  };
};
