"use client";

import { toast } from "sonner";
import { Clock, CheckCircle2, Info } from "lucide-react";

/**
 * Displays a toast notification styled with the website's brand colors
 * indicating that a tab, button, or feature is currently under construction.
 */
export function showUnderConstructionToast(
  title: string = "هذا القسم",
  description: string = "يجري العمل على إتاحة هذا التبويب بجميع بياناته وتفاصيله قريباً ضمن التحديث القادم لمنظومة أبراج."
) {
  toast(
    <div className="flex items-start gap-3 w-full text-start select-none pe-2" dir="rtl">
      <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs border border-[#CCD5C5]/40">
        <Clock className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-xs sm:text-sm font-bold text-[#172115] leading-tight">
          {title} قيد الإنشاء والتطوير
        </div>
        <div className="text-[11px] text-[#7D8A78] leading-relaxed">
          {description}
        </div>
      </div>
    </div>,
    {
      duration: 4000,
      className: "border-[#E2E6DC] shadow-xl rounded-2xl p-4 bg-white select-none cursor-grab active:cursor-grabbing",
    }
  );
}

export function showSuccessToast(title: string, description?: string) {
  toast(
    <div className="flex items-start gap-3 w-full text-start select-none pe-2" dir="rtl">
      <div className="w-9 h-9 rounded-xl bg-[#E2F0D9] text-[#2E7D32] flex items-center justify-center shrink-0 shadow-2xs border border-[#2E7D32]/20">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-xs sm:text-sm font-bold text-[#172115] leading-tight">
          {title}
        </div>
        {description && (
          <div className="text-[11px] text-[#7D8A78] leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>,
    {
      duration: 3500,
      className: "border-[#E2E6DC] shadow-xl rounded-2xl p-4 bg-white select-none cursor-grab active:cursor-grabbing",
    }
  );
}

export function showInfoToast(title: string, description?: string) {
  toast(
    <div className="flex items-start gap-3 w-full text-start select-none pe-2" dir="rtl">
      <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs border border-[#CCD5C5]/40">
        <Info className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-xs sm:text-sm font-bold text-[#172115] leading-tight">
          {title}
        </div>
        {description && (
          <div className="text-[11px] text-[#7D8A78] leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>,
    {
      duration: 3500,
      className: "border-[#E2E6DC] shadow-xl rounded-2xl p-4 bg-white select-none cursor-grab active:cursor-grabbing",
    }
  );
}
