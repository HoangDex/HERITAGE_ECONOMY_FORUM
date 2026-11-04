/**
 * LAYER 4: BUSINESS LOGIC / SERVICE CHO KỲ DIỄN ĐÀN (FORUM EDITIONS)
 */

import { forumEditionRepository } from "../repositories/forum-edition.repository";
import type { ForumEdition, IForumService } from "../types/forum-edition.types";

export class ForumService implements IForumService {
  async getActiveEdition(): Promise<ForumEdition> {
    const edition = await forumEditionRepository.getEditionByYear(2026);
    if (!edition) {
      throw new Error("Không tìm thấy dữ liệu kỳ diễn đàn hiện tại");
    }
    return edition;
  }

  async getEdition(year: number): Promise<ForumEdition | null> {
    return forumEditionRepository.getEditionByYear(year);
  }

  async getAllEditions(): Promise<ForumEdition[]> {
    return forumEditionRepository.getAllEditions();
  }
}

export const forumService = new ForumService();
