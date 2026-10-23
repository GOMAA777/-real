"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or searchParams change, navigation finished
  useEffect(() => {
    if (visible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // 1. Capture click on any internal navigation link for instant feedback
    const handleClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey
      ) {
        return;
      }

      const target = (e.target as Element)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.getAttribute("target") === "_blank"
      ) {
        return;
      }

      const currentPath = window.location.pathname + window.location.search;
      let targetPath = href;
      try {
        const url = new URL(target.href, window.location.href);
        targetPath = url.pathname + url.search;
      } catch {
        // fallback
      }

      // If clicking the current exact page, don't trigger loader
      if (targetPath === currentPath) return;

      // Start the progress animation instantly (0ms latency)
      setVisible(true);
      setProgress(25);

      const t1 = setTimeout(() => {
        setProgress((prev) => (prev < 65 ? 65 : prev));
      }, 100);

      const t2 = setTimeout(() => {
        setProgress((prev) => (prev < 85 ? 85 : prev));
      }, 350);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    // 2. Pre-fetch on hover aggressively to make actual clicks instant
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (
        href &&
        (href.startsWith("/") || href.startsWith("./")) &&
        !href.startsWith("#") &&
        target.getAttribute("target") !== "_blank"
      ) {
        try {
          router.prefetch(href);
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [router]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#4B5940] via-[#8FA87F] to-[#C9B99A] shadow-[0_0_10px_rgba(75,89,64,0.7)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
