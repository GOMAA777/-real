"use client";

import { ShieldCheck, Edit3, ToggleLeft, Mail, Download, AlertCircle, ChevronLeft } from "lucide-react";

export function OwnerQuickActions() {
  const actions = [
    {
      id: "edit",
      label: "تعديل بيانات المالك",
      icon: Edit3,
    },
    {
      id: "toggle_status",
      label: "تغيير حالة الحساب (نشط / معلق)",
      icon: ToggleLeft,
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
          <h2 className="text-sm font-bold text-[#172115]">
            إجراءات إدارية سريعة
          </h2>
          <p className="text-[11px] text-[#7D8A78] mt-0.5">
            التحكم في حساب المالك
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-[#E2F0D9] text-[#2E7D32] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
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
              className="w-full bg-[#F4F6F0] hover:bg-[#EAEFE5] text-[#172115] rounded-xl p-3 sm:px-4 flex items-center justify-between text-xs font-semibold transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-[#556350] group-hover:text-[#172115] transition-colors" />
                <span>{act.label}</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Danger Link */}
      <div className="pt-2 text-center">
        <button
          type="button"
          className="text-xs font-bold text-[#DC2626] hover:text-[#B91C1C] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <AlertCircle className="w-4 h-4" />
          <span>تعليق حساب المالك مؤقتاً</span>
        </button>
      </div>
    </div>
  );
}
