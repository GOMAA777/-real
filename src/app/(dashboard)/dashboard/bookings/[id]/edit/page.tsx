import { Suspense } from "react";
import type { Metadata } from "next";
import { EditBookingForm } from "@/features/bookings/components/edit-booking-form";

export const metadata: Metadata = {
  title: "تعديل الحجز | منصة أبراج",
  description: "تحديث مواعيد الإقامة، بيانات الوحدة، وتفاصيل الدفع والنزيل للحجز",
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

export default function EditBookingPage({ params }: PageProps) {
  return (
    <Suspense fallback={<EditBookingSkeleton />}>
      <EditBookingContent params={params} />
    </Suspense>
  );
}

async function EditBookingContent({ params }: PageProps) {
  const { id } = await params;
  const bookingId = id ? (id.startsWith("BK-") ? id : `BK-${id}`) : "BK-10482";

  return <EditBookingForm bookingId={bookingId} />;
}

function EditBookingSkeleton() {
  return (
    <div className="space-y-6 pb-28 animate-pulse" dir="rtl">
      {/* Toast Skeleton */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E6DC] h-16" />

      {/* Header Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] h-24" />

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6 order-1">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-52" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-44" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-40" />
        </div>
        <div className="lg:col-span-4 space-y-6 order-2">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-80" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-60" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
        </div>
      </div>
    </div>
  );
}
