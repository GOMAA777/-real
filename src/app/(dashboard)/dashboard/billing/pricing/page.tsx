import { Metadata } from "next";
import { PricingSettingsView } from "@/features/billing/components/pricing-settings-view";

export const metadata: Metadata = {
  title: "إعدادات التسعير وتعديل سعة الشقق | إبراج",
  description: "التحكم في سعر الاشتراك لكل شقة ودورة الفوترة وقواعد التسعير الديناميكي للمنظومة",
};

export default function PricingSettingsPage() {
  return <PricingSettingsView />;
}
