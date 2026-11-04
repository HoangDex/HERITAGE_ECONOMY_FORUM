/**
 * LAYER 4: SERVICE CHO MODULE GIẢI THƯỞNG
 */

import { awardsRepository } from "../repositories/awards.repository";
import type { AwardsPageData, IAwardsService } from "../types/awards.types";

export class AwardsService implements IAwardsService {
  async getAwardsPageData(): Promise<AwardsPageData> {
    return awardsRepository.getAwardsPageData();
  }
}

export const awardsService = new AwardsService();
