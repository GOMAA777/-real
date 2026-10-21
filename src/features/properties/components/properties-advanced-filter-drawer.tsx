"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Building2,
  MapPin,
  Home,
  Users,
  CheckCircle2,
  CalendarDays,
  ArrowUpDown,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MainPropertyFilterState, initialPropertyFilterState } from "../types";

interface PropertiesAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MainPropertyFilterState;
  onApplyFilters: (filters: MainPropertyFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function PropertiesAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: PropertiesAdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<MainPropertyFilterState>(filters);

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
    setLocalFilters(initialPropertyFilterState);
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
                  تصفية العقارات المتقدمة
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تخصيص وفرز العقارات المسجلة حسب كافة المعايير
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
            {/* 1. نوع العقار */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7D8A78]" />
                <span>نوع العقار</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الأنواع" },
                  { id: "عقار سكني وتأجير مؤقت", label: "سكني وتأجير مؤقت" },
                  { id: "عقار تجاري", label: "عقار تجاري" },
                  { id: "مجمع سكني", label: "مجمع سكني" },
                  { id: "فيلا خاصة", label: "فيلا خاصة" },
                ].map((item) => {
                  const isSelected = localFilters.propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, propertyType: item.id })
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

            {/* 2. المدينة */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7D8A78]" />
                <span>المدينة</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "الرياض", label: "الرياض" },
                  { id: "جدة", label: "جدة" },
                  { id: "الدمام", label: "الدمام" },
                  { id: "الخبر", label: "الخبر" },
                  { id: "مكة المكرمة", label: "مكة المكرمة" },
                ].map((item) => {
                  const isSelected = localFilters.city === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, city: item.id })
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

            {/* 3. الحي */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7D8A78]" />
                <span>الحي</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "جميع الأحياء" },
                  { id: "حي النخيل", label: "حي النخيل" },
                  { id: "حي الملقا", label: "حي الملقا" },
                  { id: "حي الياسمين", label: "حي الياسمين" },
                  { id: "حي الروضة", label: "حي الروضة" },
                  { id: "حي العليا", label: "حي العليا" },
                ].map((item) => {
                  const isSelected = localFilters.district === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, district: item.id })
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

            {/* 4. حالة العقار */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7D8A78]" />
                <span>حالة العقار</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الحالات" },
                  { id: "active", label: "نشط تشغيلياً" },
                  { id: "inactive", label: "غير نشط" },
                  { id: "archived", label: "مؤرشف" },
                ].map((item) => {
                  const isSelected = localFilters.status === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, status: item.id })
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

            {/* 5. عدد الوحدات */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Home className="w-4 h-4 text-[#7D8A78]" />
                <span>عدد الوحدات</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "less5", label: "أقل من 5 وحدات" },
                  { id: "5-10", label: "5 - 10 وحدات" },
                  { id: "11-20", label: "11 - 20 وحدة" },
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

            {/* 6. نسبة الإشغال */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#7D8A78]" />
                <span>نسبة الإشغال</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "كافة النسب" },
                  { id: "full", label: "إشغال كامل (100%)" },
                  { id: "partial", label: "إشغال جزئي (>50%)" },
                  { id: "low", label: "شاغر كبير (<50%)" },
                ].map((item) => {
                  const isSelected = localFilters.occupancyState === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, occupancyState: item.id })
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

            {/* 7. الحجوزات النشطة */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#7D8A78]" />
                <span>الحجوزات النشطة</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "has_bookings", label: "توجد حجوزات نشطة" },
                  { id: "no_bookings", label: "لا توجد حجوزات حالياً" },
                ].map((item) => {
                  const isSelected = localFilters.activeBookings === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, activeBookings: item.id })
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

            {/* 8. المالك */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#7D8A78]" />
                <span>مالك العقار</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الملاك" },
                  { id: "محمد العتيبي", label: "محمد العتيبي" },
                  { id: "فهد القحطاني", label: "فهد القحطاني" },
                  { id: "سارة الشمري", label: "سارة الشمري" },
                  { id: "خالد الدوسري", label: "خالد الدوسري" },
                ].map((item) => {
                  const isSelected = localFilters.owner === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, owner: item.id })
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

            {/* 9. الترتيب */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>الترتيب حسب</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "default", label: "الافتراضي" },
                  { id: "date_desc", label: "الأحدث إضافة" },
                  { id: "date_asc", label: "الأقدم إضافة" },
                  { id: "units_desc", label: "الأكثر وحدات" },
                  { id: "units_asc", label: "الأقل وحدات" },
                  { id: "bookings_desc", label: "الأكثر حجوزات" },
                  { id: "name_asc", label: "الاسم أبجدياً" },
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
