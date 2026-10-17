import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { OwnerProfileCard } from "@/features/owners/components/owner-profile-card";
import { OwnerKPICards } from "@/features/owners/components/owner-kpi-cards";
import { OwnerTabs } from "@/features/owners/components/owner-tabs";
import { OwnerOperationsSummary } from "@/features/owners/components/owner-operations-summary";
import { OwnerPropertiesList } from "@/features/owners/components/owner-properties-list";
import { OwnerActivityTimeline } from "@/features/owners/components/owner-activity-timeline";
import { OwnerQuickActions } from "@/features/owners/components/owner-quick-actions";
import { OwnerTransferableBalance } from "@/features/owners/components/owner-transferable-balance";

export const metadata = {
  title: "بيانات صاحب العقار | منصة أبراج",
  description: "ملف صاحب العقار وتفاصيل العقارات والوحدات والحجوزات والأداء التشغيلي",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OwnerDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Mock owner matching design screenshots
  const ownerData = {
    id: id || "1",
    name: "محمد بن سالم العتيبي",
    initials: "ع م",
    code: "#PO-8821",
    joinDate: "16 سبتمبر 2026",
    relativeJoin: "منذ 4 أيام",
    status: "active",
    email: "m.otaibi@domain.sa",
    phone: "+966 50 482 9102",
    paymentMethod: "مدى / فيزا (4912••)",
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#7D8A78]">
        <Link
          href="/dashboard/owners"
          className="hover:text-[#172115] transition-colors flex items-center gap-1 font-medium"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>أصحاب العقارات</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180 text-[#CCD5C5]" />
        <span className="font-bold text-[#172115]">بيانات صاحب العقار</span>
      </div>

      {/* 1. Owner Profile Card */}
      <OwnerProfileCard owner={ownerData} />

      {/* 2. 4 Metric KPI Cards */}
      <OwnerKPICards />

      {/* 3. Navigation Tabs */}
      <OwnerTabs />

      {/* 4. Bottom Main Content (Two Columns Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL: Operations Summary + Properties + Activity (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <OwnerOperationsSummary />
          <OwnerPropertiesList />
          <OwnerActivityTimeline />
        </div>

        {/* Left Column in RTL: Quick Administrative Actions + Transferable Balance (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <OwnerQuickActions />
          <OwnerTransferableBalance />
        </div>
      </div>
    </div>
  );
}
