/**
 * BARREL EXPORT CHO MODULE ABOUT (GIỚI THIỆU - MỤC 06)
 * Tuân thủ Clean Architecture: Chỉ công khai Service, Actions, Types, Hooks và Presentation Components
 * Ranh giới nội bộ Data Access được đóng gói khép kín
 */

// Layer 1: Types & Entities
export type {
  Person,
  ExecutiveDepartment,
  PartnerOrganization,
  VisionMission,
  CoreValue,
  AboutPageData,
  AcademicTitle,
  CouncilRole,
  ExecutiveRole,
  ExecutiveDepartmentCode,
  PartnerCategory,
  IAboutService,
} from "./types/about.types";

// Layer 2: Schemas
export {
  councilFilterSchema,
  partnerFilterSchema,
  personDetailQuerySchema,
} from "./schemas/about.schema";
export type {
  CouncilFilterInput,
  PartnerFilterInput,
  PersonDetailQueryInput,
} from "./schemas/about.schema";

// Layer 4: Service
export { aboutService } from "./services/about.service";

// Layer 5A: Server Actions
export {
  getAboutPageDataAction,
  getPersonDetailAction,
  getPartnersByCategoryAction,
} from "./actions/about.actions";

// Layer 6A: React Client Hook
export { useAbout } from "./hooks/use-about";
export type { AboutTab } from "./hooks/use-about";

// Layer 6B: Presentation Components
export { AboutBanner } from "./components/about-banner";
export { VisionMissionSection } from "./components/vision-mission-section";
export { CouncilSection } from "./components/council-section";
export { ExecutiveSection } from "./components/executive-section";
export { PartnersSection } from "./components/partners-section";
export { PersonDetailDialog } from "./components/person-detail-dialog";
export { AboutPageView } from "./components/about-page-view";
