/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE LIÊN HỆ
 * Đọc cấu hình từ `page.props` (hero, info, faq, form).
 */

import type {
  ContactPageData,
  ContactFormConfig,
  IContactRepository,
} from "../types/contact.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";

const DEFAULT_FORM_CONFIG: ContactFormConfig = {
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
    fullName: {
      label: "Họ và tên *",
      placeholder: "Nguyễn Văn A",
    },
    organization: {
      label: "Đơn vị / Cơ quan *",
      placeholder: "Tên viện, trường, doanh nghiệp...",
    },
    position: {
      label: "Chức danh / Học vị",
      placeholder: "Chuyên viên, Giám đốc, PGS.TS...",
    },
    phone: {
      label: "Số điện thoại liên hệ *",
      placeholder: "09xx xxx xxx",
    },
    email: {
      label: "Email công vụ / cá nhân *",
      placeholder: "email@example.com",
    },
    message: {
      label: "Nội dung yêu cầu / Ghi chú trao đổi *",
      placeholder:
        "Mô tả tóm tắt nội dung Quý vị muốn trao đổi cùng Ban Thư ký Diễn đàn...",
    },
  },
};

const MOCK_CONTACT_DATA: ContactPageData = {
  badge: "Cổng Tiếp Nhận Thông Tin",
  title: "Kết nối cùng Diễn đàn",
  slogan: "Chia sẻ tri thức, nguồn lực và sáng kiến phát triển kinh tế di sản",
  description:
    "Diễn đàn Kinh tế Di sản chào đón các tổ chức nghiên cứu, chuyên gia, doanh nghiệp, cộng đồng và đối tác cùng đồng hành để chuyển hóa nguồn lực di sản thành giá trị kinh tế, văn hóa và xã hội bền vững.",
  info: {
    title: "Văn phòng Thường trực Ban Thư ký Diễn đàn Kinh tế Di sản",
    address: "Trung tâm Bảo tồn Di sản Thăng Long, 19C Hoàng Diệu, Ba Đình, Hà Nội",
    hotline: "+84 (024) 3823 4567",
    email: "contact@heritageeconomy.vn",
    workingHours: "Thứ Hai – Thứ Sáu: 08:30 – 17:30 (GMT+7)",
  },
  faqTitle: "Giải Đáp Thường Gặp (FAQ)",
  faqs: [
    {
      question: "Đối tượng nào có thể đăng ký tham dự Diễn đàn Kinh tế Di sản 2026?",
      answer:
        "Diễn đàn mở cửa cho các nhà quản lý, nhà nghiên cứu, lãnh đạo doanh nghiệp, đại diện làng nghề, nghệ nhân và cơ quan thông tấn báo chí. Ban Tổ chức sẽ gửi thư mời và thẻ đại biểu điện tử qua email sau khi xét duyệt đăng ký.",
    },
    {
      question: "Quy trình đề xuất hợp tác hoặc tài trợ diễn đàn như thế nào?",
      answer:
        "Quý đơn vị vui lòng chọn nhóm yêu cầu 'Hợp tác chiến lược' hoặc 'Tài trợ'. Ban Thư ký Đối ngoại sẽ liên hệ và gửi hồ sơ tài trợ, quyền lợi truyền thông trong vòng 24 giờ làm việc.",
    },
    {
      question: "Hồ sơ gửi tham luận chuyên đề cần tuân thủ định dạng nào?",
      answer:
        "Tóm tắt tham luận tối đa 500 từ kèm lý lịch khoa học của diễn giả. Toàn văn bài viết đạt chuẩn học thuật sẽ được thẩm định để in trong Kỷ yếu Diễn đàn có chỉ số ISBN.",
    },
  ],
  form: DEFAULT_FORM_CONFIG,
};

