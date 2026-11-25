/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE GIẢI THƯỞNG
 * Dữ liệu 8 hạng mục tham khảo, 7 bước quy trình và tiêu chí theo Đề án Mục 08
 */

import type { AwardsPageData, IAwardsRepository } from "../types/awards.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";

import { MOCK_AWARDS_DATA } from "../data/awards-fallback.data";
export { MOCK_AWARDS_DATA };

export class AwardsRepository implements IAwardsRepository {
  async getAwardsPageData(): Promise<AwardsPageData> {
    try {
      const [page, masterAwards] = await Promise.all([
        pageRepository.findBySlug("awards"),
        masterDataRepository.getAwards(),
      ]);

      const heroSec = page?.sections?.find((s) => s.type === "AWARDS_HERO" || s.type === "HERO");
      const criteriaSec = page?.sections?.find(
        (s) => s.type === "AWARDS_CRITERIA" || s.type === "AWARDS_SHOWCASE"
      );
      const processSec = page?.sections?.find((s) => s.type === "AWARDS_PROCESS");

      const hProps = heroSec?.props as Record<string, unknown> | undefined;
      const cProps = criteriaSec?.props as Record<string, unknown> | undefined;
      const pProps = processSec?.props as Record<string, unknown> | undefined;

      // Hạng mục giải thưởng lấy từ Master Data CSDL quan hệ
      let categories = MOCK_AWARDS_DATA.categories;
      if (masterAwards.length > 0 && masterAwards[0].categories.length > 0) {
        categories = masterAwards[0].categories.map((c, i) => ({
          id: c.id,
          order: i + 1,
          title: c.name,
          subtitle: `Hạng mục xét giải số ${i + 1}`,
          description: c.description || "",
          iconName: "Award",
          targetAudience: "Tổ chức, doanh nghiệp, cộng đồng và cá nhân",
        }));
      }

      // Chuẩn hóa và bảo vệ kiểu dữ liệu cho criteriaList (phòng vệ trường hợp thiếu evidenceRequirements)
      let criteriaList = MOCK_AWARDS_DATA.criteriaList;
      if (Array.isArray(cProps?.criteriaList) && cProps.criteriaList.length > 0) {
        criteriaList = (cProps.criteriaList as Array<Record<string, unknown>>).map((c, idx) => {
          const fallback = MOCK_AWARDS_DATA.criteriaList[idx] || MOCK_AWARDS_DATA.criteriaList[0];
          const rawWeight = c.weightPercent ?? c.weight;
          const weightNum =
            typeof rawWeight === "number"
              ? rawWeight
              : typeof rawWeight === "string"
              ? parseInt(rawWeight, 10) || fallback.weightPercent
              : fallback.weightPercent;

          const reqs = Array.isArray(c.evidenceRequirements) && c.evidenceRequirements.length > 0
            ? (c.evidenceRequirements as string[])
            : fallback.evidenceRequirements;

          return {
            id: (c.id as string) || `crit-${c.order || idx + 1}`,
            title: (c.title as string) || fallback.title,
            weightPercent: weightNum,
            description: (c.description as string) || fallback.description,
            evidenceRequirements: reqs,
          };
        });
      }

      // Chuẩn hóa và bảo vệ kiểu dữ liệu cho processSteps
      let processSteps = MOCK_AWARDS_DATA.processSteps;
      if (Array.isArray(pProps?.steps) && pProps.steps.length > 0) {
        processSteps = (pProps.steps as Array<Record<string, unknown>>).map((s, idx) => {
          const fallback = MOCK_AWARDS_DATA.processSteps[idx] || MOCK_AWARDS_DATA.processSteps[0];
          return {
            step: Number(s.step) || idx + 1,
            title: (s.title as string) || (s.name as string) || fallback.title,
            timeframe: (s.timeframe as string) || (s.time as string) || fallback.timeframe,
            description: (s.description as string) || (s.desc as string) || fallback.description,
            actionLabel: (s.actionLabel as string) || fallback.actionLabel,
          };
        });
      }

      return {
        title: (hProps?.title as string) || MOCK_AWARDS_DATA.title,
        englishTitle: (hProps?.englishTitle as string) || MOCK_AWARDS_DATA.englishTitle,
        slogan: (hProps?.slogan as string) || MOCK_AWARDS_DATA.slogan,
        philosophy: (hProps?.philosophy as string) || MOCK_AWARDS_DATA.philosophy,
        rulesVersion: (cProps?.rulesVersion as string) || MOCK_AWARDS_DATA.rulesVersion,
        categories,
        criteriaList,
        processSteps,
        judges: MOCK_AWARDS_DATA.judges,
      };
    } catch {
      return MOCK_AWARDS_DATA;
    }
  }
}

export const awardsRepository = new AwardsRepository();
