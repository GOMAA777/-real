"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, Check, Calendar, CreditCard, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BillingFilterState {
  status: string; // "all" | "paid" | "processing"
  period: string; // "all" | "september_2026" | "august_2026"
  payoutRange: string; // "all" | "less35k" | "35k-40k" | "more40k"
  sortBy: string; // "default" | "date_desc" | "net_desc" | "invoice_asc"
}

interface OwnerBillingFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: BillingFilterState;
  onApplyFilters: (filters: BillingFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function OwnerBillingFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: OwnerBillingFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<BillingFilterState>(filters);

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
    const resetState: BillingFilterState = {
      status: "all",
      period: "all",
      payoutRange: "all",
      sortBy: "default",
    };
    setLocalFilters(resetState);
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
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
                  تصفية الفواتير والمستحقات
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5">
                  تحديد وتخصيص معايير البحث والفرز المالي
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#F4F6F1] hover:bg-[#E5EBDD] text-[#556350] flex items-center justify-center transition-colors cursor-pointer select-none"
              title="إغلاق النافذة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body - Scrollable Sections */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Section 1: حالة الفاتورة (Status) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#7D8A78]" />
                <span>حالة التسوية والتحويل</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "paid", label: "مسدد بالكامل" },
                  { id: "processing", label: "قيد التحويل" },
                ].map((item) => {
                  const isSelected = localFilters.status === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, status: item.id })}
                      className={cn(
                        "h-10 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] border-[#2E3C29] text-white shadow-2xs"
                          : "bg-[#F8FAF6] border-[#E0E5D9] text-[#4A5745] hover:border-[#CCD5C5] hover:bg-[#EEF2E6]"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: الفترة المحاسبية (Period) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#7D8A78]" />
                <span>الفترة المحاسبية</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "all", label: "جميع الفترات الزمنية" },
                  { id: "september_2026", label: "سبتمبر 2026 (الدورة الحالية)" },
                  { id: "august_2026", label: "أغسطس 2026" },
                ].map((item) => {
                  const isSelected = localFilters.period === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, period: item.id })}
                      className={cn(
                        "h-11 px-4 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] border-[#2E3C29] text-white shadow-2xs"
                          : "bg-[#F8FAF6] border-[#E0E5D9] text-[#4A5745] hover:border-[#CCD5C5] hover:bg-[#EEF2E6]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: صافي المستحق (Payout Range) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#172115]">
                نطاق صافي المستحق للمالك
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "كافة المبالغ" },
                  { id: "less35k", label: "أقل من 35,000 ر.س" },
                  { id: "35k-40k", label: "35,000 - 40,000 ر.س" },
                  { id: "more40k", label: "أكثر من 40,000 ر.س" },
                ].map((item) => {
                  const isSelected = localFilters.payoutRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, payoutRange: item.id })}
                      className={cn(
                        "h-10 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all cursor-pointer select-none text-center",
                        isSelected
                          ? "bg-[#2E3C29] border-[#2E3C29] text-white shadow-2xs"
                          : "bg-[#F8FAF6] border-[#E0E5D9] text-[#4A5745] hover:border-[#CCD5C5] hover:bg-[#EEF2E6]"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: ترتيب النتائج (Sort By) */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-1.5">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>ترتيب النتائج</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "default", label: "الترتيب الافتراضي (الأحدث تاريخاً)" },
                  { id: "net_desc", label: "الأعلى في صافي المستحق" },
                  { id: "gross_desc", label: "الأعلى في إجمالي الدخل" },
                  { id: "invoice_asc", label: "رقم الفاتورة (تصاعدي)" },
                ].map((item) => {
                  const isSelected = localFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, sortBy: item.id })}
                      className={cn(
                        "h-11 px-4 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer select-none",
                        isSelected
                          ? "bg-[#2E3C29] border-[#2E3C29] text-white shadow-2xs"
                          : "bg-[#F8FAF6] border-[#E0E5D9] text-[#4A5745] hover:border-[#CCD5C5] hover:bg-[#EEF2E6]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-[#EEF2E6] bg-[#FAFCF8] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-[#CCD5C5] bg-white hover:bg-[#F4F6F1] text-xs font-bold text-[#4A5745] transition-colors cursor-pointer select-none"
            >
              إعادة تعيين
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#2E3C29] hover:bg-[#232F1F] text-xs font-bold text-white transition-colors cursor-pointer shadow-xs select-none flex items-center justify-center gap-2"
            >
              <span>تطبيق التصفية</span>
              <span className="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                {totalResultsCount} نتائج
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
