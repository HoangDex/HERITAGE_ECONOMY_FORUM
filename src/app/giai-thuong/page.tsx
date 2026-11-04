import { Metadata } from "next";
import { awardsService, AwardsPageView } from "@/features/awards";

export const metadata: Metadata = {
  title: "Giải thưởng Phát triển Bền vững Chủ động | Heritage Economy Forum",
  description:
    "Kiến tạo giá trị – Phụng sự vị nhân sinh. Tìm hiểu 08 hạng mục, bộ tiêu chí định lượng và quy trình 7 bước xét chọn Giải thưởng Phát triển Bền vững Chủ động 2026.",
  openGraph: {
    title: "Giải thưởng Phát triển Bền vững Chủ động | Heritage Economy Forum",
    description:
      "Kiến tạo giá trị – Phụng sự vị nhân sinh. Vinh danh các sáng kiến kinh tế di sản xuất sắc.",
  },
};

export default async function GiaiThuongPage() {
  const data = await awardsService.getAwardsPageData();

  return <AwardsPageView data={data} />;
}
