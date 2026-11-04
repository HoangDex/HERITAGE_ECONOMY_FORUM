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
import type { HomePartner } from "../types/home.types";

interface PartnersSliderSectionProps {
  partners: HomePartner[];
}

export function PartnersSliderSection({ partners }: PartnersSliderSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-muted/20 border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C29B57] uppercase tracking-wider mb-1">
              <Handshake className="w-3.5 h-3.5" />
              <span>Mạng Lưới Đồng Hành</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
              Đơn Vị Chỉ Đạo, Chủ Trì & Đối Tác Chiến Lược
            </h3>
          </div>

          <Link
            href="/gioi-thieu#partners"
            className="text-xs font-semibold text-[#76232D] dark:text-[#C29B57] hover:underline flex items-center gap-1"
          >
            <span>Xem mạng lưới đầy đủ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Lưới logo đối tác: 2 cột Mobile | 3 cột Tablet | 6 cột Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-card rounded-xl border border-border hover:border-[#C29B57] p-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <Badge
                  variant="outline"
                  className="text-[9px] px-1.5 py-0 border-[#C29B57]/40 text-[#C29B57]"
                >
                  {partner.categoryLabel}
                </Badge>
                {partner.websiteUrl && (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Logo */}
              <div className="relative w-full h-16 sm:h-20 bg-white dark:bg-muted/30 rounded-lg p-2 mb-2 flex items-center justify-center border border-border/50">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-contain p-2 transition-transform group-hover:scale-105"
                />
              </div>

              <h4
                className="text-[11px] font-semibold text-foreground text-center truncate"
                title={partner.name}
              >
                {partner.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
