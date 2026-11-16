import Link from "next/link";
import { BrandLogo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ShieldCheck, ArrowRight, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#DFD8C8] bg-[#EFEAE0] text-[#132A24]">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-14 max-w-[1840px] 2xl:max-w-[1920px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-1 space-y-4">
            <BrandLogo size="md" href="/" />
            <p className="text-xs text-[#4A5E57] max-w-sm leading-relaxed">
              {siteConfig.slogan}. Cổng thông tin học thuật, đối thoại liên ngành và kết nối các
              nguồn lực phát huy giá trị di sản trong nền kinh tế đương đại.
            </p>
            <div className="text-xs text-[#4A5E57] space-y-1.5 pt-1">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C29B57] shrink-0 mt-0.5" />
                <span>Hoàng thành Thăng Long, 19C Hoàng Diệu, Ba Đình, Hà Nội</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                <span>contact@heritageeconomy.vn</span>
              </p>
            </div>
          </div>

          {/* Nhóm 1: Giới thiệu (PRD Section 04 & 06) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4838] flex items-center gap-1.5">
              <span>01. Giới Thiệu</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#4A5E57]">
              <li>
                <Link href="/about" className="hover:text-[#0D4838] transition-colors">
                  Về Diễn đàn & Tôn chỉ
                </Link>
              </li>
              <li>
                <Link
                  href="/about#tam-nhin-su-menh"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Tầm nhìn – Sứ mệnh – Giá trị
                </Link>
              </li>
              <li>
                <Link
                  href="/about/council"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Hội đồng Diễn đàn
                </Link>
              </li>
              <li>
                <Link
                  href="/about/executive"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Ban Điều hành & Chuyên trách
                </Link>
              </li>
              <li>
                <Link href="/about#doi-tac" className="hover:text-[#0D4838] transition-colors">
                  Mạng lưới Đối tác Đồng hành
                </Link>
              </li>
            </ul>
          </div>

          {/* Nhóm 2: Khám phá (PRD Section 04 & 07, 09, 10) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4838]">
              02. Khám Phá
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#4A5E57]">
              <li>
                <Link href="/forum" className="hover:text-[#0D4838] transition-colors">
                  Kỳ Diễn đàn 2026 (Kế hoạch)
                </Link>
              </li>
              <li>
                <Link href="/forum#cac-phien" className="hover:text-[#0D4838] transition-colors">
                  04 Phiên Nghị sự Chuyên đề
                </Link>
              </li>
              <li>
                <Link href="/forum#timeline" className="hover:text-[#0D4838] transition-colors">
                  Timeline & Diễn giả Đầu ngành
                </Link>
              </li>
              <li>
                <Link href="/forum#tai-lieu" className="hover:text-[#0D4838] transition-colors">
                  Kỷ yếu ISBN & Báo cáo Nghiên cứu
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#0D4838] transition-colors">
                  Danh mục 04 Nhóm Dự án Di sản
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#0D4838] transition-colors">
                  Tin tức & Góc nhìn Chuyên gia
                </Link>
              </li>
            </ul>
          </div>

          {/* Nhóm 3: Tham gia (PRD Section 04 & 08, 10, 11) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4838]">
              03. Tham Gia
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#4A5E57]">
              <li>
                <Link
                  href="/contact?loai=tham-du#contact-form"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Đăng ký tham dự Đại biểu
                </Link>
              </li>
              <li>
                <Link href="/awards" className="hover:text-[#0D4838] transition-colors">
                  Giải thưởng Phát triển Bền vững
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?loai=giai-thuong#contact-form"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Nộp Hồ sơ Đề cử Giải thưởng
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?loai=du-an#contact-form"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Gửi Đề xuất Mô hình / Dự án
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?loai=dien-gia#contact-form"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Đăng ký Diễn giả & Gửi Tham luận
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?loai=hop-tac#contact-form"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Hợp tác Chiến lược & Tài trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Nhóm 4: Liên hệ & Pháp lý (PRD Section 04, 11, 13) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4838]">
              04. Liên Hệ & Pháp Lý
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#4A5E57]">
              <li>
                <Link href="/contact#contact-form" className="hover:text-[#0D4838] transition-colors">
                  Cổng Tiếp nhận Thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?loai=truyen-thong#contact-form"
                  className="hover:text-[#0D4838] transition-colors"
                >
                  Báo chí & Truyền thông
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0D4838] transition-colors">
                  Chính sách Bảo vệ Dữ liệu Cá nhân
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0D4838] transition-colors">
                  Quy định Bản quyền & Sử dụng Dữ liệu
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-[#0D4838] transition-colors text-[11px] text-[#C29B57] font-semibold flex items-center gap-1 pt-1"
                >
                  <span>Cổng Quản Trị CMS</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#DFD8C8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C6E67]">
          <div>
            © 2026 Diễn đàn Kinh tế Di sản (Heritage Economy Forum). Bản quyền thuộc về Ban Tổ chức.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#C29B57] font-serif italic">
              Di sản kiến tạo giá trị – Phát triển hướng tương lai
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
