import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardWelcome } from "@/features/dashboard/components/dashboard-welcome";
import { DashboardKPIs } from "@/features/dashboard/components/dashboard-kpis";
import { DashboardGrowthChart } from "@/features/dashboard/components/dashboard-growth-chart";
import { DashboardStatusBreakdown } from "@/features/dashboard/components/dashboard-status-breakdown";
import { DashboardRecentOwners } from "@/features/dashboard/components/dashboard-recent-owners";
import { DashboardRecentProperties } from "@/features/dashboard/components/dashboard-recent-properties";
import { DashboardActivityFeed } from "@/features/dashboard/components/dashboard-activity-feed";

export const metadata: Metadata = {
  title: "الرئيسية - ابراج لإدارة الأملاك",
  description: "لوحة التحكم الرئيسية لإدارة وتشغيل الأصول والوحدات العقارية.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <DashboardWelcome />

      {/* 2. Top Metric KPI Cards */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-white/70 border border-[#E0E4D8]"
              />
            ))}
          </div>
        }
      >
        <DashboardKPIs />
      </Suspense>

      {/* 3. Growth Chart & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Suspense
            fallback={
              <div className="h-80 rounded-2xl bg-white/70 border border-[#E0E4D8] animate-pulse" />
            }
          >
            <DashboardGrowthChart />
          </Suspense>
        </div>

        <div className="lg:col-span-4">
          <DashboardStatusBreakdown />
        </div>
      </div>

      {/* 4. Recent Owners Table & Recent Properties List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <DashboardRecentOwners />
        </div>

        <div className="lg:col-span-5">
          <DashboardRecentProperties />
        </div>
      </div>

      {/* 5. Recent Activity Feed */}
      <DashboardActivityFeed />
    </div>
  );
}
