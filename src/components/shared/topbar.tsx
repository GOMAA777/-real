"use client";

import Image from "next/image";
import { Search, Bell, ChevronLeft } from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-[#DCE2D7] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 font-cairo">
      {/* Right in RTL: Circular Collapse/Expand Button + Vertical Divider + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Exact Circular Sidebar Toggle Button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-full bg-white border border-[#CCD4C6] text-[#252A24] hover:bg-[#EFF2EB] hover:border-[#4B5940]/50 shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0 select-none"
          title={sidebarOpen ? "طي القائمة الجانبية" : "توسيع القائمة الجانبية"}
          aria-label="تبديل القائمة الجانبية"
        >
          <ChevronLeft
            className={cn(
              "w-4 h-4 text-[#252A24] transition-transform duration-200",
              !sidebarOpen && "rotate-180"
            )}
            strokeWidth={1.75}
          />
        </button>

        {/* Vertical Divider Line */}
        <div className="h-5 w-px bg-[#DCE2D7] shrink-0" />

        {/* Breadcrumb Navigation Trail in Nav Bar */}
        <div className="min-w-0 overflow-hidden">
          <Breadcrumb variant="navbar" />
        </div>
      </div>

      {/* Left side in Topbar: Search Box + Bell + User Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Search Input Box */}
        <div className="relative w-48 sm:w-60 md:w-72 lg:w-80 hidden md:block">
          <input
            type="text"
            placeholder="ابحث عن مالك، عقار، وحدة أو حجز..."
            className="w-full h-9 pe-3 ps-9 rounded-xl bg-[#EAEFE6] border border-[#CCD4C6] text-xs text-[#252A24] placeholder:text-[#727A6E] focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 transition-all shadow-2xs"
          />
          {/* Magnifying glass icon on the start */}
          <div className="absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#727A6E]">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Notification Bell + Profile container */}
        <div className="flex items-center gap-2.5 sm:gap-3" dir="ltr">
          {/* 1. Circular Avatar Photo */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#DCE2D7] shrink-0 shadow-2xs">
            <Image
              src="/avatar.jpg"
              alt="محمد أحمد"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* 2. User Name & Role */}
          <div className="select-none text-start hidden sm:block" dir="rtl">
            <div className="text-xs sm:text-sm font-bold text-[#252A24] leading-tight whitespace-nowrap">
              محمد أحمد
            </div>
            <div className="text-[11px] text-[#687163] leading-tight mt-0.5 whitespace-nowrap">
              مدير المنصة
            </div>
          </div>

          {/* 3. Vertical Divider Line */}
          <div className="h-5 w-px bg-[#DCE2D7] shrink-0 mx-0.5" />

          {/* 4. Notification Bell with Red Dot */}
          <button
            type="button"
            className="relative p-1.5 text-[#252A24] hover:text-[#4B5940] transition-colors cursor-pointer shrink-0"
            aria-label="التنبيهات"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 start-1 w-2 h-2 rounded-full bg-[#C02828] ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
