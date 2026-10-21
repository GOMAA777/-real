"use client";

import { X, AlertTriangle, Pause, ShieldAlert, MessageSquare } from "lucide-react";

interface PauseTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  templateCode?: string;
  templateTitle?: string;
}

export function PauseTemplateModal({
  isOpen,
  onClose,
  onConfirm,
  templateCode = "tpl_arrival_guide_v3",
  templateTitle = "تفاصيل الوصول",
}: PauseTemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
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
            <h2 className="text-base font-bold text-[#181d17]">إيقاف قالب واتساب</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              تأكيد تعطيل إرسال هذا القالب عبر محرك الأتمتة المركزي
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-right">
          {/* Template Identification Card */}
          <div className="p-4 rounded-2xl bg-[#FBFDFB] border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                مفعّل حالياً
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#181d17]">{templateTitle}</span>
                <span className="text-[11px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {templateCode}
                </span>
                <MessageSquare className="w-4 h-4 text-[#4b5940]" />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                <div className="text-[11px] text-gray-400">الارتباط التشغيلي</div>
                <div className="font-bold text-[#181d17] mt-0.5">3 قواعد أتمتة مركزية</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                <div className="text-[11px] text-gray-400">تصنيف الاستخدام</div>
                <div className="font-bold text-[#181d17] mt-0.5">إرشادات الوصول والاستلام</div>
              </div>
            </div>
          </div>

          {/* Affected Rules List */}
          <div className="p-3.5 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#78350f]">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>القواعد المتأثرة مباشرةً:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#fde68a] text-[11px] font-medium text-[#78350f]">
                تحديثات الدخول المتأخر
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#fde68a] text-[11px] font-medium text-[#78350f]">
                تذكير يوم الوصول الصباحي
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-[#fde68a] text-[11px] font-medium text-[#78350f]">
                إرسال تفاصيل الوصول (AUT-102)
              </span>
            </div>
            <p className="text-[11px] text-[#92400e] leading-relaxed pt-1">
              سيتم إيقاف توليد وإرسال هذا القالب عبر جميع القواعد المرتبطة أعلاه، ويمكنك إعادة تفعيله في أي وقت دون فقدان السجلات السابقة.
            </p>
          </div>
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
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>إيقاف القالب</span>
          </button>
        </div>
      </div>
    </div>
  );
}
