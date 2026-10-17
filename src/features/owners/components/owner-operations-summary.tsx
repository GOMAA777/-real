import { BarChart2, Star } from "lucide-react";

interface OwnerOperationsSummaryProps {
  occupancyRate?: number;
  occupancyChange?: string;
  rating?: number;
  reviewsCount?: number;
  lastLoginTime?: string;
  lastLoginPlatform?: string;
  lastLoginSecurity?: string;
}

export function OwnerOperationsSummary({
  occupancyRate = 86,
  occupancyChange = "+4.2%",
  rating = 4.8,
  reviewsCount = 112,
  lastLoginTime = "اليوم، 09:24 ص",
  lastLoginPlatform = "الرياض - Web Console",
  lastLoginSecurity = "عبر IP آمن ومعتمد",
}: OwnerOperationsSummaryProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-[#172115]">ملخص النشاط والتشغيل</h2>
              <span className="bg-[#EEF2E6] text-[#34432E] text-[11px] font-bold px-3 py-0.5 rounded-full">
                تحديث فوري
              </span>
            </div>
            <p className="text-xs text-[#7D8A78] mt-0.5">
              مؤشرات الأداء التراكمية لوحدات المالك الحالية
            </p>
          </div>
        </div>

        {/* Icon Squircle */}
        <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0">
          <BarChart2 className="w-5 h-5" />
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. معدل الإشغال الكلي */}
        <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-2">
          <div className="text-xs text-[#7D8A78] font-medium">معدل الإشغال الكلي</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#172115]">{occupancyRate}%</span>
            <span className="text-xs text-[#2E7D32] font-bold" dir="ltr">{occupancyChange}</span>
          </div>
          {/* Progress Bar */}
          <div className="h-2 w-full bg-[#E2E6DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#34432E] rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* 2. متوسط تقييم الضيوف */}
        <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-2">
          <div className="text-xs text-[#7D8A78] font-medium">متوسط تقييم الضيوف</div>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-[#172115]">{rating}</span>
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
          </div>
          <div className="text-[11px] text-[#7D8A78]">
            من واقع {reviewsCount} تقييم نزيل
          </div>
        </div>

        {/* 3. آخر تسجيل دخول للمنصة */}
        <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-1">
          <div className="text-xs text-[#7D8A78] font-medium">آخر تسجيل دخول للمنصة</div>
          <div className="text-sm sm:text-base font-bold text-[#172115] pt-0.5">
            {lastLoginTime}
          </div>
          <div className="text-[10px] text-[#7D8A78] leading-tight">
            {lastLoginPlatform}
          </div>
          <div className="text-[10px] text-[#7D8A78] leading-tight">
            {lastLoginSecurity}
          </div>
        </div>
      </div>
    </div>
  );
}
