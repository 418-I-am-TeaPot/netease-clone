import Taro from "@tarojs/taro";

interface GetLyricsBySongIdParams {
  songId: string;
}

export const getLyricsBySongId = async ({
  songId,
}: GetLyricsBySongIdParams) => {
  try {
    const res = await Taro.request({
      url: `https://music.163.com/api/song/media?id=${songId}`,
    });
    return res.data.lyric;
  } catch (error) {
    console.error(error);
  }
};
