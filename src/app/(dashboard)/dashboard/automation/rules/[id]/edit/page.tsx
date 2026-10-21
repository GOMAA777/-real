import { notFound } from "next/navigation";
import { EditRuleView } from "@/features/automation/components/rules/edit-rule-view";
import { initialAutomationRules } from "@/features/automation/data/mock-automation";

export const metadata = {
  title: "تعديل قاعدة الأتمتة | منصة إدارة العقارات",
  description: "تعديل محددات الإطلاق والشروط والإجراءات التلقائية المعتمدة للمنظومة",
};

export function generateStaticParams() {
  return initialAutomationRules.map((rule) => ({
    id: rule.id,
  }));
}

export default async function EditRulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = initialAutomationRules.find((r) => r.id === id) || initialAutomationRules[1];

  if (!rule) {
    notFound();
  }

  return <EditRuleView rule={rule} />;
}
