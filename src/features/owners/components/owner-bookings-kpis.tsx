"use client";

import { Building2, CalendarCheck, Clock, ArrowLeftCircle } from "lucide-react";
import { OwnerBookingsKPIData } from "../types";

interface OwnerBookingsKPIsProps {
  kpis: OwnerBookingsKPIData;
}

export function OwnerBookingsKPIs({ kpis }: OwnerBookingsKPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. الحجوزات الحالية (النزلاء المقيمون) - Far right in RTL */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs text-[#7D8A78] font-medium leading-relaxed">
            الحجوزات الحالية (النزلاء المقيمون)
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl font-black text-[#172115]">
            {kpis.currentBookings.count}
          </span>
          <span className="bg-[#EAF5EA] text-[#2E7D32] border border-[#C8E6C9] font-bold text-xs px-2.5 py-0.5 rounded-full">
            {kpis.currentBookings.badgeText}
          </span>
        </div>

        <div className="text-[11px] text-[#7D8A78]">
          {kpis.currentBookings.subtext}
        </div>
      </div>

      {/* 2. إجمالي حجوزات هذا الشهر - Second from right */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs text-[#7D8A78] font-medium">
            إجمالي حجوزات هذا الشهر
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F6F8F4] border border-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl font-black text-[#172115]">
            {kpis.monthlyTotal.count}
          </span>
          <span className="bg-[#EAF5EA] text-[#2E7D32] text-xs font-bold px-2 py-0.5 rounded-full" dir="ltr">
            {kpis.monthlyTotal.growthText}
          </span>
        </div>

        <div className="text-[11px] text-[#7D8A78]">
          إجمالي ليالي مؤكدة:{" "}
          <span className="font-bold text-[#172115]">{kpis.monthlyTotal.nightsCount} ليلة</span>
        </div>
      </div>

      {/* 3. حجوزات قادمة مؤكدة - Third from right */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs text-[#7D8A78] font-medium">
            حجوزات قادمة مؤكدة
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl font-black text-[#172115]">
            {kpis.upcomingConfirmed.count}
          </span>
          <span className="bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] text-xs font-bold px-2.5 py-0.5 rounded-full">
            {kpis.upcomingConfirmed.badgeText}
          </span>
        </div>

        <div className="text-[11px] text-[#7D8A78]">
          {kpis.upcomingConfirmed.subtext}
        </div>
      </div>

      {/* 4. حجوزات ملغاة - Far left in RTL */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="text-xs text-[#7D8A78] font-medium">
            حجوزات ملغاة
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
            <ArrowLeftCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl sm:text-4xl font-black text-[#172115]">
            {kpis.cancelled.count}
          </span>
          <span className="bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] text-xs font-bold px-2.5 py-0.5 rounded-full">
            {kpis.cancelled.badgeText}
          </span>
        </div>

        <div className="text-[11px] text-[#7D8A78]">
          {kpis.cancelled.subtext}
        </div>
      </div>
    </div>
  );
}
