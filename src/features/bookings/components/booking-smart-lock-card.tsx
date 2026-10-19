"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff, Lock, Sliders, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { BookingDetail } from "../types";

interface BookingSmartLockCardProps {
  smartLock: BookingDetail["smartLock"];
}

export function BookingSmartLockCard({ smartLock }: BookingSmartLockCardProps) {
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => {
    setShowCode((prev) => !prev);
    if (!showCode) {
      toast.info("تم إظهار كود الدخول الذكي للوحدة");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0 mt-0.5">
          <KeyRound className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-base sm:text-lg font-bold text-[#172115]">
            كود الدخول الذكي
          </h2>
          <p className="text-xs text-[#7D8A78] font-medium">
            القفل الإلكتروني المتصل لباب الوحدة رقم {smartLock.unitNumber}
          </p>
        </div>
      </div>

      {/* Code Display Box */}
      <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 text-[#172115]">
          <button
            type="button"
            onClick={toggleShowCode}
            className="text-[#7D8A78] hover:text-[#172115] transition-colors p-1"
            title={showCode ? "إخفاء الكود" : "إظهار الكود"}
            aria-label={showCode ? "إخفاء الكود" : "إظهار الكود"}
          >
            {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-[#172115] select-all">
            {showCode ? smartLock.pinCode : smartLock.maskedCode}
          </span>

          <Lock className="w-4 h-4 text-[#3D4C35]" />
        </div>

        <p className="text-xs text-[#616E5D] font-medium">
          {smartLock.scheduleText}
        </p>
      </div>

      {/* Reveal Button */}
      <button
        type="button"
        onClick={toggleShowCode}
        className="w-full bg-[#3D4C35] hover:bg-[#34432E] text-white py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-[0.99]"
      >
        <KeyRound className="w-4 h-4" />
        <span>{showCode ? "إخفاء كود الدخول" : "عرض كود الدخول"}</span>
      </button>

      {/* Footer Link */}
      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={() => toast.info("فتح إعدادات وتزامن القفل الإلكتروني الذكي")}
          className="text-xs text-[#616E5D] hover:text-[#172115] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <Sliders className="w-3.5 h-3.5 text-[#7D8A78]" />
          <span>إدارة وضبط إعدادات القفل الذكي</span>
        </button>
      </div>
    </div>
  );
}
