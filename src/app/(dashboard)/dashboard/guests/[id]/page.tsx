import { Suspense } from "react";
import type { Metadata } from "next";
import { GuestDetailView } from "@/features/guests/components/guest-detail-view";
import { defaultGuestDetail } from "@/features/guests/data/mock-guest-detail";

export const metadata: Metadata = {
  title: "بيانات العميل | منصة أبراج",
  description: "الملف التعريفي للنزيل وسجل العمليات والحجوزات المسجلة عبر المنصة",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
  const guestIds = [
    { id: "gust-89324" },
    { id: "GUST-89324" },
    { id: "89324" },
    { id: "khaled" },
    { id: "[id]" },
  ];
  return [...numericIds, ...guestIds];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GuestDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<GuestDetailSkeleton />}>
      <GuestDetailContent params={params} />
    </Suspense>
  );
}

async function GuestDetailContent({ params }: PageProps) {
  const { id } = await params;

  // Enrich default guest detail with the id param
  const guest = {
    ...defaultGuestDetail,
    id: id || defaultGuestDetail.id,
    guestCode: id?.startsWith("GUST-") ? id : defaultGuestDetail.guestCode,
  };

  return <GuestDetailView guest={guest} />;
}

function GuestDetailSkeleton() {
  return (
    <div className="space-y-6 pb-12 animate-pulse" dir="rtl">
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-24" />
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-72" />
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] h-80" />
    </div>
  );
}
