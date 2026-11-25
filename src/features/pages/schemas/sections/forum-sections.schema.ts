/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG KỲ DIỄN ĐÀN (FORUM PAGE SECTIONS)
 * Phân rã độc lập theo Mục 7: Diễn đàn - Đề án HEF
 */

import { z } from "zod";

// ==========================================
// SCHEMAS CON DÙNG CHO FORUM
// ==========================================

export const forumSpeakerItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Họ tên diễn giả không được để trống"),
  degree: z.string().optional(),
  title: z.string().default(""),
  organization: z.string().default(""),
  avatarUrl: z.string().default(""),
  bio: z.string().default(""),
  sessionTitle: z.string().default(""),
  topicSummary: z.string().default(""),
  slug: z.string().default(""),
});
export type ForumSpeakerItemDTO = z.infer<typeof forumSpeakerItemSchema>;

export const forumSessionItemSchema = z.object({
  id: z.string(),
  order: z.number().int().default(1),
  title: z.string().min(1, "Tiêu đề phiên nghị sự không được để trống"),
  subTitle: z.string().default(""),
  description: z.string().default(""),
  timeRange: z.string().default(""),
  date: z.string().default(""),
  room: z.string().default(""),
  chairperson: z.string().optional(),
  speakers: z.array(forumSpeakerItemSchema).default([]),
});
export type ForumSessionItemDTO = z.infer<typeof forumSessionItemSchema>;

export const forumTimelineItemSchema = z.object({
  id: z.string(),
  period: z.enum(["morning", "afternoon"]).default("morning"),
  time: z.string().default(""),
  title: z.string().min(1, "Tiêu đề lịch trình không được để trống"),
  speakerOrChair: z.string().default(""),
  room: z.string().default(""),
  sessionOrder: z.number().int().default(1),
});
export type ForumTimelineItemDTO = z.infer<typeof forumTimelineItemSchema>;

export const forumResourceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Tên tài liệu không được để trống"),
  type: z.enum(["pdf", "doc", "video", "report"]).default("pdf"),
  fileSize: z.string().default(""),
  downloadUrl: z.string().default("#"),
  isRestricted: z.boolean().default(false),
  category: z.enum(["ky-yeu", "chuong-trinh", "tham-luan", "bao-cao"]).default("tham-luan"),
});
export type ForumResourceItemDTO = z.infer<typeof forumResourceItemSchema>;

export const forumFaqItemSchema = z.object({
  question: z.string().min(1, "Câu hỏi không được để trống"),
  answer: z.string().min(1, "Câu trả lời không được để trống"),
});
export type ForumFaqItemDTO = z.infer<typeof forumFaqItemSchema>;

// ==========================================
// 1. SECTION: FORUM HERO BANNER
// ==========================================

export const forumHeroPropsSchema = z.object({
  editionYear: z.number().int().default(2026),
  title: z.string().default("Diễn Đàn Kinh Tế Di Sản Lần Thứ I – Năm 2026"),
  theme: z.string().default("Kinh Tế Di Sản Trong Kỷ Nguyên Số: Thể Chế, Nguồn Lực & Mô Hình Đột Phá"),
  datesText: z.string().default("15 – 17 tháng 11 năm 2026"),
  startDateIso: z.string().default("2026-11-15T08:00:00+07:00"),
  endDateIso: z.string().default("2026-11-17T17:30:00+07:00"),
  isDateConfirmed: z.boolean().default(true),
  venueName: z.string().default("Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long"),
  venueAddress: z.string().default("Ba Đình, Hà Nội"),
  scaleDescription: z.string().default("Quy tụ hơn 500 đại biểu lãnh đạo ban ngành, tổ chức quốc tế và chuyên gia"),
  organizer: z.string().default("Hội Đồng Diễn Đàn Kinh Tế Di Sản & Các Bộ Ban Ngành"),
  status: z.enum(["upcoming", "ongoing", "concluded"]).default("upcoming"),
  registrationUrl: z.string().default("/contact?type=tham-du"),
});
export type ForumHeroPropsDTO = z.infer<typeof forumHeroPropsSchema>;

export const forumHeroSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_HERO"),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: forumHeroPropsSchema,
});
export type ForumHeroSectionDTO = z.infer<typeof forumHeroSectionSchema>;

// ==========================================
// 2. SECTION: FORUM SESSIONS (4 PHIÊN NGHỊ SỰ)
// ==========================================

export const forumSessionsPropsSchema = z.object({
  title: z.string().default("Khung Chương Trình & Các Phiên Chuyên Đề"),
  subtitle: z.string().default("04 Phiên Chuyên Sâu"),
  description: z.string().default("Các phiên nghị sự chuyên sâu kết nối nhà hoạch định chính sách, học giả, doanh nghiệp và cộng đồng."),
  sessions: z.array(forumSessionItemSchema).default([]),
});
export type ForumSessionsPropsDTO = z.infer<typeof forumSessionsPropsSchema>;

export const forumSessionsSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_SESSIONS"),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: forumSessionsPropsSchema,
});
export type ForumSessionsSectionDTO = z.infer<typeof forumSessionsSectionSchema>;

