import type {
  AwardsPageData,
  AwardCategory,
  AwardCriteria,
  AwardProcessStep,
  AwardJudge,
  AwardActionLink,
} from "../types/awards.types";
import { MOCK_AWARDS_DATA } from "../data/awards-fallback.data";

export function mapAwardsPropsToPageData(
  props: Record<string, unknown> | null | undefined
): AwardsPageData {
  const safeProps = props || {};
  const heroSec = (safeProps.hero || {}) as Record<string, unknown>;
  const categoriesSec = (safeProps.categories || {}) as Record<string, unknown>;
  const criteriaSec = (safeProps.criteria || {}) as Record<string, unknown>;
  const processSec = (safeProps.process || {}) as Record<string, unknown>;
  const councilSec = (safeProps.council || {}) as Record<string, unknown>;

  const heroActions = Array.isArray(heroSec.actions)
    ? (heroSec.actions as AwardActionLink[])
    : [
        { label: "Nộp Hồ Sơ Đề Cử Trực Tuyến", href: "/contact?loai=giai-thuong#contact-form" },
        { label: "Tải Bản Quy Chế Xét Chọn (PDF)", href: "#quy-che" },
      ];

  const rawAwards = Array.isArray(categoriesSec.awards)
    ? (categoriesSec.awards as Array<Record<string, unknown>>)
    : [];
  const categories: AwardCategory[] =
    rawAwards.length > 0
      ? rawAwards.map((item, idx) => ({
          id: String(item.id || `cat-${idx + 1}`),
          order: idx + 1,
          title: String(item.title || item.name || ""),
          subtitle: String(item.subtitle || ""),
          description: String(item.description || ""),
          iconName: String(item.icon || item.iconName || "Award"),
          targetAudience: String(item.target || item.targetAudience || ""),
        }))
      : MOCK_AWARDS_DATA.categories;

  const rawCriteria = Array.isArray(criteriaSec.items)
    ? (criteriaSec.items as Array<Record<string, unknown>>)
    : Array.isArray(criteriaSec.cards)
      ? (criteriaSec.cards as Array<Record<string, unknown>>)
      : [];

  const criteriaList: AwardCriteria[] =
    rawCriteria.length > 0
      ? rawCriteria.map((item, idx) => {
          const fallback =
            MOCK_AWARDS_DATA.criteriaList[idx] || MOCK_AWARDS_DATA.criteriaList[0];
          const weightStr = String(item.weight ?? item.badge ?? "");
          const weightNum = parseInt(weightStr, 10) || fallback.weightPercent;
          const evidences = Array.isArray(item.evidences)
            ? item.evidences.map(String).filter(Boolean)
            : Array.isArray(item.stats)
              ? (item.stats as Array<Record<string, unknown>>)
                  .map((s) => String(s.value || ""))
                  .filter(Boolean)
              : fallback.evidenceRequirements;

          return {
            id: `crit-${idx + 1}`,
            title: String(item.title || fallback.title),
            weightPercent: weightNum,
            description: String(item.description || fallback.description),
            evidenceRequirements: evidences,
          };
        })
      : MOCK_AWARDS_DATA.criteriaList;

  const rawCriteriaAction = criteriaSec.action as AwardActionLink | undefined;
  const criteriaAction: AwardActionLink =
    rawCriteriaAction && rawCriteriaAction.label
      ? rawCriteriaAction
      : {
          label: `Tải Toàn Văn ${String(criteriaSec.note || MOCK_AWARDS_DATA.rulesVersion)}`,
          href: "/awards/the-le-giai-thuong-2026.pdf",
        };

  const rawSteps = Array.isArray(processSec.steps)
    ? (processSec.steps as Array<Record<string, unknown>>)
    : Array.isArray(processSec.cards)
      ? (processSec.cards as Array<Record<string, unknown>>)
      : [];

  const processSteps: AwardProcessStep[] =
    rawSteps.length > 0
      ? rawSteps.map((step, idx) => {
          const fallback =
            MOCK_AWARDS_DATA.processSteps[idx] || MOCK_AWARDS_DATA.processSteps[0];
          return {
            step: idx + 1,
            title: String(step.title || fallback.title),
            timeframe: String(step.time || step.badge || step.subtitle || fallback.timeframe),
            description: String(step.description || fallback.description),
            actionLabel: step.actionLabel ? String(step.actionLabel) : fallback.actionLabel,
          };
        })
      : MOCK_AWARDS_DATA.processSteps;

  const rawMembers = Array.isArray(councilSec.members)
    ? (councilSec.members as Array<Record<string, unknown>>)
    : [];
  const judges: AwardJudge[] =
    rawMembers.length > 0
      ? rawMembers.map((m, idx) => ({
          id: String(m.id || `judge-${idx + 1}`),
          name: String(m.name || ""),
          title: String(m.title || ""),
          organization: String(m.organization || ""),
          avatarUrl: String(
            m.avatar ||
              m.avatarUrl ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
          ),
          role: String(m.role || "Thành viên Thường trực"),
        }))
      : MOCK_AWARDS_DATA.judges;

  return {
    title: String(heroSec.title || MOCK_AWARDS_DATA.title),
    englishTitle: String(heroSec.subtitle || heroSec.subBadge || MOCK_AWARDS_DATA.englishTitle),
    slogan: String(heroSec.quote || MOCK_AWARDS_DATA.slogan),
    philosophy: String(heroSec.description || MOCK_AWARDS_DATA.philosophy),
    heroActions,
    categoriesTitle: String(categoriesSec.title || "08 Hạng Mục Xét Chọn Tham Khảo"),
    categoriesDescription: String(
      categoriesSec.description ||
        "Bao quát toàn diện các khía cạnh từ sáng kiến khoa học, mô hình kinh doanh di sản, ứng dụng công nghệ, đóng góp cộng đồng cho tới thành tựu cống hiến trọn đời."
    ),
    categories,
    criteriaTitle: String(criteriaSec.title || "Khung Đánh Giá Định Lượng"),
    criteriaDescription: String(
      criteriaSec.description ||
        "Bộ tiêu chí 4 trụ cột với tỷ trọng đánh giá minh bạch, được Hội đồng Khoa học phê duyệt."
    ),
    criteriaAction,
    rulesVersion: String(criteriaSec.note || MOCK_AWARDS_DATA.rulesVersion),
    criteriaList,
    processTitle: String(processSec.title || "Sơ Đồ 07 Bước Đánh Giá Minh Bạch"),
    processDescription: String(
      processSec.description ||
        "Quy trình khép kín đảm bảo tính độc lập, khách quan từ khâu tiếp nhận hồ sơ, thẩm định chuyên ngành, khảo sát thực tế đến công bố vinh danh."
    ),
    processSteps,
    councilTitle: String(councilSec.title || "Hội Đồng Thẩm Định Giải Thưởng"),
    councilDescription: String(
      councilSec.description ||
        "Hội đồng giám khảo độc lập quy tụ các nhà khoa học, chuyên gia bảo tồn hàng đầu và đại diện tổ chức quốc tế uy tín, bảo đảm tính khách quan, khoa học và minh bạch cao nhất."
    ),
    judges,
  };
}
