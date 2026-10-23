"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Building2,
  Calendar,
  CreditCard,
  DollarSign,
  ArrowUpDown,
  Home,
  Globe,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MainBookingFilterState, initialBookingFilterState } from "../types";

interface BookingsAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MainBookingFilterState;
  onApplyFilters: (filters: MainBookingFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function BookingsAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: BookingsAdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<MainBookingFilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
    setLocalFilters(initialBookingFilterState);
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-cairo" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel on Left side in RTL so it doesn't collide with the right sidebar */}
      <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
        <div className="w-screen sm:w-[440px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  تصفية الحجوزات المتقدمة
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تخصيص وفرز الحجوزات التشغيلية والمالية
                </p>
              </div>
            </div>

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
            {/* 1. منصة / قناة الحجز */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#7D8A78]" />
                <span>قناة الحجز (المنصة)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "جميع القنوات" },
                  { id: "مباشر", label: "مباشر" },
                  { id: "Airbnb", label: "Airbnb" },
                  { id: "Booking.com", label: "Booking.com" },
                  { id: "Gathern", label: "جاذر إن" },
                  { id: "Agoda", label: "Agoda" },
                ].map((item) => {
                  const isSelected = localFilters.source === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, source: item.id })
                      }
                      className={cn(
                        "py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center transition-all cursor-pointer select-none truncate",
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

            {/* 2. العقار */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7D8A78]" />
                <span>العقار</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "كافة العقارات" },
                  { id: "عمارة النخيل", label: "عمارة النخيل" },
                  { id: "برج الياسمين", label: "برج الياسمين" },
                  { id: "مجمع الواحة السكني", label: "مجمع الواحة" },
                  { id: "أبراج العليا", label: "أبراج العليا" },
                  { id: "ديار الهدى", label: "ديار الهدى" },
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

            {/* 3. نوع الوحدة */}
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
                  { id: "جناح", label: "جناح" },
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

            {/* 4. حالة الدفع */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#7D8A78]" />
                <span>حالة الدفع والتسوية</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الحالات" },
                  { id: "مدفوع بالكامل", label: "مدفوع بالكامل" },
                  { id: "معلق", label: "معلق عند الوصول" },
                  { id: "مسترد", label: "مسترد / ملغى" },
                ].map((item) => {
                  const isSelected = localFilters.paymentStatus === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, paymentStatus: item.id })
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

            {/* 5. إجمالي قيمة الحجز */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#7D8A78]" />
                <span>إجمالي قيمة الحجز</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "كافة القيم" },
                  { id: "less1000", label: "أقل من 1,000 ر.س" },
                  { id: "1000-3000", label: "1,000 - 3,000 ر.س" },
                  { id: "more3000", label: "أكثر من 3,000 ر.س" },
                ].map((item) => {
                  const isSelected = localFilters.amountRange === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, amountRange: item.id })
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

            {/* 6. مدة الإقامة */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7D8A78]" />
                <span>مدة الإقامة (الليالي)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "كافة الفترات" },
                  { id: "1-2", label: "ليلة إلى ليلتان" },
                  { id: "3-7", label: "3 إلى 7 ليالٍ" },
                  { id: "more7", label: "أكثر من أسبوع" },
                ].map((item) => {
                  const isSelected = localFilters.stayDuration === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, stayDuration: item.id })
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

            {/* 7. الترتيب */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>الترتيب حسب</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "default", label: "الافتراضي" },
                  { id: "date_desc", label: "الأحدث وصولاً" },
                  { id: "date_asc", label: "الأقدم وصولاً" },
                  { id: "amount_desc", label: "القيمة الأعلى" },
                  { id: "amount_asc", label: "القيمة الأقل" },
                  { id: "code_asc", label: "رقم الحجز تصاعدياً" },
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
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-[#EEF2E6] bg-[#FAFCF8] flex items-center gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 h-11 bg-[#34432E] hover:bg-[#253220] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95"
            >
              <span>عرض النتائج</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                ({totalResultsCount})
              </span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="h-11 px-4 bg-[#F4F6F0] hover:bg-[#EAEFE6] text-[#2C3825] border border-[#DEE5DA] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer select-none"
              title="إعادة تعيين الكل"
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
