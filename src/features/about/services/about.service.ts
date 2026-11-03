/**
 * LAYER 4: BUSINESS LOGIC / SERVICE CHO MODULE ABOUT
 * Phân loại, đóng gói dữ liệu và thực thi nghiệp vụ thẩm định hồ sơ nhân sự, đối tác
 */

import { aboutRepository } from "../repositories/about.repository";
import type {
  IAboutService,
  AboutPageData,
  Person,
  ExecutiveDepartment,
  PartnerCategory,
  PartnerOrganization,
} from "../types/about.types";

export class AboutService implements IAboutService {
  async getAboutPageData(): Promise<AboutPageData> {
    const [visionMission, councilGroup, executiveGroup, partners] = await Promise.all([
      aboutRepository.getVisionMission(),
      this.getCouncilMembersGrouped(),
      this.getExecutiveBoardGrouped(),
      aboutRepository.getPartners(),
    ]);

    // Đảm bảo Chủ tịch luôn tồn tại hoặc có fallback mặc định
    const defaultPresident: Person = {
      id: "pres_default",
      fullName: "GS.TS. Trần Quốc Vượng",
      academicTitle: "GS.TS",
      councilRole: "PRESIDENT",
      positionTitle: "Chủ tịch Hội đồng Diễn đàn",
      organization: "Hội Di sản Văn hóa Việt Nam",
      expertiseField: "Kinh tế Văn hóa Di sản",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=750&q=80",
      altText: "Chân dung Chủ tịch Hội đồng",
      bio: "Chủ tịch Hội đồng Diễn đàn Kinh tế Di sản.",
      papers: [],
      isApproved: true,
      order: 1,
      updatedAt: "03/11/2026 09:00:00",
    };

    const defaultHead: Person = {
      id: "head_default",
      fullName: "TS. Phạm Trung Dũng",
      academicTitle: "TS",
      executiveRole: "HEAD",
      positionTitle: "Trưởng ban Điều hành",
      organization: "Ban Thư ký HEF",
      expertiseField: "Quản trị Dự án Văn hóa",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=80",
      altText: "Chân dung Trưởng ban Điều hành",
      bio: "Trưởng ban Điều hành Diễn đàn Kinh tế Di sản.",
      papers: [],
      isApproved: true,
      order: 10,
      updatedAt: "03/11/2026 09:00:00",
    };

    return {
      visionMission,
      president: councilGroup.president || defaultPresident,
      vicePresidents: councilGroup.vicePresidents,
      councilMembers: councilGroup.councilMembers,
      scientificAdvisors: councilGroup.scientificAdvisors,
      executiveHead: executiveGroup.head || defaultHead,
      executiveDeputies: executiveGroup.deputies,
      executiveDepartments: executiveGroup.departments,
      partners,
      lastUpdated: "03/11/2026 15:00:00",
    };
  }

  async getCouncilMembersGrouped(): Promise<{
    president: Person | null;
    vicePresidents: Person[];
    councilMembers: Person[];
    scientificAdvisors: Person[];
  }> {
    const councilMembers = await aboutRepository.getCouncilMembers();

    let president: Person | null = null;
    const vicePresidents: Person[] = [];
    const members: Person[] = [];
    const scientificAdvisors: Person[] = [];

    for (const person of councilMembers) {
      if (person.councilRole === "PRESIDENT") {
        president = person;
      } else if (person.councilRole === "VICE_PRESIDENT") {
        vicePresidents.push(person);
      } else if (person.councilRole === "SCIENTIFIC_ADVISOR") {
        scientificAdvisors.push(person);
      } else {
        members.push(person);
      }
    }

    return {
      president,
      vicePresidents: vicePresidents.sort((a, b) => a.order - b.order),
      councilMembers: members.sort((a, b) => a.order - b.order),
      scientificAdvisors: scientificAdvisors.sort((a, b) => a.order - b.order),
    };
  }

  async getExecutiveBoardGrouped(): Promise<{
    head: Person | null;
    deputies: Person[];
    departments: ExecutiveDepartment[];
  }> {
    const [executiveMembers, departments] = await Promise.all([
      aboutRepository.getExecutiveMembers(),
      aboutRepository.getExecutiveDepartments(),
    ]);

    let head: Person | null = null;
    const deputies: Person[] = [];

    for (const person of executiveMembers) {
      if (person.executiveRole === "HEAD") {
        head = person;
      } else if (person.executiveRole === "DEPUTY_HEAD") {
        deputies.push(person);
      }
    }

    return {
      head,
      deputies: deputies.sort((a, b) => a.order - b.order),
      departments,
    };
  }

  async getPartnersGrouped(): Promise<Record<PartnerCategory, PartnerOrganization[]>> {
    const partners = await aboutRepository.getPartners();
    const grouped: Record<PartnerCategory, PartnerOrganization[]> = {
      STEERING: [],
      HOSTING: [],
      ORGANIZING: [],
      COMPANION: [],
      STRATEGIC: [],
      MEDIA: [],
    };

    for (const partner of partners) {
      if (grouped[partner.category]) {
        grouped[partner.category].push(partner);
      }
    }

    for (const category of Object.keys(grouped) as PartnerCategory[]) {
      grouped[category].sort((a, b) => a.order - b.order);
    }

    return grouped;
  }

  async getPersonDetail(id: string): Promise<Person | null> {
    return aboutRepository.getPersonById(id);
  }
}

export const aboutService = new AboutService();
