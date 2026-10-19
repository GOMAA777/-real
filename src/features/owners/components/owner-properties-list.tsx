import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ArrowLeft } from "lucide-react";

export interface PropertyItem {
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

export interface OwnerPropertiesListProps {
  properties?: PropertyItem[];
  totalCount?: number;
  onNavigateToProperties?: () => void;
}

export function OwnerPropertiesList({
  properties = defaultProperties,
  totalCount = 3,
  onNavigateToProperties,
}: OwnerPropertiesListProps) {
  return (
    <div className="space-y-3.5 pt-1">
      {/* Subheader Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-[#172115]">
          العقارات التابعة للمالك ({totalCount})
        </h3>
        <Link
          href="?tab=properties"
          onClick={(e) => {
            if (onNavigateToProperties) {
              e.preventDefault();
              onNavigateToProperties();
            }
          }}
          className="text-xs font-semibold text-[#5C6B56] hover:text-[#172115] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          dir="ltr"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>إدارة العقارات والوحدات</span>
        </Link>
      </div>

      {/* Property Cards List */}
      <div className="space-y-3">
        {properties.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/properties/${item.id}`}
            className="bg-[#F1F5EB] hover:bg-[#EAEFE3] rounded-2xl p-4 sm:p-4.5 border border-[#E0E5D9]/50 flex items-center justify-between gap-3 transition-colors group cursor-pointer block"
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
                <div className="font-bold text-sm sm:text-base text-[#172115] truncate group-hover:text-[#2E3C29] transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-[#7D8A78] truncate mt-0.5">
                  {item.location} • {item.unitsText}
                </div>
              </div>
            </div>

            {/* Middle & Left in RTL: Occupancy, Units, Chevron */}
            <div className="flex items-center gap-6 sm:gap-10 shrink-0">
              {/* Occupancy Rate */}
              <div className="text-center">
                <div className="text-xs text-[#7D8A78] font-medium">نسبة الإشغال</div>
                <div className="text-sm sm:text-base font-bold text-[#172115]">
                  {item.occupancy}
                </div>
              </div>

              {/* Active Units */}
              <div className="text-center">
                <div className="text-xs text-[#7D8A78] font-medium">الوحدات النشطة</div>
                <div className="text-sm sm:text-base font-bold text-[#172115]" dir="ltr">
                  {item.activeUnits}
                </div>
              </div>

              {/* Chevron */}
              <div className="w-6 h-6 flex items-center justify-center text-[#2C3827] group-hover:translate-x-[-2px] transition-transform">
                <ChevronLeft className="w-5 h-5 text-[#2C3827]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

