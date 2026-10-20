"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  Download,
  ChevronRight,
  ChevronLeft,
  Eye,
  CalendarCheck,
  CalendarSync,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TablePagination } from "@/components/shared/table-pagination";
import { ExtendStayModal } from "@/features/bookings/components/extend-stay-modal";
import { CancelBookingModal } from "@/features/bookings/components/cancel-booking-modal";
import { BookingsEmptyStateView } from "@/features/bookings/components/bookings-empty-state-view";
import {
  OwnerBookingsFilterDrawer,
  BookingFilterState,
} from "./owner-bookings-filter-drawer";
import { OwnerBookingItem } from "../types";
import { defaultOwnerBookings } from "../data/mock-owner-bookings";

interface OwnerBookingsTabViewProps {
  bookings?: OwnerBookingItem[];
}

export function OwnerBookingsTabView({
  bookings = defaultOwnerBookings,
}: OwnerBookingsTabViewProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "upcoming" | "active" | "completed" | "cancelled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter drawer state
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

  const handleApplyFilters = (newFilters: BookingFilterState) => {
    setBookingFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setBookingFilters({
      source: "all",
      accessStatus: "all",
      propertyName: "all",
      sortBy: "default",
    });
    setCurrentPage(1);
  };

  // Modals state for action dropdown
  const [selectedBookingForExtend, setSelectedBookingForExtend] =
    useState<OwnerBookingItem | null>(null);
  const [selectedBookingForCancel, setSelectedBookingForCancel] =
    useState<OwnerBookingItem | null>(null);

  // Dynamic counts for status filter tabs
  const statusCounts = useMemo(() => {
    return {
      all: bookings.length,
      upcoming: bookings.filter((b) => b.status === "upcoming").length,
      active: bookings.filter((b) => b.status === "active").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };
  }, [bookings]);

  // Filter Bookings based on search, status tabs, and drawer filters
  const filteredBookings = useMemo(() => {
    let list = bookings.filter((item) => {
      // Status filter tab
      if (filterStatus === "upcoming" && item.status !== "upcoming") return false;
      if (filterStatus === "active" && item.status !== "active") return false;
      if (filterStatus === "completed" && item.status !== "completed") return false;
      if (filterStatus === "cancelled" && item.status !== "cancelled") return false;

      // Platform / Source filter from drawer
      if (bookingFilters.source !== "all") {
        if (bookingFilters.source === "Booking.com" && !item.source.toLowerCase().includes("booking")) return false;
        if (bookingFilters.source === "Airbnb" && !item.source.toLowerCase().includes("airbnb")) return false;
        if (bookingFilters.source === "مباشر" && !item.source.includes("مباشر")) return false;
      }

      // Access status filter from drawer
      if (bookingFilters.accessStatus !== "all") {
        if (item.accessStatus !== bookingFilters.accessStatus) return false;
      }

      // Property name filter from drawer
      if (bookingFilters.propertyName !== "all") {
        if (!item.propertyName.includes(bookingFilters.propertyName)) return false;
      }

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

    // Sort order from drawer
    if (bookingFilters.sortBy === "checkin_desc") {
      list = [...list].sort((a, b) => b.checkInDate.localeCompare(a.checkInDate));
    } else if (bookingFilters.sortBy === "checkout_asc") {
      list = [...list].sort((a, b) => a.checkOutDate.localeCompare(b.checkOutDate));
    } else if (bookingFilters.sortBy === "code_asc") {
      list = [...list].sort((a, b) => a.bookingCode.localeCompare(b.bookingCode));
    }

    return list;
  }, [bookings, filterStatus, searchQuery, bookingFilters]);

  const totalHeadlineCount = 842;
  const totalFiltered = filteredBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage);
  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + rowsPerPage, totalFiltered);

  const searchParams = useSearchParams();
  const forceEmpty =
    searchParams?.get("empty") === "true" ||
    searchParams?.get("state") === "empty";

  // If no bookings exist at all or empty state requested, render exact empty state view
  if (bookings.length === 0 || forceEmpty) {
    return <BookingsEmptyStateView />;
  }

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
          {/* Export List Button (Right button in RTL) */}
          <button
            type="button"
            onClick={() => toast.info("جاري تصدير قائمة الحجوزات (CSV / Excel)...")}
            className="bg-white hover:bg-[#F9FAF7] border border-[#E2E6DC] text-[#172115] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#172115]" />
            <span>تصدير القائمة (CSV / Excel)</span>
          </button>

          {/* Add Booking Button (Leftmost button in RTL) */}
          <Link
            href="/dashboard/bookings/new"
            className="bg-[#384633] hover:bg-[#2C3827] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <span>إضافة حجز</span>
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Filter & Search Bar (Matching exact user design) */}
      <div className="bg-white rounded-3xl p-3 border border-[#E2E6DC] flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Right side in RTL: Search Input */}
        <div className="relative w-full md:w-[440px] lg:w-[480px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم العميل، رقم الحجز، العقار أو الوحدة..."
            className="w-full h-11 pe-4 ps-11 rounded-2xl bg-[#F0F4EC] border border-transparent text-xs text-[#172115] placeholder:text-[#7D8A78] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all placeholder:text-right"
          />
          <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Left side in RTL: Filter Button & Status Filter Tabs Container */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {/* Advanced Filter Button (Matching screenshot position) */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "h-10 px-4 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#34432E] text-white shadow-xs"
                : "bg-[#F0F4EC] hover:bg-[#E5EBDD] text-[#172115]"
            )}
            title="تصفية الحجوزات"
          >
            <span>فلتر</span>
            <SlidersHorizontal
              className={cn(
                "w-3.5 h-3.5",
                activeFiltersCount > 0 ? "text-white" : "text-[#172115]"
              )}
            />
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#34432E] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Status Filter Tabs Container */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F0F4EC] rounded-2xl overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: "all", label: `الكل (${statusCounts.all})` },
              { id: "upcoming", label: `القادمة (${statusCounts.upcoming})` },
              { id: "active", label: `الحالية (${statusCounts.active})` },
              { id: "completed", label: `المنتهية (${statusCounts.completed})` },
              { id: "cancelled", label: `الملغاة (${statusCounts.cancelled})` },
            ].map((tab) => {
              const isActive = filterStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilterStatus(tab.id as any);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-4 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer select-none",
                    isActive
                      ? "bg-white text-[#172115] font-bold shadow-2xs"
                      : "text-[#717E6E] hover:text-[#172115] font-medium"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bookings Data Table (Matching exact user design) */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-[#E2E6DC] text-[#7D8A78] text-xs font-bold bg-white">
                <th className="px-5 py-4 whitespace-nowrap text-right">رقم الحجز</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">العميل</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">العقار</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">الوحدة</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">تاريخ الوصول</th>
                <th className="px-4 py-4 whitespace-nowrap text-right">تاريخ المغادرة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">المصدر</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="leading-tight">
                    <div>المبلغ</div>
                    <div>والتحصيل</div>
                  </div>
                </th>
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
                paginatedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#F6F8F4]/70 transition-colors"
                  >
                    {/* 1. رقم الحجز */}
                    <td className="px-5 py-4 whitespace-nowrap font-medium text-xs sm:text-sm">
                      <Link
                        href={`/dashboard/bookings/${booking.id || "1"}`}
                        className="font-bold text-[#172115] hover:text-[#34432E] hover:underline"
                      >
                        {booking.bookingCode}
                      </Link>
                    </td>

                    {/* 2. العميل */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#D2DFC9] text-[#2E3C29] font-bold text-xs flex items-center justify-center shrink-0">
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
                      <div className="inline-flex items-center gap-1.5 bg-[#EFF3EA] border border-[#DFE4D8] px-3 py-1 rounded-full text-xs font-semibold text-[#172115]">
                        <span>{booking.source}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B5E34]" />
                      </div>
                    </td>

                    {/* 8. المبلغ والتحصيل */}
                    <td className="px-4 py-4 whitespace-nowrap text-right">
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
                        <span className="inline-flex items-center gap-1.5 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full">
                          <span>حالي</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        </span>
                      ) : booking.status === "upcoming" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EFF3EC] border border-[#DFE4DA] text-[#384633] text-xs font-bold px-3 py-1 rounded-full">
                          <span>قادم</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#384633]" />
                        </span>
                      ) : booking.status === "cancelled" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#FDE8E8] border border-[#F8C8C8] text-[#DC2626] text-xs font-bold px-3 py-1 rounded-full">
                          <span>ملغى</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#EFF2EB] border border-[#DFE4DA] text-[#717E6E] text-xs font-bold px-3 py-1 rounded-full">
                          <span>منتهي</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#717E6E]" />
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
                            onClick: () =>
                              router.push(
                                `/dashboard/bookings/${booking.bookingCode || booking.id || "BK-10482"}`
                              ),
                          },
                          {
                            label: "تعديل الحجز",
                            icon: CalendarCheck,
                            onClick: () =>
                              router.push(
                                `/dashboard/bookings/${booking.bookingCode || booking.id || "BK-10482"}/edit`
                              ),
                          },
                          {
                            label: "تمديد الإقامة",
                            icon: CalendarSync,
                            onClick: () => setSelectedBookingForExtend(booking),
                          },
                          {
                            label: "إلغاء الحجز",
                            icon: Trash2,
                            variant: "destructive",
                            onClick: () => setSelectedBookingForCancel(booking),
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
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalHeadlineCount}
          fromIndex={fromIndex}
          toIndex={toIndex}
          pageSize={rowsPerPage}
          pageSizeOptions={[5, 10, 20, 50]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setRowsPerPage(size);
            setCurrentPage(1);
          }}
          entityName="حجز"
          pluralEntityName="حجوزات"
          registeredLabel="مسجل"
        />
      </div>

      {/* 5. Modals for Booking Actions */}
      <ExtendStayModal
        isOpen={!!selectedBookingForExtend}
        onClose={() => setSelectedBookingForExtend(null)}
        bookingCode={selectedBookingForExtend?.bookingCode || "BK-10482"}
        onConfirm={() => {
          setSelectedBookingForExtend(null);
        }}
      />

      <CancelBookingModal
        isOpen={!!selectedBookingForCancel}
        onClose={() => setSelectedBookingForCancel(null)}
        bookingCode={selectedBookingForCancel?.bookingCode || "BK-10482"}
        onConfirm={() => {
          setSelectedBookingForCancel(null);
        }}
      />

      {/* 6. Filter Drawer */}
      <OwnerBookingsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={bookingFilters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredBookings.length}
      />
    </div>
  );
}
