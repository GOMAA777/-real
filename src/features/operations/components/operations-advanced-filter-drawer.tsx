"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  Building2,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  UserCheck,
  ArrowUpDown,
  Sparkles,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OperationFilterState, initialOperationFilterState } from "../types";

interface OperationsAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: OperationFilterState;
  onApplyFilters: (filters: OperationFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function OperationsAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: OperationsAdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] =
    useState<OperationFilterState>(filters);

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
    setLocalFilters(initialOperationFilterState);
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

      {/* Drawer Panel on Left side in RTL (so it doesn't collide with the right sidebar) */}
      <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
        <div className="w-screen sm:w-[420px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300 font-cairo">
          {/* Header */}
          <div className="p-5 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  تصفية العمليات المتقدمة
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  فرز وتخصيص مهام التنظيف والصيانة
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

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. نوع العملية (Operation Type) */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#7D8A78]" />
                <span>نوع العملية</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "جميع العمليات" },
                  { id: "cleaning", label: "التنظيف" },
                  { id: "maintenance", label: "الصيانة" },
                ].map((item) => {
                  const isSelected = localFilters.type === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          type: item.id as any,
                        })
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

            {/* 2. حالة العملية (Status) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7D8A78]" />
                <span>حالة العملية</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الحالات" },
                  { id: "needs_cleaning", label: "يحتاج تنظيف" },
                  { id: "pending", label: "قيد الانتظار" },
                  { id: "in_progress", label: "جاري التنفيذ" },
                  { id: "completed", label: "مكتملة" },
                  { id: "cancelled", label: "ملغاة" },
                ].map((item) => {
                  const isSelected = localFilters.status === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          status: item.id as any,
                        })
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

            {/* 3. درجة الأولوية (Priority) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#7D8A78]" />
                <span>درجة الأولوية</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع الأولويات" },
                  { id: "urgent", label: "🚨 طارئة وعاجلة" },
                  { id: "high", label: "🔴 عالية" },
                  { id: "medium", label: "🟡 متوسطة" },
                  { id: "low", label: "🟢 منخفضة" },
                ].map((item) => {
                  const isSelected = localFilters.priority === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          priority: item.id as any,
                        })
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

            {/* 4. المدينة (City) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7D8A78]" />
                <span>المدينة</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع المدن" },
                  { id: "الرياض", label: "الرياض" },
                  { id: "جدة", label: "جدة" },
                  { id: "الخبر", label: "الخبر" },
                ].map((item) => {
                  const isSelected = localFilters.city === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          city: item.id,
                        })
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

            {/* 5. العقار (Property) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#7D8A78]" />
                <span>العقار</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "جميع العقارات" },
                  { id: "عمارة النخيل", label: "عمارة النخيل" },
                  { id: "مجمع الواحة السكني", label: "مجمع الواحة" },
                  { id: "برج الياسمين", label: "برج الياسمين" },
                  { id: "ديار قرطبة", label: "ديار قرطبة" },
                ].map((item) => {
                  const isSelected = localFilters.property === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          property: item.id,
                        })
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

            {/* 6. حالة الإسناد (Assignee Status) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#7D8A78]" />
                <span>حالة الإسناد للمسؤول</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "assigned", label: "مسند" },
                  { id: "unassigned", label: "غير مسند" },
                ].map((item) => {
                  const isSelected = localFilters.assigneeStatus === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          assigneeStatus: item.id as any,
                        })
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

            {/* 7. الترتيب حسب (Sort By) */}
            <div className="space-y-2.5 pt-4 border-t border-[#EEF2E6]">
              <label className="text-xs font-bold text-[#172115] flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#7D8A78]" />
                <span>الترتيب حسب</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: "default", label: "الترتيب التلقائي الافتراضي" },
                  { id: "date_desc", label: "الأحدث تاريخاً أولاً" },
                  { id: "date_asc", label: "الأقدم تاريخاً أولاً" },
                  { id: "priority_desc", label: "الأولوية (العاجلة والطارئة أولاً)" },
                  { id: "task_asc", label: "رقم المهمة تصاعدياً" },
                ].map((item) => {
                  const isSelected = localFilters.sortBy === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          sortBy: item.id as any,
                        })
                      }
                      className={cn(
                        "w-full py-2.5 px-3.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer select-none text-right",
                        isSelected
                          ? "bg-[#F2F5ED] text-[#2E3C29] border-[#34432E] font-bold"
                          : "bg-white hover:bg-[#F9FAF7] text-[#4A5745] border-[#E2E6DC]"
                      )}
                    >
                      <span>{item.label}</span>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-[#34432E]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-[#EEF2E6] bg-[#FAFCF8] space-y-2.5">
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3 bg-[#34432E] hover:bg-[#2C3825] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer select-none flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>تطبيق الفلتر (عرض {totalResultsCount} مهمة)</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 bg-transparent hover:bg-[#EFF2EB] text-[#7D8A78] hover:text-[#172115] font-semibold text-xs rounded-xl transition-colors cursor-pointer select-none"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
