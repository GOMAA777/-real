"use client";

import Image from "next/image";
import { toast } from "sonner";
import { WhatsAppConversationItem } from "../types";

interface ActiveChatHeaderProps {
  conversation: WhatsAppConversationItem;
  onOpenWorkerDetails?: () => void;
}

export function ActiveChatHeader({
  conversation,
  onOpenWorkerDetails,
}: ActiveChatHeaderProps) {
  const handleOpenDetails = () => {
    if (onOpenWorkerDetails) {
      onOpenWorkerDetails();
    } else {
      toast.info(`عرض الملف التعريفي والمهام للعامل: ${conversation.name}`, {
        description: "رقم الهوية: 1083921049 | الكفيل: شركة أبراج للتشغيل الفندقي",
      });
    }
  };

  return (
    <div
      className="bg-white h-[87px] border-b border-[#E5EADF] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
      dir="rtl"
    >
      {/* Right side (RTL start): Worker Avatar, Name, Unit, and Role */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-[12px] bg-[#4B5940] text-white flex items-center justify-center font-bold font-cairo text-lg shadow-3xs shrink-0">
          {conversation.avatarText?.[0] || "خ"}
        </div>

        {/* Worker Info */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold font-cairo text-[#181D17] leading-tight">
              {conversation.name.split("—")[0].trim()}
            </h3>
            {conversation.unitCode && (
              <span className="bg-[#D8E8C7] text-[#131F0B] px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold font-cairo shadow-3xs">
                الوحدة {conversation.unitCode}
              </span>
            )}
          </div>
          <p className="text-[11px] font-medium font-cairo text-[#54624C]">
            {conversation.role}
          </p>
        </div>
      </div>

      {/* Left side (RTL end): Worker Profile Action Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleOpenDetails}
          className="bg-[#EBEFE6] hover:bg-[#DFE4DB] text-[#181D17] transition-all flex items-center gap-2 px-3 py-1.5 rounded-[12px] text-xs font-semibold font-cairo cursor-pointer shadow-3xs"
        >
          <div className="w-[15px] h-[15px] relative shrink-0">
            <Image
              src="/assets/whatsapp/4531112dadf03e39fcb1c5f651935f0b6b802ad5.svg"
              alt="Worker icon"
              fill
              className="object-contain"
            />
          </div>
          <span>بيانات العامل</span>
        </button>
      </div>
    </div>
  );
}
