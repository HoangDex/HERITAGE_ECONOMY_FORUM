/**
 * COMPONENT: GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG CHỦ ĐỘNG (BANNER RIÊNG + TIÊU CHÍ + CTA)
 * Vinh danh những sáng kiến cân bằng di sản và kinh tế vì cộng đồng
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, CheckCircle2, Clock, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AwardShowcase } from "../types/home.types";

interface AwardsShowcaseSectionProps {
  award: AwardShowcase;
}

export function AwardsShowcaseSection({ award }: AwardsShowcaseSectionProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#76232D] via-[#52181F] to-[#292929] text-white border-2 border-[#C29B57] shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-[#C29B57] text-[#292929] text-xs font-bold px-3 py-1 uppercase tracking-wider">
            {award.badge}
          </Badge>
          <span className="text-xs text-[#C29B57] font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Hạn đề cử: {award.nominationDeadline}
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F5EFE5] leading-snug">
            {award.awardName}
          </h3>
          <p className="text-xs sm:text-sm text-[#C29B57] italic mt-1 font-medium">
            &ldquo;{award.subtitle}&rdquo;
          </p>
        </div>

        <p className="text-xs sm:text-sm text-white/85 leading-relaxed">{award.description}</p>

        {/* 4 Tiêu chí cốt lõi */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C29B57] block mb-1">
            04 Tiêu chí đánh giá trọng tâm:
          </span>
          <ul className="space-y-1.5 text-xs text-white/90">
            {award.criteria.map((crit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0 mt-0.5" />
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA: Xem quy chế & Nộp đề cử */}
      <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3">
        <Link href={award.nominationUrl} className="flex-1">
          <Button
            size="lg"
            className="w-full bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold border border-white/20 shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4 mr-2" />
            <span>Nộp hồ sơ đề cử</span>
          </Button>
        </Link>

        <Link href={award.regulationsUrl} className="flex-1">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-white/30 text-white hover:bg-white/10 cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2 text-[#C29B57]" />
            <span>Xem quy chế giải thưởng</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
