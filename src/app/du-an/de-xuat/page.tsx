import { Metadata } from "next";
import { ProjectProposalForm } from "@/features/heritage";

export const metadata: Metadata = {
  title: "Gửi Đề xuất Dự án Kinh tế Di sản | Heritage Economy Forum",
  description:
    "Cổng tiếp nhận hồ sơ đề xuất mô hình kinh tế di sản, kết nối nguồn lực tài chính, công nghệ và tư vấn chiến lược.",
};

export default function DeXuatDuAnPage() {
  return <ProjectProposalForm />;
}
