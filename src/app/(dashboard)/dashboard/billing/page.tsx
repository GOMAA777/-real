import { Metadata } from "next";
import { SubscriptionsListView } from "@/features/billing/components/subscriptions-list-view";

export const metadata: Metadata = {
  title: "الاشتراكات والفوترة | إبراج لإدارة العقارات",
  description: "إدارة باقات الحساب والحدود الاستيعابية للشقق وتفاصيل الفوترة والضرائب",
};

export default function BillingPage() {
  return <SubscriptionsListView />;
}
