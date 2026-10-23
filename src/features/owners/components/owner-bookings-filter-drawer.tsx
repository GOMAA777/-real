"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, Check, Globe, KeyRound, ArrowUpDown, Building } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingFilterState {
  source: string; // "all" | "Booking.com" | "Airbnb" | "مباشر"
  accessStatus: string; // "all" | "connected" | "pending" | "disabled"
  propertyName: string; // "all" | "عمارة النخيل" | "مجمع الواحة"
  sortBy: string; // "default" | "checkin_desc" | "checkout_asc" | "code_asc"
}

interface OwnerBookingsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: BookingFilterState;
  onApplyFilters: (filters: BookingFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function OwnerBookingsFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: OwnerBookingsFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<BookingFilterState>(filters);

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
    const resetState: BookingFilterState = {
      source: "all",
      accessStatus: "all",
      propertyName: "all",
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

      {/* Drawer Panel (Left side in RTL) */}
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
                  تصفية الحجوزات
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تخصيص وفرز حجوزات النزلاء
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
            {/* 1. مصدر الحجز */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#7D8A78]" />
                <span>مصدر الحجز (المنصة)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع المنصات" },
                  { id: "Booking.com", label: "Booking.com" },
                  { id: "Airbnb", label: "Airbnb" },
                  { id: "مباشر", label: "حجز مباشر" },
                ].map((item) => {
                  const isSelected = localFilters.source === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, source: item.id })}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. حالة أقفال الدخول الذكي */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#7D8A78]" />
                <span>أكواد الدخول الذكي (Locks)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "connected", label: "متصل نشط" },
                  { id: "pending", label: "قيد التفعيل" },
                  { id: "disabled", label: "معطل / غير متصل" },
                ].map((item) => {
                  const isSelected = localFilters.accessStatus === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, accessStatus: item.id })
                      }
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. العقار المستهدف */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#7D8A78]" />
                <span>العقار</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: "all", label: "جميع عقارات المالك" },
                  { id: "عمارة النخيل", label: "عمارة النخيل (حي النخيل)" },
                  { id: "مجمع الواحة", label: "مجمع الواحة الفندقي" },
                ].map((item) => {
                  const isSelected = localFilters.propertyName === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, propertyName: item.id })
                      }
                      className={cn(
                        "w-full py-2.5 px-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none text-start",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. ترتيب النتائج */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>ترتيب حسب</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "default", label: "الافتراضي" },
                  { id: "checkin_desc", label: "أحدث تاريخ وصول" },
                  { id: "checkout_asc", label: "الأقرب مغادرة" },
                  { id: "code_asc", label: "رقم الحجز" },
                ].map((item) => {
                  const isSelected = localFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, sortBy: item.id })}
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#FAFCF8] border-t border-[#EEF2E6] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-[#E2E6DC] text-xs font-semibold text-[#7D8A78] hover:text-[#172115] hover:bg-[#F4F6F0] transition-colors cursor-pointer"
            >
              إعادة ضبط
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E3C29] hover:bg-[#232F1F] text-white text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>تطبيق التصفية</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px]">
                {totalResultsCount} حجز
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
