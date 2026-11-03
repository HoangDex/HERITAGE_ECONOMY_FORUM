import { Suspense } from "react";
import { SectionHeading } from "@/components/common/section-heading";
import {
  HeritageGrid,
  EconomicStats,
  CreateHeritageDialog,
  heritageService,
} from "@/features/heritage";

export const metadata = {
  title: "Dự án Di sản & Kinh tế",
  description: "Cơ sở dữ liệu các mô hình kinh tế di sản điển hình tại Việt Nam.",
};

export default async function HeritagePage() {
  // Lấy dữ liệu trực tiếp trên server qua Service Layer (Zero API Latency)
  const projects = await heritageService.getProjects();

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6">
        <SectionHeading
          badge="Cơ sở dữ liệu thực tiễn"
          title="Dự án & Mô hình Kinh tế Di sản"
          description="Khám phá các mô hình phát huy giá trị di sản gắn với du lịch, công nghiệp văn hóa và làng nghề truyền thống."
        />
        <div className="shrink-0 mb-8 sm:mb-0">
          <CreateHeritageDialog />
        </div>
      </div>

      {/* Macro Impact Metrics */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thống kê tác động vĩ mô</h3>
        <EconomicStats />
      </div>

      {/* Projects Grid with Suspense */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Danh mục dự án ({projects.length})</h3>
        </div>
        <Suspense
          fallback={<div className="text-muted-foreground py-8">Đang tải danh mục dự án...</div>}
        >
          <HeritageGrid projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
