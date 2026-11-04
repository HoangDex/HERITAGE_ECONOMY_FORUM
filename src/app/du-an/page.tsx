import { Metadata } from "next";
import { heritageService, ProjectsHero, ProjectsDirectoryView } from "@/features/heritage";

export const metadata: Metadata = {
  title: "Danh mục Dự án & Mô hình Kinh tế Di sản | Heritage Economy Forum",
  description:
    "Cơ sở dữ liệu các sáng kiến, mô hình thực hành bảo tồn thích ứng và phát triển kinh tế di sản điển hình trên cả nước.",
  openGraph: {
    title: "Danh mục Dự án & Mô hình Kinh tế Di sản | Heritage Economy Forum",
    description:
      "Khám phá các mô hình phát huy nguồn lực di sản gắn với du lịch, công nghệ và làng nghề.",
  },
};

export default async function DuAnPage() {
  const projects = await heritageService.getProjects();

  return (
    <div className="space-y-0 pb-16">
      <ProjectsHero />
      <ProjectsDirectoryView initialProjects={projects} />
    </div>
  );
}
