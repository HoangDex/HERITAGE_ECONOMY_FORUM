/**
 * COMPONENT: ĐỐI TÁC ĐỒNG HÀNH & NHÀ TÀI TRỢ TRANG CHỦ
 * Thiết kế 2 Line ngang (Stacked Rows) với bố cục Responsive chống rớt lẻ logo:
 * - Line 1: Ban Tổ Chức & Cơ Quan Chủ Trì (8 đơn vị: 8 trên desktop, 4x2 trên tablet, 2x4 trên mobile)
 * - Line 2: Đơn Vị Tài Trợ & Đồng Hành (5 đơn vị: 1 hàng 5 trên desktop/tablet, 3+2 trên mobile)
 * - Triệt tiêu hoàn toàn tình trạng thừa 1 logo lẻ loi ở dòng dưới
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { PartnerLogoCard } from "@/components/common/partner-logo-card";
import type { HomePartner } from "../types/home.types";

interface PartnersSliderSectionProps {
  partners: HomePartner[];
}

export function PartnersSliderSection({ partners }: PartnersSliderSectionProps) {
  // 1. Phân nhóm Ban Tổ Chức & Cơ quan Chủ trì (BTC) - 8 đơn vị
  const btcCategories = ["STEERING", "HOSTING", "ORGANIZING", "COMPANION"];
  const btcPartners = partners.filter((p) => btcCategories.includes(p.category));

  // 2. Phân nhóm Đơn Vị Tài Trợ & Đồng Hành Chiến Lược - 5 đơn vị
  const sponsorCategories = ["STRATEGIC", "MEDIA"];
  const sponsorPartners = partners.filter((p) => sponsorCategories.includes(p.category));

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E8DFD1]/60">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* LINE 1: BAN TỔ CHỨC & CƠ QUAN CHỦ TRÌ */}
        {btcPartners.length > 0 && (
          <FadeIn direction="up" className="space-y-4 text-center">
            <h3 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#7D7063]">
              Ban Tổ Chức &amp; Cơ Quan Chủ Trì
            </h3>

            {/* Lưới 8 đơn vị: Cố định 8 cột trên desktop, 4 cột trên tablet, 2 cột trên mobile -> Luôn chẵn dòng, không bao giờ rớt 1 logo lẻ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 items-center justify-items-center gap-4 sm:gap-6 lg:gap-6 pt-1">
              {btcPartners.map((partner) => (
                <PartnerLogoCard key={partner.id} partner={partner} />
              ))}
            </div>
          </FadeIn>
        )}

        {/* LINE 2: ĐƠN VỊ TÀI TRỢ & ĐỒNG HÀNH CHIẾN LƯỢC */}
        {sponsorPartners.length > 0 && (
          <FadeIn direction="up" className="space-y-4 text-center pt-8 border-t border-[#E8DFD1]/50">
            <h3 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#7D7063]">
              Đơn Vị Tài Trợ &amp; Đồng Hành
            </h3>

            {/* Lưới 5 đơn vị: 1 hàng 5 cột đối xứng trên tablet/desktop (sm:grid-cols-5); trên mobile là 3 + 2 -> Không bao giờ rớt 1 logo lẻ */}
            <div className="grid grid-cols-6 sm:grid-cols-5 items-center justify-items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto pt-1">
              {sponsorPartners.map((partner, idx) => (
                <div
                  key={partner.id}
                  className={`w-full flex justify-center ${
                    idx < 3 ? "col-span-2 sm:col-span-1" : "col-span-3 sm:col-span-1"
                  }`}
                >
                  <PartnerLogoCard partner={partner} />
                </div>
              ))}
            </div>
          </FadeIn>
        )}

      </div>
    </section>
  );
}
