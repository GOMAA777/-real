"use client";

import { useEffect } from "react";

let activeLockCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock || typeof document === "undefined") return;

    if (activeLockCount === 0) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      // Prevent content shift when scrollbar disappears
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = "hidden";
    }

    activeLockCount++;

    return () => {
      activeLockCount--;
      if (activeLockCount <= 0) {
        activeLockCount = 0;
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [lock]);
}
