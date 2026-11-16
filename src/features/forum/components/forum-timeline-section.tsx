/**
 * COMPONENT: FORUM TIMELINE SECTION (LỊCH TRÌNH NGHỊ SỰ TINH GỌN)
 * Bố cục trực quan, dễ quét mắt (scannable), loại bỏ nhãn chữ dư thừa
 */

import { Clock, MapPin, CalendarDays, User, Sparkles } from "lucide-react";
import type { ForumTimelineSlot } from "../types/forum-edition.types";

interface ForumTimelineSectionProps {
  timeline: ForumTimelineSlot[];
}

export function ForumTimelineSection({ timeline }: ForumTimelineSectionProps) {
  const morningSlots = timeline.filter((s) => s.period === "morning");
  const afternoonSlots = timeline.filter((s) => s.period === "afternoon");

  return (
    <section
      id="timeline"
      className="py-12 sm:py-16 bg-[#FDFBF7] border-y border-[#dfd7c8] scroll-mt-28"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
        {/* Tiêu đề ngắn gọn */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C29B57]/15 text-[#0D4838]">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Khung Giờ Hoạt Động</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
            Lịch Trình Chi Tiết
          </h2>
          <p className="text-sm text-[#5c554b] max-w-2xl">
            Các mốc thời gian làm việc chính thức trong ngày 18/11/2026.
          </p>
        </div>

        {/* Khung 2 cột Sáng & Chiều - Dạng Timeline gọn gàng */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buổi sáng */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b-2 border-[#0D4838] text-[#0D4838] font-bold text-base font-serif">
              <CalendarDays className="w-4 h-4 text-[#0D4838]" />
              <span>Phiên Buổi Sáng (08:00 – 12:00)</span>
            </div>

            <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dfd7c8]">
              {morningSlots.map((slot) => (
                <div key={slot.id} className="relative group">
                  <div className="absolute -left-[19px] top-3.5 w-2.5 h-2.5 rounded-full bg-[#0D4838] ring-4 ring-[#FDFBF7]" />
                  <div className="bg-white p-3.5 rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] shadow-2xs space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D4838]">
                        <Clock className="w-3 h-3 text-[#C29B57]" />
                        {slot.time}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#5c554b] bg-[#F7F5EE] px-2 py-0.5 rounded">
                        <MapPin className="w-3 h-3 text-[#C29B57]" />
                        {slot.room}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-[#132A24] text-sm leading-snug">
                      {slot.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#5c554b]">
                      <User className="w-3 h-3 text-[#C29B57] shrink-0" />
                      <span className="font-medium text-[#132A24] truncate">
                        {slot.speakerOrChair}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buổi chiều */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b-2 border-[#C29B57] text-[#0D4838] font-bold text-base font-serif">
              <CalendarDays className="w-4 h-4 text-[#C29B57]" />
              <span>Phiên Buổi Chiều (13:30 – 17:30)</span>
            </div>

            <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dfd7c8]">
              {afternoonSlots.map((slot) => (
                <div key={slot.id} className="relative group">
                  <div className="absolute -left-[19px] top-3.5 w-2.5 h-2.5 rounded-full bg-[#C29B57] ring-4 ring-[#FDFBF7]" />
                  <div className="bg-white p-3.5 rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] shadow-2xs space-y-1.5 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D4838]">
                        <Clock className="w-3 h-3 text-[#C29B57]" />
                        {slot.time}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#5c554b] bg-[#F7F5EE] px-2 py-0.5 rounded">
                        <MapPin className="w-3 h-3 text-[#C29B57]" />
                        {slot.room}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-[#132A24] text-sm leading-snug">
                      {slot.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#5c554b]">
                      <User className="w-3 h-3 text-[#C29B57] shrink-0" />
                      <span className="font-medium text-[#132A24] truncate">
                        {slot.speakerOrChair}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
