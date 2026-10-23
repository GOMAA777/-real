"use client";

import { X, CheckCircle2, RefreshCw, Clock, FileText, Lock, Shield } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface MaintenanceStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ticketNumber?: string;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
  assigneeName?: string;
}

export function MaintenanceStartModal({
  isOpen,
  onClose,
  onConfirm,
  ticketNumber = "MT-2048",
  unitName = "الوحدة 305 (الطابق 3 - برج الياسمين)",
  ownerName = "سارة القحطاني (OWN-8823)",
  assigneeName = "فريق الصيانة (م. طارق العسيري)",
}: MaintenanceStartModalProps) {
  const confirm = useConfirm();

  if (!isOpen) return null;

  const handleStart = async () => {
    const ok = await confirm({
      title: "تأكيد بدء أعمال الصيانة",
      message: `هل أنت متأكد من بدء تنفيذ بلاغ الصيانة (${ticketNumber}) لـ (${unitName})؟ سيتم توثيق الطابع الزمني وبدء احتساب معيار SLA.`,
      confirmLabel: "تأكيد وبدء الصيانة",
      variant: "default",
    });
    if (!ok) return;

    onConfirm();
    toast.success("تم بدء تنفيذ الصيانة وتوثيق الطابع الزمني في مقاييس SLA!");
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
          <h2 className="text-xl font-bold text-[#1F2937]">بدء تنفيذ الصيانة</h2>
        </div>

        <div className="p-6 space-y-4">
          {/* Top Summary Card */}
          <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0F2EE]">
              <span className="text-[#6B7280]">رقم البلاغ:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1F2937] text-sm">{ticketNumber}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600">
                  FL-305-YAS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#F0F2EE]">
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">الوحدة المستهدفة</span>
                <span className="font-semibold text-[#1F2937] text-xs mt-0.5 block">{unitName}</span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">مالك الأصل العقاري</span>
                <span className="font-semibold text-[#1F2937] text-xs mt-0.5 block">{ownerName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#F0F2EE]">
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">نوع المشكلة</span>
                <span className="font-semibold text-[#DC2626] text-xs mt-0.5 block">
                  عطل قفل الباب الذكي (Smart Lock)
                </span>
              </div>
              <div>
                <span className="text-[#9CA3AF] block text-[11px]">المسؤول المكلف</span>
                <span className="font-semibold text-[#1F2937] text-xs mt-0.5 block">{assigneeName}</span>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#EAEFE9] flex items-center justify-between">
              <span className="text-[#6B7280]">مستوى الأولوية المقيد في النظام:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#DC2626]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                أولوية عاجلة / فورية
              </span>
            </div>
          </div>

          {/* Operational Impact */}
          <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-[#1F3D2B] font-bold text-xs pb-1 border-b border-[#DFEBDF]">
              <Shield className="w-4 h-4" />
              <span>الأثر التشغيلي والحوكمة للمنظومة</span>
            </div>

            <div className="space-y-2 text-xs text-[#374151]">
              <div className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">تغير حالة البلاغ: </span>
                  تتحول حالة البلاغ فورياً من «بلاغ صيانة» إلى <strong>«قيد التنفيذ»</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">تسجيل الطابع الزمني: </span>
                  تقييد وتوثيق لحظة المباشرة الفعلية في مقاييس سرعة الاستجابة (SLA).
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">قيد رسمي في السجل: </span>
                  إدراج إشعار تلقائي بسجل نشاط العقار والمنصة: «بدأ تنفيذ بلاغ الصيانة بواسطة م. طارق العسيري .»
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1F2937]">قفل حجز الوحدة: </span>
                  الإبقاء على حالة الوحدة في المنظومة «تحت الصيانة» ومحظورة من التسكين أو الحجز حتى اكتمال الصيانة وإنهاء بروتوكول التنظيف.
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleStart}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>بدء التنفيذ</span>
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
