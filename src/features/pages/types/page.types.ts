/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE CMS PAGES & DYNAMIC SECTIONS
 * Định nghĩa kiến trúc JSON Database cho toàn bộ các trang và section động của website
 */

export type SectionType =
  | "HERO" // Hero banner chính với thông điệp & CTA
  | "PILLARS_5" // 5 trụ cột: Nghiên cứu, Đối thoại, Kết nối, Ghi nhận, Phát triển
  | "EVENT_HIGHLIGHT" // Kỳ diễn đàn nổi bật (ngày, địa điểm, chủ đề, phiên)
  | "AWARDS_SHOWCASE" // Banner Giải thưởng Phát triển Bền vững Chủ động
  | "PROJECT_GRID" // Danh mục 3-6 dự án kinh tế di sản tiêu biểu
  | "NEWS_FEED" // Tin tức & góc chuyên gia (1 bài nổi bật + 3 bài mới)
  | "PARTNERS_SLIDER" // Logo đối tác (Chỉ đạo, Chủ trì, Tổ chức, Đồng hành, Truyền thông)
  | "ABOUT_COUNCIL" // Hội đồng Diễn đàn (Chủ tịch, Phó Chủ tịch, Cố vấn)
  | "ABOUT_EXECUTIVE" // Ban Điều hành theo từng nhóm chức năng
  | "TIMELINE" // Trục thời gian phiên hội thảo
  | "SPEAKERS_GRID" // Lưới hồ sơ diễn giả
  | "CONTACT_FORM" // Form liên hệ & đăng ký tham dự / tài trợ
  | "CTA_BANNER" // Khối kêu gọi cuối trang: Cùng kiến tạo giá trị di sản
  | "CUSTOM_HTML"; // Khối tùy biến văn bản / nhúng đa phương tiện

/**
 * Định nghĩa cấu trúc chuẩn của một Section bên trong mảng JSON của Page
 */
export interface PageSection<TProps = Record<string, unknown>> {
  id: string;
  type: SectionType;
  title?: string;
  subtitle?: string;
  order: number;
  isVisible: boolean;
  props: TProps;
}

/**
 * Cấu hình SEO lưu trong cột seoProps (JSON)
 */
export interface PageSeoProps {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Domain Entity đại diện cho một Page động lưu trữ trong bảng `pages`
 */
export interface PageEntity {
  id: string;
  slug: string;
  name: string;
  title: string;
  description?: string;
  seoProps?: PageSeoProps;
  sections: PageSection[];
  isPublished: boolean;
  order: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * DTOs tạo mới và cập nhật Page
 */
export interface CreatePageDTO {
  slug: string;
  name: string;
  title: string;
  description?: string;
  seoProps?: PageSeoProps;
  sections?: PageSection[];
  isPublished?: boolean;
  order?: number;
}

export type UpdatePageDTO = Partial<CreatePageDTO>;

/**
 * DTOs thao tác với Section bên trong Page
 */
export interface AddSectionDTO {
  type: SectionType;
  title?: string;
  subtitle?: string;
  order?: number;
  isVisible?: boolean;
  props: Record<string, unknown>;
}

export interface UpdateSectionDTO {
  title?: string;
  subtitle?: string;
  order?: number;
  isVisible?: boolean;
  props?: Record<string, unknown>;
}

export interface ReorderSectionsDTO {
  sectionIds: string[]; // Mảng các ID theo thứ tự mới
}

/**
 * Interface Repository Contract (Data Access Layer)
 */
export interface IPageRepository {
  findAll(publishedOnly?: boolean): Promise<PageEntity[]>;
  findById(id: string): Promise<PageEntity | null>;
  findBySlug(slug: string): Promise<PageEntity | null>;
  create(data: CreatePageDTO): Promise<PageEntity>;
  update(id: string, data: UpdatePageDTO): Promise<PageEntity | null>;
  delete(id: string): Promise<boolean>;
  updateSections(pageId: string, sections: PageSection[]): Promise<PageEntity | null>;
}

/**
 * Interface Service Contract (Business Logic Layer)
 */
export interface IPageService {
  getAllPages(publishedOnly?: boolean): Promise<PageEntity[]>;
  getPageById(id: string): Promise<PageEntity | null>;
  getPageBySlug(slug: string): Promise<PageEntity | null>;
  createPage(dto: CreatePageDTO): Promise<PageEntity>;
  updatePage(id: string, dto: UpdatePageDTO): Promise<PageEntity | null>;
  deletePage(id: string): Promise<boolean>;
  addSection(pageId: string, sectionDto: AddSectionDTO): Promise<PageEntity | null>;
  updateSection(
    pageId: string,
    sectionId: string,
    sectionDto: UpdateSectionDTO
  ): Promise<PageEntity | null>;
  removeSection(pageId: string, sectionId: string): Promise<PageEntity | null>;
  reorderSections(pageId: string, newOrderIds: string[]): Promise<PageEntity | null>;
  toggleSection(pageId: string, sectionId: string, isVisible: boolean): Promise<PageEntity | null>;
}
