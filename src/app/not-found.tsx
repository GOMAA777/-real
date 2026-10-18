import Link from "next/link";
import { Building, ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#F4F6F0] p-6 sm:p-12 text-[#172115]">
      {/* Top Header */}
      <header className="w-full flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#344230] border border-[#273323] flex items-center justify-center">
            <Building className="w-5 h-5 text-white/90" />
          </div>
          <div>
            <span className="text-lg font-bold text-[#172115]">ابراج</span>
            <span className="hidden sm:inline-block ms-2 text-xs text-[#616E5D]">
              | إدارة وتشغيل الأصول العقارية
            </span>
          </div>
        </div>

        <Link
          href="#"
          dir="ltr"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181D17] hover:text-[#34432E] transition-colors"
        >
          <span>الدعم الفني</span>
          <HelpCircle className="w-4 h-4 text-[#181D17]" />
        </Link>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-lg p-8 sm:p-12 rounded-3xl bg-white/80 border border-[#E0E4D8] backdrop-blur-xs shadow-xs text-center space-y-6">
          {/* 404 Number Badge */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#F4F6F0] border border-[#E0E4D8] text-[#344230] text-4xl font-extrabold tracking-tight">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
              الصفحة غير موجودة
            </h1>
            <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed max-w-md mx-auto">
              عذراً، لم نتمكن من العثور على الصفحة التي طلبتها. قد تكون الصفحة قد
              نُقلت أو حُذفت، أو تم إدخال الرابط بصورة غير صحيحة.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#344230] hover:bg-[#283424] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
            >
              <span>العودة إلى تسجيل الدخول</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white hover:bg-[#F4F6F0] border border-[#E0E4D8] text-[#273323] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>إنشاء حساب جديد</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-[#7B8775] max-w-5xl mx-auto">
        © 2026 رواق للتقنية العقارية. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
