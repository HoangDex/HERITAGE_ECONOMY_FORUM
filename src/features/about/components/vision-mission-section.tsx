/**
 * COMPONENT: TẦM NHÌN – SỨ MỆNH – GIÁ TRỊ CỐT LÕI (MỤC 6.1)
 * Wireframe: 2 thẻ lớn cạnh nhau trên desktop, xếp dọc trên mobile
 */

"use client";

import React from "react";
import { Eye, Target, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HefIcon } from "@/components/icons";
import type { VisionMission } from "../types/about.types";

interface VisionMissionSectionProps {
  data: VisionMission;
}

export function VisionMissionSection({ data }: VisionMissionSectionProps) {
  return (
    <section id="about" className="py-12 sm:py-16 scroll-mt-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        {/* Phần Dẫn Nhập Tôn Chỉ Nền Tảng */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76232D]/10 text-[#76232D] dark:text-[#C29B57] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Mục 6.1 • Tôn Chỉ Diễn Đàn</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] leading-tight">
            Nền Tảng Kết Nối & Kiến Tạo Kinh Tế Di Sản
          </h2>
          <p className="mt-4 text-base text-foreground/80 leading-relaxed text-justify sm:text-center">
            {data.aboutPlatform}
          </p>
        </div>

        {/* Wireframe Desktop: 2 thẻ lớn cạnh nhau | Mobile: xếp dọc */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* THẺ TẦM NHÌN */}
          <Card className="relative overflow-hidden border-2 border-[#C29B57]/40 bg-gradient-to-br from-card via-card to-[#C29B57]/5 shadow-md hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C29B57]/10 rounded-bl-full pointer-events-none" />
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#76232D] text-[#C29B57] flex items-center justify-center shrink-0 shadow-xs">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C29B57]">
                  Định hướng dài hạn
                </span>
                <CardTitle className="text-xl sm:text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
                  TẦM NHÌN
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-medium text-foreground/90 leading-relaxed italic border-l-4 border-[#C29B57] pl-4 my-2">
                &ldquo;{data.vision}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Khẳng định vị thế Diễn đàn là trung tâm tri thức, đối thoại chính sách và thẩm định
                mô hình thực hành kinh tế di sản hàng đầu, kết nối chặt chẽ giữa Việt Nam và mạng
                lưới bảo tồn quốc tế.
              </p>
            </CardContent>
          </Card>

          {/* THẺ SỨ MỆNH */}
          <Card className="relative overflow-hidden border-2 border-[#76232D]/30 bg-gradient-to-br from-card via-card to-[#76232D]/5 shadow-md hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#76232D]/10 rounded-bl-full pointer-events-none" />
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#C29B57] text-[#76232D] flex items-center justify-center shrink-0 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#76232D] dark:text-[#C29B57]">
                  Cam kết hành động
                </span>
                <CardTitle className="text-xl sm:text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
                  SỨ MỆNH
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-medium text-foreground/90 leading-relaxed italic border-l-4 border-[#76232D] pl-4 my-2">
                &ldquo;{data.mission}&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Biến tài nguyên di sản thành động lực tăng trưởng bao trùm, đảm bảo sự cân bằng hài
                hòa giữa bảo tồn di tích cổ và sinh kế phồn vinh cho cộng đồng người dân bản địa.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 5 GIÁ TRỊ CỐT LÕI */}
        <div className="rounded-2xl bg-muted/40 border border-border p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#C29B57] uppercase">
                Hệ giá trị cốt lõi
              </span>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
                5 Giá Trị Định Hình Mọi Hoạt Động Của Diễn Đàn
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="w-4 h-4 text-[#C29B57]" />
              <span>Chuẩn mực văn hóa & hành động</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.coreValues.map((val, idx) => (
              <div
                key={val.id}
                className="group relative bg-card p-5 rounded-xl border border-border hover:border-[#C29B57] transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#76232D]/10 text-[#76232D] dark:text-[#C29B57] flex items-center justify-center mb-3 group-hover:bg-[#76232D] group-hover:text-[#C29B57] transition-colors">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <HefIcon name={val.iconName as any} size="sm" variant="current" />
                  </div>
                  <div className="text-xs font-bold text-[#C29B57] mb-1">0{idx + 1}. GIÁ TRỊ</div>
                  <h4 className="text-base font-bold font-serif text-foreground mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{val.description}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-border/50 flex items-center gap-1 text-[11px] text-[#76232D] dark:text-[#C29B57] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn mực HEF
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
