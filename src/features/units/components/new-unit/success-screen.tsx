"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Check,
  Clock,
  DoorClosed,
  Info,
  Lock,
  PlusCircle,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";

interface UnitSuccessScreenProps {
  onAddAnother?: () => void;
  onBackToList?: () => void;
  property?: string;
  owner?: string;
  unitNumber?: string;
  floorCategory?: string;
  locationCode?: string;
  ownerCode?: string;
  additionDate?: string;
  supervisor?: string;
  auditLogCode?: string;
}

export function UnitSuccessScreen({
  onAddAnother,
  onBackToList,
  property = "عمارة النخيل",
  owner = "محمد العتيبي",
  unitNumber = "204",
  floorCategory = "الطابق الثاني • استوديو",
  locationCode = "حي العليا، الرياض • PR-1048",
  ownerCode = "OWN-4491",
  additionDate = "18 سبتمبر 2026 • 11:45 ص",
  supervisor = "محمد أحمد",
  auditLogCode = "UNT-1048-204",
}: UnitSuccessScreenProps) {
  return (
    <div
      className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-8 sm:py-12 animate-in fade-in duration-300"
      dir="rtl"
    >
      {/* Central Hero Empty State Card (Figma Node 1:14469) */}
      <div className="relative w-full max-w-[928px] bg-white border border-[#E5E8E2] rounded-[20px] shadow-[0px_4px_24px_0px_rgba(48,58,44,0.04)] overflow-hidden p-6 sm:p-10 lg:p-12">
        {/* Subtle Ambient Background Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-[96px] -left-[96px] size-[384px] rounded-full bg-[rgba(234,241,232,0.6)] blur-[32px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-[96px] -right-[96px] size-[384px] rounded-full bg-[rgba(245,241,232,0.7)] blur-[32px] pointer-events-none"
        />

        {/* Central Decorative Icon Container (Figma Node 1:14474) */}
        <div className="relative flex justify-center mb-6">
          <div className="relative size-[96px] rounded-[16px] border border-[#D9E3D5] p-px flex items-center justify-center shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] bg-gradient-to-br from-[#EAF1E8] to-[#F5F1E8]">
            <div className="size-9 rounded-full bg-[#34422A] flex items-center justify-center shadow-xs">
              <Check className="size-5 text-white stroke-[2.8]" />
            </div>
          </div>
        </div>

        {/* Main Title & Narrative (Figma Node 1:14479) */}
        <div className="relative flex flex-col items-center text-center max-w-[576px] mx-auto mb-6">
          <h1 className="text-[24px] font-bold text-[#232B20] leading-[32px] tracking-tight">
            تمت إضافة الوحدة بنجاح
          </h1>
          <p className="text-[15px] font-normal text-[#5F6C5B] leading-[24.38px] text-center max-w-[531px] mt-2">
            تم تسجيل الوحدة السكنية وربطها بالأصل العقاري والمالك وتفعيل سياسة الدخول الذكي تلقائيًا.
          </p>
        </div>

        {/* Structured Summary Ledger Card (Figma Node 1:14485) */}
        <div className="relative w-full max-w-[856px] mx-auto bg-[#F1F5EB] rounded-[12px] p-4 space-y-2">
          {/* Row 1: Unit Identity & Category */}
          <div className="bg-white rounded-[8px] p-2 px-4 flex items-center justify-between min-h-[44px]">
            {/* Visual Right (RTL Start) */}
            <div className="flex items-center gap-2">
              <DoorClosed className="size-[14px] text-[#75786F]" strokeWidth={1.8} />
              <span className="text-[12px] font-semibold text-[#75786F] leading-[18px]">
                الوحدة
              </span>
            </div>
            {/* Visual Left (RTL End) */}
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-bold text-[#181D17] leading-[28px] font-mono">
                {unitNumber}
              </span>
              <span className="bg-[#E5EAE0] text-[#181D17] text-[11px] font-medium px-2 py-0.5 rounded-[6px] leading-[16px]">
                {floorCategory}
              </span>
            </div>
          </div>

          {/* Row 2: Real Estate Asset */}
          <div className="bg-white rounded-[8px] p-2 px-4 flex items-center justify-between min-h-[52px]">
            <div className="flex items-center gap-2">
              <Building2 className="size-[15px] text-[#75786F]" strokeWidth={1.8} />
              <span className="text-[12px] font-semibold text-[#75786F] leading-[18px]">
                العقار المرتبط
              </span>
            </div>
            <div className="text-left flex flex-col items-end">
              <span className="text-[14px] font-semibold text-[#181D17] leading-[20px]">
                {property}
              </span>
              <span className="text-[11px] font-medium text-[#75786F] leading-[16px]">
                {locationCode}
              </span>
            </div>
          </div>

          {/* Row 3: Property Owner */}
          <div className="bg-white rounded-[8px] p-2 px-4 flex items-center justify-between min-h-[52px]">
            <div className="flex items-center gap-2">
              <UserRound className="size-[16px] text-[#75786F]" strokeWidth={1.8} />
              <span className="text-[12px] font-semibold text-[#75786F] leading-[18px]">
                المالك المعتمد
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-left flex flex-col items-end">
                <span className="text-[14px] font-semibold text-[#181D17] leading-[20px]">
                  {owner}
                </span>
                <span className="text-[11px] font-medium text-[#75786F] leading-[16px]">
                  {ownerCode}
                </span>
              </div>
              <span className="bg-[rgba(216,232,203,0.6)] text-[#5A6952] text-[11px] font-normal px-1.5 py-0.5 rounded-[4px] flex items-center gap-1 leading-[22px]">
                <Check className="size-3 text-[#5A6952] stroke-[2.5]" />
                <span>موثق</span>
              </span>
            </div>
          </div>

          {/* Row 4: Availability Status */}
          <div className="bg-white rounded-[8px] p-2 px-4 flex items-center justify-between min-h-[42px]">
            <div className="flex items-center gap-2">
              <Info className="size-[15px] text-[#75786F]" strokeWidth={1.8} />
              <span className="text-[12px] font-semibold text-[#75786F] leading-[18px]">
                حالة الوحدة
              </span>
            </div>
            <div className="bg-[#D8E8CB] text-[#5A6952] text-[12px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 leading-[18px]">
              <span className="size-2 rounded-full bg-[#34422A]" />
              <span>متاحة للإيجار</span>
            </div>
          </div>

          {/* Row 5: Smart Access Protocol */}
          <div className="bg-white rounded-[8px] px-4 py-2.5 flex items-center justify-between min-h-[40px]">
            <div className="flex items-center gap-2">
              <RotateCcw className="size-[15px] text-[#75786F]" strokeWidth={1.8} />
              <span className="text-[12px] font-semibold text-[#75786F] leading-[18px]">
                بروتوكول الدخول
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-normal text-[#181D17] leading-[20px]">
                مزامنة مشفرة سحابية مؤتمتة
              </span>
              <Lock className="size-3.5 text-[#181D17]" strokeWidth={1.8} />
            </div>
          </div>

          {/* Row 6: Addition Audit Info */}
          <div className="bg-white rounded-[8px] p-2 px-4 flex items-center justify-between min-h-[34px]">
            <div className="flex items-center gap-2">
              <Clock className="size-[15px] text-[#75786F]" strokeWidth={1.8} />
              <span className="text-[12px] font-semibold text-[#75786F] leading-[18px]">
                تاريخ الإضافة
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium leading-[16px]">
              <span className="text-[#454840]">{additionDate}</span>
              <span className="text-[#75786F]">(المشرف: {supervisor})</span>
            </div>
          </div>
        </div>

        {/* Contextual Action Buttons (Figma Node 1:14552) */}
        <div className="relative flex items-center justify-center gap-2 flex-wrap pt-6">
          <Link
            href="/dashboard/units/1"
            className="h-11 min-w-[170px] px-4 rounded-[12px] bg-[#34422A] hover:bg-[#2C3825] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          >
            <span>عرض تفاصيل الوحدة</span>
            <ArrowLeft className="size-3 text-white" />
          </Link>

          <button
            type="button"
            onClick={onAddAnother}
            className="h-11 min-w-[160px] px-4 rounded-[12px] bg-[#EBEFE6] hover:bg-[#DEE5D7] text-[#181D17] text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>إضافة وحدة أخرى</span>
            <PlusCircle className="size-[15px] text-[#181D17]" />
          </button>

          <button
            type="button"
            onClick={onBackToList}
            className="h-11 min-w-[130px] px-4 rounded-[12px] text-[#454840] hover:bg-[#F1F5EB] text-[14px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            <span>قائمة الوحدات</span>
          </button>
        </div>

        {/* Audit Log & Security Footnote (Figma Node 1:14567) */}
        <div className="relative mt-4 flex justify-center">
          <div className="bg-[rgba(241,245,235,0.6)] rounded-[8px] px-4 py-2 flex items-center justify-center gap-2 max-w-[588px] text-center">
            <ShieldCheck className="size-3.5 text-[#75786F]" strokeWidth={1.8} />
            <span className="text-[11px] font-medium text-[#75786F] leading-[16px]">
              تم تدوين هذا الإجراء تلقائياً في سجل تدقيق العقار العام (Audit Log #{auditLogCode})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
