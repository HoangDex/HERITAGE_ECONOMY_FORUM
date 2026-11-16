/**
 * COMPONENT: HỘI ĐỒNG DIỄN ĐÀN - CÂY PHÂN CẤP CHUẨN MỰC (ORGANIZATIONAL TREE)
 * Phân cấp hình học đối xứng chuẩn mực:
 * - Cấp 1: Chủ tịch Hội đồng (Tâm 50%) & Cố vấn (Nhánh tham mưu độc lập bên phải)
 * - Cấp 2: Các Phó Chủ tịch Hội đồng (Hàng ngang 2 cột đối xứng)
 * - Cấp 3: Các Ủy viên Hội đồng (Hàng ngang 2 cột đối xứng)
 * - Toàn bộ đường line là nét đơn sắc sảo, tự gióng đúng tâm thẻ, không có đường thừa
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import { FadeIn, InteractiveCard } from "@/components/animations";
import type { Person } from "../types/about.types";

interface CouncilSectionProps {
  president: Person;
  vicePresidents: Person[];
  councilMembers: Person[];
  scientificAdvisors: Person[];
  onOpenPersonModal: (person: Person) => void;
  showFullViewLink?: boolean;
}

export function CouncilSection({
  president,
  vicePresidents,
  councilMembers,
  scientificAdvisors,
  onOpenPersonModal,
  showFullViewLink = true,
}: CouncilSectionProps) {
  // Cố vấn Chủ tịch chỉ có 1 người duy nhất
  const singleAdvisor =
    scientificAdvisors && scientificAdvisors.length > 0 ? scientificAdvisors[0] : null;

  // 2 Phó Chủ tịch
  const vp1 = vicePresidents[0];
  const vp2 = vicePresidents[1];

  // 2 Ủy viên Hội đồng
  const member1 = councilMembers[0];
  const member2 = councilMembers[1];

  return (
    <section
      id="council"
      className="py-14 sm:py-20 bg-[#F7F5EE]/60 border-y border-[#dfd7c8] scroll-mt-28"
    >
      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-12">
        {/* Header Mục 6.2 */}
        <FadeIn
          direction="up"
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfd7c8] pb-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D4838]/10 text-[#0D4838] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Sơ Đồ Cây Phân Cấp Học Thuật</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0D4838]">
              Cây Phân Cấp Hội Đồng Diễn Đàn
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4A5E57] max-w-2xl leading-relaxed">
              Cơ cấu tổ chức học thuật phân cấp hoàn chỉnh: Chủ tịch Hội đồng ở đỉnh cây, nhánh Cố
              vấn độc lập tham mưu, các Phó Chủ tịch phụ trách mảng và các Ủy viên chuyên môn trực
              thuộc.
            </p>
          </div>

          {showFullViewLink && (
            <Link href="/about/council" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-[#0D4838] text-[#0D4838] hover:bg-[#0D4838]/10 cursor-pointer"
              >
                <span>Xem toàn bộ Hội đồng</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          )}
        </FadeIn>

        {/* ======================================================== */}
        {/* KHUNG CÂY TỔ CHỨC CÂN ĐỐI CHUẨN XÁC                     */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/70 border border-[#dfd7c8] shadow-xs backdrop-blur-xs">
          {/* CẤP 1: CHỦ TỊCH HỘI ĐỒNG Ở TRUNG TÂM & NHÁNH CỐ VẤN */}
          <div className="relative flex flex-col items-center">
            {/* Hàng trên cùng: Chủ tịch (Chính giữa) + Nhánh Cố vấn (Cánh phải) */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 relative">
              {/* Spacer cân bằng trên Desktop để Chủ tịch luôn ở tâm 50% */}
              <div className="hidden lg:block w-72 shrink-0 pointer-events-none opacity-0" />

              {/* THẺ CHỦ TỊCH (ĐỈNH CÂY TRUNG TÂM) */}
              <div className="w-full max-w-md lg:w-96 shrink-0 relative z-10">
                <InteractiveCard className="h-full">
                  <div className="relative rounded-2xl bg-white border-2 border-[#C29B57] shadow-lg p-5 sm:p-6 text-center hover:shadow-xl transition-all">
                    {/* Top Role Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D4838] text-white text-[11px] font-bold uppercase tracking-wider mb-3 shadow-xs">
                      <HefIcon name="Crown" size="xs" variant="gold" />
                      <span>Chủ Tịch Hội Đồng</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                      {/* Portrait 4:5 */}
                      <div
                        onClick={() => onOpenPersonModal(president)}
                        className="group relative w-24 sm:w-28 aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#C29B57]/60 shadow-sm cursor-pointer shrink-0 bg-[#dfd7c8]/30 mx-auto sm:mx-0"
                      >
                        <Image
                          src={president.avatarUrl}
                          alt={president.altText}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-4 h-4 text-[#C29B57]" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1 flex-1 min-w-0 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5">
                          <Badge className="bg-[#0D4838] text-white text-[10px] font-bold">
                            {president.academicTitle}
                          </Badge>
                          <span className="text-[10px] text-[#C29B57] font-bold">
                            1 Người Duy Nhất
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0D4838] leading-snug">
                          {president.fullName}
                        </h3>
                        <p className="text-xs font-semibold text-[#132A24] line-clamp-1">
                          {president.positionTitle}
                        </p>
                        <p className="text-[11px] text-[#4A5E57] line-clamp-2 leading-tight">
                          {president.organization}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#dfd7c8] flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => onOpenPersonModal(president)}
                        className="text-[#0D4838] hover:text-[#C29B57] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Hồ sơ & tham luận</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C29B57]" />
                      </button>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        ID: PRES-01
                      </span>
                    </div>
                  </div>
                </InteractiveCard>
              </div>

              {/* NHÁNH THAM MƯU: CỐ VẤN CHỦ TỊCH (1 NGƯỜI DUY NHẤT) */}
              {singleAdvisor && (
                <div className="w-full max-w-md lg:w-72 shrink-0 relative z-10">
                  {/* Đường nối ngang từ Chủ tịch sang Cố vấn trên Desktop */}
                  <div className="hidden lg:flex items-center absolute -left-8 top-1/2 -translate-y-1/2 text-[#C29B57]">
                    <div className="w-8 border-t-2 border-dashed border-[#C29B57]" />
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C29B57]/15">
                      Tham mưu
                    </span>
                  </div>

                  <InteractiveCard className="h-full">
                    <div className="relative rounded-2xl bg-[#FDFBF7] border border-[#C29B57] shadow-xs p-4 sm:p-5 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-[#dfd7c8]">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0D4838] bg-[#0D4838]/10 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 text-[#C29B57]" />
                          <span>Cố Vấn Chủ Tịch</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#C29B57] font-bold">
                          1 Người Duy Nhất
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => onOpenPersonModal(singleAdvisor)}
                          className="group relative w-16 sm:w-18 aspect-[4/5] rounded-lg overflow-hidden border border-[#C29B57]/50 shadow-xs cursor-pointer shrink-0 bg-[#dfd7c8]/20"
                        >
                          <Image
                            src={singleAdvisor.avatarUrl}
                            alt={singleAdvisor.altText}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3 h-3 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <Badge className="bg-[#C29B57] text-[#041D16] text-[9px] font-bold px-1.5 py-0">
                            {singleAdvisor.academicTitle}
                          </Badge>
                          <h4 className="text-sm font-serif font-bold text-[#0D4838] truncate">
                            {singleAdvisor.fullName}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#132A24] line-clamp-1">
                            {singleAdvisor.positionTitle}
                          </p>
                          <p className="text-[10px] text-[#4A5E57] line-clamp-1">
                            {singleAdvisor.organization}
                          </p>
                        </div>
                      </div>
                    </div>
                  </InteractiveCard>
                </div>
              )}
            </div>

            {/* TRỤC CHÍNH DỌC TỪ TÂM CHỦ TỊCH RƠI XUỐNG CẤP 2 */}
            <div className="w-0.5 h-8 bg-[#C29B57] relative z-0" />
          </div>

          {/* ======================================================== */}
          {/* CẤP 2 & CẤP 3: CÁC PHÓ CHỦ TỊCH VÀ ỦY VIÊN (HÀNG NGANG)   */}
          {/* ======================================================== */}
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto space-y-6">
            {/* Header Cấp 2 */}
            <div className="text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C29B57] bg-white px-3 py-1 rounded-full border border-[#C29B57]/40 shadow-2xs">
                CẤP 02 • CÁC PHÓ CHỦ TỊCH HỘI ĐỒNG
              </span>
            </div>

            {/* Hàng ngang 2 Phó Chủ tịch - Chiều cao đồng nhất */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
              {/* Phó Chủ tịch 1 */}
              {vp1 && (
                <div className="flex flex-col items-center relative w-full">
                  {/* Đường ngang nửa trái (từ 50% sang mép phải giáp tâm) */}
                  <div className="hidden md:block absolute top-0 left-1/2 right-[-1.5rem] h-0.5 bg-[#C29B57]" />
                  {/* Đường dọc từ thanh ngang rơi chuẩn xác vào tâm thẻ Phó 1 */}
                  <div className="hidden md:block w-0.5 h-8 bg-[#C29B57]" />

                  <div className="w-full">
                    <InteractiveCard className="h-full">
                      <div
                        onClick={() => onOpenPersonModal(vp1)}
                        className="group bg-white rounded-2xl border-2 border-[#dfd7c8] hover:border-[#C29B57] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-center min-h-[115px] h-full"
                      >
                        <div className="relative w-20 sm:w-22 aspect-[4/5] rounded-xl overflow-hidden border border-[#dfd7c8] shrink-0 bg-[#dfd7c8]/20">
                          <Image
                            src={vp1.avatarUrl}
                            alt={vp1.altText}
                            fill
                            sizes="100px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="h-5 flex items-center">
                            <Badge className="bg-[#073327] text-white text-[9px] font-bold px-2 py-0.5">
                              PHÓ CHỦ TỊCH HỘI ĐỒNG
                            </Badge>
                          </div>
                          <div className="h-6 flex items-center">
                            <h4 className="text-base font-serif font-bold text-[#0D4838] group-hover:text-[#073327] transition-colors truncate">
                              {vp1.fullName}
                            </h4>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-xs font-semibold text-[#132A24] truncate">
                              {vp1.positionTitle}
                            </p>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-[11px] text-[#4A5E57] truncate">
                              {vp1.organization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>
              )}

              {/* Phó Chủ tịch 2 */}
              {vp2 && (
                <div className="flex flex-col items-center relative w-full">
                  {/* Đường ngang nửa phải (từ mép trái giáp tâm sang 50%) */}
                  <div className="hidden md:block absolute top-0 left-[-1.5rem] right-1/2 h-0.5 bg-[#C29B57]" />
                  {/* Đường dọc từ thanh ngang rơi chuẩn xác vào tâm thẻ Phó 2 */}
                  <div className="hidden md:block w-0.5 h-8 bg-[#C29B57]" />

                  <div className="w-full">
                    <InteractiveCard className="h-full">
                      <div
                        onClick={() => onOpenPersonModal(vp2)}
                        className="group bg-white rounded-2xl border-2 border-[#dfd7c8] hover:border-[#C29B57] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-center min-h-[115px] h-full"
                      >
                        <div className="relative w-20 sm:w-22 aspect-[4/5] rounded-xl overflow-hidden border border-[#dfd7c8] shrink-0 bg-[#dfd7c8]/20">
                          <Image
                            src={vp2.avatarUrl}
                            alt={vp2.altText}
                            fill
                            sizes="100px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="h-5 flex items-center">
                            <Badge className="bg-[#073327] text-white text-[9px] font-bold px-2 py-0.5">
                              PHÓ CHỦ TỊCH HỘI ĐỒNG
                            </Badge>
                          </div>
                          <div className="h-6 flex items-center">
                            <h4 className="text-base font-serif font-bold text-[#0D4838] group-hover:text-[#073327] transition-colors truncate">
                              {vp2.fullName}
                            </h4>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-xs font-semibold text-[#132A24] truncate">
                              {vp2.positionTitle}
                            </p>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-[11px] text-[#4A5E57] truncate">
                              {vp2.organization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>
              )}
            </div>

            {/* TRỤC CHÍNH RƠI XUỐNG CẤP 3 (CÁC ỦY VIÊN) */}
            <div className="hidden md:flex flex-col items-center py-1">
              <div className="w-0.5 h-8 bg-[#C29B57]" />
            </div>

            {/* Header Cấp 3 */}
            <div className="text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0D4838] bg-[#0D4838]/10 px-3 py-1 rounded-full border border-[#0D4838]/20 shadow-2xs">
                CẤP 03 • CÁC ỦY VIÊN HỘI ĐỒNG DIỄN ĐÀN
              </span>
            </div>

            {/* Hàng ngang 2 Ủy viên - Chiều cao đồng nhất */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
              {/* Ủy viên 1 */}
              {member1 && (
                <div className="flex flex-col items-center relative w-full">
                  {/* Đường ngang nửa trái */}
                  <div className="hidden md:block absolute top-0 left-1/2 right-[-1.5rem] h-0.5 bg-[#C29B57]" />
                  {/* Đường dọc rơi vào đúng tâm thẻ Ủy viên 1 */}
                  <div className="hidden md:block w-0.5 h-7 bg-[#C29B57]" />

                  <div className="w-full">
                    <InteractiveCard className="h-full">
                      <div
                        onClick={() => onOpenPersonModal(member1)}
                        className="group bg-[#FDFBF7] rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex gap-4 items-center min-h-[110px] h-full"
                      >
                        <div className="relative w-18 aspect-[4/5] rounded-lg overflow-hidden border border-[#dfd7c8] shrink-0 bg-[#dfd7c8]/20">
                          <Image
                            src={member1.avatarUrl}
                            alt={member1.altText}
                            fill
                            sizes="90px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3 h-3 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="h-5 flex items-center">
                            <Badge className="bg-[#0D4838] text-white text-[9px] font-bold px-2 py-0.5">
                              ỦY VIÊN HỘI ĐỒNG
                            </Badge>
                          </div>
                          <div className="h-6 flex items-center">
                            <h5 className="text-sm sm:text-base font-serif font-bold text-[#132A24] group-hover:text-[#0D4838] transition-colors truncate">
                              {member1.fullName}
                            </h5>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-xs font-semibold text-[#0D4838] truncate">
                              {member1.expertiseField}
                            </p>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-[11px] text-[#4A5E57] truncate">
                              {member1.organization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>
              )}

              {/* Ủy viên 2 */}
              {member2 && (
                <div className="flex flex-col items-center relative w-full">
                  {/* Đường ngang nửa phải */}
                  <div className="hidden md:block absolute top-0 left-[-1.5rem] right-1/2 h-0.5 bg-[#C29B57]" />
                  {/* Đường dọc rơi vào đúng tâm thẻ Ủy viên 2 */}
                  <div className="hidden md:block w-0.5 h-7 bg-[#C29B57]" />

                  <div className="w-full">
                    <InteractiveCard className="h-full">
                      <div
                        onClick={() => onOpenPersonModal(member2)}
                        className="group bg-[#FDFBF7] rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex gap-4 items-center min-h-[110px] h-full"
                      >
                        <div className="relative w-18 aspect-[4/5] rounded-lg overflow-hidden border border-[#dfd7c8] shrink-0 bg-[#dfd7c8]/20">
                          <Image
                            src={member2.avatarUrl}
                            alt={member2.altText}
                            fill
                            sizes="90px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3 h-3 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="h-5 flex items-center">
                            <Badge className="bg-[#0D4838] text-white text-[9px] font-bold px-2 py-0.5">
                              ỦY VIÊN HỘI ĐỒNG
                            </Badge>
                          </div>
                          <div className="h-6 flex items-center">
                            <h5 className="text-sm sm:text-base font-serif font-bold text-[#132A24] group-hover:text-[#0D4838] transition-colors truncate">
                              {member2.fullName}
                            </h5>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-xs font-semibold text-[#0D4838] truncate">
                              {member2.expertiseField}
                            </p>
                          </div>
                          <div className="h-4 flex items-center">
                            <p className="text-[11px] text-[#4A5E57] truncate">
                              {member2.organization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
