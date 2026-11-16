import { z } from "zod";

/**
 * Metadata thời gian chuẩn quốc gia Việt Nam (GMT+7)
 */
export const apiResponseMetaSchema = z.object({
  timestamp: z.string().describe("ISO string múi giờ Việt Nam +07:00"),
  timestampFormatted: z.string().describe("Định dạng DD/MM/YYYY HH:mm:ss"),
  path: z.string().optional(),
  durationMs: z.number().optional(),
  pagination: z
    .object({
      page: z.number().int().min(1),
      limit: z.number().int().min(1),
      total: z.number().int().min(0),
      totalPages: z.number().int().min(0),
      hasNextPage: z.boolean(),
      hasPrevPage: z.boolean(),
    })
    .optional(),
});

export type ApiResponseMeta = z.infer<typeof apiResponseMetaSchema>;

/**
 * Schema phản hồi API chuẩn toàn cục (Global Standard API Response)
 */
export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    statusCode: z.number().int().default(200),
    message: z.string().optional(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    errors: z.record(z.string(), z.array(z.string())).optional(),
    meta: apiResponseMetaSchema,
  });
}

export interface StandardApiResponse<T = unknown> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: ApiResponseMeta;
}

export type ApiResponse<T = unknown> = StandardApiResponse<T>;

/**
 * Query phân trang và tìm kiếm chuẩn toàn cục
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationQueryDTO = z.infer<typeof paginationQuerySchema>;
