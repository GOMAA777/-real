import { Users2, Building2, Key, CalendarDays, ArrowUpRight } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const cardsData: KPICardProps[] = [
  {
    title: "أصحاب العقارات",
    value: "248",
    change: "+5.2%",
    subtext: "12 تسجيل جديد هذا الشهر",
    icon: Users2,
  },
  {
    title: "العقارات",
    value: "386",
    change: "+2.8%",
    subtext: "العقارات النشطة على المنصة",
    icon: Building2,
  },
  {
    title: "إجمالي الوحدات",
    value: "4,820",
    change: "+9.1%",
    subtext: "وحدة سكنية وتجارية مسجلة",
    icon: Key,
  },
  {
    title: "الحجوزات",
    value: "12,640",
    change: "+12.6%",
    subtext: "إجمالي الحجوزات هذا الشهر",
    icon: CalendarDays,
  },
];

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardsData.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="p-5 rounded-2xl bg-white border border-[#E0E4D8] shadow-xs flex flex-col justify-between hover:border-[#CCD4C5] transition-all"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#616E5D]">
                {card.title}
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#F4F6F0] border border-[#E0E4D8] flex items-center justify-center text-[#374732]">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Middle row: Big Number & Growth Pill */}
            <div className="my-3 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
                {card.value}
              </span>

              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-[#E8F2E3] text-[#2C6E33] text-[11px] font-bold">
                <ArrowUpRight className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>

            {/* Bottom Subtext */}
            <div className="text-[11px] text-[#7B8876] font-medium pt-1 border-t border-[#F0F2EB]">
              {card.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
