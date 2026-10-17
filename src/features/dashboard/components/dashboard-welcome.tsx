import { Calendar } from "lucide-react";

export function DashboardWelcome() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172115] tracking-tight flex items-center gap-2">
          <span>صباح الخير، محمد</span>
          <span className="inline-block animate-wave">👋</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#616E5D]">
          إليك نظرة عامة على نشاط المنصة وإدارة أصحاب العقارات والوحدات الاستثمارية.
        </p>
      </div>

      {/* Date Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E0E4D8] text-xs font-medium text-[#4A5745] shadow-xs shrink-0 self-start sm:self-auto">
        <Calendar className="w-3.5 h-3.5 text-[#6E7D69]" />
        <span>اليوم: الثلاثاء 24 أكتوبر 2026</span>
      </div>
    </div>
  );
}
