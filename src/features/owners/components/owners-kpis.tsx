import React from "react";

// Exact Figma SVG Vector: Trend Arrow Up (viewBox 0 0 9.33333 9.33333)
function TrendArrowIcon({ className = "w-2.5 h-2.5 shrink-0" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9.33333 9.33333"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.08333 9.33333V2.23125L0.816667 5.49792L0 4.66667L4.66667 0L9.33333 4.66667L8.51667 5.49792L5.25 2.23125V9.33333H4.08333V9.33333" />
    </svg>
  );
}

// Exact Figma SVG Vector: Owners Hand-House (viewBox 0 0 19.25 19.25)
function OwnersHandHouseIcon({ className = "w-5 h-5 text-[#4B5940]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 19.25 19.25"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.5 11.4583V5.5L11.9167 2.29167L7.33333 5.5V6.875H5.5V4.58333L11.9167 0L18.3333 4.58333V11.4583H16.5V11.4583M11.9167 2.29167V2.29167V2.29167V2.29167V2.29167V2.29167V2.29167V2.29167V2.29167V2.29167M12.375 5.95833H13.2917V5.04167H12.375V5.95833V5.95833M10.5417 5.95833H11.4583V5.04167H10.5417V5.95833V5.95833M12.375 7.79167H13.2917V6.875H12.375V7.79167V7.79167M10.5417 7.79167H11.4583V6.875H10.5417V7.79167V7.79167M5.5 15.5833L11.8708 17.325L17.325 15.6292C17.2486 15.4917 17.1378 15.3733 16.9927 15.274C16.8476 15.1747 16.6833 15.125 16.5 15.125H11.8708C11.4583 15.125 11.1299 15.1097 10.8854 15.0792C10.641 15.0486 10.3889 14.9875 10.1292 14.8958L7.99792 14.1854L8.50208 12.3979L10.3583 13.0167C10.6181 13.0931 10.9236 13.1542 11.275 13.2C11.6264 13.2458 12.1458 13.2764 12.8333 13.2917V13.2917V13.2917V13.2917C12.8333 13.1236 12.7837 12.9632 12.6844 12.8104C12.5851 12.6576 12.4667 12.5583 12.3292 12.5125L6.96667 10.5417V10.5417V10.5417H5.5V15.5833V15.5833M0 18.7917V8.70833H6.96667C7.07361 8.70833 7.18056 8.71979 7.2875 8.74271C7.39444 8.76562 7.49375 8.79236 7.58542 8.82292L12.9708 10.8167C13.475 11 13.8837 11.3208 14.1969 11.7792C14.5101 12.2375 14.6667 12.7417 14.6667 13.2917H16.5C17.2639 13.2917 17.9132 13.5437 18.4479 14.0479C18.9826 14.5521 19.25 15.2167 19.25 16.0417V16.9583L11.9167 19.25L5.5 17.4625V17.4625V18.7917H0V18.7917M1.83333 16.9583H3.66667V10.5417H1.83333V16.9583V16.9583" />
    </svg>
  );
}

