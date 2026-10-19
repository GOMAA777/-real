import type { Metadata } from "next";
import { BookingWhatsAppLogView } from "@/features/bookings/components/booking-whatsapp-log-view";

export const metadata: Metadata = {
  title: "سجل رسائل WhatsApp | منصة أبراج",
  description: "متابعة الخط الزمني المباشر لرسائل الأتمتة التشغيلية المرسلة والمجدولة للنزيل عبر بوابة WhatsApp Business API",
};

export default function WhatsAppStandalonePage() {
  return <BookingWhatsAppLogView />;
}
