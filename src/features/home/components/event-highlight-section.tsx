/**
 * COMPONENT: KỲ DIỄN ĐÀN NỔI BẬT (BANNER RỘNG + THÔNG TIN KỲ + CTA)
 * Thông tin: ảnh, ngày, địa điểm, chủ đề, các phiên hội thảo và đăng ký
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import type { EventHighlight } from "../types/home.types";

interface EventHighlightSectionProps {
  event: EventHighlight;
}

export function EventHighlightSection({ event }: EventHighlightSectionProps) {
  return (
    <section className="py-14 sm:py-20 bg-muted/30 border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        {/* Tiêu đề & Tag sự kiện */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29B57]/15 text-[#C29B57] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{event.edition}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] leading-tight">
              Kỳ Diễn Đàn Đang Diễn Ra
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Sự kiện thường niên lớn nhất về chính sách và xúc tiến đầu tư kinh tế di sản tại Việt
              Nam.
            </p>
          </div>

          <Badge className="bg-[#76232D] text-white px-3 py-1.5 text-xs font-bold self-start md:self-auto border border-[#C29B57]/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            {event.statusBadge}
          </Badge>
        </div>

        {/* Khối Banner Rộng Sự Kiện */}
        <div className="rounded-2xl bg-card border-2 border-[#C29B57]/50 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Banner Ảnh Tỷ Lệ Rộng */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-black">
              <Image
                src={event.bannerUrl}
                alt={event.title}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#C29B57] font-bold block mb-1">
                  Chủ đề kỳ họp:
                </span>
                <p className="text-sm sm:text-base font-serif font-bold leading-snug drop-shadow-md">
                  {event.theme}
                </p>
              </div>
            </div>

            {/* Thông tin Chi Tiết Kỳ Diễn Đàn & Các Phiên */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Hộp Thông Tin Thời Gian, Địa Điểm, Quy Mô */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl bg-muted/60 border border-border text-xs">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-muted-foreground block">
                      Thời gian diễn ra:
                    </span>
                    <span className="font-bold text-foreground">{event.dates}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#76232D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-muted-foreground block">
                      Địa điểm tổ chức:
                    </span>
                    <span className="font-bold text-foreground">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-muted-foreground block">
                      Quy mô đại biểu:
                    </span>
                    <span className="font-bold text-foreground">
                      {event.attendeesExpected}+ Đại biểu
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-muted-foreground block">
                      Hạn chót đăng ký:
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Trước ngày {event.registrationDeadline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Danh sách 4 phiên hội thảo */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <HefIcon name="Layers" size="xs" variant="gold" />
                  <span>Chương trình các phiên nghị sự trọng tâm:</span>
                </h4>

                <div className="space-y-2">
                  {event.sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-3 rounded-lg bg-background border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:border-[#C29B57]/60 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-[#C29B57] block">
                          {sess.time}
                        </span>
                        <h5 className="text-xs sm:text-sm font-semibold text-foreground">
                          {sess.title}
                        </h5>
                      </div>
                      {sess.chairperson && (
                        <span className="text-[11px] text-muted-foreground italic shrink-0">
                          {sess.chairperson}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút CTA Đăng ký tham dự */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link href={event.registrationUrl} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#76232D] hover:bg-[#5e1c24] text-white font-bold border border-[#C29B57]/50 shadow-md cursor-pointer px-6"
                  >
                    <span>Đăng ký tham dự đại biểu</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/forum" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
                    Xem chương trình chi tiết
                  </Button>
                </Link>

                <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2 sm:mt-0">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Miễn phí tham dự phiên mở
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
