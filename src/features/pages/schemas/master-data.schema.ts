/**
 * LAYER 2: ZOD VALIDATION SCHEMAS CHO MASTER DATA CATALOGS
 * Xác thực dữ liệu đầu vào cho các thao tác Thêm / Sửa / Xóa danh mục dùng chung.
 */

import { z } from "zod";

// ==========================================
// 1. DỰ ÁN DI SẢN (PROJECTS)
// ==========================================
export const createProjectSchema = z.object({
  name: z.string().min(2, "Tên dự án tối thiểu 2 ký tự").max(255),
  slug: z.string().optional(),
  location: z.string().min(2, "Địa phương tối thiểu 2 ký tự").max(150),
  category: z.string().min(2, "Phân loại dự án tối thiểu 2 ký tự").max(100),
  status: z.string().default("Đang vận hành"),
  description: z.string().optional(),
  annualRevenue: z.string().optional(),
  jobsCreated: z.coerce.number().min(0).default(0),
  conservationFundShare: z.string().optional(),
  ownerOrg: z.string().optional(),
  websiteUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  pageSlug: z.string().optional(),
  pageName: z.string().optional(),
  isFeatured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();

// ==========================================
// 2. ĐỐI TÁC & CƠ QUAN (ORGANIZATIONS)
// ==========================================
export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Tên cơ quan/đối tác tối thiểu 2 ký tự").max(255),
  shortName: z.string().optional(),
  category: z.enum([
    "STEERING",
    "HOSTING",
    "ORGANIZING",
    "COMPANION",
    "STRATEGIC",
    "MEDIA",
  ], {
    error: "Phân loại đối tác không hợp lệ",
  }),
  logoUrl: z.string().min(1, "Đường dẫn logo là bắt buộc"),
  websiteUrl: z.string().optional(),
  reusedPages: z
    .array(
      z.object({
        pageSlug: z.string(),
        pageName: z.string().optional(),
        roleLabel: z.string(),
      })
    )
    .optional(),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

// ==========================================
// 3. TIN TỨC & BÀI VIẾT (NEWS)
// ==========================================
export const createNewsSchema = z.object({
  title: z.string().min(3, "Tiêu đề bài viết tối thiểu 3 ký tự").max(255),
  slug: z.string().optional(),
  excerpt: z.string().min(5, "Tóm tắt bài viết tối thiểu 5 ký tự"),
  categoryName: z.string().default("Thời sự Di sản"),
  authorName: z.string().optional(),
  authorTitle: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  pageSlug: z.string().optional(),
  pageName: z.string().optional(),
  publishedAt: z.string().optional(),
});

export const updateNewsSchema = createNewsSchema.partial();

// ==========================================
// 4. DIỄN GIẢ & CHUYÊN GIA (SPEAKERS)
// ==========================================
export const createSpeakerSchema = z.object({
  name: z.string().min(2, "Họ tên diễn giả tối thiểu 2 ký tự").max(150),
  slug: z.string().optional(),
  degree: z.string().optional(),
  title: z.string().min(2, "Chức vụ / Học hàm tối thiểu 2 ký tự").max(150),
  organization: z.string().min(2, "Đơn vị công tác tối thiểu 2 ký tự").max(255),
  avatarUrl: z.string().optional(),
  bio: z.string().optional(),
  reusedPages: z.array(z.string()).optional(),
});

export const updateSpeakerSchema = createSpeakerSchema.partial();

// ==========================================
// 5. GIẢI THƯỞNG & HẠNG MỤC (AWARDS)
// ==========================================
export const createAwardSchema = z.object({
  year: z.coerce.number().min(2020).max(2050),
  name: z.string().min(3, "Tên giải thưởng tối thiểu 3 ký tự").max(255),
  theme: z.string().min(3, "Chủ đề giải thưởng tối thiểu 3 ký tự").max(255),
  nominationDeadline: z.string().min(5, "Thời hạn nộp hồ sơ là bắt buộc"),
  isOpen: z.boolean().default(true),
  categories: z
    .array(
      z.object({
        name: z.string().min(2, "Tên hạng mục tối thiểu 2 ký tự"),
        slug: z.string().optional(),
        description: z.string().default(""),
      })
    )
    .optional(),
  reusedPages: z.array(z.string()).optional(),
});

export const updateAwardSchema = createAwardSchema.partial();
