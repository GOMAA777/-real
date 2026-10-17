import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ArrowLeft } from "lucide-react";

interface PropertyItem {
  id: string;
  name: string;
  location: string;
  unitsText: string;
  occupancy: string;
  activeUnits: string;
  image: string;
}

const defaultProperties: PropertyItem[] = [
  {
    id: "prop-1",
    name: "عمارة النخيل السكنية",
    location: "حي النخيل، الرياض",
    unitsText: "24 وحدة مفروشة",
    occupancy: "91%",
    activeUnits: "22 / 24",
    image: "/properties/nakheel.png",
  },
  {
    id: "prop-2",
    name: "مجمع الواحة الفندقي",
    location: "حي الشاطئ، جدة",
    unitsText: "24 وحدة مفروشة",
    occupancy: "83%",
    activeUnits: "10 / 12",
    image: "/properties/oasis.png",
  },
  {
    id: "prop-3",
    name: "أبراج العقيق التجارية والسكنية",
    location: "حي العقيق، الرياض",
    unitsText: "6 وحدة مفروشة",
    occupancy: "75%",
    activeUnits: "5 / 6",
    image: "/properties/aqeeq.png",
  },
];

interface OwnerPropertiesListProps {
  properties?: PropertyItem[];
  totalCount?: number;
}

export function OwnerPropertiesList({
  properties = defaultProperties,
  totalCount = 3,
}: OwnerPropertiesListProps) {
  return (
    <div className="space-y-3.5">
      {/* Header Row */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-bold text-[#172115]">
          العقارات التابعة للمالك ({totalCount})
        </h2>
        <Link
          href="/dashboard/properties"
          className="text-xs font-semibold text-[#34432E] hover:underline flex items-center gap-1 transition-colors"
        >
          <span>إدارة العقارات والوحدات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Property Cards List */}
      <div className="space-y-2.5">
        {properties.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E2E6DC] shadow-2xs hover:border-[#CCD5C5] transition-all flex items-center justify-between gap-3 group"
          >
            {/* Right in RTL: Image + Name + Details */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#EEF2E6] shrink-0 border border-[#E2E6DC]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-[#172115] truncate">
                  {item.name}
                </div>
                <div className="text-[11px] text-[#7D8A78] truncate mt-0.5">
                  {item.location} • {item.unitsText}
                </div>
              </div>
            </div>

            {/* Middle & Left in RTL: Occupancy, Units, Chevron */}
            <div className="flex items-center gap-4 sm:gap-8 shrink-0">
              {/* Occupancy Rate */}
              <div className="text-center">
                <div className="text-[10px] text-[#7D8A78] font-medium">نسبة الإشغال</div>
                <div className="text-xs sm:text-sm font-bold text-[#172115]">
                  {item.occupancy}
                </div>
              </div>

              {/* Active Units */}
              <div className="text-center">
                <div className="text-[10px] text-[#7D8A78] font-medium">الوحدات النشطة</div>
                <div className="text-xs sm:text-sm font-bold text-[#172115]" dir="ltr">
                  {item.activeUnits}
                </div>
              </div>

              {/* Chevron */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#7D8A78] group-hover:text-[#172115] transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
