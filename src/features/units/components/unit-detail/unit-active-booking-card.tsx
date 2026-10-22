"use client";

import Link from "next/link";
import { toast } from "sonner";

interface UnitActiveBookingCardProps {
  bookingId?: string;
  guestName?: string;
  guestPhone?: string;
  guestInitial?: string;
  stayDates?: string;
  stayRemaining?: string;
  totalAmount?: string;
  paymentStatus?: string;
  channelName?: string;
  bookingRef?: string;
}

export function UnitActiveBookingCard({
  bookingId = "BK-10482",
  guestName = "خالد العتيبي",
  guestPhone = "+966 54 887 2311",
  guestInitial = "خ",
  stayDates = "18 سبتمبر — 21 سبتمبر 2026",
  stayRemaining = "متبقي ليلتان (تسجيل الخروج: 12:00 م)",
  totalAmount = "750.00",
  paymentStatus = "مدفوع بالكامل عبر منصة شريكة",
  channelName = "قناة الحجز: بوابة Booking المزامنة",
  bookingRef = "معرف الحجز: BK-10482",
}: UnitActiveBookingCardProps) {
  return (
    <div
      className="bg-white rounded-[16px] p-5 sm:p-6 relative overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E2E6DC] space-y-4"
      dir="rtl"
    >
      {/* Top Accent Orange Bar */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#E99A38]" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5EB]/60">
        {/* Right Info: Icon + Title + Subtitle */}
        <div className="flex items-center gap-2.5">
          <img
            src="/icons/units/calendar-booking.svg"
            alt=""
            className="w-[22px] h-[15px] shrink-0"
          />
          <div className="flex flex-col text-right">
            <h3 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
              الحجز الحالي المسجل
            </h3>
            <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
              حجز إشغال مباشر تحت الإدارة
            </span>
          </div>
        </div>

        {/* Left Badge: نشط الآن */}
        <div className="bg-[#FFF4E5] rounded-full px-3 py-1 flex items-center gap-1.5 shrink-0">
          <span className="bg-[#E99A38] rounded-full size-1.5" />
          <span className="font-bold text-[#B87114] text-[12px] leading-[18px]">
            نشط الآن
          </span>
        </div>
      </div>

      {/* Inner Information Box: 3 Columns in RTL */}
      <div className="bg-[#F1F5EB] rounded-[12px] p-5 grid grid-cols-1 md:grid-cols-3 gap-5 items-start text-right">
        {/* Col 1: النزيل المستأجر */}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px] pb-1">
            النزيل المستأجر
          </span>
          <div className="flex items-center gap-2.5">
            <div className="bg-[#E5EAE0] rounded-full size-8 flex items-center justify-center font-bold text-[#34422A] text-[12px] shrink-0">
              {guestInitial}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#181D17] text-[14px] leading-[20px]">
                {guestName}
              </span>
              <span className="font-normal text-[#75786F] text-[11px] leading-[16px]" dir="ltr">
                {guestPhone}
              </span>
            </div>
          </div>
        </div>

        {/* Col 2: فترة الإقامة المقررة */}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px] pb-1">
            فترة الإقامة المقررة
          </span>
          <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
            {stayDates}
          </span>
          <span className="font-bold text-[#E99A38] text-[11px] leading-[16px]">
            {stayRemaining}
          </span>
        </div>

        {/* Col 3: الحساب المالي للحجز */}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px] pb-1">
            الحساب المالي للحجز
          </span>
          <div className="flex items-baseline gap-1 text-[#181D17]">
            <span className="font-bold text-[18px] leading-[28px]">{totalAmount}</span>
            <span className="font-normal text-[11px] leading-[16px]">ر.س</span>
          </div>
          <span className="font-medium text-[#3E8A5A] text-[11px] leading-[16px]">
            {paymentStatus}
          </span>
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="flex items-center justify-between pt-3 flex-wrap gap-3">
        {/* Right Info: Channel & Booking ID */}
        <div className="flex items-center gap-2 text-right flex-wrap">
          <div className="bg-[#E5EAE0] rounded-[4px] px-2 py-0.5 font-normal text-[#181D17] text-[11px] leading-[16px]">
            {bookingRef}
          </div>
          <span className="text-[#75786F]">•</span>
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            {channelName}
          </span>
        </div>

        {/* Left Action: عرض تفاصيل الحجز */}
        <Link
          href={`/dashboard/bookings?search=${bookingId}`}
          onClick={() => toast.info(`استعراض تفاصيل الحجز: ${bookingId}`)}
          className="flex items-center gap-1.5 font-bold text-[#34422A] text-[12px] leading-[18px] hover:underline cursor-pointer select-none"
        >
          <span>عرض تفاصيل الحجز</span>
          <img
            src="/icons/units/arrow-booking.svg"
            alt=""
            className="size-[10.7px] shrink-0"
          />
        </Link>
      </div>
    </div>
  );
}
