/**
 * LAYER 1: TYPES & INTERFACES CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA CATALOGS)
 * Các thực thể lưu trữ dưới CSDL quan hệ MySQL và được tái sử dụng xuyên suốt trên nhiều Trang.
 * Category và AwardCategory chỉ gồm 2 trường: `id` và `name`.
 */

export interface MasterDataCategory {
  id: string;
  name: string;
}

export interface CreateCategoryDTO {
  name: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;

export type MasterDataAwardCategory = MasterDataCategory;
export type MasterDataProjectCategory = MasterDataCategory;

export interface MasterDataProject {
  id: string;
  name: string;
  slug: string;
  location: string;
  categoryId?: string;
  category: string;
  status: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  annualRevenue?: string | null;
  jobsCreated: number;
  conservationFundShare?: string | null;
  pageSlug?: string | null;
  pageName?: string | null;
  reusedPages: string[];
  createdAt: string;
}

export interface CreateProjectDTO {
  name: string;
  slug?: string;
  location: string;
  categoryId?: string;
  category: string;
  status?: string;
  description?: string;
  annualRevenue?: string;
  jobsCreated?: number;
  conservationFundShare?: string;
  ownerOrg?: string;
  websiteUrl?: string;
  thumbnailUrl?: string;
  pageSlug?: string;
  pageName?: string;
  isFeatured?: boolean;
}

export type UpdateProjectDTO = Partial<CreateProjectDTO>;

export interface MasterDataOrganization {
  id: string;
  name: string;
  shortName?: string | null;
  category: string;
  categoryLabel: string;
  logoUrl: string;
  websiteUrl?: string | null;
  reusedPages: Array<{
    pageSlug: string;
    pageName?: string | null;
    roleLabel: string;
  }>;
  createdAt: string;
}

export interface CreateOrganizationDTO {
  name: string;
  shortName?: string;
  category: "STEERING" | "HOSTING" | "ORGANIZING" | "COMPANION" | "STRATEGIC" | "MEDIA";
  logoUrl: string;
  websiteUrl?: string;
  reusedPages?: Array<{
    pageSlug: string;
    pageName?: string;
    roleLabel: string;
  }>;
}

export type UpdateOrganizationDTO = Partial<CreateOrganizationDTO>;

export interface MasterDataNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string | null;
  category: {
    id: number;
    name: string;
  };
  categoryName: string;
  authorName?: string | null;
  authorTitle?: string | null;
  status: string;
  readingTimeMinutes: number;
  pageSlug?: string | null;
  pageName?: string | null;
  reusedPages: string[];
  publishedAt?: string | null;
}

export interface CreateNewsDTO {
  title: string;
  slug?: string;
  excerpt: string;
  categoryId?: number;
  categoryName?: string;
  authorName?: string;
  authorTitle?: string;
  coverImageUrl?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  readingTimeMinutes?: number;
  pageSlug?: string;
  pageName?: string;
  publishedAt?: string;
}

export type UpdateNewsDTO = Partial<CreateNewsDTO>;

export interface MasterDataSpeaker {
  id: string;
  name: string;
  slug: string;
  degree?: string | null;
  title: string;
  organization: string;
  avatarUrl: string;
  bio?: string | null;
  reusedPages: string[];
}

export interface CreateSpeakerDTO {
  name: string;
  slug?: string;
  degree?: string;
  title: string;
  organization: string;
  avatarUrl?: string;
  bio?: string;
  reusedPages?: string[];
}

export type UpdateSpeakerDTO = Partial<CreateSpeakerDTO>;

export interface MasterDataAward {
  id: string;
  year: number;
  name: string;
  theme: string;
  nominationDeadline: string;
  isOpen: boolean;
  categories: MasterDataAwardCategory[];
  reusedPages: string[];
}

export interface CreateAwardDTO {
  year: number;
  name: string;
  theme: string;
  nominationDeadline: string;
  isOpen?: boolean;
  categories?: Array<{
    name: string;
  }>;
  reusedPages?: string[];
}

export type UpdateAwardDTO = Partial<CreateAwardDTO>;

export interface MasterDataOverview {
  projects: MasterDataProject[];
  projectCategories?: MasterDataProjectCategory[];
  organizations: MasterDataOrganization[];
  news: MasterDataNews[];
  categories?: MasterDataCategory[];
  speakers: MasterDataSpeaker[];
  awards: MasterDataAward[];
  awardCategories?: MasterDataAwardCategory[];
  stats: {
    totalProjects: number;
    totalOrganizations: number;
    totalNews: number;
    totalSpeakers: number;
    totalAwardCategories: number;
  };
}

export interface IMasterDataRepository {
  getOverview(): Promise<MasterDataOverview>;

  // Project Categories (ProjectCategory: { id, name })
  getProjectCategories(): Promise<MasterDataProjectCategory[]>;
  getProjectCategoryById(id: string): Promise<MasterDataProjectCategory | null>;
  createProjectCategory(dto: CreateCategoryDTO): Promise<MasterDataProjectCategory>;
  updateProjectCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataProjectCategory | null>;
  deleteProjectCategory(id: string): Promise<boolean>;

  // Categories (News Category: { id, name })
  getCategories(): Promise<MasterDataCategory[]>;
  getCategoryById(id: string): Promise<MasterDataCategory | null>;
  createCategory(dto: CreateCategoryDTO): Promise<MasterDataCategory>;
  updateCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataCategory | null>;
  deleteCategory(id: string): Promise<boolean>;

