"use client";

import Link from "next/link";
import { Calendar, CalendarPlus, FileEdit } from "lucide-react";
import { toast } from "sonner";

interface BookingDetailHeaderProps {
  bookingCode?: string;
}

export function BookingDetailHeader({ bookingCode = "BK-1048" }: BookingDetailHeaderProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
      {/* Title & Subtitle (Right in RTL) */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
          تفاصيل الحجز
        </h1>
        <p className="text-xs sm:text-sm text-[#7D8A78] font-medium">
          ملف الحجز التشغيلي وإدارة علاقات الإقامة والأتمتة
        </p>
      </div>

      {/* Action Buttons (Left in RTL) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Edit Booking Button */}
        <Link
          href={`/dashboard/bookings/${bookingCode}/edit`}
          className="bg-white hover:bg-[#F9FAF7] border border-[#D5DDD0] text-[#172115] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
        >
          <Calendar className="w-4 h-4 text-[#172115]" />
          <span>تعديل الحجز</span>
        </Link>

        {/* Extend Stay Button */}
        <button
          type="button"
          onClick={() => toast.info(`بدء إجراءات تمديد الإقامة للحجز: ${bookingCode}`)}
          className="bg-[#3D4C35] hover:bg-[#34422E] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
        >
          <CalendarPlus className="w-4 h-4 text-white" />
          <span>تمديد الإقامة</span>
        </button>
      </div>
    </div>
  );
}
