"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { WhatsAppConversationItem, ConversationFilter } from "../types";

interface ConversationListProps {
  conversations: WhatsAppConversationItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onNewChat?: () => void;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onNewChat,
}: ConversationListProps) {
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((item) => {
    // Tab filter
    if (filter === "active_tasks" && item.category !== "active_tasks") return false;
    if (filter === "supervisors" && item.category !== "supervisors") return false;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.lastMessage.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <aside
      className="w-full lg:w-[360px] bg-white border-inline-end border-[#E5EADF] flex flex-col shrink-0 h-full"
      dir="rtl"
    >
      {/* 1. Header & Filters area (exact 144px in Figma) */}
      <div className="p-4 border-b border-[#E5EADF] space-y-3 shrink-0">
        {/* Title + Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-cairo text-[#34422A]">
              المحادثات
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium font-cairo bg-[#D8E8CB] text-[#121F0D]">
              5 نشطة
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                toast.success("تم تحديث قائمة المحادثات وحالات الطاقم الميداني")
              }
              className="w-8 h-8 rounded-[8px] bg-[#EBEFE6] hover:bg-[#DFE4DB] flex items-center justify-center transition-colors cursor-pointer"
              title="تحديث المحادثات"
            >
              <div className="w-[13px] h-[13px] relative">
                <Image
                  src="/assets/whatsapp/b3a5cf51e0584d958e1b26fd8e746ba14be23821.svg"
                  alt="Refresh"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNewChat) onNewChat();
                else toast.info("بدء محادثة جديدة مع أحد أفراد الفريق الميداني");
              }}
              className="w-8 h-8 rounded-[8px] bg-[#EBEFE6] hover:bg-[#DFE4DB] flex items-center justify-center transition-colors cursor-pointer"
              title="محادثة جديدة"
            >
              <div className="w-4 h-4 relative">
                <Image
                  src="/assets/whatsapp/bc66f3a54f35d8907ff57091e91295e921da14b2.svg"
                  alt="New chat"
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Search inside conversations */}
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث في محادثات الطاقم الميداني..."
            className="w-full h-[34px] ps-3 pe-9 rounded-[12px] bg-[#F1F5EB] border border-transparent text-xs text-[#181D17] placeholder:text-[#75786F] focus:bg-white focus:border-[#CCD5C5] focus:outline-none focus:ring-1 focus:ring-[#34422A]/20 transition-all font-cairo"
          />
          <div className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none w-[13.5px] h-[13.5px]">
            <Image
              src="/assets/whatsapp/c79bda9dae8b5f320db5df33e7833dc3589f90ca.svg"
              alt="Search"
              width={14}
              height={14}
              className="object-contain"
            />
          </div>
        </div>

        {/* Filter pills: الكل, مهام نشطة, المشرفون */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-semibold font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
              filter === "all"
                ? "bg-[#34422A] text-white"
                : "bg-[#EBEFE6] text-[#454840] hover:bg-[#DFE4DB]"
            )}
          >
            الكل
          </button>
          <button
            type="button"
            onClick={() => setFilter("active_tasks")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
              filter === "active_tasks"
                ? "bg-[#34422A] text-white"
                : "bg-[#EBEFE6] text-[#454840] hover:bg-[#DFE4DB]"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                filter === "active_tasks" ? "bg-emerald-300" : "bg-[#54624C]"
              )}
            />
            <span>مهام نشطة</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("supervisors")}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-medium font-cairo transition-all cursor-pointer whitespace-nowrap shadow-3xs",
              filter === "supervisors"
                ? "bg-[#34422A] text-white"
                : "bg-[#EBEFE6] text-[#454840] hover:bg-[#DFE4DB]"
            )}
          >
            المشرفون
          </button>
        </div>
      </div>

      {/* 2. Conversations Feed */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {filteredConversations.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "w-full text-start p-3 rounded-[12px] flex items-start gap-3 transition-all cursor-pointer",
                isSelected
                  ? "bg-[#EBEFE6] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ring-1 ring-[#CCD5C5]"
                  : "hover:bg-[#F6FBF1]/80"
              )}
            >
              {/* Avatar on Right in RTL */}
              <div className="relative shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-cairo font-bold text-base shadow-3xs"
                  style={{
                    backgroundColor: item.avatarBg || "#E5EAE0",
                    color: item.avatarBg === "#4B5940" ? "#FFFFFF" : "#181D17",
                  }}
                >
                  {item.isIconAvatar ? (
                    <div className="w-[18px] h-[18px] relative">
                      <Image
                        src="/assets/whatsapp/f4ef631abfd758ab386d94f7bf85e7208a9f817c.svg"
                        alt="Warehouse"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    item.avatarText
                  )}
                </div>

                {/* Online indicator dot */}
                {item.isOnline && (
                  <span className="absolute bottom-0 start-0 w-3.5 h-3.5 rounded-full bg-[#059669] ring-2 ring-white" />
                )}
                {!item.isOnline && !item.isIconAvatar && (
                  <span className="absolute bottom-0 start-0 w-3.5 h-3.5 rounded-full bg-[#D7DBD2] ring-2 ring-white" />
                )}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Name & Time */}
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={cn(
                      "text-[15px] font-cairo truncate",
                      isSelected ? "font-bold text-[#181D17]" : "font-semibold text-[#181D17]"
                    )}
                  >
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-cairo shrink-0",
                      isSelected ? "font-bold text-[#34422A]" : "font-medium text-[#75786F]"
                    )}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Snippet message */}
                <p className="text-[13px] font-normal font-cairo text-[#454840] truncate">
                  {item.lastMessage}
                </p>

                {/* Bottom Tags & Unread Badge */}
                <div className="flex items-center justify-between pt-1">
                  {/* Badge on left in RTL */}
                  {item.unreadCount && item.unreadCount > 0 ? (
                    <span className="w-5 h-5 rounded-full bg-[#34422A] text-white text-[11px] font-bold font-cairo flex items-center justify-center shrink-0">
                      {item.unreadCount}
                    </span>
                  ) : (
                    <span />
                  )}

                  {/* Task / Status Tag on right */}
                  {item.tag && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[11px] font-cairo",
                        item.tag.type === "task"
                          ? "bg-[#D8E8CB] text-[#121F0D] font-semibold"
                          : "bg-[#EBEFE6] text-[#454840]"
                      )}
                    >
                      <span>{item.tag.text}</span>
                      {item.tag.type === "task" && (
                        <div className="w-[10px] h-[12px] relative shrink-0">
                          <Image
                            src="/assets/whatsapp/00da1b0e5b271dced19524a98145976754e43562.svg"
                            alt="Task"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {item.tag.type === "inspected" && (
                        <div className="w-[12px] h-[7px] relative shrink-0">
                          <Image
                            src="/assets/whatsapp/9a60284876499195e7690c541d12b937a8839a84.svg"
                            alt="Inspected"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {item.tag.type === "quality" && (
                        <div className="w-[12px] h-[12px] relative shrink-0">
                          <Image
                            src="/assets/whatsapp/548f722fea730cf27e48b823638d94ba09b2a892.svg"
                            alt="Quality"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Footer: Webhook Status */}
      <div className="p-3 bg-[#F1F5EB] border-t border-[#E5EADF] flex items-center justify-between shrink-0 text-[11px] font-medium font-cairo">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#059669] shrink-0" />
          <span className="text-[#454840]">خادم الويب هوك (Cloud API) متصل</span>
        </div>
        <span className="text-[#75786F]">مُحدّث قبل دقيقة</span>
      </div>
    </aside>
  );
}
