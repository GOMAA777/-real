"use client";

import { Sliders, MessageSquare, History } from "lucide-react";
import { AutomationMainTab } from "../types";

interface AutomationTabsNavProps {
  activeTab?: AutomationMainTab;
  currentTab?: AutomationMainTab;
  onTabChange?: (tab: AutomationMainTab) => void;
  counts?: {
    rules: number;
    templates: number;
    logs: number;
  };
}

export function AutomationTabsNav({
  activeTab,
  currentTab,
  onTabChange,
  counts = { rules: 12, templates: 8, logs: 1420 },
}: AutomationTabsNavProps) {
  const selectedTab = activeTab || currentTab || "rules";
  const tabs = [
    {
      id: "rules" as const,
      label: "قواعد الأتمتة",
      icon: Sliders,
      badge: `${counts.rules} قاعدة نشطة`,
    },
    {
      id: "templates" as const,
      label: "قوالب واتساب",
      icon: MessageSquare,
      badge: `${counts.templates} قوالب`,
    },
    {
      id: "logs" as const,
      label: "سجل التنفيذ",
      icon: History,
      badge: `${counts.logs.toLocaleString()} عملية`,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-2 border border-[#EBEBEB] shadow-xs flex items-center justify-start gap-2 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium transition-all shrink-0 ${
              isSelected
                ? "bg-[#EEF5EE] text-[#1F3D2B] font-bold border border-[#DCE8DC] shadow-xs"
                : "text-[#4B5563] hover:text-[#1F2937] hover:bg-gray-50 border border-transparent"
            }`}
          >
            <Icon className="w-4 h-4 text-[#1F3D2B]" />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                isSelected
                  ? "bg-white text-[#1F3D2B] border border-[#DCE8DC]"
                  : "bg-gray-100 text-[#6B7280]"
              }`}
            >
              {tab.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
