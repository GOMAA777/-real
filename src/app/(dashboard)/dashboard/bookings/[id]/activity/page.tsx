import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingActivityLogView } from "@/features/bookings/components/booking-activity-log-view";
import { defaultBookingActivitySummary } from "@/features/bookings/data/mock-booking-activity-log";

export const metadata: Metadata = {
  title: "سجل نشاط الحجز | منصة أبراج",
  description: "التتبع الزمني الدقيق وسجل التدقيق الإداري لجميع التغييرات والعمليات المنفذة على الحجز",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  const bkIds = Array.from({ length: 50 }, (_, i) => ({ id: `bk-${i + 1}` }));
  const capBkIds = Array.from({ length: 50 }, (_, i) => ({ id: `BK-${i + 1}` }));
  const bookingCodes = Array.from({ length: 50 }, (_, i) => ({ id: `BK-${10480 + i}` }));
  const rawCodes = Array.from({ length: 50 }, (_, i) => ({ id: String(10480 + i) }));
  const specialIds = [
    { id: "1048" },
    { id: "10482" },
    { id: "bk-1048" },
    { id: "BK-1048" },
    { id: "BK-10482" },
  ];
  return [...numericIds, ...bkIds, ...capBkIds, ...bookingCodes, ...rawCodes, ...specialIds];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingActivityPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ActivityLogSkeleton />}>
      <ActivityLogContent params={params} />
    </Suspense>
  );
}

async function ActivityLogContent({ params }: PageProps) {
  const { id } = await params;
  const bookingCode = id
    ? id.startsWith("BK-") || id.startsWith("bk-")
      ? id.toUpperCase()
      : `BK-${id}`
    : "BK-10482";

  const summary = {
    ...defaultBookingActivitySummary,
    bookingCode: bookingCode.startsWith("BK-") ? bookingCode : `BK-${bookingCode}`,
  };

  return <BookingActivityLogView initialSummary={summary} />;
}

function ActivityLogSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] h-28" />
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] h-20" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl h-64 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-48 border border-[#E2E6DC]" />
        </div>
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl h-14 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-44 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-44 border border-[#E2E6DC]" />
        </div>
      </div>
    </div>
  );
}
