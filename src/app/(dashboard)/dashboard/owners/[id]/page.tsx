import { Suspense } from "react";
import { OwnerProfileCard } from "@/features/owners/components/owner-profile-card";
import { OwnerKPICards } from "@/features/owners/components/owner-kpi-cards";
import { OwnerTabsSection } from "@/features/owners/components/owner-tabs-section";

export const metadata = {
  title: "بيانات صاحب العقار | منصة أبراج",
  description: "ملف صاحب العقار وتفاصيل العقارات والوحدات والحجوزات والأداء التشغيلي",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  const ownerIds = Array.from({ length: 100 }, (_, i) => ({ id: `owner-${i + 1}` }));
  return [...numericIds, ...ownerIds, { id: "[id]" }];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OwnerDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6 pb-12">
      {/* Dynamic Data wrapped in Suspense for Instant Navigation */}
      <Suspense fallback={<OwnerDetailSkeleton />}>
        <OwnerDetailContent params={params} />
      </Suspense>
    </div>
  );
}

async function OwnerDetailContent({ params }: PageProps) {
  const { id } = await params;
  const initialTab = "overview";

  // Mock owner matching design screenshots
  const ownerData = {
    id: id || "1",
    name: "محمد بن سالم العتيبي",
    initials: "ع م",
    code: "#PO-8821",
    joinDate: "16 سبتمبر 2026",
    relativeJoin: "منذ 4 أيام",
    status: "active",
    email: "m.otaibi@domain.sa",
    phone: "+966 50 482 9102",
    paymentMethod: "مدى / فيزا (4912••)",
  };

  return (
    <div className="space-y-6">
      {/* 1. Owner Profile Card */}
      <OwnerProfileCard owner={ownerData} />

      {/* 2. 4 Metric KPI Cards */}
      <OwnerKPICards />

      {/* 3. Navigation Tabs & Active Tab View */}
      <OwnerTabsSection initialTab={initialTab} />
    </div>
  );
}

function OwnerDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Card Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF2E6]" />
            <div className="space-y-2">
              <div className="w-44 h-5 rounded-lg bg-[#EEF2E6]" />
              <div className="w-28 h-4 rounded-lg bg-[#F6F8F4]" />
            </div>
          </div>
          <div className="w-24 h-8 rounded-full bg-[#EEF2E6]" />
        </div>
        <div className="pt-4 border-t border-[#EEF2E6] grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-12 rounded-2xl bg-[#F6F8F4]" />
          <div className="h-12 rounded-2xl bg-[#F6F8F4]" />
          <div className="h-12 rounded-2xl bg-[#F6F8F4]" />
        </div>
      </div>

      {/* 4 KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs h-28 flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="w-24 h-3.5 rounded bg-[#EEF2E6]" />
              <div className="w-16 h-7 rounded bg-[#F6F8F4]" />
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#EEF2E6]" />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-white rounded-2xl p-2 border border-[#E2E6DC] h-12 shadow-2xs" />

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E2E6DC] h-96 shadow-2xs" />
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E2E6DC] h-96 shadow-2xs" />
      </div>
    </div>
  );
}
