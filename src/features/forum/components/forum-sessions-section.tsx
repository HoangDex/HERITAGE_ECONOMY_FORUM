/**
 * COMPONENT: FORUM SESSIONS SECTION (04 PHIÊN NGHỊ SỰ TRỌNG TÂM)
 * Wireframe Desktop:
 * - CÁC PHIÊN: 4 thẻ dọc hoặc accordion có liên kết chi tiết
 * Wireframe Mobile:
 * - PHIÊN / TIMELINE: Accordion và timeline một cột
 * 
 * 4 Phiên chuẩn PRD:
 * • Phiên 1: Khai mạc – công bố và định hướng
 * • Phiên 2: Tham luận chuyên đề và giới thiệu mô hình
 * • Phiên 3: Đối thoại và thảo luận mở
 * • Phiên 4: Dấu ấn – thành tựu – kết nối và tổng kết
 */

"use client";

import React, { useState } from "react";
import {
  Clock,
  MapPin,
  UserCheck,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, InteractiveCard } from "@/components/animations";
import type { ForumSession } from "../types/forum-edition.types";

interface ForumSessionsSectionProps {
  sessions: ForumSession[];
}

export function ForumSessionsSection({ sessions }: ForumSessionsSectionProps) {
  // Trạng thái mở rộng cho Accordion
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(
    sessions[0]?.id || null
  );

  const toggleSession = (id: string) => {
    setExpandedSessionId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="cac-phien" className="py-12 sm:py-16 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
        {/* Tiêu đề mục các phiên */}
        <FadeIn direction="up" className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Chương Trình Trọng Tâm</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
            04 Phiên Nghị Sự Chuyên Đề
          </h2>
          <p className="text-sm text-[#5c554b] max-w-2xl leading-relaxed">
            Chương trình nghị sự đa chủ thể: từ định hướng chiến lược quốc gia, kinh nghiệm thực tiễn
            đến thảo luận mở và tổng kết các cam kết hành động bền vững.
          </p>
        </FadeIn>

        {/* Danh sách 4 Phiên (Accordion & Thẻ Chi Tiết Dọc) */}
        <div className="space-y-4">
          {sessions.map((session) => {
            const isExpanded = expandedSessionId === session.id;
            const cleanTitle = session.title.replace(/^Phiên\s*\d+\s*:\s*/i, "");

            return (
              <InteractiveCard key={session.id}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                    isExpanded
                      ? "border-[#C29B57] shadow-md ring-1 ring-[#C29B57]/30"
                      : "border-[#dfd7c8] hover:border-[#C29B57]/60 shadow-2xs"
                  }`}
                >
                  {/* Thanh Header của phiên - Click để Toggle Accordion */}
                  <div
                    onClick={() => toggleSession(session.id)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-[#FDFBF7]/60 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0D4838] text-[#C29B57] font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        0{session.order}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#C29B57] uppercase tracking-wider">
                            Phiên 0{session.order}
                          </span>
                          <span className="text-[#dfd7c8]">•</span>
                          <span className="inline-flex items-center gap-1 text-xs text-[#5c554b] font-medium">
                            <Clock className="w-3 h-3 text-[#C29B57]" />
                            {session.timeRange}
                          </span>
                          <span className="text-[#dfd7c8] hidden sm:inline">•</span>
                          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#5c554b] font-medium">
                            <MapPin className="w-3 h-3 text-[#C29B57]" />
                            {session.room}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-xl font-serif font-bold text-[#132A24] leading-snug">
                          {cleanTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-[#dfd7c8]/60">
                      <span className="text-xs text-[#0D4838] font-semibold flex items-center gap-1">
                        {isExpanded ? "Thu gọn chi tiết" : "Xem chi tiết phiên"}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full bg-[#F7F5EE] flex items-center justify-center text-[#0D4838] transition-transform duration-300 ${
                          isExpanded ? "rotate-180 bg-[#0D4838] text-white" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Nội dung chi tiết mở rộng (Accordion Body) */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-[#dfd7c8]/60 bg-[#FDFBF7]/40 space-y-4 animate-in fade-in duration-200">
                      {/* Tóm tắt & mô tả chi tiết */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7D7063]">
                          Mục Tiêu & Định Hướng Nội Dung
                        </h4>
                        <p className="text-xs sm:text-sm text-[#132A24] leading-relaxed">
                          {session.description || session.subTitle}
                        </p>
                      </div>

                      {/* Diễn giả tham gia phiên */}
                      {session.speakers && session.speakers.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-[#dfd7c8]/50">
                          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#7D7063] flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#C29B57]" />
                            <span>Diễn Giả Tham Luận & Tọa Đàm</span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {session.speakers.map((sp) => (
                              <div
                                key={sp.id}
                                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#dfd7c8] shadow-2xs"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#0D4838]/10 text-[#0D4838] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                  <UserCheck className="w-4 h-4 text-[#0D4838]" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h5 className="text-xs font-serif font-bold text-[#132A24] truncate">
                                      {sp.name}
                                    </h5>
                                    {sp.degree && (
                                      <Badge className="bg-[#0D4838] text-white text-[9px] px-1.5 py-0">
                                        {sp.degree}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#4A5E57] truncate">{sp.title}</p>
                                  {sp.topicSummary && (
                                    <p className="text-[10px] text-[#0D4838] italic line-clamp-1 pt-0.5">
                                      Chủ đề: &ldquo;{sp.topicSummary}&rdquo;
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action CTA của phiên */}
                      <div className="pt-3 flex items-center justify-between text-xs text-[#5c554b]">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C29B57]" />
                          <span>Địa điểm: {session.room}</span>
                        </span>

                        <a
                          href="#tai-lieu"
                          className="text-[#0D4838] hover:text-[#C29B57] font-semibold flex items-center gap-1"
                        >
                          <span>Tài liệu tham luận phiên này</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
