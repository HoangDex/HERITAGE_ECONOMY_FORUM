/**
 * BARREL EXPORT CHO MODULE AWARDS (GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG CHỦ ĐỘNG)
 * Tuân thủ Clean Architecture: Chỉ công khai Service, Types và Presentation Components
 * Ranh giới nội bộ Data Access được bảo vệ khép kín
 */

// Layer 1: Types & Entities
export type {
  AwardCategory,
  AwardCriteria,
  AwardProcessStep,
  AwardJudge,
  AwardsPageData,
  IAwardsService,
} from "./types/awards.types";

// Layer 4: Service
export { awardsService } from "./services/awards.service";

// Layer 6B: Presentation Components
export { AwardsHero } from "./components/awards-hero";
export { AwardsCategoriesSection } from "./components/awards-categories-section";
export { AwardsCriteriaRulesSection } from "./components/awards-criteria-rules-section";
export { AwardsProcessSection } from "./components/awards-process-section";
export { AwardsCouncilSection } from "./components/awards-council-section";
export { AwardsPageView } from "./components/awards-page-view";
