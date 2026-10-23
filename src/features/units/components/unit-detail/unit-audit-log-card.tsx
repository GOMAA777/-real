"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  History,
  KeyRound,
  Lock,
  Sparkles,
  Thermometer,
} from "lucide-react";

interface UnitAuditLogCardProps {
  onOpenOperationsLog?: () => void;
}

export function UnitAuditLogCard({ onOpenOperationsLog }: UnitAuditLogCardProps) {
  const events = [
    {
      title: "تسجيل دخول النزيل للوحدة",
      desc: "تم فتح القفل الذكي بنجاح بواسطة كود النزيل المؤقت (خالد العتيبي)",
      time: "اليوم • 02:45 م",
      icon: Lock,
      color: "bg-[#EAF1E8] text-[#2F8A3E]",
    },
    {
      title: "تفعيل كود الدخول السحابي",
      desc: "تمت مزامنة وتفعيل كود المرور 129385 بنجاح على قفل الباب الذكي",
      time: "اليوم • 12:00 ظ",
      icon: KeyRound,
      color: "bg-[#F1F5EB] text-[#34422A]",
    },
    {
      title: "التكييف الذكي والتهيئة البيئية",
      desc: "تحول نظام التكييف آلياً من وضع التوفير إلى 22° م استعداداً لوصول الضيف",
      time: "اليوم • 01:30 م",
      icon: Thermometer,
      color: "bg-[#EFF6FF] text-[#1D4ED8]",
    },
    {
      title: "اكتمال التنظيف والتعقيم الفندقي",
      desc: "أنهى فريق شركة رعاية الفندقية مهمة التنظيف #CLN-8830 بنسبة 100%",
      time: "17 سبتمبر • 04:30 م",
      icon: Sparkles,
      color: "bg-[#F5F3FF] text-[#7C3AED]",
    },
    {
      title: "تأكيد واستلام الحجز الإلكتروني",
      desc: "تم استلام الحجز رقم #BK-10482 من منصة Booking.com وتوثيقه في شموس",
      time: "15 سبتمبر • 11:20 ص",
      icon: Calendar,
      color: "bg-[#FEF3C7] text-[#92400E]",
    },
  ];

  return (
    <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-4 text-start">
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5EB]">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#34422A]" />
          <h3 className="text-[17px] font-bold text-[#181D17]">
            سجل النشاط والأحداث الذكية
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenOperationsLog}
          className="text-[12px] font-bold text-[#34422A] hover:text-[#181D17] hover:underline cursor-pointer"
        >
          عرض سجل العمليات الكامل
        </button>
      </div>

      <div className="space-y-3">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-[12px] bg-[#FAFBF9] hover:bg-[#F3F7EE] transition-colors border border-[#EEF2E6]"
            >
              <span
                className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${evt.color}`}
              >
                <Icon className="w-4 h-4" />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[13px] font-bold text-[#181D17]">
                    {evt.title}
                  </div>
                  <div className="text-[11px] text-[#7C8773] shrink-0">
                    {evt.time}
                  </div>
                </div>
                <p className="text-[11.5px] text-[#55694D] mt-0.5 leading-snug">
                  {evt.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
