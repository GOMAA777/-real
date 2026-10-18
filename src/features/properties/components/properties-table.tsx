"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Building2, MapPin, MoreVertical, ChevronRight, ChevronLeft, ChevronDown, Eye, SlidersHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Property, PropertyStatus } from "../types";
import { PropertiesFilters } from "./properties-filters";
import { OwnerPropertiesFilterDrawer, PropertyFilterState } from "@/features/owners/components/owner-properties-filter-drawer";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { TableDateCell } from "@/components/shared/table-date-cell";

const initialProperties: Property[] = [
  {
    id: "1",
    title: "عمارة النخيل",
    type: "عقار سكني وتأجير مؤقت",
    code: "#014",
    ownerName: "محمد العتيبي",
    ownerInitials: "مع",
    ownerEmail: "m.otaibi@domain.sa",
    city: "الرياض،",
    district: "حي النخيل",
    totalUnits: 12,
    occupiedUnits: 10,
    availableUnits: 2,
    activeBookings: 8,
    dateAdded: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "2",
    title: "عمارة النخيل",
    type: "عقار سكني وتأجير مؤقت",
    code: "#014",
    ownerName: "محمد العتيبي",
    ownerInitials: "مع",
    ownerEmail: "m.otaibi@domain.sa",
    city: "الرياض،",
    district: "حي النخيل",
    totalUnits: 12,
    occupiedUnits: 10,
    availableUnits: 2,
    activeBookings: 8,
    dateAdded: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "inactive",
  },
  {
    id: "3",
    title: "عمارة النخيل",
    type: "عقار سكني وتأجير مؤقت",
    code: "#014",
    ownerName: "محمد العتيبي",
    ownerInitials: "مع",
    ownerEmail: "m.otaibi@domain.sa",
    city: "الرياض،",
    district: "حي النخيل",
    totalUnits: 12,
    occupiedUnits: 10,
    availableUnits: 2,
    activeBookings: 8,
    dateAdded: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "4",
    title: "عمارة النخيل",
    type: "عقار سكني وتأجير مؤقت",
    code: "#014",
    ownerName: "محمد العتيبي",
    ownerInitials: "مع",
    ownerEmail: "m.otaibi@domain.sa",
    city: "الرياض،",
    district: "حي النخيل",
    totalUnits: 12,
    occupiedUnits: 10,
    availableUnits: 2,
    activeBookings: 8,
    dateAdded: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "archived",
  },
  {
    id: "5",
    title: "أبراج العليا ريزيدنس",
    type: "عقار تجاري وسكني",
    code: "#019",
    ownerName: "خالد الحربي",
    ownerInitials: "خح",
    ownerEmail: "k.harbi@investment.com",
    city: "الرياض،",
    district: "حي العليا",
    totalUnits: 24,
    occupiedUnits: 20,
    availableUnits: 4,
    activeBookings: 15,
    dateAdded: "15 سبتمبر 2026",
    relativeTime: "(أمس)",
    status: "active",
  },
  {
    id: "6",
    title: "مجمع الروضة الفاخر",
    type: "فلل وتأجير سنوي",
    code: "#022",
    ownerName: "سارة القحطاني",
    ownerInitials: "سق",
    ownerEmail: "sara.q@holding.sa",
    city: "جدة،",
    district: "حي الروضة",
    totalUnits: 8,
    occupiedUnits: 6,
    availableUnits: 2,
    activeBookings: 5,
    dateAdded: "14 سبتمبر 2026",
    relativeTime: "14 سبتمبر",
    status: "inactive",
  },
];

