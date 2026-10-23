import Image from "next/image";
import {
  CalendarCheck,
  DoorClosed,
  Landmark,
  Lock,
} from "lucide-react";

export function AuthShowcase() {
  return (
    <section className="relative w-full h-full min-h-screen bg-[#384832] text-white p-8 lg:p-14 flex flex-col justify-between overflow-hidden select-none">
      {/* Decorative Architectural Arch Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 800"
          className="w-full h-full max-h-[850px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Outer Arches */}
          <path d="M 100 800 V 350 A 200 200 0 0 1 500 350 V 800" />
          <path d="M 140 800 V 350 A 160 160 0 0 1 460 350 V 800" />
          <path d="M 180 800 V 350 A 120 120 0 0 1 420 350 V 800" />
          {/* Inner details */}
          <circle cx="300" cy="350" r="60" />
          <circle cx="300" cy="350" r="30" />
          <line x1="300" y1="150" x2="300" y2="800" />
          <line x1="100" y1="350" x2="500" y2="350" />
        </svg>
      </div>

      {/* Top Header & Brand */}
      <div className="relative z-10 flex flex-col items-start gap-8">
        {/* Brand Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2D3B28] border border-white/15 flex items-center justify-center p-2.5 shadow-inner">
            <Image
              src="/logo.png"
              alt="ابراج"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">ابراج</h2>
            <p className="text-xs text-white/70 font-light">
              المنصة المؤسسية لإدارة وتشغيل الأصول العقارية
            </p>
          </div>
        </div>

        {/* Badge & Big Headline */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.12] text-xs font-medium text-[#D8E5D3] select-none">
            <span className="w-2 h-2 rounded-full bg-[#D2E3CC] shrink-0" />
            <span>الجيل الجديد لإدارة الاملاك</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.35] text-white">
            المنظومة المتكاملة لإدارة الأصول والوحدات الفندقية والسكنية بالمملكة
          </h1>

          <p className="text-sm text-white/75 leading-relaxed font-light">
            تمكّن ملاك العقارات، الصناديق الاستثمارية، ومديري الضيافة من أتمتة
            الإشغال، التحصيل، وتكامل الأنظمة التشغيلية عبر تجربة ذكية موحدة
            وموثوقة.
          </p>
        </div>

        {/* 3 Translucent Feature Cards */}
        <div className="w-full space-y-3.5 pt-2">
          {/* Card 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.08] transition-colors border border-white/10 backdrop-blur-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5 text-white/90" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">
                ربط مباشر مع منصات الحجز والتقويم الذكي
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                مزامنة فورية للأسعار، التوافر، وسجلات النزلاء لمنع الازدواجية
                البرمجية.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.08] transition-colors border border-white/10 backdrop-blur-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <DoorClosed className="w-5 h-5 text-white/90" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">
                إدارة تشغيلية وأقفال ذكية بدون تدخل يدوي
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                توليد رموز الدخول الذاتية للوحدات وجدولة فرق النظافة والصيانة
                آلياً.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.08] transition-colors border border-white/10 backdrop-blur-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-white/90" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">
                تقارير مالية وتوافق تشغيلي معتمد
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                امتثال شامل للفوترة الإلكترونية وأنظمة الضرائب والتقارير
                الاستثمارية الربعية.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust & Compliance Row */}
      <div className="relative z-10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
              fill="#D8E8C7"
            />
            <path
              d="m16 9-5.5 5.5L8 12"
              stroke="#34422A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="text-xs text-[#B3C3A4] font-medium leading-tight select-none">
            <div>معتمد ومتوافق مع معايير الهيئة العامة</div>
            <div>للعقار</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/70">
          <Lock className="w-3.5 h-3.5 text-white/70" />
          <span>تشفير آمن للبيانات 256-bit</span>
        </div>
      </div>
    </section>
  );
}
