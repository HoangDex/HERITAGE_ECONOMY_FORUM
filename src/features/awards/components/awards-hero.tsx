"use client";

import Link from "next/link";
import { Award, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

import type { AwardActionLink } from "../types/awards.types";

interface AwardsHeroProps {
  title: string;
  englishTitle: string;
  slogan: string;
  philosophy: string;
  actions?: AwardActionLink[];
}

export function AwardsHero({
  title,
  englishTitle,
  slogan,
  philosophy,
  actions,
}: AwardsHeroProps) {
  const primaryAction = actions?.[0] || {
    label: "Nộp Hồ Sơ Đề Cử Trực Tuyến",
    href: "/contact?loai=giai-thuong#contact-form",
  };
  const secondaryAction = actions?.[1] || {
    label: "Tải Bản Quy Chế Xét Chọn (PDF)",
    href: "#quy-che",
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0D4838]/12 via-[#F5EFE5] to-[#F5EFE5] border-b border-[#dfd7c8] py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <FadeIn direction="up" className="max-w-4xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#292929] tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-[#0D4838] tracking-wide">
              {englishTitle}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#dfd7c8] shadow-xs space-y-2">
            <p className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0D4838] italic">
              “{slogan}”
            </p>
            <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed pt-1">{philosophy}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={primaryAction.href}>
              <Button
                size="lg"
                className="bg-[#0D4838] hover:bg-[#0D4838]/90 text-white gap-2 shadow-md font-medium cursor-pointer"
              >
                <Award className="w-4 h-4" />
                {primaryAction.label}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href={secondaryAction.href}>
              <Button
                size="lg"
                variant="outline"
                className="border-[#0D4838] text-[#0D4838] hover:bg-[#0D4838]/10 gap-2 font-medium cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {secondaryAction.label}
              </Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
