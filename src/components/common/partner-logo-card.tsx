"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Landmark, Building2, Sparkles, ShieldCheck } from "lucide-react";

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

function getPartnerIcon(name: string, role?: string) {
  const lower = (name + " " + (role || "")).toLowerCase();
  if (lower.includes("bộ") || lower.includes("unesco") || lower.includes("chỉ đạo")) {
    return Landmark;
  }
  if (lower.includes("tập đoàn") || lower.includes("ngân hàng") || lower.includes("tài trợ")) {
    return Sparkles;
  }
  if (lower.includes("bảo tồn") || lower.includes("di tích") || lower.includes("di sản")) {
    return ShieldCheck;
  }
  return Building2;
}

interface PartnerLogoCardProps {
  partner: PartnerLogoItem;
  className?: string;
}

/**
 * COMPONENT: PARTNER LOGO CARD (BORDERLESS PURE LOGO - RESPONSIVE FIT)
 * Hiển thị logo thuần túy không viền với tỷ lệ cân đối, tương thích hoàn hảo mọi kích thước màn hình:
 * - Kích thước logo rõ nét (h-9 đến h-15, max-w-[160px])
 * - Tự động co giãn theo tỷ lệ thực, không để khoảng đệm rỗng
 * - Căn giữa tự nhiên, hover phóng to nhẹ mượt mà
 * - Click mở website chính thức của đơn vị
 */
export function PartnerLogoCard({ partner, className = "" }: PartnerLogoCardProps) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = getPartnerIcon(partner.name, partner.roleLabel || partner.categoryLabel);

  const cardContent = (
    <div
      className={`group relative flex items-center justify-center w-full h-10 sm:h-12 md:h-14 lg:h-16 transition-transform duration-300 hover:scale-108 cursor-pointer ${className}`}
      title={partner.name}
    >
      {!imgError && partner.logoUrl ? (
        <Image
          src={partner.logoUrl}
          alt={partner.name}
          width={180}
          height={64}
          className="h-9 sm:h-11 md:h-13 lg:h-15 w-auto max-w-[90px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px] object-contain transition-all duration-300 filter group-hover:brightness-105"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 transition-colors">
          <FallbackIcon className="w-4 h-4 text-[#C29B57]" />
          <span className="text-[10px] sm:text-xs font-bold text-[#0D4838] tracking-tight">
            {partner.shortName || partner.name}
          </span>
        </div>
      )}
    </div>
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center p-1 opacity-90 hover:opacity-100 transition-opacity"
        title={partner.name}
        aria-label={`Website ${partner.name}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className="w-full inline-flex items-center justify-center p-1 opacity-90 hover:opacity-100 transition-opacity">
      {cardContent}
    </div>
  );
}

/**
 * COMPONENT: PARTNER ROLE GROUP
 * Dành cho các trang cần gom nhóm chi tiết (About / Forum):
 * Giữ nguyên tính tương thích ngược cho toàn bộ codebase
 */
export function PartnerRoleGroup({
  role,
  partners,
  className = "",
}: PartnerRoleGroupProps) {
  if (!partners || partners.length === 0) return null;

  return (
    <div className={`space-y-4 text-center ${className}`}>
      <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#7D7063]">
        {role}
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 items-center justify-items-center gap-4 sm:gap-6">
        {partners.map((partner) => (
          <PartnerLogoCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
}
