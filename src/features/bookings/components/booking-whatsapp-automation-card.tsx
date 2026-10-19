"use client";

import { MessageSquare, CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { BookingDetail } from "../types";

interface BookingWhatsAppAutomationCardProps {
  automation: BookingDetail["automation"];
}

export function BookingWhatsAppAutomationCard({
  automation,
}: BookingWhatsAppAutomationCardProps) {
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

      {/* 3 Steps List */}
      <div className="space-y-3">
        {automation.steps.map((step) => {
          const isCompleted = step.status === "completed";

          return (
            <div
              key={step.id}
              className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 space-y-1.5 text-right transition-colors"
            >
              {/* Top Row: Icon + Title (Right), Timestamp (Left) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#7D8A78] shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-bold text-[#172115]">
                    {step.title}
                  </span>
                </div>

                <span className="text-[11px] sm:text-xs text-[#7D8A78] font-medium shrink-0">
                  {step.timestamp}
                </span>
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
      <div className="pt-2 border-t border-[#EAEFE6]">
        <button
          type="button"
          onClick={() =>
            toast.info("عرض سجل الإرسال ومحفزات رسائل الواتساب وقوالب الرد الآلي")
          }
          className="text-xs font-bold text-[#34432E] hover:text-[#172115] inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <span>عرض سجل الرسائل الكامل وقوالب الأتمتة</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
