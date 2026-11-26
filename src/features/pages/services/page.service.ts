/**
 * LAYER 4: BUSINESS LOGIC / SERVICE LAYER (Page & Sections CMS)
 * Quản lý cấu trúc `props` JSON của từng Page theo từng section riêng biệt
 * và hỗ trợ API cập nhật từng section `/api/[namepage]/[section]`.
 */

import { pageRepository } from "../repositories/page.repository";
import {
  pagePropsToSections,
  type PageEntity,
  type CreatePageDTO,
  type UpdatePageDTO,
  type AddSectionDTO,
  type UpdateSectionDTO,
  type IPageRepository,
  type IPageService,
  type PageSection,
  type PagePropsMap,
  type UniversalSectionProps,
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
    const cleanSlug = dto.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return this.repository.create({
      ...dto,
      slug: cleanSlug,
    });
  }

  async updatePage(id: string, dto: UpdatePageDTO): Promise<PageEntity | null> {
    return this.repository.update(id, dto);
  }

  async deletePage(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async getSectionByKey(slug: string, sectionKey: string): Promise<UniversalSectionProps | null> {
    if (!slug || !sectionKey) return null;
    return this.repository.getSectionByKey(slug.toLowerCase().trim(), sectionKey.trim());
  }

  async updateSectionByKey(
    slug: string,
    sectionKey: string,
    sectionProps: UniversalSectionProps
  ): Promise<PageEntity | null> {
    if (!slug || !sectionKey) return null;
    return this.repository.updateSectionByKey(
      slug.toLowerCase().trim(),
      sectionKey.trim(),
      sectionProps
    );
  }

  async addSection(pageId: string, sectionDto: AddSectionDTO): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const rawKey = (sectionDto.key || sectionDto.type || "section")
      .toLowerCase()
      .replace(/[^a-z]+/g, "");
    const sectionKey = page.props[rawKey] ? `${rawKey}extra` : rawKey;

    const updatedProps: PagePropsMap = {
      ...page.props,
      [sectionKey]: {
        ...(sectionDto.props || {}),
        title: sectionDto.title || sectionDto.props?.title || sectionKey,
        subtitle: sectionDto.subtitle || sectionDto.props?.subtitle,
      },
    };

    return this.repository.updatePropsBySlug(page.slug, updatedProps);
  }

  async updateSection(
    pageId: string,
    sectionId: string,
    sectionDto: UpdateSectionDTO
  ): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const currentSection = page.props[sectionId] || {};
    const nextSection: UniversalSectionProps = {
      ...currentSection,
      ...(sectionDto.props || {}),
      ...(sectionDto.title !== undefined ? { title: sectionDto.title } : {}),
      ...(sectionDto.subtitle !== undefined ? { subtitle: sectionDto.subtitle } : {}),
      ...(sectionDto.isVisible !== undefined ? { isVisible: sectionDto.isVisible } : {}),
    };

    return this.repository.updateSectionByKey(page.slug, sectionId, nextSection);
  }

  async updateSections(pageId: string, sections: PageSection[]): Promise<PageEntity | null> {
    return this.repository.updateSections(pageId, sections);
  }

  async updateSectionsBySlug(slug: string, sections: PageSection[]): Promise<PageEntity | null> {
    return this.repository.updateSectionsBySlug(slug, sections);
  }

  async removeSection(pageId: string, sectionId: string): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const nextProps: PagePropsMap = { ...page.props };
    delete nextProps[sectionId];

    return this.repository.updatePropsBySlug(page.slug, nextProps);
  }

  async reorderSections(pageId: string, newOrderIds: string[]): Promise<PageEntity | null> {
    const page = await this.repository.findById(pageId);
    if (!page) return null;

    const nextProps: PagePropsMap = {};
    for (const key of newOrderIds) {
      if (page.props[key]) {
        nextProps[key] = page.props[key];
      }
    }
    for (const [key, val] of Object.entries(page.props)) {
      if (!nextProps[key]) {
        nextProps[key] = val;
      }
    }

    const updated = await this.repository.updatePropsBySlug(page.slug, nextProps);
    if (updated) {
      updated.sections = pagePropsToSections(nextProps);
    }
    return updated;
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
