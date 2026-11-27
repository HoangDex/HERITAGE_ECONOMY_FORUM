import { z } from "zod";

export const ContactHeroSectionSchema = z
  .object({
    badge: z.string().min(1, "Nhãn badge là bắt buộc"),
    title: z.string().min(1, "Tiêu đề trang liên hệ là bắt buộc"),
    quote: z.string().min(1, "Câu khẩu hiệu là bắt buộc"),
    description: z.string().min(1, "Mô tả là bắt buộc"),
  })
  .strict();

export const ContactInfoSectionSchema = z
  .object({
    title: z.string().min(1, "Tên văn phòng thường trực là bắt buộc"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    hotline: z.string().min(1, "Hotline là bắt buộc"),
    email: z.string().min(1, "Email là bắt buộc"),
    workingHours: z.string().min(1, "Giờ làm việc là bắt buộc"),
  })
  .strict();

export const ContactFaqQuestionSchema = z
  .object({
    question: z.string().min(1, "Câu hỏi là bắt buộc"),
    answer: z.string().min(1, "Câu trả lời là bắt buộc"),
  })
  .strict();

export const ContactFaqSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề FAQ là bắt buộc"),
    questions: z.array(ContactFaqQuestionSchema),
  })
  .strict();

export const ContactTextFieldSchema = z
  .object({
    label: z.string().min(1, "Nhãn ô nhập liệu là bắt buộc"),
    placeholder: z.string().min(1, "Placeholder là bắt buộc"),
  })
  .strict();

export const ContactTypeFieldSchema = z
  .object({
    label: z.string().min(1, "Nhãn nhóm yêu cầu là bắt buộc"),
    options: z.array(z.string().min(1, "Tên lựa chọn không được rỗng")).min(1),
  })
  .strict();

export const ContactFormSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề biểu mẫu là bắt buộc"),
    description: z.string().min(1, "Mô tả biểu mẫu là bắt buộc"),
    consentText: z.string().min(1, "Nội dung đồng ý bảo mật là bắt buộc"),
    submitLabel: z.string().min(1, "Nhãn nút gửi là bắt buộc"),
    fields: z
      .object({
        type: ContactTypeFieldSchema,
        fullName: ContactTextFieldSchema,
        organization: ContactTextFieldSchema,
        position: ContactTextFieldSchema,
        phone: ContactTextFieldSchema,
        email: ContactTextFieldSchema,
        message: ContactTextFieldSchema,
      })
      .strict(),
  })
  .strict();

export const ContactPagePropsRequestSchema = z
  .object({
    hero: ContactHeroSectionSchema,
    info: ContactInfoSectionSchema,
    faq: ContactFaqSectionSchema,
    form: ContactFormSectionSchema,
  })
  .strict();

export const ContactPageResponseSchema = z
  .object({
    id: z.string(),
    slug: z.literal("contact"),
    name: z.string(),
    props: ContactPagePropsRequestSchema,
    isPublished: z.boolean(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .strict();

export const CONTACT_SECTION_SCHEMAS = {
  hero: ContactHeroSectionSchema,
  info: ContactInfoSectionSchema,
  faq: ContactFaqSectionSchema,
  form: ContactFormSectionSchema,
} as const;
