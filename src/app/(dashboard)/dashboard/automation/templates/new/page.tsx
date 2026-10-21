import { CreateTemplateView } from "@/features/automation/components/templates/create-template-view";

export const metadata = {
  title: "إنشاء قالب واتساب جديد | منصة إدارة العقارات",
  description: "إنشاء وصياغة قالب رسالة واتساب معتمد وقابل لإعادة الاستخدام عبر Meta Cloud API",
};

export default function NewTemplatePage() {
  return <CreateTemplateView />;
}
