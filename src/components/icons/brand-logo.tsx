/**
 * COMPONENT LOGO NHẬN DIỆN THƯƠNG HIỆU DIỄN ĐÀN KINH TẾ DI SẢN (HEF)
 * Chuẩn màu Đỏ son #76232D & Vàng đồng #C29B57
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({
  className,
  showSubtitle = true,
  href = "/",
  size = "md",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  const textClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* Biểu trưng hình họa di sản: Cổng Khuê Văn Các / Mái đình cổ */}
      <div
        className={cn(
          sizeClasses[size],
          "aspect-square rounded-lg bg-[#76232D] text-[#C29B57] flex items-center justify-center p-2 shadow-xs border border-[#C29B57]/30 transition-transform group-hover:scale-105"
        )}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-current"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Mái cong di sản */}
          <path d="M4 14C12 11 28 11 36 14" stroke="#C29B57" />
          <path d="M8 12L20 4L32 12" stroke="#C29B57" fill="#C29B57" fillOpacity="0.2" />
          {/* Cột trụ vững chãi */}
          <path d="M12 14V34" stroke="#F5EFE5" strokeWidth="2" />
          <path d="M28 14V34" stroke="#F5EFE5" strokeWidth="2" />
          {/* Nền bệ đá */}
          <path d="M6 34H34" stroke="#C29B57" strokeWidth="3" />
          {/* Mặt trời / Tâm điểm tri thức */}
          <circle cx="20" cy="22" r="3.5" fill="#C29B57" stroke="#C29B57" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            textClasses[size],
            "font-serif font-extrabold tracking-tight text-[#76232D] dark:text-[#C29B57] leading-tight"
          )}
        >
          HERITAGE ECONOMY
        </span>
        {showSubtitle && (
          <span className="text-[10px] tracking-wider uppercase font-semibold text-[#5c554b] dark:text-[#a69c8f]">
            Diễn đàn Kinh tế Di sản
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
