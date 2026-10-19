"use client";

import Link from "next/link";
import { MessageSquare, CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingWhatsAppAutomationCardProps {
  automation: BookingDetail["automation"];
  isCancelled?: boolean;
  bookingCode?: string;
}

export function BookingWhatsAppAutomationCard({
  automation,
  isCancelled = false,
  bookingCode = "BK-10482",
}: BookingWhatsAppAutomationCardProps) {
  const cancelledSteps = [
    {
      id: "step-1",
      title: "1. رسالة تأكيد الحجز والترحيب",
      timestamp: "15 سبت • 11:33 ص",
      description: "تم إرسال القسيمة وتفاصيل الحجز واللوكيشن إلى النزيل بنجاح",
      status: "completed",
    },
    {
      id: "step-2",
      title: "2. بيانات الدخول وكود القفل الإلكتروني",
      timestamp: "18 سبت • 12:00 م",
      description: "مجدولة للإرسال التلقائي قبل موعد الوصول بـ 3 ساعات",
      status: "scheduled",
    },
    {
      id: "step-3",
      title: "3. إشعار تأكيد إلغاء الحجز",
      timestamp: "21 سبت • 09:00 ص",
      description: "تم إرسال إشعار الإلغاء الفوري للنزيل والمالك آلياً.",
      status: "cancelled_action",
    },
    {
      id: "step-4",
      title: "رسائل الدخول والخروج",
      badge: "تم الالغاء اليا",
      timestamp: "",
      description: "تم شطب جدولة تذكيرات الوصول والتقييم اللاحقة.",
      status: "cancelled_task",
    },
  ];

  const stepsToRender = isCancelled ? cancelledSteps : automation.steps;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-xl font-bold text-[#172115]">
            أتمتة المراسلات (WhatsApp Automation)
          </h2>
        </div>

        {/* Channel Status Badge */}
        <span className="inline-flex items-center gap-1.5 bg-[#EFF3EA] border border-[#DFE5D8] text-[#34432E] text-xs font-bold px-3 py-1 rounded-full select-none">
          <span>{automation.channelStatus}</span>
        </span>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {stepsToRender.map((step: any) => {
          const isCompleted = step.status === "completed";
          const isCancelledAction = step.status === "cancelled_action";
          const isCancelledTask = step.status === "cancelled_task";

          return (
            <div
              key={step.id}
              className={`border rounded-2xl p-4 space-y-1.5 text-right transition-colors ${
                isCancelledTask
                  ? "bg-[#F7F9F5] border-[#E8EDE4]"
                  : "bg-[#EFF3EA] border-[#DFE5D8]"
              }`}
            >
              {/* Top Row: Icon + Title (Right), Timestamp / Badge (Left) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#34432E] shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#34432E] shrink-0" />
                  )}
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      isCancelledAction
                        ? "text-[#D9383A]"
                        : "text-[#172115]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {step.badge ? (
                  <span className="text-xs font-bold text-[#D9383A] shrink-0">
                    {step.badge}
                  </span>
                ) : (
                  <span className="text-[11px] sm:text-xs text-[#7D8A78] font-medium shrink-0">
                    {step.timestamp}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#616E5D] font-medium leading-relaxed pe-6">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-2 flex justify-end">
        <Link
          href={`/dashboard/bookings/${bookingCode || "BK-10482"}/whatsapp`}
          className="text-xs font-bold text-[#34432E] hover:text-[#172115] inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <span>عرض سجل الرسائل الكامل وقوالب الأتمتة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
