"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Building2,
  SlidersHorizontal,
  Eye,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  OwnerPropertiesFilterDrawer,
  PropertyFilterState,
} from "./owner-properties-filter-drawer";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TableDateCell } from "@/components/shared/table-date-cell";
import { TablePagination } from "@/components/shared/table-pagination";
import { motion } from "motion/react";

// Exact Figma SVG Vector: Smart Pass / Ticket Icon (viewBox 0 0 10 14.6667)
function SmartPassIcon({ className = "w-2.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 14.6667"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.33333 14.6667C0.966667 14.6667 0.652778 14.5361 0.391667 14.275C0.130556 14.0139 0 13.7 0 13.3333V1.33333C0 0.966667 0.130556 0.652778 0.391667 0.391667C0.652778 0.130556 0.966667 0 1.33333 0H8C8.36667 0 8.68056 0.130556 8.94167 0.391667C9.20278 0.652778 9.33333 0.966667 9.33333 1.33333V3.4C9.53333 3.47778 9.69444 3.6 9.81667 3.76667C9.93889 3.93333 10 4.12222 10 4.33333V5.66667C10 5.87778 9.93889 6.06667 9.81667 6.23333C9.69444 6.4 9.53333 6.52222 9.33333 6.6V13.3333C9.33333 13.7 9.20278 14.0139 8.94167 14.275C8.68056 14.5361 8.36667 14.6667 8 14.6667H1.33333V14.6667M1.33333 13.3333H8V1.33333H1.33333V13.3333ZM2.66667 10H6.66667C6.85556 10 7.01389 9.93611 7.14167 9.80833C7.26944 9.68056 7.33333 9.52222 7.33333 9.33333V8C7.14444 8 6.98611 7.93611 6.85833 7.80833C6.73056 7.68056 6.66667 7.52222 6.66667 7.33333C6.66667 7.14444 6.73056 6.98611 6.85833 6.85833C6.98611 6.73056 7.14444 6.66667 7.33333 6.66667V5.33333C7.33333 5.14444 7.26944 4.98611 7.14167 4.85833C7.01389 4.73056 6.85556 4.66667 6.66667 4.66667H2.66667C2.47778 4.66667 2.31944 4.73056 2.19167 4.85833C2.06389 4.98611 2 5.14444 2 5.33333V6.66667C2.18889 6.66667 2.34722 6.73056 2.475 6.85833C2.60278 6.98611 2.66667 7.14444 2.66667 7.33333C2.66667 7.52222 2.60278 7.68056 2.475 7.80833C2.34722 7.93611 2.18889 8 2 8V9.33333C2 9.52222 2.06389 9.68056 2.19167 9.80833C2.31944 9.93611 2.47778 10 2.66667 10ZM4.66667 9C4.57778 9 4.5 8.96667 4.43333 8.9C4.36667 8.83333 4.33333 8.75556 4.33333 8.66667C4.33333 8.57778 4.36667 8.5 4.43333 8.43333C4.5 8.36667 4.57778 8.33333 4.66667 8.33333C4.75556 8.33333 4.83333 8.36667 4.9 8.43333C4.96667 8.5 5 8.57778 5 8.66667C5 8.75556 4.96667 8.83333 4.9 8.9C4.83333 8.96667 4.75556 9 4.66667 9ZM4.66667 7.66667C4.57778 7.66667 4.5 7.63333 4.43333 7.56667C4.36667 7.5 4.33333 7.42222 4.33333 7.33333C4.33333 7.24444 4.36667 7.16667 4.43333 7.1C4.5 7.03333 4.57778 7 4.66667 7C4.75556 7 4.83333 7.03333 4.9 7.1C4.96667 7.16667 5 7.24444 5 7.33333C5 7.42222 4.96667 7.5 4.9 7.56667C4.83333 7.63333 4.75556 7.66667 4.66667 7.66667ZM4.66667 6.33333C4.57778 6.33333 4.5 6.3 4.43333 6.23333C4.36667 6.16667 4.33333 6.08889 4.33333 6C4.33333 5.91111 4.36667 5.83333 4.43333 5.76667C4.5 5.7 4.57778 5.66667 4.66667 5.66667C4.75556 5.66667 4.83333 5.7 4.9 5.76667C4.96667 5.83333 5 5.91111 5 6C5 6.08889 4.96667 6.16667 4.9 6.23333C4.83333 6.3 4.75556 6.33333 4.66667 6.33333Z" />
    </svg>
  );
}

