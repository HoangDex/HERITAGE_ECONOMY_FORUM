/**
 * LAYER 2: ZOD VALIDATION SCHEMAS CHO MODULE ABOUT
 * Kiểm tra dữ liệu đầu vào khi truy vấn và thao tác nhân sự, đối tác
 */

import { z } from "zod";

export const councilFilterSchema = z.object({
  role: z.enum(["PRESIDENT", "VICE_PRESIDENT", "COUNCIL_MEMBER", "SCIENTIFIC_ADVISOR"]).optional(),
  expertiseField: z.string().optional(),
  search: z.string().max(100).optional(),
});

export type CouncilFilterInput = z.infer<typeof councilFilterSchema>;

export const partnerCategorySchema = z.enum([
  "ALL",
  "STEERING",
  "HOSTING",
  "ORGANIZING",
  "COMPANION",
  "STRATEGIC",
  "MEDIA",
]);

export type PartnerCategoryFilter = z.infer<typeof partnerCategorySchema>;

export const partnerFilterSchema = z.object({
  category: partnerCategorySchema.default("ALL"),
  search: z.string().max(100).optional(),
});

export type PartnerFilterInput = z.infer<typeof partnerFilterSchema>;

export const personDetailQuerySchema = z.object({
  id: z.string().min(1, "ID nhân sự không được để trống"),
});

export type PersonDetailQueryInput = z.infer<typeof personDetailQuerySchema>;
