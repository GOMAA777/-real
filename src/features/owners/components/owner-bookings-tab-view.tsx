"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Download,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Eye,
  CalendarCheck,
  CalendarSync,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { OwnerBookingItem } from "../types";
import { defaultOwnerBookings } from "../data/mock-owner-bookings";

interface OwnerBookingsTabViewProps {
  bookings?: OwnerBookingItem[];
}

export function OwnerBookingsTabView({
  bookings = defaultOwnerBookings,
}: OwnerBookingsTabViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "upcoming" | "active" | "completed" | "cancelled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);

  // Filter Bookings based on search and status tabs
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      // Status filter tab
      if (filterStatus === "upcoming" && item.status !== "upcoming") return false;
      if (filterStatus === "active" && item.status !== "active") return false;
      if (filterStatus === "completed" && item.status !== "completed") return false;
      if (filterStatus === "cancelled" && item.status !== "cancelled") return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.guestName.toLowerCase().includes(q);
        const matchesCode = item.bookingCode.toLowerCase().includes(q);
        const matchesProperty = item.propertyName.toLowerCase().includes(q);
        const matchesUnit = item.unitNumber.toLowerCase().includes(q);
        const matchesType = (item.unitType || item.unitDescription || "").toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesCode &&
          !matchesProperty &&
          !matchesUnit &&
          !matchesType &&
          !matchesPhone
        ) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, filterStatus, searchQuery]);

  return (
    <div className="space-y-5" dir="rtl">
      {/* 1. Header Card (Matching exact user design) */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        {/* Right side: Title & Description */}
        <div>
          <h1 className="text-2xl font-bold text-[#172115] tracking-tight">
            الحجوزات
          </h1>
          <p className="text-sm text-[#7D8A78] mt-1 font-normal leading-relaxed">
            إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة.
          </p>
        </div>

        {/* Left side: Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Add Booking Button (Leftmost in RTL) */}
          <Link
            href="/dashboard/bookings/new"
            className="bg-[#2E3C29] hover:bg-[#232F1F] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة حجز</span>
          </Link>

          {/* Export List Button */}
          <button
            type="button"
            onClick={() => toast.info("جاري تصدير قائمة الحجوزات (CSV / Excel)...")}
            className="bg-white hover:bg-[#F9FAF7] border border-[#E2E6DC] text-[#172115] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#7D8A78]" />
            <span>تصدير القائمة (CSV / Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E2E6DC] flex flex-col lg:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Search Input (Right side in RTL) */}
        <div className="relative w-full lg:w-[460px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم العميل، رقم الحجز، العقار أو الوحدة..."
            className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-xl px-4 py-2.5 pe-10 text-xs text-[#172115] placeholder:text-[#7D8A78] focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Pills (Left side in RTL) */}
        <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer select-none",
              filterStatus === "all"
                ? "bg-[#F6F8F4] text-[#172115] border border-[#E2E6DC] shadow-2xs"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            )}
          >
            الكل (2)
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("upcoming")}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer select-none",
              filterStatus === "upcoming"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC] shadow-2xs"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            )}
          >
            القادمة (1)
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("active")}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer select-none",
              filterStatus === "active"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC] shadow-2xs"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            )}
          >
            الحالية (2)
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("completed")}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer select-none",
              filterStatus === "completed"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC] shadow-2xs"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            )}
          >
            المنتهية (2)
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("cancelled")}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer select-none",
              filterStatus === "cancelled"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC] shadow-2xs"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            )}
          >
            الملغاة (1)
          </button>
        </div>
      </div>

      {/* 3. Bookings Data Table */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-[#E2E6DC] text-[#7D8A78] text-xs font-bold bg-[#FBFDFB]">
                <th className="px-5 py-4 whitespace-nowrap">رقم الحجز</th>
                <th className="px-4 py-4 whitespace-nowrap">العميل</th>
                <th className="px-4 py-4 whitespace-nowrap">العقار</th>
                <th className="px-4 py-4 whitespace-nowrap">الوحدة</th>
                <th className="px-4 py-4 whitespace-nowrap">تاريخ الوصول</th>
                <th className="px-4 py-4 whitespace-nowrap">تاريخ المغادرة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">المصدر</th>
                <th className="px-4 py-4 whitespace-nowrap">المبلغ والتحصيل</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">الحالة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-12 text-[#7D8A78] text-xs font-medium"
                  >
                    لا توجد حجوزات مطابقة لمعايير البحث
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#F6F8F4]/70 transition-colors"
                  >
                    {/* 1. رقم الحجز */}
                    <td className="px-5 py-4 whitespace-nowrap font-medium text-xs sm:text-sm text-[#172115]">
                      {booking.bookingCode}
                    </td>

                    {/* 2. العميل */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#dce6d5] text-[#2e3c29] font-bold text-xs flex items-center justify-center shrink-0">
                          {booking.guestInitials}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#172115]">
                            {booking.guestName}
                          </div>
                          <div
                            className="text-[11px] text-[#7D8A78] mt-0.5"
                            dir="ltr"
                          >
                            {booking.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. العقار */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-sm text-[#172115]">
                        {booking.propertyName}
                      </div>
                    </td>

                    {/* 4. الوحدة */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-sm text-[#172115]">
                        {booking.unitNumber}
                      </div>
                      <div className="text-xs text-[#7D8A78] mt-0.5">
                        {booking.unitType || booking.unitDescription}
                      </div>
                    </td>

                    {/* 5. تاريخ الوصول */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-xs sm:text-sm text-[#172115]">
                        {booking.checkInDate}
                      </div>
                      <div className="text-xs text-[#7D8A78] mt-0.5">
                        {booking.checkInSubtext || "تسجيل من 03:00 م"}
                      </div>
                    </td>

                    {/* 6. تاريخ المغادرة */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-xs sm:text-sm text-[#172115]">
                        {booking.checkOutDate}
                      </div>
                      <div className="text-xs text-[#7D8A78] mt-0.5">
                        {booking.checkOutSubtext || "3 ليال"}
                      </div>
                    </td>

                    {/* 7. المصدر */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1.5 bg-[#F6F8F4] border border-[#E2E6DC] px-2.5 py-1 rounded-full text-xs font-semibold text-[#172115]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                        <span>{booking.source}</span>
                      </div>
                    </td>

                    {/* 8. المبلغ والتحصيل */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-sm text-[#172115]">
                        {booking.amount || "2,450 ر.س"}
                      </div>
                      <div className="text-xs text-[#7D8A78] mt-0.5">
                        {booking.paymentStatus || "مدفوع إلكترونياً"}
                      </div>
                    </td>

                    {/* 9. الحالة */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {booking.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                          <span>حالي</span>
                        </span>
                      ) : booking.status === "upcoming" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#F6F8F4] border border-[#E2E6DC] text-[#4A5745] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7D8A78]" />
                          <span>قادم</span>
                        </span>
                      ) : booking.status === "cancelled" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                          <span>ملغي</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#F6F8F4] border border-[#E2E6DC] text-[#7D8A78] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
                          <span>منتهي</span>
                        </span>
                      )}
                    </td>

                    {/* 10. الإجراءات */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <ActionDropdown
                        triggerIcon="vertical"
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
                            label: "تمديد الإقامة",
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#E2E6DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Item Count & Rows (Right in RTL) */}
          <div className="text-[#7D8A78] font-medium order-2 sm:order-1">
            <span>عرض </span>
            <span className="font-bold text-[#172115]">
              1 إلى {filteredBookings.length}
            </span>
            <span> من أصل </span>
            <span className="font-bold text-[#172115]">842</span>
            <span> حجز مسجل</span>
          </div>

          {/* Rows Per Page Selector (Center) */}
          <div className="relative flex items-center gap-2 text-[#7D8A78] font-medium order-3 sm:order-2">
            <span>الصفوف لكل صفحة:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRowsDropdown((prev) => !prev)}
                className="bg-white border border-[#E2E6DC] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#172115] flex items-center gap-2 hover:bg-[#F9FAF7] transition-all cursor-pointer shadow-2xs select-none"
              >
                <span>{rowsPerPage} حجوزات</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7D8A78]" />
              </button>

              {showRowsDropdown && (
                <div className="absolute start-0 bottom-full mb-1.5 w-32 bg-white border border-[#E2E6DC] rounded-xl shadow-lg py-1 z-30">
                  {[6, 10, 20, 50].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setRowsPerPage(size);
                        setShowRowsDropdown(false);
                      }}
                      className={cn(
                        "w-full text-start px-3 py-1.5 text-xs transition-colors hover:bg-[#EEF2E6] cursor-pointer",
                        rowsPerPage === size
                          ? "font-bold text-[#2E3C29] bg-[#EEF2E6]/50"
                          : "text-[#172115]"
                      )}
                    >
                      {size} حجوزات
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pagination Controls (Left in RTL) */}
          <div className="flex items-center gap-1.5 order-1 sm:order-3">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#E2E6DC] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed bg-white text-[#7D8A78]"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>السابق</span>
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all select-none border border-[#E2E6DC] bg-[#EEF2E6] text-[#2E3C29] shadow-2xs cursor-pointer"
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="px-3.5 py-1.5 rounded-xl border border-[#E2E6DC] text-[#7D8A78] flex items-center gap-1.5 font-medium text-xs opacity-50 cursor-not-allowed bg-white shadow-2xs select-none"
            >
              <span>التالي</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
