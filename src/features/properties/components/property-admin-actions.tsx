"use client";

import Link from "next/link";
import {
  Settings,
  User,
  FileEdit,
  Sparkles,
  History,
  Archive,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";

interface PropertyAdminActionsProps {
  ownerId?: string;
  ownerName?: string;
}

export function PropertyAdminActions({
  ownerId = "1",
  ownerName = "محمد العتيبي",
}: PropertyAdminActionsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
      {/* 1. Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#172115]">
            إجراءات المشرف (Admin Actions)
          </h3>
          <p className="text-xs text-[#7D8A78] mt-0.5">
            أدوات التحكم الإداري ومراجعة الصلاحيات
          </p>
        </div>
      </div>

      {/* 2. Action Rows List */}
      <div className="space-y-2.5">
        {/* Action 1: عرض بيانات المالك (links to owner profile) */}
        <Link
          href={`/dashboard/owners/${ownerId}`}
          className="w-full bg-[#F6F8F4]/70 hover:bg-[#EEF2E6]/60 rounded-2xl p-3.5 border border-[#EEF2E6] flex items-center justify-between gap-3 text-start transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#2C3825] shrink-0 group-hover:border-[#CCD5C5] transition-colors">
              <User className="w-4 h-4 text-[#2C3825]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-[#172115]">
                عرض بيانات المالك
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5">
                ملف {ownerName} والاشتراكات
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </Link>

        {/* Action 2: تعديل بيانات العقار */}
        <button
          type="button"
          onClick={() => toast.info("فتح شاشة تعديل بيانات العقار ومرافقه")}
          className="w-full bg-[#F6F8F4]/70 hover:bg-[#EEF2E6]/60 rounded-2xl p-3.5 border border-[#EEF2E6] flex items-center justify-between gap-3 text-start transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#2C3825] shrink-0 group-hover:border-[#CCD5C5] transition-colors">
              <FileEdit className="w-4 h-4 text-[#2C3825]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-[#172115]">
                  تعديل بيانات العقار
                </span>
                <span className="bg-[#EEF2E6] text-[#2C3825] border border-[#CCD5C5] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  صلاحية كاملة
                </span>
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5">
                تحديث العنوان، المرافق، والترخيص
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </button>

        {/* Action 3: مراجعة التكاملات */}
        <button
          type="button"
          onClick={() => toast.info("فحص حالة تكامل الأقفال وبوابات OTA")}
          className="w-full bg-[#F6F8F4]/70 hover:bg-[#EEF2E6]/60 rounded-2xl p-3.5 border border-[#EEF2E6] flex items-center justify-between gap-3 text-start transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#2C3825] shrink-0 group-hover:border-[#CCD5C5] transition-colors">
              <Sparkles className="w-4 h-4 text-[#2C3825]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-[#172115]">
                مراجعة التكاملات
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5">
                مزامنة الأقفال وقنوات الـ OTA
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </button>

        {/* Action 4: عرض سجل النشاط والتدقيق */}
        <button
          type="button"
          onClick={() => toast.info("عرض سجل الأنشطة والتدقيق الأمني")}
          className="w-full bg-[#F6F8F4]/70 hover:bg-[#EEF2E6]/60 rounded-2xl p-3.5 border border-[#EEF2E6] flex items-center justify-between gap-3 text-start transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#2C3825] shrink-0 group-hover:border-[#CCD5C5] transition-colors">
              <History className="w-4 h-4 text-[#2C3825]" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-[#172115]">
                عرض سجل النشاط والتدقيق
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5">
                سجلات الدخول وتغييرات الأسعار
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </button>
      </div>

      {/* 3. Archive Danger Button */}
      <button
        type="button"
        onClick={() => toast.error("تنبيه: أرشفة العقار تتطلب تأكيد المشرف العام")}
        className="w-full bg-white hover:bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626] font-bold text-xs py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
      >
        <Archive className="w-4 h-4 text-[#DC2626]" />
        <span>أرشفة العقار من المنظومة العامة</span>
      </button>
    </div>
  );
}
