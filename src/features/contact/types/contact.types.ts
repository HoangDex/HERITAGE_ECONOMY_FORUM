/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE LIÊN HỆ (CONTACT)
 * Theo Đề án Mục 11. LIÊN HỆ – CONTACT
 */

export type ContactRequestType = string;

export interface ContactInfo {
  title: string;
  address: string;
  hotline: string;
  email: string;
  workingHours: string;
}

export interface ContactFaq {
  question: string;
  answer: string;
}

export interface ContactFormFieldConfig {
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface ContactFormConfig {
  title: string;
  description: string;
  consentText: string;
  submitLabel: string;
  fields: {
    type: ContactFormFieldConfig;
    fullName: ContactFormFieldConfig;
    organization: ContactFormFieldConfig;
    position: ContactFormFieldConfig;
    phone: ContactFormFieldConfig;
    email: ContactFormFieldConfig;
    message: ContactFormFieldConfig;
  };
}

export interface ContactPageData {
  badge?: string;
  title: string;
  slogan: string;
  description: string;
  info: ContactInfo;
  faqTitle: string;
  faqs: ContactFaq[];
  form: ContactFormConfig;
}

export interface IContactRepository {
  getContactPageData(): Promise<ContactPageData>;
}

export interface IContactService {
  getContactPageData(): Promise<ContactPageData>;
  submitContact(
    data: unknown
  ): Promise<{
    success: boolean;
    message: string;
    trackingCode?: string;
  }>;
}
