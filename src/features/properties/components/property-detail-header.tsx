import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PropertyDetailHeaderProps {
  title?: string;
  fallbackHref?: string;
}

export function PropertyDetailHeader({
  title = "تفاصيل العقار",
  fallbackHref = "/dashboard/properties",
}: PropertyDetailHeaderProps) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-6 sm:py-6 border border-[#E2E6DC]/50 shadow-2xs flex items-center justify-between" dir="rtl">
      {/* 1. Right side in RTL (start): Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-[#181D17]">
        {title}
      </h1>

      {/* 2. Left side in RTL (end): Back Button */}
      <Link
        href={fallbackHref}
        className="bg-[#F1F5EB] hover:bg-[#E5ECE0] text-[#181D17] px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer select-none"
      >
        <span>العودة إلى العقارات</span>
        <ArrowLeft className="w-4 h-4 text-[#181D17]" />
      </Link>
    </div>
  );
}

