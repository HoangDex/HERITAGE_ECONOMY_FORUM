import { Clock, MapPin, CalendarDays } from "lucide-react";
import type { ForumTimelineSlot } from "../types/forum-edition.types";

interface ForumTimelineSectionProps {
  timeline: ForumTimelineSlot[];
}

export function ForumTimelineSection({ timeline }: ForumTimelineSectionProps) {
  const morningSlots = timeline.filter((s) => s.period === "morning");
  const afternoonSlots = timeline.filter((s) => s.period === "afternoon");

  return (
    <section id="timeline" className="py-12 bg-white/60 border-y border-[#dfd7c8] scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C29B57]/15 text-[#76232D]">
            Lịch Trình Chi Tiết
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            Trục Thời Gian Nghị Sự
          </h2>
          <p className="text-[#5c554b] max-w-2xl text-base">
            Khung giờ làm việc phân bổ đồng bộ giữa các phiên toàn thể tại hội trường lớn và các
            phiên thảo luận chuyên sâu tại phòng chuyên đề.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buổi sáng */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-[#76232D] text-[#76232D] font-bold text-lg">
              <CalendarDays className="w-5 h-5 text-[#76232D]" />
              <span>Khung Giờ Buổi Sáng (08:00 – 12:00)</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dfd7c8]">
              {morningSlots.map((slot) => (
                <div key={slot.id} className="relative group">
                  <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-[#76232D] ring-4 ring-[#F5EFE5]" />
                  <div className="bg-white p-4 rounded-xl border border-[#dfd7c8] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76232D]">
                        <Clock className="w-3.5 h-3.5" />
                        {slot.time}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#5c554b] bg-[#F5EFE5] px-2 py-0.5 rounded">
                        <MapPin className="w-3 h-3 text-[#C29B57]" />
                        {slot.room}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#292929] text-base leading-snug">
                      {slot.title}
                    </h3>
                    <p className="text-xs text-[#5c554b]">
                      Điều phối / Trình bày:{" "}
                      <span className="font-medium text-[#292929]">{slot.speakerOrChair}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buổi chiều */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-[#C29B57] text-[#76232D] font-bold text-lg">
              <CalendarDays className="w-5 h-5 text-[#C29B57]" />
              <span>Khung Giờ Buổi Chiều (13:30 – 17:30)</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dfd7c8]">
              {afternoonSlots.map((slot) => (
                <div key={slot.id} className="relative group">
                  <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-[#C29B57] ring-4 ring-[#F5EFE5]" />
                  <div className="bg-white p-4 rounded-xl border border-[#dfd7c8] shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76232D]">
                        <Clock className="w-3.5 h-3.5" />
                        {slot.time}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#5c554b] bg-[#F5EFE5] px-2 py-0.5 rounded">
                        <MapPin className="w-3 h-3 text-[#C29B57]" />
                        {slot.room}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#292929] text-base leading-snug">
                      {slot.title}
                    </h3>
                    <p className="text-xs text-[#5c554b]">
                      Điều phối / Trình bày:{" "}
                      <span className="font-medium text-[#292929]">{slot.speakerOrChair}</span>
                    </p>
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
