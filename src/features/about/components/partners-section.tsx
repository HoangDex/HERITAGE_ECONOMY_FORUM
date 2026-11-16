/**
 * COMPONENT: BAN TỔ CHỨC & CƠ QUAN CHỦ TRÌ (MỤC 6.4)
 * Thiết kế chuẩn UX/UI theo yêu cầu:
 * - Tinh gọn, chỉ hiển thị Logo và định danh chính thức của các cơ quan trong Ban Tổ Chức (BTC)
 * - Lưới Logo đối xứng chuẩn tắc (2 hàng x 3 cột), loại bỏ các thông tin rườm rà
 * - Khung Logo sắc nét, chuẩn phong thái trang trọng của các cơ quan quản lý nhà nước & viện nghiên cứu
 */

"use client";

import React from "react";
import Link from "next/link";
import { Handshake, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { PartnerRoleGroup } from "@/components/common/partner-logo-card";
import type { PartnerOrganization, PartnerCategory } from "../types/about.types";

interface PartnersSectionProps {
  partners: PartnerOrganization[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Lọc các cơ quan nòng cốt trong Ban Tổ Chức (BTC)
  const btcCategories: PartnerCategory[] = ["STEERING", "HOSTING", "ORGANIZING", "COMPANION"];
  const btcPartners = partners.filter((p) => btcCategories.includes(p.category));

  // Sắp xếp theo đúng thứ tự thẩm quyền nghi lễ
  const displayedPartners =
    btcPartners.length > 0
      ? [...btcPartners].sort((a, b) => a.order - b.order)
      : partners.slice(0, 6);

  const steeringPartners = displayedPartners.filter((p) => p.category === "STEERING");
  const hostingPartners = displayedPartners.filter((p) => p.category === "HOSTING");
  const organizingPartners = displayedPartners.filter((p) => p.category === "ORGANIZING");
  const companionPartners = displayedPartners.filter((p) => p.category === "COMPANION");

  const aboutRoleGroups = [
    {
      role: "Cơ quan Chỉ đạo Quốc gia",
      colSpan: "lg:col-span-5",
      items: steeringPartners,
    },
    {
      role: "Cơ quan Chủ trì & Đăng cai",
      colSpan: "lg:col-span-7",
      items: hostingPartners,
    },
    {
      role: "Đơn vị Thường trực Tổ chức",
      colSpan: "lg:col-span-5",
      items: organizingPartners,
    },
    {
      role: "Đối tác Học thuật & Phản biện",
      colSpan: "lg:col-span-7",
      items: companionPartners,
    },
  ].filter((grp) => grp.items.length > 0);

  return (
    <section
      id="partners"
      className="py-14 sm:py-20 bg-[#F5EFE5]/40 border-t border-[#dfd7c8] scroll-mt-28"
    >
      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Tiêu đề Khối Ban Tổ Chức */}
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D4838]/10 text-[#0D4838] text-xs font-semibold uppercase tracking-wider mb-3">
            <Handshake className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Ban Tổ Chức & Cơ Quan Chủ Trì</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0D4838]">
            Các Cơ Quan Chỉ Đạo & Ban Tổ Chức
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5c554b] leading-relaxed">
            Diễn đàn Kinh tế Di sản (HEF) được chỉ đạo, đồng chủ trì và vận hành bởi các cơ quan
            quản lý nhà nước, tổ chức chuyên môn văn hóa và viện nghiên cứu uy tín hàng đầu quốc
            gia.
          </p>
        </FadeIn>

        {/* LƯỚI LOGO BAN TỔ CHỨC (BTC) - GOM NHÓM CHUNG VAI TRÒ CHUẨN UX/UI */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 max-w-6xl xl:max-w-7xl mx-auto mb-14">
          {aboutRoleGroups.map((group) => (
            <StaggerItem key={group.role} className={group.colSpan}>
              <PartnerRoleGroup role={group.role} partners={group.items} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* KHỐI CTA KÊU GỌI HỢP TÁC */}
        <FadeIn
          direction="up"
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0D4838] via-[#073327] to-[#292929] text-white p-6 sm:p-10 border-2 border-[#C29B57] shadow-xl text-center sm:text-left max-w-6xl xl:max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C29B57] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cơ Hội Đồng Hành Chiến Lược</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#F5EFE5]">
                Trở Thành Đối Tác Diễn Đàn Kinh Tế Di Sản
              </h3>
              <p className="text-sm text-white/85 max-w-2xl leading-relaxed">
                Đồng hành cùng chúng tôi trong việc bảo tồn các di sản văn hóa quý báu của dân tộc,
                kiến tạo giá trị kinh tế bền vững và nâng tầm thương hiệu Việt Nam trên trường quốc
                tế.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-center sm:justify-end gap-3">
              <Link href="/contact?loai=hop-tac#contact-form" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold border border-white/20 shadow-md cursor-pointer h-11"
                >
                  <span>Đăng ký Hợp tác</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact?loai=tai-tro#contact-form" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-[#F5EFE5] hover:bg-white text-[#0D4838] hover:text-[#073327] border border-[#C29B57]/60 font-bold cursor-pointer h-11 shadow-md transition-all"
                >
                  <span>Tài trợ & Đồng hành</span>
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
