"use client";

import { X, Play, ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { AutomationRule } from "../../../types";

interface ActivateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rule?: AutomationRule | null;
}

export function ActivateRuleModal({
  isOpen,
  onClose,
  onConfirm,
  rule,
}: ActivateRuleModalProps) {
  const confirm = useConfirm();

  if (!isOpen || !rule) return null;

  const handleActivate = async () => {
    const ok = await confirm({
      title: "تأكيد إعادة تفعيل قاعدة الأتمتة",
      message: `هل أنت متأكد من إعادة تفعيل قاعدة الأتمتة "${rule.title}" (#${rule.ruleCode})؟ سيتم استئناف الجدولة وإطلاق الرسائل تلقائياً.`,
      confirmLabel: "تفعيل القاعدة",
      variant: "default",
    });
    if (!ok) return;

    onConfirm();
    toast.success(`تمت إعادة تفعيل قاعدة الأتمتة "${rule.title}" بنجاح!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#EBEBEB] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#F3F4F6] relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-6 top-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="text-xl font-bold text-[#1F2937]">إعادة تفعيل قاعدة الأتمتة؟</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Rule Info Card */}
          <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0F2EE]">
              <span className="font-bold text-sm text-[#1F2937] flex items-center gap-1.5">
                <span>⚡</span>
                <span>{rule.title}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-[#E5E7EB] text-gray-700">
                  #{rule.ruleCode}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                  متوقفة
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-[#EAEFE9]">
                <span className="text-[10px] text-[#9CA3AF] block">المحفز المعتمد</span>
                <span className="font-bold text-[#1F2937] text-[11px] mt-0.5 block">
                  {rule.triggerLabel}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#EAEFE9]">
                <span className="text-[10px] text-[#9CA3AF] block">الإجراء المنفذ</span>
                <span className="font-bold text-[#1F2937] text-[11px] mt-0.5 block">
                  رابط عبر WhatsApp
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#EAEFE9]">
                <span className="text-[10px] text-[#9CA3AF] block">النطاق المستهدف</span>
                <span className="font-bold text-[#1F2937] text-[11px] mt-0.5 block">
                  {rule.scope}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1F2937] mb-1">
              سيتم تشغيل القاعدة تلقائياً عند تحقق شروطها.
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              فور استئناف التفعيل، سيبدأ محرك الأتمتة بفحص كافة الحجوزات والمغادرات القادمة وتطبيق المعايير المعتمدة دون الحاجة لتدخل يدوي من فريق العمليات.
            </p>
          </div>

          {/* Privacy & Safe Resume Banner */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#1F3D2B] font-bold pb-1 border-b border-[#DFEBDF]">
              <ShieldCheck className="w-4 h-4" />
              <span>جاهزية فورية للتشغيل وحماية خصوصية النزيل</span>
            </div>
            <p className="text-[11px] text-[#4B6350] leading-relaxed">
              لن يتم تكرار الإرسال للحجوزات التي غادرت أثناء فترة التوقف تجنباً لإزعاج النزلاء، وستبدأ القاعدة بالعمل على الأحداث المؤهلة القادمة فقط.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#1F3D2B]">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>
                تدوين أملي فوري: «تمت إعادة تفعيل قاعدة الأتمتة بواسطة مدير المنصة (محمد أحمد)»، وتحديث الحالة إلى «مفعلة» لحظياً.
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleActivate}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>إعادة التفعيل</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
