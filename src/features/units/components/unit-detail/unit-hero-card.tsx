"use client";

interface UnitHeroCardProps {
  unitNumber?: string;
  statusLabel?: string;
  propertyName?: string;
  location?: string;
  floor?: string;
  iotStatus?: string;
  iotSubtitle?: string;
}

export function UnitHeroCard({
  unitNumber = "204",
  statusLabel = "مشغولة (نزيل حالي)",
  propertyName = "عمارة النخيل",
  location = "الرياض — حي العليا",
  floor = "الطابق الثاني",
  iotStatus = "متصل ونشط IoT",
  iotSubtitle = "ربط القفل السحابي",
}: UnitHeroCardProps) {
  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      dir="rtl"
    >
      {/* Right Column: Title, Status Badge, Details Subtitle */}
      <div className="flex flex-col items-start gap-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-bold text-[#181D17] text-[24px] leading-[34px] tracking-tight">
            الوحدة {unitNumber}
          </h1>
          <div className="bg-[#FFF4E5] rounded-full px-3 py-1 flex items-center gap-1.5">
            <span className="bg-[#E99A38] rounded-full size-2 shrink-0" />
            <span className="font-bold text-[#B87114] text-[12px] leading-[18px]">
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#75786F] text-[14px] leading-[22px] flex-wrap">
          <img
            src="/icons/units/hero-building.svg"
            alt=""
            className="size-[13.5px] shrink-0"
          />
          <span>{propertyName}</span>
          <span>•</span>
          <span>{location}</span>
          <span>•</span>
          <span>{floor}</span>
        </div>
      </div>

      {/* Left Column: IoT Lock Cloud Connection Status Card */}
      <div className="bg-[#F1F5EB] rounded-[12px] px-[14px] py-[8px] flex items-center gap-2.5 self-start sm:self-center shrink-0">
        <span className="bg-[#3E8A5A] rounded-full size-[10px] shrink-0" />
        <div className="flex flex-col text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            {iotSubtitle}
          </span>
          <span className="font-semibold text-[#3E8A5A] text-[12px] leading-[18px]">
            {iotStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
