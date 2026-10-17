"use client";

import { useQueryState, parseAsString } from "nuqs";
import { OwnerTabs } from "./owner-tabs";
import { OwnerOperationsSummary } from "./owner-operations-summary";
import { OwnerActivityTimeline } from "./owner-activity-timeline";
import { OwnerQuickActions } from "./owner-quick-actions";
import { OwnerTransferableBalance } from "./owner-transferable-balance";
import { OwnerPropertiesTabView } from "./owner-properties-tab-view";

interface OwnerTabsSectionProps {
  initialTab?: string;
  propertiesCount?: number;
  bookingsCount?: number;
  activityCount?: number;
}

export function OwnerTabsSection({
  initialTab = "overview",
  propertiesCount = 4,
  bookingsCount = 18,
  activityCount = 24,
}: OwnerTabsSectionProps) {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault(initialTab).withOptions({ shallow: true })
  );

  return (
    <div className="space-y-6">
      {/* Top Tab Bar */}
      <OwnerTabs
        activeTab={tab}
        onTabChange={(newTab) => setTab(newTab)}
        propertiesCount={propertiesCount}
        bookingsCount={bookingsCount}
        activityCount={activityCount}
      />

      {/* Tab Contents */}
      {tab === "properties" ? (
        /* Tab 2: عقارات المالك (Matching the user's design screenshot) */
        <OwnerPropertiesTabView />
      ) : (
        /* Tab 1: نظرة عامة (Overview: Two Columns Layout) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right Column in RTL: Operations & Properties Card + Activity Timeline (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            <OwnerOperationsSummary onNavigateToProperties={() => setTab("properties")} />
            <OwnerActivityTimeline />
          </div>

          {/* Left Column in RTL: Quick Administrative Actions + Transferable Balance (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <OwnerQuickActions />
            <OwnerTransferableBalance />
          </div>
        </div>
      )}
    </div>
  );
}
