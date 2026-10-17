import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="w-full pt-8 pb-4 text-xs text-[#7B8775] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8ECE2]">
      <div className="order-2 sm:order-1 text-center sm:text-start">
        © 2026 رواق للتقنية العقارية. جميع الحقوق محفوظة.
      </div>

      <div className="order-1 sm:order-2 flex items-center gap-3 text-xs">
        <Link href="#" className="hover:text-[#2C3829] transition-colors">
          سياسة الخصوصية
        </Link>
        <span className="text-[#B5BFB0]">•</span>
        <Link href="#" className="hover:text-[#2C3829] transition-colors">
          شروط الخدمة
        </Link>
        <span className="text-[#B5BFB0]">•</span>
        <Link href="#" className="hover:text-[#2C3829] transition-colors">
          التراخيص
        </Link>
      </div>
    </footer>
  );
}
