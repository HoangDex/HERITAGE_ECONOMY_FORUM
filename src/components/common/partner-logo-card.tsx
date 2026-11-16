"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { InteractiveCard } from "@/components/animations";

export interface PartnerLogoItem {
  id: string;
  name: string;
  shortName?: string;
  subName?: string;
  categoryLabel?: string;
  roleLabel?: string;
  logoUrl: string;
  websiteUrl?: string;
}

export interface PartnerRoleGroupProps {
  role: string;
  partners: PartnerLogoItem[];
  className?: string;
  gridCols?: string;
}

/**
 * COMPONENT: PARTNER ROLE GROUP
 * Gom nhóm tất cả các logo đối tác có CHUNG VAI TRÒ vào cùng một khối:
 * - Semantic <fieldset> bao bọc cả nhóm
 * - <legend> hiển thị tên vai trò chung (Cơ quan Chủ trì, Nhà Tài trợ Chiến lược, Bảo trợ Truyền thông...)
 * - Lưới logo bên trong hiển thị các đơn vị thành viên, không lặp lại vai trò trên từng card
 */
export function PartnerRoleGroup({
  role,
  partners,
  className = "",
  gridCols,
}: PartnerRoleGroupProps) {
  if (!partners || partners.length === 0) return null;

  // Tự động căn chia số cột theo số lượng đơn vị trong nhóm nếu không chỉ định
  const cols =
    gridCols ||
    (partners.length === 1
      ? "grid-cols-1"
      : partners.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3");

  return (
    <fieldset
      className={`relative rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] bg-white hover:bg-[#FDFBF7]/40 transition-all duration-300 shadow-2xs hover:shadow-md p-4 sm:p-5 h-full flex flex-col justify-between ${className}`}
    >
      {/* Legend: Tên vai trò chung của nhóm đơn vị */}
      <legend className="ml-3 sm:ml-4 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[#0D4838] bg-[#F5EFE5] border border-[#C29B57]/60 shadow-2xs">
        {role}
      </legend>

      {/* Lưới các đối tác cùng chung vai trò này */}
      <div className={`grid ${cols} gap-3 sm:gap-4 w-full my-auto`}>
        {partners.map((partner) => {
          const subtitle = partner.shortName || partner.subName;

          return (
            <div
              key={partner.id}
              className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-xl bg-[#FDFBF7]/80 hover:bg-[#F5EFE5]/50 border border-[#dfd7c8]/60 hover:border-[#C29B57]/50 transition-all group/item min-h-[82px]"
            >
              {/* 1 Ảnh Logo Emblem PNG sắc nét */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center p-1 rounded-lg bg-white border border-[#dfd7c8]/50 shadow-2xs">
                <Image
                  src={partner.logoUrl}
                  alt={`Logo ${partner.name}`}
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-contain p-0.5 transition-transform duration-300 group-hover/item:scale-105"
                />
              </div>

              {/* Metadata chữ: Tên chính thức + Tên viết tắt (Không lặp chữ thừa) */}
              <div className="flex-1 min-w-0 space-y-0.5 text-left">
                <h4
                  className="text-xs sm:text-[13px] font-sans font-bold text-[#0D4838] group-hover/item:text-[#073327] transition-colors leading-snug line-clamp-2"
                  title={partner.name}
                >
                  {partner.name}
                </h4>
                {subtitle && subtitle !== partner.name && (
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#5c554b] truncate">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Nút liên kết ngoài (nếu có) */}
              {partner.websiteUrl && (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C7A6B] hover:text-[#0D4838] transition-colors p-1.5 shrink-0 self-center"
                  title={`Mở trang web chính thức của ${partner.name}`}
                  aria-label={`Website ${partner.name}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

interface PartnerLogoCardProps {
  partner: PartnerLogoItem;
  variant?: "horizontal" | "card";
  className?: string;
}

/**
 * COMPONENT: PARTNER LOGO CARD (Cho 1 đối tác đơn lẻ)
 */
export function PartnerLogoCard({
  partner,
  className = "",
}: PartnerLogoCardProps) {
  const role = partner.categoryLabel || partner.roleLabel || "Đối tác chính thức";
  return (
    <InteractiveCard className="group h-full">
      <PartnerRoleGroup
        role={role}
        partners={[partner]}
        className={className}
        gridCols="grid-cols-1"
      />
    </InteractiveCard>
  );
}
