"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ArrowRightLeft,
  Search,
  Check,
  Building2,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface ChangeUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode?: string;
  onConfirm?: (newUnit: string) => void;
}

export function ChangeUnitModal({
  isOpen,
  onClose,
  bookingCode = "BK-10482",
  onConfirm,
}: ChangeUnitModalProps) {
  const [selectedUnitId, setSelectedUnitId] = useState("208");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollLock(isOpen);

  if (!isOpen || !mounted) return null;

  const units = [
    {
      id: "208",
      name: "وحدة 208",
      floor: "الدور الثاني",
      specs: "جناح تنفيذي بلس (غرفة نوم وصالة) ▪ شرفة خاصة وإطلالة شرقية",
      status: "متاحة ومطابقة",
      price: "650 ر.س",
      priceNote: "متطابق بالسعر",
      priceColor: "text-[#75786F]",
      badge: "الخيار المحدد",
    },
    {
      id: "202",
      name: "وحدة 202",
      floor: "الدور الثاني",
      specs: "استوديو بريميوم مع مطبخ تحضيري ▪ إطلالة هادئة",
      status: "متاحة ومطابقة",
      price: "620 ر.س",
      priceNote: "وفر 90 ر.س إجمالي",
      priceColor: "text-[#54624C]",
      badge: null,
    },
    {
      id: "304",
      name: "وحدة 304",
      floor: "الدور الثالث",
      specs: "جناح عائلي ديلوكس (غرفتي نوم) ▪ إطلالة علوية",
      status: "متاحة ومطابقة",
      price: "710 ر.س",
      priceNote: "فارق ترقية (+180 ر.س)",
      priceColor: "text-[#75786F]",
      badge: null,
    },
  ];

  const filteredUnits = units.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.floor.toLowerCase().includes(q) ||
      u.specs.toLowerCase().includes(q)
    );
  });

  const selectedUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const confirm = useConfirm();

  const handleConfirm = async () => {
    const ok = await confirm({
      title: "تأكيد نقل الوحدة",
      message: `هل أنت متأكد من رغبتك في نقل الحجز ${bookingCode} إلى (${selectedUnit.name})؟ سيتم تحديث رمز القفل الذكي وإخطار النزيل فوراً.`,
      confirmLabel: "تأكيد النقل",
      variant: "default",
    });
    if (!ok) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم تغيير الوحدة بنجاح", {
        description: `تم نقل الحجز إلى وحدة ${selectedUnitId} وتحديث رمز القفل الذكي تلقائياً`,
      });
      if (onConfirm) onConfirm(`وحدة ${selectedUnitId}`);
      onClose();
    }, 500);
  };

  return createPortal(
    <div
      className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      dir="rtl"
    >
      {/* Full-viewport Backdrop */}
      <div
        className="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card (Matching Figma node 1:9150 exactly) */}
      <div className="relative bg-white rounded-[16px] max-w-[660px] w-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] text-right z-10 max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* 1. MODAL HEADER (Matching Figma node 1:9151) */}
        <div className="bg-white flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
          {/* Right in RTL: Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D8E8CB] flex items-center justify-center text-[#34422A] shrink-0">
                <ArrowRightLeft className="w-4 h-4 stroke-[2.2]" />
              </div>
              <h2 className="text-2xl font-bold font-cairo text-[#181D17] tracking-tight">
                تغيير الوحدة
              </h2>
            </div>
            <p className="text-[13px] text-[#454840] leading-snug">
              <span>نقل الحجز </span>
              <span className="font-bold text-[#181D17] font-mono">{bookingCode}</span>
              <span> إلى وحدة بديلة متاحة لنفس تواريخ الإقامة</span>
            </p>
          </div>

          {/* Left in RTL: Close Button (node 1:9152) */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F1F5EB] hover:bg-[#E4ECDD] text-[#454840] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* 2. MODAL SCROLLABLE CONTENT BODY (Matching Figma node 1:9166) */}
        <div className="px-6 py-2 space-y-4 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#D5DDD0_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#D5DDD0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          
          {/* SECTION 1: Current Unit Information (node 1:9167) */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col gap-1">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#454840]">
                <Building2 className="w-3.5 h-3.5 text-[#454840]" />
                <span>الوحدة الحالية المسجلة</span>
              </div>
              <span className="bg-[#DFE4DB] text-[#454840] text-[11px] font-medium px-2.5 py-0.5 rounded-full select-none">
                الحجز قائم
              </span>
            </div>

            {/* Bottom row: Unit details & Stay dates box */}
            <div className="flex items-center justify-between pt-1 gap-3">
              <div className="space-y-0.5">
                <div className="text-lg font-bold font-cairo text-[#181D17]">
                  الوحدة 204 — جناح تنفيذي فاخر
                </div>
                <div className="text-[13px] text-[#454840] leading-snug">
                  عمارة النخيل (الرياض - حي العليا) ▪ الدور الثاني ▪ المالك: محمد بن سعود العتيبي
                </div>
              </div>

              {/* White Dates Card */}
              <div className="bg-white rounded-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-2 w-[145px] text-center shrink-0">
                <div className="text-[11px] text-[#75786F] font-medium leading-tight">
                  فترة الإقامة الحالية
                </div>
                <div className="text-xs font-bold text-[#181D17] leading-tight pt-1 whitespace-nowrap">
                  18 - 21 سبتمبر (3 ليالٍ)
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Available Unit Selection (node 1:9186) */}
          <div className="space-y-2 pt-1">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-cairo text-[#181D17] leading-snug">
                  اختيار الوحدة البديلة المتاحة
                </h3>
                <p className="text-[13px] text-[#454840] leading-snug">
                  يتم عرض الوحدات التابعة لنفس العقار والمتاحة بالكامل لنفس تواريخ الحجز المختارة فقط.
                </p>
              </div>
              <span className="bg-[#D8E8CB]/50 text-[#54624C] text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 select-none">
                3 وحدات متوافقة
              </span>
            </div>

            {/* Search Input (node 1:9195) */}
            <div className="bg-[#F1F5EB] rounded-[12px] h-[44px] px-4 flex items-center justify-between text-xs transition-colors focus-within:ring-1 focus-within:ring-[#4B5940]">
              <input
                type="text"
                placeholder="ابحث برقم الوحدة، الدور، أو نوع الجناح..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[13px] text-[#181D17] placeholder-[#75786F] w-full pe-2"
              />
              <Search className="w-4 h-4 text-[#75786F] shrink-0" />
            </div>

            {/* Unit Selection Radiogroup (node 1:9201) */}
            <div className="space-y-2 pt-1">
              {filteredUnits.map((unit) => {
                const isSelected = selectedUnitId === unit.id;
                return (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedUnitId(unit.id)}
                    className={`rounded-[12px] p-4 flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#D8E8CB]/40 ring-[1.5px] ring-[#4B5940] shadow-xs"
                        : "bg-[#F1F5EB] border border-transparent hover:border-[#DEE7D7]"
                    }`}
                  >
                    {/* Right side in RTL: Radio Indicator + Unit Info */}
                    <div className="flex items-center gap-3.5">
                      {/* Custom Radio Button */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#34422A] text-white"
                            : "bg-white border border-[#CBD5C7]"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold font-cairo text-[#181D17]">
                            {unit.name}
                          </span>
                          <span className="bg-white rounded px-2 py-0.5 text-[11px] font-medium text-[#181D17] shadow-3xs select-none">
                            {unit.floor}
                          </span>
                          {unit.badge && (
                            <span className="bg-[#34422A] text-white rounded px-2 py-0.5 text-[11px] font-semibold select-none">
                              {unit.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[13px] text-[#454840]">
                          {unit.specs}
                        </div>
                      </div>
                    </div>

                    {/* Left side in RTL: Status + Pricing */}
                    <div className="text-left shrink-0 space-y-0.5">
                      <div className="flex items-center gap-1.5 justify-end text-[11px] font-bold text-[#34422A]">
                        <span>{unit.status}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34422A]" />
                      </div>
                      <div className="text-xs text-left">
                        <span className="font-bold text-[#181D17] text-xs font-mono">
                          {unit.price}
                        </span>
                        <span className="text-[#75786F] text-xs"> / ليلة</span>
                      </div>
                      <div className={`text-[11px] font-medium ${unit.priceColor}`}>
                        {unit.priceNote}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Confirmation Summary & Automation Notice (node 1:9276) */}
          <div className="space-y-2 pt-1">
            {/* Comparison Box (node 1:9277) */}
            <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col gap-2">
              <div className="text-[11px] font-medium text-[#75786F] text-right">
                ملخص المقارنة قبل النقل
              </div>
              <div className="flex items-center justify-between gap-3">
                {/* Current Unit (Right in RTL) */}
                <div className="bg-white rounded-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-2.5 flex-1 text-center">
                  <div className="text-[11px] font-medium text-[#454840]">
                    الوحدة الحالية
                  </div>
                  <div className="text-lg font-bold font-cairo text-[#181D17] pt-0.5">
                    وحدة 204
                  </div>
                </div>

                {/* Transition Direction Indicator */}
                <div className="w-8 h-8 rounded-full bg-[#E5EAE0] flex items-center justify-center shrink-0 text-[#34422A]">
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>

                {/* Selected Unit (Left in RTL) */}
                <div className="bg-[#D8E8CB]/50 rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-2.5 flex-1 text-center">
                  <div className="text-[11px] font-semibold text-[#34422A]">
                    الوحدة الجديدة المختارة
                  </div>
                  <div className="text-lg font-bold font-cairo text-[#34422A] pt-0.5">
                    وحدة {selectedUnit.id}
                  </div>
                </div>
              </div>
            </div>

            {/* Automation Security Banner (node 1:9292) */}
            <div className="bg-[#D8E8CB]/40 rounded-[12px] p-4 flex items-start gap-3">
              <div className="w-5 h-5 rounded-md flex items-center justify-center text-[#34422A] shrink-0 mt-0.5">
                <RotateCcw className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#34422A]">
                  تنبيه المزامنة والأتمتة الفورية
                </div>
                <div className="text-[13px] text-[#454840] leading-relaxed">
                  <span>سيتم فوراً تحويل صلاحيات القفل الذكي وإرسال رمز الدخول الجديد عبر الرسائل النصية للنزيل </span>
                  <strong className="font-bold text-[#181D17]">خالد العتيبي</strong>
                  <span>، مع تحديث تقويم التوافر على </span>
                  <strong className="font-semibold text-[#181D17]">Whatsapp.com</strong>
                  <span> تلقائياً.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MODAL FOOTER (Matching Figma node 1:9305) */}
        <div className="bg-[#F1F5EB] px-6 py-4 rounded-b-[16px] flex items-center justify-start gap-2.5 shrink-0">
          {/* Primary Action Button (node 1:9306) */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="h-11 px-8 rounded-[12px] bg-[#34422A] hover:bg-[#283420] text-white font-bold text-sm flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer disabled:opacity-70 active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? "جارٍ التحديث..." : "تأكيد تغيير الوحدة"}</span>
          </button>

          {/* Cancel Button (node 1:9311) */}
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-[12px] bg-white hover:bg-[#EAEFE6] text-[#181D17] font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer shadow-3xs"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
