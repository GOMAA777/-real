"use client";

import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";

export function Topbar() {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-[#E5EADF] px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Right in RTL: Mobile menu toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-[#F1F4EB] text-[#344230] hover:bg-[#E4E9DC] transition-colors"
          aria-label="تبديل القائمة الجانبية"
        >
          <Menu className="w-4 h-4" />
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

      {/* Left in RTL: User Avatar, Name/Role, Divider, and Bell with Red Dot */}
      <div className="flex items-center">
        {/* User Info Capsule: Avatar + Name/Role */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-black/5 shrink-0 shadow-2xs">
            <Image
              src="/avatar.jpg"
              alt="محمد أحمد"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="text-start select-none">
            <div className="text-xs sm:text-sm font-bold text-[#172115] leading-tight">
              محمد أحمد
            </div>
            <div className="text-[11px] text-[#788574] leading-tight mt-0.5">
              مدير المنصة
            </div>
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div className="h-6 w-px bg-[#E2E6DC] mx-3 sm:mx-4" />

        {/* Notification Bell with Red Dot */}
        <button
          type="button"
          className="relative p-1.5 text-[#2C3825] hover:text-[#172115] transition-colors cursor-pointer"
          aria-label="التنبيهات"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 end-1 w-2 h-2 rounded-full bg-[#E53E3E] ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
