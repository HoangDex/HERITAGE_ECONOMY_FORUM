/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO KỲ DIỄN ĐÀN (FORUM EDITIONS)
 * Theo Đề án Mục 07. DIỄN ĐÀN – FORUM
 */

export type ForumEditionStatus = "upcoming" | "ongoing" | "concluded";

export interface Speaker {
  id: string;
  name: string;
  degree?: string; // Học hàm / học vị: GS.TS, PGS.TS, TS
  title: string; // Chức vụ
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

export interface ForumEdition {
  id: string;
  slug: string; // "2026", "2025"
  year: number;
  title: string;
  theme: string;
  datesText: string;
  venueName: string;
  venueAddress: string;
  scaleDescription: string;
  organizer: string;
  status: ForumEditionStatus;
  sessions: ForumSession[];
  timeline: ForumTimelineSlot[];
  speakers: Speaker[];
  resources: ForumResource[];
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