// Exact Figma SVG Vector: Active Accounts Circle Check (viewBox 0 0 16 16)
function CircleActivityCheckIcon({ className = "w-4 h-4 text-[#047857]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8.5L7.5 10L10 6.5M14 8C14 11.3115 11.3115 14 8 14C4.68851 14 2 11.3115 2 8C2 4.68851 4.68851 2 8 2C11.3115 2 14 4.68851 14 8L6 8.5"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact Figma SVG Vector: Key Horizontal (viewBox 0 0 20.1667 11)
function KeyHorizontalIcon({ className = "w-5 h-3 text-[#4B5940]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20.1667 11"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 11C3.97222 11 2.67361 10.4653 1.60417 9.39583C0.534722 8.32639 0 7.02778 0 5.5C0 3.97222 0.534722 2.67361 1.60417 1.60417C2.67361 0.534722 3.97222 0 5.5 0C6.50833 0 7.43264 0.252083 8.27292 0.75625C9.11319 1.26042 9.77778 1.925 10.2667 2.75H20.1667V8.25H18.3333V11H12.8333V8.25H10.2667C9.77778 9.075 9.11319 9.73958 8.27292 10.2437C7.43264 10.7479 6.50833 11 5.5 11V11M5.5 9.16667C6.50833 9.16667 7.31806 8.85729 7.92917 8.23854C8.54028 7.61979 8.90694 7.0125 9.02917 6.41667H14.6667V9.16667H16.5V6.41667H18.3333V4.58333H9.02917C8.90694 3.9875 8.54028 3.38021 7.92917 2.76146C7.31806 2.14271 6.50833 1.83333 5.5 1.83333C4.49167 1.83333 3.62847 2.19236 2.91042 2.91042C2.19236 3.62847 1.83333 4.49167 1.83333 5.5C1.83333 6.50833 2.19236 7.37153 2.91042 8.08958C3.62847 8.80764 4.49167 9.16667 5.5 9.16667V9.16667M5.5 7.33333C6.00417 7.33333 6.43576 7.15382 6.79479 6.79479C7.15382 6.43576 7.33333 6.00417 7.33333 5.5C7.33333 4.99583 7.15382 4.56424 6.79479 4.20521C6.43576 3.84618 6.00417 3.66667 5.5 3.66667C4.99583 3.66667 4.56424 3.84618 4.20521 4.20521C3.84618 4.56424 3.66667 4.99583 3.66667 5.5C3.66667 6.00417 3.84618 6.43576 4.20521 6.79479C4.56424 7.15382 4.99583 7.33333 5.5 7.33333V7.33333M5.5 5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5V5.5" />
    </svg>
  );
}

export function OwnersKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 font-cairo">
      {/* 1. إجمالي أصحاب العقارات */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE2D7] shadow-2xs flex flex-col justify-between hover:border-[#4B5940]/40 transition-all min-h-[175px]">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-[13px] text-[#75786F] font-semibold select-none">
            إجمالي أصحاب العقارات
          </span>
          <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] flex items-center justify-center shrink-0 border border-[#DCE2D7]/40 shadow-2xs text-[#4B5940]">
            <OwnersHandHouseIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Middle: Value & Badge (dir="ltr" so arrow is on left: ↑ +5.2%) */}
        <div className="flex items-center gap-2.5 my-1">
          <span className="text-3xl sm:text-[34px] font-bold text-[#181D17] tracking-tight font-cairo">
            248
          </span>
          <div
            dir="ltr"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D8E8CB] text-[#3D4B36] text-[11px] font-bold select-none"
          >
            <TrendArrowIcon className="w-2.5 h-2.5 shrink-0" />
            <span>+   5.2%</span>
          </div>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-xs text-[#75786F] font-normal leading-relaxed">
          12 تسجيل جديد هذا الشهر
        </div>
      </div>

      {/* 2. الحسابات النشطة */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE2D7] shadow-2xs flex flex-col justify-between hover:border-[#4B5940]/40 transition-all min-h-[175px]">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-[13px] text-[#75786F] font-semibold select-none">
            الحسابات النشطة
          </span>
          <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] flex items-center justify-center shrink-0 border border-[#DCE2D7]/40 shadow-2xs text-[#047857]">
            <CircleActivityCheckIcon className="w-[18px] h-[18px]" />
          </div>
        </div>

        {/* Middle: Value & Badge */}
        <div className="flex items-center gap-2.5 my-1">
          <span className="text-3xl sm:text-[34px] font-bold text-[#181D17] tracking-tight font-cairo">
            386
          </span>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D8E8CB] text-[#3D4B36] text-[11px] font-bold select-none">
            <span>86.3% نشط</span>
          </div>
        </div>

        {/* Bottom: Subtext */}
        <div className="text-xs text-[#75786F] font-normal leading-relaxed">
          العقارات النشطة على المنصة
        </div>
      </div>

      {/* 3. بانتظار المراجعة */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE2D7] shadow-2xs flex flex-col justify-between hover:border-[#4B5940]/40 transition-all min-h-[175px]">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-[13px] text-[#75786F] font-semibold select-none">
            بانتظار المراجعة
          </span>
          <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] flex items-center justify-center shrink-0 border border-[#DCE2D7]/40 shadow-2xs text-[#4B5940]">
            <KeyHorizontalIcon className="w-5 h-3" />
          </div>
        </div>

        {/* Middle: Value on right & Badge on left (matching Figma & image layout) */}
        <div className="flex items-center justify-between my-1">
          <span className="text-3xl sm:text-[34px] font-bold text-[#181D17] tracking-tight font-cairo">
            12
          </span>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#9A6208] text-[11px] font-bold select-none">
            <span>يتطلب اعتماد</span>
          </div>
        </div>

        {/* Bottom: Subtext (two lines) */}
        <div className="text-xs text-[#75786F] font-normal leading-relaxed">
          متوسط سرعة
          <br />
          الاعتماد: 24 ساعة
        </div>
      </div>

      {/* 4. التسجيلات الجديدة */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE2D7] shadow-2xs flex flex-col justify-between hover:border-[#4B5940]/40 transition-all min-h-[175px]">
        {/* Top: Label & Icon */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-[13px] text-[#75786F] font-semibold select-none">
            التسجيلات الجديدة
          </span>
          <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] flex items-center justify-center shrink-0 border border-[#DCE2D7]/40 shadow-2xs text-[#4B5940]">
            <KeyHorizontalIcon className="w-5 h-3" />
          </div>
        </div>

        {/* Middle: Value on right & Badge on left (matching Figma & image layout) */}
        <div className="flex items-center justify-between my-1">
          <span className="text-3xl sm:text-[34px] font-bold text-[#181D17] tracking-tight font-cairo">
            22
          </span>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] text-[11px] font-bold select-none">
            <span>+14%</span>
          </div>
        </div>

        {/* Bottom: Subtext (two lines) */}
        <div className="text-xs text-[#75786F] font-normal leading-relaxed">
          تم انضمامهم خلال
          <br />
          هذا الشهر الحالي
        </div>
      </div>
    </div>
  );
}
