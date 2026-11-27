/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE GIẢI THƯỞNG
 * Đọc `page.props` theo cấu trúc 5 section: hero, categories, criteria, process, council.
 */

import type { AwardsPageData, IAwardsRepository } from "../types/awards.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { MOCK_AWARDS_DATA } from "../data/awards-fallback.data";
import { mapAwardsPropsToPageData } from "../data/awards-mapper";

export { MOCK_AWARDS_DATA, mapAwardsPropsToPageData };

export class AwardsRepository implements IAwardsRepository {
  async getAwardsPageData(): Promise<AwardsPageData> {
    try {
      const page = await pageRepository.findBySlug("awards");
      if (page?.props) {
        return mapAwardsPropsToPageData(page.props);
      }
    } catch {
      // Fallback
    }
    return MOCK_AWARDS_DATA;
  }
}

export const awardsRepository = new AwardsRepository();
