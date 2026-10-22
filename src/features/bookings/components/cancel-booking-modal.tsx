"use client";

import { useState } from "react";
import {
  X,
  CalendarX2,
  Calendar,
  Receipt,
  AlertTriangle,
  MinusCircle,
  RefreshCw,
  RotateCcw,
  CalendarX,
} from "lucide-react";
import { toast } from "sonner";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode?: string;
  onConfirm?: () => void;
}

export function CancelBookingModal({
  isOpen,
  onClose,
  bookingCode = "BK-10482",
  onConfirm,
}: CancelBookingModalProps) {
  const [selectedReason, setSelectedReason] = useState("طلب العميل");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // In Figma 2x2 Grid (node 1:10418):
  // Right Column (col 2): طلب العميل, مشكلة في الوحدة
  // Left Column (col 1): إلغاء من المالك, أخرى
  const reasonsColRight = [
    { id: "customer_request", label: "طلب العميل" },
    { id: "unit_issue", label: "مشكلة في الوحدة" },
  ];

  const reasonsColLeft = [
    { id: "owner_cancellation", label: "إلغاء من المالك" },
    { id: "other", label: "أخرى" },
  ];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.error("تم إلغاء الحجز بنجاح", {
        description: `تم إلغاء الحجز رقم ${bookingCode} وتحرير الوحدة في التقويم المركزي`,
      });
      if (onConfirm) onConfirm();
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      dir="rtl"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card (Matching Figma node 1:10356 exactly) */}
      <div className="relative bg-white rounded-[16px] max-w-[580px] w-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] text-right z-10 max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* 1. MODAL HEADER (Matching Figma node 1:10358) */}
        <div className="bg-white flex items-start justify-between px-6 pt-6 pb-4 shrink-0">
          {/* Right in RTL: Destructive Icon + Title & Subtitle (node 1:10362) */}
          <div className="flex items-start gap-3.5">
            {/* Warning Chip Icon (node 1:10369) */}
            <div className="w-12 h-12 rounded-[12px] bg-[#FFDAD6]/60 flex items-center justify-center shrink-0 shadow-xs text-[#BA1A1A]">
              <CalendarX2 className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold font-cairo text-[#181D17] leading-[33px] tracking-tight">
                إلغاء الحجز؟
              </h2>
              <p className="text-[13px] text-[#454840] leading-[21px]">
                إجراء إداري لإلغاء حجز مسجل على المنصة وتحديث قنوات التوافر.
              </p>
            </div>
          </div>

          {/* Left in RTL: Close Button (node 1:10359) */}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F1F5EB] hover:bg-[#E4ECDD] text-[#454840] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* 2. SCROLLABLE MODAL BODY (Matching Figma node 1:10372) */}
        <div className="px-6 py-2 space-y-4 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#D5DDD0_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#D5DDD0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          
          {/* Booking Summary Card (node 1:10373) */}
          <div className="bg-[#F1F5EB]/80 rounded-[12px] p-4 flex flex-col gap-2">
            {/* Top row */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-1.5 text-xs">
                <Receipt className="w-3.5 h-3.5 text-[#75786F]" />
                <span className="font-semibold text-[#75786F]">مرجع الحجز:</span>
                <span className="font-bold font-mono text-[#181D17] text-sm tracking-wider">
                  {bookingCode}
                </span>
              </div>
              <span className="bg-[#DFE4DB] text-[#54624C] text-[11px] font-semibold px-2.5 py-0.5 rounded-full select-none">
                مدفوع مسبقاً (2,450 ر.س)
              </span>
            </div>

            {/* Middle row: Two white info cards (node 1:10384) */}
            <div className="grid grid-cols-2 gap-2">
              {/* Box 1: Guest (Right in RTL - node 1:10392) */}
              <div className="bg-white rounded-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-2.5 space-y-0.5 text-right">
                <div className="text-[11px] text-[#75786F] font-medium leading-tight">
                  العميل / الضيف
                </div>
                <div className="text-sm font-bold font-cairo text-[#181D17] leading-tight pt-0.5">
                  خالد العتيبي
                </div>
                <div className="text-[11px] text-[#54624C] font-mono leading-tight pt-0.5" dir="ltr">
                  +966 50 123 4567
                </div>
              </div>

              {/* Box 2: Unit (Left in RTL - node 1:10385) */}
              <div className="bg-white rounded-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-2.5 space-y-0.5 text-right">
                <div className="text-[11px] text-[#75786F] font-medium leading-tight">
                  العقار والوحدة
                </div>
                <div className="text-sm font-bold font-cairo text-[#181D17] leading-tight pt-0.5">
                  عمارة النخيل
                </div>
                <div className="text-[11px] text-[#54624C] font-medium leading-tight pt-0.5">
                  شقة 204 (تنفيذية)
                </div>
              </div>
            </div>

            {/* Dates Row (node 1:10399) */}
            <div className="bg-white rounded-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-2 px-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#181D17]">
                <Calendar className="w-3.5 h-3.5 text-[#75786F]" />
                <span>18 سبتمبر 2026</span>
                <span className="text-[#75786F]">←</span>
                <span>21 سبتمبر 2026</span>
              </div>
              <span className="text-xs font-semibold text-[#75786F]">3 ليالٍ</span>
            </div>
          </div>

          {/* Cancellation Reason Selector (node 1:10411) */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#181D17]">
                <span>سبب الإلغاء </span>
                <span className="text-[#BA1A1A]">*</span>
              </label>
              <span className="text-[11px] font-medium text-[#75786F]">
                مطلوب للتقارير والتدقيق
              </span>
            </div>

            {/* 2x2 Grid (node 1:10418) */}
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              {/* Right Column: طلب العميل then مشكلة في الوحدة */}
              <div className="space-y-1.5">
                {reasonsColRight.map((r) => {
                  const isSelected = selectedReason === r.label;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReason(r.label)}
                      className="bg-[#F1F5EB] hover:bg-[#EAEFE3] h-[36px] px-3 rounded-[12px] flex items-center justify-between transition-colors cursor-pointer select-none"
                    >
                      <span className="text-[13px] font-semibold text-[#181D17]">
                        {r.label}
                      </span>
                      {/* Radio Indicator */}
                      <div className="w-4 h-4 rounded-full border border-[#34422A] bg-white flex items-center justify-center shrink-0">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#34422A]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Left Column: إلغاء من المالك then أخرى */}
              <div className="space-y-1.5">
                {reasonsColLeft.map((r) => {
                  const isSelected = selectedReason === r.label;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReason(r.label)}
                      className="bg-[#F1F5EB] hover:bg-[#EAEFE3] h-[36px] px-3 rounded-[12px] flex items-center justify-between transition-colors cursor-pointer select-none"
                    >
                      <span className="text-[13px] font-semibold text-[#181D17]">
                        {r.label}
                      </span>
                      {/* Radio Indicator */}
                      <div className="w-4 h-4 rounded-full border border-[#767676] bg-white flex items-center justify-center shrink-0">
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#34422A]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Notes (node 1:10436) */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#181D17]">ملاحظات إضافية</label>
              <span className="text-[11px] font-normal text-[#75786F]">اختياري</span>
            </div>
            <div className="bg-[#F1F5EB] rounded-[12px] p-3 transition-colors focus-within:ring-1 focus-within:ring-[#BA1A1A]">
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أدخل أي تفاصيل أو ملاحظات تشغيلية حول سبب الإلغاء ومستحقات الاسترداد إن وجدت... (اختياري)"
                className="w-full bg-transparent border-none outline-none text-[13px] text-[#181D17] placeholder:text-[#75786F] resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Warnings & Operational Impact Notices (node 1:10445) */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#BA1A1A]">
              <AlertTriangle className="w-4 h-4 text-[#BA1A1A] shrink-0" />
              <span>الأثر التشغيلي للإلغاء المباشر</span>
            </div>

            <div className="space-y-1.5 text-[13px] text-[#454840] leading-snug">
              <div className="flex items-start gap-2">
                <MinusCircle className="w-3.5 h-3.5 text-[#454840] shrink-0 mt-0.5" />
                <span>بعد إلغاء الحجز لن يتم احتسابه ضمن الحجوزات الحالية أو القادمة بالمنصة.</span>
              </div>

              <div className="flex items-start gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#454840] shrink-0 mt-0.5" />
                <span>
                  سيتم تحديث حالة الوحدة فورياً لتصبح متاحة في التقويم المركزي وتلقائياً على قنوات الحجز المرتبطة (OTAs).
                </span>
              </div>

              <div className="flex items-start gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#BA1A1A] shrink-0 mt-0.5" />
                <span>إلغاء كود القفل الذكي تلقائياً وإخطار النزيل والمالك بتفاصيل الإلغاء عبر WhatsApp.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. MODAL FOOTER (Matching Figma node 1:10467) */}
        <div className="bg-[#F1F5EB] px-6 py-4 rounded-b-[16px] flex items-center justify-start gap-2.5 shrink-0">
          {/* Destructive Confirm Button (node 1:10468) */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="h-11 px-8 rounded-[12px] bg-[#B12515] hover:bg-[#961F12] text-white font-bold text-sm flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer disabled:opacity-70 active:scale-98"
          >
            <CalendarX className="w-4 h-4" />
            <span>{isSubmitting ? "جارٍ الإلغاء..." : "تأكيد إلغاء الحجز"}</span>
          </button>

          {/* Cancel Button (node 1:10473) */}
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-[12px] bg-white hover:bg-[#EAEFE6] text-[#181D17] font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer shadow-3xs"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
}
