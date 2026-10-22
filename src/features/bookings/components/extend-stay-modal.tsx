"use client";

import { useState } from "react";
import {
  X,
  CalendarDays,
  Calendar,
  Clock,
  User,
  KeyRound,
  Check,
  Building2,
  Percent,
  CreditCard,
  Lock,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface ExtendStayModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode?: string;
  onConfirm?: () => void;
}

export function ExtendStayModal({
  isOpen,
  onClose,
  bookingCode = "BK-10482",
  onConfirm,
}: ExtendStayModalProps) {
  const confirm = useConfirm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    const ok = await confirm({
      title: "تأكيد تمديد الإقامة",
      message: `هل أنت متأكد من تمديد إقامة الحجز ${bookingCode} حتى 22 سبتمبر (ليلة إضافية) بمبلغ 650.00 ر.س؟ سيتم تمديد صلاحية كود الدخول تلقائياً.`,
      confirmLabel: "تأكيد التمديد",
      variant: "default",
    });
    if (!ok) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم تمديد الإقامة بنجاح", {
        description: "تم تمديد الحجز حتى 22 سبتمبر، وتحديث صلاحية القفل الذكي تلقائياً",
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

      {/* Modal Dialog Card (Matching Figma node 1:9743 exactly) */}
      <div className="relative bg-white rounded-[16px] max-w-[620px] w-full shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] text-right z-10 max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Top Accent Ribbon (Figma node 1:9744) */}
        <div className="h-[6px] w-full bg-[#34422A] shrink-0" />

        {/* 1. MODAL HEADER (Figma node 1:9745) */}
        <div className="bg-white flex items-start justify-between px-6 pt-5 pb-3.5 shrink-0">
          {/* Right in RTL: Icon + Title & Subtitle */}
          <div className="flex items-start gap-3.5">
            {/* Header Icon Chip (node 1:9760) */}
            <div className="w-11 h-11 rounded-[12px] bg-[#F1F5EB] flex items-center justify-center shrink-0 text-[#34422A]">
              <CalendarDays className="w-5 h-5 stroke-[2.2]" />
            </div>

            <div className="space-y-0.5">
              <h2 className="text-[20px] font-bold font-cairo text-[#181D17] leading-[30px] tracking-tight">
                تمديد الإقامة
              </h2>
              <div className="flex items-center gap-1.5 text-[13px] leading-[22px]">
                <span className="text-[#34422A] font-semibold">
                  حجز {bookingCode}
                </span>
                <span className="text-[#454840]">•</span>
                <span className="text-[#454840]">
                  الوحدة 204 — عمارة النخيل (الرياض)
                </span>
              </div>
            </div>
          </div>

          {/* Left in RTL: Close Button (node 1:9746) */}
          <button
            type="button"
            onClick={onClose}
            className="text-[#75786F] hover:text-[#181D17] transition-colors cursor-pointer shrink-0 p-1 mt-1"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* 2. SCROLLABLE MODAL BODY CONTENT (Figma node 1:9763) */}
        <div className="px-6 py-2 space-y-3.5 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#D5DDD0_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#D5DDD0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          
          {/* Section A: Guest & Unit Snapshot Strip (node 1:9764) */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-3.5 px-4 flex items-center justify-between">
            {/* Right: Guest Name & Badge */}
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#34422A]" />
              <span className="text-[14px] font-semibold font-cairo text-[#181D17]">
                خالد بن صالح العتيبي
              </span>
              <span className="bg-[#EBEFE6] text-[#454840] text-[12px] px-2 py-0.5 rounded-full font-normal">
                نزيل أساسي
              </span>
            </div>

            {/* Left: Key Code */}
            <div className="flex items-center gap-1.5 text-[14px]">
              <KeyRound className="w-3.5 h-3.5 text-[#34422A]" />
              <span className="text-[#454840]">كود الدخول:</span>
              <span className="text-[#181D17] font-bold font-mono">#8429</span>
            </div>
          </div>

          {/* Section B: Current Stay Context Card (node 1:9778) */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[13px] text-[#454840]">
                <Clock className="w-3.5 h-3.5 text-[#34422A]" />
                <span>المغادرة الحالية المعتمدة</span>
              </div>
              <span className="text-[#54624C] text-[11px] font-medium">
                ساري المفعول
              </span>
            </div>

            <div className="flex items-end justify-between pt-0.5">
              <div className="space-y-0.5">
                <div className="text-[18px] font-bold font-cairo text-[#181D17] leading-[26px]">
                  21 سبتمبر 2026
                </div>
                <div className="text-[13px] text-[#454840]">
                  الساعة 12:00 ظهراً (توقيت الرياض)
                </div>
              </div>

              <div className="text-left space-y-0.5">
                <div className="text-[12px] font-semibold text-[#454840]">
                  المدة والمدفوع حتى الآن
                </div>
                <div className="text-[14px] font-bold text-[#34422A]">
                  3 ليالٍ • 2,450 ر.س
                </div>
              </div>
            </div>
          </div>

          {/* Section C: New Departure Date & Time Selection (node 1:9795) */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[14px] font-semibold font-cairo text-[#181D17]">
                <span>تاريخ ووقت المغادرة الجديد</span>
                <span className="text-[#BA1A1A] font-bold">*</span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#34422A]">
                <span className="w-2 h-2 rounded-full bg-[#4B5940]" />
                <span>تمديد لمدة 1 ليلة إضافية</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Date Box (Spans 2 cols) */}
              <div className="sm:col-span-2 bg-white rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#E2E6DC] h-[44px] px-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#34422A]" />
                  <span className="text-[14px] font-semibold text-[#181D17]">
                    22 سبتمبر 2026
                  </span>
                </div>
                <span className="bg-[#D8E8CB]/80 text-[#5A6952] text-[12px] font-semibold px-2 py-0.5 rounded-[8px]">
                  +1 ليلة
                </span>
              </div>

              {/* Time Box (Spans 1 col) */}
              <div className="bg-[#F1F5EB] rounded-[12px] h-[44px] px-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-[#181D17]">
                <Clock className="w-3.5 h-3.5 text-[#34422A]" />
                <span>12:00 ظهراً</span>
              </div>
            </div>
          </div>

          {/* Section D: Unit Availability Live Check Box (node 1:9820) */}
          <div className="bg-[#D8E8CB]/30 border border-[#D8E8CB] rounded-[12px] p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#34422A] flex items-center justify-center text-white shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-[14px] font-bold font-cairo text-[#181D17]">
                الوحدة 204 متاحة حتى تاريخ 22 سبتمبر 2026
              </span>
            </div>
            <p className="text-[13px] text-[#454840] leading-[21px] pr-7">
              تم التحقق آلياً من التقويم المركزي لقنوات الحجز (Channel Manager) وتأكيد عدم وجود حجوزات مجدولة متداخلة أو طلبات صيانة حتى وقت المغادرة الجديد.
            </p>
          </div>

          {/* Section E: Financial Calculation Breakdown (node 1:9829) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EAEFE6] rounded-[12px] p-4 flex flex-col gap-2.5">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-[12px] font-semibold text-[#75786F] tracking-[0.6px]">
                تفاصيل الحسبة المالية
              </span>
              <span className="bg-[#D8E8C7] text-[#34422A] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                تسعير الموسم القياسي
              </span>
            </div>

            {/* Line items */}
            <div className="space-y-2 text-[13px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#181D17]">
                  <Building2 className="w-3.5 h-3.5 text-[#34422A]" />
                  <span>سعر الليلة الإضافية (21 - 22 سبتمبر)</span>
                </div>
                <span className="font-bold text-[#181D17]">650.00 ر.س</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#454840]">
                  <Percent className="w-3.5 h-3.5 text-[#454840]" />
                  <span>ضريبة القيمة المضافة (15%) ورسوم الخدمة</span>
                </div>
                <span className="font-bold text-[#454840]">100.00 ر.س</span>
              </div>

              <div className="h-px bg-[#EBEFE6] my-1" />

              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[12px] font-bold text-[#34422A]">
                  المبلغ الإضافي المستحق للتمديد:
                </span>
                <span className="text-[18px] font-bold text-[#34422A]">
                  +750.00 ر.س
                </span>
              </div>

              {/* Total Box (node 1:9858) */}
              <div className="bg-[#F1F5EB] rounded-[8px] p-2.5 px-3.5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[12px] font-bold text-[#181D17]">
                    إجمالي قيمة الحجز الجديد بعد التمديد
                  </div>
                  <div className="text-[11px] font-medium text-[#454840]">
                    4 ليالٍ شاملة كافة الضرائب والرسوم
                  </div>
                </div>
                <div className="text-[20px] font-bold text-[#181D17]">
                  3,200 ر.س
                </div>
              </div>
            </div>

            {/* Payment Option Row (node 1:9866) */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EAEFE6] rounded-[8px] p-2.5 px-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#34422A] shrink-0" />
                <div className="space-y-0.5 text-right">
                  <div className="text-[11px] font-semibold text-[#181D17]">
                    طريقة السداد المعتمدة
                  </div>
                  <div className="text-[11px] font-medium text-[#454840]">
                    خصم فوري عبر بطاقة النزيل المسجلة (Visa •••• 9104)
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.info("تغيير وسيلة الدفع")}
                className="text-[#34422A] font-bold text-[11px] hover:underline cursor-pointer"
              >
                تغيير
              </button>
            </div>
          </div>

          {/* Section F: Smart Lock & Guest Notification Notice (node 1:9877) */}
          <div className="bg-[#E5EAE0]/60 border border-[#D5DDD0] rounded-[12px] p-4 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#34422A]" />
              <span className="text-[12px] font-bold font-cairo text-[#181D17]">
                أتمتة القفل الذكي وإشعار النزيل
              </span>
            </div>

            <p className="text-[13px] text-[#454840] leading-[21px]">
              سيتم تحديث صلاحية كود الدخول الذكي{" "}
              <strong className="text-[#181D17] font-bold">(#8429)</strong>{" "}
              تلقائياً ليمتد حتى{" "}
              <strong className="text-[#181D17] font-bold">
                22 سبتمبر الساعة 12:30 ظهراً
              </strong>
              ، مع إرسال عقد ملحق الإقامة وإشعار التأكيد فورياً إلى رقم النزيل عبر{" "}
              <strong className="text-[#34422A] font-bold">WhatsApp Business</strong>.
            </p>
          </div>
        </div>

        {/* 3. MODAL FOOTER (Figma node 1:9893 - buttons placed on left) */}
        <div className="bg-[#F1F5EB] px-6 py-4 rounded-b-[16px] flex items-center justify-start gap-2.5 shrink-0" dir="ltr">
          {/* Primary Confirm Button (node 1:9894) */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="h-11 px-8 rounded-[12px] bg-[#34422A] hover:bg-[#283420] text-white font-bold text-sm flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer disabled:opacity-70 active:scale-98"
            dir="rtl"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{isSubmitting ? "جارٍ الحفظ..." : "تأكيد التمديد"}</span>
          </button>

          {/* Secondary Cancel Button (node 1:9899) */}
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-[12px] bg-white hover:bg-[#EAEFE6] text-[#181D17] font-semibold text-sm flex items-center justify-center transition-colors cursor-pointer shadow-3xs"
            dir="rtl"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
}
