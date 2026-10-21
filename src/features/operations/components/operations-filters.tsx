"use client";

import { Search } from "lucide-react";
import { OperationSubFilter } from "../types";

interface OperationsFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentSubFilter: OperationSubFilter;
  onSubFilterChange: (filter: OperationSubFilter) => void;
  subCounts: {
    all: number;
    pending: number;
    current: number;
    in_progress: number;
  };
}

export function OperationsFilters({
  searchQuery,
  onSearchChange,
  currentSubFilter,
  onSubFilterChange,
  subCounts,
}: OperationsFiltersProps) {
  const subFilters = [
    { id: "all" as const, label: `الكل (${subCounts.all})` },
    { id: "pending" as const, label: `قيد الانتظار (${subCounts.pending})` },
    { id: "current" as const, label: `الحالية (${subCounts.current})` },
    { id: "in_progress" as const, label: `جاري التنفيذ (${subCounts.in_progress})` },
  ];

  return (
    <div className="bg-white rounded-3xl p-3 border border-[#DCE2D7] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 font-cairo">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث برقم الوحدة، العقار، المالك أو رقم المهمة..."
          className="w-full pe-4 ps-11 h-10 bg-[#EAEFE6] border border-[#CCD4C6] rounded-xl text-xs text-[#252A24] placeholder:text-[#727A6E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 focus:border-[#4B5940] transition-all"
        />
        <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#727A6E]" />
      </div>

      {/* Sub Status Filter Pills */}
      <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto justify-start md:justify-end bg-[#EFF2EB] p-1 rounded-2xl">
        {subFilters.map((filter) => {
          const isActive = currentSubFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onSubFilterChange(filter.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-white text-[#252A24] font-bold shadow-2xs border border-[#CCD4C6]"
                  : "text-[#687163] hover:text-[#252A24] hover:bg-white/60 border border-transparent"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
