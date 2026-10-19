"use client";

import { useState } from "react";
import {
  X,
  CalendarX2,
  Calendar,
  Receipt,
  AlertTriangle,
  MinusCircle,
  ArrowRightLeft,
  RotateCcw,
  Trash2,
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

  // In Screenshot 2: Right column has "طلب العميل" and "مشكلة في الوحدة", Left column has "إلغاء من المالك" and "أخرى"
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

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-[28px] max-w-lg w-full shadow-2xl border border-[#E2E6DC] text-right z-10 max-h-[95vh] flex flex-col overflow-hidden">
        {/* Close Button (Top Left in RTL) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 start-4 w-8 h-8 rounded-full bg-[#F2F5EF] hover:bg-[#E5ECE0] text-[#556650] hover:text-[#172115] flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="إغلاق النافذة"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Body (Only scrolls if strictly necessary on small screens, styled sleekly) */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-3.5 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#D5DDD0_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#D5DDD0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {/* Modal Header */}
          <div className="flex items-center gap-3 pe-8">
            <div className="w-11 h-11 rounded-2xl bg-[#FDF2F2] text-[#D9383A] flex items-center justify-center shrink-0 shadow-3xs border border-[#FADCDD]">
              <CalendarX2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
                إلغاء الحجز؟
              </h2>
              <p className="text-xs text-[#7A8875] font-medium">
                إجراء إداري لإلغاء حجز مسجل على المنصة وتحديث قنوات التوافر.
              </p>
            </div>
          </div>

          {/* Booking Reference Summary Box */}
          <div className="bg-[#F8FAF6] rounded-2xl p-3.5 space-y-2.5 border border-[#DEE7D7]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#172115]">
                <Receipt className="w-3.5 h-3.5 text-[#3D4C35]" />
                <span>مرجع الحجز: {bookingCode}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF3EB] border border-[#DEE7D7] text-[#3D4C35] text-[11px] font-bold">
                مدفوع مسبقاً (2,450 ر.س)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Box 1: Guest (Right in RTL) */}
              <div className="bg-white rounded-xl p-2.5 border border-[#E2E6DC] space-y-0.5 text-right">
                <div className="text-[11px] text-[#7A8875]">العميل / الضيف</div>
                <div className="text-xs sm:text-sm font-bold text-[#172115]">خالد العتيبي</div>
                <div className="text-[11px] text-[#7A8875] font-mono dir-ltr text-right">
                  +966 50 123 4567
                </div>
              </div>

              {/* Box 2: Unit (Left in RTL) */}
              <div className="bg-white rounded-xl p-2.5 border border-[#E2E6DC] space-y-0.5 text-right">
                <div className="text-[11px] text-[#7A8875]">العقار والوحدة</div>
                <div className="text-xs sm:text-sm font-bold text-[#172115]">عمارة النخيل</div>
                <div className="text-[11px] text-[#7A8875]">شقة 204 (تنفيذية)</div>
              </div>
            </div>

            {/* Dates Row */}
            <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between border border-[#E2E6DC] text-xs font-semibold text-[#172115]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#7A8875]" />
                <span>18 سبتمبر 2026 ← 21 سبتمبر 2026</span>
              </div>
              <span className="text-[#7A8875] text-[11px]">3 ليال</span>
            </div>
          </div>

          {/* Cancellation Reason Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#172115]">
                سبب الإلغاء <span className="text-red-500">*</span>
              </label>
              <span className="text-[#7A8875] text-[11px]">مطلوب للتقارير والتدقيق</span>
            </div>

            {/* 2x2 Grid Matching Screenshot 2 Order */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Right Column: طلب العميل then مشكلة في الوحدة */}
              <div className="space-y-2">
                {reasonsColRight.map((r) => {
                  const isSelected = selectedReason === r.label;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReason(r.label)}
                      className={`rounded-xl p-2.5 flex items-center justify-between border transition-all cursor-pointer font-medium ${
                        isSelected
                          ? "border-[#3D4C35] bg-[#EEF4EB] text-[#172115] shadow-3xs"
                          : "border-[#DEE7D7] bg-[#F8FAF6] text-[#2C3825] hover:bg-[#EFF3EA]"
                      }`}
                    >
                      <span>{r.label}</span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-4 border-[#2E3C29] bg-white"
                            : "border-2 border-[#CBD5C7] bg-white"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Left Column: إلغاء من المالك then أخرى */}
              <div className="space-y-2">
                {reasonsColLeft.map((r) => {
                  const isSelected = selectedReason === r.label;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReason(r.label)}
                      className={`rounded-xl p-2.5 flex items-center justify-between border transition-all cursor-pointer font-medium ${
                        isSelected
                          ? "border-[#3D4C35] bg-[#EEF4EB] text-[#172115] shadow-3xs"
                          : "border-[#DEE7D7] bg-[#F8FAF6] text-[#2C3825] hover:bg-[#EFF3EA]"
                      }`}
                    >
                      <span>{r.label}</span>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-4 border-[#2E3C29] bg-white"
                            : "border-2 border-[#CBD5C7] bg-white"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#172115]">ملاحظات إضافية</label>
              <span className="text-[#7A8875] text-[11px]">اختياري</span>
            </div>

            <div className="bg-[#F8FAF6] rounded-2xl p-2.5 border border-[#DEE7D7] focus-within:border-[#D9383A] transition-colors">
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أدخل أي تفاصيل أو ملاحظات تشغيلية حول سبب الإلغاء ومستحقات الاسترداد إن وجدت... (اختياري)"
                className="w-full bg-transparent border-none outline-none text-xs text-[#172115] placeholder-[#8A9784] resize-none"
              />
            </div>
          </div>

          {/* Operational Impact Warning Box */}
          <div className="bg-[#FFF9F9] rounded-2xl p-3 sm:p-3.5 space-y-2 border border-[#FADCDD]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D9383A]">
              <AlertTriangle className="w-4 h-4" />
              <span>الأثر التشغيلي للإلغاء المباشر</span>
            </div>

            <div className="space-y-1.5 text-[11px] sm:text-xs text-[#556650] leading-relaxed">
              <div className="flex items-start gap-2">
                <MinusCircle className="w-3.5 h-3.5 text-[#D9383A] shrink-0 mt-0.5" />
                <span>بعد إلغاء الحجز لن يتم احتسابه ضمن الحجوزات الحالية أو القادمة بالمنصة.</span>
              </div>

              <div className="flex items-start gap-2">
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#D9383A] shrink-0 mt-0.5" />
                <span>سيتم تحديث حالة الوحدة فورياً لتصبح متاحة في التقويم المركزي وتلقائياً على قنوات الحجز المرتبطة (OTAs).</span>
              </div>

              <div className="flex items-start gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#D9383A] shrink-0 mt-0.5" />
                <span>إلغاء كود القفل الذكي تلقائياً وإخطار النزيل والمالك بتفاصيل الإلغاء عبر WhatsApp.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions Docked at Bottom */}
        <div className="p-3.5 sm:p-4 bg-[#F8FAF6] border-t border-[#DEE7D7] flex items-center justify-between gap-3 shrink-0 rounded-b-[28px]">
          {/* Confirm Button (Right in RTL) */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 py-2.5 sm:py-3 px-6 rounded-xl bg-[#BD2426] hover:bg-[#A81F21] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-70"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isSubmitting ? "جارٍ الإلغاء..." : "تأكيد إلغاء الحجز"}</span>
          </button>

          {/* Cancel Button (Left in RTL) */}
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 sm:py-3 px-6 rounded-xl bg-white hover:bg-[#F2F5EF] text-[#2C3825] font-bold text-xs sm:text-sm border border-[#E2E6DC] transition-all cursor-pointer shadow-3xs"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
