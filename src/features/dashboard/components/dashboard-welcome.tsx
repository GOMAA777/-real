import { Calendar } from "lucide-react";

export function DashboardWelcome() {
  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E6DC] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      {/* Title & Subtitle */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight flex items-center gap-2">
          <span>صباح الخير، محمد</span>
          <span className="text-2xl select-none">👋</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#64715F] leading-relaxed font-normal">
          إليك نظرة عامة على نشاط المنصة وإدارة أصحاب العقارات والوحدات الاستثمارية.
        </p>
      </div>

      {/* Date Pill (Sage/Cream capsule with calendar icon) */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#EEF2E6] text-xs font-bold text-[#3E4D39] shrink-0 self-start sm:self-auto select-none border border-transparent">
        <span>اليوم: الثلاثاء 24 أكتوبر 2026</span>
        <Calendar className="w-4 h-4 text-[#5E6D59]" />
      </div>
    </div>
  );
}
