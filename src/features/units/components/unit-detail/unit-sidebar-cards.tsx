"use client";

import Link from "next/link";
import { toast } from "sonner";

interface UnitSidebarCardsProps {
  propertyName?: string;
  propertyType?: string;
  cityArea?: string;
  totalUnits?: string;
  connectionStatus?: string;
  propertyId?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerPropertiesCount?: string;
  ownerPayoutRate?: string;
  ownerId?: string;
  onOpenOperationsLog?: () => void;
}

export function UnitSidebarCards({
  propertyName = "عمارة النخيل",
  propertyType = "مجمع سكني فندقي فاخر",
  cityArea = "الرياض — حي العليا",
  totalUnits = "12 وحدة مخدومة",
  connectionStatus = "مكتمل التراخيص والمطابقة",
  propertyId = "1",
  ownerName = "محمد العتيبي",
  ownerPhone = "+966 50 123 4567",
  ownerPropertiesCount = "3 مجمعات عقارية",
  ownerPayoutRate = "مباشر إلى الحساب البنكي",
  ownerId = "1",
  onOpenOperationsLog,
}: UnitSidebarCardsProps) {
  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. Target Property Card (العقار التابع له) */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="bg-[#34422A] h-[16px] w-[6px] rounded-full shrink-0" />
          <h3 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            العقار التابع له
          </h3>
        </div>

        {/* Inner Details Container */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 space-y-3 text-right">
          {/* Header with Icon */}
          <div className="flex items-center gap-3">
            <div className="bg-[#4B5940] rounded-[12px] size-10 flex items-center justify-center shrink-0 shadow-2xs">
              <svg
                viewBox="0 0 16.5 16.5"
                fill="none"
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 16.5V3.66667H3.66667V0H12.8333V7.33333H16.5V16.5H9.16667V12.8333H7.33333V16.5H0V16.5M1.83333 14.6667H3.66667V12.8333H1.83333V14.6667V14.6667M1.83333 11H3.66667V9.16667H1.83333V11V11M1.83333 7.33333H3.66667V5.5H1.83333V7.33333V7.33333M5.5 11H7.33333V9.16667H5.5V11V11M5.5 7.33333H7.33333V5.5H5.5V7.33333V7.33333M5.5 3.66667H7.33333V1.83333H5.5V3.66667V3.66667M9.16667 11H11V9.16667H9.16667V11V11M9.16667 7.33333H11V5.5H9.16667V7.33333V7.33333M9.16667 3.66667H11V1.83333H9.16667V3.66667V3.66667M12.8333 14.6667H14.6667V12.8333H12.8333V14.6667V14.6667M12.8333 11H14.6667V9.16667H12.8333V11V11"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#181D17] text-[14px] leading-[20px]">
                {propertyName}
              </span>
              <span className="font-normal text-[#75786F] text-[13px] leading-[20px]">
                {propertyType}
              </span>
            </div>
          </div>

          {/* Key-Value Pairs */}
          <div className="pt-2 border-t border-[#E5EAE0] space-y-2">
            <div className="flex items-center justify-between text-[13px] leading-[20px]">
              <span className="font-normal text-[#75786F]">المدينة والحي:</span>
              <span className="font-semibold text-[#181D17]">{cityArea}</span>
            </div>

            <div className="flex items-center justify-between text-[13px] leading-[20px]">
              <span className="font-normal text-[#75786F]">إجمالي وحدات المبنى:</span>
              <span className="font-semibold text-[#181D17]">{totalUnits}</span>
            </div>

            <div className="flex items-center justify-between text-[13px] leading-[20px]">
              <span className="font-normal text-[#75786F]">حالة ربط المبنى:</span>
              <span className="font-semibold text-[#3E8A5A]">{connectionStatus}</span>
            </div>
          </div>
        </div>

        {/* Action Button: عرض سجل العقار بالكامل */}
        <Link
          href={`/dashboard/properties/${propertyId}`}
          className="bg-[#E5EAE0] hover:bg-[#D8E0D2] rounded-[12px] px-4 py-2.5 flex items-center justify-center gap-2 font-bold text-[#181D17] text-[12px] leading-[18px] w-full transition-colors cursor-pointer select-none"
        >
          <span>عرض سجل العقار بالكامل</span>
          <img
            src="/icons/units/external-link.svg"
            alt=""
            className="size-[13.5px] shrink-0"
          />
        </Link>
      </div>

      {/* 2. Property Owner Card (مالك العقار المعتمد) */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="bg-[#34422A] h-[16px] w-[6px] rounded-full shrink-0" />
          <h3 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            مالك العقار المعتمد
          </h3>
        </div>

        {/* Inner Details Container */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 space-y-3 text-right">
          {/* Header with Avatar & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[#54624C] rounded-full size-10 flex items-center justify-center text-white font-bold text-[12px] shrink-0">
              م
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#181D17] text-[14px] leading-[20px]">
                {ownerName}
              </span>
              <img
                src="/icons/units/verified-check.svg"
                alt=""
                className="w-[14.7px] h-[14px] shrink-0"
              />
            </div>
          </div>

          {/* Key-Value Pairs */}
          <div className="pt-2 border-t border-[#E5EAE0] space-y-2">
            <div className="flex items-center justify-between text-[13px] leading-[20px]">
              <span className="font-normal text-[#75786F]">رقم الهاتف المسجل:</span>
              <span className="font-bold text-[#181D17]" dir="ltr">
                {ownerPhone}
              </span>
            </div>

            <div className="flex items-center justify-between text-[13px] leading-[20px]">
              <span className="font-normal text-[#75786F]">العقارات المسجلة:</span>
              <span className="font-semibold text-[#181D17]">
                {ownerPropertiesCount}
              </span>
            </div>

            <div className="flex items-center justify-between text-[13px] leading-[20px]">
              <span className="font-normal text-[#75786F]">نسبة التحصيل الشهري:</span>
              <span className="font-semibold text-[#181D17]">
                {ownerPayoutRate}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: عرض ملف المالك المعتمد */}
        <Link
          href={`/dashboard/owners/${ownerId}`}
          className="bg-[#E5EAE0] hover:bg-[#D8E0D2] rounded-[12px] px-4 py-2.5 flex items-center justify-center gap-2 font-bold text-[#181D17] text-[12px] leading-[18px] w-full transition-colors cursor-pointer select-none"
        >
          <span>عرض ملف المالك المعتمد</span>
          <img
            src="/icons/units/owner-profile.svg"
            alt=""
            className="size-[15px] shrink-0"
          />
        </Link>
      </div>

      {/* 3. Operational State & Services (الحالة التشغيلية والخدمات) */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="bg-[#34422A] h-[16px] w-[6px] rounded-full shrink-0" />
          <h3 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            الحالة التشغيلية والخدمات
          </h3>
        </div>

        {/* 4 Operational Items List */}
        <div className="space-y-3 text-right">
          {/* Operational Item 1 */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/units/op-cleaning.svg"
                alt=""
                className="w-[15px] h-[18.3px] shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
                  آخر تنظيف وتعقيم
                </span>
                <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
                  17 سبتمبر 2026
                </span>
              </div>
            </div>
            <div className="bg-[#EAF1E8] rounded-[4px] px-2 py-0.5 font-bold text-[#3E8A5A] text-[11px] leading-[22px]">
              معتمد ونظيف
            </div>
          </div>

          {/* Operational Item 2 */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/units/op-maintenance.svg"
                alt=""
                className="w-[16.6px] h-[17.5px] shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
                  آخر بلاغ صيانة
                </span>
                <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
                  10 سبتمبر 2026
                </span>
              </div>
            </div>
            <div className="bg-[#E5EAE0] rounded-[4px] px-2 py-0.5 font-bold text-[#75786F] text-[11px] leading-[22px]">
              تم الإصلاح ومغلق
            </div>
          </div>

          {/* Operational Item 3 */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/units/op-battery.svg"
                alt=""
                className="w-[16.7px] h-[8.3px] shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
                  بطارية القفل الذكي
                </span>
                <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
                  88% (ممتازة)
                </span>
              </div>
            </div>
            <div className="bg-[#EAF1E8] rounded-[4px] px-2 py-0.5 font-bold text-[#3E8A5A] text-[11px] leading-[22px]">
              اتصال مستقر
            </div>
          </div>

          {/* Operational Item 4 */}
          <div className="bg-[#F1F5EB] rounded-[12px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/units/op-smoke.svg"
                alt=""
                className="w-[16.7px] h-[11.8px] shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
                  حساسات السلامة والحريق
                </span>
                <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
                  نشطة — كاشف دخان
                </span>
              </div>
            </div>
            <div className="bg-[#EAF1E8] rounded-[4px] px-2 py-0.5 font-bold text-[#3E8A5A] text-[11px] leading-[22px]">
              جاهزة
            </div>
          </div>
        </div>

        {/* Action Button: عرض سجل العمليات والتشغيل */}
        <button
          type="button"
          onClick={onOpenOperationsLog}
          className="bg-[#E5EAE0] hover:bg-[#D8E0D2] rounded-[12px] px-4 py-2.5 flex items-center justify-center gap-2 font-bold text-[#181D17] text-[12px] leading-[18px] w-full transition-colors cursor-pointer select-none"
        >
          <span>عرض سجل العمليات والتشغيل</span>
          <img
            src="/icons/units/op-history.svg"
            alt=""
            className="size-[13.5px] shrink-0"
          />
        </button>
      </div>
    </div>
  );
}
