"use client";

import React, { Suspense } from "react";
import { NavigationTrailProvider } from "@/contexts/navigation-trail-context";
import { ConfirmProvider } from "@/contexts/confirm-dialog-context";
import { TopProgressBar } from "@/components/shared/top-progress-bar";

export function DashboardProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <TopProgressBar />
      <NavigationTrailProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </NavigationTrailProvider>
    </Suspense>
  );
}