  // Award Categories (AwardCategory: { id, name })
  getAwardCategories(): Promise<MasterDataAwardCategory[]>;
  getAwardCategoryById(id: string): Promise<MasterDataAwardCategory | null>;
  createAwardCategory(dto: CreateCategoryDTO): Promise<MasterDataAwardCategory>;
  updateAwardCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataAwardCategory | null>;
  deleteAwardCategory(id: string): Promise<boolean>;

  // Projects CRUD
  getProjects(): Promise<MasterDataProject[]>;
  getProjectById(id: string): Promise<MasterDataProject | null>;
  createProject(dto: CreateProjectDTO): Promise<MasterDataProject>;
  updateProject(id: string, dto: UpdateProjectDTO): Promise<MasterDataProject | null>;
  deleteProject(id: string): Promise<boolean>;

  // Organizations CRUD
  getOrganizations(): Promise<MasterDataOrganization[]>;
  getOrganizationById(id: string): Promise<MasterDataOrganization | null>;
  createOrganization(dto: CreateOrganizationDTO): Promise<MasterDataOrganization>;
  updateOrganization(id: string, dto: UpdateOrganizationDTO): Promise<MasterDataOrganization | null>;
  deleteOrganization(id: string): Promise<boolean>;

  // News CRUD
  getNews(): Promise<MasterDataNews[]>;
  getNewsById(id: string): Promise<MasterDataNews | null>;
  createNews(dto: CreateNewsDTO): Promise<MasterDataNews>;
  updateNews(id: string, dto: UpdateNewsDTO): Promise<MasterDataNews | null>;
  deleteNews(id: string): Promise<boolean>;

  // Speakers CRUD
  getSpeakers(): Promise<MasterDataSpeaker[]>;
  getSpeakerById(id: string): Promise<MasterDataSpeaker | null>;
  createSpeaker(dto: CreateSpeakerDTO): Promise<MasterDataSpeaker>;
  updateSpeaker(id: string, dto: UpdateSpeakerDTO): Promise<MasterDataSpeaker | null>;
  deleteSpeaker(id: string): Promise<boolean>;

  // Awards CRUD
  getAwards(): Promise<MasterDataAward[]>;
  getAwardById(id: string): Promise<MasterDataAward | null>;
  createAward(dto: CreateAwardDTO): Promise<MasterDataAward>;
  updateAward(id: string, dto: UpdateAwardDTO): Promise<MasterDataAward | null>;
  deleteAward(id: string): Promise<boolean>;
}

export interface IMasterDataService {
  getMasterDataOverview(): Promise<MasterDataOverview>;

  // Project Categories ({ id, name })
  getProjectCategories(): Promise<MasterDataProjectCategory[]>;
  getProjectCategoryById(id: string): Promise<MasterDataProjectCategory | null>;
  createProjectCategory(dto: CreateCategoryDTO): Promise<MasterDataProjectCategory>;
  updateProjectCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataProjectCategory | null>;
  deleteProjectCategory(id: string): Promise<boolean>;

  // Categories ({ id, name })
  getCategories(): Promise<MasterDataCategory[]>;
  getCategoryById(id: string): Promise<MasterDataCategory | null>;
  createCategory(dto: CreateCategoryDTO): Promise<MasterDataCategory>;
  updateCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataCategory | null>;
  deleteCategory(id: string): Promise<boolean>;

  // Award Categories ({ id, name })
  getAwardCategories(): Promise<MasterDataAwardCategory[]>;
  getAwardCategoryById(id: string): Promise<MasterDataAwardCategory | null>;
  createAwardCategory(dto: CreateCategoryDTO): Promise<MasterDataAwardCategory>;
  updateAwardCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataAwardCategory | null>;
  deleteAwardCategory(id: string): Promise<boolean>;

  // Projects
  getProjects(): Promise<MasterDataProject[]>;
  getProjectById(id: string): Promise<MasterDataProject | null>;
  createProject(dto: CreateProjectDTO): Promise<MasterDataProject>;
  updateProject(id: string, dto: UpdateProjectDTO): Promise<MasterDataProject | null>;
  deleteProject(id: string): Promise<boolean>;

  // Organizations
  getOrganizations(): Promise<MasterDataOrganization[]>;
  getOrganizationById(id: string): Promise<MasterDataOrganization | null>;
  createOrganization(dto: CreateOrganizationDTO): Promise<MasterDataOrganization>;
  updateOrganization(id: string, dto: UpdateOrganizationDTO): Promise<MasterDataOrganization | null>;
  deleteOrganization(id: string): Promise<boolean>;

  // News
  getNews(): Promise<MasterDataNews[]>;
  getNewsById(id: string): Promise<MasterDataNews | null>;
  createNews(dto: CreateNewsDTO): Promise<MasterDataNews>;
  updateNews(id: string, dto: UpdateNewsDTO): Promise<MasterDataNews | null>;
  deleteNews(id: string): Promise<boolean>;

  // Speakers
  getSpeakers(): Promise<MasterDataSpeaker[]>;
  getSpeakerById(id: string): Promise<MasterDataSpeaker | null>;
  createSpeaker(dto: CreateSpeakerDTO): Promise<MasterDataSpeaker>;
  updateSpeaker(id: string, dto: UpdateSpeakerDTO): Promise<MasterDataSpeaker | null>;
  deleteSpeaker(id: string): Promise<boolean>;

  // Awards
  getAwards(): Promise<MasterDataAward[]>;
  getAwardById(id: string): Promise<MasterDataAward | null>;
  createAward(dto: CreateAwardDTO): Promise<MasterDataAward>;
  updateAward(id: string, dto: UpdateAwardDTO): Promise<MasterDataAward | null>;
  deleteAward(id: string): Promise<boolean>;
}
