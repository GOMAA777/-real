"use client";

interface UnitSpecsCardProps {
  unitNumber?: string;
  unitType?: string;
  floorLevel?: string;
  actualArea?: string;
  capacity?: string;
  basePrice?: string;
  pricingModel?: string;
  systemEntryDate?: string;
}

export function UnitSpecsCard({
  unitNumber = "204",
  unitType = "استوديو فندقي",
  floorLevel = "الطابق الثاني (2)",
  actualArea = "45",
  capacity = "2 ضيوف كحد أقصى",
  basePrice = "250",
  pricingModel = "يومي (لكل ليلة)",
  systemEntryDate = "10 سبتمبر 2026",
}: UnitSpecsCardProps) {
  const amenities = [
    {
      label: "شاشة تلفاز ذكية 55 بوصة",
      icon: "/icons/units/tv.svg",
      iconWidth: 13.3,
      iconHeight: 12,
    },
    {
      label: "مطبخ أمريكي مجهز بالكامل",
      icon: "/icons/units/kitchen.svg",
      iconWidth: 10.7,
      iconHeight: 13.3,
    },
    {
      label: "تكييف مركزي مخصص",
      icon: "/icons/units/ac.svg",
      iconWidth: 13.3,
      iconHeight: 13.3,
    },
    {
      label: "ألياف بصرية فائقة السرعة",
      icon: "/icons/units/fiber.svg",
      iconWidth: 16,
      iconHeight: 11.3,
    },
    {
      label: "إطلالة هادئة على بهو المبنى",
      icon: "/icons/units/balcony.svg",
      iconWidth: 14.7,
      iconHeight: 10,
    },
  ];

  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-6"
      dir="rtl"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5EB]/60">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
          <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            بيانات ومواصفات الوحدة
          </h2>
        </div>
        <span className="font-normal text-[#75786F] text-[11px] leading-[16px]">
          سجل التدقيق التقني
        </span>
      </div>

      {/* 8 Stats Metrics Grid (2 rows x 4 cols on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[76px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            رقم الوحدة
          </span>
          <span className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            {unitNumber}
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[76px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            نوع الوحدة
          </span>
          <span className="font-semibold text-[#181D17] text-[14px] leading-[20px]">
            {unitType}
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[76px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            مستوى الطابق
          </span>
          <span className="font-semibold text-[#181D17] text-[14px] leading-[20px]">
            {floorLevel}
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[76px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            المساحة الفعلية
          </span>
          <div className="flex items-baseline gap-1 text-[#181D17]">
            <span className="font-bold text-[18px] leading-[28px]">{actualArea}</span>
            <span className="font-normal text-[12px] leading-[18px]">م²</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[92px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            الطاقة الاستيعابية
          </span>
          <span className="font-semibold text-[#181D17] text-[14px] leading-[20px]">
            {capacity}
          </span>
        </div>

        {/* Metric 6 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[92px] text-right">
          <div className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            <p>السعر الأساسي</p>
            <p>المعتمد</p>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-[#34422A] text-[18px] leading-[28px]">
              {basePrice}
            </span>
            <span className="font-normal text-[#75786F] text-[11px] leading-[16px]">
              ر.س / ليلة
            </span>
          </div>
        </div>

        {/* Metric 7 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[92px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            نمط الفوترة والتعرفة
          </span>
          <span className="font-semibold text-[#181D17] text-[14px] leading-[20px]">
            {pricingModel}
          </span>
        </div>

        {/* Metric 8 */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[92px] text-right">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            تاريخ الإدراج للمنظومة
          </span>
          <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
            {systemEntryDate}
          </span>
        </div>
      </div>

      {/* Amenities & Equipments Row */}
      <div className="pt-2 space-y-3">
        <div className="font-semibold text-[#75786F] text-[12px] leading-[18px] text-right">
          التجهيزات والمرافق المعتمدة:
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#E5EAE0] rounded-[8px] px-3 py-1.5 flex items-center gap-1.5 text-[13px] font-normal text-[#181D17] leading-[20px]"
            >
              <span>{item.label}</span>
              <img
                src={item.icon}
                alt=""
                style={{ width: `${item.iconWidth}px`, height: `${item.iconHeight}px` }}
                className="shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
