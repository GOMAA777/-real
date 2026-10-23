import { Suspense } from "react";
import { MainBookingsPageView } from "@/features/bookings/components/main-bookings-page-view";

export const metadata = {
  title: "الحجوزات | منصة أبراج",
  description: "إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة",
};

export default function BookingsPage() {
  return (
    <div className="pb-12">
      <Suspense
        fallback={
          <div className="h-96 animate-pulse bg-white rounded-3xl border border-[#E2E6DC]" />
        }
      >
        <MainBookingsPageView />
      </Suspense>
    </div>
  );
}
