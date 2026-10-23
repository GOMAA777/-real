"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";

interface GuestProfileHeaderProps {
  guestName?: string;
}

export function GuestProfileHeader({ guestName = "خالد العتيبي" }: GuestProfileHeaderProps) {
  const handleExportPdf = () => {
    toast.success(`جاري تصدير الملف التعريفي وسجل حجوزات النزيل: ${guestName} (PDF)`);
  };

  return (
    <div className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Subtitle (Right in RTL) */}
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold font-cairo text-[#181D17] leading-[34px] tracking-tight">
          بيانات العميل
        </h1>
        <p className="text-[14px] font-normal text-[#454840] leading-[22px]">
          الملف التعريفي للنزيل وسجل العمليات والحجوزات المسجلة عبر المنصة
        </p>
      </div>

      {/* Action Buttons (Left in RTL) */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        {/* Export PDF Button */}
        <button
          type="button"
          onClick={handleExportPdf}
          className="bg-white hover:bg-[#F9FAF7] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[#181D17] h-[44px] px-4 rounded-[12px] text-[14px] font-medium flex items-center gap-2 transition-all cursor-pointer select-none active:scale-98"
        >
          <FileText className="w-4 h-4 text-[#181D17]" />
          <span>تصدير سجل العميل (PDF)</span>
        </button>

        {/* Back to Bookings Button */}
        <Link
          href="/dashboard/bookings"
          className="bg-[#4B5940] hover:bg-[#3D4B33] text-white h-[44px] px-6 rounded-[12px] text-[14px] font-semibold flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer select-none active:scale-98"
        >
          <span>العودة إلى الحجوزات</span>
          <ArrowLeft className="w-3.5 h-3.5 text-white stroke-[2.2]" />
        </Link>
      </div>
    </div>
  );
}
