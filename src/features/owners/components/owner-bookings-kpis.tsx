"use client";

import { Building2, CalendarCheck, Clock, XCircle } from "lucide-react";
import { OwnerBookingsKPIData } from "../types";

interface OwnerBookingsKPIsProps {
  kpis: OwnerBookingsKPIData;
}

export function OwnerBookingsKPIs({ kpis }: OwnerBookingsKPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir="rtl">
      {/* 1. الحجوزات الحالية (النزلاء المقيمون) - Far right in RTL */}
      <div className="bg-white rounded-[16px] border border-[#e5e8e2] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-5 py-7 flex items-center justify-between">
        <div className="flex flex-col items-start gap-1.5 text-right">
          <span className="text-[#73786f] text-xs font-medium leading-4">
            الحجوزات الحالية (النزلاء المقيمون)
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#252a24] text-[30px] font-bold leading-9">
              {kpis.currentBookings.count}
            </span>
            <span className="bg-[#ecfdf5] text-[#059669] text-xs font-semibold px-2 py-0.5 rounded-[6px]">
              {kpis.currentBookings.badgeText}
            </span>
          </div>
          <span className="text-[#73786f] text-[11px] font-normal">
            {kpis.currentBookings.subtext}
          </span>
        </div>
        <div className="w-12 h-12 rounded-[16px] bg-[#eaf1e8] text-[#34422A] flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      {/* 2. إجمالي حجوزات هذا الشهر */}
      <div className="bg-white rounded-[16px] border border-[#e5e8e2] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-5 py-7 flex items-center justify-between">
        <div className="flex flex-col items-start gap-1.5 text-right">
          <span className="text-[#73786f] text-xs font-medium leading-4">
            إجمالي حجوزات هذا الشهر
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#252a24] text-[30px] font-bold leading-9">
              {kpis.monthlyTotal.count}
            </span>
            <span className="bg-[#eaf1e8] text-[#4b5940] text-xs font-semibold px-2 py-0.5 rounded-[6px]" dir="ltr">
              {kpis.monthlyTotal.growthText}
            </span>
          </div>
          <span className="text-[#73786f] text-[11px] font-normal">
            إجمالي ليالي مؤكدة:{" "}
            <span className="font-bold text-[#252a24]">{kpis.monthlyTotal.nightsCount} ليلة</span>
          </span>
        </div>
        <div className="w-12 h-12 rounded-[16px] bg-[#f5f1e8] text-[#4b5940] flex items-center justify-center shrink-0">
          <CalendarCheck className="w-6 h-6" />
        </div>
      </div>

      {/* 3. حجوزات قادمة مؤكدة */}
      <div className="bg-white rounded-[16px] border border-[#e5e8e2] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-5 py-7 flex items-center justify-between">
        <div className="flex flex-col items-start gap-1.5 text-right">
          <span className="text-[#73786f] text-xs font-medium leading-4">
            حجوزات قادمة مؤكدة
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#252a24] text-[30px] font-bold leading-9">
              {kpis.upcomingConfirmed.count}
            </span>
            <span className="bg-[#eff6ff] text-[#1d4ed8] text-xs font-semibold px-2 py-0.5 rounded-[6px]">
              {kpis.upcomingConfirmed.badgeText}
            </span>
          </div>
          <span className="text-[#73786f] text-[11px] font-normal">
            {kpis.upcomingConfirmed.subtext}
          </span>
        </div>
        <div className="w-12 h-12 rounded-[16px] bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* 4. حجوزات ملغاة - Far left in RTL */}
      <div className="bg-white rounded-[16px] border border-[#e5e8e2] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-5 py-7 flex items-center justify-between">
        <div className="flex flex-col items-start gap-1.5 text-right">
          <span className="text-[#73786f] text-xs font-medium leading-4">
            حجوزات ملغاة
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[#252a24] text-[30px] font-bold leading-9">
              {kpis.cancelled.count}
            </span>
            <span className="bg-[#fff1f2] text-[#be123c] text-xs font-semibold px-2 py-0.5 rounded-[6px]">
              {kpis.cancelled.badgeText}
            </span>
          </div>
          <span className="text-[#73786f] text-[11px] font-normal">
            {kpis.cancelled.subtext}
          </span>
        </div>
        <div className="w-12 h-12 rounded-[16px] bg-[#fff1f2] text-[#be123c] flex items-center justify-center shrink-0">
          <XCircle className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
