"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TaskDetails } from "../types";

interface CleaningTaskCardProps {
  task: TaskDetails;
  onAcceptTask?: () => void;
}

export function CleaningTaskCard({ task, onAcceptTask }: CleaningTaskCardProps) {
  const [taskStatus, setTaskStatus] = useState<TaskDetails["status"]>(task.status);

  const handleAccept = () => {
    setTaskStatus("accepted");
    toast.success(`تم استلام المهمة (${task.code}) بنجاح!`, {
      description: "تم حجز المهمة وإرسال كود الباب الذكي إلى هاتف العامل وتحديث الجدول التشغيلي.",
    });
    if (onAcceptTask) onAcceptTask();
  };

  const handleOpenMap = () => {
    window.open(task.coordinatesUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="bg-white rounded-[12px] p-4 sm:p-5 border border-[#E2E6DC]/80 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] max-w-[550px] space-y-4"
      dir="rtl"
    >
      {/* 1. Header: Priority Badge + Task Code */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-[#4B5940] flex items-center justify-center shrink-0">
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
      <div className="bg-[#F1F5EB] rounded-[12px] p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      {/* 3. Action Shortcuts Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Accept Button */}
        <button
          type="button"
          onClick={handleAccept}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-bold font-cairo transition-all cursor-pointer shadow-3xs whitespace-nowrap",
            taskStatus === "pending"
              ? "bg-[#34422A] hover:bg-[#283320] text-white"
              : "bg-[#D8E8CB] text-[#121F0D]"
          )}
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/2ee4c9e85e09c54c128777de06ea13286d224d6e.svg"
              alt="Accept"
              fill
              className="object-contain"
            />
          </div>
          <span>{taskStatus === "pending" ? "استلام المهمة" : "تم الاستلام"}</span>
        </button>

        {/* Start Cleaning (Disabled initially) */}
        <button
          type="button"
          disabled={taskStatus === "pending"}
          onClick={() => {
            setTaskStatus("in_progress");
            toast.info("تم بدء توقيت مهمة التنظيف وتسجيل حالة الوحدة (قيد التنظيف).");
          }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all whitespace-nowrap shadow-3xs",
            taskStatus === "pending"
              ? "bg-[#EBEFE6] text-[#75786F] opacity-60 cursor-not-allowed"
              : "bg-[#EBEFE6] hover:bg-[#DFE4DB] text-[#181D17] cursor-pointer"
          )}
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/c083c4baa92bd36090235530d3aea08b05ec67a5.svg"
              alt="Start"
              fill
              className="object-contain"
            />
          </div>
          <span>بدء التنظيف</span>
        </button>

        {/* Upload Photos (0/4) */}
        <button
          type="button"
          disabled={taskStatus === "pending"}
          onClick={() => toast.info("رفع صور المعاينة والفحص النهائي (4 صور مطلوبة).")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all whitespace-nowrap shadow-3xs",
            taskStatus === "pending"
              ? "bg-[#EBEFE6] text-[#75786F] opacity-60 cursor-not-allowed"
              : "bg-[#EBEFE6] hover:bg-[#DFE4DB] text-[#181D17] cursor-pointer"
          )}
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/4cbbdf56a71d38ff540c4965dd629fb9df1ff213.svg"
              alt="Camera"
              fill
              className="object-contain"
            />
          </div>
          <span>رفع الصور (0/4)</span>
        </button>

        {/* Complete Task */}
        <button
          type="button"
          disabled={taskStatus !== "in_progress" && taskStatus !== "accepted"}
          onClick={() => {
            setTaskStatus("completed");
            toast.success("تم إنهاء مهمة التنظيف واعتماد جاهزية الوحدة لاستقبال النزيل القادم.");
          }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all whitespace-nowrap shadow-3xs",
            taskStatus === "pending"
              ? "bg-[#EBEFE6] text-[#75786F] opacity-60 cursor-not-allowed"
              : "bg-[#EBEFE6] hover:bg-[#DFE4DB] text-[#181D17] cursor-pointer"
          )}
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/7143e788f97ace842f819b1f306b8e9696ca89be.svg"
              alt="Complete"
              fill
              className="object-contain"
            />
          </div>
          <span>إنهاء التنظيف</span>
        </button>

        {/* Open Location */}
        <button
          type="button"
          onClick={handleOpenMap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo bg-white hover:bg-[#F6FBF1] text-[#181D17] transition-all cursor-pointer shadow-3xs border border-[#E2E6DC] whitespace-nowrap"
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/8168bfef55589e924662e87151fe16457c88a478.svg"
              alt="Map"
              fill
              className="object-contain"
            />
          </div>
          <span>فتح الموقع</span>
        </button>
      </div>

      {/* 4. Owner Specific Directives Box */}
      <div className="bg-[#D8E8CB]/40 rounded-[12px] p-3.5 space-y-1 border border-[#CCE0BC]/50">
        <h5 className="text-xs font-bold font-cairo text-[#5A6952]">
          {task.directivesTitle}
        </h5>
        <p className="text-xs font-normal font-cairo text-[#3D4B36] leading-relaxed">
          {task.directivesContent}
        </p>
      </div>

      {/* 5. Google Maps Coordinates Fast Nav Link */}
      <button
        type="button"
        onClick={handleOpenMap}
        className="flex items-center gap-2 text-xs font-semibold font-cairo text-[#34422A] hover:underline cursor-pointer pt-1"
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

      {/* 6. WhatsApp Interactive CTA Button Mockup */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={handleAccept}
          className="w-full h-12 rounded-[12px] bg-[#34422A] hover:bg-[#283320] text-white flex items-center justify-center gap-2 font-bold font-cairo text-sm transition-all shadow-3xs cursor-pointer"
        >
          <div className="w-4 h-4 relative shrink-0">
            <Image
              src="/assets/whatsapp/6cfd0460e19404a7551082c5c029d7a0ff13b969.svg"
              alt="Accept CTA"
              fill
              className="object-contain"
            />
          </div>
          <span>{taskStatus === "pending" ? `استلام المهمة (${task.code})` : `تم استلام المهمة (${task.code})`}</span>
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
          <span>أول عامل مؤهل يضغط على استلام المهمة يتم حجزها له تلقائيًا وإرسال كود الباب السري.</span>
        </div>
      </div>
    </div>
  );
}
