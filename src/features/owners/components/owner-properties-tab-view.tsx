"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Search,
  Clock,
  MoreHorizontal,
  Smartphone,
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

export interface OwnerPropertyItem {
  id: string;
  name: string;
  district: string;
  city: string;
  unitsCount: number;
  activeBookingsCount: number;
  status: "reserved" | "available";
  lastUpdated: string;
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
    lastUpdated: "منذ ساعتين",
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
    lastUpdated: "منذ ساعتين",
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
    lastUpdated: "منذ ساعتين",
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
    lastUpdated: "منذ ساعتين",
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

  return (
    <div className="space-y-4">
      {/* 1. Top Action Buttons Bar (Left in RTL: justify-end) */}
      <div className="flex items-center justify-end gap-3">
        {/* Primary Action: إضافة عقار للمالك */}
        <Link
          href="/dashboard/properties/new"
          className="bg-[#2E3C29] hover:bg-[#232F1F] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <Building2 className="w-4 h-4" />
          <span>+ إضافة عقار للمالك</span>
        </Link>

        {/* Secondary Action: عرض جميع العقارات في المنصة */}
        <Link
          href="/dashboard/properties"
          className="bg-white hover:bg-[#F6F8F4] text-[#4A5745] border border-[#E2E6DC] font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-colors"
        >
          <Globe className="w-4 h-4 text-[#7D8A78]" />
          <span>عرض جميع العقارات في المنصة</span>
        </Link>
      </div>

      {/* 2. Filter & Search Bar: Search on the Right (first in RTL), Filters on the Left (second in RTL) */}
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#E2E6DC] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Search Input (Right in RTL) */}
        <div className="relative w-full sm:w-80 lg:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم العقار أو الحي..."
            className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-xl px-4 py-2 pe-10 text-xs text-[#172115] placeholder:text-[#7D8A78] focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filter Pills (Left in RTL) */}
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          {/* Advanced Filter Button exactly matching the design */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-xl font-bold border flex items-center gap-1.5 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#2E3C29] text-white border-[#2E3C29] shadow-2xs"
                : "bg-[#F6F8F4] hover:bg-[#EEF2E6] text-[#2C3825] border-[#E2E6DC]"
            )}
            title="تصفية العقارات"
          >
            <SlidersHorizontal
              className={cn(
                "w-3.5 h-3.5",
                activeFiltersCount > 0 ? "text-white" : "text-[#2C3825]"
              )}
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
            onClick={() => handleQuickStatusChange("all")}
            className={`px-3.5 py-1.5 text-xs rounded-xl font-bold transition-all cursor-pointer ${
              statusFilter === "all"
                ? "bg-[#F6F8F4] text-[#172115] border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            الكل ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => handleQuickStatusChange("available")}
            className={`px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
              statusFilter === "available"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            متاحة ({counts.available})
          </button>
          <button
            type="button"
            onClick={() => handleQuickStatusChange("reserved")}
            className={`px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
              statusFilter === "reserved"
                ? "bg-[#F6F8F4] text-[#172115] font-bold border border-[#E2E6DC]"
                : "text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4]"
            }`}
          >
            محجوزة ({counts.reserved})
          </button>
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
                <th className="px-4 py-4 whitespace-nowrap">اخر تحديث</th>
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
                filteredProperties.map((property) => (
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
                      <span className="text-xs sm:text-sm font-medium text-[#172115]">
                        {property.city}
                      </span>
                    </td>

                    {/* 3. عدد الوحدات */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs sm:text-sm font-medium text-[#172115]">
                        {property.unitsCount} وحدة
                      </span>
                    </td>

                    {/* 4. الحجوزات الحالية */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex flex-col items-center justify-center bg-[#F6F8F4] border border-[#EEF2E6] rounded-xl px-3 py-1.5 min-w-[88px]">
                        <span className="font-bold text-xs text-[#172115]">
                          {property.activeBookingsCount}
                        </span>
                        <span className="text-[10px] text-[#7D8A78] flex items-center gap-1 font-medium mt-0.5">
                          <Smartphone className="w-3 h-3 text-[#7D8A78]" />
                          <span>حجوزات نشطة</span>
                        </span>
                      </div>
                    </td>

                    {/* 5. الحالة */}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      {property.status === "reserved" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EBF5FB] border border-[#D4E6F1] text-[#2980B9] text-xs font-semibold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3498DB]" />
                          <span>محجوزة</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-semibold px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                          <span>متاحة</span>
                        </span>
                      )}
                    </td>

                    {/* 6. اخر تحديث */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-[#7D8A78]">
                        <Clock className="w-3.5 h-3.5 text-[#7D8A78]" />
                        <span>{property.lastUpdated}</span>
                      </div>
                    </td>

                    {/* 7. الاجراءات */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/dashboard/properties/${property.id}`}
                          className="bg-[#F6F8F4] hover:bg-[#EEF2E6] text-[#172115] border border-[#E2E6DC] rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer inline-block"
                        >
                          عرض العقار
                        </Link>
                        <ActionDropdown
                          triggerIcon="horizontal"
                          items={[
                            {
                              label: "تفاصيل العقار",
                              icon: Eye,
                              variant: "active",
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
        <div className="px-6 py-4 border-t border-[#E2E6DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#7D8A78] font-medium order-2 sm:order-1">
            عرض {filteredProperties.length} من إجمالي {properties.length} عقارات
          </div>

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
              className="px-3 py-1.5 rounded-lg bg-[#EEF2E6] text-[#2E3C29] font-bold border border-[#E2E6DC] select-none"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="px-3 py-1.5 rounded-lg border border-[#E2E6DC] text-[#A2ADA0] cursor-not-allowed flex items-center gap-1 font-medium select-none"
            >
              <span>التالي</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
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
