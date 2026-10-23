import { Building2, LogIn, CreditCard, ArrowLeft } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: typeof Building2;
}

const defaultEvents: TimelineEvent[] = [
  {
    id: "evt-1",
    title: "إضافة عقار جديد: عمارة النخيل (الرياض)",
    description: "قام المالك بإضافة 24 وحدة سكنية وربط ترخيص فال التابع لها",
    time: "منذ ساعتين",
    icon: Building2,
  },
  {
    id: "evt-2",
    title: "تسجيل دخول ناجح إلى المنصة",
    description: "من خلال APP على نظام iOS من مدينة الرياض",
    time: "اليوم، 09:24 ص",
    icon: LogIn,
  },
  {
    id: "evt-3",
    title: "تحديث تسعير الوحدة 104",
    description: "تعديل التسعير الموسمي لعطلة نهاية الأسبوع إلى 450 ر.س / ليلة",
    time: "أمس، 04:15 م",
    icon: CreditCard,
  },
];

interface OwnerActivityTimelineProps {
  events?: TimelineEvent[];
  totalEventsCount?: number;
  onNavigateToActivity?: () => void;
}

export function OwnerActivityTimeline({
  events = defaultEvents,
  totalEventsCount = 24,
  onNavigateToActivity,
}: OwnerActivityTimelineProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        {/* Right side in RTL: Icon Squircle + Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4E2C7] text-[#283820] flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-[#2B3925]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="12" x="3" y="4" rx="2" />
              <path d="M7 11l2.5-3 2.5 3 4-4" />
              <path d="M9 19h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#172115]">
              آخر نشاط وسجل العمليات
            </h2>
            <p className="text-xs text-[#7D8A78] mt-0.5">
              الأحداث الموثقة في حساب المالك
            </p>
          </div>
        </div>

        {/* Left side in RTL: Event Count */}
        <span className="text-xs sm:text-sm text-[#7D8A78] font-medium">
          {totalEventsCount} حدث مسجل
        </span>
      </div>

      {/* Timeline Items */}
      <div className="relative ps-2">
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute top-4 bottom-6 start-[23px] w-px bg-[#E2E6DC] z-0" />

        <div className="space-y-3.5 relative z-10">
          {events.map((evt) => {
            const Icon = evt.icon;
            return (
              <div key={evt.id} className="flex items-start gap-3 sm:gap-4">
                {/* Timeline Node Circle */}
                <div className="w-8 h-8 rounded-full bg-[#EEF2E6] text-[#34432E] ring-4 ring-white flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Event Card Content Box */}
                <div className="bg-[#F9FAF7] rounded-2xl p-4 flex-1 border border-[#EEF2E6] flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-[#172115]">
                      {evt.title}
                    </div>
                    <div className="text-[11px] text-[#7D8A78] mt-0.5 leading-relaxed">
                      {evt.description}
                    </div>
                  </div>
                  <div className="text-[11px] text-[#7D8A78] whitespace-nowrap self-start sm:self-auto">
                    {evt.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link */}
      <div className="text-center pt-1">
        <button
          type="button"
          onClick={onNavigateToActivity}
          className="text-xs font-bold text-[#34432E] hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>عرض سجل النشاط الكامل ({totalEventsCount} حدث)</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
