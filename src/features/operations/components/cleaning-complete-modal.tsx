"use client";

import { useState } from "react";
import { X, CheckCircle2, Clock, CheckSquare, FileText, Lock } from "lucide-react";
import { toast } from "sonner";

interface CleaningCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes?: string) => void;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
  assigneeName?: string;
}

export function CleaningCompleteModal({
  isOpen,
  onClose,
  onConfirm,
  unitName = "الوحدة 204 (الطابق الثاني)",
  propertyName = "عمارة النخيل — حي العليا",
  ownerName = "محمد العتيبي (OWN-4491)",
  assigneeName = "أحمد سالم (مشرف معتمد — النقاء)",
}: CleaningCompleteModalProps) {
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(notes);
    toast.success("تم تأكيد اكتمال التنظيف واعتماد جاهزية الوحدة تلقائياً!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-[#EBEBEB] animate-in fade-in zoom-in-95 duration-200"
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
          <h2 className="text-xl font-bold text-[#1F2937]">تأكيد اكتمال التنظيف</h2>
        </div>

        <form onSubmit={handleComplete} className="p-6 space-y-4">
          {/* Summary Card */}
          <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-[#6B7280]">ملخص المهمة الميدانية</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">الوحدة المستهدفة</span>
                <span className="font-bold text-[#1F2937] text-sm mt-0.5 block">{unitName}</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">الأصل العقاري</span>
                <span className="font-bold text-[#1F2937] text-sm mt-0.5 block">{propertyName}</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">المالك المسجل</span>
                <span className="font-medium text-[#374151] mt-0.5 block">{ownerName}</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">نوع الإجراء المعتمد</span>
                <span className="font-medium text-[#374151] mt-0.5 block">مغادرة وتسليم فوري</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#EAEFE9] text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">المسؤول المنفذ:</span>
                <span className="font-semibold text-[#1F2937]">{assigneeName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">وقت البدء والمدة:</span>
                <span className="font-semibold text-[#1F3D2B]">
                  18 سبتمبر 2026 - 12:25 م (مدة العمل: 42 دقيقة)
                </span>
              </div>
            </div>
          </div>

          {/* Operational & Governance Automation Checklist */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-[#1F3D2B] font-bold text-xs pb-1 border-b border-[#DFEBDF]">
              <CheckSquare className="w-4 h-4" />
              <span>الحوكمة التشغيلية والأتمتة النظامية</span>
            </div>

            <div className="space-y-2 text-xs text-[#374151]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">تحديث حالة المهمة: </span>
                  تتحول فوراً إلى <span className="font-bold text-[#16A34A]">مكتملة</span> مع قيد زمن الإكمال الفعلي (18 سبتمبر 2026 - 01:07 م).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">حوكمة حالة الوحدة: </span>
                  تتحول الوحدة 204 تلقائياً إلى <span className="font-bold text-[#16A34A]">متاحة</span> في محركات الحجز (لعدم وجود تعارض مع حجوزات قادمة فورية أو بلاغات صيانة نشطة). لا يُسمح بتعديل الحالة يدوياً.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">قيد السجل الرسمي: </span>
                  إدراج توثيق دائم في سجل التدقيق: تم إكمال مهمة التنظيف بواسطة أحمد سالم واعتماد جاهزية الوحدة.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">الأقفال الذكية: </span>
                  إلغاء صلاحية كود الدخول المؤقت لطاقم التنظيف تلقائياً وبشكل فوري بمجرد إغلاق الباب.
                </div>
              </div>
            </div>
          </div>

          {/* Notes Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1F2937] block">
              ملاحظات إضافية <span className="font-normal text-[#9CA3AF]">(اختياري)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B]"
              placeholder="أضف أي ملاحظات تشغيلية أو تنبيهات متعلقة بسلامة الوحدة (مثال: تم إغلاق النوافذ، فحص بطارية القفل، إلخ)..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تأكيد اكتمال التنظيف</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
