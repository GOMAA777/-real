import { Calendar } from "lucide-react";

export function DashboardWelcome() {
  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 border border-[#DCE2D7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-cairo">
      {/* Title & Subtitle on Right in RTL */}
      <div className="space-y-1.5">
        <h1 className="text-xl sm:text-2xl font-bold text-[#252A24] tracking-tight flex items-center gap-2">
          <span>صباح الخير، محمد</span>
          <span className="text-xl sm:text-2xl select-none">👋</span>
        </h1>
        <p className="text-xs text-[#687163] leading-relaxed font-normal">
          إليك نظرة عامة على نشاط المنصة وإدارة أصحاب العقارات والوحدات الاستثمارية.
        </p>
      </div>

      {/* Date Pill on Left in RTL: Icon on Right, Text on Left */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#EBF0E6] text-xs font-semibold text-[#252A24] border border-[#CCD4C6]/50 shrink-0 self-start sm:self-auto select-none">
        <Calendar className="w-4 h-4 text-[#4B5940] shrink-0" />
        <span>اليوم، الثلاثاء 24 أكتوبر 2026</span>
      </div>
    </div>
  );
}
