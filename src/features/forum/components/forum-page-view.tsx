/**
 * COMPONENT: FORUM PAGE VIEW (TRANG KỲ DIỄN ĐÀN THEO ĐÚNG WIREFRAME PRD)
 * Hỗ trợ Schema.org Event (Timezone Asia/Ho_Chi_Minh), lọc năm, sticky nav, 4 phiên, timeline, diễn giả, tài liệu, kết quả
 */

import { ForumHero } from "./forum-hero";
import { ForumOutcomesSection } from "./forum-outcomes-section";
import { ForumSessionsSection } from "./forum-sessions-section";
import { ForumTimelineSection } from "./forum-timeline-section";
import { ForumSpeakersSection } from "./forum-speakers-section";
import { ForumResourcesSection } from "./forum-resources-section";
import { ForumPartnersSection } from "./forum-partners-section";
import { ForumFaqSection } from "./forum-faq-section";
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

      {/* 2. NỘI DUNG NỘI TRANG (Anchor: #tong-quan) */}
      <div id="tong-quan">
        {/* Kỳ đã kết thúc (2025): Ưu tiên hiển thị Kết quả & Tuyên bố chung ngay sau Hero theo PRD */}
        {isConcluded && <ForumOutcomesSection edition={edition} />}

        {/* CÁC PHIÊN NGHỊ SỰ CHUYÊN ĐỀ (#cac-phien) */}
        <ForumSessionsSection sessions={edition.sessions} />

        {/* LỊCH TRÌNH TIMELINE (#timeline) */}
        <ForumTimelineSection timeline={edition.timeline} />

        {/* DIỄN GIẢ TIÊU BIỂU (#dien-gia) */}
        <ForumSpeakersSection speakers={edition.speakers} />

        {/* THƯ VIỆN & TÀI LIỆU (#tai-lieu) */}
        <ForumResourcesSection resources={edition.resources} gallery={edition.gallery} />

        {/* Kỳ sắp diễn ra: Hiển thị mục Mục tiêu & Kỳ vọng kết quả (#ket-qua) */}
        {!isConcluded && <ForumOutcomesSection edition={edition} />}

        {/* BAN TỔ CHỨC & ĐỐI TÁC (#doi-tac: 6 Logo BTC 2x3) */}
        <ForumPartnersSection />

        {/* HỎI ĐÁP FAQ (#faq) */}
        <ForumFaqSection />
      </div>
    </div>
  );
}
