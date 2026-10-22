"use client";

import { useState } from "react";
import { initialUnits } from "../../data/mock-units";
import { UnitHeroCard } from "./unit-hero-card";
import { UnitSpecsCard } from "./unit-specs-card";
import { UnitActiveBookingCard } from "./unit-active-booking-card";
import { UnitSmartLockCard } from "./unit-smart-lock-card";
import { UnitGalleryCard } from "./unit-gallery-card";
import { UnitActivityTimelineCard } from "./unit-activity-timeline-card";
import { UnitSidebarCards } from "./unit-sidebar-cards";
import { AccessCodeModal } from "./access-code-modal";
import { ShowCodeModal } from "./show-code-modal";
import { OperationsLogView } from "./operations-log-view";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";

interface UnitDetailPageProps {
  unitId?: string;
}

export function UnitDetailPage({ unitId = "1" }: UnitDetailPageProps) {
  // Find matching unit or fallback to Unit 204
  const unit = initialUnits.find((u) => u.id === unitId || u.unitNumber === unitId) ?? initialUnits[0];

  useSetBreadcrumbTitle(`وحدة ${unit.unitNumber}`, `#${unit.unitNumber}`);

  // Interactive modal states
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showOperationsLog, setShowOperationsLog] = useState(false);

  // If Operations Log view is active [1:15620]
  if (showOperationsLog) {
    return (
      <div className="space-y-6 pb-12" dir="rtl">
        <OperationsLogView
          onBack={() => setShowOperationsLog(false)}
          unitNumber={unit.unitNumber}
          propertyName={unit.propertyName}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Top Hero Card with Unit Details */}
      <UnitHeroCard
        unitNumber={unit.unitNumber}
        statusLabel="مشغولة (نزيل حالي)"
        propertyName={unit.propertyName}
        location="الرياض — حي العليا"
        floor="الطابق الثاني"
        iotStatus="متصل ونشط IoT"
        iotSubtitle="ربط القفل السحابي"
      />

      {/* 3. Main Two-Column Layout (Figma Master Record Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Column (approx 65% width / 8 columns in RTL) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: بيانات ومواصفات الوحدة */}
          <UnitSpecsCard
            unitNumber={unit.unitNumber}
            unitType="استوديو فندقي"
            floorLevel="الطابق الثاني (2)"
            actualArea="45"
            capacity="2 ضيوف كحد أقصى"
            basePrice="250"
            pricingModel="يومي (لكل ليلة)"
            systemEntryDate="10 سبتمبر 2026"
          />

          {/* Section 2: الحجز الحالي المسجل */}
          <UnitActiveBookingCard
            bookingId="BK-10482"
            guestName="خالد العتيبي"
            guestPhone="+966 54 887 2311"
            guestInitial="خ"
            stayDates="18 سبتمبر — 21 سبتمبر 2026"
            stayRemaining="متبقي ليلتان (تسجيل الخروج: 12:00 م)"
            totalAmount="750.00"
            paymentStatus="مدفوع بالكامل عبر منصة شريكة"
            channelName="قناة الحجز: بوابة Booking المزامنة"
            bookingRef="معرف الحجز: BK-10482"
          />

          {/* Section 3: نظام وكود الدخول الذكي */}
          <UnitSmartLockCard
            unitNumber={unit.unitNumber}
            onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
            onOpenShowCode={() => setShowCodeModal(true)}
            lockProtocol="TTLock Cloud Gateway v4.2"
            validityText="صلاحية الكود: ساري حتى 21 سبتمبر 2026 — 12:00 م (انتهاء الإقامة تلقائياً)"
          />

          {/* Section 4: معرض صور الوحدة */}
          <UnitGalleryCard />

          {/* Section 5: سجل النشاط والتدقيق الإداري */}
          <UnitActivityTimelineCard
            onOpenOperationsLog={() => setShowOperationsLog(true)}
          />
        </div>

        {/* Secondary / Sidebar Column (approx 35% width / 4 columns in RTL) */}
        <div className="lg:col-span-4">
          <UnitSidebarCards
            propertyName={unit.propertyName}
            propertyType="مجمع سكني فندقي فاخر"
            cityArea="الرياض — حي العليا"
            totalUnits="12 وحدة مخدومة"
            connectionStatus="مكتمل التراخيص والمطابقة"
            propertyId={unit.propertyId}
            ownerName={unit.ownerName}
            ownerPhone="+966 50 123 4567"
            ownerPropertiesCount="3 مجمعات عقارية"
            ownerPayoutRate="مباشر إلى الحساب البنكي"
            ownerId={unit.ownerId}
            onOpenOperationsLog={() => setShowOperationsLog(true)}
          />
        </div>
      </div>

      {/* 4. Interactive Modals */}
      {/* إدارة كود الدخول وسياسة الأمان */}
      <AccessCodeModal
        open={showAccessCodeModal}
        onClose={() => setShowAccessCodeModal(false)}
        onOpenShowCode={() => {
          setShowAccessCodeModal(false);
          setShowCodeModal(true);
        }}
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
      />

      {/* عرض كود الدخول */}
      <ShowCodeModal
        open={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
      />
    </div>
  );
}
