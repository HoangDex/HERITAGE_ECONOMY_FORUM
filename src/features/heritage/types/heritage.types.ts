/**
 * LAYER 1: DOMAIN & ENTITY TYPES
 * Định nghĩa thực thể nghiệp vụ (Domain Entities), Value Objects và Data Transfer Objects (DTOs)
 */

export type ProjectStatus = "Đang vận hành" | "Mở rộng đầu tư" | "Đang nghiên cứu";

export interface EconomicMetrics {
  annualRevenue: string;
  jobsCreated: number;
  conservationFundShare: string;
  imageUrl?: string;
  gallery?: string[];
}

/**
 * Domain Entity đại diện cho một mô hình kinh tế di sản
 */
export interface HeritageProject {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  status: ProjectStatus;
  economicMetrics: EconomicMetrics;
  description: string;
  highlights: string[];
  imageUrl?: string;
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * DTO dùng khi tạo mới một dự án di sản
 */
export interface CreateHeritageDTO {
  name: string;
  location: string;
  category: string;
  status?: ProjectStatus;
  description: string;
  highlights: string[];
  annualRevenue: string;
  jobsCreated: number;
  conservationFundShare: string;
}

/**
 * DTO dùng khi cập nhật dự án di sản
 */
export type UpdateHeritageDTO = Partial<CreateHeritageDTO>;

/**
 * DTO chứa tiêu chí lọc và phân trang
 */
export interface HeritageFilterDTO {
  location?: string;
  category?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Contract (Interface) cho Repository Data Access Layer
 */
export interface IHeritageRepository {
  findAll(filters?: HeritageFilterDTO): Promise<HeritageProject[]>;
  findById(id: string): Promise<HeritageProject | null>;
  findBySlug(slug: string): Promise<HeritageProject | null>;
  create(data: CreateHeritageDTO & { slug: string }): Promise<HeritageProject>;
  update(id: string, data: UpdateHeritageDTO): Promise<HeritageProject | null>;
  delete(id: string): Promise<boolean>;
  getMetricsAggregate(): Promise<{ totalProjects: number; totalJobs: number }>;
}

/**
 * Contract (Interface) cho Service Business Logic Layer
 */
export interface IHeritageService {
  getProjects(filters?: HeritageFilterDTO): Promise<HeritageProject[]>;
  getProjectBySlug(slug: string): Promise<HeritageProject | null>;
  createProject(dto: CreateHeritageDTO): Promise<HeritageProject>;
  removeProject(id: string): Promise<boolean>;
  getSummaryMetrics(): Promise<{ totalProjects: number; totalJobs: number }>;
}
