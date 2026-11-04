/**
 * COMPONENT: GIỚI THIỆU NHANH + 05 TRỤ CỘT (DESKTOP: 40% / 60% | MOBILE: DỌC)
 * 5 Trụ cột: Nghiên cứu; Đối thoại; Kết nối; Ghi nhận; Phát triển
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HefIcon } from "@/components/icons";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { QuickIntro, Pillar } from "../types/home.types";

interface IntroPillarsSectionProps {
  intro: QuickIntro;
  pillars: Pillar[];
}

export function IntroPillarsSection({ intro, pillars }: IntroPillarsSectionProps) {
  return (
    <section className="py-14 sm:py-20 bg-background border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* CỘT TRÁI (40% DESKTOP): GIỚI THIỆU NHANH & ĐỊNH HƯỚNG */}
          <FadeIn direction="right" className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76232D]/10 text-[#76232D] dark:text-[#C29B57] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Định Vị Diễn Đàn</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] leading-tight">
              Không Gian Đối Thoại & Chuyển Hóa Nguồn Lực Di Sản
            </h2>

            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed text-justify">
              {intro.content}
            </p>

            <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-[#C29B57] border border-border/60">
              <p className="text-xs sm:text-sm italic text-foreground/90 font-medium">
                &ldquo;{intro.subContent}&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <Link href="/gioi-thieu">
                <Button
                  variant="outline"
                  className="border-[#76232D] text-[#76232D] dark:text-[#C29B57] hover:bg-[#76232D]/10 gap-2 cursor-pointer"
                >
                  <span>Tìm hiểu tôn chỉ & cơ cấu tổ chức</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* CỘT PHẢI (60% DESKTOP): 05 TRỤ CỘT HOẠT ĐỘNG */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C29B57]">
                Nền Tảng Hành Động
              </span>
              <span className="text-xs text-muted-foreground">05 Trụ Cột Chiến Lược</span>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const isFullWidth = idx === pillars.length - 1;
                return (
                  <StaggerItem key={pillar.id} className={isFullWidth ? "sm:col-span-2" : ""}>
                    <InteractiveCard
                      className={`group bg-card p-5 rounded-xl border border-border hover:border-[#C29B57] transition-all hover:shadow-md flex flex-col justify-between h-full ${
                        isFullWidth ? "bg-gradient-to-r from-card via-card to-[#C29B57]/5" : ""
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#76232D]/10 text-[#76232D] dark:text-[#C29B57] flex items-center justify-center group-hover:bg-[#76232D] group-hover:text-[#C29B57] transition-colors">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <HefIcon name={pillar.iconName as any} size="sm" variant="current" />
                          </div>
                          <span className="text-xs font-mono font-bold text-[#C29B57]">
                            TRỤ CỘT {pillar.orderNumber}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground group-hover:text-[#76232D] dark:group-hover:text-[#C29B57] transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#C29B57] font-semibold mb-2">
                          {pillar.subtitle}
                        </p>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-[#76232D] dark:text-[#C29B57] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Chuẩn mực thực thi HEF
                      </div>
                    </InteractiveCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
