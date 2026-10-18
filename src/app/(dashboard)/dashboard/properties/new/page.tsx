import { Suspense } from "react";
import type { Metadata } from "next";
import { NewPropertyClientContent } from "@/features/properties/components/new-property-client-content";

export const metadata: Metadata = {
  title: "إضافة عقار جديد | منصة أبراج",
  description: "إدراج عقار جديد وتعيينه لمالك مسجل في المنصة وربط التراخيص والبيانات الجغرافية بدقة.",
};

export default function NewPropertyPage() {
  return (
    <Suspense fallback={<NewPropertySkeleton />}>
      <NewPropertyClientContent />
    </Suspense>
  );
}

function NewPropertySkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] h-28" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-80" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-32" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-64" />
        </div>
      </div>
    </div>
  );
}
