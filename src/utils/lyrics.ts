export type LyricLine = {
  time: number; // 秒数，例如 65.21
  text: string;
};

export const lrcParser = (lyrics: string) => {
  const lines = lyrics.split("\n");
  const lyricLines: LyricLine[] = [];
  for (const line of lines) {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (match) {
      const [, min, sec, text] = match;
      if (!text.trim()) continue;
      lyricLines.push({
        time: parseFloat(min) * 60 + parseFloat(sec),
        text: text.trim(),
      });
    }
  }
  console.log("lyricLines", lyricLines);
  return lyricLines;
};
