"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUIStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

interface DockingBottomBarProps {
  children: React.ReactNode;
  /**
   * Classes applied to the bar container when it is docked in place at the bottom of the content
   */
  dockedClassName?: string;
  /**
   * Classes applied to the bar container when it is floating fixed at the bottom of the viewport
   */
  floatingClassName?: string;
  /**
   * Classes applied to the inner wrapper (e.g. max-w-[1536px] mx-auto)
   */
  innerClassName?: string;
}

export function DockingBottomBar({
  children,
  dockedClassName = "mt-8 mb-6",
  floatingClassName = "p-3 sm:p-4",
  innerClassName,
}: DockingBottomBarProps) {
  const { sidebarOpen } = useUIStore();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isDocked, setIsDocked] = useState(false);
  const [barHeight, setBarHeight] = useState(80);

  // Measure content height dynamically with ResizeObserver
  useEffect(() => {
    if (!contentRef.current) return;
    const updateHeight = () => {
      if (contentRef.current) {
        const h = contentRef.current.offsetHeight;
        if (h > 0) setBarHeight(h);
      }
    };
    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  // Monitor scroll position to toggle between floating and docked state
  // Using a stable threshold that doesn't jitter when the bar state toggles
  const checkDocked = useCallback(() => {
    if (!sentinelRef.current) return;
    const rect = sentinelRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // When the sentinel (positioned above the spacer/bar) reaches or passes the viewport bottom threshold
    const threshold = windowHeight - barHeight - 24;
    setIsDocked(rect.top <= threshold);
  }, [barHeight]);

  useEffect(() => {
    checkDocked();
    window.addEventListener("scroll", checkDocked, { passive: true });
    window.addEventListener("resize", checkDocked, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkDocked);
      window.removeEventListener("resize", checkDocked);
    };
  }, [checkDocked]);

  return (
    <div className="w-full relative">
      {/* 1. Sentinel element: sits strictly above the spacer/bar, unaffected by bar docking */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="w-full h-px pointer-events-none -mt-2 opacity-0"
      />

      {/* 2. Generous spacer when floating to guarantee content can be scrolled fully above the bar */}
      <div
        aria-hidden="true"
        className={cn(
          "w-full pointer-events-none transition-none",
          isDocked ? "hidden" : "block"
        )}
        style={{ height: Math.max(barHeight + 48, 140) }}
      />

      {/* 3. The Bottom Bar */}
      <div
        ref={contentRef}
        className={cn(
          "transition-all duration-200 ease-out",
          isDocked
            ? cn("relative w-full", dockedClassName)
            : cn(
                "fixed bottom-0 end-0 z-40",
                sidebarOpen ? "lg:start-64" : "lg:start-[72px]",
                "start-0",
                floatingClassName
              )
        )}
      >
        <div className={innerClassName}>{children}</div>
      </div>
    </div>
  );
}
