"use client";

import Link from "next/link";
import {
  Settings,
  User,
  Zap,
  Clock,
  Trash2,
  ChevronLeft,
  SquarePen,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface PropertyAdminActionsProps {
  ownerId?: string;
  ownerName?: string;
  propertyId?: string;
}

export function PropertyAdminActions({
  ownerId = "1",
  ownerName = "محمد العتيبي",
  propertyId = "1",
}: PropertyAdminActionsProps) {
  const confirm = useConfirm();
  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4" dir="rtl">
      {/* 1. Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div className="text-right">
          <h3 className="text-lg sm:text-xl font-black text-[#172115]">
            إجراءات المشرف (Admin Actions)
          </h3>
          <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
            أدوات التحكم الإداري ومراجعة الصلاحيات
          </p>
        </div>
      </div>

      {/* 2. Action Rows */}
      <div className="space-y-3">
        {/* Action 1: عرض بيانات المالك */}
        <Link
          href={`/dashboard/owners/${ownerId}`}
          className="w-full bg-[#F5F7F1] hover:bg-[#EAEFE3] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] shrink-0 shadow-2xs">
              <User className="w-4 h-4 text-[#172115]" />
            </div>
            <div className="min-w-0 text-right">
              <div className="font-black text-xs sm:text-sm text-[#172115]">
                عرض بيانات المالك
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5 font-medium">
                ملف {ownerName} والاشتراكات
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </Link>

        {/* Action 2: تعديل بيانات العقار (with صلاحية كاملة badge, no chevron) */}
        <button
          type="button"
          onClick={() => toast.info("فتح شاشة تعديل بيانات العقار ومرافقه")}
          className="w-full bg-[#F5F7F1] hover:bg-[#EAEFE3] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors group cursor-pointer text-right"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] shrink-0 shadow-2xs">
              <SquarePen className="w-4 h-4 text-[#172115]" />
            </div>
            <div className="min-w-0 text-right">
              <div className="font-black text-xs sm:text-sm text-[#172115]">
                تعديل بيانات العقار
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5 font-medium leading-tight">
                تحديث العنوان، المرافق، والترخيص
              </div>
            </div>
          </div>
          <span className="bg-[#E2EBD8] text-[#2E4025] text-[11px] font-bold px-2.5 py-1 rounded-md shrink-0 select-none">
            صلاحية كاملة
          </span>
        </button>

        {/* Action 3: مراجعة التكاملات */}
        <button
          type="button"
          onClick={() => toast.info("فحص حالة تكامل الأقفال وبوابات OTA")}
          className="w-full bg-[#F5F7F1] hover:bg-[#EAEFE3] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors group cursor-pointer text-right"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] shrink-0 shadow-2xs">
              <Zap className="w-4 h-4 text-[#172115]" />
            </div>
            <div className="min-w-0 text-right">
              <div className="font-black text-xs sm:text-sm text-[#172115]">
                مراجعة التكاملات
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5 font-medium">
                مزامنة الأقفال وقنوات الـ OTA
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </button>

        {/* Action 4: عرض سجل النشاط والتدقيق */}
        <Link
          href={`/dashboard/properties/${propertyId}/activity`}
          className="w-full bg-[#F5F7F1] hover:bg-[#EAEFE3] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors group cursor-pointer text-right"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] shrink-0 shadow-2xs">
              <Clock className="w-4 h-4 text-[#172115]" />
            </div>
            <div className="min-w-0 text-right">
              <div className="font-black text-xs sm:text-sm text-[#172115]">
                عرض سجل النشاط والتدقيق
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5 font-medium">
                سجلات الدخول وتغييرات الأسعار
              </div>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-[#7D8A78] group-hover:text-[#172115] transition-colors shrink-0" />
        </Link>
      </div>

      {/* 3. Divider & Archive Danger Button */}
      <div className="pt-2 border-t border-[#E8EDE2]">
        <button
          type="button"
          onClick={async () => {
            const ok = await confirm({
              title: "أرشفة العقار من المنظومة العامة",
              message: `هل أنت متأكد من رغبتك في أرشفة هذا العقار؟ سيتم إخفاء جميع الوحدات التابعة له وتجميد قنوات الحجز المرتبطة.`,
              confirmLabel: "نعم، أرشفة العقار",
              cancelLabel: "إلغاء",
              variant: "destructive",
            });
            if (ok) {
              toast.error("تمت أرشفة العقار من المنظومة العامة بنجاح.");
            }
          }}
          className="w-full bg-white hover:bg-[#FEF2F2] border border-[#FCA5A5] text-[#D32F2F] font-black text-xs sm:text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
        >
          <span>أرشفة العقار من المنظومة العامة</span>
          <Trash2 className="w-4 h-4 text-[#D32F2F]" />
        </button>
      </div>
    </div>
  );
}
