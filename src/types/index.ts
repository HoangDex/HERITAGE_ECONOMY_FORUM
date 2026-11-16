export * from "./api";
export {
  apiSuccess,
  apiError,
  apiPaginated,
  apiValidationError,
} from "@/lib/api-response";
export * from "@/lib/format-date";

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
