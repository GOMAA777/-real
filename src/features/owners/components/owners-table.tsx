"use client";

import { useState } from "react";
import { MoreVertical, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Owner, OwnerStatus } from "../types";
import { OwnersFilters } from "./owners-filters";

const PAGE_SIZE = 5;

const initialOwners: Owner[] = [
  {
    id: "1",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "2",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "3",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "pending",
  },
  {
    id: "4",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "5",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "inactive",
  },
  {
    id: "6",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "7",
    name: "محمد العتيبي",
    initials: "مع",
    email: "m.otaibi@domain.sa",
    phone: "050 482 9102",
    propertiesCount: 3,
    unitsCount: 42,
    registrationDate: "16 سبتمبر 2026",
    relativeTime: "(اليوم)",
    status: "active",
  },
  {
    id: "8",
    name: "خالد الحربي",
    initials: "خح",
    email: "k.harbi@investment.com",
    phone: "055 319 8241",
    propertiesCount: 1,
    unitsCount: 12,
    registrationDate: "15 سبتمبر 2026",
    relativeTime: "(أمس)",
    status: "active",
  },
  {
    id: "9",
    name: "سارة القحطاني",
    initials: "سق",
    email: "sara.q@holding.sa",
    phone: "054 991 3024",
    propertiesCount: 2,
    unitsCount: 28,
    registrationDate: "14 سبتمبر 2026",
    relativeTime: "14 سبتمبر",
    status: "pending",
  },
  {
    id: "10",
    name: "عبدالله المطيري",
    initials: "عم",
    email: "a.mutairi@properties.sa",
    phone: "056 120 4490",
    propertiesCount: 5,
    unitsCount: 60,
    registrationDate: "13 سبتمبر 2026",
    relativeTime: "13 سبتمبر",
    status: "active",
  },
  {
    id: "11",
    name: "فهد الدوسري",
    initials: "فد",
    email: "f.dossary@domain.sa",
    phone: "050 782 1190",
    propertiesCount: 4,
    unitsCount: 36,
    registrationDate: "12 سبتمبر 2026",
    relativeTime: "12 سبتمبر",
    status: "active",
  },
  {
    id: "12",
    name: "ريم الغامدي",
    initials: "رغ",
    email: "reem.g@realty.sa",
    phone: "053 440 8821",
    propertiesCount: 2,
    unitsCount: 18,
    registrationDate: "11 سبتمبر 2026",
    relativeTime: "11 سبتمبر",
    status: "inactive",
  },
  {
    id: "13",
    name: "سلطان الشهري",
    initials: "سش",
    email: "s.shehri@domain.sa",
    phone: "055 601 2234",
    propertiesCount: 3,
    unitsCount: 30,
    registrationDate: "10 سبتمبر 2026",
    relativeTime: "10 سبتمبر",
    status: "active",
  },
  {
    id: "14",
    name: "نورة الشمري",
    initials: "نش",
    email: "noura.sh@capital.sa",
    phone: "054 220 9811",
    propertiesCount: 1,
    unitsCount: 8,
    registrationDate: "09 سبتمبر 2026",
    relativeTime: "09 سبتمبر",
    status: "pending",
  },
  {
    id: "15",
    name: "تركي الزهراني",
    initials: "تز",
    email: "turki.z@domain.sa",
    phone: "056 312 7709",
    propertiesCount: 6,
    unitsCount: 72,
    registrationDate: "08 سبتمبر 2026",
    relativeTime: "08 سبتمبر",
    status: "active",
  },
];

