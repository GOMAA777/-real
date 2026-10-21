"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { TaskDetails } from "../types";

interface ChatActionShortcutsProps {
  taskStatus: TaskDetails["status"];
  photoCount: number;
  onAcceptTask: () => void;
  onStartCleaning: () => void;
  onUploadPhotos: () => void;
  onCompleteTask: () => void;
  onOpenLocation: () => void;
}

export function ChatActionShortcuts({
  taskStatus,
  photoCount,
  onAcceptTask,
  onStartCleaning,
  onUploadPhotos,
  onCompleteTask,
  onOpenLocation,
}: ChatActionShortcutsProps) {
  const isAccepted = taskStatus === "accepted" || taskStatus === "in_progress" || taskStatus === "completed";
  const isInProgress = taskStatus === "in_progress" || taskStatus === "completed";
  const isCompleted = taskStatus === "completed";

  return (
    <div
      className="bg-[#F1F5EB] border-t border-[#E5EADF] px-4 py-2 flex items-center justify-between overflow-x-auto shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 scrollbar-none"
      dir="rtl"
    >
      <div className="flex items-center gap-2">
        {/* 1. Accept Task Button */}
        <button
          type="button"
          onClick={onAcceptTask}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-[12px] text-xs font-bold font-cairo transition-all cursor-pointer shadow-3xs whitespace-nowrap",
            !isAccepted
              ? "bg-[#34422A] hover:bg-[#283420] text-white"
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
          <span>{isAccepted ? "تم الاستلام" : "استلام المهمة"}</span>
        </button>

        {/* 2. Start Cleaning (Disabled initially) */}
        <button
          type="button"
          disabled={!isAccepted}
          onClick={onStartCleaning}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all whitespace-nowrap shadow-3xs",
            !isAccepted
              ? "bg-[#EBEFE6] text-[#75786F] opacity-60 cursor-not-allowed"
              : isInProgress
              ? "bg-[#D8E8CB] text-[#121F0D] font-bold"
              : "bg-[#34422A] hover:bg-[#283420] text-white font-bold cursor-pointer"
          )}
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/c083c4baa92bd36090235530d3aea08b05ec67a5.svg"
              alt="Start Cleaning"
              fill
              className="object-contain"
            />
          </div>
          <span>{isInProgress ? "جاري التنظيف" : "بدء التنظيف"}</span>
        </button>

        {/* 3. Upload Inspection Photos (Disabled initially) */}
        <button
          type="button"
          disabled={!isInProgress}
          onClick={onUploadPhotos}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all whitespace-nowrap shadow-3xs",
            !isInProgress
              ? "bg-[#EBEFE6] text-[#75786F] opacity-60 cursor-not-allowed"
              : "bg-[#EBEFE6] hover:bg-[#DFE4DB] text-[#181D17] cursor-pointer"
          )}
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/4cbbdf56a71d38ff540c4965dd629fb9df1ff213.svg"
              alt="Photos"
              fill
              className="object-contain"
            />
          </div>
          <span>رفع الصور ({photoCount}/4)</span>
        </button>

        {/* 4. Complete Task (Disabled initially) */}
        <button
          type="button"
          disabled={!isInProgress || isCompleted}
          onClick={onCompleteTask}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all whitespace-nowrap shadow-3xs",
            !isInProgress
              ? "bg-[#EBEFE6] text-[#75786F] opacity-60 cursor-not-allowed"
              : isCompleted
              ? "bg-[#D8E8CB] text-[#121F0D] font-bold"
              : "bg-[#34422A] hover:bg-[#283420] text-white font-bold cursor-pointer"
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
          <span>{isCompleted ? "تم إنهاء التنظيف" : "إنهاء التنظيف"}</span>
        </button>

        {/* 5. Open Location Map (Always active secondary) */}
        <button
          type="button"
          onClick={onOpenLocation}
          className="bg-white hover:bg-[#F6FBF1] text-[#181D17] border border-[#E2E6DC] flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-medium font-cairo transition-all cursor-pointer shadow-3xs whitespace-nowrap"
        >
          <div className="w-3.5 h-3.5 relative shrink-0">
            <Image
              src="/assets/whatsapp/8168bfef55589e924662e87151fe16457c88a478.svg"
              alt="Location"
              fill
              className="object-contain"
            />
          </div>
          <span>فتح الموقع</span>
        </button>
      </div>
    </div>
  );
}
