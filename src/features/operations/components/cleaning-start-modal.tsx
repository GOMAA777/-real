"use client";

import { X, Play, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface CleaningStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskNumber?: string;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
  assigneeName?: string;
}

export function CleaningStartModal({
  isOpen,
  onClose,
  onConfirm,
  taskNumber = "CL-10482",
  unitName = "الوحدة 204 (الطابق الثاني)",
  propertyName = "عمارة النخيل — الرياض (حي العليا)",
  ownerName = "محمد العتيبي (OWN-4491)",
  assigneeName = "أحمد سالم",
}: CleaningStartModalProps) {
  const confirm = useConfirm();

  if (!isOpen) return null;

  const handleStart = async () => {
    const ok = await confirm({
      title: "تأكيد بدء مهمة التنظيف",
      message: `هل أنت متأكد من بدء تنفيذ مهمة التنظيف (${taskNumber}) لـ ${unitName}؟ سيتم تفعيل كود الدخول الذكي وبدء احتساب مؤشر SLA.`,
      confirmLabel: "تأكيد وبدء المهمة",
      variant: "default",
    });
    if (!ok) return;

    onConfirm();
    toast.success("تم بدء مهمة التنظيف وتفعيل كود الدخول الذكي للطاقم!");
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
          <h2 className="text-xl font-bold text-[#1F2937]">بدء التنظيف</h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Top Summary Card */}
          <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 text-xs space-y-3 text-[#4B5563]">
            <div className="flex justify-between items-start pb-2 border-b border-[#F0F2EE]">
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">الوحدة المستهدفة</span>
                <span className="font-bold text-[#1F2937] text-sm mt-0.5 block">{unitName}</span>
              </div>
              <div className="text-left">
                <span className="text-[#9CA3AF] block text-[11px]">العقار والموقع</span>
                <span className="font-bold text-[#1F2937] text-sm mt-0.5 block">{propertyName}</span>
              </div>
            </div>

            <div className="flex justify-between items-start pb-2 border-b border-[#F0F2EE]">
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">المالك المسجل</span>
                <span className="font-medium text-[#1F2937] mt-0.5 block">{ownerName}</span>
              </div>
              <div className="text-left">
                <span className="text-[#9CA3AF] block text-[11px]">رقم أمر العمل</span>
                <span className="font-medium text-[#1F2937] mt-0.5 block">{taskNumber} (مغادرة وتسليم فوري)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[#6B7280]">المسؤول المكلف بالمباشرة:</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center font-bold text-[10px]">
                  أس
                </div>
                <span className="font-bold text-[#1F2937] text-xs">{assigneeName}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF5EE] text-[#1F3D2B]">
                  مشرف تنظيف معتمد
                </span>
              </div>
            </div>
          </div>

          {/* Operational Impact Banner */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-[#1F3D2B] font-bold text-xs pb-1 border-b border-[#DFEBDF]">
              <ShieldCheck className="w-4 h-4" />
              <span>الأثر التشغيلي عند التأكيد:</span>
            </div>

            <ul className="space-y-2 text-xs text-[#374151] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F3D2B] mt-1.5 shrink-0" />
                <span>
                  تحديث حالة المهمة فوراً إلى: <strong>«جاري التنظيف»</strong> (تسجيل وقت البدء: 18 سبتمبر 2026 - 12:25 م).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F3D2B] mt-1.5 shrink-0" />
                <span>
                  إدراج قيد رسمي في سجل نشاط العقار: <strong>«بدأ أحمد سالم تنفيذ مهمة التنظيف.»</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F3D2B] mt-1.5 shrink-0" />
                <span>
                  حالة الوحدة 204 بالمنظومة المركزية: <strong>«تحت التنظيف»</strong> (محظورة برمجياً من الحجز والاستقبال حتى اكتمال كافة بنود الفحص).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F3D2B] mt-1.5 shrink-0" />
                <span>
                  تفعيل كود الدخول الرقمي الذكي المخصص لطاقم التنظيف تلقائياً وصلاحيته <strong>ساعتين من الآن</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleStart}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>بدء التنظيف</span>
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
