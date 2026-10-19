"use client";

import { History, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { BookingDetail } from "../types";

interface BookingActivityTimelineCardProps {
  activityLog: BookingDetail["activityLog"];
}

export function BookingActivityTimelineCard({
  activityLog,
}: BookingActivityTimelineCardProps) {
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
          {activityLog.length} أحداث
        </span>
      </div>

      {/* Timeline Events */}
      <div className="relative ps-6 space-y-5 before:absolute before:top-2 before:bottom-2 before:start-2 before:w-0.5 before:bg-[#E2E6DC]">
        {activityLog.map((event, index) => (
          <div key={event.id || index} className="relative">
            {/* Green Dot */}
            <div className="absolute -start-[25px] top-1.5 w-3 h-3 rounded-full bg-[#3D4C35] ring-4 ring-white" />

            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#172115]">
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
      <div className="pt-2 border-t border-[#EAEFE6]">
        <button
          type="button"
          onClick={() => toast.info("فتح سجل العمليات والأحداث الشامل لهذا الحجز")}
          className="text-xs font-bold text-[#34432E] hover:text-[#172115] inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <span>عرض سجل النشاط الكامل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
