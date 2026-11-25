/**
 * COMPONENT LOGO NHẬN DIỆN THƯƠNG HIỆU DIỄN ĐÀN KINH TẾ DI SẢN (HEF)
 * Chuẩn màu Đỏ son #0D4838 & Vàng đồng #C29B57
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  showText?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light" | "sidebar" | "icon-only";
}

export function BrandLogo({
  className,
  showSubtitle = true,
  showText = true,
  href,
  size = "md",
  variant = "default",
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

  const isDarkBg = variant === "light" || variant === "sidebar";
  const isIconOnly = variant === "icon-only" || !showText;

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* Biểu trưng hình họa di sản: Cổng Khuê Văn Các / Mái đình cổ */}
      <div
        className={cn(
          sizeClasses[size],
          "aspect-square rounded-lg flex items-center justify-center p-2 shadow-xs transition-transform group-hover:scale-105",
          variant === "sidebar"
            ? "bg-[#041D16] border border-[#C29B57]/50 text-[#C29B57]"
            : "bg-[#0D4838] text-[#C29B57] border border-[#C29B57]/30"
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

      {!isIconOnly && (
        <div className="flex flex-col">
          <span
            className={cn(
              textClasses[size],
              "font-serif font-extrabold tracking-tight leading-tight",
              isDarkBg ? "text-white" : "text-[#0D4838] dark:text-[#C29B57]"
            )}
          >
            HERITAGE ECONOMY
          </span>
          {showSubtitle && (
            <span
              className={cn(
                "text-[10px] tracking-wider uppercase font-semibold",
                variant === "sidebar"
                  ? "text-[#C29B57] font-bold tracking-widest text-[9px]"
                  : isDarkBg
                  ? "text-[#E6D7C3]"
                  : "text-[#5c554b] dark:text-[#a69c8f]"
              )}
            >
              {variant === "sidebar" ? "KHU VỰC QUẢN TRỊ" : "Diễn đàn Kinh tế Di sản"}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
