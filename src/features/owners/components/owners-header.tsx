import { Plus, Upload } from "lucide-react";

export function OwnersHeader() {
  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#E2E6DC] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xs">
      {/* Title & Subtitle */}
      <div className="space-y-1 text-start">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172115] tracking-tight">
          إدارة أصحاب العقارات
        </h1>
        <p className="text-xs sm:text-sm text-[#7D8A78]">
          إدارة ومتابعة جميع أصحاب العقارات المسجلين وتراخيصهم على المنصة.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
        {/* Primary: Add Owner */}
        <button
          type="button"
          className="rounded-2xl px-5 py-2.5 bg-[#34432E] hover:bg-[#2A3725] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>إضافة مالك عقار جديد</span>
        </button>

        {/* Secondary: Export Data */}
        <button
          type="button"
          className="rounded-2xl px-4 py-2.5 bg-white border border-[#CCD5C5] hover:bg-[#F4F6F0] text-[#2C3825] text-xs sm:text-sm font-medium flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
        >
          <Upload className="w-4 h-4 text-[#4A5745]" />
          <span>تصدير البيانات</span>
        </button>
      </div>
    </div>
  );
}
