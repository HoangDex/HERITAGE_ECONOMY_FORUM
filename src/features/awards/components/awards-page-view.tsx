import { AwardsHero } from "./awards-hero";
import { AwardsCategoriesSection } from "./awards-categories-section";
import { AwardsCriteriaRulesSection } from "./awards-criteria-rules-section";
import { AwardsProcessSection } from "./awards-process-section";
import { AwardsCouncilSection } from "./awards-council-section";
import type { AwardsPageData } from "../types/awards.types";

interface AwardsPageViewProps {
  data: AwardsPageData;
}

export function AwardsPageView({ data }: AwardsPageViewProps) {
  return (
    <div className="space-y-0 pb-16">
      <AwardsHero
        title={data.title}
        englishTitle={data.englishTitle}
        slogan={data.slogan}
        philosophy={data.philosophy}
      />
      <AwardsCategoriesSection categories={data.categories} />
      <AwardsCriteriaRulesSection
        criteriaList={data.criteriaList}
        rulesVersion={data.rulesVersion}
      />
      <AwardsProcessSection steps={data.processSteps} />
      <AwardsCouncilSection judges={data.judges} />
    </div>
  );
}
