import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingDetailView } from "@/features/bookings/components/booking-detail-view";
import { defaultBookingDetail } from "@/features/bookings/data/mock-booking-detail";

export const metadata: Metadata = {
  title: "تفاصيل الحجز | منصة أبراج",
  description: "ملف الحجز التشغيلي وإدارة علاقات الإقامة والأتمتة وتفاصيل الوحدات والأقفال الذكية",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 100 }, (_, i) => ({ id: String(i + 1) }));
  const bookingIds = [
    { id: "1048" },
    { id: "10482" },
    { id: "bk-1048" },
    { id: "BK-1048" },
    { id: "BK-10482" },
    { id: "bk-1" },
    { id: "bk-2" },
    { id: "[id]" },
  ];
  return [...numericIds, ...bookingIds];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookingDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<BookingDetailSkeleton />}>
      <BookingDetailContent params={params} />
    </Suspense>
  );
}

async function BookingDetailContent({ params }: PageProps) {
  const { id } = await params;

  // Enrich default booking with provided id
  const booking = {
    ...defaultBookingDetail,
    id: id || defaultBookingDetail.id,
    bookingCode: id?.startsWith("BK-") ? id : defaultBookingDetail.bookingCode,
  };

  return <BookingDetailView booking={booking} />;
}

function BookingDetailSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-pulse" dir="rtl">
      {/* Header Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] h-28" />

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6 order-1">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-80" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
        </div>
        <div className="lg:col-span-4 space-y-6 order-2">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-80" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
        </div>
      </div>
    </div>
  );
}
