"use client";

import { useState } from "react";
import { MoreVertical, ChevronRight, ChevronLeft } from "lucide-react";
import { Owner, OwnerStatus } from "../types";
import { OwnersFilters } from "./owners-filters";

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
];

export function OwnersTable() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
        onFilterChange={setFilter}
        searchQuery={search}
        onSearchChange={setSearch}
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

            {/* Table Body */}
            <tbody className="divide-y divide-[#EEF2E6]">
              {filteredOwners.map((owner) => (
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
          {/* Item Count Note */}
          <div className="font-medium text-center sm:text-start">
            عرض 1-7 من أصل 248 مالك عقار
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-[#CCD5C5] text-[#2C3825] hover:bg-[#F4F6F0] flex items-center gap-1 font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>السابق</span>
            </button>

            {/* Page 1 (Active) */}
            <button
              type="button"
              className="w-7 h-7 rounded-lg bg-[#34432E] text-white font-bold text-xs flex items-center justify-center shadow-xs"
            >
              1
            </button>

            {/* Next */}
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-[#CCD5C5] text-[#2C3825] hover:bg-[#F4F6F0] flex items-center gap-1 font-medium transition-colors cursor-pointer shadow-2xs"
            >
              <span>التالي</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
