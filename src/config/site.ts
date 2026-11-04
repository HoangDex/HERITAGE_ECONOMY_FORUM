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
    { title: "Giới thiệu", href: "/gioi-thieu" },
    { title: "Diễn đàn", href: "/forum" },
    { title: "Giải thưởng", href: "/giai-thuong" },
    { title: "Dự án Di sản", href: "/heritage" },
    { title: "Tin tức", href: "/forum#tin-tuc" },
    { title: "Liên hệ", href: "/lien-he" },
  ],
};

export type SiteConfig = typeof siteConfig;
