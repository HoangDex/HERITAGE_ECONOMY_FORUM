import { z } from "zod";
import { universalSectionPropsSchema } from "../page.schema";
import {
  AWARDS_SECTION_SCHEMAS,
  AwardsPagePropsRequestSchema,
} from "./awards.contract";
import {
  CONTACT_SECTION_SCHEMAS,
  ContactPagePropsRequestSchema,
} from "./contact.contract";
import {
  NEWS_SECTION_SCHEMAS,
  NewsPagePropsRequestSchema,
} from "./news.contract";

export * from "./awards.contract";
export * from "./contact.contract";
export * from "./news.contract";

/**
 * Bản đồ khóa hợp đồng toàn trang cho 3 trang đã chốt schema: awards, contact, news.
 */
export const PAGE_PROPS_CONTRACT_MAP: Record<string, z.ZodTypeAny> = {
  awards: AwardsPagePropsRequestSchema,
  contact: ContactPagePropsRequestSchema,
  news: NewsPagePropsRequestSchema,
};

/**
 * Bản đồ khóa hợp đồng cho từng section riêng lẻ: /api/[page]/[section].
 */
export const PAGE_SECTION_CONTRACT_MAP: Record<
  string,
  Record<string, z.ZodTypeAny>
> = {
  awards: AWARDS_SECTION_SCHEMAS,
  contact: CONTACT_SECTION_SCHEMAS,
  news: NEWS_SECTION_SCHEMAS,
};

export function validatePagePropsContract(
  pageSlug: string,
  props: unknown
): { hasContract: boolean; success: boolean; data?: unknown; error?: z.ZodError } {
  const cleanSlug = pageSlug.toLowerCase().trim();
  const schema = PAGE_PROPS_CONTRACT_MAP[cleanSlug];
  if (!schema) {
    return { hasContract: false, success: true, data: props };
  }
  const result = schema.safeParse(props);
  if (!result.success) {
    return { hasContract: true, success: false, error: result.error };
  }
  return { hasContract: true, success: true, data: result.data };
}

export function validateSectionPropsContract(
  pageSlug: string,
  sectionKey: string,
  payload: unknown,
  isPartial = false
): {
  hasContract: boolean;
  unknownSection?: string;
  allowedSections?: string[];
  success: boolean;
  data?: unknown;
  error?: z.ZodError;
} {
  const cleanSlug = pageSlug.toLowerCase().trim();
  const sectionMap = PAGE_SECTION_CONTRACT_MAP[cleanSlug];

  if (sectionMap) {
    const allowedSections = Object.keys(sectionMap);
    const schema = sectionMap[sectionKey];
    if (!schema) {
      return {
        hasContract: true,
        unknownSection: sectionKey,
        allowedSections,
        success: false,
      };
    }

    const effectiveSchema =
      isPartial && schema instanceof z.ZodObject
        ? schema.partial().strict()
        : schema;

    const result = effectiveSchema.safeParse(payload);
    if (!result.success) {
      return { hasContract: true, success: false, error: result.error };
    }
    return { hasContract: true, success: true, data: result.data };
  }

  // Các trang chưa khóa hợp đồng (home, about, forum, projects) dùng schema chung
  const fallbackResult = universalSectionPropsSchema.safeParse(payload);
  if (!fallbackResult.success) {
    return { hasContract: false, success: false, error: fallbackResult.error };
  }
  return { hasContract: false, success: true, data: fallbackResult.data };
}
