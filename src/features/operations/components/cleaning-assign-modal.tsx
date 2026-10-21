"use client";

import { useState } from "react";
import { X, CheckCircle2, Key, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface CleaningAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (assignee: string, notes?: string) => void;
  taskNumber?: string;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
}

export function CleaningAssignModal({
  isOpen,
  onClose,
  onConfirm,
  taskNumber = "CL-10482",
  unitName = "الوحدة 204 (الطابق الثاني)",
  propertyName = "عمارة النخيل (الرياض - حي العليا)",
  ownerName = "محمد العتيبي",
}: CleaningAssignModalProps) {
  const [selectedAssignee, setSelectedAssignee] = useState("أحمد سالم (شركة النقاء للتشغيل الفندقي)");
  const [notes, setNotes] = useState(
    "يرجى فحص بطارية القفل الذكي والتأكد من إغلاق النوافذ والشرفات بعد انتهاء التهوية."
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedAssignee, notes);
    toast.success("تم تعيين مسؤول التنظيف وتوليد كود الدخول المؤقت بنجاح!");
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

          <h2 className="text-xl font-bold text-[#1F2937]">تعيين مسؤول التنظيف</h2>
          <p className="text-xs text-[#6B7280] mt-1">
            مهمة التنظيف: {taskNumber} • {unitName} — {propertyName} • المالك: {ownerName}
          </p>

          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF5EE] text-[#1F3D2B] border border-[#DCE8DC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F3D2B]" />
              <span>أولوية قياسية • مغادرة نزيل وتسليم فوري</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Summary Box */}
          <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 text-xs space-y-2 text-[#4B5563]">
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">موقع الوحدة:</span>
              <span className="font-semibold text-[#1F2937]">{unitName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">مدة التنظيف المستهدفة:</span>
              <span className="font-semibold text-[#1F2937]">45 دقيقة (تبدأ فور الاستلام الميداني)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">حالة المهمة الحالية:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#D97706]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                بانتظار الإسناد الميداني
              </span>
            </div>
          </div>

          {/* Supervisor Select */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-[#1F2937]">
                المسؤول الميداني المكلف <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-[#6B7280]">3 متاحين حالياً في النطاق</span>
            </div>

            <div className="relative">
              <div className="w-full p-3.5 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#1F3D2B] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center font-bold text-xs">
                    أس
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1F2937]">
                      أحمد سالم (شركة النقاء للتشغيل الفندقي)
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      مشرف تنظيف معتمد • ★ 4.9 • متاح حالياً
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </div>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-relaxed">
              سيتم إرسال إشعار فوري وتصريح كود الدخول المؤقت عبر تطبيق المشغل فور التعيين.
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-[#1F2937]">
                ملاحظات وتوجيهات خاصة <span className="text-xs font-normal text-[#9CA3AF]">(اختياري)</span>
              </label>
              <span className="text-xs text-[#6B7280]">تعليمات موجهة للطاقم الميداني</span>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B] leading-relaxed"
              placeholder="اكتب التوجيهات هنا..."
            />
          </div>

          {/* Impact Alert */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#D6E6D6] flex items-center justify-center text-[#1F3D2B] shrink-0 mt-0.5">
              <Key className="w-4 h-4" />
            </div>
            <div className="text-xs leading-relaxed text-[#374151]">
              <span className="font-bold text-[#1F3D2B] block mb-1">
                الإجراءات الآلية عند التأكيد:
              </span>
              يتم تحديث المسؤول إلى [أحمد سالم]، وتوليد كود دخول إلكتروني مؤقت صالح لمدة ساعتين، مع تسجيل رسمي في سجل نشاط المهمة: "تم تعيين مهمة التنظيف إلى أحمد سالم".
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ الإعداد</span>
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
