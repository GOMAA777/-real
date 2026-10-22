"use client";

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
    <div className="bg-white border border-[#E5E8E2] rounded-[16px] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)] px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 font-cairo">
      {/* Search Input Box (Right in RTL) */}
      <div className="relative w-full md:w-[440px] lg:w-[480px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم العقار، المالك أو المدينة..."
          className="w-full h-[40px] pe-4 ps-11 rounded-[12px] bg-[#F6F7F4] border border-transparent text-[12px] text-[#181D17] placeholder:text-[#73786F]/70 focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-1 focus:ring-[#4B5940] transition-all font-medium"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <img
            src="/icons/properties/search.svg"
            alt=""
            className="w-[15px] h-[15px]"
          />
        </div>
      </div>

      {/* Filter Tabs Container (Left in RTL) */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
        {/* Optional Advanced Filter Button if filters active */}
        {activeFiltersCount > 0 && onOpenAdvancedFilter && (
          <button
            type="button"
            onClick={onOpenAdvancedFilter}
            className="h-[36px] px-3.5 rounded-[12px] bg-[#4B5940] text-white text-[12px] font-semibold flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>فلتر مخصص</span>
            <span className="w-4 h-4 rounded-full bg-white text-[#4B5940] text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          </button>
        )}

        <div className="flex items-center gap-1 p-1 bg-[#F6F7F4] rounded-[12px] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={cn(
                  "relative px-4 py-1.5 rounded-[8px] text-[12px] whitespace-nowrap cursor-pointer select-none transition-colors duration-150",
                  isActive
                    ? "text-[#252A24] font-semibold"
                    : "text-[#73786F] hover:text-[#181D17] font-medium"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="propertiesFilterActiveTab"
                    className="absolute inset-0 bg-white rounded-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
