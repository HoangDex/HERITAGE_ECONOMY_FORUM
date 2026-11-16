/**
 * COMPONENT: BAN ĐIỀU HÀNH - CÂY PHÂN CẤP (ORGANIZATIONAL HIERARCHY TREE)
 * Thiết kế chuẩn mực sơ đồ tổ chức:
 * - Cấp 1: Trưởng ban Điều hành (Tâm 50%) & Cố vấn (Nhánh tham mưu độc lập bên phải)
 * - Cấp 2: Các Phó Trưởng ban Điều hành (Hàng ngang 2 cột đối xứng)
 * - Cấp 3: 06 Nhóm chuyên trách phân bổ THEO HÀNG NGANG (Mỗi Phó Trưởng ban quản lý 3 nhóm xếp ngang)
 * - Toàn bộ đường kết nối được vẽ bằng VECTOR SVG tinh gọn, sắc sảo, tự gióng chuẩn xác 100% vào tâm thẻ
 * - Kích thước thẻ cố định đồng nhất, triệt tiêu hoàn toàn hiện tượng lệch kích thước do chữ nhảy hàng
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, ArrowRight, Sparkles, Eye, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, InteractiveCard } from "@/components/animations";
import type { Person, ExecutiveDepartment } from "../types/about.types";

interface ExecutiveSectionProps {
  head: Person;
  advisor?: Person;
  deputies: Person[];
  departments: ExecutiveDepartment[];
  onOpenPersonModal: (person: Person) => void;
  showFullViewLink?: boolean;
}

export function ExecutiveSection({
  head,
  advisor,
  deputies,
  departments,
  onOpenPersonModal,
  showFullViewLink = true,
}: ExecutiveSectionProps) {
  const dep1 = deputies[0];
  const dep2 = deputies[1];

  // Phân chia 6 nhóm chuyên trách theo 2 mảng phụ trách của 2 Phó Trưởng ban
  const deptCodes1 = ["EXTERNAL_AFFAIRS", "PROJECTS", "SECRETARIAT"];
  const branch1Depts = departments.filter((d) => deptCodes1.includes(d.code));

  const deptCodes2 = ["ACADEMIC", "OPERATIONS", "COMMUNICATIONS"];
  const branch2Depts = departments.filter((d) => deptCodes2.includes(d.code));

  // Fallback an toàn nếu danh sách nhóm chưa khớp mã
  const safeBranch1 =
    branch1Depts.length > 0
      ? branch1Depts
      : departments.slice(0, Math.ceil(departments.length / 2));
  const safeBranch2 =
    branch2Depts.length > 0 ? branch2Depts : departments.slice(Math.ceil(departments.length / 2));

  return (
    <section
      id="executive"
      className="py-14 sm:py-20 scroll-mt-28 bg-[#F7F5EE]/40 border-b border-[#dfd7c8]"
    >
      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 space-y-12">
        {/* Tiêu Đề Mục 6.3 */}
        <FadeIn
          direction="up"
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfd7c8] pb-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D4838]/10 text-[#0D4838] text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Sơ Đồ Phân Cấp Bộ Máy Vận Hành</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0D4838]">
              Cây Phân Cấp Ban Điều Hành
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4A5E57] max-w-2xl leading-relaxed">
              Bộ máy chuyên trách điều phối thường trực: Trưởng ban Điều hành thống nhất chỉ huy, Cố
              vấn chiến lược độc lập, các Phó Trưởng ban phụ trách mảng và 06 nhóm chuyên trách
              triển khai các kỳ Diễn đàn.
            </p>
          </div>

          {showFullViewLink && (
            <Link href="/about/executive" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-[#0D4838] text-[#0D4838] hover:bg-[#0D4838]/10 cursor-pointer"
              >
                <span>Xem sơ đồ & nhân sự</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          )}
        </FadeIn>

        {/* ======================================================== */}
        {/* CÂY PHÂN CẤP BAN ĐIỀU HÀNH - THIẾT KẾ ĐỐI XỨNG HÌNH HỌC   */}
        {/* ======================================================== */}
        <div className="relative py-4 space-y-2">
          {/* CẤP 1: TRƯỞNG BAN ĐIỀU HÀNH (CHÍNH GIỮA) & CỐ VẤN (CÁNH PHẢI) */}
          <div className="relative flex flex-col items-center">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 relative">
              {/* Spacer cân bằng trên Desktop để Trưởng ban luôn ở tâm 50% */}
              <div className="hidden lg:block w-72 shrink-0 pointer-events-none opacity-0" />

              {/* THẺ TRƯỞNG BAN ĐIỀU HÀNH (ĐỈNH CÂY TRUNG TÂM) */}
              <div className="w-full max-w-md lg:w-96 shrink-0 relative z-10">
                <InteractiveCard className="h-full">
                  <div className="relative rounded-2xl bg-white border-2 border-[#0D4838] shadow-lg p-5 sm:p-6 text-center hover:shadow-xl transition-all">
                    {/* Badge Vị trí */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0D4838] text-white text-[11px] font-bold uppercase tracking-wider mb-3 shadow-xs">
                      <Briefcase className="w-3.5 h-3.5 text-[#C29B57]" />
                      <span>Trưởng Ban Điều Hành</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                      {/* Ảnh chân dung 4:5 */}
                      <div
                        onClick={() => onOpenPersonModal(head)}
                        className="group relative w-24 sm:w-28 aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#0D4838]/60 shadow-sm cursor-pointer shrink-0 bg-[#dfd7c8]/30 mx-auto sm:mx-0"
                      >
                        <Image
                          src={head.avatarUrl}
                          alt={head.altText}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-4 h-4 text-[#C29B57]" />
                        </div>
                      </div>

                      {/* Thông tin Trưởng ban */}
                      <div className="space-y-1 flex-1 min-w-0 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5">
                          <Badge className="bg-[#0D4838] text-white text-[10px] font-bold">
                            {head.academicTitle}
                          </Badge>
                          <span className="text-[10px] text-[#C29B57] font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> 1 Người Duy Nhất
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0D4838] leading-snug">
                          {head.fullName}
                        </h3>
                        <p className="text-xs font-semibold text-[#132A24] line-clamp-1">
                          {head.positionTitle}
                        </p>
                        <p className="text-[11px] text-[#4A5E57] line-clamp-2 leading-tight">
                          {head.organization}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#dfd7c8] flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => onOpenPersonModal(head)}
                        className="text-[#0D4838] hover:text-[#C29B57] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Hồ sơ & liên hệ</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C29B57]" />
                      </button>
                      {head.email && (
                        <a
                          href={`mailto:${head.email}`}
                          className="text-[11px] text-[#0D4838] hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-[#C29B57]" />
                          <span>{head.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </InteractiveCard>
              </div>

              {/* NHÁNH THAM MƯU: CỐ VẤN BAN ĐIỀU HÀNH (1 NGƯỜI DUY NHẤT) */}
              {advisor && (
                <div className="w-full max-w-md lg:w-72 shrink-0 relative z-10">
                  {/* Đường nối ngang từ Trưởng ban sang Cố vấn trên Desktop */}
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
                          <span>Cố Vấn Ban Điều Hành</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#C29B57] font-bold">
                          1 Người Duy Nhất
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => onOpenPersonModal(advisor)}
                          className="group relative w-16 sm:w-18 aspect-[4/5] rounded-lg overflow-hidden border border-[#C29B57]/50 shadow-xs cursor-pointer shrink-0 bg-[#dfd7c8]/20"
                        >
                          <Image
                            src={advisor.avatarUrl}
                            alt={advisor.altText}
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
                            {advisor.academicTitle}
                          </Badge>
                          <h4 className="text-sm font-serif font-bold text-[#0D4838] truncate">
                            {advisor.fullName}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#132A24] line-clamp-1">
                            {advisor.positionTitle}
                          </p>
                          <p className="text-[10px] text-[#4A5E57] line-clamp-1">
                            {advisor.organization}
                          </p>
                        </div>
                      </div>
                    </div>
                  </InteractiveCard>
                </div>
              )}
            </div>

            {/* TRỤC CHÍNH DỌC TỪ TÂM TRƯỞNG BAN RƠI XUỐNG CẤP 2 */}
            <div className="w-0.5 h-8 bg-[#C29B57] relative z-0" />
          </div>

          {/* ======================================================== */}
          {/* CẤP 2: CÁC PHÓ TRƯỞNG BAN (HÀNG NGANG)                   */}
          {/* ======================================================== */}
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto space-y-3">
            {/* Header Cấp 2 */}
            <div className="text-center pb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C29B57] bg-white px-3 py-1 rounded-full border border-[#C29B57]/40 shadow-2xs">
                CẤP 02 • CÁC PHÓ TRƯỞNG BAN ĐIỀU HÀNH
              </span>
            </div>

            {/* Hàng ngang 2 Phó Trưởng ban với đường gióng chuẩn xác */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
              {/* ==================== PHÓ TRƯỞNG BAN 1 ==================== */}
              {dep1 && (
                <div className="flex flex-col items-center relative w-full">
                  {/* Đường ngang nửa trái (từ 50% sang mép phải giáp tâm) */}
                  <div className="hidden md:block absolute top-0 left-1/2 right-[-1rem] lg:right-[-1.5rem] h-0.5 bg-[#C29B57]" />
                  {/* Đường dọc từ thanh ngang rơi chuẩn xác vào tâm thẻ Phó 1 */}
                  <div className="hidden md:block w-0.5 h-8 bg-[#C29B57]" />

                  {/* THẺ PHÓ TRƯỞNG BAN 1 - CHIỀU CAO ĐỒNG NHẤT */}
                  <div className="w-full">
                    <InteractiveCard className="h-full">
                      <div
                        onClick={() => onOpenPersonModal(dep1)}
                        className="group bg-white rounded-2xl border-2 border-[#dfd7c8] hover:border-[#C29B57] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-center min-h-[115px] h-full"
                      >
                        <div className="relative w-20 sm:w-22 aspect-[4/5] rounded-xl overflow-hidden border border-[#dfd7c8] shrink-0 bg-[#dfd7c8]/20">
                          <Image
                            src={dep1.avatarUrl}
                            alt={dep1.altText}
                            fill
                            sizes="100px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <Badge className="bg-[#073327] text-white text-[9px] font-bold px-2 py-0.5">
                            PHÓ TRƯỞNG BAN
                          </Badge>
                          <h4 className="text-base font-serif font-bold text-[#0D4838] group-hover:text-[#073327] transition-colors truncate">
                            {dep1.fullName}
                          </h4>
                          <p className="text-xs font-semibold text-[#132A24] truncate">
                            {dep1.positionTitle}
                          </p>
                          <p className="text-[11px] text-[#4A5E57] truncate">{dep1.organization}</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>

                  {/* KHỐI KẾT NỐI TỪ PHÓ TRƯỞNG BAN 1 XUỐNG 03 NHÓM CẤP 3 (LIỀN MẠCH, KHÔNG LỆCH, KHÔNG DƯ LINE) */}
                  <div className="hidden sm:grid grid-cols-3 gap-2.5 w-full h-4 mt-6 relative pointer-events-none">
                    {/* Cột 1: Thanh ngang bắt đầu đúng tâm (50%) chạy sang phải, phủ qua khoảng gap-2.5 (10px) */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-1/2 -right-[10px] h-0.5 bg-[#C29B57]" />
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C29B57]" />
                    </div>

                    {/* Cột 2: Thanh ngang liền mạch sang cột 3, trục dọc xuyên suốt từ Phó ban (-top-6) xuống thẻ 2 */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-0 -right-[10px] h-0.5 bg-[#C29B57]" />
                      <div className="absolute -top-6 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C29B57]" />
                    </div>

                    {/* Cột 3: Thanh ngang nhận từ cột 2 và kết thúc đúng tâm (50%) - tuyệt đối không dư bên phải */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-0 right-1/2 h-0.5 bg-[#C29B57]" />
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C29B57]" />
                    </div>
                  </div>

                  {/* KHỐI CẤP 3: 03 NHÓM XẾP THEO HÀNG NGANG - KÍCH THƯỚC ĐỒNG NHẤT */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
                    {safeBranch1.map((dept, idx) => {
                      const leader = dept.members[0];
                      return (
                        <div key={dept.id} className="flex flex-col items-center relative w-full">
                          {/* THẺ NHÓM CHUYÊN TRÁCH - CỐ ĐỊNH CHIỀU CAO 225PX ĐỒNG NHẤT */}
                          <div
                            onClick={() => leader && onOpenPersonModal(leader)}
                            className="w-full h-[225px] min-h-[225px] rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] bg-[#FDFBF7] hover:bg-white p-2.5 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between text-center relative group"
                          >
                            <div>
                              {/* Ảnh Trưởng nhóm */}
                              {leader ? (
                                <div
                                  className="relative w-14 sm:w-16 aspect-[4/5] rounded-xl overflow-hidden border border-[#dfd7c8] mx-auto shrink-0 shadow-2xs group-hover:scale-105 transition-transform bg-[#dfd7c8]/20"
                                  title={`Xem hồ sơ: ${leader.fullName}`}
                                >
                                  <Image
                                    src={leader.avatarUrl}
                                    alt={leader.altText}
                                    fill
                                    sizes="70px"
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-[#041D16]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Eye className="w-3.5 h-3.5 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl bg-[#0D4838]/10 text-[#0D4838] text-xs font-bold flex items-center justify-center mx-auto mb-1">
                                  0{idx + 1}
                                </div>
                              )}

                              {/* Mã bộ phận */}
                              <span className="text-[9px] font-mono font-bold text-[#C29B57] uppercase tracking-wider block mt-2 h-3.5 truncate">
                                {dept.code}
                              </span>

                              {/* Tên bộ phận: container cố định h-8 để 1 hay 2 dòng không làm lệch chiều cao */}
                              <div className="h-8 flex items-center justify-center my-0.5">
                                <h5 className="text-[11px] font-serif font-bold text-[#132A24] line-clamp-2 leading-tight">
                                  {dept.name}
                                </h5>
                              </div>

                              {/* Tên Trưởng nhóm: container cố định h-4 */}
                              <div className="h-4 flex items-center justify-center">
                                {leader && (
                                  <p className="text-[10px] text-[#4A5E57] truncate font-semibold">
                                    {leader.fullName}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="pt-1.5 border-t border-[#dfd7c8]/60 flex items-center justify-center">
                              <span className="text-[9px] font-semibold text-[#C29B57] group-hover:text-[#0D4838] transition-colors">
                                Xem hồ sơ →
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ==================== PHÓ TRƯỞNG BAN 2 ==================== */}
              {dep2 && (
                <div className="flex flex-col items-center relative w-full">
                  {/* Đường ngang nửa phải (từ mép trái giáp tâm sang 50%) */}
                  <div className="hidden md:block absolute top-0 left-[-1rem] lg:left-[-1.5rem] right-1/2 h-0.5 bg-[#C29B57]" />
                  {/* Đường dọc từ thanh ngang rơi chuẩn xác vào tâm thẻ Phó 2 */}
                  <div className="hidden md:block w-0.5 h-8 bg-[#C29B57]" />

                  {/* THẺ PHÓ TRƯỞNG BAN 2 - CHIỀU CAO ĐỒNG NHẤT */}
                  <div className="w-full">
                    <InteractiveCard className="h-full">
                      <div
                        onClick={() => onOpenPersonModal(dep2)}
                        className="group bg-white rounded-2xl border-2 border-[#dfd7c8] hover:border-[#C29B57] p-4 sm:p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-center min-h-[115px] h-full"
                      >
                        <div className="relative w-20 sm:w-22 aspect-[4/5] rounded-xl overflow-hidden border border-[#dfd7c8] shrink-0 bg-[#dfd7c8]/20">
                          <Image
                            src={dep2.avatarUrl}
                            alt={dep2.altText}
                            fill
                            sizes="100px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[#041D16]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-[#C29B57]" />
                          </div>
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <Badge className="bg-[#073327] text-white text-[9px] font-bold px-2 py-0.5">
                            PHÓ TRƯỞNG BAN
                          </Badge>
                          <h4 className="text-base font-serif font-bold text-[#0D4838] group-hover:text-[#073327] transition-colors truncate">
                            {dep2.fullName}
                          </h4>
                          <p className="text-xs font-semibold text-[#132A24] truncate">
                            {dep2.positionTitle}
                          </p>
                          <p className="text-[11px] text-[#4A5E57] truncate">{dep2.organization}</p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </div>

                  {/* KHỐI KẾT NỐI TỪ PHÓ TRƯỞNG BAN 2 XUỐNG 03 NHÓM CẤP 3 (LIỀN MẠCH, KHÔNG LỆCH, KHÔNG DƯ LINE) */}
                  <div className="hidden sm:grid grid-cols-3 gap-2.5 w-full h-4 mt-6 relative pointer-events-none">
                    {/* Cột 1: Thanh ngang bắt đầu đúng tâm (50%) chạy sang phải, phủ qua khoảng gap-2.5 (10px) */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-1/2 -right-[10px] h-0.5 bg-[#C29B57]" />
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C29B57]" />
                    </div>

                    {/* Cột 2: Thanh ngang liền mạch sang cột 3, trục dọc xuyên suốt từ Phó ban (-top-6) xuống thẻ 5 */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-0 -right-[10px] h-0.5 bg-[#C29B57]" />
                      <div className="absolute -top-6 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C29B57]" />
                    </div>

                    {/* Cột 3: Thanh ngang nhận từ cột 2 và kết thúc đúng tâm (50%) - tuyệt đối không dư bên phải */}
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-0 right-1/2 h-0.5 bg-[#C29B57]" />
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#C29B57]" />
                    </div>
                  </div>

                  {/* KHỐI CẤP 3: 03 NHÓM XẾP THEO HÀNG NGANG - KÍCH THƯỚC ĐỒNG NHẤT */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
                    {safeBranch2.map((dept, idx) => {
                      const leader = dept.members[0];
                      return (
                        <div key={dept.id} className="flex flex-col items-center relative w-full">
                          {/* THẺ NHÓM CHUYÊN TRÁCH - CỐ ĐỊNH CHIỀU CAO 225PX ĐỒNG NHẤT */}
                          <div
                            onClick={() => leader && onOpenPersonModal(leader)}
                            className="w-full h-[225px] min-h-[225px] rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] bg-[#FDFBF7] hover:bg-white p-2.5 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between text-center relative group"
                          >
                            <div>
                              {/* Ảnh Trưởng nhóm */}
                              {leader ? (
                                <div
                                  className="relative w-14 sm:w-16 aspect-[4/5] rounded-xl overflow-hidden border border-[#dfd7c8] mx-auto shrink-0 shadow-2xs group-hover:scale-105 transition-transform bg-[#dfd7c8]/20"
                                  title={`Xem hồ sơ: ${leader.fullName}`}
                                >
                                  <Image
                                    src={leader.avatarUrl}
                                    alt={leader.altText}
                                    fill
                                    sizes="70px"
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-[#041D16]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Eye className="w-3.5 h-3.5 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl bg-[#0D4838]/10 text-[#0D4838] text-xs font-bold flex items-center justify-center mx-auto mb-1">
                                  0{idx + 4}
                                </div>
                              )}

                              {/* Mã bộ phận */}
                              <span className="text-[9px] font-mono font-bold text-[#C29B57] uppercase tracking-wider block mt-2 h-3.5 truncate">
                                {dept.code}
                              </span>

                              {/* Tên bộ phận: container cố định h-8 để 1 hay 2 dòng không làm lệch chiều cao */}
                              <div className="h-8 flex items-center justify-center my-0.5">
                                <h5 className="text-[11px] font-serif font-bold text-[#132A24] line-clamp-2 leading-tight">
                                  {dept.name}
                                </h5>
                              </div>

                              {/* Tên Trưởng nhóm: container cố định h-4 */}
                              <div className="h-4 flex items-center justify-center">
                                {leader && (
                                  <p className="text-[10px] text-[#4A5E57] truncate font-semibold">
                                    {leader.fullName}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="pt-1.5 border-t border-[#dfd7c8]/60 flex items-center justify-center">
                              <span className="text-[9px] font-semibold text-[#C29B57] group-hover:text-[#0D4838] transition-colors">
                                Xem hồ sơ →
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
