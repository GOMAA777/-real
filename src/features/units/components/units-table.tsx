"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BrushCleaning, Star } from "lucide-react";
import { toast } from "sonner";
import { Unit, UnitFilterState, UnitStatus } from "../types";
import { initialUnits } from "../data/mock-units";
import { UnitsFilters } from "./units-filters";
import { UnitsAdvancedFilterDrawer } from "./units-advanced-filter-drawer";
import { UnitActionDropdown } from "./unit-action-dropdown";
import { UnitsEmptyState } from "./units-empty-state";
import { TablePagination } from "@/components/shared/table-pagination";

// Door icon matching the reference row artwork
function UnitDoorIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
      <path d="M15 4l5 2v15" />
      <path d="M3 21h18" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// Crossed screwdriver + wrench (Font Awesome Free 6.7.2, CC BY 4.0)
function UnitMaintenanceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4l54.1 0 109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109 0-54.1c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7L352 176c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
    </svg>
  );
}

// Building icon with the lower attached wing shown in the reference
function UnitPropertyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V3.8c0-.44.36-.8.8-.8h8.4c.44 0 .8.36.8.8V21" />
      <path d="M15 11h5.2c.44 0 .8.36.8.8V21" />
      <path d="M8 6h1.3M11 6h1.3M8 10h1.3M11 10h1.3M8 14h1.3M11 14h1.3M8 18h1.3M11 18h1.3" />
      <path d="M17.3 14h1.3M19.6 14h.1M17.3 17.5h1.3M19.6 17.5h.1" />
    </svg>
  );
}

function BookingLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.5 8H7a4 4 0 0 0 0 8h1.5" />
      <path d="M15.5 8H17a4 4 0 0 1 0 8h-1.5" />
      <path d="M8 12h8" />
    </svg>
  );
}

