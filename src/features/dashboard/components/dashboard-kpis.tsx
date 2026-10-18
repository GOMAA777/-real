import {
  Building2,
  DoorOpen,
  CalendarDays,
  Banknote,
  TrendingUp,
  ReceiptText,
} from "lucide-react";

interface KPICardItem {
  id: string;
  title: React.ReactNode;
  value: string;
  unit: string;
  footer: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const cardsData: KPICardItem[] = [
  {
    id: "properties",
    title: "العقارات المدارة",
    value: "3",
    unit: "عقارات رئيسية",
    footer: (
      <div className="flex items-center gap-1.5 text-xs text-[#556350]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#347A4B] shrink-0" />
        <span>الرياض، جدة (نشطة بالكامل)</span>
      </div>
    ),
    icon: Building2,
  },
  {
    id: "units",
    title: "إجمالي الوحدات",
    value: "42",
    unit: "وحدة عقارية",
    footer: (
      <div className="flex items-center gap-1.5 text-xs text-[#556350]">
        <span>36 سكنية</span>
        <span className="text-[10px] text-[#A3ADA0]">▪</span>
        <span>6 تجارية</span>
      </div>
    ),
    icon: DoorOpen,
  },
  {
    id: "bookings",
    title: "الحجوزات النشطة",
    value: "18",
    unit: "حجز مؤكد",
    footer: (
      <div className="flex items-center gap-1.5 text-xs text-[#556350]">
        <TrendingUp className="w-3.5 h-3.5 text-[#347A4B] shrink-0" />
        <span>نسبة إشغال ممتازة (%86)</span>
      </div>
    ),
    icon: CalendarDays,
  },
  {
    id: "revenue",
    title: (
      <div className="leading-snug">
        <div>إجمالي الإيرادات</div>
        <div>الشهرية</div>
      </div>
    ),
    value: "48,500",
    unit: "ر.س",
    footer: (
      <div className="flex items-center gap-1.5 text-xs text-[#556350]">
        <ReceiptText className="w-3.5 h-3.5 text-[#556350] shrink-0" />
        <span>دورة التحصيل الحالية لشهر سبتمبر</span>
      </div>
    ),
    icon: Banknote,
  },
];

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cardsData.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between hover:border-[#CCD4C5] transition-all min-h-[175px]"
          >
            {/* Top Row: Title on Right (in RTL) & Icon Squircle on Left */}
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs sm:text-sm font-semibold text-[#2C3825] pt-0.5 select-none">
                {card.title}
              </div>

              <div className="w-11 h-11 rounded-2xl bg-[#EBEFE6] flex items-center justify-center text-[#374732] shrink-0">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Middle Row: Large Value & Suffix Unit */}
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#172115] tracking-tight font-inter">
                {card.value}
              </span>
              <span className="text-xs text-[#7A8574] font-medium">
                {card.unit}
              </span>
            </div>

            {/* Bottom Row: Micro Context / Indicator */}
            <div className="pt-1 select-none">
              {card.footer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
