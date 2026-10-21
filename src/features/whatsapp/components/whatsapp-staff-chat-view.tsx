"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WhatsAppHeroBar } from "./whatsapp-hero-bar";
import { WhatsAppFilterBar } from "./whatsapp-filter-bar";
import { ConversationList } from "./conversation-list";
import { ActiveChatHeader } from "./active-chat-header";
import { ChatFeed } from "./chat-feed";
import { ChatComposer } from "./chat-composer";
import { defaultConversations, defaultChatMessages } from "../data/mock-whatsapp-conversations";
import { WhatsAppTopFilter, WhatsAppChatMessage } from "../types";

export function WhatsAppStaffChatView() {
  const [conversations] = useState(defaultConversations);
  const [selectedConversationId, setSelectedConversationId] = useState("conv-1");
  const [chatMessages, setChatMessages] = useState<Record<string, WhatsAppChatMessage[]>>(
    defaultChatMessages
  );

  // Top filter bar state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [activeFilter, setActiveFilter] = useState<WhatsAppTopFilter>("all");

  const currentConversation =
    conversations.find((c) => c.id === selectedConversationId) || conversations[0];

  const currentMessages = chatMessages[selectedConversationId] || [];

  const handleSendMessage = (text: string) => {
    const newMessage: WhatsAppChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "agent",
      type: "text",
      time: new Intl.DateTimeFormat("ar-SA", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(new Date()),
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

  return (
    <div className="space-y-4 max-w-[1536px] w-full mx-auto" dir="rtl">
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

      {/* 3. Main Two-Column Inbox Container */}
      <div className="bg-white rounded-[16px] border border-[#E2E6DC]/80 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row h-[780px] sm:h-[860px]">
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
          <ChatFeed messages={currentMessages} />

          {/* Composer */}
          <ChatComposer
            workerName={currentConversation.name.split("—")[0].trim()}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
