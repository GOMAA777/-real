"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface UnitsFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    available: number;
    occupied: number;
    cleaning: number;
    maintenance: number;
  };
  onOpenAdvancedFilter?: () => void;
  activeFiltersCount?: number;
}

export function UnitsFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
}: UnitsFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "available", label: `متاحة (${counts.available})` },
    { id: "occupied", label: `مشغولة (${counts.occupied})` },
    { id: "cleaning", label: `تحت التنظيف (${counts.cleaning})` },
    { id: "maintenance", label: `تحت الصيانة (${counts.maintenance})` },
  ];

  return (
    <div className="bg-white rounded-[16px] px-[18px] py-[18px] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[0_1px_2px_rgba(24,29,23,0.04)]">
      {/* Search Input Box (Right side in RTL) */}
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث برقم الوحدة، اسم العقار أو المالك..."
          className="w-full h-10 pe-4 ps-[43px] rounded-[12px] bg-[#F6F7F4] border-0 text-[13px] leading-5 tracking-[0.15px] text-[#181D17] placeholder:text-[#A5A9A2] focus:outline-none transition-colors"
        />
        <div className="absolute start-[14px] top-1/2 -translate-y-1/2 pointer-events-none text-[#75786F]">
          <Search className="w-[18px] h-[18px]" strokeWidth={1.9} />
        </div>
      </div>

      {/* Filter Button & Tabs (Left side in RTL) */}
      <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
        {onOpenAdvancedFilter && (
          <button
            type="button"
            onClick={onOpenAdvancedFilter}
            className={cn(
              "h-10 px-4 rounded-[12px] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#34432E] text-white shadow-xs"
                : "bg-[#F6F7F4] hover:bg-[#E5EBDD] text-[#181D17]"
            )}
            title="تصفية الوحدات"
          >
            <span>فلتر</span>
            <SlidersHorizontal
              className={cn(
                "w-3.5 h-3.5",
                activeFiltersCount > 0 ? "text-white" : "text-[#181D17]"
              )}
            />
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#34432E] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        )}

        {/* Filter Tabs (Left side in RTL) */}
        <div className="flex items-center h-10 p-1 bg-[#F6F7F4] rounded-[12px] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={cn(
                  "relative px-3.5 h-full rounded-[10px] text-[13px] leading-5 whitespace-nowrap cursor-pointer select-none transition-colors duration-200 flex items-center justify-center",
                  isActive
                    ? "text-[#181D17] font-semibold"
                    : "text-[#73786F] hover:text-[#181D17] font-medium"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="unitsFilterPill"
                    className="absolute inset-0 bg-white rounded-[10px] shadow-[0_1px_2px_rgba(24,29,23,0.06)] z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex h-full items-center justify-center">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
