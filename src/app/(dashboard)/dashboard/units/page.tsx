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
    <div className="space-y-6">
      {/* 1. Header Card */}
      <UnitsHeader />

      {/* 2. Filters + Table + Pagination */}
      <UnitsTable />
    </div>
  );
}
