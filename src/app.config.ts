export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/player/index",
    "pages/me/index",
    "pages/search/index",
    "pages/search-result/index",
    "pages/profile/index",
  ],

  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },

  tabBar: {
    color: "#999", // 默认文字颜色
    selectedColor: "#000", // 选中时文字颜色
    backgroundColor: "#FFF", // 背景色
    borderStyle: "white",
    list: [
      // 导航项列表
      {
        text: "曲库", // 显示文字
        pagePath: "pages/index/index", // 页面路径（基于src目录）
        iconPath: "assets/icons/tab/vault.png",
        selectedIconPath: "assets/icons/tab/vault-active.png",
      },
      {
        text: "我的",
        pagePath: "pages/me/index",
        iconPath: "assets/icons/tab/me.png",
        selectedIconPath: "assets/icons/tab/me-active.png",
      },
    ],
  },
});
