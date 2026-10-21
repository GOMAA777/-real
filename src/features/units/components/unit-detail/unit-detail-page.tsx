"use client";

import { useState } from "react";
import { initialUnits } from "../../data/mock-units";
import { UnitStatus } from "../../types";
import { UnitDetailHeader } from "./unit-detail-header";
import { UnitSpecsOverview } from "./unit-specs-overview";
import { UnitStatusContent } from "./unit-status-content";
import { UnitSmartLockCard } from "./unit-smart-lock-card";
import { UnitGalleryCard } from "./unit-gallery-card";
import { UnitAuditLogCard } from "./unit-audit-log-card";
import { UnitSidebar } from "./unit-sidebar";
import { AccessCodeModal } from "./access-code-modal";
import { ShowCodeModal } from "./show-code-modal";
import { OperationsLogView } from "./operations-log-view";

interface UnitDetailPageProps {
  unitId?: string;
}

export function UnitDetailPage({ unitId = "1" }: UnitDetailPageProps) {
  // Find matching unit or fallback to Unit 204
  const unit = initialUnits.find((u) => u.id === unitId) ?? initialUnits[0];

  // State management
  const [currentStatus, setCurrentStatus] = useState<UnitStatus>(unit.status);
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showOperationsLog, setShowOperationsLog] = useState(false);

  // If Operations Log view is active [1:15620]
  if (showOperationsLog) {
    return (
      <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB] min-h-screen p-4 sm:p-6 lg:p-8">
        <OperationsLogView
          onBack={() => setShowOperationsLog(false)}
          unitNumber={unit.unitNumber}
          propertyName={unit.propertyName}
        />
      </div>
    );
  }

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB] min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      {/* 1. Header Banner */}
      <UnitDetailHeader
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
        status={currentStatus}
        onChangeStatus={(newStatus) => setCurrentStatus(newStatus)}
        onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
        onOpenOperationsLog={() => setShowOperationsLog(true)}
      />

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Specifications Overview (6 Metrics + Amenities) */}
          <UnitSpecsOverview
            unitNumber={unit.unitNumber}
            type={unit.type}
            floor={unit.floor}
            pricePerNight={unit.pricePerNight}
          />

          {/* Operational State Section:
              - Occupied [1:14845]: Active Booking Card & PIN code
              - Available [1:16655]: 7-day timeline & readiness metrics
              - Cleaning [1:17332]: 7-day timeline & cleaning mission
              - Maintenance [1:17982]: 7-day timeline & maintenance ticket
          */}
          <UnitStatusContent
            status={currentStatus}
            unitNumber={unit.unitNumber}
            propertyName={unit.propertyName}
            onOpenShowCode={() => setShowCodeModal(true)}
            onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
          />

          {/* IoT Smart Lock Management Hub */}
          <UnitSmartLockCard
            unitNumber={unit.unitNumber}
            onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
            onOpenShowCode={() => setShowCodeModal(true)}
          />

          {/* Photos & Equipments Gallery */}
          <UnitGalleryCard />

          {/* Recent Smart Activity & Audit Log */}
          <UnitAuditLogCard
            onOpenOperationsLog={() => setShowOperationsLog(true)}
          />
        </div>

        {/* Sidebar Area (4 Cols) */}
        <div className="lg:col-span-4">
          <UnitSidebar
            propertyName={unit.propertyName}
            propertyId={unit.propertyId}
            ownerName={unit.ownerName}
            ownerId={unit.ownerId}
            onOpenOperationsLog={() => setShowOperationsLog(true)}
            onOpenAccessCodeModal={() => setShowAccessCodeModal(true)}
          />
        </div>
      </div>

      {/* 3. Interactive Modals */}
      {/* [1:15392] إدارة كود الدخول (Access Code Management Modal) */}
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

      {/* [1:15517] عرض الكود (Show Passcode Modal) */}
      <ShowCodeModal
        open={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        unitNumber={unit.unitNumber}
        propertyName={unit.propertyName}
      />
    </div>
  );
}
