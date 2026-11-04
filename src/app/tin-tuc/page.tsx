import { Metadata } from "next";
import { newsService, NewsPageView } from "@/features/news";

export const metadata: Metadata = {
  title: "Tin tức, Nghiên cứu & Góc nhìn Chuyên gia | Heritage Economy Forum",
  description:
    "Cập nhật các hoạt động mới nhất, công trình nghiên cứu, góc nhìn chuyên gia và mô hình kinh tế di sản văn hóa bền vững.",
  openGraph: {
    title: "Tin tức, Nghiên cứu & Góc nhìn Chuyên gia | Heritage Economy Forum",
    description: "Cập nhật bài viết học thuật, kinh nghiệm thực tiễn và chính sách di sản.",
  },
};

export default async function TinTucPage() {
  const data = await newsService.getNewsPageData();

  return <NewsPageView data={data} />;
}
