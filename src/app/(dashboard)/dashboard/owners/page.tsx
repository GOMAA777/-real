import type { Metadata } from "next";
import { OwnersHeader } from "@/features/owners/components/owners-header";
import { OwnersKPIs } from "@/features/owners/components/owners-kpis";
import { OwnersTable } from "@/features/owners/components/owners-table";
import { OwnersEmptyState } from "@/features/owners/components/owners-empty-state";

export const metadata: Metadata = {
  title: "إدارة أصحاب العقارات - ابراج",
  description: "إدارة ومتابعة جميع أصحاب العقارات المسجلين وتراخيصهم على المنصة.",
};

interface PageProps {
  searchParams: Promise<{ empty?: string }>;
}

export default async function OwnersPage({ searchParams }: PageProps) {
  const { empty } = await searchParams;
  const isEmpty = empty === "true" || empty === "1";

  if (isEmpty) {
    return (
      <div className="space-y-6">
        {/* 1. Header Card */}
        <OwnersHeader />

        {/* 2. Empty State View */}
        <OwnersEmptyState />
      </div>
    );
  }

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
