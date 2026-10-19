"use client";

import Link from "next/link";
import { History, ArrowLeft } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingActivityTimelineCardProps {
  activityLog: BookingDetail["activityLog"];
  isCancelled?: boolean;
  bookingCode?: string;
}

export function BookingActivityTimelineCard({
  activityLog,
  isCancelled = false,
  bookingCode = "BK-10482",
}: BookingActivityTimelineCardProps) {
  const cancelledEvents = [
    {
      id: "act-0",
      title: "تم إلغاء الحجز بواسطة مدير المنصة",
      timestamp: "15 سبتمبر 2026 ▪ 11:35 ص",
      dotColor: "bg-[#D9383A] ring-4 ring-[#FDF2F2]",
      titleColor: "text-[#D9383A]",
    },
    {
      id: "act-1",
      title: "إرسال رسالة التأكيد عبر WhatsApp",
      timestamp: "15 سبتمبر 2026 ▪ 11:33 ص",
      dotColor: "bg-[#2E7D32] ring-4 ring-white",
      titleColor: "text-[#172115]",
    },
    {
      id: "act-2",
      title: "تعيين الوحدة 204 وتأكيد التوافر",
      timestamp: "15 سبتمبر 2026 ▪ 11:32 ص",
      dotColor: "bg-[#2E7D32] ring-4 ring-white",
      titleColor: "text-[#172115]",
    },
    {
      id: "act-3",
      title: "تم إنشاء الحجز عبر Whatsapp",
      timestamp: "15 سبتمبر 2026 ▪ 11:32 ص ▪ API Sync",
      dotColor: "bg-[#8A9684] ring-4 ring-white",
      titleColor: "text-[#172115]",
    },
  ];

  const eventsToRender = isCancelled ? cancelledEvents : activityLog.map((ev, i) => ({
    ...ev,
    dotColor: "bg-[#3D4C35] ring-4 ring-white",
    titleColor: "text-[#172115]",
  }));

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] space-y-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <History className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#172115]">
            سجل النشاط
          </h2>
        </div>

        {/* Count Badge */}
        <span className="text-xs text-[#7D8A78] font-bold select-none">
          {eventsToRender.length} أحداث
        </span>
      </div>

      {/* Timeline Events */}
      <div className="relative ps-[52px] space-y-5 before:absolute before:top-2 before:bottom-2 before:start-[19px] before:w-0.5 before:bg-[#E2E6DC]">
        {eventsToRender.map((event, index) => (
          <div key={event.id || index} className="relative">
            {/* Color Dot centered directly under History icon */}
            <div
              className={`absolute -start-[38px] top-1.5 w-3 h-3 rounded-full ${event.dotColor}`}
            />

            <div className="space-y-0.5">
              <div className={`text-xs sm:text-sm font-bold ${event.titleColor}`}>
                {event.title}
              </div>
              <div className="text-[11px] text-[#7D8A78] font-medium">
                {event.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="pt-2 flex justify-end">
        <Link
          href={`/dashboard/bookings/${bookingCode}/activity`}
          className="text-xs font-bold text-[#34432E] hover:text-[#172115] inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <span>عرض سجل النشاط الكامل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
