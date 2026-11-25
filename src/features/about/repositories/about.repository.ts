/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE ABOUT
 * Cung cấp dữ liệu chuẩn hóa cho Trang Giới Thiệu: Tôn chỉ, Hội đồng, Ban Điều hành, Đối tác
 * Tuân thủ Clean Architecture: Tách biệt dữ liệu fallback sang data/about-fallback.data.ts
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
      if (page && page.sections && page.sections.length > 0) {
        const vmSec = page.sections.find(
          (s) => s.type === "ABOUT_VISION_MISSION" || s.type === "CUSTOM_HTML"
        );
        if (vmSec?.props) {
          const props = vmSec.props as Record<string, unknown>;
          if (props.visionMission) {
            return props.visionMission as VisionMission;
          }
          if (props.vision && props.mission) {
            return props as unknown as VisionMission;
          }
        }
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
      if (page && page.sections && page.sections.length > 0) {
        const councilSec = page.sections.find((s) => s.type === "ABOUT_COUNCIL");
        const execSec = page.sections.find((s) => s.type === "ABOUT_EXECUTIVE");

        const persons: Person[] = [];

        if (councilSec?.props) {
          const cProps = councilSec.props as Record<string, unknown>;
          if (cProps.president) persons.push(cProps.president as Person);
          if (Array.isArray(cProps.vicePresidents))
            persons.push(...(cProps.vicePresidents as Person[]));
          if (Array.isArray(cProps.councilMembers))
            persons.push(...(cProps.councilMembers as Person[]));
          if (Array.isArray(cProps.scientificAdvisors))
            persons.push(...(cProps.scientificAdvisors as Person[]));
        }

        if (execSec?.props) {
          const eProps = execSec.props as Record<string, unknown>;
          if (eProps.executiveHead) persons.push(eProps.executiveHead as Person);
          if (eProps.executiveAdvisor) persons.push(eProps.executiveAdvisor as Person);
          if (Array.isArray(eProps.executiveDeputies))
            persons.push(...(eProps.executiveDeputies as Person[]));
        }

        if (persons.length > 0) {
          return persons.filter((p) => p.isApproved).sort((a, b) => a.order - b.order);
        }
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
      const execSec = page?.sections?.find((s) => s.type === "ABOUT_EXECUTIVE");
      const executiveMembers = await this.getExecutiveMembers();

      if (execSec?.props) {
        const eProps = execSec.props as Record<string, unknown>;
        if (Array.isArray(eProps.executiveDepartments) && eProps.executiveDepartments.length > 0) {
          return (eProps.executiveDepartments as ExecutiveDepartment[]).map((dept) => ({
            ...dept,
            members: executiveMembers.filter((m) => m.departmentCode === dept.code),
          }));
        }
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
      let partners: PartnerOrganization[] = [];

      if (page && page.sections && page.sections.length > 0) {
        const partnersSec = page.sections.find((s) => s.type === "ABOUT_PARTNERS");
        if (partnersSec?.props) {
          const pProps = partnersSec.props as Record<string, unknown>;
          if (Array.isArray(pProps.partners) && pProps.partners.length > 0) {
            partners = pProps.partners as PartnerOrganization[];
          }
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
