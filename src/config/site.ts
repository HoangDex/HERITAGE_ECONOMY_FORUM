export const siteConfig = {
  name: "Heritage Economy Forum",
  vietnameseName: "Diễn đàn Kinh tế Di sản",
  slogan: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
  description:
    "Kết nối tri thức, nguồn lực và cộng đồng để nhận diện, bảo tồn và phát huy giá trị di sản trong nền kinh tế đương đại.",
  url: "http://localhost:3000",
  links: {
    github: "https://github.com/HoangDex/HERITAGE_ECONOMY_FORUM",
  },
  navItems: [
    { title: "Trang chủ", href: "/" },
    { title: "Giới thiệu", href: "/about" },
    { title: "Diễn đàn", href: "/forum" },
    { title: "Giải thưởng", href: "/awards" },
    { title: "Tin tức", href: "/news" },
    { title: "Dự án", href: "/projects" },
    { title: "Liên hệ", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
