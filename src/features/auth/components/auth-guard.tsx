"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isUserAuthenticated } from "@/lib/auth-session";
import { Building } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticated = isUserAuthenticated();
    if (!authenticated) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#EFF3EA] p-6 text-[#172115] select-none">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#344230] border border-[#273323] flex items-center justify-center shadow-md animate-pulse">
              <Building className="w-8 h-8 text-white/90" />
            </div>
            <div className="absolute -inset-2 rounded-3xl border-2 border-[#344230]/20 border-t-[#344230] animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#172115]">ابراج</h2>
            <p className="text-xs text-[#616E5D] font-medium animate-pulse">
              جاري التحقق من صلاحيات الدخول...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
