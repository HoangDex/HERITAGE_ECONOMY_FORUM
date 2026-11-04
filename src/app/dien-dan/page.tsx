import { Metadata } from "next";
import { forumService, ForumPageView } from "@/features/forum";

export const metadata: Metadata = {
  title: "Kỳ Diễn đàn Kinh tế Di sản 2026 | Heritage Economy Forum",
  description:
    "Chương trình chính thức Diễn đàn Kinh tế Di sản 2026: 04 phiên nghị sự, trục thời gian, danh sách diễn giả đầu ngành và thư viện kỷ yếu nghiên cứu.",
  openGraph: {
    title: "Kỳ Diễn đàn Kinh tế Di sản 2026 | Heritage Economy Forum",
    description:
      "Di sản kiến tạo giá trị – Phát triển hướng tương lai. 18-20/11/2026 tại Hoàng thành Thăng Long, Hà Nội.",
  },
};

export default async function DienDanPage() {
  const edition = await forumService.getActiveEdition();

  return <ForumPageView edition={edition} />;
}
