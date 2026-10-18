"use client";

import { Building2, Lock, ArrowLeft, DoorClosed } from "lucide-react";
import { toast } from "sonner";
import { PropertyUnitItem } from "../types";

interface PropertyUnitsCardProps {
  units: PropertyUnitItem[];
  totalUnitsCount?: number;
}

export function PropertyUnitsCard({
  units,
  totalUnitsCount = 12,
}: PropertyUnitsCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#172115]">
            الوحدات التابعة
          </h3>
        </div>

        <span className="bg-[#EEF2E6] text-[#2C3825] border border-[#CCD5C5] text-xs font-bold px-3 py-1 rounded-full">
          {totalUnitsCount} وحدة مسجلة
        </span>
      </div>

      {/* 2. Units List with soft sage background cards */}
      <div className="space-y-3">
        {units.map((unit) => (
          <div
            key={unit.id}
            onClick={() => toast.info(`تفاصيل الوحدة: ${unit.unitNumber} - ${unit.title}`)}
            className="bg-[#F0F4EB] hover:bg-[#EAEFE3] rounded-2xl p-3.5 border border-[#E5EAE0] flex items-center justify-between gap-3 transition-colors cursor-pointer group"
          >
            {/* Right in RTL: Unit Number Box */}
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E6DC] font-black text-sm text-[#172115] flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#CCD5C5] transition-colors">
              {unit.unitNumber}
            </div>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#172115] truncate">
                <span>{unit.title}</span>
                {unit.unitNumber === "103" ? (
                  <DoorClosed className="w-3.5 h-3.5 text-[#6B7865] shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#6B7865] shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-[#6B7865] truncate mt-1">
                {unit.floor} • مساحة {unit.area} • {unit.accessStatus}
              </div>
            </div>

            {/* Left in RTL: Status Badge */}
            <div className="shrink-0">
              {unit.status === "rented" ? (
                <span className="inline-block bg-[#DDE7D3] text-[#283820] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-[#CCD5C5]">
                  {unit.statusText}
                </span>
              ) : (
                <span className="inline-block bg-[#DDE7D3] text-[#283820] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-[#CCD5C5]">
                  {unit.statusText}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. View All Units Button */}
      <button
        type="button"
        onClick={() => toast.info(`عرض جميع وحدات العقار (${totalUnitsCount} وحدة)`)}
        className="w-full bg-[#EEF2E6] hover:bg-[#E5EAE0] text-[#2C3825] border border-[#D5DDCF] font-bold text-xs sm:text-sm py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs select-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>عرض جميع الوحدات ({totalUnitsCount} وحدة)</span>
      </button>
    </div>
  );
}
