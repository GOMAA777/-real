"use client";

import Link from "next/link";
import { Plus, Download } from "lucide-react";

export function PropertiesHeader() {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
      {/* Title & Description (Right side in RTL) */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172115] tracking-tight">
          العقارات
        </h1>
        <p className="text-xs sm:text-sm text-[#7D8A78] mt-1 font-medium">
          إدارة ومتابعة جميع العقارات المسجلة على المنصة وحالة الوحدات التابعة لها.
        </p>
      </div>

      {/* Action Buttons (Left side in RTL) */}
      <div className="flex items-center gap-3">
        {/* Export List Button */}
        <button
          type="button"
          className="bg-white hover:bg-[#F9FAF7] border border-[#D5DDD0] text-[#172115] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#172115]" />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>

        {/* Add Property Button */}
        <Link
          href="/dashboard/properties/new"
          className="bg-[#4A5840] hover:bg-[#3D4C35] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عقار</span>
        </Link>
      </div>
    </div>
  );
}
