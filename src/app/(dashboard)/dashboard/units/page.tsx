import type { Metadata } from "next";
import { UnitsHeader } from "@/features/units/components/units-header";
import { UnitsTable } from "@/features/units/components/units-table";

export const metadata: Metadata = {
  title: "الوحدات - ابراج",
  description:
    "إدارة ومتابعة جميع الوحدات المسجلة على المنصة وحالات الإشغال والتشغيل في الوقت الفعلي.",
};

export default function UnitsPage() {
  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB] p-4 sm:p-6 lg:px-6 lg:pt-2 lg:pb-6 space-y-[15px]">
      {/* 1. Header Card */}
      <UnitsHeader />

      {/* 2. Filters + Table + Pagination */}
      <UnitsTable />
    </div>
  );
}
