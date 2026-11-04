/**
 * COMPONENT: MẠNG LƯỚI ĐỐI TÁC ĐỒNG HÀNH (MỤC 6.4)
 * Wireframe Desktop: Nhóm đối tác & lưới logo 3-6 cột
 * Wireframe Mobile: Logo 2 cột, bộ lọc nhóm dạng pill/dropdown
 * Điều hướng CTA: Trở thành đối tác -> /lien-he?loai=hop-tac
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, ExternalLink, ArrowRight, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { PartnerOrganization, PartnerCategory } from "../types/about.types";

interface PartnersSectionProps {
  partners: PartnerOrganization[];
}

const CATEGORY_MAP: Record<PartnerCategory | "ALL", { label: string; badgeColor: string }> = {
  ALL: { label: "Tất cả đối tác", badgeColor: "bg-muted text-foreground border-border" },
  STEERING: { label: "Cơ quan Chỉ đạo", badgeColor: "bg-[#76232D] text-white border-transparent" },
  HOSTING: { label: "Cơ quan Chủ trì", badgeColor: "bg-[#52181F] text-white border-transparent" },
  ORGANIZING: {
    label: "Đơn vị Tổ chức",
    badgeColor: "bg-[#C29B57] text-[#292929] border-transparent font-bold",
  },
  COMPANION: {
    label: "Đối tác Đồng hành",
    badgeColor: "bg-amber-900 text-white border-transparent",
  },
  STRATEGIC: {
    label: "Đối tác Chiến lược",
    badgeColor: "bg-emerald-800 text-white border-transparent",
  },
  MEDIA: { label: "Đối tác Truyền thông", badgeColor: "bg-blue-800 text-white border-transparent" },
};

export function PartnersSection({ partners }: PartnersSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | "ALL">("ALL");

  const filteredPartners =
    selectedCategory === "ALL" ? partners : partners.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="partners"
      className="py-14 sm:py-20 bg-[#F5EFE5]/40 border-t border-[#dfd7c8] scroll-mt-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        {/* Tiêu đề Mục 6.4 */}
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76232D]/10 text-[#76232D] text-xs font-semibold uppercase tracking-wider mb-2">
            <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Mục 6.4 • Mạng Lưới Đồng Hành</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D]">
            Mạng Lưới Đối Tác Diễn Đàn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5c554b] leading-relaxed">
            Sức mạnh của Diễn đàn Kinh tế Di sản được cộng hưởng từ sự đồng hành chặt chẽ của các cơ
            quan quản lý nhà nước, các tổ chức quốc tế, trường đại học, tập đoàn kinh tế và cơ quan
            truyền thông hàng đầu.
          </p>
        </FadeIn>

        {/* BỘ LỌC NHÓM ĐỐI TÁC */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-[#5c554b] font-medium mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Phân loại:</span>
          </div>
          {(Object.keys(CATEGORY_MAP) as Array<PartnerCategory | "ALL">).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#76232D] text-white border border-[#C29B57]/50 shadow-xs"
                    : "bg-white text-[#5c554b] hover:bg-[#F5EFE5] border border-[#dfd7c8]"
                }`}
              >
                {CATEGORY_MAP[cat].label}
              </button>
            );
          })}
        </div>

        {/* LƯỚI LOGO ĐỐI TÁC: 2 cột Mobile | 3 cột Tablet | 4 cột Desktop */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {filteredPartners.map((partner) => (
            <StaggerItem key={partner.id}>
              <InteractiveCard className="group relative bg-white rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      className={`${
                        CATEGORY_MAP[partner.category].badgeColor
                      } text-[10px] font-semibold px-2 py-0.5 border`}
                    >
                      {CATEGORY_MAP[partner.category].label}
                    </Badge>
                    <span className="text-[10px] text-[#5c554b] font-medium bg-[#F5EFE5] px-2 py-0.5 rounded-full">
                      Kỳ 2026
                    </span>
                  </div>

                  {/* Khung Logo */}
                  <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-[#FDFBF7] p-2 mb-3.5 border border-[#dfd7c8]/60 flex items-center justify-center group-hover:border-[#C29B57]/60 transition-colors">
                    <Image
                      src={partner.logoUrl}
                      alt={`Logo ${partner.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Tên & vai trò */}
                  <h4 className="text-sm font-serif font-bold text-[#292929] group-hover:text-[#76232D] transition-colors line-clamp-2 leading-snug min-h-[38px] flex items-center">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-[#5c554b] mt-1.5 line-clamp-2 leading-relaxed">
                    {partner.roleDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dfd7c8]/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-[#76232D] truncate max-w-[170px]">
                    {partner.relatedEvents[0] || "Đồng hành thường niên"}
                  </span>
                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5c554b] hover:text-[#76232D] transition-colors p-1"
                      title={`Mở website ${partner.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* KHỐI CTA KÊU GỌI HỢP TÁC */}
        <FadeIn
          direction="up"
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#76232D] via-[#5e1c24] to-[#292929] text-white p-6 sm:p-10 border-2 border-[#C29B57] shadow-xl text-center sm:text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C29B57] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cơ Hội Đồng Hành Chiến Lược</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#F5EFE5]">
                Trở Thành Đối Tác Diễn Đàn Kinh Tế Di Sản
              </h3>
              <p className="text-sm text-white/85 max-w-2xl leading-relaxed">
                Đồng hành cùng chúng tôi trong việc bảo tồn các di sản văn hóa quý báu của dân tộc,
                kiến tạo giá trị kinh tế bền vững và nâng tầm thương hiệu Việt Nam trên trường quốc
                tế.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-center sm:justify-end gap-3">
              <Link href="/lien-he?loai=hop-tac" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold border border-white/20 shadow-md cursor-pointer h-11"
                >
                  <span>Đăng ký Hợp tác</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/lien-he?loai=tai-tro" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-white/10 hover:bg-white/20 text-[#F5EFE5] border border-white/30 hover:border-[#C29B57] font-semibold cursor-pointer h-11 backdrop-blur-xs"
                >
                  <span>Tài trợ & Đồng hành</span>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
