"use client";

import { useEffect } from "react";
import {
  useNavigationTrail,
  type TrailItem,
} from "@/contexts/navigation-trail-context";

export { useNavigationTrail, type TrailItem };

/**
 * Convenient hook for page components to register a dynamic title (e.g. Property name, Guest name)
 * into the navigation breadcrumb trail.
 */
export function useSetBreadcrumbTitle(title: string, badge?: string) {
  const { updateCurrentTitle } = useNavigationTrail();

  useEffect(() => {
    if (title) {
      updateCurrentTitle(title, badge);
    }
  }, [title, badge, updateCurrentTitle]);
}
