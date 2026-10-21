"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WhatsAppHeroBar } from "./whatsapp-hero-bar";
import { WhatsAppFilterBar } from "./whatsapp-filter-bar";
import { ConversationList } from "./conversation-list";
import { ActiveChatHeader } from "./active-chat-header";
import { ChatFeed } from "./chat-feed";
import { ChatActionShortcuts } from "./chat-action-shortcuts";
import { ChatComposer } from "./chat-composer";
import { defaultConversations, defaultChatMessages } from "../data/mock-whatsapp-conversations";
import { WhatsAppTopFilter, WhatsAppChatMessage, TaskDetails } from "../types";

export function WhatsAppStaffChatView() {
  const [conversations] = useState(defaultConversations);
  const [selectedConversationId, setSelectedConversationId] = useState("conv-1");
  const [chatMessages, setChatMessages] = useState<Record<string, WhatsAppChatMessage[]>>(
    defaultChatMessages
  );

  // Operational task state
  const [taskStatus, setTaskStatus] = useState<TaskDetails["status"]>("pending");
  const [photoCount, setPhotoCount] = useState<number>(0);

  // Top filter bar state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [activeFilter, setActiveFilter] = useState<WhatsAppTopFilter>("all");

  const currentConversation =
    conversations.find((c) => c.id === selectedConversationId) || conversations[0];

  const currentMessages = chatMessages[selectedConversationId] || [];

  const handleSendMessage = (text: string) => {
    const timeFormatted = new Intl.DateTimeFormat("ar-SA", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());

    const newMessage: WhatsAppChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "agent",
      type: "text",
      time: timeFormatted,
      content: text,
      status: "delivered",
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
    }));

    toast.success("تم إرسال الرسالة عبر WhatsApp Business API", {
      description: `تم التسليم إلى: ${currentConversation.name}`,
    });
  };

  const handleAcceptTask = () => {
    if (taskStatus !== "pending") return;
    setTaskStatus("accepted");

    const timeFormatted = new Intl.DateTimeFormat("ar-SA", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());

    const sysMessage: WhatsAppChatMessage = {
      id: `msg-accept-${Date.now()}`,
      sender: "system",
      type: "system_notice",
      time: timeFormatted,
      content: "تم استلام المهمة CLN-2048 بنجاح — كود الدخول الذكي للباب هو: 583921",
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), sysMessage],
    }));

    toast.success("تم استلام المهمة (CLN-2048) بنجاح!", {
      description: "تم حجز المهمة وتفعيل كود الباب الذكي (583921) للوحدة 204.",
    });
  };

  const handleStartCleaning = () => {
    if (taskStatus !== "accepted") return;
    setTaskStatus("in_progress");

    toast.info("تم بدء التنظيف الفندقي للوحدة 204", {
      description: "تم تشغيل عداد الوقت التشغيلي وإبلاغ المشرف الميداني بالبدء.",
    });
  };

  const handleUploadPhotos = () => {
    const nextCount = Math.min(photoCount + 1, 4);
    setPhotoCount(nextCount);

    if (nextCount < 4) {
      toast.info(`تم رفع صورة المعاينة (${nextCount}/4)`, {
        description: "تم الحفظ في سجل الجودة التشغيلي للوحدة 204.",
      });
    } else {
      toast.success("اكتمل رفع كافة صور المعاينة (4/4)!", {
        description: "تم اعتماد مطابقة بروتوكول النظافة الفندقي الشامل.",
      });
    }
  };

  const handleCompleteTask = () => {
    setTaskStatus("completed");

    const timeFormatted = new Intl.DateTimeFormat("ar-SA", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date());

    const completeMsg: WhatsAppChatMessage = {
      id: `msg-done-${Date.now()}`,
      sender: "system",
      type: "system_notice",
      time: timeFormatted,
      content: "تم إنهاء مهمة التنظيف (CLN-2048) بالكامل — جاهزية الوحدة 204 معتمدة لاستقبال النزيل القادم",
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), completeMsg],
    }));

    toast.success("تم إنهاء مهمة التنظيف بنجاح!", {
      description: "تم تحديث حالة الوحدة 204 إلى (جاهزة للاستلام) في نظام الحجوزات.",
    });
  };

  const handleOpenLocation = () => {
    window.open("https://maps.google.com/?q=24.8015,46.6542", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4 max-w-[1536px] w-full mx-auto pb-6" dir="rtl">
      {/* 1. Top Hero Greeting Bar */}
      <WhatsAppHeroBar />

      {/* 2. Filters & Property Selector Bar */}
      <WhatsAppFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedProperty={selectedProperty}
        onPropertyChange={setSelectedProperty}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* 3. Main Two-Column Inbox Container (exact 945px height in Figma) */}
      <div className="bg-white rounded-[16px] border border-[#E2E6DC]/80 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row h-[860px] lg:h-[945px]">
        {/* Column 1: Conversations List Panel (360px wide, right in RTL) */}
        <ConversationList
          conversations={conversations}
          selectedId={selectedConversationId}
          onSelect={setSelectedConversationId}
        />

        {/* Column 2: Active Conversation & Automated Workflow Desk */}
        <div className="flex-1 flex flex-col h-full bg-[#F6FBF1] min-w-0">
          {/* Active Chat Header */}
          <ActiveChatHeader conversation={currentConversation} />

          {/* Chat Feed */}
          <ChatFeed
            messages={currentMessages}
            taskStatus={taskStatus}
            onAcceptTask={handleAcceptTask}
          />

          {/* CRITICAL DETAIL: Slim Horizontal Action Shortcuts Bar directly above composer */}
          <ChatActionShortcuts
            taskStatus={taskStatus}
            photoCount={photoCount}
            onAcceptTask={handleAcceptTask}
            onStartCleaning={handleStartCleaning}
            onUploadPhotos={handleUploadPhotos}
            onCompleteTask={handleCompleteTask}
            onOpenLocation={handleOpenLocation}
          />

          {/* Bottom Messaging Composer */}
          <ChatComposer
            workerName={currentConversation.name.split("—")[0].trim()}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
