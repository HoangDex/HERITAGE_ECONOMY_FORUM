/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE ABOUT
 * Đọc `page.props` (5 sections: banner, vision, council, executive, partners)
 * và giải tham chiếu mảng `ids: string[]` sang bảng `speakers` và `organizations`.
 */

import type {
  IAboutRepository,
  VisionMission,
  Person,
  ExecutiveDepartment,
  PartnerOrganization,
  PartnerCategory,
} from "../types/about.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";
import {
  fallbackVisionMission,
  fallbackPersons,
  fallbackDepartments,
  fallbackPartners,
} from "../data/about-fallback.data";

export class AboutRepository implements IAboutRepository {
  async getVisionMission(): Promise<VisionMission> {
    try {
      const page = await pageRepository.findBySlug("about");
      const visionSec = page?.props?.vision;
      if (visionSec) {
        const cards = Array.isArray(visionSec.cards) ? visionSec.cards : [];
        return {
          aboutPlatform: visionSec.description || fallbackVisionMission.aboutPlatform,
          vision: visionSec.quote || fallbackVisionMission.vision,
          mission: visionSec.note || fallbackVisionMission.mission,
          coreValues:
            cards.length > 0
              ? cards.map((c, idx) => ({
                  id: `val_${idx + 1}`,
                  title: c.title || "",
                  description: c.description || "",
                  iconName: c.icon || "ShieldCheck",
                }))
              : fallbackVisionMission.coreValues,
        };
      }
      return fallbackVisionMission;
    } catch (error) {
      console.warn("[AboutRepository] Fallback to in-memory vision/mission:", error);
      return fallbackVisionMission;
    }
  }

  async getAllPersons(): Promise<Person[]> {
    try {
      const page = await pageRepository.findBySlug("about");
      const councilIds = page?.props?.council?.ids || [];
      const execIds = page?.props?.executive?.ids || [];

      if (councilIds.length > 0 || execIds.length > 0) {
        const [councilSpeakers, execSpeakers] = await Promise.all([
          councilIds.length > 0
            ? masterDataRepository.getSpeakersByIds(councilIds)
            : Promise.resolve([]),
          execIds.length > 0
            ? masterDataRepository.getSpeakersByIds(execIds)
            : Promise.resolve([]),
        ]);

        const mappedCouncil: Person[] = councilSpeakers.map((sp, idx) => ({
          id: sp.id,
          fullName: sp.name,
          academicTitle: sp.degree || "",
          councilRole:
            idx === 0
              ? "PRESIDENT"
              : idx <= 2
              ? "VICE_PRESIDENT"
              : "COUNCIL_MEMBER",
          positionTitle: sp.title,
          organization: sp.organization,
          expertiseField: "Kinh tế Di sản & Phát triển Bền vững",
          avatarUrl: sp.avatarUrl,
          altText: `Chân dung ${sp.name}`,
          bio: sp.bio || "",
          papers: [],
          isApproved: true,
          order: idx + 1,
          updatedAt: "03/11/2026 09:00:00",
        }));

        const mappedExec: Person[] = execSpeakers.map((sp, idx) => ({
          id: `exec_${sp.id}`,
          fullName: sp.name,
          academicTitle: sp.degree || "",
          executiveRole: idx === 0 ? "HEAD" : "DEPUTY_HEAD",
          positionTitle: idx === 0 ? "Trưởng ban Điều hành Diễn đàn" : sp.title,
          organization: sp.organization,
          expertiseField: "Điều phối Chương trình & Hợp tác Di sản",
          avatarUrl: sp.avatarUrl,
          altText: `Chân dung ${sp.name}`,
          bio: sp.bio || "",
          papers: [],
          isApproved: true,
          order: 10 + idx,
          updatedAt: "03/11/2026 09:00:00",
        }));

        // Kết hợp thêm các nhân sự fallback để giao diện luôn đầy đủ các cấp hội đồng & ban điều hành
        const combined = [...mappedCouncil, ...mappedExec];
        const existingNames = new Set(combined.map((p) => p.fullName.toLowerCase()));
        for (const fb of fallbackPersons) {
          if (!existingNames.has(fb.fullName.toLowerCase())) {
            combined.push(fb);
          }
        }
        return combined.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
      }

      return fallbackPersons.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
    } catch (error) {
      console.warn("[AboutRepository] Fallback to in-memory persons:", error);
      return fallbackPersons.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
    }
  }

