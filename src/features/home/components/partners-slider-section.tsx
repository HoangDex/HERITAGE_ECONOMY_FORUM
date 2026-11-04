/**
 * COMPONENT: ĐỐI TÁC ĐỒNG HÀNH (DẢI LOGO PHÂN NHÓM)
 * Phân nhóm rõ ràng, chỉ hiển thị logo được xác thực hợp tác chính thức
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { HomePartner } from "../types/home.types";

interface PartnersSliderSectionProps {
  partners: HomePartner[];
}

export function PartnersSliderSection({ partners }: PartnersSliderSectionProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE5]/40 border-b border-[#dfd7c8]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <FadeIn
          direction="up"
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 text-left"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76232D] uppercase tracking-wider mb-2 bg-[#76232D]/10 px-3 py-1 rounded-full">
              <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Mạng Lưới Đồng Hành Chiến Lược</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#76232D] leading-tight">
              Đơn Vị Chỉ Đạo, Chủ Trì & Đối Tác
            </h3>
            <p className="text-xs sm:text-sm text-[#5c554b] mt-1.5 max-w-2xl">
              Đồng hành cùng các cơ quan quản lý nhà nước, viện nghiên cứu học thuật và các tập đoàn
              tiên phong kiến tạo kinh tế di sản.
            </p>
          </div>

          <Link
            href="/gioi-thieu#partners"
            className="text-xs font-bold text-[#76232D] hover:text-[#C29B57] transition-colors flex items-center gap-1.5 cursor-pointer py-1 border-b border-transparent hover:border-[#C29B57] shrink-0"
          >
            <span>Xem mạng lưới đầy đủ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        {/* Lưới logo đối tác: 2 cột Mobile | 3 cột Tablet | 6 cột Desktop */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner) => (
            <StaggerItem key={partner.id}>
              <InteractiveCard className="group bg-white rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] p-3.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full">
                <div className="flex justify-between items-center mb-2.5">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold px-2 py-0.5 border-[#C29B57]/50 text-[#76232D] bg-[#F5EFE5]/60"
                  >
                    {partner.categoryLabel}
                  </Badge>
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5c554b] hover:text-[#76232D] transition-colors p-1"
                      title={`Website ${partner.name}`}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Logo Frame */}
                <div className="relative w-full h-20 sm:h-22 bg-[#FDFBF7] rounded-xl p-2 mb-3 flex items-center justify-center border border-[#dfd7c8]/60 overflow-hidden group-hover:border-[#C29B57]/50 transition-colors">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain p-1 transition-transform group-hover:scale-105"
                  />
                </div>

                <h4
                  className="text-xs font-semibold text-[#292929] group-hover:text-[#76232D] transition-colors text-center line-clamp-2 min-h-[34px] flex items-center justify-center leading-snug"
                  title={partner.name}
                >
                  {partner.name}
                </h4>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
