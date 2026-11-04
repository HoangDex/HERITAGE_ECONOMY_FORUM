import { Metadata } from "next";
import { contactService, ContactPageView } from "@/features/contact";

export const metadata: Metadata = {
  title: "Liên hệ & Tiếp nhận Yêu cầu | Heritage Economy Forum",
  description:
    "Cổng tiếp nhận đăng ký tham dự, đăng ký diễn giả, đề xuất dự án, tài trợ và hợp tác chiến lược cùng Diễn đàn Kinh tế Di sản.",
  openGraph: {
    title: "Liên hệ & Tiếp nhận Yêu cầu | Heritage Economy Forum",
    description: "Kết nối tri thức, nguồn lực và sáng kiến phát triển kinh tế di sản bền vững.",
  },
};

export default async function LienHePage() {
  const data = await contactService.getContactPageData();

  return <ContactPageView data={data} />;
}
