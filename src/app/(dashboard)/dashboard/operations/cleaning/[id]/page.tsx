import type { Metadata } from "next";
import { CleaningDetailView } from "@/features/operations/components/cleaning-detail-view";

export function generateStaticParams() {
  return [
    { id: "CL-10482" },
    { id: "CL-10481" },
    { id: "CL-10479" },
    { id: "1" },
    { id: "2" },
  ];
}

interface CleaningTaskPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CleaningTaskPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `مهمة تنظيف ${id} - ابراج`,
    description: `تفاصيل ومتابعة مهمة التنظيف ${id} على مستوى المنصة`,
  };
}

export default async function CleaningTaskPage({ params }: CleaningTaskPageProps) {
  const { id } = await params;
  return <CleaningDetailView taskId={id} />;
}
