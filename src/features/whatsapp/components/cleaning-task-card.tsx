"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TaskDetails } from "../types";

interface CleaningTaskCardProps {
  task: TaskDetails;
  taskStatus?: TaskDetails["status"];
  onAcceptTask?: () => void;
}

export function CleaningTaskCard({
  task,
  taskStatus: externalStatus,
  onAcceptTask,
}: CleaningTaskCardProps) {
  const [internalStatus, setInternalStatus] = useState<TaskDetails["status"]>(task.status);
  const currentStatus = externalStatus !== undefined ? externalStatus : internalStatus;
  const isAccepted = currentStatus !== "pending";

  const handleAccept = () => {
    if (!isAccepted) {
      setInternalStatus("accepted");
      toast.success(`تم استلام المهمة (${task.code}) بنجاح!`, {
        description: "تم حجز المهمة وإرسال كود الباب الذكي إلى هاتف العامل وتحديث الجدول التشغيلي.",
      });
      if (onAcceptTask) onAcceptTask();
    } else {
      toast.info(`المهمة (${task.code}) مستلمة بالفعل وهي قيد التنفيذ.`);
    }
  };

  const handleOpenMap = () => {
    window.open(task.coordinatesUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("تم نسخ كود الباب الذكي إلى الحافظة!", {
      description: `الكود: ${code}`,
    });
  };

  return (
    <div
      className="bg-white rounded-[12px] p-4 sm:p-5 border border-[#E2E6DC]/80 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full max-w-[550px] space-y-3.5"
      dir="rtl"
    >
      {/* 1. Card Header: Broom Icon + Title + Urgent Priority Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-[#4B5940] flex items-center justify-center shrink-0 shadow-3xs">
            <div className="w-[14px] h-[17px] relative">
              <Image
                src="/assets/whatsapp/979c39f2fd55dc2a62835c25e5f351a9ef7cc49f.svg"
                alt="Cleaning"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h4 className="text-[15px] font-bold font-cairo text-[#181D17]">
            {task.title}
          </h4>
        </div>

        <span className="bg-[#D8E8CB] text-[#121F0D] px-2.5 py-1 rounded-full text-[11px] font-bold font-cairo shadow-3xs">
          {task.priorityLabel}
        </span>
      </div>

      {/* 2. Key Operational Data Grid (2x2) */}
      <div className="bg-[#F1F5EB] rounded-[12px] p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Row 1, Col 1: Property and Location */}
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 relative shrink-0 mt-0.5">
            <Image
              src="/assets/whatsapp/644dce6d0956525aa0d56728f16997735f39a874.svg"
              alt="Building"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-xs font-normal font-cairo text-[#75786F] block">
              العقار والموقع
            </span>
            <span className="text-xs sm:text-[13px] font-semibold font-cairo text-[#181D17] block leading-snug">
              {task.propertyName} ({task.propertyLocation})
            </span>
          </div>
        </div>

        {/* Row 1, Col 2: Unit and Level */}
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 relative shrink-0 mt-0.5">
            <Image
              src="/assets/whatsapp/0f7410f480b1596e1a51313aa93ea60483dbb2cb.svg"
              alt="Unit"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-xs font-normal font-cairo text-[#75786F] block">
              الوحدة والمستوى
            </span>
            <span className="text-xs sm:text-[13px] font-semibold font-cairo text-[#181D17] block leading-snug">
              {task.unitName} ({task.unitLevel})
            </span>
          </div>
        </div>

        {/* Row 2, Col 1: Departure of previous guest */}
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 relative shrink-0 mt-0.5">
            <Image
              src="/assets/whatsapp/9d30d1d40c010f81bf8f3f20d3aa72502d0e210c.svg"
              alt="Departure"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-xs font-normal font-cairo text-[#75786F] block">
              مغادرة النزيل السابق
            </span>
            <span className="text-xs sm:text-[13px] font-semibold font-cairo text-[#181D17] block leading-snug">
              {task.departureTime} ({task.departureStatus})
            </span>
          </div>
        </div>

        {/* Row 2, Col 2: Arrival of next guest (Alert: Bold Red) */}
        <div className="flex items-start gap-2.5">
          <div className="w-4 h-4 relative shrink-0 mt-0.5">
            <Image
              src="/assets/whatsapp/e274a3a6478b8a94884dcf78b9f9f9fb0f953dc3.svg"
              alt="Arrival"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-0.5 min-w-0">
            <span className="text-xs font-normal font-cairo text-[#75786F] block">
              وصول النزيل القادم
            </span>
            <span className="text-xs sm:text-[13px] font-bold font-cairo text-[#BA1A1A] block leading-snug">
              {task.arrivalTime} ({task.arrivalUrgency})
            </span>
          </div>
        </div>
      </div>

      {/* 3. Owner Specific Directives Box */}
      <div className="bg-[#D8E8CB]/40 rounded-[12px] p-3 space-y-1 border border-[#CCE0BC]/50">
        <h5 className="text-xs font-bold font-cairo text-[#5A6952]">
          {task.directivesTitle}
        </h5>
        <p className="text-xs font-normal font-cairo text-[#3D4B36] leading-relaxed">
          {task.directivesContent}
        </p>
      </div>

      {/* 4. Google Maps Coordinates Fast Nav Link */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={handleOpenMap}
          className="flex items-center gap-1.5 text-xs font-semibold font-cairo text-[#34422A] hover:underline cursor-pointer"
        >
          <div className="w-3 h-4 relative shrink-0">
            <Image
              src="/assets/whatsapp/54f45dc0355abf7240d59992109a39027f19e8a8.svg"
              alt="Google Maps"
              fill
              className="object-contain"
            />
          </div>
          <span>عرض إحداثيات العقار عبر خرائط Google</span>
        </button>
      </div>

      {/* 5. Smart Door Access Code Reveal (Interactive instant feedback) */}
      {isAccepted && (
        <div className="bg-[#EAF1E8] border border-[#CCD5C5] rounded-[12px] p-3 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#4B5940] text-white flex items-center justify-center font-bold text-xs shrink-0">
              🔑
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold font-cairo text-[#181D17]">
                  كود الدخول الذكي للباب:
                </span>
                <span className="font-mono text-sm font-bold text-[#34422A] bg-white px-2 py-0.5 rounded-[4px] border border-[#D5DDD0] tracking-wider">
                  583921
                </span>
              </div>
              <span className="text-[11px] font-medium font-cairo text-[#54624C] block">
                تم تفعيله آلياً للوحدة 204 — صالح حتى 04:00 عصراً
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleCopyCode("583921")}
            className="text-[11px] font-semibold font-cairo bg-white hover:bg-[#F1F5EB] text-[#34422A] px-2.5 py-1 rounded-[8px] border border-[#CCD5C5] transition-all shrink-0 cursor-pointer shadow-3xs"
          >
            نسخ الكود
          </button>
        </div>
      )}

      {/* 6. WhatsApp Interactive CTA Button Mockup */}
      <div className="pt-1 space-y-2">
        <button
          type="button"
          onClick={handleAccept}
          className={cn(
            "w-full h-11 rounded-[12px] flex items-center justify-center gap-2 font-bold font-cairo text-sm transition-all shadow-3xs cursor-pointer",
            !isAccepted
              ? "bg-[#34422A] hover:bg-[#283320] text-white"
              : "bg-[#D8E8CB] text-[#121F0D]"
          )}
        >
          <div className="w-4 h-4 relative shrink-0">
            <Image
              src="/assets/whatsapp/6cfd0460e19404a7551082c5c029d7a0ff13b969.svg"
              alt="Accept CTA"
              fill
              className="object-contain"
            />
          </div>
          <span>
            {!isAccepted
              ? `استلام المهمة (${task.code})`
              : `تم استلام المهمة (${task.code}) — الكود مفعل`}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-center text-xs font-normal font-cairo text-[#75786F]">
          <div className="w-3 h-3 relative shrink-0">
            <Image
              src="/assets/whatsapp/aab2a716045990f39c3bc730cd7683750dbf1e26.svg"
              alt="Info"
              fill
              className="object-contain"
            />
          </div>
          <span>
            أول عامل مؤهل يضغط على استلام المهمة يتم حجزها له تلقائيًا وإرسال كود الباب السري.
          </span>
        </div>
      </div>
    </div>
  );
}
