/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE CMS PAGES & DYNAMIC SECTIONS
 * Định nghĩa kiến trúc JSON Database cho toàn bộ các trang và section động của website
 */

export type SectionType =
  // Home Sections
  | "HOME_HERO"
  | "HOME_INTRO_PILLARS"
  | "HOME_EVENT_HIGHLIGHT"
  | "HOME_AWARDS_SHOWCASE"
  | "HOME_FEATURED_PROJECTS"
  | "HOME_NEWS_FEED"
  | "HOME_PARTNERS_SLIDER"
  | "HOME_CONVERSION_CTA"
  // About Sections
  | "ABOUT_BANNER"
  | "ABOUT_VISION_MISSION"
  | "ABOUT_COUNCIL"
  | "ABOUT_EXECUTIVE"
  | "ABOUT_PARTNERS"
  // Generic / Legacy Sections
  | "HERO"
  | "PILLARS_5"
  | "EVENT_HIGHLIGHT"
  | "AWARDS_SHOWCASE"
  | "PROJECT_GRID"
  | "NEWS_FEED"
  | "PARTNERS_SLIDER"
  | "ABOUT_COUNCIL"
  | "ABOUT_EXECUTIVE"
  | "TIMELINE"
  | "SPEAKERS_GRID"
  | "CONTACT_FORM"
  | "CTA_BANNER"
  | "CUSTOM_HTML";

/**
 * Định nghĩa cấu trúc chuẩn của một Section bên trong mảng JSON của Page
 */
export interface PageSection<TProps = Record<string, unknown>> {
  id: string;
  type: SectionType | string;
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
  type: SectionType | string;
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
  sectionIds: string[];
}

/**
 * Interface cho Data Access Layer (Repository)
 */
export interface IPageRepository {
  findAll(publishedOnly?: boolean): Promise<PageEntity[]>;
  findById(id: string): Promise<PageEntity | null>;
  findBySlug(slug: string): Promise<PageEntity | null>;
  create(page: CreatePageDTO): Promise<PageEntity>;
  update(id: string, page: UpdatePageDTO): Promise<PageEntity | null>;
  delete(id: string): Promise<boolean>;
  updateSections(pageId: string, sections: PageSection[]): Promise<PageEntity | null>;
  updateSectionsBySlug(slug: string, sections: PageSection[]): Promise<PageEntity | null>;
}

/**
 * Interface cho Business Logic Layer (Service)
 */
export interface IPageService {
  getAllPages(publishedOnly?: boolean): Promise<PageEntity[]>;
  getPageById(id: string): Promise<PageEntity | null>;
  getPageBySlug(slug: string): Promise<PageEntity | null>;
  createPage(dto: CreatePageDTO): Promise<PageEntity>;
  updatePage(id: string, dto: UpdatePageDTO): Promise<PageEntity | null>;
  deletePage(id: string): Promise<boolean>;
  addSection(pageId: string, section: AddSectionDTO): Promise<PageEntity | null>;
  updateSection(
    pageId: string,
    sectionId: string,
    section: UpdateSectionDTO
  ): Promise<PageEntity | null>;
  updateSections(pageId: string, sections: PageSection[]): Promise<PageEntity | null>;
  updateSectionsBySlug(slug: string, sections: PageSection[]): Promise<PageEntity | null>;
  removeSection(pageId: string, sectionId: string): Promise<PageEntity | null>;
  reorderSections(pageId: string, sectionIds: string[]): Promise<PageEntity | null>;
  toggleSection(pageId: string, sectionId: string, isVisible: boolean): Promise<PageEntity | null>;
}
