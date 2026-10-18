"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface PropertyDetailHeaderProps {
  title?: string;
  fallbackHref?: string;
}

export function PropertyDetailHeader({
  title = "تفاصيل العقار",
  fallbackHref = "/dashboard/properties",
}: PropertyDetailHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] flex items-center justify-between shadow-2xs">
      {/* Left side in RTL: Back Button matching screenshot 1 */}
      <button
        type="button"
        onClick={handleBack}
        className="bg-[#EEF2E6] hover:bg-[#E5EAE0] text-[#2C3825] border border-[#D5DDCF] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer select-none"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>العودة إلى العقارات</span>
      </button>

      {/* Right side in RTL: Large Title */}
      <h1 className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
        {title}
      </h1>
    </div>
  );
}
