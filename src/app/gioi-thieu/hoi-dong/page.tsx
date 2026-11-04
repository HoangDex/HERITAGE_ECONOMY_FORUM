import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { aboutService } from "@/features/about";
import { CouncilDedicatedView } from "./council-dedicated-view";

export const metadata: Metadata = {
  title: "Hội đồng Diễn đàn – Diễn đàn Kinh tế Di sản (HEF)",
  description:
    "Danh sách Chủ tịch, các Phó Chủ tịch, thành viên Hội đồng và Hội đồng Cố vấn Khoa học Diễn đàn Kinh tế Di sản.",
};

export default async function CouncilPage() {
  const data = await aboutService.getAboutPageData();

  return (
    <div className="w-full">
      {/* Banner tiêu đề */}
      <div className="bg-radial-[at_top] from-[#76232D] via-[#52181F] to-[#292929] text-white py-12 px-4 sm:px-8 border-b-4 border-[#C29B57]">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/gioi-thieu"
            className="inline-flex items-center gap-1.5 text-xs text-[#C29B57] hover:underline mb-4 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Trang Giới thiệu</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5EFE5]">
            Hội Đồng Diễn Đàn Kinh Tế Di Sản
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
            Cơ quan lãnh đạo học thuật cao nhất của Diễn đàn, chịu trách nhiệm định hướng chiến
            lược, thẩm định các nghiên cứu chuyên sâu và xây dựng chính sách kinh tế di sản.
          </p>
        </div>
      </div>

      {/* Nội dung danh sách tương tác */}
      <CouncilDedicatedView
        president={data.president}
        vicePresidents={data.vicePresidents}
        councilMembers={data.councilMembers}
        scientificAdvisors={data.scientificAdvisors}
      />
    </div>
  );
}
