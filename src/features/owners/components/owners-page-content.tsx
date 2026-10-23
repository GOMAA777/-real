"use client";

import { useSearchParams } from "next/navigation";
import { OwnersHeader } from "./owners-header";
import { OwnersKPIs } from "./owners-kpis";
import { OwnersTable } from "./owners-table";
import { OwnersEmptyState } from "./owners-empty-state";

export function OwnersPageContent() {
  const searchParams = useSearchParams();
  const empty = searchParams.get("empty");
  const isEmpty = empty === "true" || empty === "1";

  if (isEmpty) {
    return (
      <div className="space-y-6">
        <OwnersHeader />
        <OwnersEmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OwnersHeader />
      <OwnersKPIs />
      <OwnersTable />
    </div>
  );
}
