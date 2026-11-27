/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE GIẢI THƯỞNG (AWARDS)
 * Theo Đề án Mục 08. GIẢI THƯỞNG – AWARDS
 */

export interface AwardCategory {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  targetAudience: string;
}

export interface AwardCriteria {
  id: string;
  title: string;
  weightPercent: number;
  description: string;
  evidenceRequirements: string[];
}

export interface AwardProcessStep {
  step: number;
  title: string;
  timeframe: string;
  description: string;
  actionLabel?: string;
}

export interface AwardActionLink {
  label: string;
  href: string;
}

export interface AwardJudge {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatarUrl: string;
  role: "Chủ tịch Hội đồng" | "Phó Chủ tịch" | "Thành viên Thường trực" | "Chuyên gia Thẩm định" | string;
}

export interface AwardsPageData {
  title: string;
  englishTitle: string;
  slogan: string;
  philosophy: string;
  heroActions?: AwardActionLink[];
  categoriesTitle?: string;
  categoriesDescription?: string;
  categories: AwardCategory[];
  criteriaTitle?: string;
  criteriaDescription?: string;
  criteriaAction?: AwardActionLink;
  rulesVersion: string;
  criteriaList: AwardCriteria[];
  processTitle?: string;
  processDescription?: string;
  processSteps: AwardProcessStep[];
  councilTitle?: string;
  councilDescription?: string;
  judges: AwardJudge[];
}

export interface IAwardsRepository {
  getAwardsPageData(): Promise<AwardsPageData>;
}

export interface IAwardsService {
  getAwardsPageData(): Promise<AwardsPageData>;
}
