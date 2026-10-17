import Link from "next/link";
import { Users2, ArrowLeft } from "lucide-react";

interface OwnerItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  properties: string;
  units: string;
  date: string;
  status: "active" | "pending";
}

const recentOwners: OwnerItem[] = [
  {
    id: "1",
    name: "محمد العتيبي",
    email: "m.otaibi@dammam.sa",
    initials: "مع",
    properties: "3 عقارات",
    units: "42 وحدة",
    date: "اليوم",
    status: "active",
  },
  {
    id: "2",
    name: "خالد الحربي",
    email: "k.harbi@westinvest.com",
    initials: "دخ",
    properties: "1 عقار",
    units: "12 وحدة",
    date: "أمس",
    status: "active",
  },
  {
    id: "3",
    name: "سارة القحطاني",
    email: "sara.q@holding.sa",
    initials: "س ق",
    properties: "2 عقارات",
    units: "28 وحدة",
    date: "14 سبتمبر",
    status: "pending",
  },
  {
    id: "4",
    name: "عبدالله المطيري",
    email: "a.mutairi@properties.sa",
    initials: "عم",
    properties: "5 عقارات",
    units: "65 وحدة",
    date: "13 سبتمبر",
    status: "active",
  },
];

export function DashboardRecentOwners() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E0E4D8] shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F0F2EB]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F4F6F0] border border-[#E0E4D8] flex items-center justify-center text-[#374732]">
            <Users2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#172115]">أحدث أصحاب العقارات</h2>
            <p className="text-[11px] text-[#788574]">سجل الملاك المنضمين حديثاً للمنظومة</p>
          </div>
        </div>

        <Link
          href="/dashboard/owners"
          className="text-xs font-semibold text-[#34432E] hover:underline flex items-center gap-1"
        >
          <span>عرض جميع أصحاب العقارات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-start text-xs">
          <thead>
            <tr className="border-b border-[#F0F2EB] text-[#788574] font-semibold text-[11px]">
              <th className="py-3 px-2 text-start font-medium">المالك</th>
              <th className="py-3 px-2 text-center font-medium">العقارات</th>
              <th className="py-3 px-2 text-center font-medium">الوحدات</th>
              <th className="py-3 px-2 text-center font-medium">تاريخ التسجيل</th>
              <th className="py-3 px-2 text-end font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F8F2]">
            {recentOwners.map((owner) => (
              <tr key={owner.id} className="hover:bg-[#F9FAF7] transition-colors">
                {/* Owner info */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EAEFE5] text-[#2C3825] font-bold text-[11px] flex items-center justify-center shrink-0">
                      {owner.initials}
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#172115] text-xs">
                        {owner.name}
                      </div>
                      <div className="text-[10px] text-[#808E7C] font-mono" dir="ltr">
                        {owner.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Properties */}
                <td className="py-3 px-2 text-center text-[#273323] font-medium">
                  {owner.properties}
                </td>

                {/* Units */}
                <td className="py-3 px-2 text-center text-[#273323] font-medium">
                  {owner.units}
                </td>

                {/* Date */}
                <td className="py-3 px-2 text-center text-[#7B8876]">
                  {owner.date}
                </td>

                {/* Status */}
                <td className="py-3 px-2 text-end">
                  {owner.status === "active" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F2E3] text-[#2C6E33] text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C6E33]" />
                      <span>نشط</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      <span>بانتظار المراجعة</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
