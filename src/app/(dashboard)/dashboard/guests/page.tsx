import type { Metadata } from "next";
import { GuestDetailView } from "@/features/guests/components/guest-detail-view";
import { defaultGuestDetail } from "@/features/guests/data/mock-guest-detail";

export const metadata: Metadata = {
  title: "بيانات العميل | منصة أبراج",
  description: "الملف التعريفي للنزيل وسجل العمليات والحجوزات المسجلة عبر المنصة",
};

export default function GuestIndexPage() {
  return <GuestDetailView guest={defaultGuestDetail} />;
}
