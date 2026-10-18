"use client";

import { useState, useMemo } from "react";
import { Search, MoreVertical, Key, Lock, ChevronRight, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { OwnerBookingItem, OwnerBookingsKPIData } from "../types";
import {
  defaultOwnerBookings,
  defaultOwnerBookingsKPIs,
} from "../data/mock-owner-bookings";
import { OwnerBookingsKPIs } from "./owner-bookings-kpis";
import { OwnerBookingsFilterDrawer, BookingFilterState } from "./owner-bookings-filter-drawer";

interface OwnerBookingsTabViewProps {
  bookings?: OwnerBookingItem[];
  kpis?: OwnerBookingsKPIData;
}

export function OwnerBookingsTabView({
  bookings = defaultOwnerBookings,
  kpis = defaultOwnerBookingsKPIs,
}: OwnerBookingsTabViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "upcoming" | "completed" | "cancelled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [bookingFilters, setBookingFilters] = useState<BookingFilterState>({
    source: "all",
    accessStatus: "all",
    propertyName: "all",
    sortBy: "default",
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (bookingFilters.source !== "all") count++;
    if (bookingFilters.accessStatus !== "all") count++;
    if (bookingFilters.propertyName !== "all") count++;
    if (bookingFilters.sortBy !== "default") count++;
    return count;
  }, [bookingFilters]);

  // Filter Bookings
  const filteredBookings = useMemo(() => {
    const result = bookings.filter((item) => {
      // Filter status tab
      if (filterStatus === "active") {
        if (item.status !== "active" && item.status !== "checkout_today") return false;
      } else if (filterStatus === "upcoming") {
        if (item.status !== "upcoming") return false;
      } else if (filterStatus === "completed") {
        if (item.status !== "completed") return false;
      } else if (filterStatus === "cancelled") {
        if (item.status !== "cancelled") return false;
      }

      // Advanced Filters
      if (bookingFilters.source !== "all" && item.source !== bookingFilters.source) {
        return false;
      }
      if (bookingFilters.accessStatus !== "all" && item.accessStatus !== bookingFilters.accessStatus) {
        return false;
      }
      if (bookingFilters.propertyName !== "all" && !item.propertyName.includes(bookingFilters.propertyName)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.guestName.toLowerCase().includes(q);
        const matchesProperty = item.propertyName.toLowerCase().includes(q);
        const matchesLocation = item.propertyLocation.toLowerCase().includes(q);
        const matchesCode = item.bookingCode.toLowerCase().includes(q);
        const matchesUnit = item.unitNumber.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesProperty &&
          !matchesLocation &&
          !matchesCode &&
          !matchesUnit
        ) {
          return false;
        }
      }

      return true;
    });

    if (bookingFilters.sortBy === "checkin_desc") {
      result.sort((a, b) => b.checkInDate.localeCompare(a.checkInDate, "ar"));
    } else if (bookingFilters.sortBy === "checkout_asc") {
      result.sort((a, b) => a.checkOutDate.localeCompare(b.checkOutDate, "ar"));
    } else if (bookingFilters.sortBy === "code_asc") {
      result.sort((a, b) => a.bookingCode.localeCompare(b.bookingCode));
    }

    return result;
  }, [bookings, filterStatus, searchQuery, bookingFilters]);

  return (
    <div className="space-y-5">
      {/* 1. 4 Metric KPI Cards */}
      <OwnerBookingsKPIs kpis={kpis} />

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E2E6DC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Search Bar (Right in RTL) */}
        <div className="relative w-full sm:w-80 lg:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم العقار أو المدينة أو الحي..."
            className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-xl px-4 py-2 pe-10 text-xs text-[#172115] placeholder:text-[#7D8A78] focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Pills (Left in RTL) */}
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          {/* Advanced Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={`px-3.5 py-1.5 text-xs rounded-xl font-bold border flex items-center gap-1.5 transition-all cursor-pointer select-none ${
              activeFiltersCount > 0
                ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                : "bg-[#F6F8F4] hover:bg-[#EEF2E6] text-[#2C3825] border-[#E2E6DC]"
            }`}
            title="تصفية الحجوزات"
          >
            <SlidersHorizontal
              className={`w-3.5 h-3.5 ${
                activeFiltersCount > 0 ? "text-white" : "text-[#2C3825]"
              }`}
            />
            <span>فلتر</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#2E3C29] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-[#F6F8F4] text-[#172115] border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            الكل (2)
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("active")}
            className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
              filterStatus === "active"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            الحالية (1)
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("upcoming")}
            className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
              filterStatus === "upcoming"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            القادمة (1)
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("completed")}
            className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
              filterStatus === "completed"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            المنتهية (1)
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("cancelled")}
            className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
              filterStatus === "cancelled"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
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
                <th className="px-5 py-4 whitespace-nowrap">العميل / النزيل</th>
                <th className="px-4 py-4 whitespace-nowrap">العقار</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">الوحدة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">مصدر الحجز</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">تاريخ الدخول</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">تاريخ المغادرة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">الحالة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">أكواد الدخول</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">
                  الإجراءات (Admin)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-[#7D8A78] text-xs font-medium">
                    لا توجد حجوزات مطابقة لمعايير البحث
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#F6F8F4]/70 transition-colors"
                  >
                    {/* 1. العميل / النزيل */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EEF2E6] text-[#283820] font-bold text-xs flex items-center justify-center shrink-0 border border-[#E2E6DC]">
                          {booking.guestInitials}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#172115]">
                            {booking.guestName}
                          </div>
                          <div className="text-[11px] text-[#7D8A78] font-mono mt-0.5" dir="ltr">
                            {booking.bookingCode}
                          </div>
                          <div className="text-[10px] text-[#7D8A78] mt-0.5" dir="ltr">
                            {booking.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. العقار */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-bold text-xs sm:text-sm text-[#172115]">
                        {booking.propertyName}
                      </div>
                      <div className="text-[11px] text-[#7D8A78] mt-0.5">
                        {booking.propertyLocation}
                      </div>
                    </td>

                    {/* 3. الوحدة */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-block bg-[#F6F8F4] border border-[#EEF2E6] font-bold text-xs text-[#172115] px-2.5 py-0.5 rounded-lg">
                        {booking.unitNumber}
                      </div>
                      <div
                        className={`text-[10px] mt-1 font-medium ${
                          booking.unitHighlightColor === "orange"
                            ? "text-[#D97706] font-bold"
                            : "text-[#7D8A78]"
                        }`}
                      >
                        {booking.unitDescription}
                      </div>
                    </td>

                    {/* 4. مصدر الحجز */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#DBEAFE] text-[#1E40AF] font-bold text-xs px-2.5 py-1 rounded-lg">
                        <span>{booking.source}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      </div>
                      <div className="text-[10px] text-[#7D8A78] font-mono mt-1" dir="ltr">
                        {booking.sourceId}
                      </div>
                    </td>

                    {/* 5. تاريخ الدخول */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="font-bold text-xs text-[#172115]">
                        {booking.checkInDate}
                      </div>
                      {booking.checkInIsToday ? (
                        <div className="space-y-0.5 mt-0.5">
                          <span className="text-[10px] font-bold text-[#D97706] block">
                            {booking.checkInBadge}
                          </span>
                          <span className="text-[10px] text-[#D97706] font-medium block">
                            {booking.checkInSubtext}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-[#7D8A78] mt-0.5">
                          <div>{booking.checkInTime}</div>
                          {booking.checkInBadge && <div>{booking.checkInBadge}</div>}
                        </div>
                      )}
                    </td>

                    {/* 6. تاريخ المغادرة */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div
                        className={`font-bold text-xs ${
                          booking.checkOutIsToday ? "text-[#DC2626]" : "text-[#172115]"
                        }`}
                      >
                        {booking.checkOutDate}
                      </div>
                      {booking.checkOutIsToday ? (
                        <div className="space-y-0.5 mt-0.5">
                          <span className="text-[10px] font-bold text-[#DC2626] block">
                            {booking.checkOutBadge}
                          </span>
                          <span className="text-[10px] text-[#DC2626] font-medium block">
                            {booking.checkOutSubtext}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-[#7D8A78] mt-0.5">
                          <div>{booking.checkOutTime}</div>
                          {booking.checkOutBadge && <div>{booking.checkOutBadge}</div>}
                        </div>
                      )}
                    </td>

                    {/* 7. الحالة */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {booking.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                          <span>{booking.statusText}</span>
                        </span>
                      ) : booking.status === "upcoming" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                          <span>{booking.statusText}</span>
                        </span>
                      ) : booking.status === "checkout_today" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                          <span>{booking.statusText}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#F6F8F4] border border-[#E2E6DC] text-[#7D8A78] text-xs font-bold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7D8A78]" />
                          <span>{booking.statusText}</span>
                        </span>
                      )}
                    </td>

                    {/* 8. أكواد الدخول */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-block bg-[#F6F8F4] border border-[#EEF2E6] rounded-xl px-2.5 py-1 text-center min-w-[100px]">
                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#172115]">
                          {booking.accessStatus === "disabled" ? (
                            <Lock className="w-3 h-3 text-[#7D8A78]" />
                          ) : (
                            <Key className="w-3 h-3 text-[#7D8A78]" />
                          )}
                          <span>{booking.accessCode}</span>
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 font-medium ${
                            booking.accessStatus === "connected"
                              ? "text-[#2E7D32]"
                              : booking.accessStatus === "pending"
                              ? "text-[#D97706]"
                              : "text-[#7D8A78]"
                          }`}
                        >
                          {booking.accessDevice}
                        </div>
                      </div>
                    </td>

                    {/* 9. الإجراءات (Admin) */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        onClick={() =>
                          toast.info(`خيارات الحجز: ${booking.bookingCode} - ${booking.guestName}`)
                        }
                        className="text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4] p-1.5 rounded-lg transition-colors cursor-pointer"
                        aria-label="إجراءات الحجز"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Table Pagination Footer */}
        <div className="px-6 py-4 border-t border-[#E2E6DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Item Count & Rows Per Page (Right in RTL) */}
          <div className="flex items-center gap-2 text-[#7D8A78] font-medium order-2 sm:order-1">
            <span className="font-bold text-[#172115]">عرض 6 حجوزات لكل صفحة</span>
            <span>•</span>
            <span>من إجمالي 18 حجز نشط مرتبط بمحفظة المالك</span>
          </div>

          {/* Pagination Controls (Left in RTL) */}
          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-lg border border-[#E2E6DC] text-[#A2ADA0] cursor-not-allowed flex items-center gap-1 font-medium select-none"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>السابق</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center select-none ${
                currentPage === 1
                  ? "bg-[#2E3C29] text-white"
                  : "bg-white text-[#172115] border border-[#E2E6DC]"
              }`}
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center select-none ${
                currentPage === 2
                  ? "bg-[#2E3C29] text-white"
                  : "bg-white text-[#172115] border border-[#E2E6DC] hover:bg-[#F6F8F4]"
              }`}
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center select-none ${
                currentPage === 3
                  ? "bg-[#2E3C29] text-white"
                  : "bg-white text-[#172115] border border-[#E2E6DC] hover:bg-[#F6F8F4]"
              }`}
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-[#E2E6DC] text-[#172115] hover:bg-[#F6F8F4] flex items-center gap-1 font-medium select-none cursor-pointer"
            >
              <span>التالي</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Filter Drawer */}
      <OwnerBookingsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={bookingFilters}
        onApplyFilters={(newFilters) => {
          setBookingFilters(newFilters);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setBookingFilters({
            source: "all",
            accessStatus: "all",
            propertyName: "all",
            sortBy: "default",
          });
          setCurrentPage(1);
        }}
        totalResultsCount={filteredBookings.length}
      />
    </div>
  );
}
