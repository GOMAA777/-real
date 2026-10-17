"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, RotateCcw, Check, Building, Home, Calendar, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdvancedFilterState {
  status: string; // "all" | "active" | "pending" | "inactive"
  propertiesRange: string; // "all" | "1-2" | "3-5" | "6+"
  minUnits: string;
  maxUnits: string;
  period: string; // "all" | "today" | "september" | "august"
  sortBy: string; // "date_desc" | "date_asc" | "properties_desc" | "units_desc"
}

interface OwnersAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdvancedFilterState;
  onApplyFilters: (filters: AdvancedFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function OwnersAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: OwnersAdvancedFilterDrawerProps) {
  // Local state for interactive editing before applying
  const [localFilters, setLocalFilters] = useState<AdvancedFilterState>(filters);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetState: AdvancedFilterState = {
      status: "all",
      propertiesRange: "all",
      minUnits: "",
      maxUnits: "",
      period: "all",
      sortBy: "date_desc",
    };
    setLocalFilters(resetState);
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel: Positioned strictly on the LEFT side (side with NO sidebar) */}
      <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
        <div className="w-screen sm:w-[420px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  التصفية المتقدمة
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تخصيص وتصفية قائمة أصحاب العقارات
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-[#E2E6DC] bg-white hover:bg-[#F4F6F0] text-[#7D8A78] hover:text-[#172115] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق التصفية المتقدمة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body: Scrollable filter sections */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* 1. Account Status */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34432E]" />
                <span>حالة الحساب</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الحالات", color: "bg-[#7D8A78]" },
                  { id: "active", label: "نشط", color: "bg-[#2E7D32]" },
                  { id: "pending", label: "بانتظار المراجعة", color: "bg-[#D97706]" },
                  { id: "inactive", label: "غير نشط", color: "bg-[#9CA3AF]" },
                ].map((item) => {
                  const isSelected = localFilters.status === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, status: item.id })}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className={cn("w-2 h-2 rounded-full", item.color)} />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Properties */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#7D8A78]" />
                <span>عدد العقارات المسجلة</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "1-2", label: "1 - 2 عقار" },
                  { id: "3-5", label: "3 - 5 عقارات" },
                  { id: "6+", label: "6 عقارات فأكثر" },
                ].map((item) => {
                  const isSelected = localFilters.propertiesRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, propertiesRange: item.id })
                      }
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs transition-all cursor-pointer select-none text-center",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC] font-medium"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Units Range (Min - Max) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Home className="w-4 h-4 text-[#7D8A78]" />
                <span>إجمالي الوحدات التابعة</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] text-[#7D8A78] font-medium">الحد الأدنى</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="مثال: 10"
                    value={localFilters.minUnits}
                    onChange={(e) =>
                      setLocalFilters({ ...localFilters, minUnits: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-[#F6F8F4] border border-[#E2E6DC] text-xs text-[#172115] placeholder:text-[#9BA596] focus:bg-white focus:border-[#34432E] focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-[#7D8A78] font-medium">الحد الأقصى</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="مثال: 80"
                    value={localFilters.maxUnits}
                    onChange={(e) =>
                      setLocalFilters({ ...localFilters, maxUnits: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-xl bg-[#F6F8F4] border border-[#E2E6DC] text-xs text-[#172115] placeholder:text-[#9BA596] focus:bg-white focus:border-[#34432E] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 4. Registration Period */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7D8A78]" />
                <span>تاريخ التسجيل</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الفترات" },
                  { id: "today", label: "تسجيلات اليوم" },
                  { id: "september", label: "شهر سبتمبر 2026" },
                  { id: "august", label: "شهر أغسطس 2026" },
                ].map((item) => {
                  const isSelected = localFilters.period === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, period: item.id })}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs transition-all cursor-pointer select-none text-center",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC] font-medium"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Sort By */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>ترتيب النتائج حسب</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "date_desc", label: "الأحدث تسجيلاً" },
                  { id: "date_asc", label: "الأقدم تسجيلاً" },
                  { id: "properties_desc", label: "الأكثر عقارات" },
                  { id: "units_desc", label: "الأكثر وحدات" },
                ].map((item) => {
                  const isSelected = localFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, sortBy: item.id })}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs transition-all cursor-pointer select-none text-center",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC] font-medium"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 sm:p-6 border-t border-[#EEF2E6] bg-[#FAFCF8] flex items-center gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 h-12 bg-[#34432E] hover:bg-[#253121] text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.99]"
            >
              <span>تطبيق التصفية</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                ({totalResultsCount} نتيجة)
              </span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="h-12 px-4 bg-white hover:bg-[#F4F6F0] border border-[#CCD5C5] text-[#2C3825] font-semibold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#7D8A78]" />
              <span>إعادة تعيين</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
