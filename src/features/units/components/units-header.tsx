"use client";

import Link from "next/link";
import { Plus, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UnitsHeader() {
  const router = useRouter();

  const handleExport = () => {
    toast.success("جاري تجهيز وتصدير قائمة الوحدات (CSV / Excel)...");
  };

  const handleAddUnit = () => {
    router.push("/dashboard/units/new");
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
      {/* Title & Description (Right side in RTL) */}
      <div className="text-start">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#181D17] tracking-tight">
          الوحدات
        </h1>
        <p className="text-xs sm:text-sm text-[#454840] mt-1 font-medium">
          إدارة ومتابعة جميع الوحدات المسجلة على المنصة وحالات الإشغال والتشغيل في الوقت الفعلي.
        </p>
      </div>

      {/* Action Buttons (Left side in RTL) */}
      <div className="flex items-center gap-3 self-start md:self-auto shrink-0 flex-wrap">
        {/* Export List Button */}
        <button
          type="button"
          onClick={handleExport}
          className="h-11 px-4 sm:px-5 bg-white hover:bg-[#F9FAF7] border border-[#D5DDD0] text-[#181D17] rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 shadow-2xs transition-colors cursor-pointer select-none"
        >
          <Download className="w-4 h-4 text-[#181D17]" />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>

        {/* Add Unit Button */}
        <Link
          href="/dashboard/units/new"
          prefetch={true}
          className="h-11 px-5 sm:px-6 bg-[#4B5940] hover:bg-[#3D4C35] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer select-none"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة وحدة</span>
        </Link>
      </div>
    </div>
  );
}
