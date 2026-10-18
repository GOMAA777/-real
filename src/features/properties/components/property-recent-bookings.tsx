"use client";

import { CalendarDays, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PropertyBookingItem } from "../types";

interface PropertyRecentBookingsProps {
  bookings: PropertyBookingItem[];
  propertyName?: string;
  totalBookingsCount?: number;
}

export function PropertyRecentBookings({
  bookings,
  propertyName = "عمارة النخيل",
  totalBookingsCount = 10,
}: PropertyRecentBookingsProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#172115]">
              آخر الحجوزات
            </h3>
            <p className="text-xs text-[#7D8A78] mt-0.5">
              سجل الحجوزات المؤكدة ونشاط الإشغال في {propertyName}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.info(`عرض جميع الحجوزات (${totalBookingsCount})`)}
          className="bg-[#F6F8F4] hover:bg-[#EEF2E6] text-[#172115] border border-[#E2E6DC] rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <span>عرض جميع الحجوزات ({totalBookingsCount})</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Table */}
      <div className="overflow-hidden border border-[#E2E6DC] rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-[#E2E6DC] bg-[#FBFDFB] text-[#7D8A78] text-xs font-bold">
                <th className="px-5 py-3.5 whitespace-nowrap">العميل / النزيل</th>
                <th className="px-4 py-3.5 whitespace-nowrap text-center">الوحدة</th>
                <th className="px-4 py-3.5 whitespace-nowrap text-center">تاريخ الدخول</th>
                <th className="px-4 py-3.5 whitespace-nowrap text-center">تاريخ المغادرة</th>
                <th className="px-4 py-3.5 whitespace-nowrap text-center">مصدر الحجز</th>
                <th className="px-4 py-3.5 whitespace-nowrap text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F6F8F4]/70 transition-colors"
                >
                  {/* Guest Info */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none border border-black/5"
                        style={{
                          backgroundColor: booking.avatarBgColor || "#DDE7D3",
                          color: booking.avatarTextColor || "#283820",
                        }}
                      >
                        {booking.guestInitials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#172115]">
                          {booking.guestName}
                        </div>
                        <div className="text-[11px] text-[#7D8A78] font-mono mt-0.5" dir="ltr">
                          {booking.bookingCode}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Unit */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="font-bold text-xs sm:text-sm text-[#172115]">
                      {booking.unitNumber}
                    </span>
                  </td>

                  {/* Check-in Date */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="text-xs font-medium text-[#172115]">
                      {booking.checkInDate}
                    </span>
                  </td>

                  {/* Check-out Date */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="text-xs font-medium text-[#172115]">
                      {booking.checkOutDate}
                    </span>
                  </td>

                  {/* Source */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="text-xs font-bold text-[#2E7D32]" dir="ltr">
                      {booking.source}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {booking.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        <span>{booking.statusText}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#F6F8F4] border border-[#E2E6DC] text-[#4A5745] text-xs font-bold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A5745]" />
                        <span>{booking.statusText}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
