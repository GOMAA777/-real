"use client";

import { useState } from "react";
import { LayoutGrid, Building2, Calendar, CreditCard, History } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { showUnderConstructionToast } from "@/lib/toast";

interface OwnerTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  propertiesCount?: number;
  bookingsCount?: number;
  activityCount?: number;
}

export function OwnerTabs({
  activeTab: controlledTab,
  onTabChange,
  propertiesCount = 3,
  bookingsCount = 18,
  activityCount = 24,
}: OwnerTabsProps) {
  const [internalTab, setInternalTab] = useState("overview");
  const currentTab = controlledTab ?? internalTab;

  const handleSelect = (id: string, label: string) => {
    if (
      id !== "overview" &&
      id !== "properties" &&
      id !== "activity" &&
      id !== "bookings"
    ) {
      showUnderConstructionToast(`تبويب ${label}`);
      return;
    }
    if (controlledTab === undefined) {
      setInternalTab(id);
    }
    onTabChange?.(id);
  };

  const tabs = [
    {
      id: "overview",
      label: "نظرة عامة",
      icon: LayoutGrid,
    },
    {
      id: "properties",
      label: `العقارات (${propertiesCount})`,
      icon: Building2,
    },
    {
      id: "bookings",
      label: `الحجوزات (${bookingsCount})`,
      icon: Calendar,
    },
    {
      id: "billing",
      label: "الاشتراك والفوترة",
      icon: CreditCard,
    },
    {
      id: "activity",
      label: `سجل النشاط (${activityCount})`,
      icon: History,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-1.5 border border-[#E2E6DC] flex items-center gap-2 overflow-x-auto shadow-2xs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSelect(tab.id, tab.label)}
            className={cn(
              "relative px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer select-none transition-colors duration-200",
              isActive
                ? "text-white"
                : "text-[#556350] hover:text-[#172115] hover:bg-[#F6F8F4]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="ownerActiveTabIndicator"
                className="absolute inset-0 bg-[#34432E] rounded-xl shadow-2xs z-0"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors duration-200",
                  isActive ? "text-white" : "text-[#7D8A78]"
                )}
              />
              <span>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
