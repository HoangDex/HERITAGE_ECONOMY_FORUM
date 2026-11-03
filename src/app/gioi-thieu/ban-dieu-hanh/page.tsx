import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { aboutService } from "@/features/about";
import { ExecutiveDedicatedView } from "./executive-dedicated-view";

export const metadata: Metadata = {
  title: "Ban Điều hành – Diễn đàn Kinh tế Di sản (HEF)",
  description:
    "Cơ cấu tổ chức Ban Điều hành, Trưởng ban, các Phó Trưởng ban và 6 nhóm chuyên trách phụ trách triển khai các chương trình Diễn đàn.",
};

export default async function ExecutivePage() {
  const data = await aboutService.getAboutPageData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
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
              Ban Điều Hành Diễn Đàn Kinh Tế Di Sản
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
              Bộ máy chuyên trách điều phối, triển khai các hoạt động nghiên cứu, vận hành sự kiện,
              truyền thông và xúc tiến các dự án kinh tế di sản.
            </p>
          </div>
        </div>

        {/* Nội dung danh sách tương tác */}
        <ExecutiveDedicatedView
          head={data.executiveHead}
          deputies={data.executiveDeputies}
          departments={data.executiveDepartments}
        />
      </main>
      <Footer />
    </div>
  );
}
