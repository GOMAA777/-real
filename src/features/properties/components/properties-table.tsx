"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Eye, SlidersHorizontal, Building2, Trash2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Property, PropertyStatus, MainPropertyFilterState, initialPropertyFilterState } from "../types";
import { PropertiesFilters } from "./properties-filters";
import { PropertiesAdvancedFilterDrawer } from "./properties-advanced-filter-drawer";
import { ActionDropdown } from "@/components/shared/action-dropdown";

const initialProperties: Property[] = [
  {
    id: "1",
    title: "عمارة النخيل",
    type: "عقار سكني وتأجير مؤقت",
    code: "PR-9014",
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
    code: "PR-9014",
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
    code: "PR-9014",
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
    code: "PR-9014",
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
    code: "PR-9019",
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
    code: "PR-9022",
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
  const [isPageSizeMenuOpen, setIsPageSizeMenuOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [propertyFilters, setPropertyFilters] = useState<MainPropertyFilterState>(initialPropertyFilterState);
  const pageSizeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pageSizeMenuRef.current && !pageSizeMenuRef.current.contains(e.target as Node)) {
        setIsPageSizeMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (propertyFilters.propertyType !== "all") count++;
    if (propertyFilters.city !== "all") count++;
    if (propertyFilters.district !== "all") count++;
    if (propertyFilters.status !== "all") count++;
    if (propertyFilters.unitsRange !== "all") count++;
    if (propertyFilters.occupancyState !== "all") count++;
    if (propertyFilters.activeBookings !== "all") count++;
    if (propertyFilters.owner !== "all") count++;
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

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // Status tab filter
      if (filter === "active" && property.status !== "active") return false;
      if (filter === "inactive" && property.status !== "inactive") return false;
      if (filter === "archived" && property.status !== "archived") return false;

      // Advanced filters
      if (propertyFilters.propertyType !== "all" && property.type !== propertyFilters.propertyType) {
        return false;
      }
      if (propertyFilters.city !== "all" && !property.city.includes(propertyFilters.city)) {
        return false;
      }
      if (propertyFilters.district !== "all" && !property.district.includes(propertyFilters.district)) {
        return false;
      }
      if (propertyFilters.status !== "all" && property.status !== propertyFilters.status) {
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
  }, [filter, search, propertyFilters]);

  const totalHeadlineCount = 184; // From Figma specification
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
        <span className="bg-[#D8E8CB] text-[#5A6952] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5A6952]" />
          <span>نشط</span>
        </span>
      );
    }
    if (status === "inactive") {
      return (
        <span className="bg-[#E5EAE0] text-[#75786F] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#75786F]" />
          <span>غير نشط</span>
        </span>
      );
    }
    return (
      <span className="bg-[#DFE4DB] text-[#54624C] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#75786F]" />
        <span>مؤرشف</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 font-cairo">
      {/* 1. Search & Tabs Filter Bar */}
      <PropertiesFilters
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        counts={counts}
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* 2. Main High-Fidelity Table Container */}
      <div className="bg-white rounded-[16px] border border-[#E5E8E2] overflow-hidden drop-shadow-[0px_2px_5px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse min-w-[960px]">
            <thead>
              <tr className="bg-[#F9FAF8] border-b border-[#E5E8E2] text-[#73786F] text-[11px] font-bold tracking-[0.55px] uppercase">
                <th className="py-4 px-6 text-start">العقار</th>
                <th className="py-4 px-4 text-start">مالك العقار</th>
                <th className="py-4 px-4 text-start">الموقع</th>
                <th className="py-4 px-4 text-center">الوحدات</th>
                <th className="py-4 px-4 text-center">الحجوزات الحالية</th>
                <th className="py-4 px-4 text-center">تاريخ الإضافة</th>
                <th className="py-4 px-4 text-center">الحالة</th>
                <th className="py-4 px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8E2]">
              {paginatedProperties.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#73786F] text-[13px]">
                    لا توجد عقارات تطابق معايير البحث
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="hover:bg-[#F9FAF8]/70 transition-colors"
                  >
                    {/* 1. Property Name & Code */}
                    <td className="py-4 px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                          <img
                            src="/icons/properties/building.svg"
                            alt=""
                            className="w-[15px] h-[15px]"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/properties/${property.id}`}
                            className="font-semibold text-[14px] leading-[20px] text-[#181D17] hover:text-[#4B5940] transition-colors block text-right"
                          >
                            {property.title}
                          </Link>
                          <div className="text-[11px] font-medium leading-[16px] text-[#54624C] mt-0.5 text-right">
                            {property.type} · #{property.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Property Owner */}
                    <td className="py-4 px-4 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E5E8E2] flex items-center justify-center shrink-0 text-[#4B5940] text-[12px] font-bold">
                          {property.ownerInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-right">
                            <span className="font-bold text-[14px] leading-[20px] text-[#1E241C]">
                              {property.ownerName}
                            </span>
                            <img
                              src="/icons/properties/external-link.svg"
                              alt=""
                              className="w-3.5 h-3.5 opacity-80"
                            />
                          </div>
                          <div className="text-[11px] font-normal leading-[16px] text-[#73786F] mt-0.5 text-right">
                            {property.ownerEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 3. Location */}
                    <td className="py-4 px-4 text-start">
                      <div className="text-right">
                        <div className="text-[14px] font-normal leading-[22px] text-[#181D17]">
                          {property.city}
                        </div>
                        <div className="flex items-center gap-1 text-[14px] font-normal leading-[22px] text-[#181D17]">
                          <img
                            src="/icons/properties/location-pin.svg"
                            alt=""
                            className="w-[12px] h-[15px] shrink-0"
                          />
                          <span>{property.district}</span>
                        </div>
                      </div>
                    </td>

                    {/* 4. Units */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="font-semibold text-[14px] leading-[20px] text-[#181D17]">
                          {property.totalUnits} وحدة
                        </div>
                        <div className="text-[11px] font-medium leading-[16px] text-[#54624C] mt-0.5">
                          {property.occupiedUnits} مشغولة · {property.availableUnits} متاحة
                        </div>
                      </div>
                    </td>

                    {/* 5. Current Bookings */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <div className="bg-[#EBEFE6] rounded-[8px] px-2.5 py-1.5 inline-flex flex-col items-center justify-center min-w-[92px]">
                          <div className="flex items-center gap-1.5 text-[12px] font-medium leading-[18px] text-[#181D17]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4B5940] shrink-0" />
                            <span>{property.activeBookings} حجوزات</span>
                          </div>
                          <span className="text-[12px] font-medium leading-[18px] text-[#181D17]">
                            نشطة
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 6. Date Added */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="text-[12px] font-normal leading-[16px] text-[#57534E]">
                          {property.dateAdded}
                        </div>
                        <div className="text-[10px] font-medium leading-[16px] text-[#047857] mt-0.5">
                          {property.relativeTime}
                        </div>
                      </div>
                    </td>

                    {/* 7. Status */}
                    <td className="py-4 px-4 text-center">
                      {renderStatusBadge(property.status)}
                    </td>

                    {/* 8. Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        <ActionDropdown
                          triggerIcon={
                            <img
                              src="/icons/properties/dots-menu.svg"
                              alt=""
                              className="w-4 h-4 text-[#78716C]"
                            />
                          }
                          triggerClassName="w-8 h-8 rounded-[8px] hover:bg-[#EBEFE6] text-[#78716C]"
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
                              confirm: {
                                title: "أرشفة العقار",
                                message: `هل أنت متأكد من رغبتك في أرشفة العقار "${property.title}"؟ سيتم إيقاف تشغيل العقار وإخفاؤه من القوائم النشطة.`,
                                confirmLabel: "أرشفة العقار",
                                cancelLabel: "إلغاء",
                                variant: "destructive",
                              },
                              onClick: () =>
                                toast.error(`تم أرشفة العقار: ${property.title}`),
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

        {/* 3. Table Footer / Pagination (Figma node 1:4965) */}
        <div className="border-t border-[#E5E8E2] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white text-xs text-[#54624C]">
          {/* Records Summary & Rows Per Page (Right in RTL) */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-semibold text-[#54624C]">
            <p className="leading-[18px]">
              عرض <span className="text-[#181D17] font-semibold">{fromIndex}</span> إلى{" "}
              <span className="text-[#181D17] font-semibold">{toIndex}</span> من أصل{" "}
              <span className="text-[#181D17] font-semibold">{totalHeadlineCount}</span> عقار مسجل
            </p>

            <span className="hidden sm:inline-block w-px h-4 bg-[#E5E7EB]" />

            <div className="flex items-center gap-2 relative" ref={pageSizeMenuRef}>
              <span className="text-[#54624C] text-[11px] font-medium">الصفوف لكل صفحة:</span>
              <button
                type="button"
                onClick={() => setIsPageSizeMenuOpen(!isPageSizeMenuOpen)}
                className="bg-white border border-[#E5E8E2] px-3 py-1.5 rounded-[8px] text-[12px] font-semibold text-[#181D17] flex items-center gap-1.5 hover:bg-[#F9FAF8] transition-colors cursor-pointer select-none"
              >
                <span>{pageSize} عقارات</span>
                <ChevronDown className="w-3 h-3 text-[#73786F]" />
              </button>

              {isPageSizeMenuOpen && (
                <div className="absolute start-0 bottom-full mb-1.5 w-28 bg-white border border-[#E5E8E2] rounded-[8px] shadow-lg py-1 z-30">
                  {[5, 10, 20, 50].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setPageSize(size);
                        setCurrentPage(1);
                        setIsPageSizeMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-start px-3 py-1.5 text-xs transition-colors hover:bg-[#F1F5EB] cursor-pointer",
                        pageSize === size
                          ? "font-bold text-[#4B5940] bg-[#EAF1E8]"
                          : "text-[#181D17]"
                      )}
                    >
                      {size} عقارات
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pagination Controls [السابق] [1] [التالي] (Left in RTL) */}
          <div className="flex items-center gap-1.5">
            {/* Previous Button (Right in RTL flow) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className={cn(
                "bg-white border border-[#E5E8E2] rounded-[8px] px-3.5 py-1.5 text-[12px] font-normal flex items-center gap-1.5 transition-colors select-none",
                activePage === 1
                  ? "opacity-50 cursor-not-allowed text-[#A0A59C]"
                  : "text-[#181D17] hover:bg-[#F9FAF8] cursor-pointer"
              )}
            >
              <span>السابق</span>
              <img
                src="/icons/properties/arrow-prev.svg"
                alt=""
                className="w-3.5 h-3.5"
              />
            </button>

            {/* Current Active Page */}
            <div className="bg-[#EAF1E8] border border-[#D6DED4] rounded-[8px] px-3.5 py-1 text-[12px] font-bold text-[#4B5940] select-none">
              {activePage}
            </div>

            {/* Next Button (Left in RTL flow) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className={cn(
                "bg-white border border-[#E5E8E2] rounded-[8px] px-3.5 py-1.5 text-[12px] font-normal flex items-center gap-1.5 transition-colors select-none",
                activePage === totalPages
                  ? "opacity-50 cursor-not-allowed text-[#A0A59C]"
                  : "text-[#181D17] hover:bg-[#F9FAF8] cursor-pointer"
              )}
            >
              <img
                src="/icons/properties/arrow-next.svg"
                alt=""
                className="w-3.5 h-3.5"
              />
              <span>التالي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      <PropertiesAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={propertyFilters}
        onApplyFilters={(newFilters) => {
          setPropertyFilters(newFilters);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          setPropertyFilters(initialPropertyFilterState);
          setCurrentPage(1);
        }}
        totalResultsCount={filteredProperties.length}
      />
    </div>
  );
}
