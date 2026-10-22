"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  ArrowLeft,
  Copy,
  Check,
  X,
  MoreHorizontal,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
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
    const isLongTrail = breadcrumbs.length > 3;
    const firstCrumb = breadcrumbs[0];
    const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
    const middleCrumbs = isLongTrail ? breadcrumbs.slice(1, breadcrumbs.length - 1) : [];

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
          {!isLongTrail ? (
            /* Normal trail (3 or fewer items) - show all in full */
            breadcrumbs.map((crumb, index) => {
              const isFirst = index === 0;
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li
                  key={`${crumb.href}-${index}`}
                  className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0"
                >
                  {!isFirst && (
                    <ChevronLeft
                      className="w-3.5 h-3.5 text-[#9BA896] shrink-0"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  )}

                  {isLast ? (
                    <ActiveLeafCrumb crumb={crumb} isFirst={isFirst} />
                  ) : (
                    <LinkCrumb crumb={crumb} isFirst={isFirst} />
                  )}
                </li>
              );
            })
          ) : (
            /* Long trail (> 3 items) - collapse middle items into dots */
            <>
              {/* 1. First Root Crumb */}
              <li className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
                <LinkCrumb crumb={firstCrumb} isFirst={true} />
              </li>

              {/* Separator */}
              <li aria-hidden="true" className="shrink-0">
                <ChevronLeft
                  className="w-3.5 h-3.5 text-[#9BA896]"
                  strokeWidth={2.2}
                />
              </li>

              {/* 2. Middle Items: Individual Dots on Desktop (pop > .. > .. > ld) */}
              <li className="hidden md:inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
                {middleCrumbs.map((crumb, idx) => {
                  const actualIndex = idx + 1;
                  return (
                    <div
                      key={`${crumb.href}-${actualIndex}`}
                      className="inline-flex items-center gap-1 sm:gap-1.5"
                    >
                      {idx > 0 && (
                        <ChevronLeft
                          className="w-3.5 h-3.5 text-[#9BA896] shrink-0"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      )}
                      <BreadcrumbDotItem
                        crumb={crumb}
                        index={actualIndex}
                        total={breadcrumbs.length}
                        allCrumbs={breadcrumbs}
                      />
                    </div>
                  );
                })}
              </li>

              {/* 2b. Middle Items: Consolidated dots pill on Mobile / Tablet (< md) */}
              <li className="inline-flex md:hidden items-center shrink-0">
                <BreadcrumbGroupDots
                  items={middleCrumbs}
                  startIndex={1}
                  total={breadcrumbs.length}
                />
              </li>

              {/* Separator */}
              <li aria-hidden="true" className="shrink-0">
                <ChevronLeft
                  className="w-3.5 h-3.5 text-[#9BA896]"
                  strokeWidth={2.2}
                />
              </li>

              {/* 3. Last Active Leaf Crumb */}
              <li className="inline-flex items-center shrink-0">
                <ActiveLeafCrumb crumb={lastCrumb} isFirst={false} />
              </li>
            </>
          )}
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

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normal Link Crumb Item
 */
