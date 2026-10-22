"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigationTrail, type TrailItem } from "@/hooks/use-navigation-trail";

export interface BreadcrumbProps {
  items?: TrailItem[];
  className?: string;
  variant?: "navbar" | "card";
}

export function Breadcrumb({
  items: customItems,
  className,
  variant = "navbar",
}: BreadcrumbProps) {
  const { trail } = useNavigationTrail();
  const breadcrumbs = customItems && customItems.length > 0 ? customItems : trail;

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  // Schema.org BreadcrumbList for rich results
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.title,
      item: crumb.href ? `https://abraj.sa${crumb.href}` : undefined,
    })),
  };

  // 1. Navbar Variant (Rendered in Topbar)
  if (variant === "navbar") {
    return (
      <nav
        aria-label="مسار التنقل الفعلي"
        className={cn("flex items-center min-w-0 select-none", className)}
        dir="rtl"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <ol className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar text-xs">
          {breadcrumbs.map((crumb, index) => {
            const isFirst = index === 0;
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li
                key={`${crumb.href}-${index}`}
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
                  /* Active current leaf */
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-3xs",
                      "bg-[#EEF2E6] text-[#181D17] border border-[#CCDBC4]"
                    )}
                    aria-current="page"
                  >
                    {isFirst && crumb.title === "الرئيسية" && (
                      <Home className="w-3.5 h-3.5 text-[#34432E]" />
                    )}
                    <span className="truncate max-w-[130px] sm:max-w-[200px] md:max-w-[260px]">
                      {crumb.title}
                    </span>
                    {!isFirst && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34422A] shrink-0" />
                    )}
                    {crumb.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-bold text-[#34422A] border border-[#CBD7C3]">
                        {crumb.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  /* Clickable ancestor link */
                  <Link
                    href={crumb.href || "/dashboard"}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-[#54624C] hover:text-[#181D17] hover:bg-[#F1F5EB] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#34422E]/30 whitespace-nowrap cursor-pointer",
                      isFirst && "text-[#34422E] font-semibold"
                    )}
                  >
                    {isFirst && crumb.title === "الرئيسية" && (
                      <Home className="w-3.5 h-3.5 text-[#34422E]" />
                    )}
                    <span className={cn(isFirst && crumb.title === "الرئيسية" && "hidden sm:inline")}>
                      {crumb.title}
                    </span>
                    {crumb.badge && (
                      <span className="px-1.5 py-0.5 rounded bg-[#E5EAE0] text-[10px] font-mono text-[#54624C]">
                        {crumb.badge}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // 2. Card Variant
  return (
    <nav
      aria-label="مسار التنقل الفعلي"
      className={cn(
        "bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E6DC] shadow-2xs select-none",
        className
      )}
      dir="rtl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <ol className="flex items-center gap-2 flex-wrap text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={`${crumb.href}-${index}`}
              className="inline-flex items-center gap-2"
            >
              {!isFirst && (
                <ChevronLeft
                  className="w-4 h-4 text-[#9BA896] shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className="font-bold text-[#181D17] bg-[#EEF2E6] px-3 py-1.5 rounded-xl border border-[#CCDBC4] inline-flex items-center gap-1.5"
                  aria-current="page"
                >
                  <span>{crumb.title}</span>
                  {crumb.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-white text-xs font-mono font-bold text-[#34422A] border border-[#CBD7C3]">
                      {crumb.badge}
                    </span>
                  )}
                </span>
              ) : (
                <Link
                  href={crumb.href || "/dashboard"}
                  className="text-[#54624C] hover:text-[#181D17] hover:underline font-medium transition-colors"
                >
                  {crumb.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
