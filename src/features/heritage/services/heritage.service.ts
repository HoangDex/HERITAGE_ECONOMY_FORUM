/**
 * LAYER 4: BUSINESS LOGIC / SERVICE LAYER
 * Chứa toàn bộ quy tắc nghiệp vụ (Business Rules), tính toán và logic ứng dụng.
 * Độc lập với Framework và UI.
 */

import { heritageRepository } from "../repositories/heritage.repository";
import type {
  HeritageProject,
  CreateHeritageDTO,
  HeritageFilterDTO,
  IHeritageRepository,
  IHeritageService,
} from "../types/heritage.types";

export class HeritageService implements IHeritageService {
  constructor(private readonly repository: IHeritageRepository = heritageRepository) {}

  /**
   * Sinh Slug chuẩn SEO tiếng Việt từ tiêu đề dự án
   */
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async getProjects(filters?: HeritageFilterDTO): Promise<HeritageProject[]> {
    return this.repository.findAll(filters);
  }

  async getProjectBySlug(slug: string): Promise<HeritageProject | null> {
    if (!slug) return null;
    return this.repository.findBySlug(slug);
  }

  async createProject(dto: CreateHeritageDTO): Promise<HeritageProject> {
    // 1. Quy tắc nghiệp vụ: Sinh slug duy nhất
    const baseSlug = this.generateSlug(dto.name);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    // 2. Chuẩn hóa dữ liệu nghiệp vụ
    const payload = {
      ...dto,
      slug: uniqueSlug,
      highlights: dto.highlights.map((h) => h.trim()).filter(Boolean),
    };

    return this.repository.create(payload);
  }

  async removeProject(id: string): Promise<boolean> {
    if (!id) return false;
    return this.repository.delete(id);
  }

  async getSummaryMetrics(): Promise<{ totalProjects: number; totalJobs: number }> {
    return this.repository.getMetricsAggregate();
  }
}

export const heritageService = new HeritageService();