export class ContactRepository implements IContactRepository {
  async getContactPageData(): Promise<ContactPageData> {
    try {
      const page = await pageRepository.findBySlug("contact");
      if (page && page.props) {
        const heroSec = page.props.hero || page.props.banner || {};
        const infoSec = page.props.info || {};
        const faqSec = page.props.faq || {};
        const formSec = page.props.form || {};

        const infoStats = Array.isArray(infoSec.stats) ? infoSec.stats : [];
        const rawQuestions = Array.isArray(faqSec.questions)
          ? faqSec.questions
          : Array.isArray(faqSec.cards)
            ? faqSec.cards.map((c) => ({
                question: c.title || "",
                answer: c.description || "",
              }))
            : Array.isArray(infoSec.cards)
              ? infoSec.cards.map((c) => ({
                  question: c.title || "",
                  answer: c.description || "",
                }))
              : [];

        const faqs =
          rawQuestions.length > 0
            ? rawQuestions
                .map((q) => ({
                  question: q.question || "",
                  answer: q.answer || "",
                }))
                .filter((q) => q.question.trim().length > 0)
            : MOCK_CONTACT_DATA.faqs;

        const rawFields = (formSec.fields || {}) as Record<string, unknown>;
        const rawTypeField = (rawFields.type || {}) as Record<string, unknown>;
        const rawOptions = Array.isArray(rawTypeField.options) ? rawTypeField.options : [];
        const parsedOptions: string[] = rawOptions
          .map((item) => {
            if (typeof item === "string") return item.trim();
            if (item && typeof item === "object" && "label" in item) {
              return String((item as { label: unknown }).label || "").trim();
            }
            return "";
          })
          .filter(Boolean);

        const getFieldConfig = (
          key: Exclude<keyof ContactFormConfig["fields"], "type">
        ): { label: string; placeholder?: string } => {
          const raw = (rawFields[key] || {}) as Record<string, unknown>;
          return {
            label:
              typeof raw.label === "string" && raw.label.trim()
                ? raw.label
                : DEFAULT_FORM_CONFIG.fields[key].label,
            placeholder:
              typeof raw.placeholder === "string" && raw.placeholder.trim()
                ? raw.placeholder
                : DEFAULT_FORM_CONFIG.fields[key].placeholder,
          };
        };

        const form: ContactFormConfig = {
          title:
            typeof formSec.title === "string" && formSec.title.trim()
              ? formSec.title
              : DEFAULT_FORM_CONFIG.title,
          description:
            typeof formSec.description === "string" && formSec.description.trim()
              ? formSec.description
              : DEFAULT_FORM_CONFIG.description,
          consentText:
            typeof formSec.consentText === "string" && formSec.consentText.trim()
              ? formSec.consentText
              : typeof formSec.note === "string" && formSec.note.trim()
                ? formSec.note
                : DEFAULT_FORM_CONFIG.consentText,
          submitLabel:
            typeof formSec.submitLabel === "string" && formSec.submitLabel.trim()
              ? formSec.submitLabel
              : typeof formSec.actionLabel === "string" && formSec.actionLabel.trim()
                ? formSec.actionLabel
                : DEFAULT_FORM_CONFIG.submitLabel,
          fields: {
            type: {
              label:
                typeof rawTypeField.label === "string" && rawTypeField.label.trim()
                  ? rawTypeField.label
                  : DEFAULT_FORM_CONFIG.fields.type.label,
              options:
                parsedOptions.length > 0
                  ? parsedOptions
                  : DEFAULT_FORM_CONFIG.fields.type.options,
            },
            fullName: getFieldConfig("fullName"),
            organization: getFieldConfig("organization"),
            position: getFieldConfig("position"),
            phone: getFieldConfig("phone"),
            email: getFieldConfig("email"),
            message: getFieldConfig("message"),
          },
        };

        return {
          badge: heroSec.badge || MOCK_CONTACT_DATA.badge,
          title: heroSec.title || MOCK_CONTACT_DATA.title,
          slogan: heroSec.quote || heroSec.subtitle || MOCK_CONTACT_DATA.slogan,
          description: heroSec.description || MOCK_CONTACT_DATA.description,
          info: {
            title: infoSec.title || MOCK_CONTACT_DATA.info.title,
            address: infoSec.address || infoStats[0]?.value || MOCK_CONTACT_DATA.info.address,
            hotline: infoSec.hotline || infoStats[1]?.value || MOCK_CONTACT_DATA.info.hotline,
            email: infoSec.email || infoStats[2]?.value || MOCK_CONTACT_DATA.info.email,
            workingHours:
              infoSec.workingHours || infoStats[3]?.value || MOCK_CONTACT_DATA.info.workingHours,
          },
          faqTitle: faqSec.title || MOCK_CONTACT_DATA.faqTitle,
          faqs,
          form,
        };
      }
    } catch {
      // Fallback
    }
    return MOCK_CONTACT_DATA;
  }
}

export const contactRepository = new ContactRepository();
