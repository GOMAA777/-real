"use client";

import Image from "next/image";
import { CleaningTaskCard } from "./cleaning-task-card";
import { WhatsAppChatMessage, TaskDetails } from "../types";

interface ChatFeedProps {
  messages: WhatsAppChatMessage[];
  taskStatus?: TaskDetails["status"];
  onAcceptTask?: () => void;
}

export function ChatFeed({ messages, taskStatus, onAcceptTask }: ChatFeedProps) {
  return (
    <div
      className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F6FBF1]/40 scrollbar-thin"
      dir="rtl"
    >
      {messages.map((msg) => {
        // 1. System notice separator
        if (msg.type === "system_notice") {
          return (
            <div key={msg.id} className="flex items-center justify-center py-2">
              <div className="bg-[#EBEFE6] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-[#CCD5C5]/40">
                <div className="w-[14px] h-[8px] relative shrink-0">
                  <Image
                    src="/assets/whatsapp/3a5a6ee43ac4c0afdc6c002d5fa1722d0f107f32.svg"
                    alt="System key"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-medium font-cairo text-[#454840]">
                  {msg.content}
                </span>
              </div>
            </div>
          );
        }

        // 2. Automated Welcome Message Card
        if (msg.type === "welcome") {
          return (
            <div key={msg.id} className="max-w-[550px] w-full">
              <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC]/80 space-y-2.5">
                {/* Header: System tag on right, Time on left */}
                <div className="flex items-center justify-between pb-1 border-b border-[#F0F3EC]">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold font-cairo text-[#54624C]">
                    <div className="w-[13px] h-[11px] relative shrink-0">
                      <Image
                        src="/assets/whatsapp/22d2e41c21bdef16fa861935e74b5c6a0b8a4363.svg"
                        alt="Automation"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>رسالة ترحيبية آلية (النظام)</span>
                  </div>
                  <span className="text-[11px] font-medium font-cairo text-[#75786F]">
                    {msg.time}
                  </span>
                </div>

                {/* Body Content */}
                <div className="text-sm font-cairo text-[#181D17] leading-relaxed space-y-2">
                  <p>
                    أهلاً بك أستاذ خالد في{" "}
                    <span className="font-semibold text-[#34422A]">
                      {msg.unitTitle || "الوحدة 204 بعمارة النخيل"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>الخاص بك هو:</span>
                    <span className="bg-[#EBEFE6] text-[#34422A] font-bold px-2 py-0.5 rounded-[4px] tracking-wider text-sm border border-[#D5DDD0]">
                      {msg.smartKey || "583921"}
                    </span>
                  </p>
                  <p className="text-sm font-normal text-[#181D17] leading-relaxed">
                    {msg.content}
                  </p>
                </div>

                {/* Delivery Status */}
                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <span className="text-[11px] font-normal font-cairo text-[#54624C]">
                    تم التوصيل
                  </span>
                  <div className="w-[15px] h-[8px] relative shrink-0">
                    <Image
                      src="/assets/whatsapp/27c4e6623c101048170f6aa96f1d1594d5280a81.svg"
                      alt="Delivered"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // 3. Structured Interactive Task Card
        if (msg.type === "task_card" && msg.taskDetails) {
          return (
            <div key={msg.id} className="max-w-[550px] w-full">
              <CleaningTaskCard
                task={msg.taskDetails}
                taskStatus={taskStatus}
                onAcceptTask={onAcceptTask}
              />
            </div>
          );
        }

        // 4. Standard Text Bubble
        const isMe = msg.sender === "agent";
        return (
          <div
            key={msg.id}
            className={`flex flex-col ${isMe ? "items-start" : "items-end"} max-w-[550px] w-full`}
          >
            <div
              className={`p-3.5 rounded-[16px] text-sm font-cairo leading-relaxed shadow-3xs max-w-[85%] ${
                isMe
                  ? "bg-[#34422A] text-white rounded-br-none"
                  : "bg-white text-[#181D17] border border-[#E2E6DC]/80 rounded-bl-none"
              }`}
            >
              <p>{msg.content}</p>
              <div
                className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                  isMe ? "text-white/70" : "text-[#75786F]"
                }`}
              >
                <span>{msg.time}</span>
                {isMe && (
                  <div className="w-[12px] h-[6px] relative shrink-0">
                    <Image
                      src="/assets/whatsapp/27c4e6623c101048170f6aa96f1d1594d5280a81.svg"
                      alt="Status"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
