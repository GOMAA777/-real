"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NewUnitHeaderCard } from "./header-card";
import { OwnerCard } from "./owner-card";
import { PropertyCard } from "./property-card";
import { UnitSpecsCard } from "./unit-specs-card";
import { PricingCard } from "./pricing-card";
import { OccupancyCard } from "./occupancy-card";
import { AccessCodeCard } from "./access-code-card";
import { OperationalStatusCard } from "./operational-status-card";
import { DescriptionCard } from "./description-card";
import { FormFooterBar } from "./form-footer-bar";
import { PropertyPickerPopup } from "./property-picker-popup";
import { OwnerPickerPopup } from "./owner-picker-popup";
import { UnitSuccessScreen } from "./success-screen";
import { pickerProperties, pickerOwners } from "./picker-data";

export function NewUnitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPropertyPicker, setShowPropertyPicker] = useState(false);
  const [showOwnerPicker, setShowOwnerPicker] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState("pr-1");
  const [selectedOwnerId, setSelectedOwnerId] = useState("own-1");
  const [showSuccess, setShowSuccess] = useState(
    searchParams?.get("success") === "true"
  );

  const selectedProperty =
    pickerProperties.find((p) => p.id === selectedPropertyId) ??
    pickerProperties[0];
  const selectedOwner =
    pickerOwners.find((o) => o.id === selectedOwnerId) ?? pickerOwners[0];

  const handleSave = () => {
    setShowSuccess(true);
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("success", "true");
    router.push(`?${params.toString()}`);
  };

  const handleAddAnother = () => {
    setShowSuccess(false);
    router.push("/dashboard/units/new");
  };

  if (showSuccess) {
    return (
      <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB] min-h-screen">
        <UnitSuccessScreen
          onAddAnother={handleAddAnother}
          onBackToList={() => router.push("/dashboard/units")}
          property={selectedProperty.name}
          owner={selectedOwner.name}
        />
      </div>
    );
  }

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB] min-h-screen flex flex-col">
      <div className="flex-1 px-5 pt-5 pb-8 space-y-6">
        {/* Page header */}
        <NewUnitHeaderCard />

        {/* ١ المالك + ٢ العقار */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            onClick={() => setShowOwnerPicker(true)}
            className="cursor-pointer"
          >
            <OwnerCard />
          </div>
          <div
            onClick={() => setShowPropertyPicker(true)}
            className="cursor-pointer"
          >
            <PropertyCard />
          </div>
        </div>

        {/* ٣ بيانات ومواصفات الوحدة */}
        <UnitSpecsCard />

        {/* ٤ التسعير + ٥ السعة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PricingCard />
          <OccupancyCard />
        </div>

        {/* ٦ سياسة كود الدخول الذكي + ملاحظة الأمان */}
        <AccessCodeCard />

        {/* ٧ الحالة التشغيلية + ٨ الوصف */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OperationalStatusCard />
          <DescriptionCard />
        </div>
      </div>

      {/* Sticky footer */}
      <FormFooterBar
        onSaveDraft={handleSave}
        onCancel={() => router.push("/dashboard/units")}
        onSave={handleSave}
      />

      {/* Popups */}
      <PropertyPickerPopup
        key={`property-${showPropertyPicker}`}
        open={showPropertyPicker}
        onClose={() => setShowPropertyPicker(false)}
        selectedId={selectedPropertyId}
        onSelect={setSelectedPropertyId}
        onConfirm={() => setShowPropertyPicker(false)}
        properties={pickerProperties}
      />
      <OwnerPickerPopup
        key={`owner-${showOwnerPicker}`}
        open={showOwnerPicker}
        onClose={() => setShowOwnerPicker(false)}
        selectedId={selectedOwnerId}
        onSelect={setSelectedOwnerId}
        onConfirm={() => setShowOwnerPicker(false)}
        owners={pickerOwners}
      />
    </div>
  );
}
