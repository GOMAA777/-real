import { Suspense } from "react";
import type { Metadata } from "next";
import { NewBookingClientContent } from "@/features/bookings/components/new-booking-client-content";

export const metadata: Metadata = {
  title: "إضافة حجز | منصة أبراج",
  description:
    "إدراج عقار جديد وتعيينه لمالك مسجل في المنصة وربط التراخيص والبيانات الجغرافية بدقة.",
};

export default function NewBookingPage() {
  return (
    <Suspense fallback={<NewBookingSkeleton />}>
      <NewBookingClientContent />
    </Suspense>
  );
}

function NewBookingSkeleton() {
  return (
    <div className="space-y-6 pb-24 animate-pulse">
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-28" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-48" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-32" />
        </div>
      </div>
    </div>
  );
}
