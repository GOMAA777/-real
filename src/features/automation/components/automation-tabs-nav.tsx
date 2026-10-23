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
    <div className="bg-white rounded-3xl p-2 border border-[#DCE2D7] shadow-xs flex items-center justify-start gap-2 overflow-x-auto no-scrollbar font-cairo">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all shrink-0 cursor-pointer select-none ${
              isSelected
                ? "bg-[#EBF0E6] text-[#4B5940] font-bold border border-[#CCD4C6]/60 shadow-xs"
                : "text-[#687163] hover:text-[#252A24] hover:bg-[#EFF2EB] border border-transparent"
            }`}
          >
            <Icon className={`w-4 h-4 ${isSelected ? "text-[#4B5940]" : "text-[#687163]"}`} />
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                isSelected
                  ? "bg-white text-[#4B5940] border border-[#CCD4C6]/60"
                  : "bg-[#EFF2EB] text-[#687163]"
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
