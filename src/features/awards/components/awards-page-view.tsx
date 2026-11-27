"use client";

import { useState, useEffect } from "react";
import { AwardsHero } from "./awards-hero";
import { AwardsCategoriesSection } from "./awards-categories-section";
import { AwardsCriteriaRulesSection } from "./awards-criteria-rules-section";
import { AwardsProcessSection } from "./awards-process-section";
import { AwardsCouncilSection } from "./awards-council-section";
import { mapAwardsPropsToPageData } from "../data/awards-mapper";
import type { AwardsPageData } from "../types/awards.types";

interface AwardsPageViewProps {
  data: AwardsPageData;
}

export function AwardsPageView({ data: initialData }: AwardsPageViewProps) {
  const [data, setData] = useState<AwardsPageData>(initialData);

  // Đồng bộ trực tiếp dữ liệu từ API GET /api/pages/awards
  useEffect(() => {
    let isMounted = true;
    async function fetchAwardsPageApi() {
      try {
        const res = await fetch("/api/pages/awards");
        if (!res.ok) return;
        const json = await res.json();
        const props = json?.data?.props;
        if (!isMounted || !props) return;
        setData(mapAwardsPropsToPageData(props));
      } catch {
        // Giữ nguyên dữ liệu SSR nếu lỗi mạng
      }
    }
    fetchAwardsPageApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-0 pb-16">
      <AwardsHero
        title={data.title}
        englishTitle={data.englishTitle}
        slogan={data.slogan}
        philosophy={data.philosophy}
        actions={data.heroActions}
      />
      <AwardsCategoriesSection
        title={data.categoriesTitle}
        description={data.categoriesDescription}
        categories={data.categories}
      />
      <AwardsCriteriaRulesSection
        title={data.criteriaTitle}
        description={data.criteriaDescription}
        action={data.criteriaAction}
        criteriaList={data.criteriaList}
        rulesVersion={data.rulesVersion}
      />
      <AwardsProcessSection
        title={data.processTitle}
        description={data.processDescription}
        steps={data.processSteps}
      />
      <AwardsCouncilSection
        title={data.councilTitle}
        description={data.councilDescription}
        judges={data.judges}
      />
    </div>
  );
}
