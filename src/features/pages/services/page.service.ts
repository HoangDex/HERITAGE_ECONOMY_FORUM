/**
 * LAYER 4: BUSINESS LOGIC / SERVICE LAYER (Page & Sections CMS)
 * Chịu trách nhiệm toàn bộ nghiệp vụ quản lý cấu trúc trang, section và sắp xếp động
 */

import { pageRepository } from "../repositories/page.repository";
import type {
  PageEntity,
  CreatePageDTO,
  UpdatePageDTO,
  AddSectionDTO,
  UpdateSectionDTO,
  IPageRepository,
  IPageService,
  PageSection,
} from "../types/page.types";

export class PageService implements IPageService {
  constructor(private readonly repository: IPageRepository = pageRepository) {}

  async getAllPages(publishedOnly = false): Promise<PageEntity[]> {
    return this.repository.findAll(publishedOnly);
  }

  async getPageById(id: string): Promise<PageEntity | null> {
    if (!id) return null;
    return this.repository.findById(id);
  }

  async getPageBySlug(slug: string): Promise<PageEntity | null> {
    if (!slug) return null;
    return this.repository.findBySlug(slug);
  }

  async createPage(dto: CreatePageDTO): Promise<PageEntity> {
    // 1. Chuẩn hóa slug
    const cleanSlug = dto.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return this.repository.create({
      ...dto,
      slug: cleanSlug,
      sections: dto.sections || [],
    });
  }

  async updatePage(id: string, dto: UpdatePageDTO): Promise<PageEntity | null> {
    return this.repository.update(id, dto);
  }

  async deletePage(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async addSection(pageId: string, sectionDto: AddSectionDTO): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const newSection: PageSection = {
      id: "sec_" + Math.random().toString(36).substring(2, 9),
      type: sectionDto.type,
      title: sectionDto.title,
      subtitle: sectionDto.subtitle,
      order: sectionDto.order ?? page.sections.length + 1,
      isVisible: sectionDto.isVisible ?? true,
      props: sectionDto.props || {},
    };

    const updatedSections = [...page.sections, newSection].sort((a, b) => a.order - b.order);
    return this.repository.updateSections(pageId, updatedSections);
  }

  async updateSection(
    pageId: string,
    sectionId: string,
    sectionDto: UpdateSectionDTO
  ): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const updatedSections = page.sections.map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          title: sectionDto.title !== undefined ? sectionDto.title : sec.title,
          subtitle: sectionDto.subtitle !== undefined ? sectionDto.subtitle : sec.subtitle,
          order: sectionDto.order !== undefined ? sectionDto.order : sec.order,
          isVisible: sectionDto.isVisible !== undefined ? sectionDto.isVisible : sec.isVisible,
          props: sectionDto.props !== undefined ? { ...sec.props, ...sectionDto.props } : sec.props,
        };
      }
      return sec;
    });

    return this.repository.updateSections(pageId, updatedSections);
  }

  async removeSection(pageId: string, sectionId: string): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const filteredSections = page.sections.filter((s) => s.id !== sectionId);
    return this.repository.updateSections(pageId, filteredSections);
  }

  async reorderSections(pageId: string, newOrderIds: string[]): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const sectionMap = new Map(page.sections.map((s) => [s.id, s]));
    const reordered: PageSection[] = [];

    newOrderIds.forEach((id, index) => {
      const section = sectionMap.get(id);
      if (section) {
        reordered.push({ ...section, order: index + 1 });
        sectionMap.delete(id);
      }
    });

    // Bổ sung các section còn sót lại nếu có
    sectionMap.forEach((remainingSec) => {
      reordered.push({ ...remainingSec, order: reordered.length + 1 });
    });

    return this.repository.updateSections(pageId, reordered);
  }

  async toggleSection(
    pageId: string,
    sectionId: string,
    isVisible: boolean
  ): Promise<PageEntity | null> {
    return this.updateSection(pageId, sectionId, { isVisible });
  }
}

export const pageService = new PageService();
