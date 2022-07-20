module.exports = {
  title: "花花的个人博客",
  keywords: "前端开发",
  description: "花花的个人博客",
  //   theme: "reco",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  base: "/myblog/",

  themeConfig: {
    subSidebar: "auto",
    logo: "/image/logo.png",
    authorAvatar: "/image/avatar.jpg",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "TypeScript",
        link: "/TypeScript_docs/基础类型",
      },
      {
        text: "Vue3",
        link: "/Vue3_docs/Vue3.2",
      },
      { text: "React", link: "" },
      { text: "Dart", link: "" },
      { text: "Flutter", link: "" },
      { text: "随心记录", link: "" },
      {
        text: "Github",
        link: "https://github.com/huahaigo/LearningPark",
      },
    ],
    sidebar: {
      "/TypeScript_docs/": ["基础类型", "接口", "类", "函数", "泛型"],
      "/Vue3_docs/": ["Vue3.2", "Pinia"],
    },
  },
};
