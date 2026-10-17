import Link from "next/link";
import {
  Clock,
  UserPlus,
  Building,
  CalendarCheck,
  FileEdit,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

interface ActivityItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge?: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    icon: UserPlus,
    title: "تم تسجيل مالك عقار جديد — محمد العتيبي",
    time: "منذ 10 دقائق",
  },
  {
    id: "2",
    icon: Building,
    title: "تم إضافة عقار جديد — عمارة النخيل — الرياض",
    badge: "12 وحدة",
    time: "منذ 25 دقيقة",
  },
  {
    id: "3",
    icon: CalendarCheck,
    title:
      "تم تسجيل 8 حجوزات جديدة — عبر قنوات الربط المباشر وقنوات التوزيع الرقمية (OTA)",
    time: "منذ ساعة",
  },
  {
    id: "4",
    icon: FileEdit,
    title:
      "تم تحديث بيانات مالك عقار — خالد الحربي (تحديث الحساب المصرفي الآيبان والشهادة الضريبية)",
    time: "منذ ساعتين",
  },
];

export function DashboardActivityFeed() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E0E4D8] shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F0F2EB] gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F4F6F0] border border-[#E0E4D8] flex items-center justify-center text-[#374732]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#172115]">
              آخر نشاط على المنصة
            </h2>
            <p className="text-[11px] text-[#788574]">
              سجل فوري بآخر التحديثات والإجراءات المتخذة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C6E33]">
          <span className="w-2 h-2 rounded-full bg-[#2C6E33] animate-pulse" />
          <span>سجل تدقيق العمليات الموثق</span>
        </div>
      </div>

      {/* Activity Timeline Items */}
      <div className="space-y-3 pt-1">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#F9FAF7] hover:bg-[#F3F6EE] transition-colors border border-[#ECEFE6] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E0E4D8] text-[#374732] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs text-[#172115] font-medium leading-relaxed flex items-center flex-wrap gap-2">
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-[#E8F2E3] text-[#2C6E33] text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-[#7B8775] whitespace-nowrap shrink-0">
                {item.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Audit Banner Footer */}
      <div className="pt-3 border-t border-[#F0F2EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#4A5745]">
          <ShieldCheck className="w-4 h-4 text-[#2C6E33]" />
          <span className="text-[11px] sm:text-xs">
            نظام المراقبة اللحظي يعمل بكفاءة 99.99% • تم التحقق من جميع سجلات
            التدقيق
          </span>
        </div>

        <Link
          href="/dashboard/operations"
          className="font-bold text-[#34432E] hover:underline flex items-center gap-1 text-xs"
        >
          <span>سجل العمليات بالكامل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
