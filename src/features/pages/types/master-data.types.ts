/**
 * LAYER 1: TYPES & INTERFACES CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA CATALOGS)
 * Các thực thể lưu trữ dưới CSDL quan hệ MySQL và được tái sử dụng xuyên suốt trên nhiều Trang.
 */

export interface MasterDataProject {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  status: string;
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
  categoryName: string;
  authorName?: string | null;
  authorTitle?: string | null;
  status: string;
  isFeatured: boolean;
  viewsCount: number;
  pageSlug?: string | null;
  pageName?: string | null;
  reusedPages: string[];
  publishedAt?: string | null;
}

export interface CreateNewsDTO {
  title: string;
  slug?: string;
  excerpt: string;
  categoryName?: string;
  authorName?: string;
  authorTitle?: string;
  coverImageUrl?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  isFeatured?: boolean;
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

export interface MasterDataAwardCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

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
    slug?: string;
    description?: string;
  }>;
  reusedPages?: string[];
}

export type UpdateAwardDTO = Partial<CreateAwardDTO>;

export interface MasterDataOverview {
  projects: MasterDataProject[];
  organizations: MasterDataOrganization[];
  news: MasterDataNews[];
  speakers: MasterDataSpeaker[];
  awards: MasterDataAward[];
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