export function UnitsTable() {
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabFilter, setTabFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [advancedFilters, setAdvancedFilters] = useState<UnitFilterState>({
    property: "all",
    status: "all",
    unitType: "all",
    floor: "all",
    priceRange: "all",
    sortBy: "default",
  });

  const handleTabChange = (newTab: string) => {
    setTabFilter(newTab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.property !== "all") count++;
    if (advancedFilters.status !== "all") count++;
    if (advancedFilters.unitType !== "all") count++;
    if (advancedFilters.floor !== "all") count++;
    if (advancedFilters.priceRange !== "all") count++;
    if (advancedFilters.sortBy !== "default") count++;
    return count;
  }, [advancedFilters]);

  // Filter & Search Logic
  const filteredUnits = useMemo(() => {
    const list = initialUnits.filter((unit) => {
      // 1. Status Tab filter
      if (tabFilter !== "all" && unit.status !== tabFilter) {
        return false;
      }

      // 2. Advanced Drawer Filters
      if (
        advancedFilters.property !== "all" &&
        unit.propertyName !== advancedFilters.property
      ) {
        return false;
      }
      if (
        advancedFilters.status !== "all" &&
        unit.status !== advancedFilters.status
      ) {
        return false;
      }
      if (
        advancedFilters.unitType !== "all" &&
        unit.type !== advancedFilters.unitType
      ) {
        return false;
      }
      if (
        advancedFilters.floor !== "all" &&
        unit.floorNumber.toString() !== advancedFilters.floor
      ) {
        return false;
      }
      if (advancedFilters.priceRange === "less200" && unit.pricePerNight >= 200) {
        return false;
      }
      if (
        advancedFilters.priceRange === "200-350" &&
        (unit.pricePerNight < 200 || unit.pricePerNight > 350)
      ) {
        return false;
      }
      if (advancedFilters.priceRange === "more350" && unit.pricePerNight <= 350) {
        return false;
      }

      // 3. Search query (unitNumber, propertyName, ownerName)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesUnit = unit.unitNumber.toLowerCase().includes(q);
        const matchesProperty = unit.propertyName.toLowerCase().includes(q);
        const matchesOwner = unit.ownerName.toLowerCase().includes(q);
        return matchesUnit || matchesProperty || matchesOwner;
      }

      return true;
    });

    // Sorting
    if (advancedFilters.sortBy === "price_asc") {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (advancedFilters.sortBy === "price_desc") {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (advancedFilters.sortBy === "unit_asc") {
      list.sort((a, b) => a.unitNumber.localeCompare(b.unitNumber));
    }

    return list;
  }, [tabFilter, searchQuery, advancedFilters]);

  // Total counts for tabs
  const counts = useMemo(
    () => ({
      all: initialUnits.length,
      available: initialUnits.filter((u) => u.status === "available").length,
      occupied: initialUnits.filter((u) => u.status === "occupied").length,
      cleaning: initialUnits.filter((u) => u.status === "cleaning").length,
      maintenance: initialUnits.filter((u) => u.status === "maintenance").length,
    }),
    []
  );

  // Pagination calculation
  const totalHeadlineCount = 342;
  const totalFiltered = filteredUnits.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);

  const startIndex = (activePage - 1) * pageSize;
  const paginatedUnits = filteredUnits.slice(startIndex, startIndex + pageSize);

  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + pageSize, totalFiltered);

  // Status badge matching the reference
  const renderStatusBadge = (status: UnitStatus) => {
    switch (status) {
      case "available":
        return (
          <span className="bg-[#EBF3E5] text-[#35432E] text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 select-none w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#35432E] shrink-0" />
            <span>متاحة</span>
          </span>
        );
      case "occupied":
        return (
          <span className="bg-[#EBECEA] text-[#34422A] text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 select-none w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34422A] shrink-0" />
            <span>مشغولة</span>
          </span>
        );
      case "cleaning":
        return (
          <span className="bg-[#D8E8CB] text-[#34422A] text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 select-none w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34422A] shrink-0" />
            <span>تحت التنظيف</span>
          </span>
        );
      case "maintenance":
        return (
          <span className="bg-[#FFDAD6] text-[#93000A] text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 select-none w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A] shrink-0" />
            <span>تحت الصيانة</span>
          </span>
        );
    }
  };

  // Render unit status icon
  const renderUnitIcon = (unit: Unit) => {
    if (unit.iconType === "maintenance") {
      return (
        <div className="w-8 h-8 rounded-xl bg-[#FFE9E6] text-[#BA1A1A] flex items-center justify-center shrink-0">
          <UnitMaintenanceIcon className="w-4 h-4" />
        </div>
      );
    }
    if (unit.iconType === "cleaning") {
      return (
        <div className="w-8 h-8 rounded-xl bg-[#E0EDD5] text-[#5A6952] flex items-center justify-center shrink-0">
          <BrushCleaning className="w-4 h-4" strokeWidth={1.9} />
        </div>
      );
    }
    if (unit.iconType === "suite") {
      return (
        <div className="w-8 h-8 rounded-xl bg-[#EBECEA] text-[#34422A] flex items-center justify-center shrink-0">
          <Star className="w-4 h-4" strokeWidth={1.8} />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-[#EBF3E5] text-[#54624C] flex items-center justify-center shrink-0">
        <UnitDoorIcon className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Search & Filter Bar */}
      <UnitsFilters
        currentFilter={tabFilter}
        onFilterChange={handleTabChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        counts={counts}
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* 2. Units Table Card */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EEF2E6] text-[#7D8A78] text-[11px] font-semibold bg-[#FAFCF8]/60">
                <th className="py-3.5 px-4 text-start">الوحدة</th>
                <th className="py-3.5 px-4 text-start">العقار</th>
                <th className="py-3.5 px-4 text-start">المالك</th>
                <th className="py-3.5 px-4 text-start">النوع</th>
                <th className="py-3.5 px-4 text-center">الدور</th>
                <th className="py-3.5 px-4 text-start">السعر / ليلة</th>
                <th className="py-3.5 px-4 text-start">الحالة</th>
                <th className="py-3.5 px-4 text-start">الحجز الحالي</th>
                <th className="py-3.5 px-4 text-center">آخر تحديث</th>
                <th className="py-3.5 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {paginatedUnits.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-4 sm:p-8">
                    <UnitsEmptyState
                      onRefresh={() => {
                        setSearchQuery("");
                        setTabFilter("all");
                        setAdvancedFilters({
                          property: "all",
                          status: "all",
                          unitType: "all",
                          floor: "all",
                          priceRange: "all",
                          sortBy: "default",
                        });
                      }}
                    />
                  </td>
                </tr>
              ) : (
                paginatedUnits.map((unit) => (
                  <tr
                    key={unit.id}
                    className="hover:bg-[#F9FAF7] transition-colors group"
                  >
                    {/* 1. الوحدة */}
                    <td className="py-3 px-4 text-start">
                      <Link
                        href={`/dashboard/units/${unit.id}`}
                        className="flex items-center gap-2.5 group/link hover:opacity-90 transition-opacity"
                      >
                        {renderUnitIcon(unit)}
                        <div className="min-w-0 flex-1 text-start">
                          <div className="text-[14px] font-bold text-[#181D17] group-hover/link:text-[#34422A] group-hover/link:underline">
                            {unit.unitNumber}
                          </div>
                          <div className="text-[11px] text-[#75786F]">
                            {unit.floor}
                          </div>
                        </div>
                      </Link>
                    </td>

                    {/* 2. العقار */}
                    <td className="py-3 px-4 text-start">
                      <div className="flex items-center gap-1.5">
                        <UnitPropertyIcon className="w-4 h-4 shrink-0 text-[#75786F]" />
                        <span className="text-xs font-bold text-[#181D17]">
                          {unit.propertyName}
                        </span>
                      </div>
                    </td>

                    {/* 3. المالك */}
                    <td className="py-3 px-4 text-start">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#D8E8CB] text-[#34422A] text-[11px] font-bold flex items-center justify-center shrink-0">
                          {unit.ownerInitials}
                        </div>
                        <span className="text-xs font-bold text-[#181D17]">
                          {unit.ownerName}
                        </span>
                      </div>
                    </td>

                    {/* 4. النوع */}
                    <td className="py-3 px-4 text-start text-xs font-medium text-[#454840]">
                      {unit.type}
                    </td>

                    {/* 5. الدور */}
                    <td className="py-3 px-4 text-center">
                      <div className="w-6 h-6 rounded-[6px] bg-[#EBEFE6] text-[#181D17] font-bold text-[11px] inline-flex items-center justify-center">
                        {unit.floorNumber}
                      </div>
                    </td>

                    {/* 6. السعر / ليلة */}
                    <td className="py-3 px-4 text-start">
                      <span className="font-bold text-[14px] text-[#181D17]">
                        {unit.pricePerNight}
                      </span>{" "}
                      <span className="text-[10.5px] font-medium text-[#75786F]">
                        ر.س
                      </span>
                    </td>

                    {/* 7. الحالة */}
                    <td className="py-3 px-4 text-start">
                      {renderStatusBadge(unit.status)}
                    </td>

                    {/* 8. الحجز الحالي */}
                    <td className="py-3 px-4 text-start">
                      {unit.currentBookingCode ? (
                        <div
                          onClick={() => toast.info(`الحجز رقم: ${unit.currentBookingCode}`)}
                          className="h-7 px-2.5 rounded-[8px] bg-[#EBEFE6] text-[#34422A] flex items-center gap-1.5 cursor-pointer select-none w-fit"
                        >
                          <BookingLinkIcon className="w-3 h-3 text-[#55694D] shrink-0" />
                          <span className="text-[11px] font-bold">
                            {unit.currentBookingCode}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-[#75786F] ps-2">—</span>
                      )}
                    </td>

                    {/* 9. آخر تحديث */}
                    <td className="py-3 px-4 text-center">
                      <div className="text-[11px] font-bold text-[#181D17]">
                        {unit.lastUpdateDate}
                      </div>
                      <div className="text-[10px] text-[#75786F]">
                        {unit.lastUpdateTime}
                      </div>
                    </td>

                    {/* 10. الإجراءات */}
                    <td className="py-3 px-4 text-center">
                      <UnitActionDropdown unit={unit} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 3. Table Pagination Footer */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalHeadlineCount}
          fromIndex={fromIndex}
          toIndex={toIndex}
          pageSize={pageSize}
          pageSizeOptions={[8, 10, 20, 50]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => handlePageSizeChange(size)}
          entityName="وحدة"
          pluralEntityName="وحدات"
          registeredLabel="مسجلة"
        />
      </div>

      {/* 4. Advanced Filter Drawer */}
      <UnitsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={(newFilters) => {
          setAdvancedFilters(newFilters);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setAdvancedFilters({
            property: "all",
            status: "all",
            unitType: "all",
            floor: "all",
            priceRange: "all",
            sortBy: "default",
          });
          setCurrentPage(1);
        }}
        totalResultsCount={filteredUnits.length}
      />
    </div>
  );
}
