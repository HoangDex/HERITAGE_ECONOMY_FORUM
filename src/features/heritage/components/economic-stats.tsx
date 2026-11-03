import { Landmark, TrendingUp, Briefcase, Award } from "lucide-react";

export function EconomicStats() {
  const stats = [
    {
      label: "Di sản & Làng nghề được số hóa",
      value: "120+",
      change: "+24% năm 2026",
      icon: Landmark,
    },
    {
      label: "Quy mô Kinh tế Di sản ước tính",
      value: "1.2 Tỷ USD",
      change: "Đóng góp 3.8% GRDP",
      icon: TrendingUp,
    },
    {
      label: "Việc làm bản địa được bảo tồn",
      value: "45.000+",
      change: "85% thu nhập ổn định",
      icon: Briefcase,
    },
    {
      label: "Dự án Hợp tác Công - Tư (PPP)",
      value: "38",
      change: "100% tái đầu tư trùng tu",
      icon: Award,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="p-5 rounded-xl border bg-card text-card-foreground shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-foreground">{item.value}</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">{item.change}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
