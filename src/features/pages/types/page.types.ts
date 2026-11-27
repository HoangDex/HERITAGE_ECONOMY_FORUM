/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE CMS PAGES & DYNAMIC SECTIONS
 * Cấu trúc Page lưu `props` dạng JSON phân chia thành các section có tên ngắn gọn,
 * sử dụng các trường biến chung (universal props) và mảng `ids` để tham chiếu tới các schema danh mục.
 */

export type SectionType =
  // Universal short section keys
  | "hero"
  | "pillars"
  | "event"
  | "showcase"
  | "news"
  | "partners"
  | "cta"
  | "banner"
  | "vision"
  | "council"
  | "executive"
  | "sessions"
  | "timeline"
  | "speakers"
  | "resources"
  | "faq"
  | "categories"
  | "criteria"
  | "process"
  | "directory"
  | "feed"
  | "featured_news"
  | "filter"
  | "info"
  | "form"
  // Backward-compatible legacy section type identifiers
  | "HOME_HERO"
  | "HOME_INTRO_PILLARS"
  | "HOME_EVENT_HIGHLIGHT"
  | "HOME_AWARDS_SHOWCASE"
  | "HOME_FEATURED_PROJECTS"
  | "HOME_NEWS_FEED"
  | "HOME_PARTNERS_SLIDER"
  | "HOME_CONVERSION_CTA"
  | "ABOUT_BANNER"
  | "ABOUT_VISION_MISSION"
  | "ABOUT_COUNCIL"
  | "ABOUT_EXECUTIVE"
  | "ABOUT_PARTNERS"
  | "HERO"
  | "PILLARS_5"
  | "EVENT_HIGHLIGHT"
  | "AWARDS_SHOWCASE"
  | "PROJECT_GRID"
  | "NEWS_FEED"
  | "PARTNERS_SLIDER"
  | "TIMELINE"
  | "SPEAKERS_GRID"
  | "CONTACT_FORM"
  | "CTA_BANNER"
  | "CUSTOM_HTML";

/**
 * Các phần tử con dùng chung (Universal Primitives) trong mọi Section:
 * Không đặt tên biến kèm số, không đặt tên quá cụ thể theo ngữ cảnh.
 */
export interface ActionItem {
  label: string;
  href: string;
  icon?: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: string;
  note?: string;
}

export interface CardItem {
  badge?: string;
  subBadge?: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  description?: string;
  note?: string;
  icon?: string;
  imageUrl?: string;
  imageAlt?: string;
  actionLabel?: string;
  href?: string;
  ids?: Array<string | number>;
  stats?: StatItem[];
  actions?: ActionItem[];
}

export interface GroupItem {
  badge?: string;
  subBadge?: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  description?: string;
  note?: string;
  icon?: string;
  imageUrl?: string;
  imageAlt?: string;
  actionLabel?: string;
  href?: string;
  /** Mảng ID tham chiếu tới các bản ghi của schema khác (News, Project, Organization, Speaker, Award, Category) */
  ids?: Array<string | number>;
  stats?: StatItem[];
  actions?: ActionItem[];
  cards?: CardItem[];
}

export interface FaqQuestionItem {
  question: string;
  answer: string;
}

