import { Building2, Home, Calendar, Banknote, TrendingUp, Receipt } from "lucide-react";

interface OwnerKPICardsProps {
  stats?: {
    managedProperties?: number;
    propertiesSubtext?: string;
    propertiesLocations?: string;
    totalUnits?: number;
    unitsSubtext?: string;
    unitsBreakdown?: string;
    activeBookings?: number;
    bookingsSubtext?: string;
    occupancyNote?: string;
    monthlyRevenue?: string;
    revenueCycle?: string;
  };
}

export function OwnerKPICards({ stats }: OwnerKPICardsProps) {
  const managedProperties = stats?.managedProperties ?? 3;
  const propertiesSubtext = stats?.propertiesSubtext ?? "عقارات رئيسية";
  const propertiesLocations = stats?.propertiesLocations ?? "• الرياض، جدة (نشطة بالكامل)";

  const totalUnits = stats?.totalUnits ?? 42;
  const unitsSubtext = stats?.unitsSubtext ?? "وحدة عقارية";
  const unitsBreakdown = stats?.unitsBreakdown ?? "36 سكنية • 6 تجارية";

  const activeBookings = stats?.activeBookings ?? 18;
  const bookingsSubtext = stats?.bookingsSubtext ?? "حجز مؤكد";
  const occupancyNote = stats?.occupancyNote ?? "نسبة إشغال ممتازة (%86)";

  const monthlyRevenue = stats?.monthlyRevenue ?? "48,500";
  const revenueCycle = stats?.revenueCycle ?? "دورة التحصيل الحالية لشهر سبتمبر";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. العقارات المدارة */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#7D8A78]">العقارات المدارة</span>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-[#172115]">{managedProperties}</span>
          <span className="text-xs text-[#7D8A78] font-medium">{propertiesSubtext}</span>
        </div>
        <div className="text-[11px] text-[#7D8A78] pt-1">
          {propertiesLocations}
        </div>
      </div>

      {/* 2. إجمالي الوحدات */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#7D8A78]">إجمالي الوحدات</span>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0">
            <Home className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-[#172115]">{totalUnits}</span>
          <span className="text-xs text-[#7D8A78] font-medium">{unitsSubtext}</span>
        </div>
        <div className="text-[11px] text-[#7D8A78] pt-1">
          {unitsBreakdown}
        </div>
      </div>

      {/* 3. الحجوزات النشطة */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#7D8A78]">الحجوزات النشطة</span>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-[#172115]">{activeBookings}</span>
          <span className="text-xs text-[#7D8A78] font-medium">{bookingsSubtext}</span>
        </div>
        <div className="text-[11px] text-[#2E7D32] font-semibold flex items-center gap-1 pt-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{occupancyNote}</span>
        </div>
      </div>

      {/* 4. إجمالي الإيرادات الشهرية */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#7D8A78]">إجمالي الإيرادات الشهرية</span>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0">
            <Banknote className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-[#172115]">{monthlyRevenue}</span>
          <span className="text-xs font-bold text-[#7D8A78]">ر.س</span>
        </div>
        <div className="text-[11px] text-[#7D8A78] flex items-center gap-1 pt-1">
          <Receipt className="w-3.5 h-3.5 text-[#7D8A78]" />
          <span>{revenueCycle}</span>
        </div>
      </div>
    </div>
  );
}
