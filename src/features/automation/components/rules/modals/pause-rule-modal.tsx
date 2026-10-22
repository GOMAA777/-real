"use client";

import { X, Pause, ShieldCheck, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { AutomationRule } from "../../../types";

interface PauseRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rule?: AutomationRule | null;
}

export function PauseRuleModal({
  isOpen,
  onClose,
  onConfirm,
  rule,
}: PauseRuleModalProps) {
  const confirm = useConfirm();

  if (!isOpen || !rule) return null;

  const handlePause = async () => {
    const ok = await confirm({
      title: "تأكيد إيقاف قاعدة الأتمتة",
      message: `هل أنت متأكد من إيقاف قاعدة الأتمتة "${rule.title}" (#${rule.ruleCode})؟ سيتم إيقاف كافة الرسائل والجدولة المرتبطة بها مؤقتاً.`,
      confirmLabel: "إيقاف القاعدة",
      variant: "destructive",
    });
    if (!ok) return;

    onConfirm();
    toast.success(`تم إيقاف قاعدة الأتمتة "${rule.title}" بنجاح!`);
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
          <h2 className="text-xl font-bold text-[#1F2937]">إيقاف قاعدة الأتمتة؟</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Rule Info Card */}
          <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0F2EE]">
              <span className="font-bold text-sm text-[#1F2937]">{rule.title}</span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-[#E5E7EB] text-gray-700">
                  #{rule.ruleCode}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                  مفعلة
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[#6B7280]">
              <span>المحفز: {rule.triggerLabel}</span>
              <span>النطاق: {rule.scope}</span>
            </div>
          </div>

          <p className="text-xs text-[#4B5563] leading-relaxed">
            سيتم إيقاف تنفيذ هذه القاعدة فورياً. لن يتم تشغيل إرسال بيانات الوصول للحجوزات المستقبلية حتى يُعاد تفعيل القاعدة يدوياً من لوحة التحكم.
          </p>

          {/* Historical Data Protection Card */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 space-y-1 text-xs">
            <div className="flex items-center gap-2 text-[#1F3D2B] font-bold pb-1 border-b border-[#DFEBDF]">
              <ShieldCheck className="w-4 h-4" />
              <span>عمليات التنفيذ السابقة لن تتأثر</span>
            </div>
            <p className="text-[11px] text-[#4B6350] leading-relaxed pt-1">
              السجلات التاريخية وإحصائيات التسليم السابقة لـ 142 عملية منفذة ستبقى مؤرشفة بالكامل دون أي مساس بها أو تعديل في تقارير الاعتمادية.
            </p>
          </div>

          {/* Audit banner */}
          <div className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-xl flex items-center gap-2 text-[11px] text-[#6B7280]">
            <FileCheck className="w-4 h-4 text-[#1F3D2B] shrink-0" />
            <span>
              سيتم تدوين الإجراء في سجل التدقيق: «تم إيقاف قاعدة الأتمتة بواسطة مدير المنصة (محمد أحمد)» مع الختم الزمني المشفر.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePause}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <Pause className="w-4 h-4" />
              <span>إيقاف القاعدة</span>
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
