"use client";

import Image from "next/image";
import { Search, Bell, ChevronLeft } from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E5EADF] px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Right in RTL: Circular Collapse/Expand Button + Search Bar */}
      <div className="flex items-center gap-3.5 flex-1 max-w-lg">
        {/* Exact Circular Sidebar Toggle Button from user screenshot */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-full bg-white border border-[#CCD5C5] text-[#172115] hover:bg-[#F4F6F0] hover:border-[#B4C1AC] shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0 select-none"
          title={sidebarOpen ? "طي القائمة الجانبية" : "توسيع القائمة الجانبية"}
          aria-label="تبديل القائمة الجانبية"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 text-[#172115] transition-transform duration-200",
              !sidebarOpen && "rotate-180"
            )}
            strokeWidth={1.75}
          />
        </button>

        {/* Search Input Box */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="ابحث عن مالك، عقار، وحدة أو حجز..."
            className="w-full h-11 pe-4 ps-11 rounded-2xl bg-[#EEF2E6] border border-transparent text-xs text-[#182016] placeholder:text-[#8D9B88] focus:bg-white focus:border-[#CCD5C5] focus:outline-none focus:ring-2 focus:ring-[#374732]/10 transition-all shadow-2xs"
          />
          {/* Magnifying glass icon on the LEFT */}
          <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
            <Search className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Left side in Topbar: From left to right: Avatar -> Name/Role -> Divider -> Bell */}
      <div className="flex items-center gap-3 sm:gap-3.5" dir="ltr">
        {/* 1. Circular Avatar Photo */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-black/5 shrink-0 shadow-2xs">
          <Image
            src="/avatar.jpg"
            alt="محمد أحمد"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* 2. User Name & Role with proper spacing and no overlap */}
        <div className="select-none text-start" dir="rtl">
          <div className="text-xs sm:text-sm font-bold text-[#172115] leading-tight whitespace-nowrap">
            محمد أحمد
          </div>
          <div className="text-[11px] text-[#788574] leading-tight mt-0.5 whitespace-nowrap">
            مدير المنصة
          </div>
        </div>

        {/* 3. Vertical Divider Line */}
        <div className="h-6 w-px bg-[#E2E6DC] shrink-0 mx-1" />

        {/* 4. Notification Bell with Red Dot */}
        <button
          type="button"
          className="relative p-1.5 text-[#2C3825] hover:text-[#172115] transition-colors cursor-pointer shrink-0"
          aria-label="التنبيهات"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 start-1 w-2 h-2 rounded-full bg-[#E53E3E] ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