export function PropertiesTable() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showPageSizeMenu, setShowPageSizeMenu] = useState(false);
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
    if (propertyFilters.status !== "all") count++;
    if (propertyFilters.unitsRange !== "all") count++;
    if (propertyFilters.sortBy !== "default") count++;
    return count;
  }, [propertyFilters]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setShowPageSizeMenu(false);
  };

  const filteredProperties = useMemo(() => {
    const result = initialProperties.filter((property) => {
      // Status tab filter
      if (filter === "active" && property.status !== "active") return false;
      if (filter === "inactive" && property.status !== "inactive") return false;
      if (filter === "archived" && property.status !== "archived") return false;

      // Advanced drawer filters
      if (propertyFilters.city !== "all" && !property.city.includes(propertyFilters.city)) {
        return false;
      }
      if (propertyFilters.status === "available" && property.status !== "active") {
        return false;
      }
      if (propertyFilters.status === "reserved" && property.status !== "inactive") {
        return false;
      }
      if (propertyFilters.unitsRange === "less10" && property.totalUnits >= 10) {
        return false;
      }
      if (propertyFilters.unitsRange === "10-20" && (property.totalUnits < 10 || property.totalUnits > 20)) {
        return false;
      }
      if (propertyFilters.unitsRange === "more20" && property.totalUnits <= 20) {
        return false;
      }

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          property.title.toLowerCase().includes(q) ||
          property.ownerName.toLowerCase().includes(q) ||
          property.city.toLowerCase().includes(q) ||
          property.district.toLowerCase().includes(q) ||
          property.code.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sorting
    if (propertyFilters.sortBy === "units_desc") {
      result.sort((a, b) => b.totalUnits - a.totalUnits);
    } else if (propertyFilters.sortBy === "bookings_desc") {
      result.sort((a, b) => b.activeBookings - a.activeBookings);
    } else if (propertyFilters.sortBy === "name_asc") {
      result.sort((a, b) => a.title.localeCompare(b.title, "ar"));
    }

    return result;
  }, [filter, search, propertyFilters]);

  const totalHeadlineCount = 184; // From design specification
  const totalFiltered = filteredProperties.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);

  const startIndex = (activePage - 1) * pageSize;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + pageSize);

  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  const counts = {
    all: initialProperties.length,
    active: initialProperties.filter((p) => p.status === "active").length,
    inactive: initialProperties.filter((p) => p.status === "inactive").length,
    archived: initialProperties.filter((p) => p.status === "archived").length,
  };

  const renderStatusBadge = (status: PropertyStatus) => {
    if (status === "active") {
      return (
        <span className="bg-[#E2F0D9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
          <span>نشط</span>
        </span>
      );
    }
    if (status === "inactive") {
      return (
        <span className="bg-[#F3F4F6] text-[#6B7280] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
          <span>غير نشط</span>
        </span>
      );
    }
    return (
      <span className="bg-[#F0EDE8] text-[#8C7A6B] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A6B]" />
        <span>مؤرشف</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Tabs Filter Bar */}
      <PropertiesFilters
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        counts={counts}
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EEF2E6] text-[#7D8A78] text-[11px] font-semibold bg-[#FAFCF8]/60">
                <th className="py-4 px-4 sm:px-6 text-start">العقار</th>
                <th className="py-4 px-4 sm:px-6 text-start">مالك العقار</th>
                <th className="py-4 px-4 sm:px-6 text-start">الموقع</th>
                <th className="py-4 px-4 sm:px-6 text-center">الوحدات</th>
                <th className="py-4 px-4 sm:px-6 text-center">الحجوزات الحالية</th>
                <th className="py-4 px-4 sm:px-6 text-center">تاريخ الإضافة</th>
                <th className="py-4 px-4 sm:px-6 text-center">الحالة</th>
                <th className="py-4 px-4 sm:px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#7D8A78]">
                    لا توجد عقارات تطابق معايير البحث
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="hover:bg-[#F9FAF7] transition-colors group"
                  >
                    {/* 1. Property Name & Code */}
                    <td className="py-4 px-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/properties/${property.id}`}
                            className="font-bold text-xs text-[#172115] hover:text-[#2E3C29] hover:underline"
                          >
                            {property.title}
                          </Link>
                          <div className="text-[11px] text-[#7D8A78]">
                            {property.type} • {property.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Property Owner */}
                    <td className="py-4 px-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E2E6DC] text-[#34432E] font-bold text-xs flex items-center justify-center shrink-0">
                          {property.ownerInitials}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#172115]">
                            {property.ownerName}
                          </div>
                          <div className="text-[11px] text-[#7D8A78]">
                            {property.ownerEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Location */}
                    <td className="py-4 px-4 sm:px-6 text-start">
                      <div className="font-bold text-xs text-[#172115]">
                        {property.city}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#7D8A78] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#7D8A78]" />
                        <span>{property.district}</span>
                      </div>
                    </td>

                    {/* 4. Units */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="font-bold text-sm text-[#172115]">
                        {property.totalUnits}
                      </div>
                      <div className="text-[11px] font-medium text-[#172115]">
                        وحدة
                      </div>
                      <div className="text-[10px] text-[#7D8A78] mt-0.5">
                        {property.occupiedUnits} مشغولة
                      </div>
                      <div className="text-[10px] text-[#7D8A78]">
                        • {property.availableUnits} متاحة
                      </div>
                    </td>

                    {/* 5. Current Bookings */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="bg-[#EEF2E6] rounded-xl px-3 py-1.5 flex items-center justify-center gap-2 w-fit mx-auto">
                        <div className="text-center">
                          <div className="font-bold text-[11px] text-[#2C3825]">
                            {property.activeBookings} حجوزات
                          </div>
                          <div className="text-[10px] text-[#7D8A78]">
                            نشطة
                          </div>
                        </div>
                        <span className="w-1 h-3 rounded-full bg-[#2E7D32]" />
                      </div>
                    </td>

                    {/* 6. Date Added */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <TableDateCell
                        date={property.dateAdded}
                        relativeTime={property.relativeTime}
                      />
                    </td>

                    {/* 7. Status */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      {renderStatusBadge(property.status)}
                    </td>

                    {/* 8. Actions */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <ActionDropdown
                        items={[
                          {
                            label: "تفاصيل العقار",
                            icon: Eye,
                            variant: "active",
                            href: `/dashboard/properties/${property.id}`,
                          },
                          {
                            label: "تعديل البيانات",
                            icon: SlidersHorizontal,
                            onClick: () =>
                              toast.info(`تعديل بيانات: ${property.title}`),
                          },
                          {
                            label: "إدارة الوحدات",
                            icon: Building2,
                            href: `/dashboard/properties/${property.id}`,
                          },
                          {
                            label: "أرشفة العقار",
                            icon: Trash2,
                            variant: "destructive",
                            onClick: () =>
                              toast.error(`تم أرشفة العقار: ${property.title}`),
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

        {/* Table Footer / Pagination */}
        <div className="p-4 sm:px-6 border-t border-[#EEF2E6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D8A78]">
          {/* Right Side in RTL: Item Count & Rows Per Page Dropdown */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 font-medium">
            <span>
              عرض {fromIndex} إلى {toIndex} من أصل {totalHeadlineCount} عقار مسجل
            </span>

            <span className="hidden sm:inline-block w-px h-4 bg-[#CCD5C5]/70" />

            {/* Rows Per Page Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[#7D8A78]">الصفوف لكل صفحة:</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPageSizeMenu(!showPageSizeMenu)}
                  className="bg-white border border-[#E2E6DC] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#172115] flex items-center gap-1.5 shadow-2xs hover:bg-[#F9FAF7] transition-all cursor-pointer"
                >
                  <span>{pageSize} عقارات</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#7D8A78]" />
                </button>

                {/* Dropdown Menu */}
                {showPageSizeMenu && (
                  <div className="absolute start-0 bottom-full mb-1.5 w-28 bg-white border border-[#E2E6DC] rounded-xl shadow-lg py-1 z-20">
                    {[5, 10, 20, 50].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handlePageSizeChange(size)}
                        className={cn(
                          "w-full text-start px-3 py-1.5 text-xs transition-colors hover:bg-[#EEF2E6]",
                          pageSize === size ? "font-bold text-[#34432E] bg-[#EEF2E6]/50" : "text-[#2C3825]"
                        )}
                      >
                        {size} عقارات
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Left Side in RTL: Pagination Controls [السابق >]  [1]  [< التالي] */}
          <div className="flex items-center gap-1.5">
            {/* Previous Button (Right in RTL) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                activePage === 1
                  ? "opacity-40 cursor-not-allowed bg-white text-[#7D8A78]"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <span>السابق</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Dynamic Page 1 */}
            <button
              type="button"
              className="w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all select-none border border-[#CCD5C5] bg-[#EEF2E6] text-[#172115] shadow-2xs cursor-pointer"
            >
              1
            </button>

            {/* Next Button (Left in RTL) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                activePage === totalPages
                  ? "opacity-40 cursor-not-allowed bg-white text-[#7D8A78]"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>التالي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      <OwnerPropertiesFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={propertyFilters}
        onApplyFilters={(newFilters) => {
          setPropertyFilters(newFilters);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setPropertyFilters({
            city: "all",
            status: "all",
            unitsRange: "all",
            sortBy: "default",
          });
          setCurrentPage(1);
        }}
        totalResultsCount={filteredProperties.length}
      />
    </div>
  );
}
