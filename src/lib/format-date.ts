/**
 * UTILITY: ĐỊNH DẠNG NGÀY GIỜ CHUẨN VIỆT NAM (GMT+7 - Asia/Ho_Chi_Minh)
 * Xử lý nhất quán định dạng thời gian cho API Response, UI và Database
 */

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

/**
 * Định dạng ngày và giờ đầy đủ: "DD/MM/YYYY HH:mm:ss"
 * Ví dụ: "03/11/2026 14:30:45"
 */
export function formatDateTimeVN(
  dateInput: Date | string | number | null | undefined,
  includeSeconds = true
): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const options: Intl.DateTimeFormatOptions = {
    timeZone: VIETNAM_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...(includeSeconds ? { second: "2-digit" } : {}),
    hour12: false,
  };

  return new Intl.DateTimeFormat("vi-VN", options).format(date);
}

/**
 * Định dạng ngày: "DD/MM/YYYY"
 * Ví dụ: "03/11/2026"
 */
export function formatDateVN(dateInput: Date | string | number | null | undefined): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: VIETNAM_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Định dạng giờ: "HH:mm:ss"
 * Ví dụ: "14:30:45"
 */
export function formatTimeVN(
  dateInput: Date | string | number | null | undefined,
  includeSeconds = true
): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: VIETNAM_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    ...(includeSeconds ? { second: "2-digit" } : {}),
    hour12: false,
  }).format(date);
}

/**
 * Định dạng thời gian tương đối theo tiếng Việt (Relative Time)
 * Ví dụ: "vừa xong", "5 phút trước", "2 giờ trước", "hôm qua lúc 10:15"
 */
export function formatRelativeTimeVN(dateInput: Date | string | number | null | undefined): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "vừa xong";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return `hôm qua lúc ${formatTimeVN(date, false)}`;
  }

  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }

  return formatDateVN(date);
}

/**
 * Trả về chuỗi ISO có gắn múi giờ Việt Nam (+07:00)
 */
export function getVietnamISOString(dateInput: Date = new Date()): string {
  const tzOffset = 7 * 60; // phút
  const localDate = new Date(dateInput.getTime() + tzOffset * 60 * 1000);
  return localDate.toISOString().replace("Z", "+07:00");
}
