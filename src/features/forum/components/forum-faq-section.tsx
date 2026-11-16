/**
 * COMPONENT: FORUM FAQ SECTION (HỎI ĐÁP KỲ DIỄN ĐÀN - TINH GỌN)
 * Câu trả lời cô đọng, đi thẳng vào trọng tâm, giảm tải chữ tối đa
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FORUM_FAQS: FaqItem[] = [
  {
    id: "faq_1",
    category: "Đối tượng",
    question: "Ai có thể đăng ký tham dự Diễn đàn 2026?",
    answer:
      "Diễn đàn mở rộng cho các nhà quản lý, chính quyền địa phương sở hữu di sản, tổ chức quốc tế (UNESCO), doanh nghiệp du lịch - công nghệ và các chuyên gia học thuật trên toàn quốc.",
  },
  {
    id: "faq_2",
    category: "Hình thức",
    question: "Diễn đàn diễn ra theo hình thức nào?",
    answer:
      "Tổ chức kết hợp (Hybrid): Trực tiếp tại Hoàng thành Thăng Long, Hà Nội; đồng thời phát sóng trực tuyến đa nền tảng cho đại biểu trong và ngoài nước.",
  },
  {
    id: "faq_3",
    category: "Đăng ký",
    question: "Thời hạn và cách thức đăng ký tham dự?",
    answer:
      "Đăng ký trực tuyến trên website trước ngày 05/11/2026. Ban Thư ký sẽ gửi thư mời chính thức kèm mã QR định danh qua email sau khi xét duyệt hồ sơ.",
  },
  {
    id: "faq_4",
    category: "Kỷ yếu",
    question: "Đại biểu có được tiếp cận Kỷ yếu nghiên cứu không?",
    answer:
      "Có. Toàn bộ Kỷ yếu xuất bản (chỉ số ISBN), Báo cáo chuyên đề và Tham luận diễn giả được mở quyền tải về miễn phí tại mục Kỷ yếu & Tài liệu ngay sau bế mạc.",
  },
  {
    id: "faq_5",
    category: "Tham luận",
    question: "Quy trình gửi bài tham luận học thuật?",
    answer:
      "Gửi tóm tắt (Abstract) và toàn văn bài viết trước ngày 30/09/2026 tới Hội đồng Khoa học HEF để được phản biện kín độc lập (Peer-review) và in trong Kỷ yếu.",
  },
  {
    id: "faq_6",
    category: "Đồng hành",
    question: "Doanh nghiệp tham gia tài trợ và đồng hành bằng cách nào?",
    answer:
      "Ban Tổ chức tiếp nhận các gói đồng hành linh hoạt: Đối tác Chiến lược, Đối tác Đồng hành, Nhà tài trợ và Bảo trợ Truyền thông. Liên hệ trực tiếp qua partnership@hef.vn.",
  },
];

export function ForumFaqSection() {
  const [openIds, setOpenIds] = useState<string[]>(["faq_1"]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-[#dfd7c8] scroll-mt-28"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-4xl space-y-6">
        {/* Tiêu đề ngắn gọn */}
        <FadeIn direction="up" className="space-y-1.5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>Hỏi Đáp Nhanh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#132A24] tracking-tight">
            Giải Đáp Thắc Mắc Thường Gặp
          </h2>
        </FadeIn>

        {/* Danh sách Accordion tinh gọn */}
        <StaggerContainer className="space-y-2.5">
          {FORUM_FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <StaggerItem key={faq.id}>
                <div
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#C29B57] shadow-xs"
                      : "bg-[#F7F5EE]/60 hover:bg-white border-[#dfd7c8]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29B57] bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#dfd7c8] shrink-0">
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-serif font-bold text-[#132A24] truncate">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0D4838]" : "text-[#5c554b]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-4.5 sm:pb-4 text-xs text-[#4A5E57] leading-relaxed border-t border-[#dfd7c8]/50 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Nút liên hệ tinh gọn 1 dòng */}
        <div className="pt-2 text-center text-xs text-[#5c554b]">
          <span>Bạn có thắc mắc khác? </span>
          <Link
            href="/contact?loai=khac#contact-form"
            className="text-[#0D4838] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Gửi câu hỏi tới Ban Thư ký</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
