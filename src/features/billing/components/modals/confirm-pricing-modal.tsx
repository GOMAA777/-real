"use client";

import {
  X,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface ConfirmPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  monthlyPrice: number;
  annualPrice: number;
  effectiveDate?: string;
}

export function ConfirmPricingModal({
  isOpen,
  onClose,
  onConfirm,
  monthlyPrice = 99,
  annualPrice = 999,
  effectiveDate = "1 نوفمبر 2026",
}: ConfirmPricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-[28px] w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#e5eae0] text-[#34422a]">
                  V3.3
                </span>
                <h2 className="text-lg font-bold text-[#181d17]">تأكيد تحديث الأسعار</h2>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#d8e8cb] text-[#34422a] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-right">
          {/* 2 Comparison Cards (Monthly vs Annual) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Monthly Card */}
            <div className="p-4 rounded-2xl bg-[#f6fbf1] border border-[#d8e8cb] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white text-[#34422a] border border-[#c6dcbe]">
                  تأكيد القيمة
                </span>
                <span className="text-xs font-bold text-[#181d17]">السعر الشهري للشقة</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">السعر الجديد</span>
                  <div className="text-xl font-bold font-mono text-[#181d17]">
                    {monthlyPrice.toFixed(2)}{" "}
                    <span className="text-xs font-sans text-gray-500">ر.س</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 block">السعر الحالي</span>
                  <div className="text-sm font-semibold font-mono text-gray-500">
                    99.00 <span className="text-[10px] font-sans">ر.س</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Card */}
            <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-gray-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  خصم 15.9%
                </span>
                <span className="text-xs font-bold text-[#181d17]">السعر السنوي للشقة</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">السعر الجديد</span>
                  <div className="text-xl font-bold font-mono text-[#181d17]">
                    {annualPrice.toFixed(2)}{" "}
                    <span className="text-xs font-sans text-gray-500">ر.س</span>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400" />
                <div className="text-left">
                  <span className="text-[10px] text-gray-400 block">السعر الحالي</span>
                  <div className="text-sm font-semibold font-mono text-gray-500">
                    999.00 <span className="text-[10px] font-sans">ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Effective Date Card */}
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#4b5940]" />
              تطبيق آلي بعد 16 يوماً
            </span>
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">
                  تاريخ سريان التسعير في بيئة الإنتاج
                </span>
                <span className="text-xs font-bold text-[#181d17]">
                  {effectiveDate} (00:00 بتوقيت مكة المكرمة)
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Legal Warning Notice Box */}
          <div className="p-4 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#78350f]">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>تنبيه نظامي وحوكمة مالية</span>
            </div>
            <p className="text-[11px] text-[#92400e] leading-relaxed">
              سيتم استخدام الأسعار الجديدة فقط للعمليات المنشأة ضمن أو بعد تاريخ السريان المحدد.
              لن يتم تعديل الفواتير السابقة أو المساس بسجلات الدفع التاريخية الصادرة عبر بوابات
              الدفع (سداد، مدى، البطاقات الائتمانية).
            </p>
          </div>

          {/* Executor Metadata Bar */}
          <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between text-[11px] text-gray-500 font-medium">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3 h-3" />
              <span>15 أكتوبر 2026 - 11:42 ص</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3 text-gray-400" />
              <span>المنفّذ: محمد أحمد (ADM-1002)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 bg-white">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full h-12 rounded-xl bg-[#34422a] hover:bg-[#283320] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد التعديلات والاعتماد</span>
          </button>
        </div>
      </div>
    </div>
  );
}
