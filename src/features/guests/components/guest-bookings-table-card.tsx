"use client";

import { useState } from "react";
import Link from "next/link";
import {
  History,
  Search,
  Building2,
  Home,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { GuestBooking } from "../types";

interface GuestBookingsTableCardProps {
  bookings: GuestBooking[];
  totalRevenue?: number;
}

export function GuestBookingsTableCard({
  bookings,
  totalRevenue = 10300,
}: GuestBookingsTableCardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingCode.toLowerCase().includes(q) ||
      b.propertyName.toLowerCase().includes(q) ||
      b.unitName.toLowerCase().includes(q)
    );
  });

  const formatMoney = (val: number) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val) + " ر.س"
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-6 shadow-2xs">
      {/* 1. Header Row: Title & Badge on Right, Search Input on Left */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Right: History Icon + Title + Count Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <History className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#172115]">
            سجل الحجوزات على المنصة
          </h2>
          <span className="bg-[#EFF3EA] border border-[#DFE5D8] text-[#34432E] text-xs font-bold px-3 py-1 rounded-full select-none">
            {bookings.length} حجوزات
          </span>
        </div>

        {/* Left: Search Bar */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الحجز أو اسم العقار..."
            className="w-full bg-[#F8FAF6] border border-[#DEE7D7] rounded-xl py-2 ps-9 pe-3.5 text-xs sm:text-sm text-[#172115] placeholder:text-[#7A8875] focus:outline-none focus:ring-1 focus:ring-[#3D4C35] transition-all"
          />
          <Search className="w-4 h-4 text-[#7A8875] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 2. Responsive Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[#E2E6DC]">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#F8FAF6] border-b border-[#E2E6DC] text-[#7A8875] font-bold text-xs select-none">
              <th className="py-3.5 px-4 font-bold">رقم الحجز والمصدر</th>
              <th className="py-3.5 px-4 font-bold">العقار</th>
              <th className="py-3.5 px-4 font-bold">الوحدة المحجوزة</th>
              <th className="py-3.5 px-4 font-bold">تاريخ الوصول</th>
              <th className="py-3.5 px-4 font-bold">تاريخ المغادرة</th>
              <th className="py-3.5 px-4 font-bold">القيمة الإجمالية</th>
              <th className="py-3.5 px-4 font-bold text-center">الحالة</th>
              <th className="py-3.5 px-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#F0F4EC]">
            {filteredBookings.map((b) => {
              const isCancelled = b.status === "cancelled";
              const isUpcoming = b.status === "upcoming";

              return (
                <tr
                  key={b.id}
                  className="hover:bg-[#FAFBF9] transition-colors text-[#172115]"
                >
                  {/* Col 1: Booking Code & Source */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-extrabold text-[#172115]">
                        {b.bookingCode}
                      </div>
                      <span className="bg-[#EFF3EA] border border-[#DEE7D7] text-[#34432E] text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34432E]" />
                        <span>{b.source}</span>
                      </span>
                    </div>
                  </td>

                  {/* Col 2: Property */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-bold text-[#172115]">
                      {b.propertyType === "villa" ? (
                        <Home className="w-4 h-4 text-[#7A8875] shrink-0" />
                      ) : (
                        <Building2 className="w-4 h-4 text-[#7A8875] shrink-0" />
                      )}
                      <span>{b.propertyName}</span>
                    </div>
                  </td>

                  {/* Col 3: Unit */}
                  <td className="py-4 px-4 whitespace-nowrap font-medium text-[#616E5D]">
                    {b.unitName}
                  </td>

                  {/* Col 4: Check-In Date */}
                  <td className="py-4 px-4 whitespace-nowrap font-medium text-[#172115]">
                    {b.checkInDate}
                  </td>

                  {/* Col 5: Check-Out Date */}
                  <td className="py-4 px-4 whitespace-nowrap font-medium text-[#172115]">
                    {b.checkOutDate}
                  </td>

                  {/* Col 6: Total Amount */}
                  <td className="py-4 px-4 whitespace-nowrap font-black text-[#172115]">
                    {formatMoney(b.totalAmount)}
                  </td>

                  {/* Col 7: Status Pill */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    {isCancelled ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF5F5] border border-[#FADCDD] text-[#D9383A] text-xs font-bold select-none">
                        <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
                        <span>{b.statusText}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold select-none">
                        <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                        <span>{b.statusText}</span>
                      </span>
                    )}
                  </td>

                  {/* Col 8: Action Button */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    <Link
                      href={`/dashboard/bookings/${b.bookingCode}`}
                      className="bg-[#EFF3EA] hover:bg-[#E5ECE0] border border-[#DEE7D7] text-[#34432E] px-3.5 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer select-none active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>عرض الحجز</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Table Footer Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
        {/* Right: Security & Billing Audit Note */}
        <div className="flex items-center gap-1.5 text-[#7A8875] font-medium">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
          <span>
            جميع السجلات المالية للحجوزات مراجعة وموثقة بسجلات الفوترة المركزية.
          </span>
        </div>

        {/* Left: Total Revenue */}
        <div className="font-bold text-[#172115] text-xs sm:text-sm">
          <span>إجمالي العوائد المحصلة من النزيل: </span>
          <span className="font-black text-[#172115]">{formatMoney(totalRevenue)}</span>
        </div>
      </div>
    </div>
  );
}