// Exact Figma SVG Vector: Clock Icon (viewBox 0 0 11.6667 11.6667)
function ClockIcon({ className = "w-3.5 h-3.5 text-[#768071]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 11.6667 11.6667"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.75833 8.575L8.575 7.75833L6.41667 5.6V2.91667H5.25V6.06667L7.75833 8.575M5.83333 11.6667C5.02639 11.6667 4.26806 11.5135 3.55833 11.2073C2.84861 10.901 2.23125 10.4854 1.70625 9.96042C1.18125 9.43542 0.765625 8.81806 0.459375 8.10833C0.153125 7.39861 0 6.64028 0 5.83333C0 5.02639 0.153125 4.26806 0.459375 3.55833C0.765625 2.84861 1.18125 2.23125 1.70625 1.70625C2.23125 1.18125 2.84861 0.765625 3.55833 0.459375C4.26806 0.153125 5.02639 0 5.83333 0C6.64028 0 7.39861 0.153125 8.10833 0.459375C8.81806 0.765625 9.43542 1.18125 9.96042 1.70625C10.4854 2.23125 10.901 2.84861 11.2073 3.55833C11.5135 4.26806 11.6667 5.02639 11.6667 5.83333C11.6667 6.64028 11.5135 7.39861 11.2073 8.10833C10.901 8.81806 10.4854 9.43542 9.96042 9.96042C9.43542 10.4854 8.81806 10.901 8.10833 11.2073C7.39861 11.5135 6.64028 11.6667 5.83333 11.6667M5.83333 10.5C7.12639 10.5 8.22743 10.0455 9.13646 9.13646C10.0455 8.22743 10.5 7.12639 10.5 5.83333C10.5 4.54028 10.0455 3.43924 9.13646 2.53021C8.22743 1.62118 7.12639 1.16667 5.83333 1.16667C4.54028 1.16667 3.43924 1.62118 2.53021 2.53021C1.62118 3.43924 1.16667 4.54028 1.16667 5.83333C1.16667 7.12639 1.62118 8.22743 2.53021 9.13646C3.43924 10.0455 4.54028 10.5 5.83333 10.5Z" />
    </svg>
  );
}

// Exact Figma SVG Vector: Horizontal 3 Dots Icon (viewBox 0 0 12 3)
function ThreeDotsHorizontalIcon({ className = "w-3 h-1 text-[#768071]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 3"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.5" />
      <circle cx="6" cy="1.5" r="1.5" />
      <circle cx="10.5" cy="1.5" r="1.5" />
    </svg>
  );
}

export interface OwnerPropertyItem {
  id: string;
  name: string;
  district: string;
  city: string;
  unitsCount: number;
  activeBookingsCount: number;
  status: "reserved" | "available";
  lastUpdated: string;
  relativeTime?: string;
  image: string;
}

const defaultOwnerProperties: OwnerPropertyItem[] = [
  {
    id: "prop-1",
    name: "عمارة النخيل",
    district: "حي النخيل، الرياض",
    city: "الرياض",
    unitsCount: 12,
    activeBookingsCount: 10,
    status: "reserved",
    lastUpdated: "16 سبتمبر 2026",
    relativeTime: "منذ ساعتين",
    image: "/properties/nakheel.png",
  },
  {
    id: "prop-2",
    name: "مجمع الواحة الفندقي",
    district: "حي الشاطئ، جدة",
    city: "جدة",
    unitsCount: 12,
    activeBookingsCount: 10,
    status: "reserved",
    lastUpdated: "16 سبتمبر 2026",
    relativeTime: "منذ ساعتين",
    image: "/properties/oasis.png",
  },
  {
    id: "prop-3",
    name: "أبراج العقيق السكنية",
    district: "حي العقيق، الرياض",
    city: "الرياض",
    unitsCount: 12,
    activeBookingsCount: 10,
    status: "available",
    lastUpdated: "16 سبتمبر 2026",
    relativeTime: "منذ ساعتين",
    image: "/properties/aqeeq.png",
  },
  {
    id: "prop-4",
    name: "عمارة النخيل (الملحق)",
    district: "حي النخيل، الرياض",
    city: "الرياض",
    unitsCount: 12,
    activeBookingsCount: 10,
    status: "reserved",
    lastUpdated: "16 سبتمبر 2026",
    relativeTime: "منذ ساعتين",
    image: "/properties/nakheel.png",
  },
];

interface OwnerPropertiesTabViewProps {
  properties?: OwnerPropertyItem[];
}

