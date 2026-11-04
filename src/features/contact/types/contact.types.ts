/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE LIÊN HỆ (CONTACT)
 * Theo Đề án Mục 11. LIÊN HỆ – CONTACT
 */

export type ContactRequestType =
  | "tham-du"
  | "dien-gia"
  | "hop-tac"
  | "tai-tro"
  | "du-an"
  | "giai-thuong"
  | "truyen-thong"
  | "khac";

export interface ContactInfo {
  secretariatTitle: string;
  address: string;
  hotline: string;
  email: string;
  workingHours: string;
}

export interface ContactFaq {
  question: string;
  answer: string;
}

export interface ContactPageData {
  title: string;
  slogan: string;
  description: string;
  info: ContactInfo;
  faqs: ContactFaq[];
}

export interface IContactRepository {
  getContactPageData(): Promise<ContactPageData>;
}

export interface IContactService {
  getContactPageData(): Promise<ContactPageData>;
  submitContact(
    data: unknown
  ): Promise<{ success: boolean; message: string; trackingCode?: string }>;
}
