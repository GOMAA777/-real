import { ArrowUp } from "lucide-react";

/**
 * Custom SVG Icons perfectly matched to the user's design reference:
 * - Card 1: Hand supporting a house
 * - Card 2: Dial / circle activity check
 * - Card 3 & 4: Horizontal key
 */
function HandHouseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4L4.5 9.5V14h3v-3h9v3h3V9.5L12 4z" />
      <path d="M3 16h4.5l2.5 1.5h6l3-1.5H21v2l-4 3.5h-8l-3-2H3v-3z" />
    </svg>
  );
}

function CircleActivityCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12.5l2 2 4-4" />
    </svg>
  );
}

function KeyHorizontalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="7" cy="12" r="4.5" />
      <circle cx="7" cy="12" r="1.5" />
      <path d="M11.5 12h9.5" />
      <path d="M16 12v3" />
      <path d="M19 12v2" />
    </svg>
  );
}

export function OwnersKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. إجمالي أصحاب العقارات */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-[13px] text-[#7D8A78] font-medium">
            إجمالي أصحاب العقارات
          </span>
          <div className="w-11 h-11 rounded-2xl bg-[#EAEFE4] flex items-center justify-center shrink-0">
            <HandHouseIcon className="w-5 h-5 text-[#34432E]" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-2.5">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#172115] tracking-tight">
            248
          </span>
          <span className="bg-[#D8E8CB] text-[#2E5E28] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 select-none">
            <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            <span>+5.2%</span>
          </span>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-xs text-[#7D8A78] leading-relaxed">
          12 تسجيل جديد هذا الشهر
        </div>
      </div>

      {/* 2. الحسابات النشطة */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-[13px] text-[#7D8A78] font-medium">
            الحسابات النشطة
          </span>
          <div className="w-11 h-11 rounded-2xl bg-[#EAEFE4] flex items-center justify-center shrink-0">
            <CircleActivityCheckIcon className="w-5 h-5 text-[#20794C]" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-2.5">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#172115] tracking-tight">
            386
          </span>
          <span className="bg-[#D8E8CB] text-[#34432E] text-[11px] font-bold px-2.5 py-0.5 rounded-full select-none">
            86.3% نشط
          </span>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-xs text-[#7D8A78] leading-relaxed">
          العقارات النشطة على المنصة
        </div>
      </div>

      {/* 3. بانتظار المراجعة */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-[13px] text-[#7D8A78] font-medium">
            بانتظار المراجعة
          </span>
          <div className="w-11 h-11 rounded-2xl bg-[#EAEFE4] flex items-center justify-center shrink-0">
            <KeyHorizontalIcon className="w-5 h-5 text-[#34432E]" />
          </div>
        </div>

        {/* Middle: Value & Badge (justified between in RTL: number right, badge left) */}
        <div className="flex items-center justify-between">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#172115] tracking-tight">
            12
          </span>
          <span className="bg-[#FEF3C7] text-[#926815] text-[11px] font-bold px-2.5 py-0.5 rounded-full select-none">
            يتطلب اعتماد
          </span>
        </div>

        {/* Bottom: Subtext (two lines matching screenshot) */}
        <div className="text-xs text-[#7D8A78] leading-relaxed">
          متوسط سرعة
          <br />
          الاعتماد: 24 ساعة
        </div>
      </div>

      {/* 4. التسجيلات الجديدة */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col justify-between shadow-2xs space-y-4">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-[13px] text-[#7D8A78] font-medium">
            التسجيلات الجديدة
          </span>
          <div className="w-11 h-11 rounded-2xl bg-[#EAEFE4] flex items-center justify-center shrink-0">
            <KeyHorizontalIcon className="w-5 h-5 text-[#34432E]" />
          </div>
        </div>

        {/* Middle: Value & Badge (justified between in RTL: number right, badge left) */}
        <div className="flex items-center justify-between">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#172115] tracking-tight">
            22
          </span>
          <span className="bg-[#ECFDF5] text-[#10956A] text-[11px] font-bold px-2.5 py-0.5 rounded-full select-none">
            +14%
          </span>
        </div>

        {/* Bottom: Subtext (two lines matching screenshot) */}
        <div className="text-xs text-[#7D8A78] leading-relaxed">
          تم انضمامهم خلال
          <br />
          هذا الشهر الحالي
        </div>
      </div>
    </div>
  );
}
