"use client";

interface UnitActivityTimelineCardProps {
  onOpenOperationsLog?: () => void;
}

export function UnitActivityTimelineCard({
  onOpenOperationsLog,
}: UnitActivityTimelineCardProps) {
  const events = [
    {
      dotColor: "bg-[#E99A38]",
      title: "تم ربط حجز جديد #BK-10482",
      badge: "Booking.com",
      date: "18 سبتمبر 2026 — 02:45 م",
    },
    {
      dotColor: "bg-[#34422A]",
      title: "تم تحديث كود الدخول الذكي للنزيل",
      badge: "النظام السحابي الآلي",
      date: "18 سبتمبر 2026 — 01:00 م",
    },
    {
      dotColor: "bg-[#3E8A5A]",
      title: "تم إتمام مهمة التنظيف والتعقيم بنجاح",
      badge: "عامل النظافة: راجو",
      date: "17 سبتمبر 2026 — 04:30 م",
    },
    {
      dotColor: "bg-[#75786F]",
      title: "تم تحديث بيانات الوحدة (السعر الأساسي إلى 250 ر.س)",
      badge: "المشرف: محمد أحمد",
      date: "15 سبتمبر 2026 — 11:20 ص",
    },
    {
      dotColor: "bg-[#C5C8BD]",
      title: "تم إنشاء الوحدة وتوثيق المعرف الرقمي",
      badge: "المشرف: محمد أحمد",
      date: "10 سبتمبر 2026 — 09:15 ص",
    },
  ];

  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-6"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5EB]/60">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
          <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            سجل النشاط والتدقيق الإداري
          </h2>
        </div>
        <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
          آخر 5 أحداث مسجلة
        </span>
      </div>

      {/* Timeline track list */}
      <div className="relative pr-6 space-y-6 text-right">
        {/* Continuous Track Line */}
        <div className="absolute right-[7px] top-[8px] bottom-[16px] w-[2px] bg-[#E5EAE0]" />

        {events.map((ev, index) => (
          <div key={index} className="relative flex flex-col gap-1">
            {/* Timeline Dot with Outer White Ring */}
            <div
              className={`absolute -right-[23px] top-[4px] size-4 rounded-full ${ev.dotColor} shadow-[0px_0px_0px_4px_white] shrink-0`}
            />

            {/* Title & Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#181D17] text-[14px] leading-[20px]">
                {ev.title}
              </span>
              <span className="bg-[#E5EAE0] rounded-[4px] px-2 py-0.5 font-medium text-[#75786F] text-[11px] leading-[16px]">
                {ev.badge}
              </span>
            </div>

            {/* Timestamp */}
            <span className="font-normal text-[#75786F] text-[13px] leading-[20px]">
              {ev.date}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Center Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onOpenOperationsLog}
          className="bg-[#F1F5EB] hover:bg-[#E5ECE0] rounded-[12px] px-4 py-2 flex items-center gap-1.5 font-bold text-[#34422A] text-[12px] leading-[18px] transition-colors cursor-pointer select-none"
        >
          <img
            src="/icons/units/arrow-activity.svg"
            alt=""
            className="size-[10.7px] shrink-0"
          />
          <span>عرض سجل النشاط الكامل</span>
        </button>
      </div>
    </div>
  );
}