// ==========================================
// 3. SECTION: FORUM TIMELINE
// ==========================================

export const forumTimelinePropsSchema = z.object({
  title: z.string().default("Lịch Trình Chi Tiết Các Phiên Làm Việc"),
  subtitle: z.string().default("Lịch Trình Nghị Sự"),
  description: z.string().default("Thời gian biểu chi tiết từng phiên tham luận, tọa đàm bàn tròn và phiên thảo luận kín."),
  timeline: z.array(forumTimelineItemSchema).default([]),
});
export type ForumTimelinePropsDTO = z.infer<typeof forumTimelinePropsSchema>;

export const forumTimelineSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_TIMELINE"),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: forumTimelinePropsSchema,
});
export type ForumTimelineSectionDTO = z.infer<typeof forumTimelineSectionSchema>;

// ==========================================
// 4. SECTION: FORUM SPEAKERS
// ==========================================

export const forumSpeakersPropsSchema = z.object({
  title: z.string().default("Diễn Giả & Chuyên Gia Thảo Luận"),
  subtitle: z.string().default("Đội Ngũ Diễn Giả"),
  description: z.string().default("Quy tụ các chuyên gia hàng đầu từ UNESCO, ICOMOS, các viện nghiên cứu và doanh nghiệp di sản."),
  speakers: z.array(forumSpeakerItemSchema).default([]),
});
export type ForumSpeakersPropsDTO = z.infer<typeof forumSpeakersPropsSchema>;

export const forumSpeakersSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_SPEAKERS"),
  order: z.number().int().default(4),
  isVisible: z.boolean().default(true),
  props: forumSpeakersPropsSchema,
});
export type ForumSpeakersSectionDTO = z.infer<typeof forumSpeakersSectionSchema>;

// ==========================================
// 5. SECTION: FORUM OUTCOMES
// ==========================================

export const forumOutcomesPropsSchema = z.object({
  title: z.string().default("Tuyên Bố Chung & Kết Quả Diễn Đàn"),
  subtitle: z.string().default("Đầu Ra Chiến Lược"),
  description: z.string().default("Báo cáo khuyến nghị chính sách, thông điệp hành động và các biên bản ghi nhớ hợp tác chiến lược."),
  outcomesSummary: z.string().default(""),
  keyPoints: z.array(z.string()).default([]),
});
export type ForumOutcomesPropsDTO = z.infer<typeof forumOutcomesPropsSchema>;

export const forumOutcomesSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_OUTCOMES"),
  order: z.number().int().default(5),
  isVisible: z.boolean().default(true),
  props: forumOutcomesPropsSchema,
});
export type ForumOutcomesSectionDTO = z.infer<typeof forumOutcomesSectionSchema>;

// ==========================================
// 6. SECTION: FORUM RESOURCES & GALLERY
// ==========================================

export const forumResourcesPropsSchema = z.object({
  title: z.string().default("Thư Viện Tài Liệu & Kỷ Yếu Diễn Đàn"),
  subtitle: z.string().default("Tài Nguyên Học Thuật"),
  description: z.string().default("Toàn văn tham luận, bài trình chiếu, báo cáo chuyên đề và tư liệu hình ảnh chất lượng cao."),
  resources: z.array(forumResourceItemSchema).default([]),
});
export type ForumResourcesPropsDTO = z.infer<typeof forumResourcesPropsSchema>;

export const forumResourcesSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_RESOURCES"),
  order: z.number().int().default(6),
  isVisible: z.boolean().default(true),
  props: forumResourcesPropsSchema,
});
export type ForumResourcesSectionDTO = z.infer<typeof forumResourcesSectionSchema>;

// ==========================================
// 7. SECTION: FORUM FAQ
// ==========================================

export const forumFaqPropsSchema = z.object({
  title: z.string().default("Câu Hỏi Thường Gặp Về Diễn Đàn"),
  subtitle: z.string().default("Hỏi Đáp"),
  description: z.string().default("Giải đáp chi tiết về đăng ký tham dự, quyền lợi đại biểu, tài liệu và quy định hội trường."),
  faqs: z.array(forumFaqItemSchema).default([]),
});
export type ForumFaqPropsDTO = z.infer<typeof forumFaqPropsSchema>;

export const forumFaqSectionSchema = z.object({
  id: z.string(),
  type: z.literal("FORUM_FAQ"),
  order: z.number().int().default(7),
  isVisible: z.boolean().default(true),
  props: forumFaqPropsSchema,
});
export type ForumFaqSectionDTO = z.infer<typeof forumFaqSectionSchema>;

// ==========================================
// COMPOUND DISCRIMINATED UNION
// ==========================================

export const anyForumSectionSchema = z.discriminatedUnion("type", [
  forumHeroSectionSchema,
  forumSessionsSectionSchema,
  forumTimelineSectionSchema,
  forumSpeakersSectionSchema,
  forumOutcomesSectionSchema,
  forumResourcesSectionSchema,
  forumFaqSectionSchema,
]);
export type AnyForumSectionDTO = z.infer<typeof anyForumSectionSchema>;
