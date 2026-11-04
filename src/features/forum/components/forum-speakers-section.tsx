"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { Speaker } from "../types/forum-edition.types";

interface ForumSpeakersSectionProps {
  speakers: Speaker[];
}

export function ForumSpeakersSection({ speakers }: ForumSpeakersSectionProps) {
  return (
    <section id="dien-gia" className="py-12 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            Đội Ngũ Học Thuật & Chuyên Gia
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            Diễn Giả & Khách Mời Tiêu Biểu
          </h2>
          <p className="text-[#5c554b] max-w-3xl text-base">
            Hội tụ các nhà khoa học, nhà quản lý chính sách, lãnh đạo doanh nghiệp và tổ chức văn
            hóa quốc tế.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((sp) => (
            <StaggerItem key={sp.id}>
              <InteractiveCard className="h-full">
                <Card className="border border-[#dfd7c8] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-4/5 w-full bg-[#dfd7c8]/40 overflow-hidden">
                      <Image
                        src={sp.avatarUrl}
                        alt={`Chân dung ${sp.name}`}
                        fill
                        className="object-cover object-top group-hover:scale-103 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        {sp.degree && (
                          <Badge className="bg-[#76232D] text-white font-semibold text-xs shadow-xs">
                            {sp.degree}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#292929] group-hover:text-[#76232D] transition-colors">
                          {sp.name}
                        </h3>
                        <p className="text-xs font-medium text-[#76232D] mt-0.5">{sp.title}</p>
                        <p className="text-xs text-[#5c554b]">{sp.organization}</p>
                      </div>

                      <p className="text-xs text-[#5c554b] line-clamp-3 leading-relaxed">
                        {sp.bio}
                      </p>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#dfd7c8]/50 mt-2">
                    <span className="text-[11px] font-semibold text-[#76232D] uppercase tracking-wider block mt-3">
                      Tham luận tại {sp.sessionTitle}:
                    </span>
                    <p className="text-xs font-medium text-[#292929] italic line-clamp-2 mt-0.5">
                      “{sp.topicSummary}”
                    </p>
                  </div>
                </Card>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
