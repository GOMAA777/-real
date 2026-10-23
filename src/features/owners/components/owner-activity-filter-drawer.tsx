"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, Check, ShieldCheck, UserCheck, Calendar, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActivityFilterState {
  category: string; // "all" | "إدارة الأصول" | "مخزون الوحدات" | "الأمان والوصول" | "Channel Manager"
  actor: string; // "all" | "محمد العتيبي" | "النظام الآلي" | "Booking.com"
  timeRange: string; // "all" | "today" | "7days" | "30days"
  sortBy: string; // "latest" | "oldest"
}

interface OwnerActivityFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ActivityFilterState;
  onApplyFilters: (filters: ActivityFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function OwnerActivityFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: OwnerActivityFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<ActivityFilterState>(filters);

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
    const resetState: ActivityFilterState = {
      category: "all",
      actor: "all",
      timeRange: "all",
      sortBy: "latest",
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
                  تصفية سجل النشاط
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  فلترة وتدقيق العمليات والإجراءات
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
            {/* 1. نوع الإجراء / التصنيف */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7D8A78]" />
                <span>نوع الإجراء (التصنيف)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الإجراءات (الكل)" },
                  { id: "إدارة الأصول", label: "إدارة الأصول" },
                  { id: "مخزون الوحدات", label: "مخزون الوحدات" },
                  { id: "الأمان والوصول", label: "الأمان والوصول" },
                  { id: "Channel Manager", label: "قنوات التوزيع" },
                ].map((item) => {
                  const isSelected = localFilters.category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, category: item.id })
                      }
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none text-start",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span className="truncate">{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. المنفذ */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#7D8A78]" />
                <span>المنفذ</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: "all", label: "الكل (جميع المنفذين)" },
                  { id: "محمد العتيبي", label: "محمد العتيبي (مالك معتمد)" },
                  { id: "النظام الآلي", label: "النظام الآلي الذكي" },
                  { id: "Booking.com", label: "Booking.com (تكامل خارجي)" },
                ].map((item) => {
                  const isSelected = localFilters.actor === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, actor: item.id })
                      }
                      className={cn(
                        "w-full py-2.5 px-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none text-start",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. النطاق الزمني */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#7D8A78]" />
                <span>النطاق الزمني</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الأوقات" },
                  { id: "today", label: "اليوم" },
                  { id: "7days", label: "آخر 7 أيام" },
                  { id: "30days", label: "آخر 30 يوماً" },
                ].map((item) => {
                  const isSelected = localFilters.timeRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, timeRange: item.id })
                      }
                      className={cn(
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. ترتيب حسب */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>ترتيب النتائج</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "latest", label: "الأحدث أولاً" },
                  { id: "oldest", label: "الأقدم أولاً" },
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
                        "py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                          : "bg-white hover:bg-[#F6F8F4] text-[#172115] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
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
                {totalResultsCount} عملية
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
