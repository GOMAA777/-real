"use client";

import { useState } from "react";

interface UnitSmartLockCardProps {
  unitNumber?: string;
  onOpenAccessCodeModal?: () => void;
  onOpenShowCode?: () => void;
  lockProtocol?: string;
  validityText?: string;
}

export function UnitSmartLockCard({
  unitNumber = "204",
  onOpenAccessCodeModal,
  onOpenShowCode,
  lockProtocol = "TTLock Cloud Gateway v4.2",
  validityText = "صلاحية الكود: ساري حتى 21 سبتمبر 2026 — 12:00 م (انتهاء الإقامة تلقائياً)",
}: UnitSmartLockCardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleShowCodeClick = () => {
    if (onOpenShowCode) {
      onOpenShowCode();
    } else {
      setRevealed(!revealed);
    }
  };

  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-4"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5EB]/60">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
          <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            نظام وكود الدخول الذكي
          </h2>
        </div>

        <div className="bg-[#EAF1E8] rounded-full px-2.5 py-0.5 flex items-center gap-1 shrink-0">
          <span className="font-semibold text-[#3E8A5A] text-[11px] leading-[16px]">
            بوابة IoT متزامنة
          </span>
          <img
            src="/icons/units/iot-gateway.svg"
            alt=""
            className="w-[9.3px] h-[12.25px] shrink-0"
          />
        </div>
      </div>

      {/* Inner Box with Code & Protocol */}
      <div className="bg-[#F1F5EB] rounded-[12px] p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 text-right">
        {/* Right Info: Guest Access Passcode & Validity */}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            كود الدخول المخصص للنزيل الحالي
          </span>

          <div className="flex items-center gap-3">
            <span className="font-bold text-[#181D17] text-[24px] tracking-[2.4px] leading-[34px] select-all">
              {revealed ? "129 385" : "• • • • • •"}
            </span>

            <button
              type="button"
              onClick={handleShowCodeClick}
              className="bg-white rounded-[8px] px-3 py-1 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 text-[#34422A] text-[11px] font-bold cursor-pointer hover:bg-[#F9FAF7] transition-colors select-none"
            >
              <span>{revealed ? "إخفاء الكود" : "عرض كود الدخول"}</span>
              <img
                src="/icons/units/eye-code.svg"
                alt=""
                className="w-[14.7px] h-[10px] shrink-0"
              />
            </button>
          </div>

          <span className="font-medium text-[#75786F] text-[11px] leading-[16px] pt-1">
            {validityText}
          </span>
        </div>

        {/* Vertical Divider in Desktop */}
        <div className="hidden md:block w-px self-stretch bg-[#C5C8BD]/40" />

        {/* Left Info: Lock Protocol & Encryption */}
        <div className="flex flex-col gap-1 text-right md:text-start">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            بروتوكول القفل والشركة المشغلة
          </span>
          <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
            {lockProtocol}
          </span>
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            توليد شفرات PIN مشفرة تلقائياً
          </span>
        </div>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
        {/* Right Info: Auto-invalidation notice */}
        <div className="flex items-center gap-2">
          <img
            src="/icons/units/shield-check.svg"
            alt=""
            className="w-[12px] h-[15px] shrink-0"
          />
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            يتم إبطال الكود تلقائياً وتجديده بعد مغادرة النزيل واعتماد النظافة
          </span>
        </div>

        {/* Left Action Button */}
        <button
          type="button"
          onClick={onOpenAccessCodeModal}
          className="bg-[#E5EAE0] hover:bg-[#D8E0D2] rounded-[12px] px-4 py-2 font-semibold text-[#181D17] text-[12px] leading-[18px] transition-colors cursor-pointer select-none"
        >
          إدارة كود الدخول وسياسة الأمان
        </button>
      </div>
    </div>
  );
}
