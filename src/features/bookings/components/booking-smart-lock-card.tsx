"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff, Lock, Sliders, Info, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { BookingDetail } from "../types";

interface BookingSmartLockCardProps {
  smartLock: BookingDetail["smartLock"];
  isCancelled?: boolean;
}

export function BookingSmartLockCard({
  smartLock,
  isCancelled = false,
}: BookingSmartLockCardProps) {
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            isCancelled
              ? "bg-[#FEF5F5] border-[#FADCDD] text-[#D9383A]"
              : "bg-[#EFF4EA] border-[#DEE7D7] text-[#34432E]"
          }`}>
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#172115]">
            كود الدخول الذكي
          </h2>
        </div>

        {isCancelled ? (
          <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E8] text-[#D9383A] text-xs font-bold border border-[#FADCDD]">
            غير مفعل
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full bg-[#E3EFE1] text-[#2E7D32] text-xs font-bold border border-[#C6DEC2]">
            مفعل
          </span>
        )}
      </div>

      {isCancelled ? (
        <>
          {/* Cancelled Code Display Box */}
          <div className="bg-[#FEF5F5] border border-[#FADCDD] rounded-2xl p-4 sm:p-5 text-center space-y-3">
            <div className="text-xs text-[#D9383A] font-bold">
              رمز القفل الرقمي المسحوب
            </div>

            {/* White Container with 6 Masked Squares */}
            <div className="bg-white rounded-xl py-3 px-6 shadow-3xs flex items-center justify-center gap-3 border border-[#FADCDD]/50 max-w-[240px] mx-auto">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6F7E6B]/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6F7E6B]/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6F7E6B]/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6F7E6B]/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6F7E6B]/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6F7E6B]/70" />
            </div>

            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#FCE8E8] text-[#D9383A] text-xs font-bold border border-[#FADCDD]">
              تم إلغاء التفعيل: 16 سبتمبر ▪ 02:45 م
            </div>
          </div>

          {/* Revocation Warning Box */}
          <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#6F7E6B] leading-relaxed">
            <Info className="w-4 h-4 text-[#D9383A] shrink-0 mt-0.5" />
            <span>
              تم سحب صلاحية الفتح الإلكتروني من بوابة القفل الذكي (TTLock API) فور تأكيد الإلغاء، ولم يعد بالإمكان استخدام الرمز للدخول نهائياً.
            </span>
          </div>
        </>
      ) : (
        <>
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
            className="w-full bg-[#3D4C35] hover:bg-[#34422E] text-white py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-[0.99]"
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
        </>
      )}
    </div>
  );
}
