"use client";

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
    <div className="bg-white rounded-[16px] px-5 py-5 md:h-[112px] md:py-0 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-[0_1px_2px_rgba(24,29,23,0.04)]">
      {/* Title & Description (Right side in RTL) */}
      <div className="md:pt-4 md:ms-2">
        <h1 className="relative -top-1 text-[27px] leading-[42px] font-bold text-[#181D17]">
          الوحدات
        </h1>
        <p className="text-[15.5px] leading-[22px] text-[#454840] mt-1">
          إدارة ومتابعة جميع الوحدات المسجلة على المنصة وحالات الإشغال والتشغيل
          في الوقت الفعلي.
        </p>
      </div>

      {/* Action Buttons (Left side in RTL) */}
      <div className="flex items-center gap-2 flex-wrap md:pt-[30px]">
        {/* Export List Button */}
        <button
          type="button"
          onClick={handleExport}
          className="h-12 w-[229px] bg-white hover:bg-[#FBFCFA] text-[#181D17] ps-[15px] pe-0 rounded-[12px] text-[15px] tracking-[0.01em] font-semibold flex items-center justify-start gap-2 shadow-[0_1px_3px_rgba(24,29,23,0.08)] transition-colors cursor-pointer"
        >
          <Download className="w-[18px] h-[18px]" strokeWidth={1.8} />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>

        {/* Add Unit Button */}
        <button
          type="button"
          onClick={handleAddUnit}
          className="h-12 bg-[#4B5940] hover:bg-[#414E37] text-white px-[28px] rounded-[12px] text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-[18px] h-[18px]" strokeWidth={2} />
          <span>إضافة وحدة</span>
        </button>
      </div>
    </div>
  );
}
