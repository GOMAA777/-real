"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, Check, Building2, Home, Layers, DollarSign, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { UnitFilterState } from "../types";

interface UnitsAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: UnitFilterState;
  onApplyFilters: (filters: UnitFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function UnitsAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: UnitsAdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<UnitFilterState>(filters);

  // Sync when filters prop changes or opens
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

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
    const resetState: UnitFilterState = {
      property: "all",
      status: "all",
      unitType: "all",
      floor: "all",
      priceRange: "all",
      sortBy: "default",
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

      {/* Drawer Panel on Left side in RTL so it doesn't collide with the right sidebar */}
      <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
        <div className="w-screen sm:w-[420px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  تصفية الوحدات
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تخصيص وفرز الوحدات السكنية
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-[#E2E6DC] bg-white hover:bg-[#F4F6F0] text-[#7D8A78] hover:text-[#172115] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. العقار */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7D8A78]" />
                <span>العقار</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع العقارات" },
                  { id: "عمارة النخيل", label: "عمارة النخيل" },
                  { id: "برج الياسمين", label: "برج الياسمين" },
                  { id: "مجمع الواحة السكني", label: "مجمع الواحة" },
                  { id: "أبراج العليا", label: "أبراج العليا" },
                  { id: "ديار الهدى", label: "ديار الهدى" },
                ].map((item) => {
                  const isSelected = localFilters.property === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, property: item.id })
                      }
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none truncate",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. نوع الوحدة */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Home className="w-4 h-4 text-[#7D8A78]" />
                <span>نوع الوحدة</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "شقة", label: "شقة" },
                  { id: "استوديو", label: "استوديو" },
                  { id: "غرفة", label: "غرفة" },
                  { id: "جناح رئاسي", label: "جناح رئاسي" },
                ].map((item) => {
                  const isSelected = localFilters.unitType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, unitType: item.id })
                      }
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. الدور */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#7D8A78]" />
                <span>الدور / الطابق</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "1", label: "الأول (1)" },
                  { id: "2", label: "الثاني (2)" },
                  { id: "3", label: "الثالث (3)" },
                  { id: "4", label: "الرابع (4)" },
                  { id: "5", label: "الخامس (5)" },
                ].map((item) => {
                  const isSelected = localFilters.floor === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, floor: item.id })
                      }
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. السعر / ليلة */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#7D8A78]" />
                <span>السعر / ليلة</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الأسعار" },
                  { id: "less200", label: "أقل من 200 ر.س" },
                  { id: "200-350", label: "200 - 350 ر.س" },
                  { id: "more350", label: "أكثر من 350 ر.س" },
                ].map((item) => {
                  const isSelected = localFilters.priceRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, priceRange: item.id })
                      }
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. ترتيب حسب */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>ترتيب حسب</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: "default", label: "الافتراضي (الأحدث أولاً)" },
                  { id: "price_asc", label: "السعر (من الأقل للأعلى)" },
                  { id: "price_desc", label: "السعر (من الأعلى للأقل)" },
                  { id: "unit_asc", label: "رقم الوحدة (تصاعدي)" },
                ].map((item) => {
                  const isSelected = localFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, sortBy: item.id })
                      }
                      className={cn(
                        "w-full py-2.5 px-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#34432E] text-white border-[#34432E] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-[#EEF2E6] bg-[#FAFCF8] flex items-center gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 h-10 rounded-xl bg-[#34432E] hover:bg-[#2A3725] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <span>تطبيق التصفية</span>
              <span className="text-[11px] opacity-80">
                ({totalResultsCount} نتائج)
              </span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="h-10 px-4 rounded-xl border border-[#E2E6DC] bg-white hover:bg-[#F4F6F0] text-[#7D8A78] hover:text-[#172115] font-semibold text-xs transition-colors cursor-pointer"
            >
              إعادة ضبط
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
