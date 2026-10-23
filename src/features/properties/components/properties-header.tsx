"use client";

import Link from "next/link";
import { toast } from "sonner";

export function PropertiesHeader() {
  const handleExport = () => {
    toast.success("جاري تصدير قائمة العقارات بصيغة Excel / CSV...");
  };

  return (
    <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#E5E8E2] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-cairo">
      {/* Title & Description (Right side in RTL) */}
      <div className="text-right">
        <h1 className="text-[24px] leading-[34px] font-bold text-[#181D17]">
          العقارات
        </h1>
        <p className="text-[14px] leading-[22px] text-[#454840] mt-1 font-normal">
          إدارة ومتابعة جميع العقارات المسجلة على المنصة وحالة الوحدات التابعة لها.
        </p>
      </div>

      {/* Action Group (Left side in RTL: "تصدير القائمة" on right, "إضافة عقار" on left) */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Export List Button */}
        <button
          type="button"
          onClick={handleExport}
          className="bg-white hover:bg-[#F9FAF8] border border-[#E5E8E2] text-[#181D17] h-[44px] px-4 rounded-[12px] text-[14px] font-medium flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer select-none"
        >
          <img
            src="/icons/properties/download.svg"
            alt=""
            className="w-[14px] h-[14px]"
          />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>

        {/* Add Property Button */}
        <Link
          href="/dashboard/properties/new"
          prefetch={true}
          className="bg-[#4B5940] hover:bg-[#3E4A35] text-white h-[44px] px-6 rounded-[12px] text-[14px] font-semibold flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer select-none"
        >
          <img
            src="/icons/properties/plus.svg"
            alt=""
            className="w-[12px] h-[12px]"
          />
          <span>إضافة عقار</span>
        </Link>
      </div>
    </div>
  );
}
