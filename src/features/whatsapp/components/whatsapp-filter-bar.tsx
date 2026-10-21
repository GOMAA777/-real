"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { WhatsAppTopFilter } from "../types";

interface WhatsAppFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  activeFilter: WhatsAppTopFilter;
  onFilterChange: (filter: WhatsAppTopFilter) => void;
}

export function WhatsAppFilterBar({
  searchQuery,
  onSearchChange,
  selectedProperty,
  onPropertyChange,
  activeFilter,
  onFilterChange,
}: WhatsAppFilterBarProps) {
  return (
    <div
      className="bg-white rounded-[16px] p-2 sm:p-2.5 border border-[#E2E6DC]/80 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
      dir="rtl"
    >
      {/* Right side (RTL start): Search and Property dropdown */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث باسم المستأجر، رقم الوحدة..."
            className="w-full h-[34px] ps-3 pe-9 rounded-[12px] bg-[#EBEFE6] border border-transparent text-xs text-[#181D17] placeholder:text-[#75786F] focus:bg-white focus:border-[#CCD5C5] focus:outline-none focus:ring-1 focus:ring-[#34422A]/20 transition-all font-cairo"
          />
          <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none w-[13.5px] h-[13.5px]">
            <Image
              src="/assets/whatsapp/c79bda9dae8b5f320db5df33e7833dc3589f90ca.svg"
              alt="Search"
              width={14}
              height={14}
              className="object-contain"
            />
          </div>
        </div>

        {/* Property Selector Dropdown */}
        <div className="relative min-w-[180px]">
          <select
            value={selectedProperty}
            onChange={(e) => onPropertyChange(e.target.value)}
            className="w-full h-[34px] ps-3 pe-8 rounded-[12px] bg-[#EBEFE6] border border-transparent text-xs font-semibold text-[#75786F] focus:bg-white focus:border-[#CCD5C5] focus:outline-none focus:ring-1 focus:ring-[#34422A]/20 transition-all appearance-none cursor-pointer font-cairo"
          >
            <option value="all">جميع العقارات</option>
            <option value="nakheel">عمارة النخيل السكنية</option>
            <option value="malqa">برج الملقا الفاخر</option>
            <option value="sahafa">مجمع الصحافة السكني</option>
          </select>
          <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none w-[9px] h-[5.5px]">
            <Image
              src="/assets/whatsapp/ac382fb58d6980b5da7741fc2bc8304a79153882.svg"
              alt="Arrow down"
              width={9}
              height={6}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Left side (RTL end): Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
        {/* All Filter */}
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={cn(
            "px-3.5 py-1.5 rounded-[12px] text-xs font-semibold font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
            activeFilter === "all"
              ? "bg-[#34422A] text-white"
              : "bg-[#EBEFE6] text-[#454840] hover:bg-[#E2E7DC]"
          )}
        >
          الكل (18)
        </button>

        {/* Unread */}
        <button
          type="button"
          onClick={() => onFilterChange("unread")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-semibold font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
            activeFilter === "unread"
              ? "bg-[#34422A] text-white"
              : "bg-[#EBEFE6] text-[#454840] hover:bg-[#E2E7DC]"
          )}
        >
          <span>غير مقروء</span>
          <span
            className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-bold font-cairo",
              activeFilter === "unread"
                ? "bg-white text-[#34422A]"
                : "bg-[#D8E8CB] text-[#121F0D]"
            )}
          >
            3
          </span>
        </button>

        {/* Maintenance */}
        <button
          type="button"
          onClick={() => onFilterChange("maintenance")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-semibold font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
            activeFilter === "maintenance"
              ? "bg-[#34422A] text-white"
              : "bg-[#EBEFE6] text-[#454840] hover:bg-[#E2E7DC]"
          )}
        >
          <span>بلاغات صيانة</span>
          <span
            className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-semibold font-cairo",
              activeFilter === "maintenance"
                ? "bg-white text-[#34422A]"
                : "bg-[#DFE4DB] text-[#454840]"
            )}
          >
            6
          </span>
        </button>

        {/* Extension */}
        <button
          type="button"
          onClick={() => onFilterChange("extension")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-semibold font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
            activeFilter === "extension"
              ? "bg-[#34422A] text-white"
              : "bg-[#EBEFE6] text-[#454840] hover:bg-[#E2E7DC]"
          )}
        >
          <span>تمديد إقامة</span>
          <span
            className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-semibold font-cairo",
              activeFilter === "extension"
                ? "bg-white text-[#34422A]"
                : "bg-[#DFE4DB] text-[#454840]"
            )}
          >
            4
          </span>
        </button>
      </div>
    </div>
  );
}
