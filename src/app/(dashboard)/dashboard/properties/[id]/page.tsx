import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyDetailHeader } from "@/features/properties/components/property-detail-header";
import { PropertyHeroCard } from "@/features/properties/components/property-hero-card";
import { PropertyArchitecturalSpecs } from "@/features/properties/components/property-architectural-specs";
import { PropertyLocationCard } from "@/features/properties/components/property-location-card";
import { PropertyUnitsCard } from "@/features/properties/components/property-units-card";
import { PropertyAdminActions } from "@/features/properties/components/property-admin-actions";
import { PropertyRecentBookings } from "@/features/properties/components/property-recent-bookings";
import { defaultPropertyDetail } from "@/features/properties/data/mock-property-detail";

export const metadata: Metadata = {
  title: "تفاصيل العقار | منصة أبراج",
  description: "عرض تفاصيل العقار والوحدات والمواصفات المعمارية والموقع الجغرافي والحجوزات الأخيرة",
};

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header with Breadcrumb / Title & Back Button */}
      <PropertyDetailHeader title="تفاصيل العقار" fallbackHref="/dashboard/properties" />

      {/* 2. Main Content wrapped in Suspense for instant navigation */}
      <Suspense fallback={<PropertyDetailSkeleton />}>
        <PropertyDetailContent params={params} />
      </Suspense>
    </div>
  );
}

async function PropertyDetailContent({ params }: PageProps) {
  const { id } = await params;

  // Use mock property data matching design, enriched with id
  const property = {
    ...defaultPropertyDetail,
    id: id || defaultPropertyDetail.id,
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Overview Card with Photo & Quick Metrics */}
      <PropertyHeroCard property={property} />

      {/* 2. Two-Column Layout for Specs, Location, Units, and Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL: Architectural Specs & Geographic Location (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <PropertyArchitecturalSpecs specs={property.specs} />
          <PropertyLocationCard locationInfo={property.locationInfo} />
        </div>

        {/* Left Column in RTL: Associated Units & Admin Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <PropertyUnitsCard
            units={property.units}
            totalUnitsCount={property.totalUnits}
          />
          <PropertyAdminActions ownerId="1" ownerName="محمد العتيبي" />
        </div>
      </div>

      {/* 3. Bottom Full-Width Table: Recent Bookings */}
      <PropertyRecentBookings
        bookings={property.recentBookings}
        propertyName={property.name}
        totalBookingsCount={10}
      />
    </div>
  );
}

function PropertyDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs h-80" />

      {/* Middle Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs h-96" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs h-80" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs h-72" />
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs h-64" />
        </div>
      </div>

      {/* Bookings Table Skeleton */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs h-80" />
    </div>
  );
}
