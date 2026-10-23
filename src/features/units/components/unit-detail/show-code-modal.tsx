"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  Copy,
  ExternalLink,
  KeyRound,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface ShowCodeModalProps {
  open: boolean;
  onClose: () => void;
  unitNumber?: string;
  propertyName?: string;
}

export function ShowCodeModal({
  open,
  onClose,
  unitNumber = "204",
  propertyName = "عمارة النخيل",
}: ShowCodeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("129385");
    setCopied(true);
    toast.success("تم نسخ كود الدخول: 129385");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[560px] bg-white rounded-[20px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-start">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#EEF2E6] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-bold text-[#181D17]">
              كود الدخول
            </h2>
            <span className="h-6 px-2.5 rounded-full bg-[#EAEFE4] text-[11px] font-semibold text-[#34422A] flex items-center gap-1">
              <span>الوحدة {unitNumber} • {propertyName}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#75786F] hover:bg-[#F1F5EB] transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 flex-1 overflow-y-auto space-y-5">
          {/* Main Pin Box */}
          <div className="bg-[#F1F5EB] border border-[#D9E3D5] rounded-[16px] p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#57534E]">
              <span className="flex items-center gap-1.5 font-semibold text-[#181D17]">
                <KeyRound className="w-4 h-4 text-[#34422A]" />
                كود الدخول النشط (TTLock Gateway)
              </span>
              <span className="px-2 py-0.5 rounded-[6px] bg-[#E2EADA] text-[10.5px] font-mono font-bold text-[#34422A]">
                PIN: 6-DIGIT
              </span>
            </div>

            {/* Digits Display */}
            <div className="flex items-center justify-between gap-2 pt-2 pb-1">
              <div
                dir="ltr"
                className="flex-1 flex items-center justify-center gap-4 text-3xl sm:text-4xl font-mono font-extrabold text-[#181D17] tracking-[8px]"
              >
                <span>1</span>
                <span>2</span>
                <span>9</span>
                <span>3</span>
                <span>8</span>
                <span>5</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="h-10 px-4 rounded-[10px] bg-white border border-[#CCD5C5] hover:bg-[#FAFBF8] text-[#181D17] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2A6B3A]" />
                    <span className="text-[#2A6B3A]">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#34422A]" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#2A6B3A] font-semibold pt-1 border-t border-[#E2EADA]">
              <span className="w-2 h-2 rounded-full bg-[#2A6B3A]" />
              <span>نشط ومزامن مع القفل الذكي</span>
            </div>
          </div>

          {/* Booking & Guest Info Grid */}
          <div className="rounded-[14px] border border-[#EEF2E6] divide-y divide-[#EEF2E6] text-xs">
            {/* Guest & Booking ID */}
            <div className="p-3.5 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-[#78716C] block">النزيل المستضاف</span>
                <span className="text-[13px] font-bold text-[#181D17] block mt-0.5">
                  خالد العتيبي
                </span>
                <span className="text-[11px] font-mono text-[#78716C] block" dir="ltr">
                  +966 54 887 2311
                </span>
              </div>
              <div className="text-end">
                <span className="text-[11px] text-[#78716C] block">رقم الحجز</span>
                <span className="inline-flex items-center gap-1 text-[12px] font-mono font-bold text-[#34422A] bg-[#F1F5EB] px-2.5 py-1 rounded-[6px] mt-1">
                  <span>BK-10482</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Dates: Valid from & Valid to */}
            <div className="p-3.5 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-[#78716C] block">➔ صالح من</span>
                <span className="text-[12px] font-bold text-[#181D17] block mt-0.5">
                  18 سبتمبر 2026
                </span>
                <span className="text-[11px] text-[#78716C] block">
                  03:00 مساءً (تسجيل الدخول)
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#78716C] block">➔ صالح حتى</span>
                <span className="text-[12px] font-bold text-[#181D17] block mt-0.5">
                  21 سبتمبر 2026
                </span>
                <span className="text-[11px] text-[#78716C] block">
                  12:00 ظهراً (تسجيل الخروج)
                </span>
              </div>
            </div>

            {/* Encryption Protocol */}
            <div className="p-3.5 bg-[#FAFBF8] flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#181D17]">
                <ShieldCheck className="w-4 h-4 text-[#2A6B3A]" />
                نوع التشفير المطبق
              </span>
              <span className="text-[11px] font-mono text-[#57534E]">
                مشفر سحابياً AES-256 عبر TTLock
              </span>
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-[#FAFBF8] border border-[#D5DDD0] rounded-[14px] p-3.5 flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#34422A] shrink-0 mt-0.5" />
            <p className="text-[11.5px] leading-[19px] text-[#57534E]">
              <span className="font-bold text-[#181D17]">ملاحظة أمنية:</span> هذا الكود صالح فقط خلال الفترة المحددة أعلاه. يتم إبطال فعالية الكود فور انتهاء موعد المغادرة تلقائياً لحماية خصوصية وأمان الوحدة.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F1F5EB] border-t border-[#EEF2E6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-[10px] bg-white border border-[#CCD5C5] text-xs font-semibold text-[#181D17] hover:bg-[#FAFBF8] transition-colors cursor-pointer"
          >
            إغلاق
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="h-10 px-8 rounded-[10px] bg-[#34422A] hover:bg-[#2C3825] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Copy className="w-4 h-4" />
            <span>نسخ الكود</span>
          </button>
        </div>
      </div>
    </div>
  );
}
