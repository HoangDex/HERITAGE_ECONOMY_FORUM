"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactFormConfig } from "../types/contact.types";

const DEFAULT_CONTACT_FORM_CONFIG: ContactFormConfig = {
  title: "Biểu Mẫu Tiếp Nhận Chính Thức",
  description:
    "Vui lòng chọn đúng nhóm nhu cầu để Ban Thư ký phân công chuyên viên phụ trách phù hợp.",
  consentText:
    "Tôi xác nhận đồng ý để Diễn đàn lưu trữ và xử lý thông tin liên hệ cho mục đích điều phối công vụ theo Quy định bảo vệ dữ liệu cá nhân.",
  submitLabel: "Gửi yêu cầu chính thức",
  fields: {
    type: {
      label: "Nhóm Yêu Cầu *",
      options: [
        "Đăng ký tham dự Đại biểu",
        "Hợp tác Chiến lược & Phát triển",
        "Tài trợ & Đồng hành Diễn đàn",
        "Đề xuất Dự án / Mô hình Di sản",
        "Giải thưởng Phát triển Bền vững",
        "Yêu cầu / Ý kiến khác",
      ],
    },
    fullName: { label: "Họ và tên *", placeholder: "Nguyễn Văn A" },
    organization: {
      label: "Đơn vị / Cơ quan *",
      placeholder: "Tên viện, trường, doanh nghiệp...",
    },
    position: {
      label: "Chức danh / Học vị",
      placeholder: "Chuyên viên, Giám đốc, PGS.TS...",
    },
    phone: { label: "Số điện thoại liên hệ *", placeholder: "09xx xxx xxx" },
    email: { label: "Email công vụ / cá nhân *", placeholder: "email@example.com" },
    message: {
      label: "Nội dung yêu cầu / Ghi chú trao đổi *",
      placeholder:
        "Mô tả tóm tắt nội dung Quý vị muốn trao đổi cùng Ban Thư ký Diễn đàn...",
    },
  },
};

interface ContactFormProps {
  formConfig?: ContactFormConfig;
}

export function ContactForm({ formConfig = DEFAULT_CONTACT_FORM_CONFIG }: ContactFormProps) {
  const searchParams = useSearchParams();
  const queryLoai = searchParams.get("loai");
  const options = formConfig.fields.type.options || [];

  const [requestType, setRequestType] = useState<string>(options[0] || "Đăng ký tham dự Đại biểu");

  useEffect(() => {
    if (queryLoai) {
      const matched = options.find((opt) =>
        opt.toLowerCase().includes(queryLoai.replace(/-/g, " ").toLowerCase())
      );
      if (matched) setRequestType(matched);
    }
  }, [queryLoai, options]);

  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [position, setPosition] = useState("");
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
    }, 500);
  };

  if (result?.success) {
    return (
      <div className="p-8 sm:p-12 bg-white rounded-3xl border border-[#dfd7c8] shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#0D4838]/10 text-[#0D4838] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#292929]">Gửi Yêu Cầu Thành Công!</h3>
        <div className="inline-block p-3 bg-[#F5EFE5] rounded-xl border border-[#dfd7c8] text-sm font-mono text-[#0D4838]">
          Mã số tiếp nhận: <strong>{result.trackingCode}</strong>
        </div>
        <p className="text-sm text-[#5c554b] max-w-md mx-auto leading-relaxed">
          {result.message} Ban Thư ký sẽ phản hồi chi tiết tới địa chỉ email{" "}
          <strong>{email}</strong> hoặc hotline của Quý đơn vị.
        </p>
        <div className="pt-3">
          <Button
            variant="outline"
            className="border-[#0D4838] text-[#0D4838] hover:bg-[#0D4838]/10 font-medium"
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

  const { fields } = formConfig;

  return (
    <div id="form" className="scroll-mt-28">
      <form
        id="contact-form"
        onSubmit={handleSubmit}
        className="scroll-mt-28 p-6 sm:p-8 bg-white rounded-3xl border border-[#dfd7c8] shadow-xs space-y-5"
      >
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#292929]">{formConfig.title}</h3>
          <p className="text-xs text-[#5c554b]">{formConfig.description}</p>
        </div>

        {/* Nhóm yêu cầu */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">{fields.type.label}</label>
          <select
            className="w-full text-xs h-10 px-3 rounded-lg border border-[#dfd7c8] bg-white text-[#292929] focus:outline-[#0D4838]"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#292929]">
              {fields.fullName.label}
            </label>
            <Input
              required
              placeholder={fields.fullName.placeholder}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-[#dfd7c8] text-xs h-9.5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#292929]">
              {fields.organization.label}
            </label>
            <Input
              required
              placeholder={fields.organization.placeholder}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="border-[#dfd7c8] text-xs h-9.5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#292929]">
              {fields.position.label}
            </label>
            <Input
              placeholder={fields.position.placeholder}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border-[#dfd7c8] text-xs h-9.5"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#292929]">{fields.phone.label}</label>
            <Input
              required
              placeholder={fields.phone.placeholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-[#dfd7c8] text-xs h-9.5"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">{fields.email.label}</label>
          <Input
            type="email"
            required
            placeholder={fields.email.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#dfd7c8] text-xs h-9.5"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#292929]">{fields.message.label}</label>
          <textarea
            required
            rows={4}
            placeholder={fields.message.placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-xs p-3 rounded-lg border border-[#dfd7c8] bg-white text-[#292929] focus:outline-[#0D4838]"
          />
        </div>

        <div className="flex items-start gap-2 pt-1 text-xs text-[#5c554b]">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded text-[#0D4838] focus:ring-[#0D4838]"
          />
          <label htmlFor="consent" className="cursor-pointer leading-relaxed">
            {formConfig.consentText}
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-[#0D4838] hover:bg-[#0D4838]/90 text-white gap-2 font-medium shadow-sm cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Đang xử lý tiếp nhận..." : formConfig.submitLabel}
        </Button>
      </form>
    </div>
  );
}
