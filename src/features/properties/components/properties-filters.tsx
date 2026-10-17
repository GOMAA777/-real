"use client";

import { Search } from "lucide-react";
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
}

export function PropertiesFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}: PropertiesFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "active", label: `نشط (${counts.active})` },
    { id: "inactive", label: `غير نشط (${counts.inactive})` },
    { id: "archived", label: `مؤرشف (${counts.archived})` },
  ];

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E2E6DC] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
      {/* Search Input Box (Right in RTL) */}
      <div className="relative w-full md:w-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم العقار، المالك، أو المدينة..."
          className="w-full h-10 pe-4 ps-10 rounded-xl bg-[#F6F8F4] border border-transparent text-xs text-[#172115] placeholder:text-[#8D9B88] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all shadow-2xs"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Filter Tabs (Left in RTL) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#EEF2E6]/60 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
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
                  ? "bg-white text-[#172115] font-bold shadow-2xs"
                  : "text-[#7D8A78] hover:text-[#172115] hover:bg-white/40 font-medium"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
