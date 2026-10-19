"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";

interface GuestProfileHeaderProps {
  guestName?: string;
}

export function GuestProfileHeader({ guestName = "خالد العتيبي" }: GuestProfileHeaderProps) {
  const handleExportPdf = () => {
    toast.success(`جاري تصدير الملف التعريفي وسجل حجوزات النزيل: ${guestName} (PDF)`);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
      {/* Title & Subtitle (Right in RTL) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
          بيانات العميل
        </h1>
        <p className="text-xs sm:text-sm text-[#7D8A78] font-medium">
          الملف التعريفي للنزيل وسجل العمليات والحجوزات المسجلة عبر المنصة
        </p>
      </div>

      {/* Action Buttons (Left in RTL) */}
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        {/* Export PDF Button */}
        <button
          type="button"
          onClick={handleExportPdf}
          className="bg-white hover:bg-[#F9FAF7] border border-[#D5DDD0] text-[#172115] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
        >
          <FileText className="w-4 h-4 text-[#7A8875]" />
          <span>تصدير سجل العميل (PDF)</span>
        </button>

        {/* Back to Bookings Button */}
        <Link
          href="/dashboard/bookings"
          className="bg-[#3D4C35] hover:bg-[#34422E] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
        >
          <span>العودة إلى الحجوزات</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>
    </div>
  );
}
