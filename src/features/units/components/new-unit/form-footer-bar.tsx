"use client";

import { CheckCircle2 } from "lucide-react";

interface FormFooterBarProps {
  onSaveDraft: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function FormFooterBar({
  onSaveDraft,
  onCancel,
  onSave,
}: FormFooterBarProps) {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Readiness status */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3F8A3F]" />
            <span className="text-[12px] font-bold text-[#181D17]">
              جاهزية حفظ وتثبيت الوحدة
            </span>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-1">
            سيتم ربط الوحدة فورًا بملف «عمارة النخيل».
          </p>
        </div>

        {/* Actions: إلغاء (right) ← حفظ كمسودة ← حفظ الوحدة (left) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-5 rounded-[8px] bg-[#F1F5EB] text-[#3F4A36] text-[12.5px] font-semibold transition-colors cursor-pointer hover:bg-[#E8EEDD]"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="h-10 px-5 rounded-[8px] bg-[#D8E8CB] text-[#2F3A28] text-[12.5px] font-bold transition-colors cursor-pointer hover:bg-[#CFE2BE]"
          >
            حفظ كمسودة
          </button>
          <button
            type="button"
            onClick={onSave}
            className="h-10 ps-4 pe-3.5 rounded-[8px] bg-[#34422A] text-white text-[12.5px] font-bold flex items-center gap-2 transition-colors cursor-pointer hover:bg-[#2B3722]"
          >
            <span>حفظ الوحدة</span>
            <CheckCircle2 className="w-[15px] h-[15px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
