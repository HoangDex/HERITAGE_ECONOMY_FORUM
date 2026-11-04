/**
 * BARREL EXPORT CHO MODULE CONTACT (LIÊN HỆ & TIẾP NHẬN YÊU CẦU)
 * Tuân thủ Clean Architecture: Chỉ công khai Service, Schemas, Types và Presentation Components
 * Ranh giới nội bộ Data Access được bảo vệ khép kín
 */

// Layer 1: Types & Entities
export type {
  ContactRequestType,
  ContactInfo,
  ContactFaq,
  ContactPageData,
  IContactService,
} from "./types/contact.types";

// Layer 2: Schemas
export { contactRequestSchema } from "./schemas/contact.schema";
export type { ContactRequestInput } from "./schemas/contact.schema";

// Layer 4: Service
export { contactService } from "./services/contact.service";

// Layer 6B: Presentation Components
export { ContactForm } from "./components/contact-form";
export { ContactInfoSection } from "./components/contact-info-section";
export { ContactPageView } from "./components/contact-page-view";
