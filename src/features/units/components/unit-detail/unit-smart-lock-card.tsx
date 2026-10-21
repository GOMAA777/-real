"use client";

import {
  BatteryMedium,
  CheckCircle2,
  Copy,
  Eye,
  KeyRound,
  Lock,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";

interface UnitSmartLockCardProps {
  onOpenAccessCodeModal?: () => void;
  onOpenShowCode?: () => void;
  unitNumber?: string;
}

export function UnitSmartLockCard({
  onOpenAccessCodeModal,
  onOpenShowCode,
  unitNumber = "204",
}: UnitSmartLockCardProps) {
  return (
    <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-5 text-start">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F1F5EB]">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-[10px] bg-[#EAF1E8] text-[#34422A] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-[17px] font-bold text-[#181D17]">
              إدارة القفل الذكي والوصول السحابي (IoT)
            </h3>
            <p className="text-[12px] text-[#7C8773] mt-0.5">
              جهاز TTLock Pro X5 • بوابة السحابة الإلكترونية متصلة بالكامل
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-[#EAF1E8] text-[#2F5A22] border border-[#D9E3D5] self-start sm:self-auto">
          <Wifi className="w-3.5 h-3.5 text-[#2F8A3E]" />
          <span>متصل سحابياً (Online)</span>
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Battery */}
        <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
          <div className="text-[11px] text-[#7C8773] font-medium flex items-center justify-between mb-1">
            <span>مستوى البطارية</span>
            <BatteryMedium className="w-4 h-4 text-[#2F8A3E]" />
          </div>
          <div className="text-[16px] font-bold text-[#181D17]">
            92% (شحن ممتاز)
          </div>
          <div className="text-[10.5px] text-[#8A9384] mt-0.5">
            صلاحية تشغيل تقديرية: 6 أشهر
          </div>
        </div>

        {/* Signal */}
        <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
          <div className="text-[11px] text-[#7C8773] font-medium flex items-center justify-between mb-1">
            <span>إشارة البوابة (Bridge)</span>
            <Wifi className="w-4 h-4 text-[#2F8A3E]" />
          </div>
          <div className="text-[16px] font-bold text-[#181D17]">
            قوية جداً (-64 dBm)
          </div>
          <div className="text-[10.5px] text-[#8A9384] mt-0.5">
            بوابة G2 Hub على مسافة 4 أمتار
          </div>
        </div>

        {/* Lock State */}
        <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
          <div className="text-[11px] text-[#7C8773] font-medium flex items-center justify-between mb-1">
            <span>حالة الإقفال الحالية</span>
            <ShieldCheck className="w-4 h-4 text-[#2F8A3E]" />
          </div>
          <div className="text-[16px] font-bold text-[#2F5A22]">
            مُقفل آلياً (Auto-Locked)
          </div>
          <div className="text-[10.5px] text-[#8A9384] mt-0.5">
            إقفال تلقائي بعد 5 ثوانٍ من الغلق
          </div>
        </div>

        {/* Security Policy */}
        <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
          <div className="text-[11px] text-[#7C8773] font-medium flex items-center justify-between mb-1">
            <span>سياسة توليد الأكواد</span>
            <KeyRound className="w-4 h-4 text-[#34422A]" />
          </div>
          <div className="text-[16px] font-bold text-[#181D17]">
            كود مؤقت لكل حجز
          </div>
          <div className="text-[10.5px] text-[#8A9384] mt-0.5">
            تشفير AES-128 سحابي
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-[12px] text-[#55694D] flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#2F8A3E]" />
          <span>آخر مزامنة ناجحة تمت منذ 4 دقائق عبر الخادم المركزي</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 1000)),
                {
                  loading: "جاري مزامنة القفل الذكي مع السحابة...",
                  success: "تمت مزامنة القفل الذكي بنجاح وتحديث كافة الأكواد",
                  error: "تعذر المزامنة",
                }
              );
            }}
            className="h-9 px-3.5 rounded-[8px] bg-[#F1F5EB] border border-[#CCD5C5] text-[#34422A] text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#E5ECE0] transition-colors cursor-pointer select-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>مزامنة القفل</span>
          </button>

          <button
            type="button"
            onClick={onOpenShowCode}
            className="h-9 px-3.5 rounded-[8px] bg-[#EAF1E8] border border-[#C2D8B1] text-[#24351D] text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#CCE0BD] transition-colors cursor-pointer select-none"
          >
            <Eye className="w-3.5 h-3.5 text-[#2F8A3E]" />
            <span>عرض كود الدخول</span>
          </button>

          <button
            type="button"
            onClick={onOpenAccessCodeModal}
            className="h-9 px-4 rounded-[8px] bg-[#34422A] text-white text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#283420] transition-colors cursor-pointer select-none"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>إدارة كود الدخول</span>
          </button>
        </div>
      </div>
    </div>
  );
}
