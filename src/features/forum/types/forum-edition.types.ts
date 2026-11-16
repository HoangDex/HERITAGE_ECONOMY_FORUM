/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO KỲ DIỄN ĐÀN (FORUM EDITIONS)
 * Tuân thủ tuyệt đối Đề án Mục 07. DIỄN ĐÀN – FORUM
 */

export type ForumEditionStatus = "upcoming" | "ongoing" | "concluded";

export interface Speaker {
  id: string;
  name: string;
  degree?: string; // Học hàm / học vị: GS.TS, PGS.TS, TS
  title: string; // Chức danh / chức vụ
  organization: string; // Đơn vị công tác
  avatarUrl: string; // Tỉ lệ 4:5
  bio: string;
  sessionTitle: string;
  topicSummary: string;
  slug: string;
}

export interface ForumSession {
  id: string;
  order: number;
  title: string;
  subTitle: string;
  description: string;
  timeRange: string;
  date: string;
  room: string;
  speakers: Speaker[];
}

export interface ForumTimelineSlot {
  id: string;
  period: "morning" | "afternoon";
  time: string;
  title: string;
  speakerOrChair: string;
  room: string;
  sessionOrder: number;
}

export interface ForumResource {
  id: string;
  title: string;
  type: "pdf" | "doc" | "video" | "report";
  fileSize: string;
  downloadUrl: string;
  isRestricted?: boolean;
  category: "ky-yeu" | "chuong-trinh" | "tham-luan" | "bao-cao";
}

export interface ForumGalleryItem {
  id: string;
  type: "photo" | "video";
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface ForumEdition {
  id: string;
  slug: string; // "2026", "2025"
  year: number;
  title: string;
  theme: string;
  datesText: string;
  startDateIso: string; // Asia/Ho_Chi_Minh (GMT+7)
  endDateIso: string; // Asia/Ho_Chi_Minh (GMT+7)
  isDateConfirmed: boolean; // false nếu là kế hoạch dự kiến chờ xác nhận chính thức
  venueName: string;
  venueAddress: string;
  scaleDescription: string;
  organizer: string;
  status: ForumEditionStatus;
  outcomesSummary?: string; // Dành riêng cho kỳ đã kết thúc (kết quả, tuyên bố chung)
  sessions: ForumSession[];
  timeline: ForumTimelineSlot[];
  speakers: Speaker[];
  resources: ForumResource[];
  gallery?: ForumGalleryItem[];
}

export interface IForumRepository {
  getEditionByYear(year: number): Promise<ForumEdition | null>;
  getAllEditions(): Promise<ForumEdition[]>;
}

export interface IForumService {
  getActiveEdition(): Promise<ForumEdition>;
  getEdition(year: number): Promise<ForumEdition | null>;
  getAllEditions(): Promise<ForumEdition[]>;
}
