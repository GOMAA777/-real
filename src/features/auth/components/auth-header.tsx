import Link from "next/link";
import { Globe, Headphones } from "lucide-react";

export function AuthHeader() {
  return (
    <header className="w-full flex items-center justify-between pb-8 pt-2">
      {/* Portal Indicator */}
      <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#2C3829]">
        <span className="w-2 h-2 rounded-full bg-[#374732] inline-block animate-pulse" />
        <span>بوابة إدارة العقارات</span>
      </div>

      {/* Language & Support Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#E2E6DC] text-xs font-medium text-[#2C3829] hover:bg-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#5A6853]" />
          <span>English</span>
        </button>

        <Link
          href="#"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A6853] hover:text-[#2C3829] transition-colors"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>الدعم الفني</span>
        </Link>
      </div>
    </header>
  );
}
