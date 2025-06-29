/**
 * 将秒数转换为 mm:ss 格式
 * @param seconds 总秒数（如 125 → "02:05"）
 * @returns 格式化后的时间字符串
 */
export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // 补零操作（如 5 → "05"）
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}
