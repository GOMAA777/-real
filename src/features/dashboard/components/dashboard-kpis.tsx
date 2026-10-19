import {
  Building2,
  KeyRound,
  CalendarCheck,
  ArrowUp,
} from "lucide-react";

function HandHouseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* House */}
      <path d="M12 2.5 5 8v6h14V8l-7-5.5z" />
      <path d="M10 14v-4h4v4" />
      {/* Hand beneath house */}
      <path d="M2 16h4.5a2 2 0 0 1 1.6.8l1.3 1.7a2 2 0 0 0 1.6.8H19a2 2 0 0 0 2-2v-.5" />
      <path d="M2 19h12a2 2 0 0 0 1.6-.8l1-1.4" />
    </svg>
  );
}

interface KPICardItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const cardsData: KPICardItem[] = [
  {
    id: "owners",
    title: "أصحاب العقارات",
    value: "248",
    trend: "+5.2%",
    subtitle: "12 تسجيل جديد هذا الشهر",
    icon: HandHouseIcon,
  },
  {
    id: "properties",
    title: "العقارات",
    value: "386",
    trend: "+3.8%",
    subtitle: "العقارات النشطة على المنصة",
    icon: Building2,
  },
  {
    id: "units",
    title: "إجمالي الوحدات",
    value: "4,820",
    trend: "+8.1%",
    subtitle: "وحدة سكنية وتجارية مسجلة",
    icon: KeyRound,
  },
  {
    id: "bookings",
    title: "الحجوزات",
    value: "12,640",
    trend: "+12.4%",
    subtitle: "إجمالي الحجوزات هذا الشهر",
    icon: CalendarCheck,
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
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E5D8]/70 shadow-xs flex flex-col justify-between hover:border-[#CCD4C5] transition-all min-h-[165px]"
          >
            {/* Top Row: Title on Right (in RTL) & Icon Squircle on Left */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-[13px] font-medium text-[#7D8A78] select-none">
                {card.title}
              </span>

              <div className="w-11 h-11 rounded-2xl bg-[#E8EDE4] flex items-center justify-center text-[#374732] shrink-0">
                <Icon className="w-5 h-5 text-[#374732]" />
              </div>
            </div>

            {/* Middle Row: Large Value & Percentage Growth Badge */}
            <div className="my-2.5 flex items-center gap-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#172115] tracking-tight font-inter">
                {card.value}
              </span>
              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#E0EDD9] text-[#2E5725] text-xs font-semibold font-inter select-none">
                <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                <span>{card.trend}</span>
              </div>
            </div>

            {/* Bottom Row: Micro Context / Subtitle */}
            <div className="text-xs text-[#7D8A78] leading-relaxed select-none max-w-[210px]">
              {card.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
