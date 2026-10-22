"use client";

import React, { Suspense } from "react";
import { NavigationTrailProvider } from "@/contexts/navigation-trail-context";
import { ConfirmProvider } from "@/contexts/confirm-dialog-context";

export function DashboardProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <NavigationTrailProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </NavigationTrailProvider>
    </Suspense>
  );
}
