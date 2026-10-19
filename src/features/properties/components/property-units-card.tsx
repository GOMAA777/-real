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
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4" dir="rtl">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#172115]">
            الوحدات التابعة
          </h3>
        </div>

        <span className="bg-[#DDE7D3] text-[#283820] text-xs font-bold px-3.5 py-1 rounded-full select-none">
          {totalUnitsCount} وحدة مسجلة
        </span>
      </div>

      {/* 2. Units List */}
      <div className="space-y-3">
        {units.map((unit) => (
          <div
            key={unit.id}
            onClick={() => toast.info(`تفاصيل الوحدة: ${unit.unitNumber} - ${unit.title}`)}
            className="bg-[#F2F5ED] hover:bg-[#EAEFE3] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors cursor-pointer group"
          >
            {/* Right in RTL: Unit Number Box */}
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E6DC] font-black text-base text-[#172115] flex items-center justify-center shrink-0 shadow-2xs group-hover:border-[#CCD5C5] transition-colors">
              {unit.unitNumber}
            </div>

            {/* Middle: Details */}
            <div className="flex-1 min-w-0 text-right">
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#172115] truncate">
                <span>{unit.title}</span>
                {unit.unitNumber === "103" ? (
                  <DoorClosed className="w-3.5 h-3.5 text-[#172115] shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#172115] shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-[#7D8A78] truncate mt-1 font-medium flex items-center gap-1.5">
                <span>{unit.floor}</span>
                <span>·</span>
                <span>مساحة {unit.area}</span>
                <span>·</span>
                <span>{unit.accessStatus}</span>
              </div>
            </div>

            {/* Left in RTL: Status Badge */}
            <div className="shrink-0">
              <span className="inline-block bg-[#DDE7D3] text-[#283820] font-bold text-xs px-3.5 py-1.5 rounded-full select-none">
                {unit.statusText}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. View All Units Button */}
      <button
        type="button"
        onClick={() => toast.info(`عرض جميع وحدات العقار (${totalUnitsCount} وحدة)`)}
        className="w-full bg-[#E8EDE2] hover:bg-[#DEE5D8] text-[#172115] font-black text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
      >
        <ArrowLeft className="w-4 h-4 text-[#172115]" />
        <span>عرض جميع الوحدات ({totalUnitsCount} وحدة)</span>
      </button>
    </div>
  );
}
