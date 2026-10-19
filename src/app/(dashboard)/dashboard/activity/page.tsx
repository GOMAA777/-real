import type { Metadata } from "next";
import { BookingActivityLogView } from "@/features/bookings/components/booking-activity-log-view";

export const metadata: Metadata = {
  title: "سجل نشاط الحجز | منصة أبراج",
  description: "التتبع الزمني الدقيق وسجل التدقيق الإداري لجميع التغييرات والعمليات المنفذة على الحجز",
};

export default function ActivityStandalonePage() {
  return <BookingActivityLogView />;
}
