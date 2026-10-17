"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft, Building } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring if configured
    console.error("Application error:", error);
  }, [error]);

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
      </header>

      {/* Main Error Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-lg p-8 sm:p-12 rounded-3xl bg-white/80 border border-[#E0E4D8] backdrop-blur-xs shadow-xs text-center space-y-6">
          {/* Warning Icon Emblem */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#F4F6F0] border border-[#E0E4D8] text-[#344230]">
            <AlertTriangle className="w-10 h-10 text-[#344230]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed max-w-md mx-auto">
              نعتذر عن حدوث هذا الخطأ غير المتوقع أثناء معالجة طلبك. يمكنك محاولة
              إعادة التحميل أو الرجوع إلى الصفحة الرئيسية.
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-[#8C9886] pt-1">
                رمز الخطأ: {error.digest}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-[#344230] hover:bg-[#283424] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة المحاولة</span>
            </button>

            <Link
              href="/login"
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white hover:bg-[#F4F6F0] border border-[#E0E4D8] text-[#273323] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>العودة لتسجيل الدخول</span>
              <ArrowLeft className="w-4 h-4" />
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
