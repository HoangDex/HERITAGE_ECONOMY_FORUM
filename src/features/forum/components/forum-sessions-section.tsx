/**
 * COMPONENT: FORUM SESSIONS SECTION (04 PHIÊN NGHỊ SỰ TRỌNG TÂM - TINH GỌN)
 * Thiết kế tinh giản chữ, thẻ thông thoáng, làm nổi bật thông tin cốt lõi
 */

"use client";

import { Clock, MapPin, UserCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { ForumSession } from "../types/forum-edition.types";

interface ForumSessionsSectionProps {
  sessions: ForumSession[];
}

export function ForumSessionsSection({ sessions }: ForumSessionsSectionProps) {
  return (
    <section id="cac-phien" className="py-12 sm:py-16 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
        {/* Tiêu đề ngắn gọn */}
        <FadeIn direction="up" className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Chương Trình Trọng Tâm</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
            04 Phiên Nghị Sự Chuyên Đề
          </h2>
          <p className="text-sm text-[#5c554b] max-w-2xl">
            Đối thoại liên ngành từ thể chế chính sách, mô hình thực tiễn đến cam kết hành động bền
            vững.
          </p>
        </FadeIn>

        {/* Lưới 4 Phiên: Tinh gọn nội dung, cắt giảm chữ rườm rà */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sessions.map((session) => {
            // Tách tiêu đề sạch (bỏ tiền tố "Phiên X: ")
            const cleanTitle = session.title.replace(/^Phiên\s*\d+\s*:\s*/i, "");

            return (
              <StaggerItem key={session.id}>
                <InteractiveCard className="h-full">
                  <div className="bg-white rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full space-y-4">
                    {/* Header thẻ: Badge số phiên & Giờ */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge className="bg-[#0D4838] text-white font-bold text-xs px-2.5 py-0.5">
                          Phiên 0{session.order}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-[#5c554b] font-medium bg-[#F7F5EE] px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5 text-[#C29B57]" />
                          <span>{session.timeRange}</span>
                        </div>
                      </div>

                      {/* Tên phiên nổi bật */}
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#132A24] leading-snug">
                        {cleanTitle}
                      </h3>

                      {/* Tóm tắt ngắn gọn 1-2 dòng thay vì đoạn văn dài */}
                      <p className="text-xs sm:text-sm text-[#5c554b] line-clamp-2 leading-relaxed">
                        {session.subTitle || session.description}
                      </p>
                    </div>

                    {/* Footer thẻ: Phòng họp & Diễn giả tiêu biểu */}
                    <div className="pt-3 border-t border-[#dfd7c8]/60 space-y-2.5 text-xs">
                      <div className="flex items-center gap-1.5 text-[#4A5E57] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                        <span className="truncate">{session.room}</span>
                      </div>

                      {session.speakers.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {session.speakers.map((sp) => (
                            <span
                              key={sp.id}
                              className="inline-flex items-center gap-1 text-[11px] bg-[#F7F5EE] hover:bg-[#eae5d9] px-2.5 py-0.5 rounded-md text-[#132A24] font-medium border border-[#dfd7c8] transition-colors"
                            >
                              <UserCheck className="w-3 h-3 text-[#0D4838]" />
                              <span>{sp.name}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
