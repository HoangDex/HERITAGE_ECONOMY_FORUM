"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { ForumEdition } from "../types/forum-edition.types";

interface ForumHeroProps {
  edition: ForumEdition;
}

export function ForumHero({ edition }: ForumHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#76232D]/10 via-[#F5EFE5] to-[#F5EFE5] border-b border-[#dfd7c8] py-14 sm:py-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <FadeIn direction="up" className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-[#76232D] text-white hover:bg-[#76232D]/90 font-medium px-3 py-1">
              Kỳ Diễn Đàn Thường Niên {edition.year}
            </Badge>
            <Badge
              variant="outline"
              className="border-[#C29B57] text-[#76232D] font-medium bg-white/80"
            >
              Sắp diễn ra
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#292929] tracking-tight leading-tight">
            {edition.title}
          </h1>

          <p className="text-xl sm:text-2xl font-serif font-semibold text-[#76232D] italic">
            “{edition.theme}”
          </p>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-[#5c554b]">
            <StaggerItem>
              <InteractiveCard className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-[#dfd7c8]">
                <Calendar className="w-5 h-5 text-[#C29B57] shrink-0" />
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[#76232D]">
                    Thời gian
                  </span>
                  <span className="font-medium text-[#292929]">{edition.datesText}</span>
                </div>
              </InteractiveCard>
            </StaggerItem>

            <StaggerItem>
              <InteractiveCard className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-[#dfd7c8]">
                <MapPin className="w-5 h-5 text-[#C29B57] shrink-0" />
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[#76232D]">
                    Địa điểm
                  </span>
                  <span className="font-medium text-[#292929] line-clamp-1">
                    {edition.venueName}
                  </span>
                </div>
              </InteractiveCard>
            </StaggerItem>

            <StaggerItem>
              <InteractiveCard className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-[#dfd7c8]">
                <Users className="w-5 h-5 text-[#C29B57] shrink-0" />
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[#76232D]">
                    Quy mô dự kiến
                  </span>
                  <span className="font-medium text-[#292929]">{edition.scaleDescription}</span>
                </div>
              </InteractiveCard>
            </StaggerItem>

            <StaggerItem>
              <InteractiveCard className="flex items-center gap-3 bg-white/80 p-3 rounded-lg border border-[#dfd7c8]">
                <FileText className="w-5 h-5 text-[#C29B57] shrink-0" />
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[#76232D]">
                    Đơn vị chủ trì
                  </span>
                  <span className="font-medium text-[#292929] line-clamp-1">
                    {edition.organizer}
                  </span>
                </div>
              </InteractiveCard>
            </StaggerItem>
          </StaggerContainer>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/lien-he?loai=tham-du">
              <Button
                size="lg"
                className="bg-[#76232D] hover:bg-[#76232D]/90 text-white gap-2 shadow-md font-medium cursor-pointer"
              >
                Đăng ký tham dự Đại biểu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#timeline">
              <Button
                size="lg"
                variant="outline"
                className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 font-medium cursor-pointer"
              >
                Xem Lịch trình & Các phiên
              </Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
