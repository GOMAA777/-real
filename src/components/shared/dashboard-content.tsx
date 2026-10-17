"use client";

import { useUIStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div
      className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        sidebarOpen ? "lg:ms-64" : "lg:ms-0"
      )}
    >
      {children}
    </div>
  );
}
