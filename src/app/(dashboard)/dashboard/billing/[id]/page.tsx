import { Metadata } from "next";
import { SubscriptionDetailView } from "@/features/billing/components/subscription-detail-view";
import { initialSubscriptions } from "@/features/billing/data/mock-billing";

export const metadata: Metadata = {
  title: "تفاصيل الاشتراك والفوترة | إبراج",
  description: "عرض تفاصيل باقة المالك وسعة الشقق والعمليات المحاسبية والفواتير الضريبية",
};

export function generateStaticParams() {
  const numericIds = Array.from({ length: 50 }, (_, i) => ({ id: String(i + 1) }));
  const codeIds = initialSubscriptions.map((s) => ({ id: String(s.id) }));
  const subIds = ["SUB-101", "SUB-102", "SUB-103", "SUB-104", "SUB-105", "SUB-106"].map((id) => ({ id }));
  return [...numericIds, ...codeIds, ...subIds];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubscriptionDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SubscriptionDetailView />;
}
