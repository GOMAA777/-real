import Link from "next/link";
import { Building2, ExternalLink } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingAssignedUnitCardProps {
  assigned: BookingDetail["assigned"];
}

export function BookingAssignedUnitCard({
  assigned,
}: BookingAssignedUnitCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-xl font-bold text-[#172115]">
            الوحدة والعقار المخصص
          </h2>
        </div>

        {/* Operational Badge */}
        <span className="inline-flex items-center gap-1.5 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full select-none">
          <span>{assigned.operationalStatus}</span>
        </span>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
        {/* Right Column in RTL: Property Info */}
        <div className="space-y-4 text-right">
          <div className="space-y-1">
            <div className="text-xs text-[#7D8A78] font-medium">
              اسم العقار والرمز
            </div>
            <div className="text-lg sm:text-xl font-black text-[#172115]">
              {assigned.propertyName}
            </div>
            <div className="text-xs text-[#616E5D] font-medium">
              كود العقار: {assigned.propertyCode} • {assigned.propertyLocation}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F0F4EC]">
            <div className="text-xs text-[#7D8A78] font-medium">
              المالك المسجل والترخيص
            </div>
            <div className="text-sm font-bold text-[#172115]">
              {assigned.ownerName}
            </div>
            <div className="text-xs text-[#7D8A78]">
              رخصة فال العقارية: {assigned.falLicense}
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Unit Info */}
        <div className="space-y-4 text-right">
          <div className="space-y-1">
            <div className="text-xs text-[#7D8A78] font-medium">
              الوحدة والموقع الداخلي
            </div>
            <div className="text-lg sm:text-xl font-black text-[#172115]">
              {assigned.unitTitle}
            </div>
            <div className="text-xs text-[#616E5D] font-medium">
              {assigned.unitFloor} • {assigned.unitView}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#F0F4EC]">
            <div className="text-xs text-[#7D8A78] font-medium">
              مواصفات التجهيز
            </div>
            <div className="text-xs text-[#616E5D] font-medium leading-relaxed">
              {assigned.unitSpecs}
            </div>
          </div>
        </div>
      </div>

      {/* Action Links Row (Centered) */}
      <div className="pt-4 border-t border-[#EAEFE6] flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-bold text-[#34432E]">
        <Link
          href={`/dashboard/properties/${assigned.propertyId}`}
          className="inline-flex items-center gap-1.5 hover:text-[#172115] hover:underline transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>عرض تفاصيل العقار</span>
        </Link>

        <span className="text-[#C2CEC0] select-none">▪</span>

        <Link
          href={`/dashboard/properties/${assigned.propertyId}`}
          className="inline-flex items-center gap-1.5 hover:text-[#172115] hover:underline transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>عرض سجل الوحدة {assigned.unitNumber}</span>
        </Link>

        <span className="text-[#C2CEC0] select-none">▪</span>

        <Link
          href={`/dashboard/owners/${assigned.ownerId}`}
          className="inline-flex items-center gap-1.5 hover:text-[#172115] hover:underline transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>ملف المالك</span>
        </Link>
      </div>
    </div>
  );
}
