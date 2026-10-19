"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ChevronLeft,
  ArrowRight,
  Calendar,
  LayoutGrid,
  Users2,
  Building2,
  Building,
  CalendarDays,
  Wrench,
  Users,
  Receipt,
  BarChart3,
  SlidersHorizontal,
  UserCircle2,
  Plus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showBack?: boolean;
  showMetadata?: boolean;
}

const SEGMENT_TITLES: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  dashboard: { label: "الرئيسية", icon: LayoutGrid },
  owners: { label: "أصحاب العقارات", icon: Users2 },
  properties: { label: "العقارات", icon: Building2 },
  units: { label: "الوحدات السكنية", icon: Home },
  bookings: { label: "الحجوزات", icon: CalendarDays },
  operations: { label: "العمليات والتشغيل", icon: Wrench },
  team: { label: "فريق العمل", icon: Users },
  billing: { label: "الاشتراكات والفوترة", icon: Receipt },
  reports: { label: "التقارير والإحصائيات", icon: BarChart3 },
  settings: { label: "الإعدادات العامة", icon: SlidersHorizontal },
  profile: { label: "الملف الشخصي", icon: UserCircle2 },
};

function formatTodayArabic(): string {
  try {
    const now = new Date();
    return new Intl.DateTimeFormat("ar-SA-u-ca-gregory", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    return "اليوم";
  }
}

export function Breadcrumb({
  items: customItems,
  className,
  showBack = true,
  showMetadata = true,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const breadcrumbs = useMemo(() => {
    if (customItems && customItems.length > 0) {
      return customItems;
    }

    if (!pathname) return [];

    const segments = pathname.split("/").filter(Boolean);
    const subSegments = segments.filter((s) => s !== "dashboard");

    // Do NOT show breadcrumb on root/primary tabs (e.g. /dashboard, /dashboard/properties, /dashboard/owners, /dashboard/bookings)
    // ONLY show breadcrumbs when navigating inside a tab (depth > 1: details / forms / sub-routes)
    if (subSegments.length <= 1) {
      return [];
    }

    const result: BreadcrumbItem[] = [
      {
        label: "الرئيسية",
        href: "/dashboard",
        icon: LayoutGrid,
        isCurrent: false,
      },
    ];

    let currentHref = "";

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg === "dashboard") continue;

      currentHref += `/${seg}`;
      const isLast = i === segments.length - 1;
      const prevSeg = i > 0 ? segments[i - 1] : "";

      if (SEGMENT_TITLES[seg]) {
        result.push({
          label: SEGMENT_TITLES[seg].label,
          href: isLast ? undefined : `/dashboard${currentHref}`,
          icon: SEGMENT_TITLES[seg].icon,
          isCurrent: isLast,
        });
      } else if (seg === "new") {
        let label = "إضافة جديد";
        if (prevSeg === "properties") label = "إضافة عقار جديد";
        else if (prevSeg === "bookings") label = "إضافة حجز جديد";
        else if (prevSeg === "owners") label = "إضافة صاحب عقار";
        else if (prevSeg === "units") label = "إضافة وحدة جديدة";

        result.push({
          label,
          href: isLast ? undefined : `/dashboard${currentHref}`,
          icon: Plus,
          isCurrent: isLast,
        });
      } else {
        // Dynamic ID or detail page
        let label = "التفاصيل";
        let icon: React.ComponentType<{ className?: string }> = Building;
        let badge = `#${seg}`;

        if (prevSeg === "properties") {
          label = "عمارة النخيل الفاخرة";
          icon = Building2;
          badge = `#${seg === "1" ? "014" : seg}`;
        } else if (prevSeg === "owners") {
          label = "محمد بن سالم العتيبي";
          icon = Users2;
          badge = `#${seg === "1" ? "PO-8821" : seg}`;
        } else if (prevSeg === "bookings") {
          label = "تفاصيل الحجز";
          icon = CalendarDays;
        } else if (prevSeg === "units") {
          label = "تفاصيل الوحدة";
          icon = Home;
        }

        result.push({
          label,
          href: isLast ? undefined : `/dashboard${currentHref}`,
          icon,
          badge,
          isCurrent: isLast,
        });
      }
    }

    return result;
  }, [pathname, customItems]);

  const canGoBack = breadcrumbs.length > 1;

  // Do not render anything if on a primary/root tab
  if (breadcrumbs.length === 0) {
    return null;
  }

  // Generate Schema.org BreadcrumbList for rich results
  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.label,
        item: crumb.href
          ? `https://abraj.sa${crumb.href}`
          : undefined,
      })),
    };
  }, [breadcrumbs]);

  return (
    <>
      {/* Schema.org Microdata for SEO & Accessibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section
        aria-label="مسار التصفح"
        className={cn(
          "relative w-full rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2E6DC] px-4 py-2.5 sm:px-5 sm:py-3 shadow-2xs select-none transition-all duration-200",
          className
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Right Side in RTL: Navigation Trail */}
          <nav aria-label="مسار التنقل" className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
              {breadcrumbs.map((crumb, index) => {
                const isFirst = index === 0;
                const isLast = index === breadcrumbs.length - 1;
                const Icon = crumb.icon;

                return (
                  <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2">
                    {/* Separator before each non-first item */}
                    {!isFirst && (
                      <ChevronLeft
                        className="w-3.5 h-3.5 text-[#A5B3A1] shrink-0"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    )}

                    {/* Breadcrumb Item Element */}
                    {isLast ? (
                      /* Active Leaf Item */
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E8EFE3] border border-[#CCDBC4] text-[#1E2B1A] font-bold shadow-3xs"
                        aria-current="page"
                      >
                        {isFirst ? (
                          <div className="w-5 h-5 rounded-lg bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-3xs">
                            <Home className="w-3 h-3" />
                          </div>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#34432E] shrink-0 ring-4 ring-[#34432E]/15" />
                        )}

                        <span className="truncate max-w-[200px] sm:max-w-[320px]">
                          {crumb.label}
                        </span>

                        {crumb.badge && (
                          <span className="px-1.5 py-0.5 rounded-md bg-white/90 border border-[#CBD7C3] text-[10px] font-mono font-bold text-[#34432E] shadow-3xs">
                            {crumb.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      /* Clickable Intermediate or Home Link */
                      <Link
                        href={crumb.href || "#"}
                        className={cn(
                          "group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#34432E]/20",
                          isFirst
                            ? "bg-[#F0F4EC] text-[#2C3825] hover:bg-[#34432E] hover:text-white border border-[#DCE4D6] shadow-3xs"
                            : "text-[#5B6957] hover:text-[#172115] hover:bg-[#F0F4EC]"
                        )}
                      >
                        {isFirst ? (
                          <Home className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                        ) : Icon ? (
                          <Icon className="w-3.5 h-3.5 text-[#738270] group-hover:text-[#172115] transition-colors" />
                        ) : null}

                        <span className={cn(isFirst && "hidden sm:inline")}>
                          {crumb.label}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Left Side in RTL: Quick Back Action + Live Date/Status Badge */}
          <div className="flex items-center gap-2 sm:gap-3 ms-auto">
            {/* Quick Back Button on Detail/Sub Pages */}
            {showBack && canGoBack && (
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F4EC] hover:bg-[#E5ECE0] text-[#34432E] hover:text-[#172115] border border-[#D5E0CE] text-xs font-bold transition-all shadow-3xs active:scale-95 cursor-pointer"
                title="الرجوع للصفحة السابقة"
              >
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-0" />
                <span className="hidden xs:inline">رجوع</span>
              </button>
            )}

            {/* Live Synchronized Status Badge */}
            {showMetadata && (
              <div className="hidden sm:inline-flex items-center gap-2">
                {/* Date Display */}
                <div className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#657361] px-2.5 py-1 rounded-lg bg-[#F7F9F5] border border-[#E2E8DC]">
                  <Calendar className="w-3.5 h-3.5 text-[#7D8A78]" />
                  <span>{mounted ? formatTodayArabic() : "اليوم"}</span>
                </div>

                {/* Live Sync Dot */}
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2E7D32] px-2.5 py-1 rounded-full bg-[#E8F5E9] border border-[#C8E6C9]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
                  </span>
                  <span>متزامن لحظياً</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
