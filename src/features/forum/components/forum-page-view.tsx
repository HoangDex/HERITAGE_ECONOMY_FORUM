/**
 * COMPONENT: FORUM PAGE VIEW (TRANG KỲ DIỄN ĐÀN THEO ĐÚNG WIREFRAME PRD)
 * Wireframe Desktop & Mobile:
 * - BANNER KỲ DIỄN ĐÀN: Tên + chủ đề + thời gian + CTA
 * - ĐIỀU HƯỚNG STICKY: Tổng quan | Các phiên | Timeline | Diễn giả | Tài liệu | Kết quả
 * - TỔNG QUAN: Giới thiệu chuyên mục & kỳ diễn đàn
 * - CÁC PHIÊN: 04 phiên nghị sự chuyên đề dạng accordion chi tiết
 * - TIMELINE: Trục thời gian theo buổi (sáng/chiều) và theo phòng
 * - DIỄN GIẢ: Lưới chân dung 3-4 cột (desktop) và 2 cột (mobile), click mở hồ sơ
 * - THƯ VIỆN & TÀI LIỆU: Danh sách file tải có loại file, dung lượng, ảnh/video
 * - KẾT QUẢ: Kỳ kết thúc ưu tiên kết quả, kỳ sắp diễn ra thể hiện kỳ vọng đầu ra
 */

"use client";

import React from "react";
import { Compass, Calendar, MapPin, Users, Building, ShieldCheck, Sparkles } from "lucide-react";
import { ForumHero } from "./forum-hero";
import { ForumOutcomesSection } from "./forum-outcomes-section";
import { ForumSessionsSection } from "./forum-sessions-section";
import { ForumTimelineSection } from "./forum-timeline-section";
import { ForumSpeakersSection } from "./forum-speakers-section";
import { ForumResourcesSection } from "./forum-resources-section";
import { ForumPartnersSection } from "./forum-partners-section";
import { ForumFaqSection } from "./forum-faq-section";
import { FadeIn, InteractiveCard } from "@/components/animations";
import type { ForumEdition } from "../types/forum-edition.types";

interface ForumPageViewProps {
  edition: ForumEdition;
}

export function ForumPageView({ edition }: ForumPageViewProps) {
  const isConcluded = edition.status === "concluded";

  // Cấu trúc Schema.org Event chuẩn SEO (Timezone Asia/Ho_Chi_Minh)
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: edition.title,
    description: edition.theme,
    startDate: edition.startDateIso,
    endDate: edition.endDateIso,
    eventStatus: edition.isDateConfirmed
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventTentative",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: edition.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: edition.venueAddress,
        addressLocality: "Hà Nội",
        addressCountry: "VN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: edition.organizer,
      url: "https://hef.vn",
    },
    performer: edition.speakers.map((sp) => ({
      "@type": "Person",
      name: sp.name,
      jobTitle: sp.title,
      worksFor: {
        "@type": "Organization",
        name: sp.organization,
      },
    })),
  };

  return (
    <div className="space-y-0 pb-16">
      {/* Schema.org Event JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* 1. BANNER KỲ DIỄN ĐÀN */}
      <ForumHero edition={edition} />

      {/* 2. PHẦN TỔNG QUAN & GIỚI THIỆU CHUYÊN MỤC (#tong-quan) */}
      <section id="tong-quan" className="py-12 sm:py-16 bg-[#FDFBF7] scroll-mt-28 border-b border-[#dfd7c8]">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D4838]/10 text-[#0D4838] text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Giới Thiệu Chuyên Mục Kỳ Diễn Đàn</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
              Không Gian Hội Tụ Tri Thức &amp; Sáng Kiến Di Sản
            </h2>
            <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed">
              Các kỳ Diễn đàn Kinh tế Di sản là không gian hội tụ những góc nhìn nghiên cứu, kinh nghiệm thực tiễn
              và sáng kiến hợp tác nhằm nhận diện các cơ hội, thách thức và giải pháp phát triển từ nguồn lực di sản.
            </p>
          </FadeIn>

          {/* 4 Thẻ chỉ số tổng quan kỳ diễn đàn */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InteractiveCard>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dfd7c8] shadow-2xs space-y-1.5 text-center">
                <Calendar className="w-5 h-5 text-[#C29B57] mx-auto" />
                <span className="text-[11px] font-mono text-[#7D7063] uppercase tracking-wider block">Thời Gian</span>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#132A24]">{edition.datesText}</p>
              </div>
            </InteractiveCard>

            <InteractiveCard>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dfd7c8] shadow-2xs space-y-1.5 text-center">
                <MapPin className="w-5 h-5 text-[#C29B57] mx-auto" />
                <span className="text-[11px] font-mono text-[#7D7063] uppercase tracking-wider block">Địa Điểm</span>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#132A24] truncate" title={edition.venueName}>{edition.venueName}</p>
              </div>
            </InteractiveCard>

            <InteractiveCard>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dfd7c8] shadow-2xs space-y-1.5 text-center">
                <Users className="w-5 h-5 text-[#C29B57] mx-auto" />
                <span className="text-[11px] font-mono text-[#7D7063] uppercase tracking-wider block">Quy Mô</span>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#132A24]">800+ Đại biểu</p>
              </div>
            </InteractiveCard>

            <InteractiveCard>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dfd7c8] shadow-2xs space-y-1.5 text-center">
                <ShieldCheck className="w-5 h-5 text-[#C29B57] mx-auto" />
                <span className="text-[11px] font-mono text-[#7D7063] uppercase tracking-wider block">Nghị Sự</span>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#132A24]">04 Phiên Chuyên Đề</p>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>

      {/* 4. NỘI DUNG CHI TIẾT KỲ DIỄN ĐÀN */}
      {/* Kỳ đã kết thúc: Ưu tiên hiển thị Kết quả & Tuyên bố chung ngay sau Tổng quan (PRD) */}
      {isConcluded && <ForumOutcomesSection edition={edition} />}

      {/* CÁC PHIÊN NGHỊ SỰ CHUYÊN ĐỀ (#cac-phien) */}
      <ForumSessionsSection sessions={edition.sessions} />

      {/* LỊCH TRÌNH TIMELINE (#timeline) */}
      <ForumTimelineSection timeline={edition.timeline} />

      {/* DIỄN GIẢ TIÊU BIỂU (#dien-gia) */}
      <ForumSpeakersSection speakers={edition.speakers} />

      {/* THƯ VIỆN & TÀI LIỆU (#tai-lieu) */}
      <ForumResourcesSection resources={edition.resources} gallery={edition.gallery} />

      {/* BAN TỔ CHỨC & ĐỐI TÁC (#doi-tac) */}
      <ForumPartnersSection />

      {/* HỎI ĐÁP FAQ (#faq) */}
      <ForumFaqSection />
    </div>
  );
}