  async getCouncilMembers(): Promise<Person[]> {
    const persons = await this.getAllPersons();
    return persons.filter((p) => p.councilRole !== undefined);
  }

  async getExecutiveMembers(): Promise<Person[]> {
    const persons = await this.getAllPersons();
    return persons.filter((p) => p.executiveRole !== undefined);
  }

  async getPersonById(id: string): Promise<Person | null> {
    const persons = await this.getAllPersons();
    return persons.find((p) => p.id === id) || null;
  }

  async getExecutiveDepartments(): Promise<ExecutiveDepartment[]> {
    try {
      const page = await pageRepository.findBySlug("about");
      const execSec = page?.props?.executive;
      const executiveMembers = await this.getExecutiveMembers();

      if (execSec && Array.isArray(execSec.cards) && execSec.cards.length > 0) {
        return execSec.cards.map((card, idx) => {
          const fallbackDept = fallbackDepartments[idx] || fallbackDepartments[0];
          const code = (card.badge as ExecutiveDepartment["code"]) || fallbackDept.code;
          const [emailPart, phonePart] = (card.note || "").split("•").map((s) => s.trim());
          return {
            id: `dept_${idx + 1}`,
            code,
            name: card.title || fallbackDept.name,
            mission: card.description || fallbackDept.mission,
            contactEmail: emailPart || fallbackDept.contactEmail,
            contactPhone: phonePart || fallbackDept.contactPhone,
            members: executiveMembers.filter((m) => m.departmentCode === code),
          };
        });
      }

      return fallbackDepartments.map((dept) => ({
        ...dept,
        members: executiveMembers.filter((m) => m.departmentCode === dept.code),
      }));
    } catch (error) {
      console.warn("[AboutRepository] Fallback to departments:", error);
      const executiveMembers = await this.getExecutiveMembers();
      return fallbackDepartments.map((dept) => ({
        ...dept,
        members: executiveMembers.filter((m) => m.departmentCode === dept.code),
      }));
    }
  }

  async getPartners(category?: PartnerCategory): Promise<PartnerOrganization[]> {
    try {
      const page = await pageRepository.findBySlug("about");
      const partnerIds = page?.props?.partners?.ids || [];

      let partners: PartnerOrganization[] = [];

      if (partnerIds.length > 0) {
        const resolvedOrgs = await masterDataRepository.getOrganizationsByIds(partnerIds);
        if (resolvedOrgs.length > 0) {
          partners = resolvedOrgs.map((org, idx) => ({
            id: org.id,
            name: org.name,
            shortName: org.shortName || org.name,
            logoUrl: org.logoUrl,
            category: org.category as PartnerCategory,
            roleDescription: `${org.categoryLabel} đồng hành phát triển hệ sinh thái Diễn đàn Kinh tế Di sản.`,
            websiteUrl: org.websiteUrl || "",
            relatedEvents: ["Kỳ Diễn đàn 2026"],
            order: idx + 1,
            isApproved: true,
            updatedAt: org.createdAt,
          }));
        }
      }

      if (partners.length === 0) {
        partners = fallbackPartners;
      }

      const approved = partners.filter((p) => p.isApproved);
      if (category) {
        return approved.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
      }
      return approved.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.warn("[AboutRepository] Fallback to in-memory partners:", error);
      const approved = fallbackPartners.filter((p) => p.isApproved);
      if (category) {
        return approved.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
      }
      return approved.sort((a, b) => a.order - b.order);
    }
  }
}

export const aboutRepository = new AboutRepository();
