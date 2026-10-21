"use client";

import Link from "next/link";
import { Download, Plus, History } from "lucide-react";
import { toast } from "sonner";

export function OperationsHeader() {
  const handleExport = () => {
    toast.success("جاري تصدير قائمة العمليات (CSV / Excel)...");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-[#DCE2D7] shadow-xs font-cairo">
      <div>
        <h1 className="text-2xl font-bold text-[#252A24]">العمليات</h1>
        <p className="text-sm text-[#687163] mt-1">
          متابعة كل عمليات التنظيف والصيانة على مستوى المنصة.
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        <Link
          href="/dashboard/operations/log"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[#CCD4C6] text-[#252A24] hover:bg-[#EFF2EB] transition-colors"
        >
          <History className="w-4 h-4 text-[#252A24]" />
          <span>سجل التشغيل الكامل</span>
        </Link>

        <Link
          href="/dashboard/operations/maintenance/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#4B5940] text-white hover:bg-[#3E4A35] transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء بلاغ صيانة</span>
        </Link>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-[#CCD4C6] text-[#252A24] hover:bg-[#EFF2EB] transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#252A24]" />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>
      </div>
    </div>
  );
}
