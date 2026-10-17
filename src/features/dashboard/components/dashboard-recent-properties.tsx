import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

interface PropertyItem {
  id: string;
  name: string;
  city: string;
  units: string;
  owner: string;
  dotColor: string;
}

const properties: PropertyItem[] = [
  {
    id: "1",
    name: "عمارة النخيل",
    city: "الرياض",
    units: "12 وحدة",
    owner: "محمد العتيق",
    dotColor: "bg-[#2C6E33]",
  },
  {
    id: "2",
    name: "مجمع الواحة",
    city: "جدة",
    units: "24 وحدة",
    owner: "خالد الحربي",
    dotColor: "bg-[#374732]",
  },
  {
    id: "3",
    name: "برج الياسمين",
    city: "الرياض",
    units: "36 وحدة",
    owner: "سارة القحطاني",
    dotColor: "bg-[#F59E0B]",
  },
];

export function DashboardRecentProperties() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E0E4D8] shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F2EB]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F4F6F0] border border-[#E0E4D8] flex items-center justify-center text-[#374732]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#172115]">أحدث العقارات</h2>
              <p className="text-[11px] text-[#788574]">العقارات المسجلة مؤخراً</p>
            </div>
          </div>

          <Link
            href="/dashboard/properties"
            className="text-xs font-semibold text-[#34432E] hover:underline flex items-center gap-1"
          >
            <span>عرض جميع العقارات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Property Items List */}
        <div className="divide-y divide-[#F6F8F2] pt-1">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="py-3 flex items-center justify-between hover:bg-[#F9FAF7] px-2 -mx-2 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F4F6F0] border border-[#E0E4D8] flex items-center justify-center text-[#374732] shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${prop.dotColor}`} />
                    <span className="font-bold text-xs text-[#172115]">
                      {prop.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#788574]">
                    {prop.city} • {prop.units} • المالك: {prop.owner}
                  </div>
                </div>
              </div>

              <ArrowLeft className="w-4 h-4 text-[#A1AD9E] group-hover:text-[#34432E] group-hover:-translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-2 border-t border-[#F0F2EB] flex items-center justify-between text-[11px] text-[#6E7B6A]">
        <span>إجمالي العقارات الموثقة: 386 عقار</span>
        <Link
          href="/dashboard/properties"
          className="font-bold text-[#34432E] hover:underline flex items-center gap-1"
        >
          <span>إدارة التوثيق</span>
          <ArrowLeft className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
