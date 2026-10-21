interface KPICardItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  subtitle: string;
  iconSrc: string;
}

const cardsData: KPICardItem[] = [
  {
    id: "owners",
    title: "أصحاب العقارات",
    value: "248",
    trend: "+5.2%",
    subtitle: "12 تسجيل جديد هذا الشهر",
    iconSrc: "/assets/dashboard/337e2e34b2b1394d375cb029602e65aaa6a160b4.svg",
  },
  {
    id: "properties",
    title: "العقارات",
    value: "386",
    trend: "+3.8%",
    subtitle: "العقارات النشطة على المنصة",
    iconSrc: "/assets/dashboard/fa2a7fc1dc510af5ec4dcc5250fafd3abcb48561.svg",
  },
  {
    id: "units",
    title: "إجمالي الوحدات",
    value: "4,820",
    trend: "+8.1%",
    subtitle: "وحدة سكنية وتجارية مسجلة",
    iconSrc: "/assets/dashboard/693abee83aab9bd9f7d233671b9be175f76c08f9.svg",
  },
  {
    id: "bookings",
    title: "الحجوزات",
    value: "12,640",
    trend: "+12.4%",
    subtitle: "إجمالي الحجوزات هذا الشهر",
    iconSrc: "/assets/dashboard/d67c673b68fa4633b1c6504de5d4cd8f204f7ddd.svg",
  },
];

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-cairo">
      {cardsData.map((card) => {
        return (
          <div
            key={card.id}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#DCE2D7] shadow-xs flex flex-col justify-between hover:border-[#4B5940]/40 transition-all min-h-[170px]"
          >
            {/* Top Row: Title on Right (in RTL) & Light Olive Icon Badge on Left */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-[13px] font-semibold text-[#75786F] select-none">
                {card.title}
              </span>

              {/* Light Olive Icon Container with Dark Olive Vector Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#EBF0E6] flex items-center justify-center shrink-0 border border-[#DCE2D7]/40 shadow-2xs">
                <img
                  src={card.iconSrc}
                  alt={card.title}
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>

            {/* Middle Row: Large Value & Percentage Growth Badge */}
            <div className="my-2.5 flex items-center gap-2.5">
              <span className="text-3xl sm:text-[34px] font-bold text-[#181D17] tracking-tight font-cairo">
                {card.value}
              </span>
              {/* Trend Badge rendered in LTR so arrow is on the left: ↑ +12.4% */}
              <div
                dir="ltr"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D8E8CB] text-[#3D4B36] text-[11px] font-bold select-none"
              >
                <img
                  src="/assets/dashboard/7d3af3c85e660cdbe9356013154a7b7e83b7a454.svg"
                  alt=""
                  className="w-2.5 h-2.5 shrink-0"
                />
                <span>{card.trend}</span>
              </div>
            </div>

            {/* Bottom Row: Micro Context / Subtitle */}
            <div className="text-xs sm:text-[13px] text-[#75786F] leading-relaxed select-none">
              {card.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
