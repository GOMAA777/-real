"use client";

import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";

export function OwnersHeader() {
  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#DCE2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-2xs font-cairo">
      {/* Title & Subtitle */}
      <div className="space-y-1 text-start">
        <h1 className="text-xl sm:text-2xl font-bold text-[#252A24] tracking-tight">
          إدارة أصحاب العقارات
        </h1>
        <p className="text-xs sm:text-sm text-[#687163]">
          إدارة ومتابعة جميع أصحاب العقارات المسجلين وتراخيصهم على المنصة.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
        {/* Secondary: Export Data */}
        <button
          type="button"
          onClick={() => toast.info("جاري تصدير بيانات قائمة الملاك (CSV / Excel)...")}
          className="rounded-xl px-5 py-2.5 bg-white border border-[#CCD4C6] hover:bg-[#EFF2EB] text-[#252A24] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-2xs cursor-pointer select-none"
        >
          <Upload className="w-4 h-4 text-[#252A24]" />
          <span>تصدير البيانات</span>
        </button>

        {/* Primary: Add Owner (Outer left in RTL) */}
        <button
          type="button"
          onClick={() => toast.info("فتح نموذج تسجيل مالك عقار جديد")}
          className="rounded-xl px-5 py-2.5 bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer select-none"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>إضافة مالك عقار جديد</span>
        </button>
      </div>
    </div>
  );
}
