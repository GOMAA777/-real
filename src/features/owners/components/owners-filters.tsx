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
    <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-[#E0E4D8]/60 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
      {/* Search Input Box (Right in RTL) */}
      <div className="relative w-full md:w-96 lg:w-[440px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم المالك أو رقم الجوال أو البريد الإلكتروني..."
          className="w-full h-10 pe-4 ps-11 rounded-2xl bg-[#F1F5EB] border border-transparent text-xs text-[#172115] placeholder:text-[#8D9B88] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all shadow-2xs"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Filter Button & Tabs Section (Left in RTL) */}
      <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
        {/* Advanced Filter Button */}
        <button
          type="button"
          onClick={onOpenAdvancedFilter}
          className={cn(
            "h-10 px-4 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
            activeFiltersCount > 0
              ? "bg-[#34432E] text-white shadow-xs"
              : "bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#172115]"
          )}
          title="التصفية المتقدمة"
        >
          <span>فلتر</span>
          <SlidersHorizontal
            className={cn(
              "w-3.5 h-3.5",
              activeFiltersCount > 0 ? "text-white" : "text-[#172115]"
            )}
          />
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-[#34432E] text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Filter Tabs Container */}
        <div className="flex items-center gap-1 p-1 bg-[#F1F5EB] rounded-2xl overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer select-none",
                  isActive
                    ? "bg-white text-[#172115] font-bold shadow-xs"
                    : "text-[#7A8574] hover:text-[#172115] font-medium"
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
