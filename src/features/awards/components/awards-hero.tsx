"use client";

import Link from "next/link";
import { Award, ArrowRight, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";

interface AwardsHeroProps {
  title: string;
  englishTitle: string;
  slogan: string;
  philosophy: string;
}

export function AwardsHero({ title, englishTitle, slogan, philosophy }: AwardsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#76232D]/12 via-[#F5EFE5] to-[#F5EFE5] border-b border-[#dfd7c8] py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <FadeIn direction="up" className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-[#76232D] text-white hover:bg-[#76232D]/90 font-medium px-3 py-1">
              Hệ Thống Giải Thưởng Thường Niên
            </Badge>
            <Badge
              variant="outline"
              className="border-[#C29B57] text-[#76232D] font-medium bg-white/80"
            >
              Kỳ 2026
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#292929] tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#76232D] tracking-wide">
              {englishTitle}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#dfd7c8] shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#76232D] block">
              Thông Điệp Cốt Lõi:
            </span>
            <p className="text-2xl sm:text-3xl font-serif font-extrabold text-[#76232D] italic">
              “{slogan}”
            </p>
            <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed pt-1">{philosophy}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/lien-he?loai=giai-thuong">
              <Button
                size="lg"
                className="bg-[#76232D] hover:bg-[#76232D]/90 text-white gap-2 shadow-md font-medium cursor-pointer"
              >
                <Award className="w-4 h-4" />
                Nộp Hồ Sơ Đề Cử Trực Tuyến
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#quy-che">
              <Button
                size="lg"
                variant="outline"
                className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 gap-2 font-medium cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Tải Bản Quy Chế Xét Chọn (PDF)
              </Button>
            </a>
          </div>

          <p className="text-xs text-[#5c554b] flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#C29B57]" />
            Dữ liệu ứng viên được bảo mật tuyệt đối theo Quy chế bảo vệ dữ liệu cá nhân của Diễn
            đàn.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
