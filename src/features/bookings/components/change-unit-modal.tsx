"use client";

import { useState } from "react";
import {
  X,
  ArrowRightLeft,
  Search,
  Check,
  Building2,
  Calendar,
  Clock,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

interface ChangeUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingCode?: string;
  onConfirm?: (newUnit: string) => void;
}

export function ChangeUnitModal({
  isOpen,
  onClose,
  bookingCode = "BK-10482",
  onConfirm,
}: ChangeUnitModalProps) {
  const [selectedUnitId, setSelectedUnitId] = useState("208");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const units = [
    {
      id: "208",
      name: "وحدة 208",
      floor: "الدور الثاني",
      specs: "جناح تنفيذي بلس (غرفة نوم وصالة) ▪ شرفة خاصة وإطلالة شرقية",
      status: "متاحة ومطابقة",
      price: "650 ر.س",
      priceNote: "متطابق بالسعر",
      priceColor: "text-[#7A8875]",
      badge: "الخيار المحدد",
    },
    {
      id: "202",
      name: "وحدة 202",
      floor: "الدور الثاني",
      specs: "استوديو بريميوم مع مطبخ تحضيري ▪ إطلالة هادئة",
      status: "متاحة ومطابقة",
      price: "620 ر.س",
      priceNote: "وفر 90 ر.س إجمالي",
      priceColor: "text-[#3E6F3A] font-semibold",
      badge: null,
    },
    {
      id: "304",
      name: "وحدة 304",
      floor: "الدور الثالث",
      specs: "جناح عائلي ديلوكس (غرفتي نوم) ▪ إطلالة علوية",
      status: "متاحة ومطابقة",
      price: "710 ر.س",
      priceNote: "فارق ترقية (+180 ر.س)",
      priceColor: "text-[#B87A38] font-semibold",
      badge: null,
    },
  ];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم تغيير الوحدة بنجاح", {
        description: "تم نقل الحجز إلى وحدة 208 وتحديث رمز القفل الذكي تلقائياً",
      });
      if (onConfirm) onConfirm(`وحدة ${selectedUnitId}`);
      onClose();
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      dir="rtl"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[28px] max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#E2E6DC] space-y-5 text-right z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button (Top Left in RTL) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 start-6 w-8 h-8 rounded-full bg-[#F2F5EF] hover:bg-[#E5ECE0] text-[#556650] hover:text-[#172115] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pe-10">
          <div className="w-10 h-10 rounded-xl bg-[#E2EFE0] text-[#3E6F3A] flex items-center justify-center shrink-0 shadow-3xs">
            <ArrowRightLeft className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
              تغيير الوحدة
            </h2>
            <p className="text-xs text-[#7A8875] font-medium">
              نقل الحجز {bookingCode} إلى وحدة بديلة متاحة لنفس تواريخ الإقامة
            </p>
          </div>
        </div>

        {/* Current Unit Box (الوحدة الحالية المسجلة) */}
        <div className="bg-[#F4F8F1] rounded-2xl p-4 border border-[#DEE8DA] space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#6F7E6A] font-bold">
              <Building2 className="w-3.5 h-3.5 text-[#3D4C35]" />
              <span>الوحدة الحالية المسجلة</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-md bg-[#E2EBDC] text-[#3D4C35] text-[11px] font-bold">
              الحجز قائم
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="space-y-0.5">
              <div className="text-base sm:text-lg font-black text-[#172115]">
                الوحدة 204 — جناح تنفيذي فاخر
              </div>
              <div className="text-xs text-[#6F7E6B] font-medium">
                عمارة النخيل (الرياض - حي العليا) ▪ الدور الثاني ▪ المالك: محمد بن سعود العتيبي
              </div>
            </div>

            <div className="bg-white rounded-xl p-2.5 text-center border border-[#DEE7D8] shadow-3xs shrink-0 self-start sm:self-auto">
              <div className="text-[10px] text-[#7A8875] font-medium">فترة الإقامة الحالية</div>
              <div className="text-xs font-bold text-[#172115] whitespace-nowrap">
                18 - 21 سبتمبر (3 ليالٍ)
              </div>
            </div>
          </div>
        </div>

        {/* Available Alternative Units Header */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-[#172115]">
              اختيار الوحدة البديلة المتاحة
            </h3>
            <span className="px-3 py-0.5 rounded-full bg-[#E3EFE0] text-[#33462E] text-xs font-bold border border-[#CCE0C8]">
              3 وحدات متوافقة
            </span>
          </div>
          <p className="text-xs text-[#7A8875]">
            يتم عرض الوحدات التابعة لنفس العقار والمتاحة بالكامل لنفس تواريخ الحجز المختارة فقط.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-[#F2F5EF] rounded-2xl px-4 py-2.5 flex items-center justify-between border border-transparent focus-within:border-[#3D4C35] transition-colors">
          <input
            type="text"
            placeholder="ابحث برقم الوحدة، الدور، أو نوع الجناح..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs sm:text-sm text-[#172115] placeholder-[#8A9784] w-full"
          />
          <Search className="w-4 h-4 text-[#7A8875] shrink-0 me-1" />
        </div>

        {/* Units Radio List */}
        <div className="space-y-3">
          {units.map((unit) => {
            const isSelected = selectedUnitId === unit.id;
            return (
              <div
                key={unit.id}
                onClick={() => setSelectedUnitId(unit.id)}
                className={`rounded-2xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? "border-2 border-[#2E3C29] bg-[#F7F9F5] shadow-xs"
                    : "border border-[#E2E6DC] bg-white hover:bg-[#FAFBF9]"
                }`}
              >
                {/* Right: Radio selection + Unit name & specs */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "bg-[#2E3C29] text-white"
                        : "border-2 border-[#CBD5C7] bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-black text-sm sm:text-base text-[#172115]">
                        {unit.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#E9EFE6] text-[#556650] text-[11px] font-bold">
                        {unit.floor}
                      </span>
                      {unit.badge && (
                        <span className="px-2.5 py-0.5 rounded-md bg-[#2E3C29] text-white text-[11px] font-bold">
                          {unit.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#6F7E6B] leading-relaxed">
                      {unit.specs}
                    </div>
                  </div>
                </div>

                {/* Left: Availability + Pricing */}
                <div className="text-left shrink-0 sm:self-center ps-8 sm:ps-0">
                  <div className="flex items-center gap-1.5 justify-end text-xs font-bold text-[#3E6F3A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3E6F3A]" />
                    <span>{unit.status}</span>
                  </div>
                  <div className="text-sm font-black text-[#172115]">
                    {unit.price} <span className="text-[11px] font-normal text-[#7A8875]">/ ليلة</span>
                  </div>
                  <div className={`text-[11px] ${unit.priceColor}`}>
                    {unit.priceNote}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Summary Box (ملخص المقارنة قبل النقل) */}
        <div className="bg-[#F2F5EF] rounded-2xl p-4 border border-[#E5EAE0] space-y-2">
          <div className="text-xs font-bold text-[#6F7E6A]">
            ملخص المقارنة قبل النقل
          </div>
          <div className="grid grid-cols-2 gap-3 items-center">
            {/* Current */}
            <div className="bg-white rounded-xl p-3 border border-[#E2E6DC] text-center">
              <div className="text-[11px] text-[#7A8875]">الوحدة الحالية</div>
              <div className="text-sm font-black text-[#172115]">وحدة 204</div>
            </div>

            {/* Selected */}
            <div className="bg-[#E3EFE0] rounded-xl p-3 border border-[#CCE0C8] text-center">
              <div className="text-[11px] text-[#33462E]">الوحدة الجديدة المختارة</div>
              <div className="text-sm font-black text-[#1E2B1A]">وحدة {selectedUnitId}</div>
            </div>
          </div>
        </div>

        {/* Automated Sync Alert Box */}
        <div className="bg-[#EEF5EB] rounded-2xl p-3.5 flex items-start gap-3 border border-[#DEEAD9]">
          <RotateCcw className="w-4 h-4 text-[#3D4C35] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#273822]">
              تنبيه المزامنة والأتمتة الفورية
            </div>
            <div className="text-[11px] text-[#556650] leading-relaxed">
              سيتم فوراً تحويل صلاحيات القفل الذكي وإرسال رمز الدخول الجديد عبر الرسائل النصية للنزيل <strong className="text-[#172115]">خالد العتيبي</strong>، مع تحديث تقويم التوافر على <strong className="text-[#172115]">Whatsapp.com</strong> تلقائياً.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 py-3 px-6 rounded-2xl bg-[#2E3C29] hover:bg-[#232F1F] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-70"
          >
            <Check className="w-4 h-4" />
            <span>{isSubmitting ? "جارٍ التحديث..." : "تأكيد تغيير الوحدة"}</span>
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-6 rounded-2xl bg-white hover:bg-[#F2F5EF] text-[#2C3825] font-bold text-xs sm:text-sm border border-[#E2E6DC] transition-all cursor-pointer shadow-3xs"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
