import { Home, CheckCircle2, KeyRound, ArrowUpRight } from "lucide-react";

export function OwnersKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. إجمالي أصحاب العقارات */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#7D8A78] font-medium">
            إجمالي أصحاب العقارات
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center">
            <Home className="w-4 h-4" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-[#172115] tracking-tight">
            248
          </span>
          <span className="bg-[#E2F0D9] text-[#2E7D32] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            <span>+5.2%</span>
          </span>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-[11px] text-[#7D8A78]">
          12 تسجيل جديد هذا الشهر
        </div>
      </div>

      {/* 2. الحسابات النشطة */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#7D8A78] font-medium">
            الحسابات النشطة
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-[#172115] tracking-tight">
            386
          </span>
          <span className="bg-[#E2F0D9] text-[#2E7D32] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            86.3% نشط
          </span>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-[11px] text-[#7D8A78]">
          العقارات النشطة على المنصة
        </div>
      </div>

      {/* 3. بانتظار المراجعة */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#7D8A78] font-medium">
            بانتظار المراجعة
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-[#172115] tracking-tight">
            12
          </span>
          <span className="bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            يتطلب اعتماد
          </span>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-[11px] text-[#7D8A78]">
          متوسط سرعة الاعتماد: 24 ساعة
        </div>
      </div>

      {/* 4. التسجيلات الجديدة */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#7D8A78] font-medium">
            التسجيلات الجديدة
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-[#172115] tracking-tight">
            22
          </span>
          <span className="bg-[#E2F0D9] text-[#2E7D32] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            <span>+14%</span>
          </span>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-[11px] text-[#7D8A78]">
          تم انضمامهم خلال هذا الشهر الحالي
        </div>
      </div>
    </div>
  );
}
