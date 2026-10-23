"use client";

import { useState } from "react";
import {
  X,
  RotateCcw,
  AlertTriangle,
  Building2,
  User,
  Phone,
  FileText,
  ShieldAlert,
  Send,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { ExecutionLog } from "../../../types";

interface RetryExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  log?: ExecutionLog | null;
}

export function RetryExecutionModal({
  isOpen,
  onClose,
  onConfirm,
  log,
}: RetryExecutionModalProps) {
  const [useSmsFallback, setUseSmsFallback] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  if (!isOpen) return null;

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      onConfirm();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-start justify-between bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-right">
            <h2 className="text-base font-bold text-[#181d17]">إعادة محاولة الإرسال؟</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              إعادة توجيه العملية إلى طابور المعالجة اللحظية لمحرك الأتمتة
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-right">
          {/* Target Operation Info Card */}
          <div className="p-4 rounded-2xl bg-[#FBFDFB] border border-gray-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="font-mono text-xs font-bold text-[#ba1a1a] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                فشل الإرسال السابق
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#181d17]">
                  {log?.ruleName || "تذكير بالمغادرة وإرشادات تسليم المفتاح"}
                </span>
                <span className="font-mono text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {log?.ruleId || "RUL-884"}
                </span>
              </div>
            </div>

            {/* Grid of Key Attributes */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[11px] text-gray-400">اسم الضيف والهاتف</span>
                <div className="font-bold text-[#181d17] mt-0.5">
                  {log?.guestName || "خالد العمري"}
                </div>
                <div className="text-[11px] text-gray-500 font-mono">
                  {log?.guestPhone || "+966 55 941 9412"}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-gray-400">رقم الحجز المرجعي</span>
                <div className="font-bold font-mono text-[#34422a] mt-0.5">
                  {log?.bookingId || "BK-10481"}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">حجز مؤكد</div>
              </div>

              <div className="col-span-2 pt-1 border-t border-gray-100 flex items-center justify-between">
                <div className="text-gray-500 text-xs">العقار والوحدة:</div>
                <div className="font-semibold text-[#181d17] text-xs">
                  {log?.propertyName || "فلل حطين"} / {log?.unitName || "فيلا 108"}
                </div>
              </div>
            </div>
          </div>

          {/* Failure reason explanation */}
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-red-900">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>السبب الفني لفشل العملية:</span>
            </div>
            <p className="text-xs font-mono text-red-800 leading-relaxed bg-white/70 p-2 rounded-lg border border-red-100">
              {log?.failureReason || "Meta Cloud API Error 131026: Message Undeliverable"}
            </p>
          </div>

          {/* SMS Fallback Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 bg-[#FAFBF9] cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={useSmsFallback}
              onChange={(e) => setUseSmsFallback(e.target.checked)}
              className="mt-0.5 rounded text-[#4b5940] focus:ring-[#4b5940]"
            />
            <div className="text-xs">
              <span className="font-bold text-[#181d17]">
                تفعيل القناة البديلة (SMS Fallback) تلقائياً
              </span>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                في حال تعذر وصول رسالة WhatsApp مجدداً، سيقوم النظام تلقائياً بتحويل الرسالة إلى SMS لضمان استلام النزيل لكود الدخول.
              </p>
            </div>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-white text-xs font-semibold transition-colors"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="flex-1 py-2.5 rounded-xl bg-[#4b5940] hover:bg-[#3d4934] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isRetrying ? "جارٍ الإرسال..." : "إعادة المحاولة الآن"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
