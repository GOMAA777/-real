import type { Metadata } from "next";
import { MaintenanceDetailView } from "@/features/operations/components/maintenance-detail-view";

export function generateStaticParams() {
  return [
    { id: "MT-2048" },
    { id: "MT-2047" },
    { id: "MT-2045" },
    { id: "1" },
    { id: "2" },
  ];
}

interface MaintenanceTicketPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MaintenanceTicketPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `بلاغ صيانة ${id} - ابراج`,
    description: `تفاصيل ومتابعة بلاغ الصيانة ${id} على مستوى المنصة`,
  };
}

export default async function MaintenanceTicketPage({ params }: MaintenanceTicketPageProps) {
  const { id } = await params;
  return <MaintenanceDetailView ticketId={id} />;
}
