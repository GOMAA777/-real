import type { Metadata } from "next";
import { WhatsAppStaffChatView } from "@/features/whatsapp/components/whatsapp-staff-chat-view";

export const metadata: Metadata = {
  title: "واتساب | منصة أبراج",
  description:
    "محادثات وطلبات المستأجرين والنزلاء المرتبطة بالحجوزات والعمليات التشغيلية التلقائية",
};

export default function WhatsAppPage() {
  return <WhatsAppStaffChatView />;
}
