import { Song } from "@/models/song";

export const MOCK_SONGS: Song[] = [
  {
    songId: "2056682158",
    name: "Please dont",
    artists: ["CashCaptain"].join("｜"),
    coverUrl:
      "https://p2.music.126.net/y5I0AUPoQGbALauQpMBZSg==/109951168684979483.jpg",
    isLike: false,
  },
  {
    songId: "2118458192",
    name: "Do That",
    artists: ["ljz329", "马思唯"].join("｜"),
    coverUrl:
      "https://p1.music.126.net/Q3p_jBF64PDmBZz6oSnVpg==/109951169268410736.jpg",
    isLike: false,
  },
  {
    songId: "2116798541",
    name: "黑蝴蝶",
    artists: ["KEY.L刘聪", "万妮达VinsongIda Weng", "c0de731"].join("｜"),
    coverUrl:
      "https://p1.music.126.net/lNijwEMtnosPZQoUTSAfrQ==/109951169259262714.jpg",
    isLike: false,
  },
  {
    songId: "1814729820",
    name: "真拿你没辙2.0",
    artists: ["汪记杂货铺", "H-Lillll艾赤荔"].join("｜"),
    coverUrl:
      "https://p2.music.126.net/v__2ckU7lFvai5xp95rd7A==/109951165662250624.jpg",
    isLike: false,
  },
  {
    songId: "1885538011",
    name: "命运很奇妙，让篮球故意滚到你脚边",
    artists: ["杜逸风 Firewind SoKu", "马赫mood"].join("｜"),
    coverUrl:
      "https://p1.music.126.net/vF3hlPFBimnoiprlUP6Kxw==/109951166504717143.jpg",
    isLike: false,
  },
];

export const MOCK_SONG: Song = MOCK_SONGS[2];
