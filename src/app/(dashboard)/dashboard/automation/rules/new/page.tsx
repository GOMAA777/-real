import { CreateRuleView } from "@/features/automation/components/rules/create-rule-view";

export const metadata = {
  title: "إنشاء قاعدة أتمتة جديدة | منصة إدارة العقارات",
  description: "إنشاء وصياغة قاعدة أتمتة جديدة وربطها بمحرك المنظومة المركزي",
};

export default function NewRulePage() {
  return <CreateRuleView />;
}
