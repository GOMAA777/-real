"use client";

import { useEffect, useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  Eye,
  KeyRound,
  Lock,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";

interface AccessCodeModalProps {
  open: boolean;
  onClose: () => void;
  onOpenShowCode?: () => void;
  unitNumber?: string;
  propertyName?: string;
}

export function AccessCodeModal({
  open,
  onClose,
  onOpenShowCode,
  unitNumber = "204",
  propertyName = "عمارة النخيل",
}: AccessCodeModalProps) {
  const [codeType, setCodeType] = useState<"temporary" | "permanent">("temporary");
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

  const confirm = useConfirm();

  const handleCopy = () => {
    navigator.clipboard.writeText("129385");
    setCopied(true);
    toast.success("تم نسخ كود الدخول إلى الحافظة بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = async () => {
    const ok = await confirm({
      title: "إعادة توليد كود الدخول",
      message: `هل أنت متأكد من إعادة توليد كود دخول جديد للوحدة ${unitNumber}؟ سيتم تحديث القفل الذكي وتغيير الكود النشط فوراً.`,
      confirmLabel: "تأكيد إعادة التوليد",
      cancelLabel: "إلغاء",
      variant: "default",
    });
    if (!ok) return;

    toast.info("جاري إعادة توليد كود دخول جديد وتحديثه في القفل الذكي...");
  };

  const handleSave = async () => {
    const ok = await confirm({
      title: "حفظ إعدادات كود الدخول",
      message: `هل أنت متأكد من حفظ إعدادات كود الدخول وسياسة الأمان للوحدة ${unitNumber}؟`,
      confirmLabel: "تأكيد وحفظ الإعدادات",
      cancelLabel: "تراجع",
      variant: "default",
    });
    if (!ok) return;

    toast.success("تم حفظ إعدادات كود الدخول وسياسة الأمان بنجاح");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/55 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[620px] bg-white rounded-[20px] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-start">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#EEF2E6] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-[12px] bg-[#EAEFE4] flex items-center justify-center text-[#34422A]">
              <KeyRound className="w-5 h-5" strokeWidth={1.9} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[20px] font-bold text-[#181D17]">
                  إدارة كود الدخول
                </h2>
                <span className="h-6 px-2.5 rounded-full bg-[#EAEFE4] text-[11px] font-semibold text-[#34422A] flex items-center gap-1">
                  <span>الوحدة {unitNumber} • {propertyName}</span>
                </span>
              </div>
            </div>
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
          {/* Section: طريقة إنشاء كود الدخول */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-[#181D17]">
                طريقة إنشاء كود الدخول
              </h3>
              <span className="h-6 px-2.5 rounded-full bg-[#D8E8CB] text-[11px] font-bold text-[#2A6B3A] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>المفعلة: كود لكل حجز</span>
              </span>
            </div>

            {/* Option 1: Temporary Code */}
            <div
              onClick={() => setCodeType("temporary")}
              className={cn(
                "p-4 rounded-[14px] border transition-all cursor-pointer select-none",
                codeType === "temporary"
                  ? "bg-[#F9FAF7] border-[#34422A] shadow-xs"
                  : "bg-white border-[#E2E6DC] hover:border-[#CCD5C5]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#34422A] flex items-center justify-center mt-0.5">
                    {codeType === "temporary" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#34422A]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#181D17]">
                        كود مؤقت لكل حجز (موصى به)
                      </span>
                      <span className="px-2 py-0.5 rounded-[6px] bg-[#EAEFE4] text-[10.5px] font-semibold text-[#34422A]">
                        الأعلى أماناً
                      </span>
                    </div>
                    <p className="text-[12px] leading-[20px] text-[#57534E] mt-1">
                      يتم إنشاء كود مختلف لكل حجز تلقائياً فور تأكيد الحجز، وتحدد صلاحيته بدقة وفق فترة الإقامة، ويُلغى آلياً فور إتمام المغادرة.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2: Permanent Code */}
            <div
              onClick={() => setCodeType("permanent")}
              className={cn(
                "p-4 rounded-[14px] border transition-all cursor-pointer select-none",
                codeType === "permanent"
                  ? "bg-[#F9FAF7] border-[#34422A] shadow-xs"
                  : "bg-white border-[#E2E6DC] hover:border-[#CCD5C5]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#CCD5C5] flex items-center justify-center mt-0.5">
                    {codeType === "permanent" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#34422A]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#181D17]">
                        كود دائم وموحد للوحدة
                      </span>
                      <span className="px-2 py-0.5 rounded-[6px] bg-[#F1F5EB] text-[10.5px] font-semibold text-[#75786F]">
                        ثابت
                      </span>
                    </div>
                    <p className="text-[12px] leading-[20px] text-[#57534E] mt-1">
                      استخدام رمز رقمي دائم وموحد للوحدة يظل سارياً لجميع النزلاء والمشرفين حتى يُغير يدوياً من لوحة التحكم.
                    </p>
                    <p className="text-[11px] text-[#78716C] mt-1 flex items-center gap-1">
                      <span>ⓘ يتطلب تحديثاً يدوياً دورياً لضمان الخصوصية ومنع الوصول غير المصرح به.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Booking Code Box */}
          <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-[16px] p-4.5 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#57534E] flex-wrap gap-2">
              <span className="flex items-center gap-1.5 font-bold text-[#181D17]">
                <span className="w-2 h-2 rounded-full bg-[#2A6B3A]" />
                كود الحجز النشط حالياً
                <span className="font-normal text-[#57534E]">(حجز: BK-10482 خالد العتيبي)</span>
              </span>
              <span className="text-[11.5px] text-[#78716C]">
                صالح حتى 21 سبتمبر 2026 - 12:00 م
              </span>
            </div>

            {/* Code and Action Buttons */}
            <div className="bg-white rounded-[12px] p-3 border border-[#E5E8E2] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xl font-mono font-bold text-[#181D17] tracking-[6px] px-2">
                <span>•</span>
                <span>•</span>
                <span>•</span>
                <span>•</span>
                <span>•</span>
                <span>•</span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenShowCode && (
                  <button
                    type="button"
                    onClick={onOpenShowCode}
                    className="h-9 px-3.5 rounded-[10px] bg-[#F1F5EB] hover:bg-[#E6ECD9] text-[#181D17] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#34422A]" />
                    <span>عرض الكود</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopy}
                  className="h-9 px-3.5 rounded-[10px] bg-[#F1F5EB] hover:bg-[#E6ECD9] text-[#181D17] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
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

                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="h-9 px-3.5 rounded-[10px] text-[#57534E] hover:text-[#181D17] hover:bg-[#F1F5EB] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة توليد الكود</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#78716C] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2A6B3A]" />
              <span>الكود مشفر لحماية خصوصية النزيل ولا يُعرض تلقائياً إلا للمشرفين المصرح لهم.</span>
            </p>
          </div>

          {/* Security Alert Banner */}
          <div className="bg-[#FAFBF8] border border-[#D5DDD0] rounded-[14px] p-4 flex items-start gap-3 text-start">
            <span className="w-8 h-8 rounded-full bg-[#EAEFE4] flex items-center justify-center shrink-0 text-[#34422A] mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <div className="space-y-1">
              <h4 className="text-[12.5px] font-bold text-[#181D17]">
                تنبيه تغيير السياسة الأمنية:
              </h4>
              <p className="text-[11.5px] leading-[19px] text-[#57534E]">
                في حال تغيير طريقة إنشاء الكود إلى «كود دائم وموحد»، سيتم إيقاف توليد الأكواد الزمنية المؤقتة للحجوزات القادمة، وسريان الكود الدائم على جميع الحجوزات بعد اعتماد التغيير وحفظه في بوابة البناية.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F1F5EB] border-t border-[#EEF2E6] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] text-[#57534E]">
            <Lock className="w-3.5 h-3.5 text-[#34422A]" />
            <span>تزامن فوري مشفر 256-bit مع سحابة TTLock</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 rounded-[10px] text-xs font-semibold text-[#181D17] hover:bg-white/60 transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="h-10 px-6 rounded-[10px] bg-[#34422A] hover:bg-[#2C3825] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ الإعداد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
