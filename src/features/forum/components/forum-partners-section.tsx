/**
 * COMPONENT: FORUM PARTNERS SECTION (ĐƠN VỊ TÀI TRỢ & ĐỒNG HÀNH DIỄN ĐÀN)
 * Thiết kế tinh gọn chuẩn giao diện Trang Chủ:
 * - Chỉ hiển thị duy nhất nhóm Đối tác & Đơn vị Tài trợ Đồng hành
 * - Lưới Logo đối xứng 5 cột trên desktop/tablet, 3+2 trên mobile, không viền
 */

"use client";

import React from "react";
import { FadeIn } from "@/components/animations";
import { PartnerLogoCard, type PartnerLogoItem } from "@/components/common/partner-logo-card";

const SPONSOR_PARTNERS: PartnerLogoItem[] = [
  {
    id: "sp_1",
    name: "Tập đoàn Sovico",
    shortName: "Sovico Group",
    logoUrl: "/images/partners/sovico.png",
    websiteUrl: "https://sovicogroup.com",
  },
  {
    id: "sp_2",
    name: "Tập đoàn Vingroup",
    shortName: "Vingroup",
    logoUrl: "/images/partners/vingroup.png",
    websiteUrl: "https://vingroup.net",
  },
  {
    id: "sp_3",
    name: "Ngân hàng TMCP Ngoại thương Việt Nam",
    shortName: "Vietcombank",
    logoUrl: "/images/partners/vietcombank.png",
    websiteUrl: "https://vietcombank.com.vn",
  },
  {
    id: "sp_4",
    name: "Đài Truyền hình Việt Nam",
    shortName: "VTV",
    logoUrl: "/images/partners/vtv.png",
    websiteUrl: "https://vtv.vn",
  },
  {
    id: "sp_5",
    name: "Báo Nhân Dân",
    shortName: "Báo Nhân Dân",
    logoUrl: "/images/partners/nhandan.png",
    websiteUrl: "https://nhandan.vn",
  },
];

export function ForumPartnersSection() {
  return (
    <section id="doi-tac" className="py-12 sm:py-16 bg-white border-t border-[#E8DFD1]/60 scroll-mt-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ĐƠN VỊ TÀI TRỢ & ĐỒNG HÀNH CHIẾN LƯỢC */}
        {SPONSOR_PARTNERS.length > 0 && (
          <FadeIn direction="up" className="space-y-6 text-center">
            <h3 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#7D7063]">
              Đơn Vị Tài Trợ &amp; Đồng Hành
            </h3>

            {/* Lưới 5 đơn vị: 1 hàng 5 cột đối xứng trên tablet/desktop (sm:grid-cols-5); trên mobile là 3 + 2 */}
            <div className="grid grid-cols-6 sm:grid-cols-5 items-center justify-items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto pt-1">
              {SPONSOR_PARTNERS.map((partner, idx) => (
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
