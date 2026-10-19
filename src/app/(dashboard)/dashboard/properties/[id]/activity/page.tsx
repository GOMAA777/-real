import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyActivityLogView } from "@/features/properties/components/property-activity-log-view";
import { defaultPropertyActivitySummary } from "@/features/properties/data/mock-property-activity-log";

export const metadata: Metadata = {
  title: "سجل الأحداث الكامل للعقار | منصة أبراج",
  description: "تتبع غير قابل للتلاعب لكافة التغييرات والعمليات المنفذة على الأصل العقاري",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  const propIds = Array.from({ length: 100 }, (_, i) => ({ id: `prop-${i + 1}` }));
  const specialIds = [
    { id: "014" },
    { id: "prop-014" },
    { id: "nakheel" },
    { id: "oasis" },
    { id: "aqeeq" },
  ];
  return [...numericIds, ...propIds, ...specialIds];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyActivityPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PropertyActivitySkeleton />}>
      <PropertyActivityContent params={params} />
    </Suspense>
  );
}

async function PropertyActivityContent({ params }: PageProps) {
  const { id } = await params;

  return (
    <PropertyActivityLogView
      propertyId={id || "1"}
      initialSummary={defaultPropertyActivitySummary}
    />
  );
}

function PropertyActivitySkeleton() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] h-28" />
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] h-20" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl h-96 border border-[#E2E6DC]" />
        </div>
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl h-44 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-24 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-24 border border-[#E2E6DC]" />
        </div>
      </div>
    </div>
  );
}
