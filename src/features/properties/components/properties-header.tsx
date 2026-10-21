"use client";

import Link from "next/link";
import { Plus, Download } from "lucide-react";

export function PropertiesHeader() {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DCE2D7] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs font-cairo">
      {/* Title & Description (Right side in RTL) */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#252A24] tracking-tight">
          العقارات
        </h1>
        <p className="text-xs sm:text-sm text-[#687163] mt-1 font-medium">
          إدارة ومتابعة جميع العقارات المسجلة على المنصة وحالة الوحدات التابعة لها.
        </p>
      </div>

      {/* Action Buttons (Left side in RTL) */}
      <div className="flex items-center gap-3">
        {/* Export List Button */}
        <button
          type="button"
          className="bg-white hover:bg-[#EFF2EB] border border-[#CCD4C6] text-[#252A24] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#252A24]" />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>

        {/* Add Property Button */}
        <Link
          href="/dashboard/properties/new"
          className="bg-[#4B5940] hover:bg-[#3E4A35] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عقار</span>
        </Link>
      </div>
    </div>
  );
}
