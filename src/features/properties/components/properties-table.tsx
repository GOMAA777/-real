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
import { TablePagination } from "@/components/shared/table-pagination";

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
        <span className="bg-[#DCE8D4] text-[#3D5F33] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3D5F33]" />
          <span>نشط</span>
        </span>
      );
    }
    if (status === "inactive") {
      return (
        <span className="bg-[#E4E7E1] text-[#5B6656] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B6656]" />
          <span>غير نشط</span>
        </span>
      );
    }
    return (
      <span className="bg-[#EDE9E3] text-[#766B5E] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#766B5E]" />
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
                        <div className="w-10 h-10 rounded-2xl bg-[#EAF0E6] text-[#2F4426] flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/properties/${property.id}`}
                            className="font-bold text-xs text-[#1C2318] hover:text-[#2E3C29] hover:underline"
                          >
                            {property.title}
                          </Link>
                          <div className="text-[11px] text-[#74836E]">
                            {property.type} • {property.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Property Owner */}
                    <td className="py-4 px-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E2E8DE] text-[#2F4426] font-bold text-xs flex items-center justify-center shrink-0">
                          {property.ownerInitials}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#1C2318]">
                            {property.ownerName}
                          </div>
                          <div className="text-[11px] text-[#74836E]">
                            {property.ownerEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Location */}
                    <td className="py-4 px-4 sm:px-6 text-start">
                      <div className="font-bold text-xs text-[#1C2318]">
                        {property.city}
                      </div>
                      <div className="flex items-start gap-1 text-[11px] text-[#74836E] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#74836E] shrink-0 mt-0.5" />
                        <span className="leading-tight max-w-[65px] inline-block">{property.district}</span>
                      </div>
                    </td>

                    {/* 4. Units */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="flex flex-col items-center justify-center leading-tight">
                        <span className="font-bold text-sm text-[#1C2318]">
                          {property.totalUnits}
                        </span>
                        <span className="font-bold text-xs text-[#1C2318] mt-0.5">
                          وحدة
                        </span>
                        <span className="text-[11px] text-[#74836E] mt-1 font-medium">
                          {property.occupiedUnits}
                        </span>
                        <span className="text-[11px] text-[#74836E] font-medium">
                          مشغولة
                        </span>
                        <span className="text-[11px] text-[#74836E] font-medium mt-0.5">
                          • {property.availableUnits} متاحة
                        </span>
                      </div>
                    </td>

                    {/* 5. Current Bookings */}
                    <td className="py-4 px-4 sm:px-6 text-center">
                      <div className="inline-flex flex-col items-center justify-center bg-[#EDF1E8] rounded-2xl px-3.5 py-2 select-none text-[#1A2118] min-w-[84px] mx-auto">
                        <div className="flex items-center gap-1.5 font-bold text-xs leading-tight">
                          <SmartPassIcon className="w-2.5 h-3.5 shrink-0 text-[#34422A]" />
                          <span>{property.activeBookings} حجوزات</span>
                        </div>
                        <span className="font-bold text-xs text-[#1A2118] mt-0.5 leading-tight">
                          نشطة
                        </span>
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
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalHeadlineCount}
          fromIndex={fromIndex}
          toIndex={toIndex}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 20, 50]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => handlePageSizeChange(size)}
          entityName="عقار"
          pluralEntityName="عقارات"
          registeredLabel="مسجل"
        />
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
