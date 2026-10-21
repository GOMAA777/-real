"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Filter,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioDot } from "./ui";
import { PickerPropertyRow } from "./picker-data";

interface PropertyPickerPopupProps {
  open: boolean;
  onClose: () => void;
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  properties: PickerPropertyRow[];
}

const GRID = "grid grid-cols-[1fr_84px_86px_76px_112px] items-center gap-2";

export function PropertyPickerPopup({
  open,
  onClose,
  selectedId,
  onSelect,
  onConfirm,
  properties,
}: PropertyPickerPopupProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return properties;
    return properties.filter(
      (p) =>
        p.name.includes(q) ||
        p.code.toLowerCase().includes(q.toLowerCase()) ||
        p.district.includes(q) ||
        p.city.includes(q)
    );
  }, [properties, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/55 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[672px] bg-white rounded-[16px] shadow-2xl flex flex-col h-[664px] max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[22px] leading-[30px] font-bold text-[#181D17]">
              اختيار العقار
            </h2>
            <p className="mt-1 text-[12px] leading-[19px] text-[#7C8773]">
              عرض العقارات التابعة لمالك العقار المختار:{" "}
              <span className="font-bold text-[#3F4A36]">محمد العتيبي</span> (3
              عقارات مسجلة) لربط الوحدة الجديدة.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 mt-0.5 w-7 h-7 flex items-center justify-center text-[#34422A] transition-opacity hover:opacity-70 cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Owner strip */}
        <div className="mx-6 px-4 py-2.5 rounded-[10px] bg-[#F1F5EB] flex items-center justify-between gap-3 text-[12px]">
          <span className="flex items-center gap-1.5 text-[#3F4A36]">
            <Filter className="w-3.5 h-3.5" strokeWidth={1.8} />
            يتم عرض عقارات هذا المالك فقط
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#7C8773]">
              معرف المالك: <span className="font-mono text-[#181D17]">OWN-4491</span>
            </span>
            <span className="font-bold text-[#181D17]">محمد العتيبي</span>
            <span className="w-6 h-6 rounded-full bg-[#D8E8CB] text-[#34422A] text-[11px] font-bold flex items-center justify-center">
              م
            </span>
          </span>
        </div>

        {/* Controls */}
        <div className="px-6 pt-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-[#7C8773] absolute start-3.5 top-1/2 -translate-y-1/2"
              strokeWidth={1.8}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم العقار، المدينة، أو رقم المعرف..."
              className="w-full h-[38px] rounded-[10px] bg-[#F1F5EB] ps-10 pe-10 text-[12px] text-[#181D17] placeholder:text-[#5E6B56] focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-[#A3AC9E] hover:text-[#7C8773] cursor-pointer"
                aria-label="مسح البحث"
              >
                <XCircle className="w-4 h-4" strokeWidth={1.6} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="shrink-0 h-[38px] px-3 rounded-[10px] bg-[#F1F5EB] text-[11.5px] text-[#3F4A36] flex items-center gap-1.5 cursor-pointer"
          >
            <span>الترتيب: الأكثر وحدات</span>
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Table */}
        <div className="px-6 pt-3 flex-1 overflow-y-auto">
          <div
            className={cn(
              GRID,
              "h-8 px-3 rounded-[8px] bg-[#F1F5EB] text-[11px] text-[#7C8773]"
            )}
          >
            <span>العقار</span>
            <span>المدينة</span>
            <span>عدد الوحدات</span>
            <span>الحالة</span>
            <span>التحديد</span>
          </div>

          <div className="mt-1 space-y-1">
            {filtered.map((p) => {
              const isSelected = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelect(p.id)}
                  className={cn(
                    GRID,
                    "relative w-full h-[58px] px-3 rounded-[6px] text-start transition-colors cursor-pointer overflow-hidden",
                    isSelected ? "bg-[#EAF1E8]" : "bg-white hover:bg-[#FAFBF7]"
                  )}
                >
                  {isSelected ? (
                    <span className="absolute start-0 top-0 h-full w-[3px] bg-[#34422A]" />
                  ) : null}

                  {/* Property */}
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "w-9 h-9 shrink-0 rounded-[8px] flex items-center justify-center",
                        isSelected
                          ? "bg-[#34422A] text-white"
                          : "bg-[#F1F5EB] text-[#3F4A36]"
                      )}
                    >
                      <Building2 className="w-4 h-4" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-bold text-[#181D17]">
                        {p.name}
                      </span>
                      <span className="block text-[10px] text-[#8A9384]">
                        {p.code} • {p.district}
                      </span>
                    </span>
                  </span>

                  {/* City */}
                  <span className="text-[11px] text-[#3F4A36]">{p.city}</span>

                  {/* Units */}
                  <span
                    className={cn(
                      "justify-self-start h-[26px] px-2.5 rounded-[6px] text-[11px] font-semibold flex items-center whitespace-nowrap",
                      isSelected
                        ? "bg-white text-[#181D17]"
                        : "bg-[#F1F5EB] text-[#3F4A36]"
                    )}
                  >
                    {p.unitsCount} وحدة
                  </span>

                  {/* Status */}
                  <span className="justify-self-start h-6 px-2.5 rounded-full bg-[#D8E8CB] text-[10.5px] font-bold text-[#2F5A22] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F8A3F]" />
                    {p.active ? "نشط" : "غير نشط"}
                  </span>

                  {/* Selection */}
                  <span className="flex items-center gap-2 justify-self-start">
                    {isSelected ? (
                      <>
                        <RadioDot selected />
                        <span className="text-[11px] font-bold text-[#181D17] whitespace-nowrap">
                          تم الاختيار
                        </span>
                      </>
                    ) : (
                      <span className="h-[30px] px-3 rounded-[8px] bg-[#F1F5EB] text-[10.5px] text-[#3F4A36] flex items-center">
                        اختيار
                      </span>
                    )}
                  </span>
                </button>
              );
            })}

            {filtered.length === 0 ? (
              <div className="py-10 text-center text-[12px] text-[#7C8773]">
                لا توجد عقارات مطابقة لبحثك
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F1F5EB] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-[10px] text-[12.5px] font-semibold text-[#181D17] hover:bg-white/60 transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 px-6 rounded-[10px] bg-[#34422A] hover:bg-[#2C3825] text-white text-[12.5px] font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد الاختيار</span>
          </button>
        </div>
      </div>
    </div>
  );
}
