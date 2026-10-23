import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWhatsAppLogView } from "@/features/bookings/components/booking-whatsapp-log-view";

export const metadata: Metadata = {
  title: "سجل رسائل WhatsApp | منصة أبراج",
  description: "متابعة الخط الزمني المباشر لرسائل الأتمتة التشغيلية المرسلة والمجدولة للنزيل عبر بوابة WhatsApp Business API",
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

export default function BookingWhatsAppPage({ params }: PageProps) {
  return (
    <Suspense fallback={<WhatsAppLogSkeleton />}>
      <WhatsAppLogContent params={params} />
    </Suspense>
  );
}

async function WhatsAppLogContent({ params }: PageProps) {
  const { id } = await params;
  const bookingCode = id ? (id.startsWith("BK-") ? id : `BK-${id}`) : "BK-10482";

  return <BookingWhatsAppLogView bookingCode={bookingCode} />;
}

function WhatsAppLogSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] h-28" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl h-14 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-44 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-44 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-44 border border-[#E2E6DC]" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl h-96 border border-[#E2E6DC]" />
          <div className="bg-white rounded-3xl h-32 border border-[#E2E6DC]" />
        </div>
      </div>
    </div>
  );
}
