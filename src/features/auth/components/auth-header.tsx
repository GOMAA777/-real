import Link from "next/link";
import { Globe, HelpCircle } from "lucide-react";

export function AuthHeader() {
  return (
    <header className="w-full flex items-center justify-between pb-8 pt-2">
      {/* Portal Indicator */}
      <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#2C3829]">
        <span className="w-2 h-2 rounded-full bg-[#374732] inline-block animate-pulse" />
        <span>بوابة إدارة العقارات</span>
      </div>

      {/* Language & Support Actions */}
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* 1. English Switcher Pill (Right in RTL) */}
        <button
          type="button"
          dir="ltr"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[#E5EAE0] hover:bg-[#DCE1D7] text-xs font-semibold text-[#181D17] transition-colors cursor-pointer select-none"
        >
          <span>English</span>
          <Globe className="w-4 h-4 text-[#181D17]" />
        </button>

        {/* 2. Technical Support Link (Left in RTL) */}
        <Link
          href="#"
          dir="ltr"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181D17] hover:text-[#34432E] transition-colors"
        >
          <span>الدعم الفني</span>
          <HelpCircle className="w-4 h-4 text-[#181D17]" />
        </Link>
      </div>
    </header>
  );
}
