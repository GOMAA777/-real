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
    <div className="bg-white rounded-3xl p-3 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث برقم الوحدة، العقار، المالك أو رقم المهمة..."
          className="w-full pl-4 pr-10 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B] transition-all"
        />
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
      </div>

      {/* Sub Status Filter Pills */}
      <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto justify-start md:justify-end">
        {subFilters.map((filter) => {
          const isActive = currentSubFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onSubFilterChange(filter.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#F3F4F6] text-[#111827] font-semibold border border-[#E5E7EB]"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 border border-transparent"
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
