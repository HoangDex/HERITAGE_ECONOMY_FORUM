/**
 * UTILITY: CHUẨN HÓA ĐỊNH DẠNG API REQUEST & RESPONSE
 * Cung cấp schema cấu trúc dữ liệu phản hồi thống nhất cho toàn bộ hệ thống fullstack
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { formatDateTimeVN, getVietnamISOString } from "./format-date";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponseMeta {
  timestamp: string; // ISO string với múi giờ VN (+07:00)
  timestampFormatted: string; // "DD/MM/YYYY HH:mm:ss"
  path?: string;
  durationMs?: number;
  pagination?: PaginationMeta;
}

/**
 * Cấu trúc Response tiêu chuẩn của API
 */
export interface StandardApiResponse<T = unknown> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: ApiResponseMeta;
}

/**
 * Helper tạo metadata chuẩn thời gian Việt Nam
 */
function createMeta(extra?: Partial<ApiResponseMeta>): ApiResponseMeta {
  const now = new Date();
  return {
    timestamp: getVietnamISOString(now),
    timestampFormatted: formatDateTimeVN(now),
    ...extra,
  };
}

/**
 * Trả về Response thành công (HTTP 200/201)
 */
export function apiSuccess<T>(
  data: T,
  options?: {
    message?: string;
    statusCode?: number;
    meta?: Partial<ApiResponseMeta>;
    headers?: HeadersInit;
  }
): NextResponse<StandardApiResponse<T>> {
  const statusCode = options?.statusCode || 200;
  const payload: StandardApiResponse<T> = {
    success: true,
    statusCode,
    message: options?.message,
    data,
    meta: createMeta(options?.meta),
  };

  return NextResponse.json(payload, {
    status: statusCode,
    headers: options?.headers,
  });
}

/**
 * Trả về Response phân trang thành công (HTTP 200)
 */
export function apiPaginated<T>(
  items: T[],
  pagination: { page: number; limit: number; total: number },
  options?: {
    message?: string;
    headers?: HeadersInit;
  }
): NextResponse<StandardApiResponse<T[]>> {
  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit) || 1;

  const payload: StandardApiResponse<T[]> = {
    success: true,
    statusCode: 200,
    message: options?.message,
    data: items,
    meta: createMeta({
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }),
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: options?.headers,
  });
}

/**
 * Trả về Response lỗi (HTTP 4xx / 5xx)
 */
export function apiError(
  error: string,
  statusCode = 400,
  options?: {
    message?: string;
    errors?: Record<string, string[]>;
    headers?: HeadersInit;
  }
): NextResponse<StandardApiResponse<null>> {
  const payload: StandardApiResponse<null> = {
    success: false,
    statusCode,
    error,
    message: options?.message || error,
    errors: options?.errors,
    data: null,
    meta: createMeta(),
  };

  return NextResponse.json(payload, {
    status: statusCode,
    headers: options?.headers,
  });
}

/**
 * Format lỗi Zod Validation thành field-level errors chuẩn hóa
 */
export function apiValidationError(zodError: z.ZodError): NextResponse<StandardApiResponse<null>> {
  const errors: Record<string, string[]> = {};

  zodError.issues.forEach((issue) => {
    const field = issue.path.join(".") || "general";
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(issue.message);
  });

  const firstMessage = zodError.issues[0]?.message || "Dữ liệu yêu cầu không hợp lệ";

  return apiError(firstMessage, 422, {
    message: "Lỗi xác thực dữ liệu đầu vào",
    errors,
  });
}
