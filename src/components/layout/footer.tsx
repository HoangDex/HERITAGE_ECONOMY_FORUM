import Link from "next/link";
import { BrandLogo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[#dfd7c8] bg-[#F5EFE5] text-[#292929]">
      <div className="container mx-auto px-4 sm:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-[#5c554b] max-w-sm leading-relaxed">
              {siteConfig.slogan}. Cổng thông tin học thuật, đối thoại liên ngành và kết nối các
              nguồn lực phát huy giá trị di sản trong nền kinh tế đương đại.
            </p>
            <div className="text-xs text-[#5c554b] space-y-1 pt-1">
              <p>📍 Thường trực: Trung tâm Bảo tồn Di sản Thăng Long, 19C Hoàng Diệu, Hà Nội</p>
              <p>✉️ Email: contact@heritageeconomy.vn</p>
            </div>
          </div>

          {/* Group 1: Giới thiệu */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#76232D]">
              Về Diễn Đàn
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#5c554b]">
              <li>
                <Link href="/gioi-thieu" className="hover:text-[#76232D] transition-colors">
                  Tôn chỉ & Sứ mệnh
                </Link>
              </li>
              <li>
                <Link
                  href="/gioi-thieu/hoi-dong"
                  className="hover:text-[#76232D] transition-colors"
                >
                  Hội đồng Diễn đàn
                </Link>
              </li>
              <li>
                <Link
                  href="/gioi-thieu/ban-dieu-hanh"
                  className="hover:text-[#76232D] transition-colors"
                >
                  Ban Điều hành
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu#doi-tac" className="hover:text-[#76232D] transition-colors">
                  Mạng lưới Đối tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 2: Khám phá */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#76232D]">
              Chương Trình & Giải Thưởng
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#5c554b]">
              <li>
                <Link href="/dien-dan" className="hover:text-[#76232D] transition-colors">
                  Kỳ Diễn đàn 2026
                </Link>
              </li>
              <li>
                <Link href="/dien-dan#cac-phien" className="hover:text-[#76232D] transition-colors">
                  04 Phiên Nghị sự
                </Link>
              </li>
              <li>
                <Link href="/dien-dan#timeline" className="hover:text-[#76232D] transition-colors">
                  Trục Thời gian & Diễn giả
                </Link>
              </li>
              <li>
                <Link href="/giai-thuong" className="hover:text-[#76232D] transition-colors">
                  Giải thưởng Bền vững
                </Link>
              </li>
              <li>
                <Link
                  href="/giai-thuong#quy-che"
                  className="hover:text-[#76232D] transition-colors"
                >
                  Quy chế Xét chọn
                </Link>
              </li>
            </ul>
          </div>

          {/* Group 3: Dự án & Liên hệ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#76232D]">
              Dự Án & Kết Nối
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#5c554b]">
              <li>
                <Link href="/du-an" className="hover:text-[#76232D] transition-colors">
                  Mô hình Kinh tế Di sản
                </Link>
              </li>
              <li>
                <Link href="/du-an/de-xuat" className="hover:text-[#76232D] transition-colors">
                  Gửi đề xuất Dự án
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-[#76232D] transition-colors">
                  Nghiên cứu & Báo cáo
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he?loai=tham-du"
                  className="hover:text-[#76232D] transition-colors"
                >
                  Đăng ký tham dự Đại biểu
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-[#76232D] transition-colors">
                  Liên hệ Ban Thư ký
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-[#dfd7c8] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5c554b] gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.vietnameseName} ({siteConfig.name}). Bảo lưu
            mọi quyền theo quy định của pháp luật.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/lien-he" className="hover:text-[#76232D] transition-colors">
              Chính sách Dữ liệu Cá nhân
            </Link>
            <Link href="/lien-he" className="hover:text-[#76232D] transition-colors">
              Quy chế Hoạt động
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              className="hover:text-[#76232D] transition-colors"
            >
              Mã nguồn Hệ thống
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
