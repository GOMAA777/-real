"use client";

import { OperationCategoryFilter } from "../types";

interface OperationsStatusSummaryProps {
  currentCategory: OperationCategoryFilter;
  onCategoryChange: (category: OperationCategoryFilter) => void;
  counts: {
    all: number;
    cleaning: number;
    maintenance: number;
  };
}

export function OperationsStatusSummary({
  currentCategory,
  onCategoryChange,
  counts,
}: OperationsStatusSummaryProps) {
  const tabs = [
    { id: "all" as const, label: "كل العمليات", count: counts.all },
    { id: "cleaning" as const, label: "التنظيف", count: counts.cleaning },
    { id: "maintenance" as const, label: "الصيانة", count: counts.maintenance },
  ];

  return (
    <div className="flex justify-center my-1">
      <div className="inline-flex items-center gap-1.5 bg-[#EDF2EC] p-1.5 rounded-full border border-[#E0E7DE]">
        {tabs.map((tab) => {
          const isSelected = currentCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onCategoryChange(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-white text-[#1F2937] shadow-sm font-semibold"
                  : "text-[#4B5563] hover:text-[#1F2937]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isSelected
                    ? "bg-[#EDF2EC] text-[#1F3D2B]"
                    : "bg-[#E2E8E0] text-[#6B7280]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
