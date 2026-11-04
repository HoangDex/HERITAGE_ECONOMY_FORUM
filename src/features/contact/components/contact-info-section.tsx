import { MapPin, Phone, Mail, Clock, HelpCircle } from "lucide-react";
import type { ContactInfo, ContactFaq } from "../types/contact.types";

interface ContactInfoSectionProps {
  info: ContactInfo;
  faqs: ContactFaq[];
}

export function ContactInfoSection({ info, faqs }: ContactInfoSectionProps) {
  return (
    <div className="space-y-8">
      {/* Thông tin thường trực */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#dfd7c8] shadow-xs space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#76232D] block">
            Thông tin liên hệ
          </span>
          <h3 className="text-xl font-bold text-[#292929] leading-snug">{info.secretariatTitle}</h3>
        </div>

        <div className="space-y-3.5 text-xs sm:text-sm text-[#292929]">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#5c554b] block">Trụ sở tiếp nhận:</span>
              <span className="font-medium">{info.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#5c554b] block">Đường dây nóng (Hotline):</span>
              <span className="font-semibold text-[#76232D]">{info.hotline}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#5c554b] block">Hòm thư điện tử công vụ:</span>
              <span className="font-medium text-[#292929]">{info.email}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-[#5c554b] block">Thời gian làm việc:</span>
              <span className="font-medium text-[#5c554b]">{info.workingHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Câu hỏi thường gặp FAQ */}
      <div className="p-6 sm:p-8 bg-[#F5EFE5] rounded-3xl border border-[#dfd7c8] space-y-4">
        <div className="flex items-center gap-2 text-[#76232D] font-bold text-sm uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Giải Đáp Thường Gặp (FAQ)</span>
        </div>

        <div className="space-y-3 divide-y divide-[#dfd7c8]/60">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pt-3 first:pt-0 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#292929] leading-snug">
                {faq.question}
              </h4>
              <p className="text-xs text-[#5c554b] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
