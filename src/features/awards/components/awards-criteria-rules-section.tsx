import { FileText, CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AwardCriteria } from "../types/awards.types";

interface AwardsCriteriaRulesSectionProps {
  criteriaList: AwardCriteria[];
  rulesVersion: string;
}

export function AwardsCriteriaRulesSection({
  criteriaList,
  rulesVersion,
}: AwardsCriteriaRulesSectionProps) {
  return (
    <section id="quy-che" className="py-14 bg-white/70 border-y border-[#dfd7c8] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C29B57]/15 text-[#76232D]">
              Bộ Tiêu Chí & Quy Chế
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
              Khung Đánh Giá Định Lượng
            </h2>
            <p className="text-[#5c554b] max-w-2xl text-base">
              Bộ tiêu chí 4 trụ cột với tỷ trọng đánh giá minh bạch, được Hội đồng Khoa học phê
              duyệt.
            </p>
          </div>

          <div className="shrink-0">
            <Button className="bg-[#76232D] hover:bg-[#76232D]/90 text-white gap-2 font-medium">
              <Download className="w-4 h-4" />
              Tải Toàn Văn {rulesVersion}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteriaList.map((crit) => (
            <div
              key={crit.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-[#dfd7c8] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[#292929] leading-snug">{crit.title}</h3>
                <Badge className="bg-[#76232D] text-white font-bold text-sm px-3 py-1">
                  {crit.weightPercent}%
                </Badge>
              </div>

              <p className="text-sm text-[#5c554b] leading-relaxed">{crit.description}</p>

              <div className="pt-3 border-t border-[#dfd7c8]/60 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#76232D] block">
                  Yêu cầu hồ sơ minh chứng:
                </span>
                <ul className="space-y-1.5">
                  {crit.evidenceRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#292929]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#F5EFE5] border border-[#dfd7c8] flex items-center justify-between flex-wrap gap-3 text-xs text-[#5c554b]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#76232D] shrink-0" />
            <span>
              Văn bản áp dụng: <strong>{rulesVersion}</strong>. Mọi sửa đổi phải được Hội đồng công
              bố trước kỳ đề cử 30 ngày.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
