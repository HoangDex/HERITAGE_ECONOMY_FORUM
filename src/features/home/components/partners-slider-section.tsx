/**
 * COMPONENT: ĐỐI TÁC ĐỒNG HÀNH & NHÀ TÀI TRỢ THEO LINE (TIERED PARTNERSHIP LINES)
 * Phân tách rõ ràng thành các Line ngang chuyên nghiệp:
 * - Line 1: Cơ quan Chỉ đạo & Đơn vị Chủ trì
 * - Line 2: Đơn vị Tổ chức & Điều hành
 * - Line 3: Nhà tài trợ & Đối tác Chiến lược
 * - Line 4: Đơn vị Bảo trợ Truyền thông & Báo chí
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  Handshake,
  ArrowRight,
  Landmark,
  Building2,
  Sparkles,
  Radio,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { PartnerRoleGroup } from "@/components/common/partner-logo-card";
import type { HomePartner } from "../types/home.types";

interface PartnersSliderSectionProps {
  partners: HomePartner[];
}

export function PartnersSliderSection({ partners }: PartnersSliderSectionProps) {
  const lines = [
    {
      id: "line-steering",
      label: "Line 01",
      title: "Cơ Quan Chỉ Đạo & Đơn Vị Chủ Trì",
      subtitle: "Định hướng chiến lược quốc gia & chủ trì chuyên môn học thuật",
      icon: Landmark,
      badgeColor: "bg-[#0D4838] text-white",
      groups: [
        {
          role: "Cơ quan Chỉ đạo Quốc gia",
          colSpan: "lg:col-span-5",
          items: partners.filter((p) => p.category === "STEERING"),
        },
        {
          role: "Cơ quan Chủ trì & Đăng cai",
          colSpan: "lg:col-span-7",
          items: partners.filter((p) => p.category === "HOSTING"),
        },
      ],
    },
    {
      id: "line-organizing",
      label: "Line 02",
      title: "Đơn Vị Thường Trực Tổ Chức & Học Thuật",
      subtitle: "Cơ quan thường trực đề án, vận hành nền tảng & hội đồng nghiên cứu",
      icon: Building2,
      badgeColor: "bg-[#073327] text-white",
      groups: [
        {
          role: "Đơn vị Thường trực Tổ chức",
          colSpan: "lg:col-span-6",
          items: partners.filter((p) => p.category === "ORGANIZING"),
        },
        {
          role: "Đối tác Học thuật & Phản biện",
          colSpan: "lg:col-span-6",
          items: partners.filter((p) => p.category === "COMPANION" && p.name.includes("Đại học")),
        },
      ],
    },
    {
      id: "line-sponsors",
      label: "Line 03",
      title: "Nhà Tài Trợ & Đối Tác Chiến Lược",
      subtitle: "Tập đoàn kinh tế tiên phong, quỹ bảo tồn & tổ chức quốc tế đồng hành",
      icon: Sparkles,
      badgeColor: "bg-[#C29B57] text-[#041D16] font-bold",
      groups: [
        {
          role: "Nhà Tài trợ Chiến lược",
          colSpan: "lg:col-span-8",
          items: partners.filter((p) => p.category === "STRATEGIC"),
        },
        {
          role: "Đối tác Đồng hành Quốc tế",
          colSpan: "lg:col-span-4",
          items: partners.filter((p) => p.category === "COMPANION" && p.name.includes("UNESCO")),
        },
      ],
    },
    {
      id: "line-media",
      label: "Line 04",
      title: "Bảo Trợ Truyền Thông & Báo Chí",
      subtitle: "Cơ quan truyền hình, báo chí chính trị và cổng thông tin đại chúng",
      icon: Radio,
      badgeColor: "bg-[#0D4838]/10 text-[#0D4838] border-[#0D4838]/30",
      groups: [
        {
          role: "Bảo trợ Truyền thông & Báo chí Chính trị",
          colSpan: "lg:col-span-12",
          items: partners.filter((p) => p.category === "MEDIA"),
        },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EE]/60 border-b border-[#dfd7c8]">
      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-12 sm:space-y-16">
        {/* Tiêu đề tổng thể khối đối tác */}
        <FadeIn
          direction="up"
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#dfd7c8] pb-6 text-left"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D4838] uppercase tracking-wider mb-2 bg-[#0D4838]/10 px-3.5 py-1 rounded-full">
              <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Hệ Thống Đối Tác & Bảo Trợ Di Sản</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0D4838] leading-tight">
              Đơn Vị Chỉ Đạo, Tổ Chức & Nhà Tài Trợ
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5E57] mt-1.5 max-w-2xl leading-relaxed">
              Mạng lưới đồng hành chính thức từ các cơ quan quản lý nhà nước, viện nghiên cứu học
              thuật, các tập đoàn kinh tế và tổ chức quốc tế.
            </p>
          </div>

          <Link
            href="/about#partners"
            className="text-xs font-bold text-[#0D4838] hover:text-[#C29B57] transition-colors flex items-center gap-1.5 cursor-pointer py-1 border-b border-transparent hover:border-[#C29B57] shrink-0"
          >
            <span>Xem mạng lưới đầy đủ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>

        {/* DANH SÁCH CÁC LINE NGANG THEO CẤP BẬC */}
        <div className="space-y-12">
          {lines.map((line) => {
            const totalItems = line.groups.reduce((acc, g) => acc + g.items.length, 0);
            if (totalItems === 0) return null;

            const LineIcon = line.icon;

            return (
              <div
                key={line.id}
                className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-[#dfd7c8] shadow-2xs backdrop-blur-xs space-y-6"
              >
                {/* Header của từng Line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dfd7c8]/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0D4838]/10 text-[#0D4838] flex items-center justify-center shrink-0">
                      <LineIcon className="w-4 h-4 text-[#C29B57]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#C29B57] uppercase">
                          {line.label}
                        </span>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#0D4838]">
                          {line.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-[#4A5E57] mt-0.5">{line.subtitle}</p>
                    </div>
                  </div>

                  <Badge
                    className={`${line.badgeColor} text-[10px] px-2.5 py-0.5 self-start sm:self-auto shrink-0 shadow-2xs`}
                  >
                    {totalItems} đơn vị
                  </Badge>
                </div>

                {/* Danh sách các nhóm vai trò trong Line - Gom nhóm các logo chung vai trò lại */}
                <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {line.groups.map((group) => {
                    if (group.items.length === 0) return null;
                    return (
                      <StaggerItem key={group.role} className={group.colSpan}>
                        <PartnerRoleGroup
                          role={group.role}
                          partners={group.items}
                        />
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
