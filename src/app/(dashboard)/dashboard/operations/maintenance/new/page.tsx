import type { Metadata } from "next";
import { CreateMaintenanceTicketView } from "@/features/operations/components/create-maintenance-ticket-view";

export const metadata: Metadata = {
  title: "إنشاء بلاغ صيانة جديد - ابراج",
  description: "تسجيل عطل تشغيلي أو بلاغ صيانة ميداني لربطه بالأصل العقاري وجدولته فورياً.",
};

export default function NewMaintenanceTicketPage() {
  return <CreateMaintenanceTicketView />;
}
