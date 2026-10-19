"use client";

import {
  ShieldCheck,
  FileEdit,
  ToggleRight,
  Mail,
  Download,
  CirclePause,
  ChevronLeft,
} from "lucide-react";
import { showUnderConstructionToast } from "@/lib/toast";

export function OwnerQuickActions() {
  const actions = [
    {
      id: "edit",
      label: "تعديل بيانات المالك",
      icon: FileEdit,
    },
    {
      id: "toggle_status",
      label: "تغيير حالة الحساب (نشط / معلق)",
      icon: ToggleRight,
    },
    {
      id: "message",
      label: "إرسال رسالة أو إشعار مباشر",
      icon: Mail,
    },
    {
      id: "download_pdf",
      label: "تنزيل تقرير شامل (PDF)",
      icon: Download,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#172115]">
            إجراءات إدارية سريعة
          </h2>
          <p className="text-xs text-[#7D8A78] mt-0.5">
            التحكم في حساب المالك
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-[#D4E2C7] text-[#2B3925] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-[#2B3925]" />
        </div>
      </div>

      {/* Buttons List */}
      <div className="space-y-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => showUnderConstructionToast(`إجراء "${act.label}"`)}
              className="w-full bg-[#F1F5EB] hover:bg-[#E7ECE0] text-[#172115] rounded-xl p-3.5 px-4 flex items-center justify-between text-xs font-bold transition-all cursor-pointer group"
            >
              {/* Right in RTL: Icon + Label */}
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-[#34432E] group-hover:text-[#172115] transition-colors" />
                <span>{act.label}</span>
              </div>
              {/* Left in RTL: Chevron < */}
              <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Danger Link */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={() => showUnderConstructionToast("إجراء تعليق الحساب")}
          className="text-xs font-bold text-[#DC2626] hover:text-[#B91C1C] inline-flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span>تعليق حساب المالك مؤقتاً</span>
          <CirclePause className="w-4 h-4 text-[#DC2626]" />
        </button>
      </div>
    </div>
  );
}
