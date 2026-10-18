"use client";

import { Calendar, ChevronLeft, Eye, CalendarCheck, CalendarSync, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PropertyBookingItem } from "../types";
import { ActionDropdown } from "@/components/shared/action-dropdown";

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
      {/* 1. Header Row matching screenshot 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Right in RTL: Icon Squircle in light sage + Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shrink-0 border border-[#D5DDCF]">
            <Calendar className="w-5 h-5 text-[#2E3C29]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#172115]">
              آخر الحجوزات
            </h3>
            <p className="text-xs text-[#7D8A78] mt-0.5">
              سجل الحجوزات المؤكدة ونشاط الإشغال في {propertyName}
            </p>
          </div>
        </div>

        {/* Left in RTL: View All Button */}
        <button
          type="button"
          onClick={() => toast.info(`عرض جميع الحجوزات (${totalBookingsCount})`)}
          className="bg-[#EEF2E6] hover:bg-[#E5EAE0] text-[#2C3825] border border-[#D5DDCF] rounded-xl px-4 py-2 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto select-none"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>عرض جميع الحجوزات ({totalBookingsCount})</span>
        </button>
      </div>

      {/* 2. Table matching screenshot 4 */}
      <div className="overflow-hidden border border-[#E2E6DC] rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-[#E2E6DC] bg-[#FBFDFB] text-[#7D8A78] text-xs font-bold">
                <th className="px-6 py-4 whitespace-nowrap">العميل / النزيل</th>
                <th className="px-5 py-4 whitespace-nowrap text-center">الوحدة</th>
                <th className="px-5 py-4 whitespace-nowrap text-center">تاريخ الدخول</th>
                <th className="px-5 py-4 whitespace-nowrap text-center">تاريخ المغادرة</th>
                <th className="px-5 py-4 whitespace-nowrap text-center">مصدر الحجز</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">الحالة</th>
                <th className="px-5 py-4 whitespace-nowrap text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-[#F6F8F4]/70 transition-colors"
                >
                  {/* 1. Guest Info */}
                  <td className="px-6 py-4.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none border"
                        style={{
                          backgroundColor: booking.avatarBgColor || "#EEF2E6",
                          color: booking.avatarTextColor || "#283820",
                          borderColor:
                            booking.guestInitials === "س ش"
                              ? "#E8D8BA"
                              : "#CCD5C5",
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

                  {/* 2. Unit */}
                  <td className="px-5 py-4.5 whitespace-nowrap text-center">
                    <span className="font-black text-sm text-[#172115]">
                      {booking.unitNumber}
                    </span>
                  </td>

                  {/* 3. Check-in Date */}
                  <td className="px-5 py-4.5 whitespace-nowrap text-center">
                    <span className="text-xs font-medium text-[#172115]">
                      {booking.checkInDate}
                    </span>
                  </td>

                  {/* 4. Check-out Date */}
                  <td className="px-5 py-4.5 whitespace-nowrap text-center">
                    <span className="text-xs font-medium text-[#172115]">
                      {booking.checkOutDate}
                    </span>
                  </td>

                  {/* 5. Source */}
                  <td className="px-5 py-4.5 whitespace-nowrap text-center">
                    <span className="text-xs font-bold text-[#2E7D32]" dir="ltr">
                      {booking.source}
                    </span>
                  </td>

                  {/* 6. Status Badge */}
                  <td className="px-6 py-4.5 whitespace-nowrap text-center">
                    {booking.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold px-3.5 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        <span>{booking.statusText}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-[#EEF2E6] border border-[#CCD5C5] text-[#4A5745] text-xs font-bold px-3.5 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A5745]" />
                        <span>{booking.statusText}</span>
                      </span>
                    )}
                  </td>

                  {/* 7. Actions Dropdown matching screenshot exactly */}
                  <td className="px-5 py-4.5 whitespace-nowrap text-center">
                    <ActionDropdown
                      items={[
                        {
                          label: "تفاصيل الحجز",
                          icon: Eye,
                          variant: "active",
                          onClick: () =>
                            toast.info(
                              `عرض تفاصيل الحجز: ${booking.bookingCode} - ${booking.guestName}`
                            ),
                        },
                        {
                          label: "تعديل الحجز",
                          icon: CalendarCheck,
                          onClick: () =>
                            toast.info(`تعديل الحجز: ${booking.bookingCode}`),
                        },
                        {
                          label: "تمديد الاقامة",
                          icon: CalendarSync,
                          onClick: () =>
                            toast.info(
                              `طلب تمديد إقامة النزيل: ${booking.guestName}`
                            ),
                        },
                        {
                          label: "إلغاء الحجز",
                          icon: Trash2,
                          variant: "destructive",
                          onClick: () =>
                            toast.error(
                              `تم إلغاء الحجز رقم: ${booking.bookingCode}`
                            ),
                        },
                      ]}
                    />
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
