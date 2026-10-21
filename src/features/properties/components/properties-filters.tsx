"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PropertiesFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    inactive: number;
    archived: number;
  };
  onOpenAdvancedFilter?: () => void;
  activeFiltersCount?: number;
}

export function PropertiesFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
}: PropertiesFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "active", label: `نشط (${counts.active})` },
    { id: "inactive", label: `غير نشط (${counts.inactive})` },
    { id: "archived", label: `مؤرشف (${counts.archived})` },
  ];

  return (
    <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-[#DCE2D7] flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs font-cairo">
      {/* Search Input Box (Right in RTL) */}
      <div className="relative w-full md:w-96 lg:w-[440px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم العقار، المالك، أو المدينة..."
          className="w-full h-10 pe-4 ps-11 rounded-xl bg-[#EAEFE6] border border-[#CCD4C6] text-xs text-[#252A24] placeholder:text-[#727A6E] focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 transition-all shadow-2xs"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727A6E]">
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
            "h-10 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
            activeFiltersCount > 0
              ? "bg-[#4B5940] text-white shadow-xs"
              : "bg-[#EFF2EB] hover:bg-[#E2E7DE] text-[#252A24]"
          )}
          title="التصفية المتقدمة"
        >
          <span>فلتر</span>
          <SlidersHorizontal
            className={cn(
              "w-3.5 h-3.5",
              activeFiltersCount > 0 ? "text-white" : "text-[#252A24]"
            )}
          />
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-white text-[#4B5940] text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Filter Tabs Container */}
        <div className="flex items-center gap-1 p-1 bg-[#EFF2EB] rounded-2xl overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap cursor-pointer select-none transition-colors duration-200",
                  isActive
                    ? "text-[#252A24] font-bold"
                    : "text-[#687163] hover:text-[#252A24] font-medium"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="propertiesFilterPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