export function OwnerPropertiesTabView({
  properties = defaultOwnerProperties,
}: OwnerPropertiesTabViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "reserved">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [propertyFilters, setPropertyFilters] = useState<PropertyFilterState>({
    city: "all",
    status: "all",
    unitsRange: "all",
    sortBy: "default",
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (propertyFilters.city !== "all") count++;
    if (propertyFilters.unitsRange !== "all") count++;
    if (propertyFilters.sortBy !== "default") count++;
    return count;
  }, [propertyFilters]);

  const counts = useMemo(() => {
    const available = properties.filter((p) => p.status === "available").length;
    const reserved = properties.filter((p) => p.status === "reserved").length;
    return {
      all: properties.length,
      available,
      reserved,
    };
  }, [properties]);

  const handleQuickStatusChange = (status: "all" | "available" | "reserved") => {
    setStatusFilter(status);
    setPropertyFilters((prev) => ({ ...prev, status }));
  };

  const handleApplyFilters = (newFilters: PropertyFilterState) => {
    setPropertyFilters(newFilters);
    if (newFilters.status !== "all") {
      setStatusFilter(newFilters.status as "available" | "reserved");
    } else {
      setStatusFilter("all");
    }
  };

  const handleResetFilters = () => {
    setPropertyFilters({
      city: "all",
      status: "all",
      unitsRange: "all",
      sortBy: "default",
    });
    setStatusFilter("all");
  };

  const filteredProperties = useMemo(() => {
    const list = properties.filter((item) => {
      // Status filter
      if (statusFilter === "available" && item.status !== "available") return false;
      if (statusFilter === "reserved" && item.status !== "reserved") return false;

      // City filter
      if (propertyFilters.city !== "all" && item.city !== propertyFilters.city) return false;

      // Units range filter
      if (propertyFilters.unitsRange === "less10" && item.unitsCount >= 10) return false;
      if (
        propertyFilters.unitsRange === "10-20" &&
        (item.unitsCount < 10 || item.unitsCount > 20)
      )
        return false;
      if (propertyFilters.unitsRange === "more20" && item.unitsCount <= 20) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDistrict = item.district.toLowerCase().includes(q);
        const matchesCity = item.city.toLowerCase().includes(q);
        if (!matchesName && !matchesDistrict && !matchesCity) return false;
      }

      return true;
    });

    // Sorting
    if (propertyFilters.sortBy === "units_desc") {
      return [...list].sort((a, b) => b.unitsCount - a.unitsCount);
    }
    if (propertyFilters.sortBy === "bookings_desc") {
      return [...list].sort((a, b) => b.activeBookingsCount - a.activeBookingsCount);
    }
    if (propertyFilters.sortBy === "name_asc") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name, "ar"));
    }

    return list;
  }, [properties, statusFilter, propertyFilters, searchQuery]);

  const totalFiltered = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + pageSize);
  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  return (
    <div className="space-y-4">
      {/* 1. Top Action Buttons Bar (Left in RTL: justify-end) */}
      <div className="flex items-center justify-end gap-3">
        {/* Secondary Action: عرض جميع العقارات في المنصة */}
        <Link
          href="/dashboard/properties"
          className="bg-white hover:bg-[#F6F8F4] text-[#4A5745] border border-[#E2E6DC] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors"
        >
          <Globe className="w-4 h-4 text-[#7D8A78]" />
          <span>عرض جميع العقارات في المنصة</span>
        </Link>

        {/* Primary Action: إضافة عقار للمالك */}
        <Link
          href="/dashboard/properties/new"
          className="bg-[#2E3C29] hover:bg-[#232F1F] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <Building2 className="w-4 h-4" />
          <span>+ إضافة عقار للمالك</span>
        </Link>
      </div>

      {/* 2. Filter & Search Bar: Search on the Right (first in RTL), Filters on the Left (second in RTL) */}
      <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-[#E0E4D8]/60 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        {/* Search Input (Right in RTL) */}
        <div className="relative w-full md:w-96 lg:w-[440px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم العقار أو الحي..."
            className="w-full h-10 pe-4 ps-11 rounded-2xl bg-[#F1F5EB] border border-transparent text-xs text-[#172115] placeholder:text-[#8D9B88] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all shadow-2xs"
          />
          <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Filter Button & Tabs Section (Left in RTL) */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {/* Advanced Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "h-10 px-4 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#34432E] text-white shadow-xs"
                : "bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#172115]"
            )}
            title="تصفية العقارات"
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

          {/* Filter Tabs Container */}
          <div className="flex items-center gap-1 p-1 bg-[#F1F5EB] rounded-2xl overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: `الكل (${counts.all})` },
              { id: "available", label: `متاحة (${counts.available})` },
              { id: "reserved", label: `محجوزة (${counts.reserved})` },
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleQuickStatusChange(tab.id as any)}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-xl text-xs whitespace-nowrap cursor-pointer select-none transition-colors duration-200",
                    isActive
                      ? "text-[#172115] font-bold"
                      : "text-[#7A8574] hover:text-[#172115] font-medium"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="ownerPropertiesFilterPill"
                      className="absolute inset-0 bg-white rounded-xl shadow-xs z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Properties Data Table */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-[#E2E6DC] text-[#7D8A78] text-xs font-bold">
                <th className="px-5 py-4 whitespace-nowrap">اسم العقار والحي</th>
                <th className="px-4 py-4 whitespace-nowrap">المدينة</th>
                <th className="px-4 py-4 whitespace-nowrap">عدد الوحدات</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">الحجوزات الحالية</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">الحالة</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">اخر تحديث</th>
                <th className="px-5 py-4 whitespace-nowrap text-center">الاجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#7D8A78] text-xs font-medium">
                    لا توجد عقارات مطابقة لمعايير البحث
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="hover:bg-[#F6F8F4]/70 transition-colors group"
                  >
                    {/* 1. اسم العقار والحي */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#E2E6DC] bg-[#EEF2E6]">
                          <Image
                            src={property.image}
                            alt={property.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#172115]">
                            {property.name}
                          </div>
                          <div className="text-xs text-[#7D8A78] mt-0.5">
                            {property.district}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. المدينة */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs sm:text-[13px] font-medium text-[#252A24]">
                        {property.city}
                      </span>
                    </td>

                    {/* 3. عدد الوحدات */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs sm:text-[13px] font-medium text-[#555C50]">
                        {property.unitsCount} وحدة
                      </span>
                    </td>

                    {/* 4. الحجوزات الحالية (Figma node 1:2361 & Screenshot) */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex flex-col items-center justify-center bg-[#F2F5F0] rounded-[14px] px-3.5 py-1.5 select-none text-[#34422A] min-w-[76px]">
                        <span className="font-bold text-xs leading-tight">
                          {property.activeBookingsCount}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <SmartPassIcon className="w-2.5 h-3.5 shrink-0 text-[#34422A]" />
                          <div className="flex flex-col text-right leading-[13px] text-[11px] font-bold">
                            <span>حجوزات</span>
                            <span>نشطة</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 5. الحالة (Figma node 1:2372 & Screenshot) */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {property.status === "reserved" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#E3F2FD] border border-[#BBDEFB]/60 text-[#1976D2] text-xs font-semibold px-3 py-1 rounded-full select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1976D2] shrink-0" />
                          <span>محجوزة</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] border border-[#C8E6C9]/60 text-[#2E7D32] text-xs font-semibold px-3 py-1 rounded-full select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0" />
                          <span>متاحة</span>
                        </span>
                      )}
                    </td>

                    {/* 6. اخر تحديث (Figma node 1:2366 & Screenshot) */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1.5 text-[#768071] select-none">
                        <ClockIcon className="w-3.5 h-3.5 shrink-0 text-[#768071]" />
                        <div className="flex flex-col text-right leading-tight text-xs font-normal">
                          <span>منذ</span>
                          <span>ساعتين</span>
                        </div>
                      </div>
                    </td>

                    {/* 7. الاجراءات (Figma node 1:2375 & Screenshot) */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/dashboard/properties/${property.id}`}
                          className="bg-[#F2F5F0] hover:bg-[#EAEFE6] text-[#1E251B] rounded-xl px-3 py-1.5 text-center font-bold text-xs leading-tight transition-colors cursor-pointer inline-flex flex-col items-center justify-center select-none"
                        >
                          <span>عرض</span>
                          <span>العقار</span>
                        </Link>
                        <ActionDropdown
                          triggerIcon={<ThreeDotsHorizontalIcon className="w-3 h-1 text-[#768071]" />}
                          triggerClassName="w-7 h-7 rounded-lg hover:bg-[#F2F5F0] text-[#768071] inline-flex items-center justify-center transition-all cursor-pointer select-none"
                          items={[
                            {
                              label: "تفاصيل العقار",
                              icon: Eye,
                              href: `/dashboard/properties/${property.id}`,
                            },
                            {
                              label: "تعديل بيانات العقار",
                              icon: SlidersHorizontal,
                              onClick: () =>
                                toast.info(`تعديل بيانات: ${property.name}`),
                            },
                            {
                              label: "عقود ووحدات العقار",
                              icon: Building2,
                              href: `/dashboard/properties/${property.id}`,
                            },
                            {
                              label: "تعطيل العقار",
                              icon: Trash2,
                              variant: "destructive",
                              onClick: () =>
                                toast.error(`تم تعطيل العقار: ${property.name}`),
                            },
                          ]}
                        />
                      </div>
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
          totalCount={properties.length}
          fromIndex={fromIndex}
          toIndex={toIndex}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          entityName="عقار"
          pluralEntityName="عقارات"
          registeredLabel="مسجل"
        />
      </div>

      {/* 5. Advanced Filter Drawer for Properties */}
      <OwnerPropertiesFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={propertyFilters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        totalResultsCount={filteredProperties.length}
      />
    </div>
  );
}
