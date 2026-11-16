/**
 * COMPONENT: FORUM SPEAKERS SECTION (DIỄN GIẢ TIÊU BIỂU - TINH GỌN THEO ĐÚNG WIREFRAME)
 * Bố cục lưới 3-4 cột (Desktop) và 2 cột (Mobile), bấm vào thẻ để mở hồ sơ chi tiết
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageSquareQuote, Eye } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import { SpeakerDetailDialog } from "./speaker-detail-dialog";
import type { Speaker } from "../types/forum-edition.types";

interface ForumSpeakersSectionProps {
  speakers: Speaker[];
}

export function ForumSpeakersSection({ speakers }: ForumSpeakersSectionProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="dien-gia" className="py-12 sm:py-16 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
        {/* Tiêu đề ngắn gọn */}
        <FadeIn direction="up" className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Chuyên Gia & Diễn Giả</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
            Diễn Giả Tiêu Biểu
          </h2>
          <p className="text-sm text-[#5c554b] max-w-2xl">
            Các chuyên gia đầu ngành, học giả quốc tế và nhà hoạch định chính sách kinh tế di sản.
          </p>
        </FadeIn>

        {/* Lưới chân dung 3–4 cột (Desktop) và 2 cột (Mobile) theo Wireframe PRD */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {speakers.map((sp) => (
            <StaggerItem key={sp.id}>
              <InteractiveCard className="h-full">
                <div
                  onClick={() => setSelectedSpeaker(sp)}
                  className="bg-white rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between h-full cursor-pointer"
                  title={`Xem hồ sơ chi tiết: ${sp.name}`}
                >
                  <div>
                    {/* Ảnh chân dung tỉ lệ 4/5 chuẩn hồ sơ */}
                    <div className="relative aspect-[4/5] w-full bg-[#dfd7c8]/30 overflow-hidden">
                      <Image
                        src={sp.avatarUrl}
                        alt={`Chân dung ${sp.name}`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {sp.degree && (
                        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5">
                          <Badge className="bg-[#0D4838] text-white font-bold text-[10px] sm:text-xs shadow-xs px-2 py-0.5">
                            {sp.degree}
                          </Badge>
                        </div>
                      )}
                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-[#041D16]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-[#0D4838]/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
                          <Eye className="w-3 h-3 text-[#C29B57]" />
                          <span>Hồ sơ</span>
                        </span>
                      </div>
                    </div>

                    {/* Thông tin diễn giả: Tên & Đơn vị */}
                    <div className="p-3 sm:p-4 space-y-0.5">
                      <h3 className="text-sm sm:text-base font-serif font-bold text-[#132A24] group-hover:text-[#0D4838] transition-colors truncate">
                        {sp.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#0D4838] truncate">
                        {sp.title}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#5c554b] truncate">
                        {sp.organization}
                      </p>
                    </div>
                  </div>

                  {/* Chủ đề tham luận súc tích (1-2 dòng) */}
                  <div className="p-3 sm:p-4 pt-2 border-t border-[#dfd7c8]/60 bg-[#FDFBF7]">
                    <div className="flex items-start gap-1 text-xs text-[#0D4838] font-medium">
                      <MessageSquareQuote className="w-3 h-3 text-[#C29B57] shrink-0 mt-0.5" />
                      <p className="italic line-clamp-2 text-[10px] sm:text-[11px] leading-tight text-[#4A5E57]">
                        “{sp.topicSummary}”
                      </p>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Dialog xem chi tiết hồ sơ diễn giả */}
      <SpeakerDetailDialog
        speaker={selectedSpeaker}
        isOpen={!!selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
}
