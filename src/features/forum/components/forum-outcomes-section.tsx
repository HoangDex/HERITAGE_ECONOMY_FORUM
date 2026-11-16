/**
 * COMPONENT: FORUM OUTCOMES SECTION (KẾT QUẢ KỲ DIỄN ĐÀN ĐÃ KẾT THÚC)
 * Ưu tiên hiển thị trên kỳ đã kết thúc (như 2025): Tuyên bố chung Hà Nội, MOU hợp tác và chỉ số HEI
 */

"use client";

import { Award, FileCheck2, CheckCircle2, TrendingUp, Handshake } from "lucide-react";
import { FadeIn, InteractiveCard } from "@/components/animations";
import type { ForumEdition } from "../types/forum-edition.types";

interface ForumOutcomesSectionProps {
  edition: ForumEdition;
}

export function ForumOutcomesSection({ edition }: ForumOutcomesSectionProps) {
  const isConcluded = edition.status === "concluded";

  return (
    <section
      id="ket-qua"
      className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-[#dfd7c8] scroll-mt-28"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
        <FadeIn direction="up" className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <Award className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Dấu Ấn & Kết Quả • Kỳ {edition.year}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
            {isConcluded ? "Kết Quả & Tuyên Bố Chung Đạt Được" : "Mục Tiêu & Kỳ Vọng Đầu Ra"}
          </h2>
          <p className="text-sm text-[#5c554b] max-w-2xl">
            {isConcluded
              ? "Tổng hợp các dấu ấn thành tựu, tuyên bố chính sách và biên bản ghi nhớ hợp tác đã được thông qua."
              : "Các cam kết định hướng, nghị quyết hành động và tuyên ngôn chung dự kiến công bố tại lễ bế mạc."}
          </p>
        </FadeIn>

        {/* Khối tóm tắt kết quả chính */}
        {edition.outcomesSummary && (
          <InteractiveCard>
            <div className="p-6 sm:p-8 bg-white rounded-2xl border-2 border-[#C29B57]/60 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-[#0D4838]">
                <FileCheck2 className="w-5 h-5 text-[#C29B57]" />
                <h3 className="text-base sm:text-lg font-serif font-bold">
                  {isConcluded ? "Tuyên Bố Chung & Cam Kết Hành Động" : "Định Hướng Đầu Ra Nghị Sự"}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#132A24] leading-relaxed font-serif">
                {edition.outcomesSummary}
              </p>

              {/* 3 Chỉ số ấn tượng của kỳ diễn đàn */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#dfd7c8]">
                <div className="p-4 bg-[#F7F5EE] rounded-xl text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">
                    {isConcluded ? "12" : "15+"}
                  </span>
                  <p className="text-xs text-[#5c554b] font-medium flex items-center justify-center gap-1">
                    <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
                    <span>MOU Hợp tác Ký kết</span>
                  </p>
                </div>

                <div className="p-4 bg-[#F7F5EE] rounded-xl text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">
                    {isConcluded ? "450 Tỷ" : "500+ Tỷ"}
                  </span>
                  <p className="text-xs text-[#5c554b] font-medium flex items-center justify-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#C29B57]" />
                    <span>Quy mô Cam kết Đầu tư</span>
                  </p>
                </div>

                <div className="p-4 bg-[#F7F5EE] rounded-xl text-center space-y-1">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">
                    100%
                  </span>
                  <p className="text-xs text-[#5c554b] font-medium flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B57]" />
                    <span>Đại biểu Đồng thuận</span>
                  </p>
                </div>
              </div>
            </div>
          </InteractiveCard>
        )}
      </div>
    </section>
  );
}
