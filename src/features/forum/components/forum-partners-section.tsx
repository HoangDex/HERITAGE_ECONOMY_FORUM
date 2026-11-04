/**
 * COMPONENT: FORUM PARTNERS SECTION (ĐỐI TÁC ĐỒNG HÀNH KỲ DIỄN ĐÀN)
 * Hiển thị đầy đủ mạng lưới logo đối tác chính thức cho Kỳ Diễn đàn Kinh tế Di sản
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handshake, ExternalLink, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";

interface ForumPartnerItem {
  id: string;
  name: string;
  shortName: string;
  category: "STEERING" | "HOSTING" | "ORGANIZING" | "COMPANION" | "STRATEGIC" | "MEDIA";
  categoryLabel: string;
  badgeColor: string;
  logoUrl: string;
  role: string;
  websiteUrl: string;
}

const FORUM_PARTNERS: ForumPartnerItem[] = [
  // 1. Chỉ đạo & Chủ trì
  {
    id: "fp_1",
    name: "Bộ Văn hóa, Thể thao và Du lịch",
    shortName: "BVHTTDL",
    category: "STEERING",
    categoryLabel: "Cơ quan Chỉ đạo",
    badgeColor: "bg-[#76232D] text-white border-transparent",
    logoUrl: "/images/partners/bvhttdl.svg",
    role: "Chỉ đạo định hướng chiến lược quốc gia về kinh tế di sản",
    websiteUrl: "https://bvhttdl.gov.vn",
  },
  {
    id: "fp_2",
    name: "Hội Di sản Văn hóa Việt Nam",
    shortName: "VCHA",
    category: "HOSTING",
    categoryLabel: "Cơ quan Chủ trì",
    badgeColor: "bg-[#52181F] text-white border-transparent",
    logoUrl: "/images/partners/vcha.svg",
    role: "Chủ trì chuyên môn và thẩm định học thuật các phiên nghị sự",
    websiteUrl: "https://hoidisan.vn",
  },
  {
    id: "fp_3",
    name: "Ủy ban Nhân dân Thành phố Hà Nội",
    shortName: "UBND TP Hà Nội",
    category: "HOSTING",
    categoryLabel: "Đồng Chủ trì Đăng cai",
    badgeColor: "bg-[#76232D] text-white border-transparent",
    logoUrl: "/images/partners/hanoi.svg",
    role: "Đồng chủ trì & bảo trợ không gian Hoàng thành Thăng Long",
    websiteUrl: "https://hanoi.gov.vn",
  },
  // 2. Thường trực Tổ chức
  {
    id: "fp_4",
    name: "Viện Nghiên cứu Kinh tế Di sản & Phát triển Bền vững",
    shortName: "HEI",
    category: "ORGANIZING",
    categoryLabel: "Đơn vị Thường trực Tổ chức",
    badgeColor: "bg-[#C29B57] text-[#292929] border-transparent font-bold",
    logoUrl: "/images/partners/hei.svg",
    role: "Thường trực tổ chức, điều phối các phiên và quản trị nền tảng HEF",
    websiteUrl: "https://hef.vn",
  },
  // 3. Đồng hành Quốc tế & Học thuật
  {
    id: "fp_5",
    name: "Văn phòng UNESCO tại Hà Nội",
    shortName: "UNESCO Hanoi",
    category: "COMPANION",
    categoryLabel: "Đối tác Đồng hành Quốc tế",
    badgeColor: "bg-amber-900 text-white border-transparent",
    logoUrl: "/images/partners/unesco.svg",
    role: "Đồng hành tư vấn chuyên gia và các tiêu chuẩn bảo tồn thế giới",
    websiteUrl: "https://unesco.org",
  },
  {
    id: "fp_6",
    name: "Đại học Quốc gia Hà Nội",
    shortName: "VNU",
    category: "COMPANION",
    categoryLabel: "Đối tác Học thuật",
    badgeColor: "bg-amber-900 text-white border-transparent",
    logoUrl: "/images/partners/vnu.svg",
    role: "Cung cấp chuyên gia phản biện học thuật và chủ tọa các phiên",
    websiteUrl: "https://vnu.edu.vn",
  },
  // 4. Chiến lược & Bảo trợ Tài chính
  {
    id: "fp_7",
    name: "Tập đoàn Sovico",
    shortName: "Sovico Group",
    category: "STRATEGIC",
    categoryLabel: "Đối tác Chiến lược",
    badgeColor: "bg-emerald-800 text-white border-transparent",
    logoUrl: "/images/partners/sovico.svg",
    role: "Bảo trợ tài chính và phát triển dự án di sản đô thị bền vững",
    websiteUrl: "https://sovicogroup.com",
  },
  {
    id: "fp_8",
    name: "Tập đoàn Vingroup – Quỹ Thiện Tâm",
    shortName: "Vingroup",
    category: "STRATEGIC",
    categoryLabel: "Đối tác Chiến lược",
    badgeColor: "bg-emerald-800 text-white border-transparent",
    logoUrl: "/images/partners/vingroup.svg",
    role: "Tài trợ chương trình số hóa di sản 3D và bảo tồn thích ứng",
    websiteUrl: "https://vingroup.net",
  },
  // 5. Bảo trợ Truyền thông
  {
    id: "fp_9",
    name: "Đài Truyền hình Việt Nam",
    shortName: "VTV",
    category: "MEDIA",
    categoryLabel: "Bảo trợ Truyền hình",
    badgeColor: "bg-blue-800 text-white border-transparent",
    logoUrl: "/images/partners/vtv.svg",
    role: "Bảo trợ phát sóng truyền hình trực tiếp các phiên trọng thể",
    websiteUrl: "https://vtv.vn",
  },
  {
    id: "fp_10",
    name: "Báo Nhân Dân",
    shortName: "Báo Nhân Dân",
    category: "MEDIA",
    categoryLabel: "Bảo trợ Báo chí Chính trị",
    badgeColor: "bg-blue-800 text-white border-transparent",
    logoUrl: "/images/partners/nhandan.svg",
    role: "Bảo trợ thông tin báo chí và chuyên trang Di sản & Kinh tế",
    websiteUrl: "https://nhandan.vn",
  },
];

export function ForumPartnersSection() {
  return (
    <section
      id="doi-tac"
      className="py-16 sm:py-20 bg-[#F5EFE5]/50 border-t border-[#dfd7c8] scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-12">
        {/* Section Header */}
        <FadeIn direction="up" className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Mạng Lưới Đối Tác Đồng Hành</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] tracking-tight">
            Đơn Vị Chỉ Đạo, Chủ Trì & Đối Tác Diễn Đàn
          </h2>
          <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed">
            Diễn đàn Kinh tế Di sản 2026 nhận được sự chỉ đạo định hướng và đồng hành chặt chẽ của
            các cơ quan quản lý nhà nước, các tổ chức quốc tế uy tín, viện nghiên cứu học thuật cùng
            các tập đoàn kinh tế tiên phong.
          </p>
        </FadeIn>

        {/* Logo Grid: 2 cols Mobile, 3 cols Tablet, 5 cols Desktop */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {FORUM_PARTNERS.map((partner) => (
            <StaggerItem key={partner.id}>
              <InteractiveCard className="group h-full bg-white rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] p-4 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <Badge
                      className={`${partner.badgeColor} text-[10px] font-semibold px-2 py-0.5 border shadow-2xs`}
                    >
                      {partner.categoryLabel}
                    </Badge>
                    <span className="text-[10px] text-[#5c554b] font-medium bg-[#F5EFE5] px-1.5 py-0.5 rounded-full">
                      Kỳ 2026
                    </span>
                  </div>

                  {/* Logo Container with unoptimized SVG */}
                  <div className="relative w-full h-24 rounded-xl overflow-hidden bg-[#FDFBF7] p-2 mb-3 border border-[#dfd7c8]/60 flex items-center justify-center group-hover:border-[#C29B57]/50 transition-colors">
                    <Image
                      src={partner.logoUrl}
                      alt={`Logo ${partner.name}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 250px"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Partner Name & Role */}
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#292929] group-hover:text-[#76232D] transition-colors line-clamp-2 leading-snug min-h-[36px] flex items-center">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-[#5c554b] mt-1.5 line-clamp-2 leading-relaxed">
                    {partner.role}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#dfd7c8]/60 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-medium text-[#76232D]">
                    {partner.shortName}
                  </span>
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5c554b] hover:text-[#76232D] transition-colors p-1"
                    title={`Mở website ${partner.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Banner: Đăng ký Đồng hành cùng Diễn đàn */}
        <FadeIn
          direction="up"
          className="rounded-3xl bg-gradient-to-r from-[#76232D] via-[#52181F] to-[#292929] p-6 sm:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-2 border-[#C29B57]"
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
            <Link href="/lien-he?loai=hop-tac" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold border border-white/20 shadow-md cursor-pointer h-11 px-6"
              >
                <span>Đăng ký Đồng hành</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/lien-he?loai=tai-tro" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-[#F5EFE5] hover:bg-white text-[#76232D] hover:text-[#52181F] border border-[#C29B57]/60 font-bold cursor-pointer h-11 px-6 shadow-md transition-all"
              >
                <span>Tài trợ Diễn đàn</span>
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
