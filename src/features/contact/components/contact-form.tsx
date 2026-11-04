"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactRequestType } from "../types/contact.types";

const REQUEST_TYPE_OPTIONS: { id: ContactRequestType; label: string }[] = [
  { id: "tham-du", label: "Đăng ký tham dự Đại biểu" },
  { id: "dien-gia", label: "Đăng ký Diễn giả / Gửi bài tham luận" },
  { id: "hop-tac", label: "Hợp tác Chiến lược & Phát triển" },
  { id: "tai-tro", label: "Tài trợ & Đồng hành Diễn đàn" },
  { id: "du-an", label: "Đề xuất Dự án / Mô hình Di sản" },
  { id: "giai-thuong", label: "Giải thưởng Phát triển Bền vững" },
  { id: "truyen-thong", label: "Báo chí & Truyền thông" },
  { id: "khac", label: "Yêu cầu / Ý kiến khác" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const queryLoai = searchParams.get("loai") as ContactRequestType | null;

  const defaultRequestType: ContactRequestType =
    queryLoai && REQUEST_TYPE_OPTIONS.some((opt) => opt.id === queryLoai) ? queryLoai : "tham-du";

  const [requestType, setRequestType] = useState<ContactRequestType>(defaultRequestType);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    trackingCode?: string;
    message?: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("Quý vị vui lòng đồng ý với chính sách dữ liệu cá nhân.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `HEF-REQ-${Math.floor(10000 + Math.random() * 90000)}`;
      setResult({
        success: true,
        trackingCode: code,
        message: "Yêu cầu của Quý vị đã được ghi nhận vào hệ thống tiếp nhận chính thức.",
      });
      setIsSubmitting(false);
    }, 600);
  };

  if (result?.success) {
    return (
      <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#dfd7c8] shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#76232D]/10 text-[#76232D] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#292929]">Gửi Yêu Cầu Thành Công!</h3>
        <div className="inline-block p-3 bg-[#F5EFE5] rounded-xl border border-[#dfd7c8] text-sm font-mono text-[#76232D]">
          Mã số tiếp nhận: <strong>{result.trackingCode}</strong>
        </div>
        <p className="text-sm text-[#5c554b] max-w-md mx-auto leading-relaxed">
          {result.message} Ban Thư ký sẽ phản hồi chi tiết tới địa chỉ email{" "}
          <strong>{email}</strong> hoặc hotline của Quý đơn vị.
        </p>
        <div className="pt-3">
          <Button
            variant="outline"
            className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 font-medium"
            onClick={() => {
              setResult(null);
              setMessage("");
            }}
          >
            Gửi thêm yêu cầu khác
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 bg-white rounded-3xl border border-[#dfd7c8] shadow-xs space-y-5"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-[#292929]">Biểu Mẫu Tiếp Nhận Chính Thức</h3>
        <p className="text-xs text-[#5c554b]">
          Vui lòng chọn đúng nhóm nhu cầu để Ban Thư ký phân công chuyên viên phụ trách phù hợp.
        </p>
      </div>

      {/* Nhóm yêu cầu */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#292929]">Nhóm Yêu Cầu *</label>
        <select
          className="w-full text-xs h-10 px-3 rounded-lg border border-[#dfd7c8] bg-white text-[#292929] focus:outline-[#76232D]"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value as ContactRequestType)}
        >
          {REQUEST_TYPE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">Họ và tên *</label>
          <Input
            required
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border-[#dfd7c8] text-xs h-9.5"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">Đơn vị / Cơ quan *</label>
          <Input
            required
            placeholder="Tên viện, trường, doanh nghiệp..."
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            className="border-[#dfd7c8] text-xs h-9.5"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">Chức danh / Học vị</label>
          <Input
            placeholder="Chuyên viên, Giám đốc, PGS.TS..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-[#dfd7c8] text-xs h-9.5"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">Số điện thoại liên hệ *</label>
          <Input
            required
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-[#dfd7c8] text-xs h-9.5"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#292929]">Email công vụ / cá nhân *</label>
        <Input
          type="email"
          required
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-[#dfd7c8] text-xs h-9.5"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#292929]">
          Nội dung yêu cầu / Ghi chú trao đổi *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Mô tả tóm tắt nội dung Quý vị muốn trao đổi cùng Ban Thư ký Diễn đàn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-xs p-3 rounded-lg border border-[#dfd7c8] bg-white text-[#292929] focus:outline-[#76232D]"
        />
      </div>

      <div className="flex items-start gap-2 pt-1 text-xs text-[#5c554b]">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 rounded text-[#76232D] focus:ring-[#76232D]"
        />
        <label htmlFor="consent" className="cursor-pointer leading-relaxed">
          Tôi xác nhận đồng ý để Diễn đàn lưu trữ và xử lý thông tin liên hệ cho mục đích điều phối
          công vụ theo Quy định bảo vệ dữ liệu cá nhân.
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-[#76232D] hover:bg-[#76232D]/90 text-white gap-2 font-medium shadow-sm"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? "Đang xử lý tiếp nhận..." : "Gửi Thông Tin Yêu Cầu"}
      </Button>
    </form>
  );
}
