import { notFound } from "next/navigation";
import { ExecutionLogDetailView } from "@/features/automation/components/logs/execution-log-detail-view";
import { initialExecutionLogs } from "@/features/automation/data/mock-automation";

export const metadata = {
  title: "تفاصيل سجل التنفيذ | منصة إدارة العقارات",
  description: "سجل التدقيق الشامل لعملية التشغيل التلقائي وحالة تسليم الرسالة",
};

export function generateStaticParams() {
  const ids = [
    ...initialExecutionLogs.map((l) => ({ id: l.id })),
    { id: "EX-104829" },
    { id: "EX-104828" },
    { id: "EX-104825" },
  ];
  return ids;
}

export default async function ExecutionLogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const foundLog = initialExecutionLogs.find((l) => l.id === id);

  // If not found in mock list, construct the standard EX-104829 log matching Figma node 1:25710
  const log =
    foundLog || {
      id: id || "EX-104829",
      logCode: `#${id || "EX-104829"}`,
      date: "18 سبتمبر 2026",
      time: "09:00:15 ص",
      ruleId: "RUL-882",
      ruleName: "تأكيد الحجز الفوري وإرسال كود الدخول",
      triggerDetails: "المحفز: عند إنشاء حجز جديد مؤكد",
      bookingId: "BK-10482",
      guestName: "خالد العتيبي",
      guestPhone: "+966 50 123 4567",
      propertyName: "عمارة النخيل",
      unitName: "وحدة 204",
      actionType: "whatsapp",
      actionBadgeLabel: "WhatsApp Cloud (checkin)",
      status: "success" as const,
      statusSummary: "تم التسليم والقراءة للمستلم",
      responseTime: "4.2 ثانية",
      metaCloudMessageId: "wamid.HBjgM104ODkyNTM2MjEwOAAA",
    };

  return <ExecutionLogDetailView log={log} />;
}
