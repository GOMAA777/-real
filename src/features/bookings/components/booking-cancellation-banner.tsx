"use client";

import { CalendarX2, User, RotateCcw, CheckCircle2, ShieldAlert } from "lucide-react";

interface BookingCancellationBannerProps {
  cancelledBy?: string;
  reason?: string;
  cancelledAt?: string;
  refundAmount?: string;
}

export function BookingCancellationBanner({
  cancelledBy = "مدير المنصة (محمد أحمد)",
  reason = "طلب العميل المباشر",
  cancelledAt = "اليوم ▪ 02:45 م",
  refundAmount = "2,450.00 ر.س (قيد الاسترداد)",
}: BookingCancellationBannerProps) {
  return (
    <div className="bg-[#FEF5F5] rounded-3xl p-5 sm:p-6 border border-[#FADCDD] space-y-4 shadow-2xs" dir="rtl">
      {/* Top Row: Icon + Cancellation Notice + Official Cancellation Time */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#FDF2F2] text-[#D9383A] flex items-center justify-center shrink-0 shadow-3xs border border-[#FADCDD]">
            <CalendarX2 className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-sm sm:text-base font-black text-[#D9383A]">
                تم إلغاء هذا الحجز بواسطة {cancelledBy}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#FCE8E8] text-[#D9383A] text-[11px] font-bold">
                إجراء تنفيذي نهائي
              </span>
            </div>

            <p className="text-xs text-[#6F7E6B] leading-relaxed">
              تم تسجيل الإلغاء بناءً على طلب النزيل المباشر وتطبيق شروط وسياسة الإلغاء المرنة المعتمدة في المنصة.
            </p>
          </div>
        </div>

        {/* Official Cancellation Time Badge */}
        <div className="bg-white rounded-xl py-2 px-4 text-center border border-[#FADCDD] shadow-3xs shrink-0 self-start sm:self-auto">
          <div className="text-[10px] text-[#7A8875] font-medium">توقيت الإلغاء الرسمي</div>
          <div className="text-xs sm:text-sm font-black text-[#172115] whitespace-nowrap">
            {cancelledAt}
          </div>
        </div>
      </div>

      {/* Bottom Row: 4 Metric Summary Items (Centered with spacing at start and end) */}
      <div className="pt-3.5 border-t border-[#F8E1E2]">
        <div className="flex flex-wrap items-center justify-around sm:justify-evenly gap-y-3 gap-x-6 text-xs px-3 sm:px-8 md:px-12">
          {/* Item 1: Reason */}
          <div className="space-y-0.5 text-right">
            <div className="text-[11px] text-[#7A8875]">سبب الإلغاء المعتمد</div>
            <div className="flex items-center gap-1.5 font-bold text-[#172115]">
              <User className="w-3.5 h-3.5 text-[#3D4C35]" />
              <span>{reason}</span>
            </div>
          </div>

          {/* Item 2: Smart Lock Code */}
          <div className="space-y-0.5 text-right">
            <div className="text-[11px] text-[#7A8875]">إلغاء كود القفل الذكي</div>
            <div className="flex items-center gap-1.5 font-bold text-[#D9383A]">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تم سحب الصلاحية آلياً</span>
            </div>
          </div>

          {/* Item 3: Unit Status */}
          <div className="space-y-0.5 text-right">
            <div className="text-[11px] text-[#7A8875]">حالة الوحدة بعد الإلغاء</div>
            <div className="flex items-center gap-1.5 font-bold text-[#2E7D32]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
              <span>محررة ومتاحة بالتقويم</span>
            </div>
          </div>

          {/* Item 4: Financial Settlement */}
          <div className="space-y-0.5 text-right">
            <div className="text-[11px] text-[#7A8875]">التسوية المالية التقديرية</div>
            <div className="font-bold text-[#172115]">
              {refundAmount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
