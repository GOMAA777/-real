"use client";

import React, { useEffect, useRef, useState } from "react";
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
  dockedClassName,
  floatingClassName,
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
  useEffect(() => {
    const checkDocked = () => {
      if (!sentinelRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // When the bottom of the sentinel is at or above the viewport bottom (with 12px tolerance)
      const atBottom = rect.bottom <= windowHeight + 12;
      setIsDocked(atBottom);
    };

    checkDocked();
    window.addEventListener("scroll", checkDocked, { passive: true });
    window.addEventListener("resize", checkDocked, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkDocked);
      window.removeEventListener("resize", checkDocked);
    };
  }, []);

  return (
    <div ref={sentinelRef} className="w-full relative">
      {/* Spacer that preserves document height when bar is floating */}
      <div
        aria-hidden="true"
        className={cn(
          "w-full pointer-events-none transition-none",
          isDocked ? "hidden" : "block"
        )}
        style={{ height: barHeight }}
      />

      {/* The Bottom Bar - stays mounted to preserve form state and event listeners */}
      <div
        ref={contentRef}
        className={cn(
          "transition-all duration-300 ease-in-out",
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
