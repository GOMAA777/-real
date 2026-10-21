import {
  FileText,
  Calendar,
  ShieldCheck,
  Zap,
  Video,
  Building,
  Home,
  ArrowUpDown,
  LayoutGrid,
} from "lucide-react";
import { PropertyDetail } from "../types";

interface PropertyArchitecturalSpecsProps {
  specs: PropertyDetail["specs"];
}

export function PropertyArchitecturalSpecs({
  specs,
}: PropertyArchitecturalSpecsProps) {
  return (
    <div
      className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-3"
      dir="rtl"
    >
      {/* 1. 2x2 Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Card 1: نوع العقار (Right in RTL) */}
        <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3">
          <Building className="w-4.5 h-4.5 text-[#181D17] shrink-0" />
          <div className="space-y-1 text-right">
            <div className="text-xs text-[#7D8A78] font-medium">نوع العقار</div>
            <div className="font-bold text-sm sm:text-base text-[#181D17]">
              {specs.propertyType}
            </div>
          </div>
        </div>

        {/* Card 2: المدينة والمنطقة (Left in RTL) */}
        <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3">
          <Building className="w-4.5 h-4.5 text-[#181D17] shrink-0" />
          <div className="space-y-1 text-right">
            <div className="text-xs text-[#7D8A78] font-medium">المدينة والمنطقة</div>
            <div className="font-bold text-sm sm:text-base text-[#181D17]">
              {specs.cityAndRegion}
            </div>
          </div>
        </div>

        {/* Card 3: الحي السكني (Right in RTL) */}
        <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3">
          <Home className="w-4.5 h-4.5 text-[#181D17] shrink-0" />
          <div className="space-y-1 text-right">
            <div className="text-xs text-[#7D8A78] font-medium">الحي السكني</div>
            <div className="font-bold text-sm sm:text-base text-[#181D17]">
              {specs.district}
            </div>
          </div>
        </div>

        {/* Card 4: سنة البناء وبدء التشغيل (Left in RTL) */}
        <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3">
          <Calendar className="w-4.5 h-4.5 text-[#181D17] shrink-0" />
          <div className="space-y-1 text-right">
            <div className="text-xs text-[#7D8A78] font-medium">
              سنة البناء وبدء التشغيل
            </div>
            <div className="font-bold text-sm sm:text-base text-[#181D17]">
              {specs.constructionYear}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Detailed Address Box (Full Width) */}
      <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3">
        <LayoutGrid className="w-4.5 h-4.5 text-[#181D17] shrink-0" />
        <div className="space-y-1 text-right">
          <div className="text-xs text-[#7D8A78] font-medium">
            العنوان التفصيلي ومخطط القطعة
          </div>
          <div className="font-bold text-sm sm:text-base text-[#181D17]">
            {specs.detailedAddress}
          </div>
        </div>
      </div>

      {/* 3. License Box (Full Width) */}
      <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1 text-right">
          <div className="text-xs text-[#7D8A78] font-medium">
            تصريح الهيئة العامة للعقار
          </div>
          <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-[#181D17]">
            <ShieldCheck className="w-4 h-4 text-[#181D17] shrink-0" />
            <span>معتمد برقم {specs.licenseNumber}</span>
          </div>
        </div>
        <div className="text-xs text-[#7D8A78] font-medium">
          {specs.licenseExpiry}
        </div>
      </div>

      {/* 4. Architectural Description Box (Full Width) */}
      <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
        {/* Header: Icon on Right, Title after it on Left in RTL */}
        <div
          className="flex items-center gap-2 font-bold text-sm text-[#181D17]"
          dir="rtl"
        >
          <FileText className="w-4 h-4 text-[#181D17] shrink-0" />
          <span>الوصف المعماري والتشغيلي</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#4A5745] font-medium text-right">
          {specs.description}
        </p>
      </div>

      {/* 5. Feature Amenities (4 Pills) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Amenity 1: EV Chargers (Rightmost in RTL) */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-[#181D17] shrink-0" />
          <div className="text-right space-y-0.5">
            <div className="text-xs font-bold text-[#181D17]">شواحن EV</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">مخصصة</div>
          </div>
        </div>

        {/* Amenity 2: Smart Elevators */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5">
          <ArrowUpDown className="w-4 h-4 text-[#181D17] shrink-0" />
          <div className="text-right space-y-0.5">
            <div className="text-xs font-bold text-[#181D17]">مصاعد أوتيس</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">الذكية</div>
          </div>
        </div>

        {/* Amenity 3: Shaded Parking */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5">
          <span className="font-bold text-sm text-[#181D17] shrink-0">P</span>
          <div className="text-right space-y-0.5">
            <div className="text-xs font-bold text-[#181D17]">مواقف</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">سفلية مظللة</div>
          </div>
        </div>

        {/* Amenity 4: 24/7 CCTV (Leftmost in RTL) */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5">
          <Video className="w-4 h-4 text-[#181D17] shrink-0" />
          <div className="text-right space-y-0.5">
            <div className="text-xs font-bold text-[#181D17]">مراقبة CCTV</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">24/7</div>
          </div>
        </div>
      </div>
    </div>
  );
}

