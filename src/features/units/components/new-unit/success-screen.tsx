  "use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  DoorClosed,
  Lock,
  PlusCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { TickIcon } from "./ui";

interface UnitSuccessScreenProps {
  onAddAnother: () => void;
  onBackToList: () => void;
  property: string;
  owner: string;
}

export function UnitSuccessScreen({
  onAddAnother,
  onBackToList,
  property,
  owner,
}: UnitSuccessScreenProps) {
  return (
    <div className="min-h-screen flex justify-center px-4 py-8">
      <div className="w-full max-w-[880px] bg-white rounded-[16px] border border-[#EDF1E7] shadow-[0_8px_30px_rgba(24,29,23,0.05)] px-6 sm:px-8 py-8 flex flex-col justify-between">
        {/* Hero */}
        <div>
          <div className="flex flex-col items-center text-center">
            <span className="w-[86px] h-[86px] rounded-[18px] bg-[#F1F5EB] flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-[#34422A] flex items-center justify-center">
                <Check className="w-[18px] h-[18px] text-white" strokeWidth={2.6} />
              </span>
            </span>
            <h2 className="text-[24px] leading-[32px] font-bold text-[#181D17] mt-5">
              تمت إضافة الوحدة بنجاح
            </h2>
            <p className="text-[13px] leading-[22px] text-[#7C8773] mt-2 max-w-[500px]">
              تم تسجيل الوحدة السكنية وربطها بالأصل العقاري والمالك وتفعيل سياسة الدخول الذكي تلقائيًا.
            </p>
          </div>

          {/* Summary rows */}
          <div className="mt-6 rounded-[12px] bg-[#F1F5EB] p-2 space-y-1.5">
            {/* الوحدة */}
            <div className="bg-white rounded-[10px] h-12 px-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[12px] text-[#7C8773]">
                <DoorClosed className="w-[15px] h-[15px]" strokeWidth={1.7} />
                الوحدة
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#181D17]">204</span>
                <span className="h-6 px-2.5 rounded-[6px] bg-[#EFF6EA] text-[10.5px] text-[#3F4A36] flex items-center">
                  الطابق الثاني • استوديو
                </span>
              </span>
            </div>

            {/* العقار المرتبط */}
            <div className="bg-white rounded-[10px] h-12 px-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[12px] text-[#7C8773]">
                <Building2 className="w-[15px] h-[15px]" strokeWidth={1.7} />
                العقار المرتبط
              </span>
              <span className="text-[12px] text-[#3F4A36]">
                <span className="font-bold text-[#181D17]">{property}</span>
                <span className="text-[#8A9384] ms-2">حي العليا، الرياض • PR-1048</span>
              </span>
            </div>

            {/* المالك المعتمد */}
            <div className="bg-white rounded-[10px] h-12 px-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[12px] text-[#7C8773]">
                <UserRound className="w-[15px] h-[15px]" strokeWidth={1.7} />
                المالك المعتمد
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-[12.5px] text-[#181D17]">{owner}</span>
                <span className="h-[22px] px-2 rounded-full bg-[#E4EFD7] text-[10px] font-bold text-[#3F7A2E] flex items-center gap-1">
                  <TickIcon className="w-3 h-3" />
                  <span>موثق</span>
                </span>
                <span className="text-[11px] text-[#8A9384]">OWN-4491</span>
              </span>
            </div>

            {/* حالة الوحدة */}
            <div className="bg-white rounded-[10px] h-12 px-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[12px] text-[#7C8773]">
                <ShieldCheck className="w-[15px] h-[15px]" strokeWidth={1.7} />
                حالة الوحدة
              </span>
              <span className="h-6 px-2.5 rounded-full bg-[#D8E8CB] text-[10.5px] font-bold text-[#2F5A22] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F8A3F]" />
                متاحة للإيجار
              </span>
            </div>

            {/* بروتوكول الدخول */}
            <div className="bg-white rounded-[10px] h-12 px-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[12px] text-[#7C8773]">
                <Lock className="w-[15px] h-[15px]" strokeWidth={1.7} />
                بروتوكول الدخول
              </span>
              <span className="text-[12px] text-[#3F4A36] flex items-center gap-1.5">
                <span>مزامنة مشفرة سحابية مؤتمتة</span>
                <Lock className="w-3.5 h-3.5 text-[#34422A]" strokeWidth={1.8} />
              </span>
            </div>

            {/* تاريخ الإضافة */}
            <div className="bg-white rounded-[10px] h-12 px-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[12px] text-[#7C8773]">
                <CalendarDays className="w-[15px] h-[15px]" strokeWidth={1.7} />
                تاريخ الإضافة
              </span>
              <span className="text-[12px] text-[#181D17]">
                18 سبتمبر 2026 • 11:45 ص{" "}
                <span className="text-[#8A9384]">(المشرف: محمد أحمد)</span>
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard/units/1"
              className="h-11 px-6 rounded-[12px] bg-[#34422A] hover:bg-[#2C3825] text-white text-[13px] font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>عرض تفاصيل الوحدة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onAddAnother}
              className="h-11 px-5 rounded-[12px] bg-[#F1F5EB] hover:bg-[#E6ECD9] text-[#181D17] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#34422A]" />
              <span>إضافة وحدة أخرى</span>
            </button>

            <button
              type="button"
              onClick={onBackToList}
              className="h-11 px-4 text-[13px] font-semibold text-[#5E6B56] hover:text-[#181D17] transition-colors cursor-pointer"
            >
              قائمة الوحدات
            </button>
          </div>
        </div>

        {/* Audit footer note */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F1F5EB] text-[11px] text-[#6E7A66]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B5940]" strokeWidth={1.8} />
            تم تدوين هذا الإجراء تلقائياً في سجل تدقيق العقار العام (Audit Log #UNT-1048-204)
          </span>
        </div>
      </div>
    </div>
  );
}
