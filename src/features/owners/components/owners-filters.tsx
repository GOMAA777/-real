"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface OwnersFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    pending: number;
    inactive: number;
  };
  onOpenAdvancedFilter?: () => void;
  activeFiltersCount?: number;
}

export function OwnersFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
}: OwnersFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "active", label: `نشط (${counts.active})` },
    { id: "pending", label: `بانتظار المراجعة (${counts.pending})` },
    { id: "inactive", label: `غير نشط (${counts.inactive})` },
  ];

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E2E6DC] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
      {/* Search Input Box (Right in RTL) */}
      <div className="relative w-full md:w-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم المالك أو رقم الجوال أو البريد الإلكتروني..."
          className="w-full h-10 pe-4 ps-10 rounded-xl bg-[#F6F8F4] border border-transparent text-xs text-[#172115] placeholder:text-[#8D9B88] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all shadow-2xs"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Filter Button & Tabs Section (Left in RTL) */}
      <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
        {/* Advanced Filter Button right where the user indicated in the screenshot */}
        <button
          type="button"
          onClick={onOpenAdvancedFilter}
          className={cn(
            "h-10 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none shadow-2xs",
            activeFiltersCount > 0
              ? "bg-[#34432E] text-white border-[#34432E]"
              : "bg-white hover:bg-[#F4F6F0] text-[#2C3825] border-[#CCD5C5]"
          )}
          title="التصفية المتقدمة"
        >
          <SlidersHorizontal
            className={cn(
              "w-4 h-4",
              activeFiltersCount > 0 ? "text-white" : "text-[#34432E]"
            )}
          />
          <span>فلتر</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-[#34432E] text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EEF2E6]/60 rounded-xl overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap cursor-pointer select-none",
                  isActive
                    ? "bg-white text-[#172115] font-bold shadow-2xs border border-[#CCD5C5]/60"
                    : "text-[#7D8A78] hover:text-[#172115] font-medium"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