export interface FormFieldConfigItem {
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface CriteriaItem {
  title: string;
  weight?: string;
  description?: string;
  evidences?: string[];
}

export interface ProcessStepItem {
  time?: string;
  title: string;
  description?: string;
}

/**
 * Cấu trúc chuẩn của một Section bên trong `Page.props`
 */
export interface UniversalSectionProps {
  id?: string | number;
  badge?: string;
  subBadge?: string;
  title?: string;
  subtitle?: string;
  quote?: string;
  description?: string;
  note?: string;
  icon?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoTitle?: string;
  actionLabel?: string;
  href?: string;
  address?: string;
  hotline?: string;
  email?: string;
  workingHours?: string;
  consentText?: string;
  submitLabel?: string;
  action?: ActionItem;
  /**
   * Mảng ID tham chiếu sang các schema danh mục (News, Project, Organization, Guest, Award).
   */
  ids?: Array<string | number>;
  actions?: ActionItem[];
  stats?: StatItem[];
  cards?: CardItem[];
  groups?: GroupItem[];
  categories?: GroupItem[];
  questions?: FaqQuestionItem[];
  fields?: Record<string, FormFieldConfigItem>;
  items?: CriteriaItem[];
  steps?: ProcessStepItem[];
  awards?: unknown[];
  members?: unknown[];
  [key: string]: unknown;
}

/**
 * Kiểu dữ liệu của cột `props` trong bảng `pages`:
 * Object chứa các section với key là tên ngắn có nghĩa (vd: hero, pillars, event, showcase, news, partners, cta)
 */
export type PagePropsMap = Record<string, UniversalSectionProps>;

/**
 * Cấu trúc đại diện một Section khi chuyển đổi sang danh sách hiển thị trên Admin UI
 */
export interface PageSection<TProps = UniversalSectionProps> {
  id: string;
  type: SectionType | string;
  title?: string;
  subtitle?: string;
  order: number;
  isVisible: boolean;
  props: TProps;
}

/**
 * Cấu hình SEO
 */
export interface PageSeoProps {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Domain Entity đại diện cho một Page lưu trữ trong bảng `pages`
 * Schema DB: id, slug, name, props (Json), isPublished, createdAt, updatedAt
 */
export interface PageEntity {
  id: string;
  slug: string;
  name: string;
  props: PagePropsMap;
  isPublished: boolean;
  /** Các trường dẫn xuất giúp tương thích giao diện Admin & SEO */
  title: string;
  description?: string;
  seoProps?: PageSeoProps;
  sections: PageSection[];
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
  props?: PagePropsMap;
  title?: string;
  description?: string;
  seoProps?: PageSeoProps;
  sections?: PageSection[];
  isPublished?: boolean;
  order?: number;
}

export type UpdatePageDTO = Partial<CreatePageDTO>;

/**
 * DTOs thao tác với từng Section
 */
export interface AddSectionDTO {
  key?: string;
  type: SectionType | string;
  title?: string;
  subtitle?: string;
  order?: number;
  isVisible?: boolean;
  props: UniversalSectionProps;
}

export interface UpdateSectionDTO {
  title?: string;
  subtitle?: string;
  order?: number;
  isVisible?: boolean;
  props?: UniversalSectionProps;
}

export interface ReorderSectionsDTO {
  sectionIds: string[];
}

/**
 * Helper chuyển đổi qua lại giữa `props: PagePropsMap` (lưu trong DB) và `sections: PageSection[]` (hiển thị trên UI)
 */
export function pagePropsToSections(props: PagePropsMap | null | undefined): PageSection[] {
  if (!props || typeof props !== "object" || Array.isArray(props)) {
    return [];
  }

  return Object.entries(props).map(([key, sectionProps], index) => {
    const safeProps: UniversalSectionProps =
      typeof sectionProps === "string"
        ? { id: sectionProps, ids: [sectionProps] }
        : sectionProps && typeof sectionProps === "object"
          ? (sectionProps as UniversalSectionProps)
          : {};

    return {
      id: key,
      type: key,
      title:
        (typeof safeProps.title === "string" && safeProps.title) ||
        (typeof safeProps.badge === "string" && safeProps.badge) ||
        key.toUpperCase(),
      subtitle:
        (typeof safeProps.subtitle === "string" && safeProps.subtitle) ||
        (typeof safeProps.quote === "string" && safeProps.quote) ||
        (typeof safeProps.subBadge === "string" && safeProps.subBadge) ||
        undefined,
      order: index + 1,
      isVisible: safeProps.isVisible !== false,
      props: safeProps,
    };
  });
}

export function sectionsToPageProps(sections: PageSection[]): PagePropsMap {
  const result: PagePropsMap = {};
  for (const sec of sections) {
    const key = sec.id || sec.type;
    if (
      key === "featured_news" &&
      (typeof sec.props?.id === "string" ||
        (Array.isArray(sec.props?.ids) && typeof sec.props.ids[0] === "string"))
    ) {
      const featuredId =
        typeof sec.props.id === "string" ? sec.props.id : (sec.props.ids?.[0] ?? "news_1");
      result[key] = featuredId as unknown as UniversalSectionProps;
      continue;
    }
    result[key] = {
      ...(sec.props || {}),
      ...(sec.title && !sec.props?.title ? { title: sec.title } : {}),
      ...(sec.subtitle && !sec.props?.subtitle ? { subtitle: sec.subtitle } : {}),
    };
  }
  return result;
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
  getSectionByKey(slug: string, sectionKey: string): Promise<UniversalSectionProps | null>;
  updateSectionByKey(
    slug: string,
    sectionKey: string,
    sectionProps: UniversalSectionProps
  ): Promise<PageEntity | null>;
  updatePropsBySlug(slug: string, props: PagePropsMap): Promise<PageEntity | null>;
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
  getSectionByKey(slug: string, sectionKey: string): Promise<UniversalSectionProps | null>;
  updateSectionByKey(
    slug: string,
    sectionKey: string,
    sectionProps: UniversalSectionProps
  ): Promise<PageEntity | null>;
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
