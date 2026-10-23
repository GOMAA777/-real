import Link from "next/link";
import { Building2, Home, Building } from "lucide-react";

interface PropertyItem {
  id: string;
  name: string;
  city: string;
  units: string;
  owner: string;
  dotColor: string;
  icon: "building-2" | "home" | "building";
}

const properties: PropertyItem[] = [
  {
    id: "1",
    name: "عمارة النخيل",
    city: "الرياض",
    units: "12 وحدة",
    owner: "محمد العتيبي",
    dotColor: "bg-[#347A4B]",
    icon: "building-2",
  },
  {
    id: "2",
    name: "مجمع الواحة",
    city: "جدة",
    units: "24 وحدة",
    owner: "خالد الحربي",
    dotColor: "bg-[#347A4B]",
    icon: "home",
  },
  {
    id: "3",
    name: "برج الياسمين",
    city: "الرياض",
    units: "36 وحدة",
    owner: "سارة القحطاني",
    dotColor: "bg-[#E58B24]",
    icon: "building",
  },
];

export function DashboardRecentProperties() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#172115]" />
            <h2 className="text-base sm:text-lg font-bold text-[#172115]">
              أحدث العقارات
            </h2>
          </div>

          <Link
            href="/dashboard/properties"
            className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
            dir="ltr"
          >
            <span className="text-sm leading-none">←</span>
            <span>عرض جميع العقارات</span>
          </Link>
        </div>

        {/* Property Items List */}
        <div className="space-y-3 pt-2">
          {properties.map((prop) => (
            <Link
              key={prop.id}
              href={`/dashboard/properties/${prop.id}`}
              className="py-2.5 px-3 flex items-center justify-between hover:bg-[#F9FAF7] rounded-2xl transition-colors group select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EFF4E8] flex items-center justify-center text-[#374732] shrink-0">
                  {prop.icon === "building-2" && <Building2 className="w-5 h-5" />}
                  {prop.icon === "home" && <Home className="w-5 h-5" />}
                  {prop.icon === "building" && <Building className="w-5 h-5" />}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#172115]">
                      {prop.name}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${prop.dotColor}`} />
                  </div>
                  <div className="text-xs text-[#7A8574]">
                    {prop.city} &rlm;▪&rlm; {prop.units} &rlm;▪&rlm; المالك: {prop.owner}
                  </div>
                </div>
              </div>

              <span className="text-sm text-[#8A9685] group-hover:text-[#172115] transition-colors leading-none">
                ←
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#7A8574]">
        <span>إجمالي العقارات الموثقة: 386 عقار</span>
        <Link
          href="/dashboard/properties"
          className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 transition-colors"
          dir="ltr"
        >
          <span className="text-sm leading-none">←</span>
          <span>إدارة الوثائق</span>
        </Link>
      </div>
    </div>
  );
}
