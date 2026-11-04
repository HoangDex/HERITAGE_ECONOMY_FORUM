/**
 * COMPONENT: BANNER & ANCHOR NAVIGATION BAR CHO TRANG GIỚI THIỆU
 * Đáp ứng Wireframe Desktop & Mobile với thanh điều hướng Anchor dính (sticky)
 */

"use client";

import React from "react";
import { Landmark, Users, Briefcase, Handshake } from "lucide-react";
import { BrandLogo, HefIcon } from "@/components/icons";
import { FadeIn } from "@/components/animations";
import type { AboutTab } from "../hooks/use-about";

interface AboutBannerProps {
  activeTab: AboutTab;
  onSelectTab: (tab: AboutTab) => void;
  lastUpdated?: string;
}

const TABS: Array<{ id: AboutTab; label: string; icon: React.ReactNode }> = [
  { id: "about", label: "Về diễn đàn", icon: <Landmark className="w-4 h-4" /> },
  { id: "council", label: "Hội đồng Diễn đàn", icon: <Users className="w-4 h-4" /> },
  { id: "executive", label: "Ban Điều hành", icon: <Briefcase className="w-4 h-4" /> },
  { id: "partners", label: "Mạng lưới Đối tác", icon: <Handshake className="w-4 h-4" /> },
];

export function AboutBanner({ activeTab, onSelectTab, lastUpdated }: AboutBannerProps) {
  return (
    <div className="w-full">
      {/* Banner chính */}
      <section className="relative overflow-hidden bg-radial-[at_top] from-[#76232D] via-[#52181F] to-[#292929] text-white py-16 sm:py-20 px-4 sm:px-8 border-b-4 border-[#C29B57]">
        {/* Background Họa Tiết Trống Đồng / Hoa Văn Di Sản */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C29B57_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C29B57]/20 border border-[#C29B57]/40 text-[#C29B57] text-xs font-semibold mb-4 backdrop-blur-xs">
              <HefIcon name="ShieldCheck" size="xs" variant="gold" />
              <span>ĐỀ ÁN DIỄN ĐÀN KINH TẾ DI SẢN (HEF) • MỤC 06</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#F5EFE5] max-w-4xl mx-auto leading-tight">
              GIỚI THIỆU – VỀ DIỄN ĐÀN
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/85 max-w-3xl mx-auto font-sans leading-relaxed">
              Nền tảng kết nối liên ngành nhằm nghiên cứu, nhận diện và phát huy các giá trị di sản
              trong phát triển kinh tế, văn hóa và xã hội; lấy di sản làm nguồn lực sáng tạo và cộng
              đồng làm chủ thể phát triển.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <BrandLogo size="sm" showSubtitle={false} className="scale-75" />
                <span>Cơ cấu tổ chức chính thức</span>
              </span>
              <span>•</span>
              <span>Áp dụng từ 03/11/2026</span>
              {lastUpdated && (
                <>
                  <span>•</span>
                  <span>Ngày cập nhật: {lastUpdated}</span>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TABS / ANCHOR BAR (Sticky trên cả Desktop & Mobile) */}
      <div className="sticky top-16 z-30 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="container mx-auto max-w-6xl px-4 sm:px-8">
          <nav
            className="flex items-center justify-start sm:justify-center overflow-x-auto py-2.5 gap-2 sm:gap-4 no-scrollbar"
            aria-label="Tabs điều hướng trang Giới thiệu"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#76232D] text-white shadow-xs border border-[#C29B57]/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  <span className={isActive ? "text-[#C29B57]" : "text-muted-foreground"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