function LinkCrumb({ crumb, isFirst }: { crumb: TrailItem; isFirst: boolean }) {
  return (
    <Link
      href={crumb.href || "/dashboard"}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-[#54624C] hover:text-[#181D17] hover:bg-[#F1F5EB] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#34422E]/30 whitespace-nowrap cursor-pointer",
        isFirst && "text-[#34422E] font-semibold"
      )}
    >
      {isFirst && crumb.title === "الرئيسية" && (
        <Home className="w-3.5 h-3.5 text-[#34432E]" />
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
  );
}

/**
 * Active Leaf Crumb Item (Last Page)
 */
function ActiveLeafCrumb({ crumb, isFirst }: { crumb: TrailItem; isFirst: boolean }) {
  return (
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
  );
}

/**
 * Individual Collapsed Dot Button ("••") with Hover Tooltip & Click Popover
 * Directly fulfills "pop > .. > .. > ld"
 */
function BreadcrumbDotItem({
  crumb,
  index,
  total,
  allCrumbs,
}: {
  crumb: TrailItem;
  index: number;
  total: number;
  allCrumbs: TrailItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAllTrail, setShowAllTrail] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const width = 300;
    // Align centered beneath the dot trigger, clamped to viewport margins
    let left = rect.left + rect.width / 2 - width / 2;
    if (left + width > window.innerWidth - 12) {
      left = window.innerWidth - width - 12;
    }
    if (left < 12) {
      left = 12;
    }
    setCoords({
      top: rect.bottom + 8,
      left,
    });
  }, []);

  // Handle outside click when pinned/open
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setIsHovered(false);
        setShowAllTrail(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsHovered(false);
        setShowAllTrail(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    updatePosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isOpen) {
        setIsHovered(false);
      }
    }, 180);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsOpen((prev) => !prev);
    setIsHovered(true);
  };

  const handleCopy = () => {
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${crumb.href}` : crumb.href;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("تم نسخ رابط الصفحة إلى الحافظة بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  const isVisible = isMounted && (isOpen || isHovered);

  return (
    <div className="relative inline-flex items-center">
      {/* Sleek Dot Pill Button "••" */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "h-6.5 min-w-[28px] px-1.5 rounded-[8px] text-[11px] font-bold transition-all duration-150 select-none flex items-center justify-center gap-0.5 cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#34422A]/30",
          isOpen || isHovered
            ? "bg-[#34422A] text-white shadow-xs scale-105 border border-[#34422A]"
            : "bg-[#F1F5EB] hover:bg-[#E4EBDC] text-[#54624C] hover:text-[#181D17] border border-[#DCE2D7] hover:border-[#CCDBC4]"
        )}
        title={crumb.title}
        aria-label={`مسار التنقل، المحطة ${index + 1}: ${crumb.title}`}
        aria-expanded={isVisible}
      >
        <span className="tracking-widest font-mono text-[12px] leading-none select-none px-0.5">
          ••
        </span>
      </button>

      {/* Floating Tooltip / Popover via Portal */}
      {isVisible &&
        createPortal(
          <div
            ref={popoverRef}
            style={{ top: coords.top, left: coords.left }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed z-[9999] w-[290px] sm:w-[320px] bg-white rounded-[16px] border border-[#CCDBC4] shadow-xl p-3.5 text-start font-cairo animate-in fade-in zoom-in-95 duration-150 select-none text-[#181D17]"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#EEF2E6]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#EEF2E6] text-[#34422A] flex items-center justify-center shrink-0">
                  <Navigation className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-[#55694D]">
                  المحطة {index + 1} من {total} في المسار
                </span>
              </div>
              {isOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsHovered(false);
                    setShowAllTrail(false);
                  }}
                  className="w-5 h-5 rounded-md hover:bg-[#F1F5EB] text-[#78716C] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[10px] text-[#8C9886] font-medium">معاينة بالهوفر</span>
              )}
            </div>

            {/* Page Title & Details */}
            <div className="py-2.5 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-[13.5px] font-bold text-[#181D17] leading-snug">
                  {crumb.title}
                </h4>
                {crumb.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-[#EEF2E6] text-[10.5px] font-mono font-bold text-[#34422A] border border-[#CCDBC4]">
                    {crumb.badge}
                  </span>
                )}
              </div>
              {crumb.href && (
                <p className="text-[10.5px] text-[#78716C] truncate font-mono text-left" dir="ltr">
                  {crumb.href}
                </p>
              )}
            </div>

            {/* If user toggled viewing the full trail list */}
            {showAllTrail ? (
              <div className="py-2 border-t border-[#EEF2E6] space-y-1 max-h-[160px] overflow-y-auto">
                <div className="text-[10.5px] font-bold text-[#78716C] mb-1">
                  المسار الكامل حتى الآن:
                </div>
                {allCrumbs.map((c, i) => {
                  const isCurrentStop = i === index;
                  return (
                    <Link
                      key={`${c.href}-${i}`}
                      href={c.href || "/dashboard"}
                      onClick={() => {
                        setIsOpen(false);
                        setIsHovered(false);
                      }}
                      className={cn(
                        "flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors",
                        isCurrentStop
                          ? "bg-[#EEF2E6] font-bold text-[#34422A]"
                          : "hover:bg-[#F1F5EB] text-[#55694D]"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-4 h-4 rounded-full bg-white text-[9.5px] font-mono flex items-center justify-center border border-[#CCDBC4] shrink-0">
                          {i + 1}
                        </span>
                        <span className="truncate">{c.title}</span>
                      </div>
                      <ArrowLeft className="w-3 h-3 text-[#78716C] shrink-0" />
                    </Link>
                  );
                })}
              </div>
            ) : null}

            {/* Actions */}
            <div className="pt-2.5 border-t border-[#EEF2E6] flex items-center justify-between gap-2">
              <Link
                href={crumb.href || "/dashboard"}
                onClick={() => {
                  setIsOpen(false);
                  setIsHovered(false);
                }}
                className="flex-1 h-8 px-3 rounded-[10px] bg-[#34422A] hover:bg-[#283420] text-white text-[11.5px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>الانتقال للصفحة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleCopy}
                className="h-8 px-2.5 rounded-[10px] bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#34422A] text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                title="نسخ الرابط"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2A6B3A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "تم النسخ" : "نسخ"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAllTrail((p) => !p)}
                className="h-8 px-2 rounded-[10px] bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#55694D] text-[10.5px] font-medium transition-colors cursor-pointer"
                title="استعراض كافة المحطات"
              >
                {showAllTrail ? "إخفاء" : "الكل"}
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/**
 * Consolidated Ellipsis Pill Button (e.g. on Mobile or for 4+ middle items)
 */
function BreadcrumbGroupDots({
  items,
  startIndex,
  total,
}: {
  items: TrailItem[];
  startIndex: number;
  total: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const width = 310;
    let left = rect.left + rect.width / 2 - width / 2;
    if (left + width > window.innerWidth - 12) {
      left = window.innerWidth - width - 12;
    }
    if (left < 12) {
      left = 12;
    }
    setCoords({
      top: rect.bottom + 8,
      left,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    updatePosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isOpen) {
        setIsHovered(false);
      }
    }, 180);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsOpen((prev) => !prev);
    setIsHovered(true);
  };

  const isVisible = isMounted && (isOpen || isHovered);

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "h-6.5 px-2 rounded-[8px] text-xs font-bold transition-all duration-150 select-none flex items-center justify-center gap-1 cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#34422A]/30",
          isOpen || isHovered
            ? "bg-[#34422A] text-white shadow-xs scale-105 border border-[#34422A]"
            : "bg-[#F1F5EB] hover:bg-[#E4EBDC] text-[#54624C] hover:text-[#181D17] border border-[#DCE2D7] hover:border-[#CCDBC4]"
        )}
        aria-label={`المسار الأوسط المقتطع، ${items.length} صفحات`}
        aria-expanded={isVisible}
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono font-bold px-1 py-0.5 rounded bg-black/10">
          +{items.length}
        </span>
      </button>

      {isVisible &&
        createPortal(
          <div
            ref={popoverRef}
            style={{ top: coords.top, left: coords.left }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed z-[9999] w-[300px] sm:w-[330px] max-h-[380px] overflow-hidden flex flex-col bg-white rounded-[18px] border border-[#CCDBC4] shadow-xl text-start font-cairo animate-in fade-in zoom-in-95 duration-150 select-none"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-3.5 pb-2.5 border-b border-[#EEF2E6] flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-bold text-[#181D17]">
                  المسار الأوسط ({items.length} محطات)
                </h4>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  انقر على أي صفحة للانتقال إليها
                </p>
              </div>
              {isOpen && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsHovered(false);
                  }}
                  className="w-6 h-6 rounded-md hover:bg-[#F1F5EB] text-[#78716C] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* List */}
            <div className="p-2 space-y-1 overflow-y-auto max-h-[260px]">
              {items.map((item, idx) => (
                <Link
                  key={`${item.href}-${idx}`}
                  href={item.href || "/dashboard"}
                  onClick={() => {
                    setIsOpen(false);
                    setIsHovered(false);
                  }}
                  className="flex items-center justify-between p-2 rounded-[12px] hover:bg-[#F1F5EB] text-[#181D17] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#EEF2E6] group-hover:bg-[#34422A] group-hover:text-white text-[10px] font-mono font-bold text-[#34422A] flex items-center justify-center shrink-0 transition-colors">
                      {startIndex + idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-[#181D17] truncate">
                        {item.title}
                      </div>
                      {item.badge && (
                        <span className="text-[10px] text-[#55694D] font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#8A9584] group-hover:text-[#181D17] group-hover:-translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
