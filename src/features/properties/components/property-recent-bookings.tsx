"use client";

import { Calendar, ChevronLeft } from "lucide-react";
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
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4" dir="rtl">
      {/* 1. Header Row matching recent_bookings_crop.png */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Right in RTL: Light Green Squircle + Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E2EBD8] border border-[#CCD5C5] text-[#2E4025] flex items-center justify-center shrink-0 shadow-2xs">
            <Calendar className="w-5 h-5 text-[#2E4025]" />
          </div>
          <div className="text-right">
            <h3 className="text-lg sm:text-xl font-black text-[#172115]">
              آخر الحجوزات
            </h3>
            <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
              سجل الحجوزات المؤكدة ونشاط الإشغال في {propertyName}
            </p>
          </div>
        </div>

        {/* Left in RTL: View All Button */}
        <button
          type="button"
          onClick={() => toast.info(`عرض جميع الحجوزات (${totalBookingsCount})`)}
          className="bg-[#E8EDE2] hover:bg-[#DEE5D8] text-[#172115] rounded-full px-4 py-2 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto select-none"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#172115]" />
          <span>عرض جميع الحجوزات ({totalBookingsCount})</span>
        </button>
      </div>

      {/* 2. Table matching recent_bookings_crop.png */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-[#F8FAF6] text-[#7D8A78] text-xs font-bold border-y border-[#EEF2E6]">
              <th className="px-5 py-3.5 whitespace-nowrap text-right">العميل / النزيل</th>
              <th className="px-5 py-3.5 whitespace-nowrap text-center">الوحدة</th>
              <th className="px-5 py-3.5 whitespace-nowrap text-center">تاريخ الدخول</th>
              <th className="px-5 py-3.5 whitespace-nowrap text-center">تاريخ المغادرة</th>
              <th className="px-5 py-3.5 whitespace-nowrap text-center">مصدر الحجز</th>
              <th className="px-5 py-3.5 whitespace-nowrap text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF2E6]">
            {bookings.map((booking) => {
              // Extract unit number and label
              const unitParts = booking.unitNumber.split(" ");
              const unitNum = unitParts[1] || booking.unitNumber;

              // Extract date parts
              const checkInParts = booking.checkInDate.split(" ");
              const checkInDayMonth = `${checkInParts[0]} ${checkInParts[1]}`;
              const checkInYear = checkInParts[2] || "2026";

              const checkOutParts = booking.checkOutDate.split(" ");
              const checkOutDayMonth = `${checkOutParts[0]} ${checkOutParts[1]}`;
              const checkOutYear = checkOutParts[2] || "2026";

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F6F8F4]/70 transition-colors"
                >
                  {/* 1. Guest Info */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none"
                        style={{
                          backgroundColor:
                            booking.guestInitials === "س ش"
                              ? "#F6EDD9"
                              : "#E2EBD8",
                          color:
                            booking.guestInitials === "س ش"
                              ? "#784E1A"
                              : "#2E4025",
                        }}
                      >
                        {booking.guestInitials}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-[#172115]">
                          {booking.guestName}
                        </div>
                        <div className="text-[11px] text-[#7D8A78] font-medium mt-0.5" dir="ltr">
                          {booking.bookingCode}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Unit */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <div className="leading-tight">
                      <div className="text-xs font-bold text-[#172115]">الوحدة</div>
                      <div className="text-sm font-black text-[#172115] mt-0.5">{unitNum}</div>
                    </div>
                  </td>

                  {/* 3. Check-in Date */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <div className="leading-tight">
                      <div className="text-xs font-bold text-[#172115]">{checkInDayMonth}</div>
                      <div className="text-[11px] text-[#7D8A78] font-medium mt-0.5">{checkInYear}</div>
                    </div>
                  </td>

                  {/* 4. Check-out Date */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <div className="leading-tight">
                      <div className="text-xs font-bold text-[#172115]">{checkOutDayMonth}</div>
                      <div className="text-[11px] text-[#7D8A78] font-medium mt-0.5">{checkOutYear}</div>
                    </div>
                  </td>

                  {/* 5. Source */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    <span className="bg-[#EAF0F8] text-[#1D4E89] rounded-xl px-3.5 py-1 text-xs font-bold inline-flex items-center gap-1.5 select-none" dir="ltr">
                      <span>Booking.com</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D4E89]" />
                    </span>
                  </td>

                  {/* 6. Status Badge */}
                  <td className="px-5 py-4 whitespace-nowrap text-center">
                    {booking.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#E5EEDD] text-[#2E4025] text-xs font-bold px-3.5 py-1.5 rounded-full select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E4025]" />
                        <span>{booking.statusText}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#E8EDE2] text-[#4F5D4A] text-xs font-medium px-3.5 py-1.5 rounded-full select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7D8A78]" />
                        <span>{booking.statusText}</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
