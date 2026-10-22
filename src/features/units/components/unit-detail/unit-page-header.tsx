"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface UnitPageHeaderProps {
  title?: string;
  subtitle?: string;
  fallbackHref?: string;
}

export function UnitPageHeader({
  title = "تفاصيل الوحدة",
  subtitle = "إدارة ومتابعة بيانات ومواصفات الوحدة وحالة الإشغال والوصول الذكي وسجل التدقيق الإداري.",
  fallbackHref = "/dashboard/units",
}: UnitPageHeaderProps) {
  return (
    <div
      className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
      dir="rtl"
    >
      <div className="text-start">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#181D17] tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#454840] mt-1 font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-auto shrink-0 flex-wrap">
        <Link
          href={fallbackHref}
          className="h-11 px-6 bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#181D17] rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-colors cursor-pointer select-none"
        >
          <span>العودة إلى الوحدات</span>
          <ArrowLeft className="w-4 h-4 text-[#181D17]" />
        </Link>
      </div>
    </div>
  );
}
