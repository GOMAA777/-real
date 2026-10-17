import type { Metadata } from "next";
import { OwnersHeader } from "@/features/owners/components/owners-header";
import { OwnersKPIs } from "@/features/owners/components/owners-kpis";
import { OwnersTable } from "@/features/owners/components/owners-table";

export const metadata: Metadata = {
  title: "إدارة أصحاب العقارات - ابراج",
  description: "إدارة ومتابعة جميع أصحاب العقارات المسجلين وتراخيصهم على المنصة.",
};

export default function OwnersPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <OwnersHeader />

      {/* 2. 4 Metric KPI Cards */}
      <OwnersKPIs />

      {/* 3. Filters + Table + Pagination */}
      <OwnersTable />
    </div>
  );
}
