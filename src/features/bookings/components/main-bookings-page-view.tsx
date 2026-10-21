"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Download,
  Copy,
  Check,
  Eye,
  CalendarSync,
  ArrowRightLeft,
  Trash2,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { ExtendStayModal } from "@/features/bookings/components/extend-stay-modal";
import { CancelBookingModal } from "@/features/bookings/components/cancel-booking-modal";
import { ChangeUnitModal } from "@/features/bookings/components/change-unit-modal";
import { BookingsAdvancedFilterDrawer } from "./bookings-advanced-filter-drawer";
import { MainBookingItem, BookingStatus, MainBookingFilterState, initialBookingFilterState } from "../types";
import { defaultMainBookings } from "../data/mock-main-bookings";

interface MainBookingsPageViewProps {
  initialBookings?: MainBookingItem[];
}

export function MainBookingsPageView({
  initialBookings = defaultMainBookings,
}: MainBookingsPageViewProps) {
  const router = useRouter();
  const [bookings, setBookings] = useState<MainBookingItem[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | BookingStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Advanced Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [bookingFilters, setBookingFilters] = useState<MainBookingFilterState>(initialBookingFilterState);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (bookingFilters.status !== "all") count++;
    if (bookingFilters.source !== "all") count++;
    if (bookingFilters.propertyName !== "all") count++;
    if (bookingFilters.unitType !== "all") count++;
    if (bookingFilters.paymentStatus !== "all") count++;
    if (bookingFilters.amountRange !== "all") count++;
    if (bookingFilters.stayDuration !== "all") count++;
    if (bookingFilters.sortBy !== "default") count++;
    return count;
  }, [bookingFilters]);

  // Modals state
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isChangeUnitModalOpen, setIsChangeUnitModalOpen] = useState(false);
  const [selectedBookingCode, setSelectedBookingCode] = useState<string>("BK-10482");

  // Tab counts based on initial/all bookings
  const statusCounts = useMemo(() => {
    return {
      all: bookings.length,
      upcoming: bookings.filter((b) => b.status === "upcoming").length,
      active: bookings.filter((b) => b.status === "active").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };
  }, [bookings]);

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    let list = bookings;

    // Status tab filter
    if (filterStatus !== "all") {
      list = list.filter((b) => b.status === filterStatus);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.bookingCode.toLowerCase().includes(q) ||
          b.guest.name.toLowerCase().includes(q) ||
          b.guest.phone.toLowerCase().includes(q) ||
          b.propertyName.toLowerCase().includes(q) ||
          b.unit.unitNumber.toLowerCase().includes(q) ||
          b.unit.unitType.toLowerCase().includes(q) ||
          b.source.toLowerCase().includes(q)
      );
    }

    // Advanced Drawer filters
    // 1. Status inside drawer
    if (bookingFilters.status !== "all") {
      list = list.filter((b) => b.status === bookingFilters.status);
    }

    // 2. Source
    if (bookingFilters.source !== "all") {
      list = list.filter((b) =>
        b.source.toLowerCase().includes(bookingFilters.source.toLowerCase())
      );
    }

    // 3. Property
    if (bookingFilters.propertyName !== "all") {
      list = list.filter((b) =>
        b.propertyName.includes(bookingFilters.propertyName)
      );
    }

    // 4. Unit Type
    if (bookingFilters.unitType !== "all") {
      list = list.filter((b) =>
        b.unit.unitType.includes(bookingFilters.unitType)
      );
    }

    // 5. Payment Status
    if (bookingFilters.paymentStatus !== "all") {
      list = list.filter((b) =>
        b.amount.paymentStatus.includes(bookingFilters.paymentStatus)
      );
    }

    // 6. Amount Range
    if (bookingFilters.amountRange !== "all") {
      list = list.filter((b) => {
        const num = parseFloat(b.amount.total.replace(/[^0-9.]/g, "")) || 0;
        if (bookingFilters.amountRange === "less1000") return num < 1000;
        if (bookingFilters.amountRange === "1000-3000") return num >= 1000 && num <= 3000;
        if (bookingFilters.amountRange === "more3000") return num > 3000;
        return true;
      });
    }

    // 7. Stay Duration
    if (bookingFilters.stayDuration !== "all") {
      list = list.filter((b) => {
        const nights = parseInt(b.checkOut.nights.replace(/[^0-9]/g, "")) || 1;
        if (bookingFilters.stayDuration === "1-2") return nights <= 2;
        if (bookingFilters.stayDuration === "3-7") return nights >= 3 && nights <= 7;
        if (bookingFilters.stayDuration === "more7") return nights > 7;
        return true;
      });
    }

    // Sort
    if (bookingFilters.sortBy === "code_asc") {
      list = [...list].sort((a, b) => a.bookingCode.localeCompare(b.bookingCode));
    } else if (bookingFilters.sortBy === "amount_desc") {
      list = [...list].sort((a, b) => {
        const aNum = parseFloat(a.amount.total.replace(/[^0-9.]/g, "")) || 0;
        const bNum = parseFloat(b.amount.total.replace(/[^0-9.]/g, "")) || 0;
        return bNum - aNum;
      });
    } else if (bookingFilters.sortBy === "amount_asc") {
      list = [...list].sort((a, b) => {
        const aNum = parseFloat(a.amount.total.replace(/[^0-9.]/g, "")) || 0;
        const bNum = parseFloat(b.amount.total.replace(/[^0-9.]/g, "")) || 0;
        return aNum - bNum;
      });
    } else if (bookingFilters.sortBy === "date_asc") {
      list = [...list].sort((a, b) => a.id.localeCompare(b.id));
    } else if (bookingFilters.sortBy === "date_desc") {
      list = [...list].sort((a, b) => b.id.localeCompare(a.id));
    }

    return list;
  }, [bookings, filterStatus, searchQuery, bookingFilters]);

  const totalFiltered = filteredBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage);

  // Copy booking code
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`تم نسخ رقم الحجز (${code})`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // CSV Export
  const handleExportCSV = () => {
    try {
      const headers = [
        "رقم الحجز",
        "اسم العميل",
        "رقم الهاتف",
        "العقار",
        "الوحدة",
        "تاريخ الوصول",
        "تاريخ المغادرة",
        "المصدر",
        "المبلغ الإجمالي",
        "حالة الحجز",
      ];
      const rows = filteredBookings.map((b) => [
        b.bookingCode,
        b.guest.name,
        b.guest.phone,
        b.propertyName,
        `${b.unit.unitNumber} (${b.unit.unitType})`,
        b.checkIn.date,
        b.checkOut.date,
        b.source,
        b.amount.total,
        b.statusLabel,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8,\uFEFF" +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `قائمة_الحجوزات_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("تم تصدير قائمة الحجوزات بنجاح");
    } catch {
      toast.error("حدث خطأ أثناء تصدير القائمة");
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. TOP HERO GREETING BAR (Matching Figma node 1:6557) */}
      <div className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5e8e2]/60 px-6 sm:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Right Info */}
        <div>
          <h1 className="text-[24px] font-bold text-[#181d17] leading-[34px]">
            الحجوزات
          </h1>
          <p className="text-[14px] font-normal text-[#454840] leading-[22px] mt-0.5">
            إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة.
          </p>
        </div>

        {/* Left Action Group */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Add Booking Primary Action */}
          <Link
            href="/dashboard/bookings/new"
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white text-[14px] font-semibold h-[44px] px-[20px] sm:px-[24px] rounded-[12px] flex items-center justify-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة حجز</span>
          </Link>

          {/* Export Secondary Action */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="bg-white hover:bg-[#f6f7f4] border border-[#e5e8e2] text-[#181d17] text-[14px] font-medium h-[44px] px-[16px] rounded-[12px] flex items-center justify-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>تصدير القائمة (CSV / Excel)</span>
            <Download className="w-4 h-4 text-[#181d17]" />
          </button>
        </div>
      </div>

      {/* 2. SEARCH & STATUS FILTER BAR (Matching Figma node 1:6577) */}
      <div className="bg-white border border-[#e5e8e2] rounded-[16px] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)] px-5 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Right in RTL: Search Input with Magnifier on Far Right */}
        <div className="relative w-full lg:w-[480px]">
          <div className="bg-[#f6f7f4] rounded-[12px] h-[36px] flex items-center px-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="ابحث باسم العميل، رقم الحجز، العقار أو الوحدة..."
              className="w-full bg-transparent text-[12px] text-[#252a24] placeholder:text-[rgba(115,120,111,0.7)] pe-7 focus:outline-none placeholder:text-right font-medium"
            />
            <div className="absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(115,120,111,0.7)]">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Left in RTL: Filter Button & Status Filter Tabs */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto flex-wrap">
          {/* Advanced Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "h-[36px] px-3.5 rounded-[12px] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#34432E] text-white shadow-xs"
                : "bg-[#f6f7f4] hover:bg-[#e5ebd8] text-[#252a24]"
            )}
            title="تصفية الحجوزات"
          >
            {activeFiltersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#4b5940]" />
            )}
            <span>فلتر</span>
            <SlidersHorizontal
              className={cn(
                "w-3.5 h-3.5",
                activeFiltersCount > 0 ? "text-white" : "text-[#252a24]"
              )}
            />
          </button>

          {/* Segmented Status Tabs Container (Figma node 1:6585) */}
          <div className="bg-[#f6f7f4] p-[4px] rounded-[12px] flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: `الكل (${statusCounts.all})` },
              { id: "upcoming", label: `القادمة (${statusCounts.upcoming})` },
              { id: "active", label: `الحالية(${statusCounts.active})` },
              { id: "completed", label: `المنتهية(${statusCounts.completed})` },
              { id: "cancelled", label: `الملغاة (${statusCounts.cancelled})` },
            ].map((tab) => {
              const isActive = filterStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilterStatus(tab.id as "all" | BookingStatus);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "text-[12px] px-3.5 py-1 rounded-[8px] transition-all font-semibold cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-white text-[#252a24] shadow-xs"
                      : "text-[#73786f] hover:text-[#252a24]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. HIGH-FIDELITY TABLE CONTAINER (Matching Figma node 1:6597) */}
      <div className="bg-white border border-[#e5e8e2] rounded-[16px] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#f9faf8] border-b border-[#e5e8e2] h-[52px]">
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  رقم الحجز
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  العميل
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  العقار
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  الوحدة
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  تاريخ الوصول
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  تاريخ المغادرة
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  المصدر
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  المبلغ والتحصيل
                </th>
                <th className="px-5 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap">
                  الحالة
                </th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#73786f] tracking-[0.55px] uppercase whitespace-nowrap text-center">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e8e2]/70 text-[14px]">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-[#73786f]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-semibold text-[15px] text-[#181d17]">
                        لا توجد حجوزات مطابقة
                      </p>
                      <p className="text-xs text-[#75786f]">
                        جرب تغيير معايير البحث أو تصفية الحالات
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-[#f9faf8]/60 transition-colors group"
                  >
                    {/* Booking Code with Quick Copy */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyCode(booking.bookingCode)}
                          className="opacity-0 group-hover:opacity-100 text-[#73786f] hover:text-[#34422a] transition-all cursor-pointer p-0.5"
                          title="نسخ رقم الحجز"
                        >
                          {copiedCode === booking.bookingCode ? (
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Link
                          href={`/dashboard/bookings/${booking.id}`}
                          className="font-semibold text-[12px] text-[#34422a] hover:underline"
                        >
                          {booking.bookingCode}
                        </Link>
                      </div>
                    </td>

                    {/* Guest with Avatar Circle */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#d8e8cb] text-[#121f0d] font-bold text-xs size-8 rounded-full flex items-center justify-center shrink-0">
                          {booking.guest.avatarLetter}
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="font-bold text-[14px] text-[#181d17] leading-[20px]">
                            {booking.guest.name}
                          </span>
                          <span className="text-[11px] font-medium text-[#75786f] leading-[16px] dir-ltr text-right">
                            {booking.guest.phone}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-medium text-[14px] text-[#181d17] leading-[22px]">
                        {booking.propertyName}
                      </span>
                    </td>

                    {/* Unit */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-semibold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.unit.unitNumber}
                        </span>
                        <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                          {booking.unit.unitType}
                        </span>
                      </div>
                    </td>

                    {/* Check-in Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-semibold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.checkIn.date}
                        </span>
                        <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                          {booking.checkIn.time}
                        </span>
                      </div>
                    </td>

                    {/* Check-out Date */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-semibold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.checkOut.date}
                        </span>
                        <span className="text-[11px] font-medium text-[#54624c] leading-[16px]">
                          {booking.checkOut.nights}
                        </span>
                      </div>
                    </td>

                    {/* Booking Source Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="bg-[#ebefe6] px-2.5 py-1 rounded-[6px] inline-flex items-center gap-1.5">
                        <span className="font-semibold text-[11px] text-[#181d17]">
                          {booking.source}
                        </span>
                        <span className="size-2 rounded-full bg-[#4b5940]" />
                      </div>
                    </td>

                    {/* Amount & Payment Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-right">
                        <span className="font-bold text-[14px] text-[#181d17] leading-[22px]">
                          {booking.amount.total}
                        </span>
                        <span className="text-[11px] font-medium text-[#54624c] leading-[16px]">
                          {booking.amount.paymentStatus}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {booking.status === "upcoming" && (
                        <div className="bg-[#e5eae0] text-[#34422a] text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>قادم</span>
                          <span className="size-2 rounded-full bg-[#34422a]" />
                        </div>
                      )}
                      {booking.status === "active" && (
                        <div className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>حالي</span>
                          <span className="size-2 rounded-full bg-[#34422a]" />
                        </div>
                      )}
                      {booking.status === "completed" && (
                        <div className="bg-[#e5eae0] text-[#454840] text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>منتهي</span>
                          <span className="size-2 rounded-full bg-[#75786f]" />
                        </div>
                      )}
                      {booking.status === "cancelled" && (
                        <div className="bg-[#ffdad6] text-[#93000a] text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                          <span>ملغى</span>
                          <span className="size-2 rounded-full bg-[#ba1a1a]" />
                        </div>
                      )}
                    </td>

                    {/* Actions Menu */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <ActionDropdown
                        items={[
                          {
                            label: "عرض التفاصيل",
                            icon: Eye,
                            onClick: () => router.push(`/dashboard/bookings/${booking.id}`),
                          },
                          {
                            label: "تمديد الإقامة",
                            icon: CalendarSync,
                            onClick: () => {
                              setSelectedBookingCode(booking.bookingCode);
                              setIsExtendModalOpen(true);
                            },
                          },
                          {
                            label: "تغيير الوحدة",
                            icon: ArrowRightLeft,
                            onClick: () => {
                              setSelectedBookingCode(booking.bookingCode);
                              setIsChangeUnitModalOpen(true);
                            },
                          },
                          {
                            label: "إلغاء الحجز",
                            icon: Trash2,
                            variant: "destructive",
                            onClick: () => {
                              setSelectedBookingCode(booking.bookingCode);
                              setIsCancelModalOpen(true);
                            },
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

        {/* 4. TABLE FOOTER / PAGINATION CONTROLS (Matching Figma node 1:6886 & 1:6916) */}
        <div className="bg-[#f9faf8] border-t border-[#e5e8e2] px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px]">
          {/* Right in RTL: Records summary and rows per page */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Records summary text */}
            <div className="flex items-center gap-1 text-[13px] text-[#75786f]">
              <span>عرض</span>
              <span className="font-semibold text-[#181d17]">{startIndex + 1}</span>
              <span>إلى</span>
              <span className="font-semibold text-[#181d17]">
                {Math.min(startIndex + rowsPerPage, totalFiltered)}
              </span>
              <span>من أصل</span>
              <span className="font-semibold text-[#181d17]">842</span>
              <span>حجز مسجل</span>
            </div>

            {/* Rows per page selector */}
            <div className="border-r border-[#e5e7eb] pr-4 flex items-center gap-2">
              <span className="text-[11px] font-medium text-[#54624c]">
                الصفوف لكل صفحة:
              </span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-[#e5e8e2] rounded-[8px] px-2.5 py-1 text-[#181d17] font-semibold text-[12px] focus:outline-none focus:ring-1 focus:ring-[#4b5940]/40 cursor-pointer"
              >
                <option value={10}>10 حجوزات</option>
                <option value={20}>20 حجزاً</option>
                <option value={50}>50 حجزاً</option>
              </select>
            </div>
          </div>

          {/* Left in RTL: Pagination Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Previous Button (Next in logical LTR, Previous in logical RTL) */}
            <button
              type="button"
              disabled={activePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="bg-white border border-[#e5e8e2] rounded-[8px] px-3 py-1.5 text-[#181d17] text-[12px] flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f6f7f4] transition-colors cursor-pointer"
            >
              <span>السابق</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#a0a59c]" />
            </button>

            {/* Active Page Indicator */}
            <button
              type="button"
              className="bg-[#eaf1e8] border border-[#d6ded4] rounded-[8px] px-3.5 py-1 font-bold text-[#4b5940] text-[12px]"
            >
              {activePage}
            </button>

            {/* Next Button */}
            <button
              type="button"
              disabled={activePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="bg-white border border-[#e5e8e2] rounded-[8px] px-3 py-1.5 text-[#181d17] text-[12px] flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f6f7f4] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#a0a59c]" />
              <span>التالي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ExtendStayModal
        isOpen={isExtendModalOpen}
        onClose={() => setIsExtendModalOpen(false)}
        bookingCode={selectedBookingCode}
        onConfirm={() => {
          setIsExtendModalOpen(false);
          toast.success("تم تقديم طلب تمديد الإقامة بنجاح");
        }}
      />

      <ChangeUnitModal
        isOpen={isChangeUnitModalOpen}
        onClose={() => setIsChangeUnitModalOpen(false)}
        bookingCode={selectedBookingCode}
        onConfirm={(newUnit) => {
          setIsChangeUnitModalOpen(false);
          toast.success(`تم تغيير الوحدة إلى (${newUnit}) بنجاح`);
        }}
      />

      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        bookingCode={selectedBookingCode}
        onConfirm={() => {
          setIsCancelModalOpen(false);
          setBookings((prev) =>
            prev.map((b) =>
              b.bookingCode === selectedBookingCode
                ? { ...b, status: "cancelled", statusLabel: "ملغى" }
                : b
            )
          );
          toast.success("تم إلغاء الحجز بنجاح");
        }}
      />

      {/* Filter Drawer */}
      <BookingsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={bookingFilters}
        onApplyFilters={(f) => {
          setBookingFilters(f);
          setIsFilterDrawerOpen(false);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setBookingFilters(initialBookingFilterState);
          setIsFilterDrawerOpen(false);
          setCurrentPage(1);
        }}
        totalResultsCount={totalFiltered}
      />
    </div>
  );
}
