import type { StandardApiResponse } from "@/lib/api-response";

export * from "@/lib/api-response";
export * from "@/lib/format-date";

export type ApiResponse<T = unknown> = StandardApiResponse<T>;

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
