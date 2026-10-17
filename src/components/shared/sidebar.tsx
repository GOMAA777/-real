"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building,
  LayoutGrid,
  Users,
  Building2,
  Home,
  CalendarDays,
  Wrench,
  Users2,
  Receipt,
  BarChart3,
  SlidersHorizontal,
  UserCircle2,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/use-ui-store";
import { showUnderConstructionToast } from "@/lib/toast";

const isRouteAvailable = (href: string) => {
  return ["/dashboard", "/dashboard/owners", "/dashboard/properties"].includes(href);
};

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { title: "الرئيسية", href: "/dashboard", icon: LayoutGrid },
  { title: "أصحاب العقارات", href: "/dashboard/owners", icon: Users2 },
  { title: "العقارات", href: "/dashboard/properties", icon: Building2 },
  { title: "الوحدات", href: "/dashboard/units", icon: Home },
  { title: "الحجوزات", href: "/dashboard/bookings", icon: CalendarDays, badge: "2" },
  { title: "العمليات", href: "/dashboard/operations", icon: Wrench, badge: "2" },
  { title: "فريق العمل", href: "/dashboard/team", icon: Users },
  { title: "الاشتراكات والفوترة", href: "/dashboard/billing", icon: Receipt },
  { title: "التقارير", href: "/dashboard/reports", icon: BarChart3 },
];

const systemNavItems: NavItem[] = [
  { title: "الإعدادات", href: "/dashboard/settings", icon: SlidersHorizontal },
  { title: "الملف الشخصي", href: "/dashboard/profile", icon: UserCircle2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* 1. COLLAPSED MINI SIDEBAR (In Website's Dark Olive Colors) */}
      {/* ========================================================= */}
      <aside
        className={cn(
          "hidden fixed top-0 bottom-0 start-0 z-40 w-[72px] bg-[#34432E] border-e border-white/10 flex-col justify-between py-4 select-none shadow-xs transition-all duration-300",
          !sidebarOpen && "lg:flex"
        )}
      >
        {/* Top Header: Brand Squircle Icon */}
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-[#2A3725] border border-white/10 flex items-center justify-center text-white/90 shadow-2xs">
            <Building className="w-5 h-5 text-white/90" />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mt-3.5 mb-2.5" />
        </div>

        {/* Center Navigation Icons Stack */}
        <div className="flex-1 flex flex-col items-center gap-2 overflow-y-auto no-scrollbar py-1">
          {/* Main Navigation Items */}
          {mainNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/dashboard" && pathname === "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                aria-label={item.title}
                onClick={(e) => {
                  if (!isRouteAvailable(item.href)) {
                    e.preventDefault();
                    showUnderConstructionToast(`صفحة "${item.title}"`);
                  }
                }}
                className="group relative flex items-center justify-center"
              >
                {isActive ? (
                  <div className="w-11 h-11 rounded-[14px] bg-[#DCE7D3] text-[#2C3825] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5 text-[#2C3825]" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                )}

                {item.badge && (
                  <span
                    className={cn(
                      "absolute -top-1 -end-1 min-w-4 h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center",
                      isActive
                        ? "bg-[#2C3825] text-[#DCE7D3] ring-2 ring-[#DCE7D3]"
                        : "bg-[#DCE7D3] text-[#2C3825] ring-2 ring-[#34432E]"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Subtle separator between main and system */}
          <div className="w-8 h-px bg-white/10 my-1" />

          {/* System Items */}
          {systemNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                aria-label={item.title}
                onClick={(e) => {
                  if (!isRouteAvailable(item.href)) {
                    e.preventDefault();
                    showUnderConstructionToast(`صفحة "${item.title}"`);
                  }
                }}
                className="group relative flex items-center justify-center"
              >
                {isActive ? (
                  <div className="w-11 h-11 rounded-[14px] bg-[#DCE7D3] text-[#2C3825] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5 text-[#2C3825]" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Divider + User Avatar with Green Dot + Logout */}
        <div className="mt-auto pt-2 flex flex-col items-center">
          <div className="w-full h-px bg-white/10 mb-3" />

          {/* User Avatar with Green Online Dot */}
          <Link
            href="/dashboard/profile"
            className="relative block group"
            title="الملف الشخصي - محمد أحمد"
            aria-label="الملف الشخصي"
          >
            <div className="w-10 h-10 rounded-xl bg-[#DCE7D3] text-[#2C3825] font-bold text-xs flex items-center justify-center shadow-xs group-hover:opacity-90 transition-opacity">
              م
            </div>
            <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-[#86EFAC] ring-2 ring-[#34432E]" />
          </Link>

          {/* Logout Button */}
          <Link
            href="/login"
            className="mt-2 p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="تسجيل الخروج"
            aria-label="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. EXPANDED SIDEBAR (Full width in Website Colors)       */}
      {/* ========================================================= */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 start-0 z-50 w-64 bg-[#34432E] text-white flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out select-none shadow-xl lg:shadow-none border-e border-white/5",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"
        )}
      >

        {/* Top Scrollable Area: Brand & Main Navigation */}
        <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar">
          {/* Header Brand */}
          <div className="flex items-center justify-between pt-2 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A3725] border border-white/10 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-white/90" />
              </div>
              <div className="space-y-0.5">
                <h1 className="text-base font-bold tracking-tight text-white leading-tight">
                  ابراج
                </h1>
                <p className="text-[10px] text-white/60 font-light leading-tight">
                  منظومة إدارة وتشغيل العقارات
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Group 1: Main Menu */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 text-[11px] font-semibold text-white/40">
              القائمة الرئيسية
            </div>

            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/dashboard" && pathname === "/");
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (!isRouteAvailable(item.href)) {
                        e.preventDefault();
                        showUnderConstructionToast(`صفحة "${item.title}"`);
                      } else {
                        setSidebarOpen(false);
                      }
                    }}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                      isActive
                        ? "bg-[#DCE7D3] text-[#2C3825] font-bold shadow-xs"
                        : "text-white/75 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "w-4 h-4 transition-colors",
                          isActive ? "text-[#2C3825]" : "text-white/60 group-hover:text-white"
                        )}
                      />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center",
                          isActive
                            ? "bg-[#2C3825] text-[#DCE7D3]"
                            : "bg-[#DCE7D3] text-[#2C3825]"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Section: Group 2 (النظام والإعدادات) Directly Above User Card */}
        <div className="mt-auto pt-4 space-y-4">
          {/* Group 2: System & Settings */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[11px] font-semibold text-white/40">
              النظام والإعدادات
            </div>

            <nav className="space-y-1">
              {systemNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (!isRouteAvailable(item.href)) {
                        e.preventDefault();
                        showUnderConstructionToast(`صفحة "${item.title}"`);
                      } else {
                        setSidebarOpen(false);
                      }
                    }}
                    className={cn(
                      "group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                      isActive
                        ? "bg-[#DCE7D3] text-[#2C3825] font-bold shadow-xs"
                        : "text-white/75 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive ? "text-[#2C3825]" : "text-white/60 group-hover:text-white"
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile Card */}
          <div className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#DCE7D3] text-[#2C3825] font-bold text-xs flex items-center justify-center">
                م
              </div>
              <div>
                <div className="text-xs font-bold text-white">محمد أحمد</div>
                <div className="flex items-center gap-1 text-[10px] text-white/60">
                  <ShieldCheck className="w-3 h-3 text-[#86EFAC]" />
                  <span>مدير النظام</span>
                </div>
              </div>
            </div>

            <Link
              href="/login"
              className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
