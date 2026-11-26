/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE GIẢI THƯỞNG
 * Đọc `page.props` (hero, categories, criteria, process, cta)
 * và giải tham chiếu mảng `ids: string[]` trong `props.categories.ids` sang danh mục AwardCategory.
 */

import type { AwardsPageData, IAwardsRepository } from "../types/awards.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";

import { MOCK_AWARDS_DATA } from "../data/awards-fallback.data";
export { MOCK_AWARDS_DATA };

export class AwardsRepository implements IAwardsRepository {
  async getAwardsPageData(): Promise<AwardsPageData> {
    try {
      const page = await pageRepository.findBySlug("awards");
      const props = page?.props || {};

      const heroSec = props.hero || {};
      const categoriesSec = props.categories || {};
      const criteriaSec = props.criteria || {};
      const processSec = props.process || {};

      // 1. Giải tham chiếu `ids` của các hạng mục giải thưởng (props.categories.ids)
      const categoryIds = Array.isArray(categoriesSec.ids) ? categoriesSec.ids : [];
      const resolvedCategories = await masterDataRepository.getAwardCategoriesByIds(categoryIds);

      const categories =
        resolvedCategories.length > 0
          ? resolvedCategories.map((c, i) => {
              const fallbackCat =
                MOCK_AWARDS_DATA.categories[i] || MOCK_AWARDS_DATA.categories[0];
              return {
                id: c.id,
                order: i + 1,
                title: c.name,
                subtitle: `Hạng mục xét giải số 0${i + 1}`,
                description: fallbackCat?.description || "",
                iconName: fallbackCat?.iconName || "Award",
                targetAudience:
                  fallbackCat?.targetAudience ||
                  "Tổ chức, doanh nghiệp, cộng đồng và cá nhân",
              };
            })
          : MOCK_AWARDS_DATA.categories;

      // 2. Map criteria từ `props.criteria.cards`
      const criteriaCards = Array.isArray(criteriaSec.cards) ? criteriaSec.cards : [];
      const criteriaList =
        criteriaCards.length > 0
          ? criteriaCards.map((card, idx) => {
              const fallback =
                MOCK_AWARDS_DATA.criteriaList[idx] || MOCK_AWARDS_DATA.criteriaList[0];
              const weightNum = parseInt(String(card.badge || ""), 10) || fallback.weightPercent;
              const evidenceReqs =
                Array.isArray(card.stats) && card.stats.length > 0
                  ? card.stats.map((st) => st.value).filter(Boolean)
                  : fallback.evidenceRequirements;

              return {
                id: `crit-${idx + 1}`,
                title: card.title || fallback.title,
                weightPercent: weightNum,
                description: card.description || fallback.description,
                evidenceRequirements: evidenceReqs,
              };
            })
          : MOCK_AWARDS_DATA.criteriaList;

      // 3. Map processSteps từ `props.process.cards`
      const processCards = Array.isArray(processSec.cards) ? processSec.cards : [];
      const processSteps =
        processCards.length > 0
          ? processCards.map((card, idx) => {
              const fallback =
                MOCK_AWARDS_DATA.processSteps[idx] || MOCK_AWARDS_DATA.processSteps[0];
              return {
                step: idx + 1,
                title: card.title || fallback.title,
                timeframe: card.badge || card.subtitle || fallback.timeframe,
                description: card.description || fallback.description,
                actionLabel: card.actionLabel || fallback.actionLabel,
              };
            })
          : MOCK_AWARDS_DATA.processSteps;

      return {
        title: heroSec.title || MOCK_AWARDS_DATA.title,
        englishTitle: heroSec.subBadge || MOCK_AWARDS_DATA.englishTitle,
        slogan: heroSec.quote || MOCK_AWARDS_DATA.slogan,
        philosophy: heroSec.description || MOCK_AWARDS_DATA.philosophy,
        rulesVersion: criteriaSec.note || MOCK_AWARDS_DATA.rulesVersion,
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
