import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { OwnerProfileCard } from "@/features/owners/components/owner-profile-card";
import { OwnerKPICards } from "@/features/owners/components/owner-kpi-cards";
import { OwnerTabsSection } from "@/features/owners/components/owner-tabs-section";

export const metadata = {
  title: "بيانات صاحب العقار | منصة أبراج",
  description: "ملف صاحب العقار وتفاصيل العقارات والوحدات والحجوزات والأداء التشغيلي",
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ tab?: string }>;
}

export default async function OwnerDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialTab = resolvedSearchParams?.tab || "overview";

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

      {/* 3. Navigation Tabs & Active Tab View */}
      <OwnerTabsSection initialTab={initialTab} />
    </div>
  );
}
