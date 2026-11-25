/**
 * LAYER 4: SERVICE CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA SERVICE)
 * Xử lý business logic, tổng hợp dữ liệu danh mục thực thể quan hệ từ MySQL.
 */

import { masterDataRepository } from "../repositories/master-data.repository";
import type {
  MasterDataOverview,
  MasterDataProject,
  CreateProjectDTO,
  UpdateProjectDTO,
  MasterDataOrganization,
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
  MasterDataNews,
  CreateNewsDTO,
  UpdateNewsDTO,
  MasterDataSpeaker,
  CreateSpeakerDTO,
  UpdateSpeakerDTO,
  MasterDataAward,
  CreateAwardDTO,
  UpdateAwardDTO,
  IMasterDataRepository,
  IMasterDataService,
} from "../types/master-data.types";

export class MasterDataService implements IMasterDataService {
  constructor(private readonly repo: IMasterDataRepository = masterDataRepository) {}

  async getMasterDataOverview(): Promise<MasterDataOverview> {
    return this.repo.getOverview();
  }

  // ==========================================
  // PROJECTS
  // ==========================================
  async getProjects(): Promise<MasterDataProject[]> {
    return this.repo.getProjects();
  }

  async getProjectById(id: string): Promise<MasterDataProject | null> {
    if (!id) return null;
    return this.repo.getProjectById(id);
  }

  async createProject(dto: CreateProjectDTO): Promise<MasterDataProject> {
    return this.repo.createProject(dto);
  }

  async updateProject(id: string, dto: UpdateProjectDTO): Promise<MasterDataProject | null> {
    if (!id) return null;
    return this.repo.updateProject(id, dto);
  }

  async deleteProject(id: string): Promise<boolean> {
    if (!id) return false;
    return this.repo.deleteProject(id);
  }

  // ==========================================
  // ORGANIZATIONS
  // ==========================================
  async getOrganizations(): Promise<MasterDataOrganization[]> {
    return this.repo.getOrganizations();
  }

  async getOrganizationById(id: string): Promise<MasterDataOrganization | null> {
    if (!id) return null;
    return this.repo.getOrganizationById(id);
  }

  async createOrganization(dto: CreateOrganizationDTO): Promise<MasterDataOrganization> {
    return this.repo.createOrganization(dto);
  }

  async updateOrganization(
    id: string,
    dto: UpdateOrganizationDTO
  ): Promise<MasterDataOrganization | null> {
    if (!id) return null;
    return this.repo.updateOrganization(id, dto);
  }

  async deleteOrganization(id: string): Promise<boolean> {
    if (!id) return false;
    return this.repo.deleteOrganization(id);
  }

  // ==========================================
  // NEWS
  // ==========================================
  async getNews(): Promise<MasterDataNews[]> {
    return this.repo.getNews();
  }

  async getNewsById(id: string): Promise<MasterDataNews | null> {
    if (!id) return null;
    return this.repo.getNewsById(id);
  }

  async createNews(dto: CreateNewsDTO): Promise<MasterDataNews> {
    return this.repo.createNews(dto);
  }

  async updateNews(id: string, dto: UpdateNewsDTO): Promise<MasterDataNews | null> {
    if (!id) return null;
    return this.repo.updateNews(id, dto);
  }

  async deleteNews(id: string): Promise<boolean> {
    if (!id) return false;
    return this.repo.deleteNews(id);
  }

  // ==========================================
  // SPEAKERS
  // ==========================================
  async getSpeakers(): Promise<MasterDataSpeaker[]> {
    return this.repo.getSpeakers();
  }

  async getSpeakerById(id: string): Promise<MasterDataSpeaker | null> {
    if (!id) return null;
    return this.repo.getSpeakerById(id);
  }

  async createSpeaker(dto: CreateSpeakerDTO): Promise<MasterDataSpeaker> {
    return this.repo.createSpeaker(dto);
  }

  async updateSpeaker(id: string, dto: UpdateSpeakerDTO): Promise<MasterDataSpeaker | null> {
    if (!id) return null;
    return this.repo.updateSpeaker(id, dto);
  }

  async deleteSpeaker(id: string): Promise<boolean> {
    if (!id) return false;
    return this.repo.deleteSpeaker(id);
  }

  // ==========================================
  // AWARDS
  // ==========================================
  async getAwards(): Promise<MasterDataAward[]> {
    return this.repo.getAwards();
  }

  async getAwardById(id: string): Promise<MasterDataAward | null> {
    if (!id) return null;
    return this.repo.getAwardById(id);
  }

  async createAward(dto: CreateAwardDTO): Promise<MasterDataAward> {
    return this.repo.createAward(dto);
  }

  async updateAward(id: string, dto: UpdateAwardDTO): Promise<MasterDataAward | null> {
    if (!id) return null;
    return this.repo.updateAward(id, dto);
  }

  async deleteAward(id: string): Promise<boolean> {
    if (!id) return false;
    return this.repo.deleteAward(id);
  }
}

export const masterDataService = new MasterDataService();
