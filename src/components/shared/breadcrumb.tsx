"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ChevronLeft,
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
  MessageSquare,
  History,
  Zap,
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
  variant?: "navbar" | "card";
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
  cleaning: { label: "مهام التنظيف", icon: Sparkles },
  maintenance: { label: "بلاغات الصيانة", icon: Wrench },
  log: { label: "سجل التشغيل الكامل", icon: History },
  automation: { label: "الأتمتة والرسائل", icon: Zap },
  rules: { label: "قواعد الأتمتة", icon: SlidersHorizontal },
  templates: { label: "قوالب واتساب", icon: MessageSquare },
  logs: { label: "سجل التنفيذ التشغيلي", icon: History },
  team: { label: "فريق العمل", icon: Users },
  billing: { label: "الاشتراكات والفوترة", icon: Receipt },
  pricing: { label: "إعدادات التسعير وسعة الشقق", icon: SlidersHorizontal },
  reports: { label: "التقارير والإحصائيات", icon: BarChart3 },
  settings: { label: "الإعدادات العامة", icon: SlidersHorizontal },
  profile: { label: "الملف الشخصي", icon: UserCircle2 },
  guests: { label: "بيانات العميل", icon: Users },
  whatsapp: { label: "سجل رسائل WhatsApp", icon: MessageSquare },
  activity: { label: "سجل نشاط الحجز", icon: History },
};

