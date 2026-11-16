/**
 * COMPONENT: FORUM PARTNERS SECTION (BAN TỔ CHỨC & ĐỐI TÁC DIỄN ĐÀN)
 * Hiển thị 6 cơ quan Ban Tổ Chức (BTC) chính thức trong bố cục lưới đối xứng 2x3 chuẩn UX/UI
 */

"use client";

import React from "react";
import Link from "next/link";
import { Handshake, ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { PartnerRoleGroup } from "@/components/common/partner-logo-card";

interface BtcPartnerItem {
  id: string;
  name: string;
  shortName?: string;
  roleLabel: string;
  logoUrl: string;
  websiteUrl?: string;
}

const BTC_PARTNERS: BtcPartnerItem[] = [
  {
    id: "btc_1",
    name: "Bộ Văn hóa, Thể thao và Du lịch",
    shortName: "BVHTTDL",
    roleLabel: "Cơ quan Chỉ đạo Quốc gia",
    logoUrl: "/images/partners/bvhttdl.png",
    websiteUrl: "https://bvhttdl.gov.vn",
  },
  {
    id: "btc_2",
    name: "Hội Di sản Văn hóa Việt Nam",
    shortName: "VCHA",
    roleLabel: "Cơ quan Chủ trì Học thuật",
    logoUrl: "/images/partners/vcha.png",
    websiteUrl: "https://hoidisan.vn",
  },
  {
    id: "btc_3",
    name: "Ủy ban Nhân dân Thành phố Hà Nội",
    shortName: "UBND TP Hà Nội",
    roleLabel: "Cơ quan Đồng chủ trì & Đăng cai",
    logoUrl: "/images/partners/hanoi.png",
    websiteUrl: "https://hanoi.gov.vn",
  },
  {
    id: "btc_4",
    name: "Viện Nghiên cứu Kinh tế Di sản & Phát triển Bền vững",
    shortName: "HEI",
    roleLabel: "Đơn vị Thường trực Tổ chức",
    logoUrl: "/images/partners/hei.png",
    websiteUrl: "https://hef.vn",
  },
  {
    id: "btc_5",
    name: "Văn phòng UNESCO tại Hà Nội",
    shortName: "UNESCO Hà Nội",
    roleLabel: "Đối tác Quốc tế Đồng hành",
    logoUrl: "/images/partners/unesco.png",
    websiteUrl: "https://unesco.org",
  },
  {
    id: "btc_6",
    name: "Đại học Quốc gia Hà Nội",
    shortName: "VNU",
    roleLabel: "Đối tác Học thuật & Phản biện",
    logoUrl: "/images/partners/vnu.png",
    websiteUrl: "https://vnu.edu.vn",
  },
];

const FORUM_ROLE_GROUPS = [
  {
    role: "Cơ quan Chỉ đạo Quốc gia",
    colSpan: "lg:col-span-5",
    items: [BTC_PARTNERS[0]],
  },
  {
    role: "Cơ quan Chủ trì & Đăng cai",
    colSpan: "lg:col-span-7",
    items: [BTC_PARTNERS[1], BTC_PARTNERS[2]],
  },
  {
    role: "Đơn vị Thường trực Tổ chức",
    colSpan: "lg:col-span-5",
    items: [BTC_PARTNERS[3]],
  },
  {
    role: "Đối tác Học thuật & Đồng hành Quốc tế",
    colSpan: "lg:col-span-7",
    items: [BTC_PARTNERS[4], BTC_PARTNERS[5]],
  },
];

export function ForumPartnersSection() {
  return (
    <section
      id="doi-tac"
      className="py-16 sm:py-20 bg-[#F5EFE5]/50 border-t border-[#dfd7c8] scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-12">
        {/* Tiêu đề mục Ban Tổ Chức */}
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Ban Tổ Chức • Kỳ Diễn Đàn 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0D4838] tracking-tight">
            Cơ Quan Chỉ Đạo, Chủ Trì & Thường Trực Tổ Chức
          </h2>
          <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed">
            Diễn đàn Kinh tế Di sản 2026 được chỉ đạo và phối hợp thực hiện bởi các cơ quan quản lý
            nhà nước, tổ chức chuyên môn văn hóa và viện nghiên cứu uy tín hàng đầu quốc gia.
          </p>
        </FadeIn>

        {/* Lưới các nhóm vai trò Ban Tổ Chức - Gom nhóm các logo chung vai trò lại với nhau */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl xl:max-w-7xl mx-auto">
          {FORUM_ROLE_GROUPS.map((group) => (
            <StaggerItem key={group.role} className={group.colSpan}>
              <PartnerRoleGroup role={group.role} partners={group.items} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Banner: Đăng ký Đồng hành cùng Diễn đàn */}
        <FadeIn
          direction="up"
          className="rounded-3xl bg-gradient-to-r from-[#0D4838] via-[#073327] to-[#292929] p-6 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-2 border-[#C29B57]"
        >
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#C29B57] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cơ Hội Đồng Hành Kỳ Diễn Đàn 2026</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold tracking-tight text-[#F5EFE5]">
              Đồng Hành & Trở Thành Đối Tác Diễn Đàn
            </h3>
            <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
              Cùng chung tay tạo lập không gian đối thoại đa ngành, kiến tạo các mô hình kinh tế di
              sản thịnh vượng và bảo tồn các giá trị văn hóa vô giá của dân tộc.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/contact?loai=hop-tac#contact-form"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold border border-white/20 shadow-md cursor-pointer h-11 px-6 inline-flex items-center justify-center"
              )}
            >
              <span>Đăng ký Đồng hành</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact?loai=tai-tro#contact-form"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto bg-[#F5EFE5] hover:bg-white text-[#0D4838] hover:text-[#073327] border border-[#C29B57]/60 font-bold cursor-pointer h-11 px-6 shadow-md transition-all inline-flex items-center justify-center"
              )}
            >
              <span>Tài trợ Diễn đàn</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
