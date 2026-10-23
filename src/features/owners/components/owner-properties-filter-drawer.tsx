"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, Check, MapPin, Building, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PropertyFilterState {
  city: string; // "all" | "الرياض" | "جدة"
  status: string; // "all" | "available" | "reserved"
  unitsRange: string; // "all" | "less10" | "10-20" | "more20"
  sortBy: string; // "default" | "units_desc" | "bookings_desc" | "name_asc"
}

interface OwnerPropertiesFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PropertyFilterState;
  onApplyFilters: (filters: PropertyFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function OwnerPropertiesFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: OwnerPropertiesFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<PropertyFilterState>(filters);

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
    const resetState: PropertyFilterState = {
      city: "all",
      status: "all",
      unitsRange: "all",
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

      {/* Drawer Panel (Left side in RTL so it doesn't collide with sidebar) */}
      <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
        <div className="w-screen sm:w-[400px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  تصفية العقارات
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تخصيص وفرز عقارات المالك
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
            {/* 1. المدينة */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7D8A78]" />
                <span>المدينة</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "الرياض", label: "الرياض" },
                  { id: "جدة", label: "جدة" },
                ].map((item) => {
                  const isSelected = localFilters.city === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, city: item.id })}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. حالة العقار */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E3C29]" />
                <span>حالة العقار</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "available", label: "متاحة" },
                  { id: "reserved", label: "محجوزة" },
                ].map((item) => {
                  const isSelected = localFilters.status === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, status: item.id })}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. عدد الوحدات */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#7D8A78]" />
                <span>عدد الوحدات</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "less10", label: "أقل من 10 وحدات" },
                  { id: "10-20", label: "10 - 20 وحدة" },
                  { id: "more20", label: "أكثر من 20 وحدة" },
                ].map((item) => {
                  const isSelected = localFilters.unitsRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, unitsRange: item.id })
                      }
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#2C3825] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. ترتيب حسب */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>ترتيب حسب</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: "default", label: "الافتراضي (الأحدث أولاً)" },
                  { id: "units_desc", label: "عدد الوحدات (من الأكثر للأقل)" },
                  { id: "bookings_desc", label: "الحجوزات النشطة (من الأكثر للأقل)" },
                  { id: "name_asc", label: "أبجدياً (أ - ي)" },
                ].map((item) => {
                  const isSelected = localFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, sortBy: item.id })}
                      className={cn(
                        "w-full py-2.5 px-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs font-bold"
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
              className="flex-1 h-10 rounded-xl bg-[#2E3C29] hover:bg-[#232F1F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <span>تطبيق التصفية</span>
              <span className="text-[11px] opacity-80">({totalResultsCount} نتائج)</span>
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
