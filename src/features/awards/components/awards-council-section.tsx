"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, Building2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { AwardJudge } from "../types/awards.types";

interface AwardsCouncilSectionProps {
  judges: AwardJudge[];
}

export function AwardsCouncilSection({ judges }: AwardsCouncilSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F5EFE5]/40 via-white to-[#F5EFE5]/40 border-t border-[#dfd7c8]">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-12">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Ban Giám Khảo Độc Lập</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] tracking-tight">
            Hội Đồng Thẩm Định Giải Thưởng
          </h2>
          <p className="text-[#5c554b] max-w-3xl text-sm sm:text-base leading-relaxed">
            Hội đồng giám khảo độc lập quy tụ các nhà khoa học, chuyên gia bảo tồn hàng đầu và đại
            diện tổ chức quốc tế uy tín, bảo đảm tính khách quan, khoa học và minh bạch cao nhất.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((jd) => (
            <StaggerItem key={jd.id}>
              <InteractiveCard className="h-full">
                <Card className="border border-[#dfd7c8] bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between h-full hover:border-[#C29B57]">
                  <div>
                    {/* Portrait container with subtle vignette */}
                    <div className="relative aspect-[4/5] w-full bg-[#dfd7c8]/30 overflow-hidden">
                      <Image
                        src={jd.avatarUrl}
                        alt={`Chân dung ${jd.name}`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                      {/* Role Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#76232D]/90 text-[#F5EFE5] text-[11px] font-semibold tracking-wide border border-[#C29B57]/60 shadow-md backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-[#C29B57] shrink-0" />
                          <span>{jd.role}</span>
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-2">
                      <h3 className="text-lg font-serif font-bold text-[#76232D] group-hover:text-[#52181F] transition-colors">
                        {jd.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#292929]">{jd.title}</p>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-[#dfd7c8]/60 flex items-start gap-2 text-xs text-[#5c554b]">
                      <Building2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0 mt-0.5" />
                      <span className="leading-snug">{jd.organization}</span>
                    </div>
                  </div>
                </Card>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Nộp đề cử */}
        <FadeIn
          direction="up"
          className="rounded-3xl bg-gradient-to-br from-[#76232D] via-[#52181F] to-[#292929] p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border-2 border-[#C29B57]"
        >
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <Badge className="bg-[#C29B57] text-[#292929] font-bold px-3 py-1 uppercase tracking-wider">
              Cổng Đề Cử 2026 Đang Mở
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#F5EFE5]">
              Đề Cử Sáng Kiến & Doanh Nghiệp Của Bạn
            </h3>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Cùng lan tỏa những giá trị bảo tồn thích ứng và mô hình kinh tế di sản xuất sắc vì một
              tương lai văn hóa bền vững của Việt Nam.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link href="/lien-he?loai=giai-thuong">
              <Button
                size="lg"
                className="bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold gap-2 shadow-lg cursor-pointer h-12 px-6"
              >
                <Award className="w-5 h-5" />
                <span>Gửi Hồ Sơ Đề Cử Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
