"use client";

import { useState } from "react";
import { X, Trash2, ShieldCheck, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { AutomationRule } from "../../../types";

interface DeleteRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rule?: AutomationRule | null;
}

export function DeleteRuleModal({
  isOpen,
  onClose,
  onConfirm,
  rule,
}: DeleteRuleModalProps) {
  const confirm = useConfirm();
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !rule) return null;

  const handleDelete = async () => {
    if (!confirmed) {
      toast.error("يرجى تأكيد الإقرار بالتدقيق الأمني قبل الحذف");
      return;
    }

    const ok = await confirm({
      title: "تأكيد حذف قاعدة الأتمتة",
      message: `هل أنت متأكد من رغبتك في حذف قاعدة الأتمتة "${rule.title}" (#${rule.ruleCode}) نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.`,
      confirmLabel: "حذف القاعدة نهائياً",
      variant: "destructive",
    });
    if (!ok) return;

    onConfirm();
    toast.success(`تم حذف قاعدة الأتمتة "${rule.title}" وأرشفة سجلاتها التاريخية.`);
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
          <h2 className="text-xl font-bold text-[#1F2937]">حذف قاعدة الأتمتة؟</h2>
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
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                  متوقفة مؤقتاً
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-[#6B7280]">
              <span>المحفز: {rule.triggerLabel}</span>
              <span>النطاق: {rule.scope}</span>
            </div>
          </div>

          <p className="text-xs text-[#4B5563] leading-relaxed">
            لن يتم حذف سجلات التنفيذ السابقة، ولكن لن يمكن تشغيل هذه القاعدة مرة أخرى عبر البوابات الذكية أو نظام إدارة النزلاء.
          </p>

          {/* Historical Data Protection Card */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 space-y-1 text-xs">
            <div className="flex items-center gap-2 text-[#1F3D2B] font-bold pb-1 border-b border-[#DFEBDF]">
              <ShieldCheck className="w-4 h-4" />
              <span>حفظ وأرشفة السجلات التاريخية</span>
            </div>
            <p className="text-[11px] text-[#4B6350] leading-relaxed pt-1">
              ستبقى السجلات التاريخية وإحصائيات التسليم السابقة لـ 142 عملية منفذة محفوظة في الأرشيف غير القابل للتعديل لأغراض الحوكمة والتدقيق الأمني.
            </p>
          </div>

          {/* Danger Alert */}
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-2xl p-4 space-y-1 text-xs text-[#991B1B]">
            <div className="flex items-center gap-2 text-[#DC2626] font-bold pb-1 border-b border-[#FCA5A5]">
              <AlertTriangle className="w-4 h-4" />
              <span>تحذير أمني تشغيلي</span>
            </div>
            <p className="text-[11px] leading-relaxed pt-1">
              هذا الإجراء لا يمكن التراجع عنه. فور تأكيد الحذف، سيتم إيقاف كافة الجدولة المستقبلية فوراً وإلغاء ارتباط مفاتيح الوصول الرقمية المعلقة.
            </p>
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#374151] pt-1">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#DC2626] rounded border-gray-300 focus:ring-red-500"
            />
            <span className="leading-relaxed">
              أؤكد علمي بتدوين عملية الحذف في سجل التدقيق الإداري العام باسم محمد أحمد (مدير المنصة) مع الختم الزمني المشفر.
            </span>
          </label>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={!confirmed}
              onClick={handleDelete}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-sm font-bold transition-colors shadow-sm ${
                confirmed
                  ? "bg-[#D97777] hover:bg-[#C96666] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>تأكيد حذف القاعدة</span>
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
