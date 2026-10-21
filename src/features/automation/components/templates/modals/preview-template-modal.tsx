"use client";

import {
  X,
  Check,
  CheckCheck,
  Share2,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Send,
  Calendar,
  Clock,
  Key,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { WhatsAppTemplate } from "../../../types";

interface PreviewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: WhatsAppTemplate | null;
}

export function PreviewTemplateModal({
  isOpen,
  onClose,
  template,
}: PreviewTemplateModalProps) {
  if (!isOpen) return null;

  const handleTestSend = () => {
    toast.success("تم إرسال رسالة المعاينة التجريبية بنجاح إلى رقمك المسجل في المنصة!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                Meta Cloud API معتمد
              </span>
              <h2 className="text-base font-bold text-[#181d17]">معاينة الرسالة الفعلية</h2>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {template?.templateCode || "tpl_arrival_guide_v3"} (7 حقول ديناميكية)
            </p>
          </div>
        </div>

        {/* Dynamic Context Header */}
        <div className="px-5 py-3 bg-[#FAFBF9] border-b border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#181d17]">النزيل النموذجي:</span>
            <span>خالد العتيبي</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#181d17]">رقم الحجز:</span>
            <span className="font-mono text-[#4b5940] font-bold">BK-10482</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#181d17]">كود القفل:</span>
            <span className="font-mono font-bold bg-[#ebefe6] text-[#34422a] px-2 py-0.5 rounded">
              482913
            </span>
          </div>
        </div>

        {/* WhatsApp Chat Viewport */}
        <div className="p-6 bg-[#efeae2] overflow-y-auto flex-1 space-y-4 flex flex-col items-center">
          {/* Chat Date Badge */}
          <span className="px-3 py-1 rounded-full bg-white/90 text-gray-600 text-[11px] font-semibold shadow-xs">
            اليوم
          </span>

          {/* WhatsApp Message Bubble */}
          <div className="w-full max-w-md bg-[#e7ffdb] rounded-2xl rounded-tr-none p-4 shadow-sm border border-[#d6f0c8] space-y-3 text-right">
            {/* Header: Verified Brand Name */}
            <div className="flex items-center justify-between border-b border-[#cde8bd] pb-2">
              <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                <span>14:32</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-xs font-bold text-[#181d17]">أبراج لإدارة الأصول العقارية</div>
                  <div className="text-[10px] text-emerald-800 font-medium">حساب أعمال رسمي موثّق</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#34422a] flex items-center justify-center text-white text-xs font-bold">
                  أ
                </div>
              </div>
            </div>

            {/* Bubble Content Body */}
            <div className="text-xs text-[#181d17] leading-relaxed space-y-2">
              <div className="font-bold text-[#181d17]">مرحبًا خالد العتيبي،</div>
              <p>
                يسعدنا استقبالكم في{" "}
                <span className="font-bold text-[#34422a]">عمارة النخيل - الوحدة 204</span>.
              </p>
              <div className="space-y-1 py-1 text-gray-800">
                <div className="flex items-center justify-end gap-1.5">
                  <span>18 سبتمبر 2026 الساعة 02:00 م</span>
                  <span className="font-bold text-[#181d17]">📅 تاريخ الوصول:</span>
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <span>21 سبتمبر 2026 الساعة 12:00 م</span>
                  <span className="font-bold text-[#181d17]">📅 تاريخ المغادرة:</span>
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="font-mono font-bold text-[#34422a] bg-white/70 px-2 py-0.5 rounded border border-[#cde8bd]">
                    482913
                  </span>
                  <span className="font-bold text-[#181d17]">🔑 كود الدخول للباب الذكي:</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-600">
                نتمنى لكم إقامة ممتعة وخدمة ممتازة! في حال احتجتم أي مساعدة فريق الدعم متاح 24/7.
              </p>
            </div>

            {/* Interactive Action Buttons inside WhatsApp */}
            <div className="pt-2 border-t border-[#cde8bd] space-y-1.5">
              <button
                type="button"
                onClick={() => toast.info("فتح رابط خرائط Google")}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-gray-50 text-blue-600 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <span>فتح الموقع في خرائط Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toast.info("فتح دليل كود الدخول والتعليمات")}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-gray-50 text-blue-600 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <span>دليل كود الدخول والتعليمات</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-colors"
          >
            إغلاق
          </button>

          <button
            type="button"
            onClick={handleTestSend}
            className="px-5 py-2.5 rounded-xl bg-[#4b5940] hover:bg-[#3d4934] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>إرسال تجريبي لرقم هاتفي</span>
          </button>
        </div>
      </div>
    </div>
  );
}
