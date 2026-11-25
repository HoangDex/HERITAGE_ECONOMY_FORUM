"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { AwardJudge } from "../types/awards.types";

interface AwardsCouncilSectionProps {
  judges: AwardJudge[];
}

export function AwardsCouncilSection({ judges }: AwardsCouncilSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F7F5EE]/40 via-white to-[#F7F5EE]/40 border-t border-[#dfd7c8]">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-12">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Ban Giám Khảo Độc Lập</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0D4838] tracking-tight">
            Hội Đồng Thẩm Định Giải Thưởng
          </h2>
          <p className="text-[#4A5E57] max-w-3xl text-sm sm:text-base leading-relaxed">
            Hội đồng giám khảo độc lập quy tụ các nhà khoa học, chuyên gia bảo tồn hàng đầu và đại
            diện tổ chức quốc tế uy tín, bảo đảm tính khách quan, khoa học và minh bạch cao nhất.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((jd) => (
            <StaggerItem key={jd.id}>
              <InteractiveCard className="h-full">
                <div className="rounded-2xl border border-[#dfd7c8] bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between h-full hover:border-[#C29B57]">
                  <div>
                    {/* Portrait container flush with top - No white border */}
                    <div className="relative aspect-[4/5] w-full bg-[#dfd7c8]/30 overflow-hidden">
                      <Image
                        src={jd.avatarUrl}
                        alt={`Chân dung ${jd.name}`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041D16]/70 via-transparent to-transparent" />

                      {/* Role Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D4838]/90 text-[#F7F5EE] text-[11px] font-semibold tracking-wide border border-[#C29B57]/60 shadow-md backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-[#C29B57] shrink-0" />
                          <span>{jd.role}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-1.5">
                      <h3 className="text-lg font-serif font-bold text-[#0D4838] group-hover:text-[#073327] transition-colors leading-snug">
                        {jd.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#132A24]">{jd.title}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-[#dfd7c8]/60 flex items-start gap-2 text-xs text-[#4A5E57]">
                      <Building2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0 mt-0.5" />
                      <span className="leading-snug">{jd.organization}</span>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>


      </div>
    </section>
  );
}
