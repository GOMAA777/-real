"use client";

import {
  BedDouble,
  Building,
  Coffee,
  DoorOpen,
  KeyRound,
  Layers,
  Maximize2,
  Tv,
  Users,
  Wifi,
  Wind,
} from "lucide-react";

interface UnitSpecsOverviewProps {
  unitNumber?: string;
  type?: string;
  floor?: string;
  pricePerNight?: number;
}

export function UnitSpecsOverview({
  unitNumber = "204",
  type = "استوديو",
  floor = "الطابق الثاني",
  pricePerNight = 250,
}: UnitSpecsOverviewProps) {
  const specs = [
    {
      label: "رقم الوحدة",
      value: unitNumber,
      sub: "معرف: UNT-1048-204",
      icon: DoorOpen,
    },
    {
      label: "نوع الوحدة",
      value: type,
      sub: "تصنيف فاخر تنفيذي",
      icon: Building,
    },
    {
      label: "الدور / الطابق",
      value: floor,
      sub: "موقع هادئ وإطلالة جانبية",
      icon: Layers,
    },
    {
      label: "المساحة الصافية",
      value: "45 م²",
      sub: "مساحة داخلية واسعة",
      icon: Maximize2,
    },
    {
      label: "الطاقة الاستيعابية",
      value: "2 نزلاء",
      sub: "1 سرير مزدوج كبير كينج",
      icon: Users,
    },
    {
      label: "السعر الأساسي",
      value: `${pricePerNight} ر.س`,
      sub: "لكل ليلة شامل الضريبة",
      icon: BedDouble,
    },
  ];

  const amenities = [
    { label: "واي فاي ألياف بصرية 500 Mbps", icon: Wifi },
    { label: "قفل ذكي رقمي بدون مفتاح", icon: KeyRound },
    { label: "تكييف مركزي ذكي (Eco Mode)", icon: Wind },
    { label: "شاشة ذكية 55 بوصة بدقة 4K", icon: Tv },
    { label: "مطبخ صغير ومكينة نسبريسو", icon: Coffee },
  ];

  return (
    <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-5 text-start">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-[#181D17]">
          المواصفات والبيانات الأساسية
        </h2>
        <span className="text-[11.5px] font-semibold text-[#5F6C5B] bg-[#F1F5EB] px-3 py-1 rounded-full">
          محدثة تلقائياً من الأصل العقاري
        </span>
      </div>

      {/* 6 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {specs.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <div
              key={index}
              className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7] flex flex-col justify-between space-y-2 hover:bg-[#F1F5EB] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] text-[#7C8773] font-medium">
                  {spec.label}
                </span>
                <span className="w-6 h-6 rounded-[6px] bg-[#E5EDE0] text-[#34422A] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="text-[18px] font-bold text-[#181D17] leading-tight">
                  {spec.value}
                </div>
                <div className="text-[10.5px] text-[#8A9384] mt-1 leading-snug truncate">
                  {spec.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Amenities & Equipments Row */}
      <div className="pt-2 border-t border-[#F1F5EB]">
        <div className="text-[12.5px] font-bold text-[#181D17] mb-3">
          تجهيزات ومميزات الوحدة المعتمدة:
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1F5EB] border border-[#E5EADF] text-[12px] font-semibold text-[#3F4A36] hover:bg-[#EAF1E8] transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-[#2F8A3E]" />
                <span>{item.label}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
