/**
 * COMPONENT: KỲ DIỄN ĐÀN NỔI BẬT (EVENT HIGHLIGHT SECTION)
 * Thiết kế mới theo yêu cầu:
 * - Tên kỳ & Tên phiên
 * - Mô tả chi tiết
 * - Diễn giả với ảnh đại diện (khi bấm vào hiện modal thông tin diễn giả)
 * - Phiên & thời gian diễn ra
 * - Bố cục Fullwidth hiện đại, đạt chuẩn thẩm mỹ di sản
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle,
  X,
  Award,
  Building2,
  BookOpen,
  ShieldCheck,
  Info,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/animations";
import type { EventHighlight, EventSession, EventSpeaker } from "../types/home.types";

interface EventHighlightSectionProps {
  event: EventHighlight;
}

export function EventHighlightSection({ event }: EventHighlightSectionProps) {
  // State quản lý xem thông tin chi tiết diễn giả (Modal)
  const [selectedSpeaker, setSelectedSpeaker] = useState<EventSpeaker | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EE]/50 border-b border-[#DFD8C8]">
      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-10">
        {/* ======================================================== */}
        {/* 1. TIÊU ĐỀ KHỐI & TRẠNG THÁI                             */}
        {/* ======================================================== */}
        <FadeIn
          direction="up"
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DFD8C8] pb-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D4838]/10 text-[#0D4838] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>{event.edition}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0D4838] leading-tight">
              {event.heading || "Kỳ Diễn Đàn Đang Diễn Ra"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A5E57] max-w-3xl leading-relaxed">
              {event.subHeading ||
                "Không gian học thuật và đối thoại đa chiều lớn nhất trong năm về chính sách, nguồn vốn và giải pháp chuyển hóa di sản thành tài sản phát triển kinh tế bền vững."}
            </p>
          </div>

          <Badge className="bg-[#0D4838] text-white px-4 py-2 text-xs sm:text-sm font-bold self-start md:self-auto border border-[#C29B57]/50 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            {event.statusBadge}
          </Badge>
        </FadeIn>

        {/* ======================================================== */}
        {/* 2. THẺ CHÍNH KỲ DIỄN ĐÀN NỔI BẬT & CÁC PHIÊN NGHỊ SỰ     */}
        {/* Gom chung toàn bộ thông tin & các phiên vào 1 card duy   */}
        {/* nhất, không tách nhỏ thành nhiều khối viền lắt nhắt       */}
        {/* ======================================================== */}
        <FadeIn
          direction="up"
          delay={0.1}
          className="rounded-3xl bg-white border border-[#DFD8C8] shadow-md overflow-hidden"
        >
          {/* PHẦN 1: TỔNG QUAN CHỦ ĐỀ TOÀN THỂ & 4 THÔNG SỐ CỐT LÕI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* CỘT TRÁI: ẢNH BANNER SỰ KIỆN */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] lg:min-h-full bg-[#073327] overflow-hidden group">
              <Image
                src={
                  event.bannerUrl ||
                  "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&h=800&q=85"
                }
                alt={event.title}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D4838]/90 text-[#C29B57] text-[11px] font-bold uppercase tracking-widest mb-2 border border-[#C29B57]/40 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{event.edition || "Kỳ Diễn Đàn 2026"}</span>
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-white/95 leading-snug drop-shadow-sm">
                  {event.theme || "Kinh tế di sản trong kỷ nguyên số"}
                </p>
              </div>
            </div>

            {/* CỘT PHẢI: NỘI DUNG CHỦ ĐỀ & 4 THÔNG SỐ CỐT LÕI */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              {/* Tên & Mô tả chủ đề */}
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-md bg-[#F5EEDB] text-[#8C6D32] text-xs font-bold uppercase tracking-wider">
                  Chủ đề nghị sự toàn thể
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0D4838] leading-tight sm:leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2E433C] leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* 4 Chỉ số & Thông tin cốt lõi (2x2 grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#F7F5EE]/80 border border-[#DFD8C8] text-xs sm:text-sm">
                <div className="flex items-start gap-3 min-w-0">
                  <Calendar className="w-5 h-5 text-[#C29B57] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                      Thời gian diễn ra:
                    </span>
                    <span className="font-bold text-[#0D4838] text-xs sm:text-sm mt-0.5 block break-words">
                      {event.dates}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 min-w-0">
                  <MapPin className="w-5 h-5 text-[#0D4838] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                      Địa điểm tổ chức:
                    </span>
                    <span
                      className="font-bold text-[#0D4838] text-xs sm:text-sm mt-0.5 block break-words line-clamp-2"
                      title={event.location}
                    >
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 min-w-0">
                  <Users className="w-5 h-5 text-[#C29B57] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                      Quy mô đại biểu:
                    </span>
                    <span className="font-bold text-[#0D4838] text-xs sm:text-sm mt-0.5 block break-words">
                      <AnimatedCounter to={event.attendeesExpected} suffix="+ Đại biểu" />
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 min-w-0">
                  <Clock className="w-5 h-5 text-[#0D4838] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                      Hạn chót đăng ký:
                    </span>
                    <span className="font-bold text-[#0D4838] text-xs sm:text-sm mt-0.5 block break-words">
                      Trước ngày {event.registrationDeadline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PHẦN 2: CHƯƠNG TRÌNH CÁC PHIÊN NGHỊ SỰ (GOM CHUNG LIỀN MẠCH, KHÔNG TÁCH NHIỀU BORDER HỘP) */}
          <div className="border-t border-[#DFD8C8] bg-white p-6 sm:p-8 lg:p-10 space-y-6">
            {/* Tiêu đề phần lịch trình các phiên */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DFD8C8]/70">
              <div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#0D4838] flex items-center gap-2">
                  <HefIcon name="Layers" size="sm" variant="gold" />
                  <span>Chương Trình Các Phiên Nghị Sự</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#4A5E57] mt-1">
                  Lịch trình đối thoại khoa học, thảo luận chính sách và danh sách diễn giả tham luận chính thức.
                </p>
              </div>

              <Badge variant="outline" className="border-[#0D4838]/30 text-[#0D4838] bg-[#F7F5EE] text-xs font-semibold px-3 py-1.5 self-start sm:self-auto shadow-2xs">
                04 Phiên Chuyên Đề Chính Thức
              </Badge>
            </div>

            {/* Danh sách các phiên: Liệt kê dạng timeline/agenda phân cách bằng border-b mảnh (divide-y) */}
            <div className="divide-y divide-[#DFD8C8]/70">
              {event.sessions.map((session, idx) => (
                <div key={session.id} className="py-6 first:pt-2 last:pb-2 space-y-3.5">
                  {/* Hàng 1: Badge phiên, Thời gian & Phòng họp */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Badge className="bg-[#0D4838] text-white font-bold text-xs px-2.5 py-0.5">
                        Phiên {session.order || idx + 1}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0D4838]">
                        <Clock className="w-4 h-4 text-[#C29B57]" />
                        <span>
                          {session.date} • {session.time}
                        </span>
                      </div>
                    </div>

                    {session.room && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#4A5E57] font-medium bg-[#F7F5EE] px-3 py-1 rounded-full border border-[#DFD8C8]">
                        <MapPin className="w-3.5 h-3.5 text-[#C29B57]" />
                        <span>{session.room}</span>
                      </div>
                    )}
                  </div>

                  {/* Hàng 2: Tên & Mô tả phiên */}
                  <div className="space-y-1.5">
                    {session.subTitle && (
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C29B57] block">
                        {session.subTitle}
                      </span>
                    )}

                    <h5 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#0D4838] leading-snug">
                      {session.title}
                    </h5>

                    {session.description && (
                      <p className="text-xs sm:text-sm text-[#3E524B] leading-relaxed">
                        {session.description}
                      </p>
                    )}

                    {session.chairperson && (
                      <p className="text-xs font-semibold text-[#0D4838] pt-0.5">
                        <span className="text-[#8C6D32]">Chủ trì phiên:</span> {session.chairperson}
                      </p>
                    )}
                  </div>

                  {/* Hàng 3: Diễn giả của phiên (dạng chip gọn gàng) */}
                  {session.speakers && session.speakers.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-[#5C6E67] uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
                        <Users className="w-3.5 h-3.5 text-[#C29B57]" /> Diễn giả:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {session.speakers.map((sp) => (
                          <button
                            key={sp.id}
                            type="button"
                            onClick={() => setSelectedSpeaker(sp)}
                            className="group inline-flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[#F7F5EE] hover:bg-[#EFEAE0] border border-[#DFD8C8] hover:border-[#C29B57] transition-all cursor-pointer text-left shadow-2xs"
                          >
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden shrink-0 border border-[#C29B57]/40 bg-muted">
                              <Image
                                src={sp.avatarUrl}
                                alt={sp.name}
                                fill
                                sizes="32px"
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-[#0D4838] group-hover:text-[#073327] block truncate">
                                {sp.name}
                              </span>
                              <span className="text-[10px] text-[#5C6E67] block truncate max-w-[140px] sm:max-w-[180px]">
                                {sp.organization || sp.title}
                              </span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-[#C29B57] group-hover:translate-x-0.5 transition-transform shrink-0 ml-0.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PHẦN 3: CỤM NÚT HÀNH ĐỘNG CUỐI THẺ DIỄN ĐÀN (CTA FOOTER) */}
          <div className="border-t border-[#DFD8C8] bg-[#F7F5EE]/90 p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5E57]">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Miễn phí tham dự phiên toàn thể cho các nhà khoa học, đại diện hiệp hội & sinh viên.
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href={event.registrationUrl || "/lien-he?loai=tham-du#contact-form"} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#0D4838] hover:bg-[#073327] text-white font-bold border border-[#C29B57]/50 shadow-md cursor-pointer px-7 h-11 text-xs sm:text-sm"
                >
                  <span>Đăng ký tham dự đại biểu</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/dien-dan" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white hover:bg-[#F7F5EE] text-[#0D4838] border border-[#DFD8C8] font-bold cursor-pointer px-6 h-11 text-xs sm:text-sm"
                >
                  Xem kỷ yếu chi tiết
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ======================================================== */}
      {/* 6. MODAL CHI TIẾT THÔNG TIN DIỄN GIẢ (SPEAKER DIALOG)    */}
      {/* ======================================================== */}
      {selectedSpeaker && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="speaker-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-[#C29B57]/60 shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng modal */}
            <button
              type="button"
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#4A5E57] hover:text-[#0D4838] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Chi tiết diễn giả */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Cột Trái: Ảnh chân dung */}
              <div className="sm:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#C29B57] shadow-md bg-muted">
                  <Image
                    src={selectedSpeaker.avatarUrl}
                    alt={selectedSpeaker.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 240px"
                    className="object-cover"
                    priority
                  />
                  {selectedSpeaker.degree && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-[#0D4838] text-white border border-[#C29B57]/50 font-bold">
                        {selectedSpeaker.degree}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="w-full mt-3 flex items-center justify-between text-xs text-[#4A5E57] px-1">
                  <span className="flex items-center gap-1 text-[#C29B57] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Diễn giả chính thức
                  </span>
                  <span>Kỳ 2026</span>
                </div>
              </div>

              {/* Cột Phải: Thông tin chức vụ & bài tham luận */}
              <div className="sm:col-span-7 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C29B57] block">
                    {selectedSpeaker.sessionTitle || "Phiên Nghị Sự Diễn Đàn"}
                  </span>
                  <h3
                    id="speaker-modal-title"
                    className="text-xl sm:text-2xl font-serif font-bold text-[#0D4838] mt-1"
                  >
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#132A24] mt-0.5">
                    {selectedSpeaker.title}
                  </p>
                  <p className="text-xs text-[#4A5E57] flex items-center gap-1.5 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                    {selectedSpeaker.organization}
                  </p>
                </div>

                {/* Tham luận chính */}
                {selectedSpeaker.topicSummary && (
                  <div className="p-3.5 rounded-xl bg-[#F7F5EE] border border-[#DFD8C8] space-y-1">
                    <span className="text-[11px] font-bold uppercase text-[#0D4838] flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#C29B57]" />
                      Chủ đề tham luận:
                    </span>
                    <p className="text-xs font-semibold text-[#132A24] italic leading-relaxed">
                      &ldquo;{selectedSpeaker.topicSummary}&rdquo;
                    </p>
                  </div>
                )}

                {/* Tiểu sử */}
                {selectedSpeaker.bio && (
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#0D4838] uppercase tracking-wider block">
                      Tiểu sử & Kinh nghiệm:
                    </span>
                    <p className="text-xs sm:text-sm text-[#2E433C] leading-relaxed">
                      {selectedSpeaker.bio}
                    </p>
                  </div>
                )}

                {/* Nút đăng ký */}
                <div className="pt-2 flex items-center gap-2">
                  <Link href={event.registrationUrl} className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-[#0D4838] hover:bg-[#073327] text-white font-bold border border-[#C29B57]/40 text-xs"
                    >
                      Đăng ký nghe tham luận
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSpeaker(null)}
                    className="border-[#DFD8C8] text-xs font-semibold"
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
