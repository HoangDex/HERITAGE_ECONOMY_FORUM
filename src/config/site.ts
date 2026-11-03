export const siteConfig = {
  name: "Heritage Economy Forum",
  vietnameseName: "Diễn đàn Kinh tế Di sản",
  description:
    "Nền tảng kết nối nghiên cứu, chính sách và mô hình doanh nghiệp phát triển kinh tế di sản văn hóa bền vững.",
  url: "http://localhost:3000",
  links: {
    github: "https://github.com/HoangDex/HERITAGE_ECONOMY_FORUM",
  },
  navItems: [
    { title: "Trang chủ", href: "/" },
    { title: "Diễn đàn Thảo luận", href: "/forum" },
    { title: "Dự án Di sản", href: "/heritage" },
  ],
};

export type SiteConfig = typeof siteConfig;