export function OwnersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const filteredOwners = initialOwners.filter((owner) => {
    // Status filter
    if (filter === "active" && owner.status !== "active") return false;
    if (filter === "pending" && owner.status !== "pending") return false;
    if (filter === "inactive" && owner.status !== "inactive") return false;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        owner.name.toLowerCase().includes(q) ||
        owner.phone.includes(q) ||
        owner.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalHeadlineCount = 248; // Total from design specification
  const totalFiltered = filteredOwners.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));

  // Ensure currentPage doesn't exceed totalPages
  const activePage = Math.min(currentPage, totalPages);

  // Paginated slice (5 items per page)
  const startIndex = (activePage - 1) * PAGE_SIZE;
  const paginatedOwners = filteredOwners.slice(startIndex, startIndex + PAGE_SIZE);

  const fromIndex = totalFiltered === 0 ? 0 : startIndex + 1;
  const toIndex = Math.min(startIndex + PAGE_SIZE, totalFiltered);

  const counts = {
    all: initialOwners.length,
    active: initialOwners.filter((o) => o.status === "active").length,
    pending: initialOwners.filter((o) => o.status === "pending").length,
    inactive: initialOwners.filter((o) => o.status === "inactive").length,
  };

  const renderStatusBadge = (status: OwnerStatus) => {
    if (status === "active") {
      return (
        <span className="bg-[#E2F0D9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
          <span>نشط</span>
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
          <span>بانتظار المراجعة</span>
        </span>
      );
    }
    return (
      <span className="bg-[#F1F3EF] text-[#7D8A78] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7D8A78]" />
        <span>غير نشط</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <OwnersFilters
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        searchQuery={search}
        onSearchChange={handleSearchChange}
        counts={counts}
      />

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#EEF2E6] text-[11px] sm:text-xs font-semibold text-[#7D8A78]">
                <th className="py-4 px-5 text-start font-medium">مالك العقار</th>
                <th className="py-4 px-5 text-start font-medium">رقم الجوال</th>
                <th className="py-4 px-5 text-start font-medium">عدد العقارات</th>
                <th className="py-4 px-5 text-start font-medium">عدد الوحدات</th>
                <th className="py-4 px-5 text-start font-medium">تاريخ التسجيل</th>
                <th className="py-4 px-5 text-start font-medium">الحالة</th>
                <th className="py-4 px-5 text-center font-medium">الإجراءات</th>
              </tr>
            </thead>

            {/* Table Body (5 items per page) */}
            <tbody className="divide-y divide-[#EEF2E6]">
              {paginatedOwners.map((owner) => (
                <tr
                  key={owner.id}
                  className="hover:bg-[#FAFBF8] transition-colors"
                >
                  {/* 1. مالك العقار */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#EEF2E6] text-[#34432E] font-bold text-xs flex items-center justify-center shrink-0">
                        {owner.initials}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#172115]">
                          {owner.name}
                        </div>
                        <div className="text-[10px] text-[#7D8A78]">
                          {owner.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. رقم الجوال */}
                  <td className="py-4 px-5">
                    <span className="text-xs text-[#172115] font-medium" dir="ltr">
                      {owner.phone}
                    </span>
                  </td>

                  {/* 3. عدد العقارات */}
                  <td className="py-4 px-5">
                    <span className="text-xs text-[#172115] font-medium">
                      {owner.propertiesCount} عقارات
                    </span>
                  </td>

                  {/* 4. عدد الوحدات */}
                  <td className="py-4 px-5">
                    <span className="text-xs text-[#172115] font-medium">
                      {owner.unitsCount} وحدة
                    </span>
                  </td>

                  {/* 5. تاريخ التسجيل */}
                  <td className="py-4 px-5">
                    <div className="space-y-0.5">
                      <div className="text-xs text-[#172115] font-medium">
                        {owner.registrationDate}
                      </div>
                      <div className="text-[10px] text-[#2E7D32] font-semibold">
                        {owner.relativeTime}
                      </div>
                    </div>
                  </td>

                  {/* 6. الحالة */}
                  <td className="py-4 px-5">
                    {renderStatusBadge(owner.status)}
                  </td>

                  {/* 7. الإجراءات */}
                  <td className="py-4 px-5 text-center">
                    <button
                      type="button"
                      className="p-1.5 text-[#7D8A78] hover:text-[#172115] hover:bg-[#EEF2E6] rounded-lg transition-colors cursor-pointer"
                      title="خيارات"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 sm:px-6 border-t border-[#EEF2E6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7D8A78]">
          {/* Item Count Note: 1-5 when page size is 5 */}
          <div className="font-medium text-center sm:text-start">
            عرض {fromIndex}-{toIndex} من أصل {totalHeadlineCount} مالك عقار
          </div>

          {/* Pagination Controls: From Left to Right: السابق -> 1 -> 2 -> ... -> التالي */}
          <div className="flex items-center gap-1.5" dir="ltr">
            {/* Previous Button (Leftmost) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                activePage === 1
                  ? "opacity-40 cursor-not-allowed bg-white"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>السابق</span>
            </button>

            {/* Dynamic Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === activePage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all select-none",
                    isActive
                      ? "bg-[#34432E] text-white shadow-xs"
                      : "border border-[#CCD5C5] text-[#2C3825] hover:bg-[#F4F6F0] bg-white cursor-pointer shadow-2xs"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button (Right) */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className={cn(
                "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
                activePage === totalPages
                  ? "opacity-40 cursor-not-allowed bg-white"
                  : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
              )}
            >
              <span>التالي</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
