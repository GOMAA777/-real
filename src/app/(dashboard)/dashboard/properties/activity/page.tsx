import type { Metadata } from "next";
import { PropertyActivityLogView } from "@/features/properties/components/property-activity-log-view";

export const metadata: Metadata = {
  title: "سجل الأحداث الكامل للعقار | منصة أبراج",
  description: "تتبع غير قابل للتلاعب لكافة التغييرات والعمليات المنفذة على الأصل العقاري",
};

export default function PropertyActivityStandalonePage() {
  return <PropertyActivityLogView />;
}
