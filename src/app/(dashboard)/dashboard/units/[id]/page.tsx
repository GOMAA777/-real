import { Suspense } from "react";
import { UnitDetailPage } from "@/features/units/components/unit-detail/unit-detail-page";

export const metadata = {
  title: "تفاصيل الوحدة السكنية والوصول الذكي | منصة أبراج",
  description: "استعراض تفاصيل الوحدة وحالتها التشغيلية وإدارة كود الدخول وسجل العمليات الفندقية والميدانية",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 50 }, (_, i) => ({ id: String(i + 1) }));
  const unitIds = Array.from({ length: 50 }, (_, i) => ({ id: `unit-${i + 1}` }));
  return [...numericIds, ...unitIds];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UnitRoutePage({ params }: PageProps) {
  return (
    <Suspense fallback={<UnitDetailSkeleton />}>
      <UnitRouteContent params={params} />
    </Suspense>
  );
}

async function UnitRouteContent({ params }: PageProps) {
  const { id } = await params;
  return <UnitDetailPage unitId={id} />;
}

function UnitDetailSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-pulse" dir="rtl">
      {/* Page Header Skeleton */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-24" />

      {/* Unit Hero Card Skeleton */}
      <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-28" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-72" />
          <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-56" />
          <div className="bg-white rounded-[16px] p-6 border border-[#E2E6DC] h-48" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[16px] p-5 border border-[#E2E6DC] h-60" />
          <div className="bg-white rounded-[16px] p-5 border border-[#E2E6DC] h-60" />
          <div className="bg-white rounded-[16px] p-5 border border-[#E2E6DC] h-72" />
        </div>
      </div>
    </div>
  );
}
