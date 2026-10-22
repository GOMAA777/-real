"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  resolveRouteTitle,
  generateFallbackTrail,
  type FallbackTrailItem,
} from "@/lib/route-titles";

export interface TrailItem {
  title: string;
  href: string;
  badge?: string;
}

interface NavigationTrailContextType {
  trail: TrailItem[];
  resetTrail: (item: TrailItem) => void;
  pushTrail: (item: TrailItem) => void;
  updateCurrentTitle: (title: string, badge?: string) => void;
  setTrail: (items: TrailItem[]) => void;
}

const STORAGE_KEY = "__abraj_nav_trail__";

const NavigationTrailContext = createContext<NavigationTrailContextType | null>(
  null
);

export function NavigationTrailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  // Initialize from sessionStorage or hierarchical fallback
  const [trail, setTrailState] = useState<TrailItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error("Failed to load navigation trail from sessionStorage", e);
      }
    }
    return generateFallbackTrail(pathname || "/dashboard");
  });

  // Save to sessionStorage whenever trail changes
  const saveTrail = useCallback((newTrail: TrailItem[]) => {
    setTrailState(newTrail);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newTrail));
      } catch (e) {
        console.error("Failed to save navigation trail to sessionStorage", e);
      }
    }
  }, []);

  // Reset trail starting from a single root item (used on sidebar click)
  const resetTrail = useCallback(
    (item: TrailItem) => {
      const newTrail = [item];
      saveTrail(newTrail);
    },
    [saveTrail]
  );

  // Explicit push or truncate
  const pushTrail = useCallback(
    (item: TrailItem) => {
      setTrailState((prev) => {
        const cleanTarget = item.href.split("?")[0].replace(/\/+$/, "");
        const existingIndex = prev.findIndex(
          (t) => t.href.split("?")[0].replace(/\/+$/, "") === cleanTarget
        );

        let nextTrail: TrailItem[];
        if (existingIndex !== -1) {
          // Truncate trail at existing item
          nextTrail = prev.slice(0, existingIndex + 1);
          // Update title/badge if provided
          nextTrail[existingIndex] = {
            ...nextTrail[existingIndex],
            title: item.title || nextTrail[existingIndex].title,
            badge: item.badge ?? nextTrail[existingIndex].badge,
            href: item.href,
          };
        } else {
          nextTrail = [...prev, item];
        }

        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextTrail));
          } catch (e) {
            console.error("Failed to save trail", e);
          }
        }
        return nextTrail;
      });
    },
    []
  );

  // Update title of the current page in the trail
  const updateCurrentTitle = useCallback(
    (title: string, badge?: string) => {
      setTrailState((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        const lastIdx = next.length - 1;
        next[lastIdx] = {
          ...next[lastIdx],
          title,
          badge: badge !== undefined ? badge : next[lastIdx].badge,
        };
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch (e) {
            console.error("Failed to save trail", e);
          }
        }
        return next;
      });
    },
    []
  );

  // Synchronize on route changes
  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString();
    const currentHref = queryString ? `${pathname}?${queryString}` : pathname;
    const cleanCurrentPath = pathname.replace(/\/+$/, "");

    // If initial load and trail is empty or doesn't match current, generate fallback
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // Check if current page is in loaded trail
      const existsInLoaded = trail.some(
        (item) => item.href.split("?")[0].replace(/\/+$/, "") === cleanCurrentPath
      );

      if (!existsInLoaded) {
        const fallback = generateFallbackTrail(pathname);
        saveTrail(fallback);
      }
      return;
    }

    setTrailState((prev) => {
      // Find if current path is already in trail
      const existingIndex = prev.findIndex(
        (item) =>
          item.href.split("?")[0].replace(/\/+$/, "") === cleanCurrentPath
      );

      let nextTrail: TrailItem[];
      if (existingIndex !== -1) {
        // Truncate back to this item
        nextTrail = prev.slice(0, existingIndex + 1);
        // Ensure href has latest search params
        nextTrail[existingIndex] = {
          ...nextTrail[existingIndex],
          href: currentHref,
        };
      } else {
        // Append new page
        const { title, badge } = resolveRouteTitle(pathname);
        nextTrail = [
          ...prev,
          {
            title,
            href: currentHref,
            badge,
          },
        ];
      }

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextTrail));
        } catch (e) {
          console.error("Failed to save navigation trail", e);
        }
      }
      return nextTrail;
    });
  }, [pathname, searchParams, saveTrail]);

  return (
    <NavigationTrailContext.Provider
      value={{
        trail,
        resetTrail,
        pushTrail,
        updateCurrentTitle,
        setTrail: saveTrail,
      }}
    >
      {children}
    </NavigationTrailContext.Provider>
  );
}

export function useNavigationTrail() {
  const context = useContext(NavigationTrailContext);
  if (!context) {
    throw new Error(
      "useNavigationTrail must be used within a NavigationTrailProvider"
    );
  }
  return context;
}
