"use client";

import { useQueryState, parseAsString } from "nuqs";
import { motion, AnimatePresence } from "motion/react";
import { OwnerTabs } from "./owner-tabs";
import { OwnerOperationsSummary } from "./owner-operations-summary";
import { OwnerActivityTimeline } from "./owner-activity-timeline";
import { OwnerQuickActions } from "./owner-quick-actions";
import { OwnerTransferableBalance } from "./owner-transferable-balance";
import { OwnerPropertiesTabView } from "./owner-properties-tab-view";
import { OwnerBookingsTabView } from "./owner-bookings-tab-view";
import { OwnerBillingTabView } from "./owner-billing-tab-view";
import { OwnerActivityTabView } from "./owner-activity-tab-view";

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

      {/* Tab Contents with Balanced, Natural Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{
            duration: 0.22,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {tab === "properties" ? (
            /* Tab 2: عقارات المالك */
            <OwnerPropertiesTabView />
          ) : tab === "bookings" ? (
            /* Tab 3: الحجوزات */
            <OwnerBookingsTabView />
          ) : tab === "billing" ? (
            /* Tab 4: الاشتراك والفوترة والحسابات المالية */
            <OwnerBillingTabView />
          ) : tab === "activity" ? (
            /* Tab 5: سجل النشاط والتدقيق الأمني */
            <OwnerActivityTabView />
          ) : (
            /* Tab 1: نظرة عامة (Overview: Two Columns Layout) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Right Column in RTL: Operations & Properties Card + Activity Timeline (col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                <OwnerOperationsSummary onNavigateToProperties={() => setTab("properties")} />
                <OwnerActivityTimeline onNavigateToActivity={() => setTab("activity")} />
              </div>

              {/* Left Column in RTL: Quick Administrative Actions + Transferable Balance (col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                <OwnerQuickActions />
                <OwnerTransferableBalance />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
