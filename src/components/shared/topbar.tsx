"use client";

import { Search, Bell, Menu } from "lucide-react";
import { useUIStore } from "@/stores/use-ui-store";

export function Topbar() {
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#F4F6F0]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between border-b border-[#E2E6DC]">
      {/* Right in RTL: Mobile menu toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-white border border-[#E0E4D8] text-[#344230] hover:bg-[#EEF2E8] transition-colors"
          aria-label="تبديل القائمة الجانبية"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="ابحث عن مالك، عقار، وحدة أو حجز..."
            className="w-full h-10 pe-4 ps-10 rounded-xl bg-white border border-[#E0E4D8] text-xs text-[#182016] placeholder:text-[#8D9B88] focus:outline-none focus:ring-2 focus:ring-[#374732]/20 focus:border-[#374732] transition-all shadow-xs"
          />
          <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Left in RTL: Notifications & User Avatar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl bg-white border border-[#E0E4D8] text-[#4A5745] hover:text-[#182016] hover:bg-[#EEF2E8] transition-colors shadow-xs"
          aria-label="التنبيهات"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Capsule */}
        <div className="flex items-center gap-2.5 ps-2 border-s border-[#E0E4D8]">
          <div className="w-9 h-9 rounded-full bg-[#34432E] text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs">
            م
          </div>
          <div className="hidden sm:block text-start">
            <div className="text-xs font-bold text-[#182016]">محمد أحمد</div>
            <div className="text-[10px] text-[#717F6C]">مدير المنصة</div>
          </div>
        </div>
      </div>
    </header>
  );
}
