import { Metadata } from "next";
import { homeService, HomePageView } from "@/features/home";

export const metadata: Metadata = {
  title: "Diễn đàn Kinh tế Di sản | Heritage Economy Forum",
  description:
    "Di sản kiến tạo giá trị – Phát triển hướng tương lai. Nền tảng kết nối tri thức, nguồn lực và sáng kiến phát huy giá trị di sản, thúc đẩy kinh tế sáng tạo và phát triển bền vững.",
  openGraph: {
    title: "Diễn đàn Kinh tế Di sản | Heritage Economy Forum",
    description:
      "Di sản kiến tạo giá trị – Phát triển hướng tương lai. Nền tảng đối thoại và kết nối uy tín về kinh tế di sản tại Việt Nam.",
  },
};

export default async function HomePage() {
  const data = await homeService.getHomePageData();

  return <HomePageView initialData={data} />;
}
