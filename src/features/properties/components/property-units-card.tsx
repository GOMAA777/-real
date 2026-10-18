"use client";

import { Building2, Lock, ArrowLeft } from "lucide-react";
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
          <h3 className="text-base sm:text-lg font-bold text-[#172115]">
            الوحدات التابعة
          </h3>
        </div>

        <span className="bg-[#EEF2E6] text-[#2C3825] border border-[#E2E6DC] text-xs font-bold px-3 py-1 rounded-full">
          {totalUnitsCount} وحدة مسجلة
        </span>
      </div>

      {/* 2. Units List */}
      <div className="space-y-2.5">
        {units.map((unit) => (
          <div
            key={unit.id}
            onClick={() => toast.info(`تفاصيل الوحدة: ${unit.unitNumber} - ${unit.title}`)}
            className="bg-[#F6F8F4]/70 hover:bg-[#EEF2E6]/60 rounded-2xl p-3 border border-[#EEF2E6] flex items-center justify-between gap-3 transition-colors cursor-pointer group"
          >
            {/* Right in RTL: Unit Number Box */}
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E6DC] font-black text-sm text-[#172115] flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#CCD5C5] transition-colors">
              {unit.unitNumber}
            </div>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#172115] truncate">
                <span>{unit.title}</span>
                <Lock className="w-3.5 h-3.5 text-[#7D8A78] shrink-0" />
              </div>
              <div className="text-[11px] text-[#7D8A78] truncate mt-1">
                {unit.floor} • مساحة {unit.area} • {unit.accessStatus}
              </div>
            </div>

            {/* Left in RTL: Status Badge */}
            <div className="shrink-0">
              {unit.status === "rented" ? (
                <span className="inline-block bg-[#EAF5EA] text-[#2E7D32] border border-[#C8E6C9] font-bold text-xs px-3 py-1 rounded-xl">
                  {unit.statusText}
                </span>
              ) : (
                <span className="inline-block bg-[#F6F8F4] text-[#4A5745] border border-[#E2E6DC] font-bold text-xs px-3 py-1 rounded-xl">
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
        className="w-full bg-[#F6F8F4] hover:bg-[#EEF2E6] text-[#172115] border border-[#E2E6DC] font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
      >
        <span>عرض جميع الوحدات ({totalUnitsCount} وحدة)</span>
        <ArrowLeft className="w-4 h-4" />
      </button>
    </div>
  );
}
