import { Metadata } from "next";
import { aboutService, AboutPageView } from "@/features/about";

export const metadata: Metadata = {
  title: "Giới thiệu – Về Diễn đàn Kinh tế Di sản (HEF)",
  description:
    "Tìm hiểu về tôn chỉ, tầm nhìn, sứ mệnh, Hội đồng Diễn đàn, Ban Điều hành chuyên trách và mạng lưới đối tác đồng hành kiến tạo giá trị kinh tế di sản văn hóa bền vững.",
  openGraph: {
    title: "Giới thiệu – Về Diễn đàn Kinh tế Di sản (HEF)",
    description: "Tôn chỉ, sứ mệnh, Hội đồng Diễn đàn và mạng lưới đối tác đồng hành tại Việt Nam.",
  },
};

export default async function AboutPage() {
  const data = await aboutService.getAboutPageData();

  return <AboutPageView initialData={data} />;
}
