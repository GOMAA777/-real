import Link from "next/link";
import { Users2 } from "lucide-react";

interface OwnerItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  propertyCount: string;
  propertyLabel: string;
  unitCount: string;
  unitLabel: string;
  date: {
    primary: string;
    secondary?: string;
  };
  status: "active" | "pending";
}

const recentOwners: OwnerItem[] = [
  {
    id: "1",
    name: "محمد العتيبي",
    email: "m.otaibi@domain.sa",
    initials: "مع",
    propertyCount: "3",
    propertyLabel: "عقارات",
    unitCount: "42",
    unitLabel: "وحدة",
    date: { primary: "اليوم" },
    status: "active",
  },
  {
    id: "2",
    name: "خالد الحربي",
    email: "k.harbi@investment.com",
    initials: "دخ",
    propertyCount: "1",
    propertyLabel: "عقار",
    unitCount: "12",
    unitLabel: "وحدة",
    date: { primary: "أمس" },
    status: "active",
  },
  {
    id: "3",
    name: "سارة القحطاني",
    email: "sara.q@holding.sa",
    initials: "سق",
    propertyCount: "2",
    propertyLabel: "عقارات",
    unitCount: "28",
    unitLabel: "وحدة",
    date: { primary: "14", secondary: "سبتمبر" },
    status: "pending",
  },
  {
    id: "4",
    name: "عبدالله المطيري",
    email: "a.mutairi@properties.sa",
    initials: "عم",
    propertyCount: "5",
    propertyLabel: "عقارات",
    unitCount: "64",
    unitLabel: "وحدة",
    date: { primary: "13", secondary: "سبتمبر" },
    status: "active",
  },
];

export function DashboardRecentOwners() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E0E4D8]/60 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Users2 className="w-5 h-5 text-[#172115]" />
            <h2 className="text-base sm:text-lg font-bold text-[#172115]">
              أحدث أصحاب العقارات
            </h2>
          </div>

          <Link
            href="/dashboard/owners"
            className="font-medium text-[#2E3A2B] hover:text-[#172115] hover:underline flex items-center gap-1.5 text-xs sm:text-sm transition-colors"
            dir="ltr"
          >
            <span className="text-sm leading-none">←</span>
            <span>عرض جميع أصحاب العقارات</span>
          </Link>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-[#F1F5EB] text-[#5C6958] text-xs font-medium">
                <th className="py-2.5 px-4 text-start font-medium rounded-r-xl">المالك</th>
                <th className="py-2.5 px-3 text-center font-medium">العقارات</th>
                <th className="py-2.5 px-3 text-center font-medium">الوحدات</th>
                <th className="py-2.5 px-3 text-center font-medium">تاريخ التسجيل</th>
                <th className="py-2.5 px-4 text-center font-medium rounded-l-xl">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentOwners.map((owner) => (
                <tr
                  key={owner.id}
                  className="hover:bg-[#F9FAF7] transition-colors"
                >
                  {/* Owner Column */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#DCE6D7] text-[#2C3825] font-bold text-xs flex items-center justify-center shrink-0 select-none">
                        {owner.initials}
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#172115] text-sm">
                          {owner.name}
                        </div>
                        <div className="text-xs text-[#7A8574]" dir="ltr">
                          {owner.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Properties Column */}
                  <td className="py-3 px-3 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm font-bold text-[#172115]">
                        {owner.propertyCount}
                      </span>
                      <span className="text-xs text-[#7A8574]">
                        {owner.propertyLabel}
                      </span>
                    </div>
                  </td>

                  {/* Units Column */}
                  <td className="py-3 px-3 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm font-bold text-[#172115]">
                        {owner.unitCount}
                      </span>
                      <span className="text-xs text-[#7A8574]">
                        {owner.unitLabel}
                      </span>
                    </div>
                  </td>

                  {/* Date Column */}
                  <td className="py-3 px-3 text-center">
                    {owner.date.secondary ? (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-semibold text-[#172115]">
                          {owner.date.primary}
                        </span>
                        <span className="text-xs text-[#7A8574]">
                          {owner.date.secondary}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#5C6958] font-medium">
                        {owner.date.primary}
                      </span>
                    )}
                  </td>

                  {/* Status Column */}
                  <td className="py-3 px-4 text-center">
                    {owner.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0E6] text-[#2C6E33] text-xs font-semibold select-none">
                        <span className="w-2 h-2 rounded-full bg-[#347A4B]" />
                        <span>نشط</span>
                      </span>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#FFF6E7] text-[#D97706] text-xs font-semibold select-none leading-tight">
                        <span className="w-2 h-2 rounded-full bg-[#E58B24] shrink-0" />
                        <div className="flex flex-col text-start">
                          <span>بانتظار</span>
                          <span>المراجعة</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
