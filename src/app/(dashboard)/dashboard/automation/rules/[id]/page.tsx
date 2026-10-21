import { notFound } from "next/navigation";
import { RuleDetailView } from "@/features/automation/components/rules/rule-detail-view";
import { initialAutomationRules } from "@/features/automation/data/mock-automation";

export const metadata = {
  title: "تفاصيل قاعدة الأتمتة | منصة إدارة العقارات",
  description: "استعراض معايير تشغيل وسجل العمليات اللحظي لقاعدة الأتمتة",
};

export function generateStaticParams() {
  return initialAutomationRules.map((rule) => ({
    id: rule.id,
  }));
}

export default async function RuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = initialAutomationRules.find((r) => r.id === id) || initialAutomationRules[1]; // default to AUT-102

  if (!rule) {
    notFound();
  }

  return <RuleDetailView rule={rule} />;
}
