"use client";

import { useRouter } from "next/navigation";
import { UserPlus, RotateCcw, Plus, CheckSquare } from "lucide-react";

interface OwnersEmptyStateProps {
  onRefresh?: () => void;
  onAddOwner?: () => void;
}

export function OwnersEmptyState({ onRefresh, onAddOwner }: OwnersEmptyStateProps) {
  const router = useRouter();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      router.push("/dashboard/owners");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E2E6DC] p-12 sm:p-20 text-center flex flex-col items-center justify-center space-y-6 shadow-2xs min-h-[460px]">
      {/* Central Illustration Icon */}
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#EEF2E6] border border-[#E2E6DC] flex items-center justify-center shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#34432E] flex items-center justify-center text-[#34432E] shadow-2xs">
            <CheckSquare className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Small Plus Badge on Top-Right Corner */}
        <div className="absolute -top-1.5 -end-1.5 w-6 h-6 rounded-full bg-[#34432E] text-white flex items-center justify-center shadow-xs ring-2 ring-white">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#172115] tracking-tight">
          لا يوجد أصحاب عقارات حتى الآن
        </h2>
        <p className="text-xs sm:text-sm text-[#7D8A78] leading-relaxed">
          ابدأ بإضافة أول مالك عقار أو أرسل له دعوة تفعيل رقمية للربط بمنظومة ابراج العقارية وإدارة الأصول بكفاءة.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {/* Primary Action Button: Add Owner */}
        <button
          type="button"
          onClick={onAddOwner}
          className="bg-[#34432E] hover:bg-[#2A3725] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-xs cursor-pointer select-none"
        >
          <UserPlus className="w-4 h-4" />
          <span>إضافة مالك عقار</span>
        </button>

        {/* Secondary Action Button: Refresh Page */}
        <button
          type="button"
          onClick={handleRefresh}
          className="bg-[#F6F8F4] hover:bg-[#EEF2E6] border border-[#E2E6DC] text-[#172115] text-xs sm:text-sm font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-2xs cursor-pointer select-none"
        >
          <RotateCcw className="w-4 h-4 text-[#7D8A78]" />
          <span>تحديث الصفحة</span>
        </button>
      </div>
    </div>
  );
}
