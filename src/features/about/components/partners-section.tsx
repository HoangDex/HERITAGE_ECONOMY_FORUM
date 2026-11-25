/**
 * COMPONENT: BAN TỔ CHỨC & CƠ QUAN CHỦ TRÌ (MỤC 6.4)
 * Thiết kế chuẩn như trang Home:
 * - Chỉ hiển thị các đơn vị Ban Tổ Chức & Cơ quan Chủ trì (BTC)
 * - Lưới Logo thuần túy không viền, căn giữa tự nhiên, responsive hoàn hảo mọi màn hình
 */

"use client";

import React from "react";
import { FadeIn } from "@/components/animations";
import { PartnerLogoCard } from "@/components/common/partner-logo-card";
import type { PartnerOrganization, PartnerCategory } from "../types/about.types";

interface PartnersSectionProps {
  partners: PartnerOrganization[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Lọc duy nhất các đơn vị thuộc Ban Tổ Chức & Cơ quan Chủ trì (BTC) giống trang Home
  const btcCategories: PartnerCategory[] = ["STEERING", "HOSTING", "ORGANIZING", "COMPANION"];
  const btcPartners = partners
    .filter((p) => btcCategories.includes(p.category) && p.isApproved !== false)
    .sort((a, b) => a.order - b.order);

  // Fallback an toàn nếu chưa có category
  const displayedPartners = btcPartners.length > 0 ? btcPartners : partners.slice(0, 6);

  return (
    <section
      id="partners"
      className="py-12 sm:py-16 bg-white border-t border-[#dfd7c8] scroll-mt-28"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* BAN TỔ CHỨC & CƠ QUAN CHỦ TRÌ (THIẾT KẾ GIỐNG LINE 1 TRANG CHỦ) */}
        {displayedPartners.length > 0 && (
          <FadeIn direction="up" className="space-y-6 text-center">
            <h3 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#7D7063]">
              Ban Tổ Chức &amp; Cơ Quan Chủ Trì
            </h3>

            {/* Lưới logo BTC: Tự động căn giữa, chẵn dòng trên mobile & desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-4 sm:gap-6 lg:gap-8 pt-1">
              {displayedPartners.map((partner) => (
                <PartnerLogoCard key={partner.id} partner={partner} />
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