export function Breadcrumb({
  items: customItems,
  className,
  variant = "navbar",
}: BreadcrumbProps) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (customItems && customItems.length > 0) {
      return customItems;
    }

    if (!pathname) return [];

    // Strip basePath if present (e.g. /Edaret_Amlak)
    const rawSegments = pathname.split("/").filter(Boolean);
    const segments = rawSegments.filter(
      (s) => s.toLowerCase() !== "edaret_amlak"
    );

    const result: BreadcrumbItem[] = [
      {
        label: "الرئيسية",
        href: "/dashboard",
        icon: Home,
        isCurrent: segments.length === 0 || (segments.length === 1 && segments[0] === "dashboard"),
      },
    ];

    let currentHref = "";

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg === "dashboard") continue;

      currentHref += `/${seg}`;
      const isLast = i === segments.length - 1;
      const prevSeg = i > 0 ? segments[i - 1] : "";

      if (seg === "activity") {
        const isPropertyActivity = currentHref.includes("properties");
        result.push({
          label: isPropertyActivity ? "سجل الأحداث الكامل للعقار" : "سجل نشاط الحجز",
          href: isLast ? undefined : `/dashboard${currentHref}`,
          icon: History,
          isCurrent: isLast,
        });
      } else if (SEGMENT_TITLES[seg]) {
        result.push({
          label: SEGMENT_TITLES[seg].label,
          href: isLast ? undefined : `/dashboard${currentHref}`,
          icon: SEGMENT_TITLES[seg].icon,
          isCurrent: isLast,
        });
      } else if (seg === "edit") {
        let label = "تعديل";
        if (prevSeg === "rules") label = "تعديل قاعدة الأتمتة";
        else if (prevSeg.length > 0) label = "تعديل الحجز";

        result.push({
          label,
          href: isLast ? undefined : `/dashboard${currentHref}`,
          icon: CalendarDays,
          isCurrent: isLast,
        });
      } else if (seg === "new") {
        let label = "إضافة جديد";
        if (prevSeg === "properties") label = "إضافة عقار جديد";
        else if (prevSeg === "bookings") label = "إضافة حجز جديد";
        else if (prevSeg === "owners") label = "إضافة صاحب عقار";
        else if (prevSeg === "units") label = "إضافة وحدة جديدة";
        else if (prevSeg === "maintenance") label = "إنشاء بلاغ صيانة جديد";
        else if (prevSeg === "cleaning") label = "إنشاء مهمة تنظيف جديدة";
        else if (prevSeg === "rules") label = "إنشاء قاعدة أتمتة جديدة";
        else if (prevSeg === "templates") label = "إنشاء قالب واتساب جديد";

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
        } else if (prevSeg === "cleaning") {
          label = `مهمة تنظيف ${seg}`;
          icon = Sparkles;
          badge = `#${seg}`;
        } else if (prevSeg === "maintenance") {
          label = `بلاغ صيانة ${seg}`;
          icon = Wrench;
          badge = `#${seg}`;
        } else if (prevSeg === "guests") {
          label = "خالد العتيبي";
          icon = UserCircle2;
          badge = `#${seg === "1" ? "GUST-89324" : seg}`;
        } else if (prevSeg === "rules") {
          label = "تفاصيل قاعدة الأتمتة";
          icon = Zap;
          badge = `#${seg}`;
        } else if (prevSeg === "logs") {
          label = "تفاصيل سجل التنفيذ";
          icon = History;
          badge = `#${seg}`;
        } else if (prevSeg === "templates") {
          label = "تفاصيل قالب واتساب";
          icon = MessageSquare;
          badge = `#${seg}`;
        } else if (prevSeg === "billing") {
          label = "تفاصيل الاشتراك والفوترة";
          icon = Receipt;
          badge = `#${seg.startsWith("SUB-") ? seg : `SUB-${seg}`}`;
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

  if (breadcrumbs.length === 0) {
    return null;
  }

  // Schema.org BreadcrumbList for rich results
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      item: crumb.href ? `https://abraj.sa${crumb.href}` : undefined,
    })),
  };

  // 1. Sleek Navbar Variant (Placed inside Topbar as requested)
  if (variant === "navbar") {
    return (
      <nav
        aria-label="مسار التنقل"
        className={cn(
          "flex items-center min-w-0 select-none",
          className
        )}
      >
        <ol className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar text-xs">
          {breadcrumbs.map((crumb, index) => {
            const isFirst = index === 0;
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li
                key={`${crumb.label}-${index}`}
                className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0"
              >
                {/* Separator chevron between items */}
                {!isFirst && (
                  <ChevronLeft
                    className="w-3.5 h-3.5 text-[#9BA896] shrink-0"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                )}

                {/* Breadcrumb Item */}
                {isLast ? (
                  /* Active current leaf: distinct, visible, elegant with dot */
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-3xs",
                      isFirst
                        ? "bg-[#EEF2E6] text-[#1E2B1A] border border-[#CCDBC4]"
                        : "bg-[#EEF2E6] text-[#181D17] border border-[#CCDBC4]"
                    )}
                    aria-current="page"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 text-[#34432E]" />}
                    <span className="truncate max-w-[140px] sm:max-w-[220px] md:max-w-[280px]">
                      {crumb.label}
                    </span>
                    {!isFirst && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34432E] shrink-0" />
                    )}
                    {crumb.badge && (
                      <span className="px-1.5 py-0.2 rounded bg-white text-[10px] font-mono font-bold text-[#34432E] border border-[#CBD7C3]">
                        {crumb.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  /* Clickable ancestor link: hoverable, styled cleanly */
                  <Link
                    href={crumb.href || "/dashboard"}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-[#54624C] hover:text-[#181D17] hover:bg-[#F1F5EB] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#34432E]/30 whitespace-nowrap",
                      isFirst && "text-[#34432E] font-semibold"
                    )}
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 text-[#34432E]" />}
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
    );
  }

  // 2. Standalone Card Variant (Preserved for backwards compatibility)
  return (
    <>
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
        <div className="flex items-center">
          <nav aria-label="مسار التنقل" className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
              {breadcrumbs.map((crumb, index) => {
                const isFirst = index === 0;
                const isLast = index === breadcrumbs.length - 1;
                const Icon = crumb.icon;

                return (
                  <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2">
                    {!isFirst && (
                      <ChevronLeft
                        className="w-3.5 h-3.5 text-[#A5B3A1] shrink-0"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                    )}

                    {isLast ? (
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
        </div>
      </section>
    </>
  );
}
