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

  // State lọc theo phiên: "all" hoặc id phiên (sess_1, sess_2, ...)
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedSessions =
    activeTab === "all" ? event.sessions : event.sessions.filter((s) => s.id === activeTab);

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
              Kỳ Diễn Đàn Đang Diễn Ra
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4A5E57] max-w-3xl leading-relaxed">
              Không gian học thuật và đối thoại đa chiều lớn nhất trong năm về chính sách, nguồn vốn
              và giải pháp chuyển hóa di sản thành tài sản phát triển kinh tế bền vững.
            </p>
          </div>

          <Badge className="bg-[#0D4838] text-white px-4 py-2 text-xs sm:text-sm font-bold self-start md:self-auto border border-[#C29B57]/50 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            {event.statusBadge}
          </Badge>
        </FadeIn>

        {/* ======================================================== */}
        {/* 2. KHỐI TỔNG QUAN KỲ DIỄN ĐÀN (HERO OVERVIEW CARD)      */}
        {/* ======================================================== */}
        <FadeIn
          direction="up"
          delay={0.1}
          className="rounded-3xl bg-white border border-[#DFD8C8] shadow-md p-6 sm:p-8 lg:p-10 space-y-6"
        >
          {/* Tên & Mô tả chủ đề tổng quan */}
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-md bg-[#C29B57]/15 text-[#8C6D32] text-xs font-bold uppercase tracking-wider">
              Chủ đề nghị sự toàn thể
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0D4838] leading-snug">
              {event.title}
            </h3>
            <p className="text-sm sm:text-base text-[#2E433C] leading-relaxed max-w-5xl">
              {event.description}
            </p>
          </div>

          {/* 4 Chỉ số & Thông tin cốt lõi (Thời gian, Địa điểm, Quy mô, Hạn đăng ký) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F7F5EE]/80 border border-[#DFD8C8] text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#C29B57] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                  Thời gian diễn ra:
                </span>
                <span className="font-bold text-[#0D4838] text-sm sm:text-base mt-0.5 block">
                  {event.dates}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#0D4838] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                  Địa điểm tổ chức:
                </span>
                <span className="font-bold text-[#0D4838] text-sm sm:text-base mt-0.5 block line-clamp-2">
                  {event.location}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#C29B57] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                  Quy mô đại biểu:
                </span>
                <span className="font-bold text-[#0D4838] text-sm sm:text-base mt-0.5 block">
                  <AnimatedCounter to={event.attendeesExpected} suffix="+ Đại biểu" />
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-[#5C6E67] font-semibold uppercase tracking-wider block">
                  Hạn chót đăng ký:
                </span>
                <span className="font-bold text-emerald-700 text-sm sm:text-base mt-0.5 block">
                  Trước ngày {event.registrationDeadline}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ======================================================== */}
        {/* 3. BỘ CHỌN PHIÊN (TABS CHUYÊN ĐỀ)                        */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#0D4838] flex items-center gap-2">
                <HefIcon name="Layers" size="sm" variant="gold" />
                <span>Chương Trình Các Phiên Nghị Sự & Diễn Giả</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#4A5E57] mt-1">
                Bấm vào ảnh hoặc hồ sơ của từng diễn giả để xem thông tin chi tiết, tiểu sử và chủ
                đề tham luận.
              </p>
            </div>

            {/* Bộ Tabs Lọc Phiên */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[#0D4838] text-white shadow-xs"
                    : "bg-white text-[#4A5E57] hover:text-[#0D4838] border border-[#DFD8C8]"
                }`}
              >
                Tất cả các phiên ({event.sessions.length})
              </button>
              {event.sessions.map((sess) => (
                <button
                  key={sess.id}
                  type="button"
                  onClick={() => setActiveTab(sess.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeTab === sess.id
                      ? "bg-[#0D4838] text-white shadow-xs"
                      : "bg-white text-[#4A5E57] hover:text-[#0D4838] border border-[#DFD8C8]"
                  }`}
                >
                  Phiên {sess.order || ""}: {sess.date?.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* 4. DANH SÁCH CHI TIẾT CÁC PHIÊN & DIỄN GIẢ              */}
          {/* ======================================================== */}
          <StaggerContainer className="grid grid-cols-1 gap-6">
            {displayedSessions.map((session) => (
              <StaggerItem key={session.id}>
                <div className="rounded-3xl bg-white border-2 border-[#DFD8C8] hover:border-[#C29B57]/70 transition-all shadow-sm hover:shadow-md p-6 sm:p-8 lg:p-10 space-y-6">
                  {/* Hàng Header Phiên: Số thứ tự + Ngày giờ + Phòng họp */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DFD8C8]/70">
                    <div className="flex items-center gap-2.5">
                      <Badge className="bg-[#C29B57] text-[#132A24] font-bold px-3 py-1 text-xs">
                        Phiên {session.order || 1}
                      </Badge>
                      <span className="text-xs sm:text-sm font-bold text-[#0D4838] flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#C29B57]" />
                        {session.date} • {session.time}
                      </span>
                    </div>

                    {session.room && (
                      <span className="text-xs text-[#4A5E57] font-semibold flex items-center gap-1.5 bg-[#F7F5EE] px-3 py-1 rounded-full border border-[#DFD8C8]">
                        <MapPin className="w-3.5 h-3.5 text-[#0D4838]" />
                        {session.room}
                      </span>
                    )}
                  </div>

                  {/* Tên phiên & Mô tả */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0D4838] leading-snug">
                      {session.title}
                    </h3>
                    {session.subTitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#C29B57]">
                        {session.subTitle}
                      </p>
                    )}
                    {session.description && (
                      <p className="text-xs sm:text-sm text-[#2E433C] leading-relaxed pt-1">
                        {session.description}
                      </p>
                    )}
                  </div>

                  {/* DIỄN GIẢ CỦA PHIÊN: CÓ ẢNH VÀ BẤM VÀO HIỆN MODAL */}
                  {session.speakers && session.speakers.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-[#DFD8C8]/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0D4838] flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#C29B57]" />
                          Chủ trì & Diễn giả phiên nghị sự:
                        </span>
                        <span className="text-[11px] text-[#4A5E57] italic hidden sm:inline">
                          (Nhấn vào diễn giả để xem thông tin)
                        </span>
                      </div>

                      {/* Lưới Thẻ Diễn Giả */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {session.speakers.map((sp) => (
                          <div
                            key={sp.id}
                            onClick={() => setSelectedSpeaker(sp)}
                            className="group flex items-start gap-4 p-4 rounded-2xl bg-[#F7F5EE]/60 hover:bg-[#F7F5EE] border border-[#DFD8C8] hover:border-[#C29B57] transition-all cursor-pointer shadow-2xs hover:shadow-sm"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setSelectedSpeaker(sp);
                              }
                            }}
                          >
                            {/* Ảnh đại diện diễn giả tỉ lệ 4:5 có Badge học hàm */}
                            <div className="relative w-20 sm:w-24 aspect-[4/5] rounded-xl overflow-hidden shrink-0 border border-[#C29B57]/50 shadow-xs bg-muted">
                              <Image
                                src={sp.avatarUrl}
                                alt={sp.name}
                                fill
                                sizes="100px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {sp.degree && (
                                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-sm bg-[#0D4838] text-white text-[9px] font-bold shadow-2xs">
                                  {sp.degree}
                                </span>
                              )}
                            </div>

                            {/* Thông tin nhanh của diễn giả */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="text-sm sm:text-base font-bold text-[#0D4838] group-hover:text-[#073327] transition-colors truncate">
                                  {sp.name}
                                </h5>
                                <span className="text-[11px] font-bold text-[#C29B57] group-hover:underline flex items-center gap-0.5 shrink-0">
                                  Chi tiết <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>

                              <p className="text-xs font-semibold text-[#4A5E57] line-clamp-1">
                                {sp.title}
                              </p>

                              <p className="text-[11px] text-[#5C6E67] line-clamp-1">
                                {sp.organization}
                              </p>

                              {sp.topicSummary && (
                                <p className="text-[11px] text-[#0D4838] italic line-clamp-2 pt-1 border-t border-[#DFD8C8]/60 mt-1">
                                  &ldquo;{sp.topicSummary}&rdquo;
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ======================================================== */}
        {/* 5. CỤM NÚT HÀNH ĐỘNG CUỐI KHỐI (CTA BAR)                */}
        {/* ======================================================== */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#DFD8C8] shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5E57]">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Miễn phí tham dự phiên toàn thể cho các nhà khoa học, đại diện hiệp hội & sinh viên.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href={event.registrationUrl} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#0D4838] hover:bg-[#073327] text-white font-bold border border-[#C29B57]/50 shadow-md cursor-pointer px-7 h-12 text-sm"
              >
                <span>Đăng ký tham dự đại biểu</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/forum" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-[#F7F5EE] text-[#0D4838] border border-[#DFD8C8] font-bold cursor-pointer px-6 h-12 text-sm"
              >
                Xem chương trình chi tiết
              </Button>
            </Link>
          </div>
        </div>
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
