"use client";

import { useState } from "react";
import {
  X,
  CalendarPlus,
  Calendar,
  Clock,
  User,
  Key,
  CheckCircle2,
  Building,
  CreditCard,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
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

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-[24px] sm:rounded-[28px] max-w-xl w-full shadow-2xl border border-[#E2E6DC] text-right z-10 max-h-[96vh] flex flex-col overflow-hidden">
        {/* Close Button (Top Left in RTL) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 start-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F2F5EF] hover:bg-[#E5ECE0] text-[#556650] hover:text-[#172115] flex items-center justify-center transition-colors cursor-pointer z-20"
          aria-label="إغلاق النافذة"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Body (Only scrolls if strictly necessary on small screens, styled sleekly) */}
        <div className="p-3.5 sm:p-5 space-y-2 sm:space-y-2.5 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#D5DDD0_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#D5DDD0] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {/* Modal Header */}
          <div className="flex items-center gap-2.5 pe-8">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EFF4EA] text-[#34432E] flex items-center justify-center shrink-0 shadow-3xs border border-[#DEE7D7]">
              <CalendarPlus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-lg sm:text-xl font-black text-[#172115] tracking-tight">
                تمديد الإقامة
              </h2>
              <p className="text-[11px] sm:text-xs text-[#7A8875] font-medium">
                حجز {bookingCode} ▪ الوحدة 204 — عمارة النخيل (الرياض)
              </p>
            </div>
          </div>

          {/* Guest & Key Code Banner */}
          <div className="bg-[#F4F7F1] rounded-xl py-1.5 px-3 flex items-center justify-between border border-[#E5EDE0]">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#3D4C35]" />
              <span className="font-bold text-xs sm:text-sm text-[#172115]">
                خالد بن صالح العتيبي
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#E5EDE0] text-[#556550] text-[10px] sm:text-[11px] font-bold">
                نزيل أساسي
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#3D4C35]">
              <Key className="w-3.5 h-3.5" />
              <span>كود الدخول: #8429</span>
            </div>
          </div>

          {/* Current Approved Checkout Box */}
          <div className="bg-[#F8FAF6] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 space-y-1 border border-[#DEE7D7]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#7A8875] font-semibold text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#3D4C35]" />
                <span>المغادرة الحالية المعتمدة</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#556650] font-medium">
                ساري المفعول
              </span>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div>
                <div className="text-sm sm:text-base font-black text-[#172115]">
                  21 سبتمبر 2026
                </div>
                <div className="text-[11px] text-[#6F7E6B]">
                  الساعة 12:00 ظهراً (توقيت الرياض)
                </div>
              </div>

              <div className="text-left">
                <div className="text-[10px] text-[#7A8875]">المدة والمدفوع حتى الآن</div>
                <div className="text-xs sm:text-sm font-black text-[#172115]">
                  3 ليال ▪ 2,450 ر.س
                </div>
              </div>
            </div>
          </div>

          {/* New Checkout Date & Time */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#172115] text-[11px] sm:text-xs">
                تاريخ ووقت المغادرة الجديد <span className="text-red-500">*</span>
              </label>
              <span className="text-[#3E6F3A] font-semibold flex items-center gap-1 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E6F3A]" />
                <span>تمديد لمدة 1 ليلة إضافية</span>
              </span>
            </div>

            <div className="bg-[#F8FAF6] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex items-center justify-between border border-[#DEE7D7]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#3D4C35]" />
                <span className="font-bold text-xs sm:text-sm text-[#172115]">
                  22 سبتمبر 2026
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-[#D8E6D3] text-[#33462E] text-[11px] font-bold">
                  +1 ليلة
                </span>
              </div>

              <div className="bg-white rounded-xl px-2.5 py-1 flex items-center gap-1.5 border border-[#E2E6DC] text-[11px] sm:text-xs font-semibold text-[#172115] shadow-3xs">
                <Clock className="w-3 h-3 text-[#7A8875]" />
                <span>12:00 ظهراً</span>
              </div>
            </div>
          </div>

          {/* Unit Availability Notice */}
          <div className="bg-[#EEF5EB] rounded-xl sm:rounded-2xl py-2 px-3 flex items-start gap-2 border border-[#DEEAD9]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6F3A] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#273822]">
                الوحدة 204 متاحة حتى تاريخ 22 سبتمبر 2026
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#556650] leading-snug">
                تم التحقق آلياً من التقويم المركزي لقنوات الحجز (Channel Manager) وتأكيد عدم وجود حجوزات مجدولة متداخلة أو طلبات صيانة حتى وقت المغادرة الجديد.
              </div>
            </div>
          </div>

          {/* Financial Calculation Details */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-[#172115]">
                تفاصيل الحسبة المالية
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#D8E6D3] text-[#33462E] text-[10px] sm:text-[11px] font-bold">
                تسعير الموسم القياسي
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-[#172115]">
                <div className="flex items-center gap-1.5 text-[#6F7E6B] text-[11px] sm:text-xs">
                  <Building className="w-3.5 h-3.5 text-[#3D4C35]" />
                  <span>سعر الليلة الإضافية (21 - 22 سبتمبر)</span>
                </div>
                <span className="font-bold text-xs sm:text-sm">650.00 ر.س</span>
              </div>

              <div className="flex items-center justify-between text-[#172115]">
                <div className="flex items-center gap-1.5 text-[#6F7E6B] text-[11px] sm:text-xs">
                  <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-[#3D4C35] text-[11px]">%</span>
                  <span>ضريبة القيمة المضافة (15%) ورسوم الخدمة</span>
                </div>
                <span className="font-bold text-xs sm:text-sm">100.00 ر.س</span>
              </div>
            </div>

            {/* Subtotal & Total Box */}
            <div className="space-y-1 pt-1 border-t border-[#F0F4EC]">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-[#172115]">
                  المبلغ الإضافي المستحق للتمديد:
                </span>
                <span className="text-sm sm:text-base font-black text-[#172115]">
                  +750.00 ر.س
                </span>
              </div>

              <div className="bg-[#F8FAF6] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex items-center justify-between border border-[#DEE7D7]">
                <div>
                  <div className="text-xs sm:text-sm font-black text-[#172115]">
                    إجمالي قيمة الحجز الجديد بعد التمديد
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#7A8875]">
                    4 ليال شاملة كافة الضرائب والرسوم
                  </div>
                </div>

                <div className="text-sm sm:text-base font-black text-[#172115]">
                  3,200 ر.س
                </div>
              </div>
            </div>

            {/* Payment Method Row */}
            <div className="flex items-center justify-between text-[11px] text-[#6F7E6B] pt-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <CreditCard className="w-3 h-3 text-[#3D4C35]" />
                <span>طريقة السداد المعتمدة:</span>
                <span className="font-bold text-[#172115]">
                  خصم فوري عبر بطاقة النزيل المسجلة (Visa •••• 9104)
                </span>
              </div>
              <button
                type="button"
                onClick={() => toast.info("تغيير وسيلة الدفع")}
                className="text-[#3D4C35] hover:text-[#172115] font-bold underline cursor-pointer text-[11px]"
              >
                تغيير
              </button>
            </div>
          </div>

          {/* Smart Lock Automation Box */}
          <div className="bg-[#EEF5EB] rounded-xl sm:rounded-2xl py-2 px-3 flex items-start gap-2 border border-[#DEEAD9]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3E6F3A] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#273822]">
                أتمتة القفل الذكي وإشعار النزيل
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#556650] leading-snug">
                سيتم تحديث صلاحية كود الدخول الذكي (<strong className="text-[#172115]">#8429</strong>) تلقائياً ليمتد حتى <strong className="text-[#172115]">22 سبتمبر الساعة 12:30 ظهراً</strong> ، مع إرسال عقد ملحق الإقامة وإشعار التأكيد فورياً إلى رقم النزيل عبر <strong className="text-[#172115]">WhatsApp Business</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions Docked at Bottom */}
        <div className="p-3 sm:p-3.5 bg-[#F8FAF6] border-t border-[#DEE7D7] flex items-center justify-between gap-3 shrink-0 rounded-b-[24px] sm:rounded-b-[28px]">
          {/* Confirm Button (Right in RTL) */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 py-2 sm:py-2.5 px-5 rounded-xl bg-[#2E3C29] hover:bg-[#232F1F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-70"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isSubmitting ? "جارٍ الحفظ..." : "تأكيد التمديد"}</span>
          </button>

          {/* Cancel Button (Left in RTL) */}
          <button
            type="button"
            onClick={onClose}
            className="py-2 sm:py-2.5 px-5 rounded-xl bg-white hover:bg-[#F2F5EF] text-[#2C3825] font-bold text-xs sm:text-sm border border-[#E2E6DC] transition-all cursor-pointer shadow-3xs"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
