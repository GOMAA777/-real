import { BarChart2, Star } from "lucide-react";
import { OwnerPropertiesList } from "./owner-properties-list";

interface OwnerOperationsSummaryProps {
  occupancyRate?: number;
  occupancyChange?: string;
  rating?: number;
  reviewsCount?: number;
  lastLoginTime?: string;
  lastLoginPlatform?: string;
  lastLoginSecurity?: string;
  onNavigateToProperties?: () => void;
}

export function OwnerOperationsSummary({
  occupancyRate = 86,
  occupancyChange = "+4.2%",
  rating = 4.8,
  reviewsCount = 112,
  lastLoginTime = "اليوم، 09:24 ص",
  lastLoginPlatform = "الرياض - Web Console",
  lastLoginSecurity = "عبر IP آمن ومعتمد",
  onNavigateToProperties,
}: OwnerOperationsSummaryProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-6">
      {/* 1. Top Header Row */}
      <div className="flex items-center justify-between">
        {/* Right side in RTL: Icon Squircle + Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DDE7D3] text-[#283820] flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#172115]">
              ملخص النشاط والتشغيل
            </h2>
            <p className="text-xs text-[#7D8A78] mt-0.5">
              مؤشرات الأداء التراكمية لوحدات المالك الحالية
            </p>
          </div>
        </div>

        {/* Left side in RTL: "تحديث فوري" Pill Badge */}
        <span className="bg-[#EEF2E6] text-[#4A5D44] text-[11px] font-semibold px-3 py-1 rounded-full">
          تحديث فوري
        </span>
      </div>

      {/* 2. 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. معدل الإشغال الكلي (Far right in RTL) */}
        <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-2">
          <div className="text-xs text-[#7D8A78] font-medium">معدل الإشغال الكلي</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#172115]">{occupancyRate}%</span>
            <span className="text-xs text-[#2E7D32] font-bold" dir="ltr">{occupancyChange}</span>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-full bg-[#E5EAE0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2B3925] rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* 2. متوسط تقييم الضيوف (Middle in RTL) */}
        <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-2">
          <div className="text-xs text-[#7D8A78] font-medium">متوسط تقييم الضيوف</div>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black text-[#172115]">{rating}</span>
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
          </div>
          <div className="text-xs text-[#7D8A78]">
            من واقع {reviewsCount} تقييم نزيل
          </div>
        </div>

        {/* 3. آخر تسجيل دخول للمنصة (Far left in RTL) */}
        <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-1">
          <div className="text-xs text-[#7D8A78] font-medium">آخر تسجيل دخول للمنصة</div>
          <div className="text-base sm:text-lg font-bold text-[#172115] pt-0.5">
            {lastLoginTime}
          </div>
          <div className="text-xs text-[#7D8A78] leading-tight">
            {lastLoginPlatform}
          </div>
          <div className="text-xs text-[#7D8A78] leading-tight">
            {lastLoginSecurity}
          </div>
        </div>
      </div>

      {/* 3. Owner Properties Section inside the exact same card */}
      <OwnerPropertiesList onNavigateToProperties={onNavigateToProperties} />
    </div>
  );
}

