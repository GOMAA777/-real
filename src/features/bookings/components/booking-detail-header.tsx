"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, CalendarPlus, ArrowRightLeft, CalendarX2, UserPlus } from "lucide-react";
import { ExtendStayModal } from "./extend-stay-modal";
import { ChangeUnitModal } from "./change-unit-modal";
import { CancelBookingModal } from "./cancel-booking-modal";

interface BookingDetailHeaderProps {
  bookingCode?: string;
  status?: "active" | "cancelled" | "upcoming" | "completed";
}

export function BookingDetailHeader({
  bookingCode = "BK-10482",
  status = "active",
}: BookingDetailHeaderProps) {
  const [isExtendOpen, setIsExtendOpen] = useState(false);
  const [isChangeUnitOpen, setIsChangeUnitOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const isCancelled = status === "cancelled";

  return (
    <>
      <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        {/* Title & Subtitle (Right in RTL) */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
              تفاصيل الحجز
            </h1>
            {isCancelled && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8E8] border border-[#FADCDD] text-[#D9383A] font-bold text-xs select-none">
                <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
                <span>ملغى</span>
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium">
            ملف الحجز التشغيلي وإدارة علاقات الإقامة والأتمتة
          </p>
        </div>

        {/* Action Buttons (Left in RTL) */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {isCancelled ? (
            <>
              {/* Edit Booking Button (Disabled) */}
              <button
                type="button"
                disabled
                className="bg-[#EAEFE6] text-[#A5B3A1] border border-[#DEE5DA] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-not-allowed select-none"
              >
                <Calendar className="w-4 h-4 text-[#A5B3A1]" />
                <span>تعديل الحجز</span>
              </button>

              {/* New Booking for Same Guest Button */}
              <Link
                href="/dashboard/bookings/new"
                className="bg-[#3D4C35] hover:bg-[#34422E] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
              >
                <UserPlus className="w-4 h-4 text-white" />
                <span>حجز جديد لنفس النزيل</span>
              </Link>
            </>
          ) : (
            <>
              {/* Change Unit Button */}
              <button
                type="button"
                onClick={() => setIsChangeUnitOpen(true)}
                className="bg-white hover:bg-[#F9FAF7] border border-[#D5DDD0] text-[#172115] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
              >
                <ArrowRightLeft className="w-4 h-4 text-[#3D4C35]" />
                <span>تغيير الوحدة</span>
              </button>

              {/* Edit Booking Button */}
              <Link
                href={`/dashboard/bookings/${bookingCode}/edit`}
                className="bg-white hover:bg-[#F9FAF7] border border-[#D5DDD0] text-[#172115] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#172115]" />
                <span>تعديل الحجز</span>
              </Link>

              {/* Extend Stay Button */}
              <button
                type="button"
                onClick={() => setIsExtendOpen(true)}
                className="bg-[#3D4C35] hover:bg-[#34422E] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
              >
                <CalendarPlus className="w-4 h-4 text-white" />
                <span>تمديد الإقامة</span>
              </button>

              {/* Cancel Booking Button */}
              <button
                type="button"
                onClick={() => setIsCancelOpen(true)}
                className="bg-[#FFF5F5] hover:bg-[#FEEAEA] border border-[#FADCDD] text-[#D9383A] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-95"
                title="إلغاء الحجز"
              >
                <CalendarX2 className="w-4 h-4" />
                <span>إلغاء</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <ChangeUnitModal
        isOpen={isChangeUnitOpen}
        onClose={() => setIsChangeUnitOpen(false)}
        bookingCode={bookingCode}
      />

      <ExtendStayModal
        isOpen={isExtendOpen}
        onClose={() => setIsExtendOpen(false)}
        bookingCode={bookingCode}
      />

      <CancelBookingModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        bookingCode={bookingCode}
      />
    </>
  );
}
