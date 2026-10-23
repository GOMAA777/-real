"use client";

import Link from "next/link";
import {
  Check,
  Zap,
  Copy,
  CheckSquare,
  User,
  Eye,
  PlusCircle,
  ArrowLeft,
  KeyRound,
  RefreshCw,
  Wallet,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";

interface AddBookingSuccessViewProps {
  bookingCode?: string;
  onReset?: () => void;
}

export function AddBookingSuccessView({
  bookingCode = "BK-10483",
  onReset,
}: AddBookingSuccessViewProps) {
  const copyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    toast.success(`تم نسخ رقم الحجز: ${bookingCode}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300" dir="rtl">
      {/* 1. Top Success Hero (Matching exact user design: rendered seamlessly on page background) */}
      <div className="py-6 sm:py-8 text-center space-y-4">
        {/* Success Icon Circle Badge (Exact match to reference image: double concentric circles + bottom-left white zap badge) */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#E7F0DE] flex items-center justify-center mx-auto">
          {/* Inner concentric soft green circle */}
          <div className="w-[74px] h-[74px] sm:w-[84px] sm:h-[84px] rounded-full bg-[#D8E8CB] flex items-center justify-center">
            <Check className="w-8 h-8 sm:w-9 sm:h-9 text-[#34422A] stroke-[3]" />
          </div>
          {/* Bottom-left overlay white circular badge with outline zap */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center absolute bottom-0.5 left-0.5 text-[#34422A]">
            <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#34422A] stroke-[2.2]" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-[#172115] tracking-tight">
            تم إنشاء الحجز بنجاح
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B57] max-w-xl mx-auto leading-relaxed">
            تم تسجيل وتأكيد الحجز ومزامنة التوافر مع القنوات الخارجية، وتجهيز كود الدخول الذكي وإرسال إشعار التأكيد للعميل والمالك.
          </p>
        </div>

        {/* Booking Reference Pill (Matching exact design order & badge icon) */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-2.5 bg-[#E6EFE2] px-4 py-2 rounded-2xl text-xs select-none">
            <BadgeCheck className="w-4 h-4 text-[#172115] shrink-0" />
            <span className="text-[#5C6B57] font-medium">رقم الحجز:</span>
            <span className="font-bold font-mono text-[#172115] text-sm">{bookingCode}</span>
            <button
              type="button"
              onClick={copyCode}
              title="نسخ رقم الحجز"
              className="text-[#5C6B57] hover:text-[#172115] transition-colors cursor-pointer ms-0.5"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#CCD5C5] mx-1">|</span>
            <span className="bg-[#DCE9D8] text-[#2E7D32] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              مؤكد ومعتمد
            </span>
          </div>
        </div>
      </div>

      {/* 2. Operational Booking Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E6DC] shadow-2xs space-y-6">
        {/* Card Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEF2E6] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFF3EA] text-[#172115] flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#172115]">
                ملخص بيانات الحجز التشغيلي
              </h2>
              <p className="text-xs text-[#7D8A78] mt-0.5">
                المرجع المالي والمكاني المعتمد لنظام الأصول
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#DCE9D8] text-[#2E7D32] text-xs font-bold px-3 py-1.5 rounded-full self-start sm:self-auto select-none">
            <span>مزامنة WhatsApp</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
          </div>
        </div>

        {/* 8 Grid Cells (Matching exact design layout and typography) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Cell 1: مرجع المعاملة */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">مرجع المعاملة</div>
            <div className="font-bold text-base text-[#172115] font-mono">{bookingCode}</div>
            <div className="text-[11px] text-[#717E6E]">إنشاء يدوي عبر الإدارة المركزية</div>
          </div>

          {/* Cell 2: العميل / النزيل */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">العميل / النزيل</div>
            <div className="font-bold text-base text-[#172115] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#717E6E]" />
              <span>خالد العتيبي</span>
            </div>
            <div className="text-[11px] text-[#717E6E] font-mono" dir="ltr">
              +966 50 123 4567
            </div>
          </div>

          {/* Cell 3: العقار الرئيسي */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">العقار الرئيسي</div>
            <div className="font-bold text-base text-[#172115]">عمارة النخيل</div>
            <div className="text-[11px] text-[#717E6E]">الرياض، حي العليا • PR-1048</div>
          </div>

          {/* Cell 4: الوحدة المحجوزة */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">الوحدة المحجوزة</div>
            <div className="font-bold text-base text-[#172115]">وحدة 204 (جناح تنفيذي)</div>
            <div className="text-[11px] text-[#717E6E]">الدور الثاني • إطلالة أمامية</div>
          </div>

          {/* Cell 5: موعد الوصول */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">موعد الوصول</div>
            <div className="font-bold text-base text-[#172115]">18 سبتمبر 2026</div>
            <div className="text-[11px] text-[#717E6E]">تسجيل الوصول: ابتداءً من 03:00 م</div>
          </div>

          {/* Cell 6: موعد المغادرة */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">موعد المغادرة</div>
            <div className="font-bold text-base text-[#172115]">21 سبتمبر 2026</div>
            <div className="text-[11px] text-[#717E6E]">تسجيل الخروج: حتى 12:00 م</div>
          </div>

          {/* Cell 7: مالك العقار والترخيص */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">مالك العقار والترخيص</div>
            <div className="font-bold text-base text-[#172115]">محمد بن سعود العتيبي</div>
            <div className="text-[11px] text-[#717E6E]">رخصة فال: 1200028491</div>
          </div>

          {/* Cell 8: المدة والقيمة الإجمالية */}
          <div className="bg-[#F3F6F0] border border-[#E4EADF] rounded-2xl p-4 sm:p-4.5 space-y-1">
            <div className="text-xs text-[#717E6E] font-medium">المدة والقيمة الإجمالية</div>
            <div className="font-bold text-base text-[#172115]">2,450 ر.س</div>
            <div className="text-[11px] text-[#717E6E]">3 ليال • مدفوع مسبقاً بالكامل</div>
          </div>
        </div>
      </div>

      {/* 3. 3 Operational Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: كود الدخول الذكي */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6F8F4] text-[#2E3C29] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#172115]">
                  كود الدخول الذكي
                </h3>
              </div>
              <span className="bg-[#EAF5EA] text-[#2E7D32] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                جاهز ومبرمج
              </span>
            </div>
            <p className="text-xs text-[#7D8A78] leading-relaxed">
              تم إنشاء كود القفل ومجدول للإرسال التلقائي للنزيل قبل موعد الوصول بـ 3 ساعات عبر WhatsApp.
            </p>
          </div>

          <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-[#7D8A78]">كود القفل المؤقت:</span>
            <span className="text-lg font-black font-mono text-[#172115] tracking-widest">
              583921
            </span>
          </div>
        </div>

        {/* Card 2: مزامنة القنوات */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6F8F4] text-[#2E3C29] flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#172115]">
                  مزامنة القنوات
                </h3>
              </div>
              <span className="bg-[#EEF2E6] text-[#2E3C29] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                تحديث فوري
              </span>
            </div>
            <p className="text-xs text-[#7D8A78] leading-relaxed">
              تم قفل تواريخ الوحدة 204 بمزامنة التقويم المركزي فوراً لمنع التعارض.
            </p>
          </div>

          <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#172115] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2E3C29]" />
              <span>منع التعارض (Zero-Conflict)</span>
            </div>
            <span className="text-xs font-bold text-[#2E7D32]">100% متزامن</span>
          </div>
        </div>

        {/* Card 3: إشعار ومحفظة المالك */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6F8F4] text-[#2E3C29] flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#172115]">
                  إشعار ومحفظة المالك
                </h3>
              </div>
              <span className="bg-[#EEF2E6] text-[#2E3C29] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                تم التنفيذ
              </span>
            </div>
            <p className="text-xs text-[#7D8A78] leading-relaxed">
              تم إرسال إشعار فوري بحساب المالك (محمد العتيبي) مع توثيق الحصة المالية في المحفظة المركزية.
            </p>
          </div>

          <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-[#7D8A78]">الحصة المستحقة:</span>
            <span className="text-sm font-bold text-[#172115]">2,082.50 ر.س</span>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons (Matching Figma: centered inline action buttons, no floating overlap) */}
      <div className="flex items-center justify-center gap-3 pt-6 pb-6 flex-wrap">
        <Link
          href={`/dashboard/bookings/${bookingCode || "BK-10483"}`}
          className="h-11 min-w-[150px] px-6 rounded-[12px] bg-[#34422A] hover:bg-[#2C3825] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
        >
          <span>عرض الحجز</span>
          <Eye className="w-4 h-4 text-white" />
        </Link>

        <button
          type="button"
          onClick={onReset}
          className="h-11 min-w-[150px] px-5 rounded-[12px] bg-[#EBEFE6] hover:bg-[#DEE5D7] text-[#181D17] text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>إضافة حجز آخر</span>
          <PlusCircle className="w-4 h-4 text-[#181D17]" />
        </button>

        <Link
          href="/dashboard/bookings"
          className="h-11 min-w-[140px] px-4 rounded-[12px] text-[#454840] hover:bg-[#F1F5EB] text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>العودة إلى الحجوزات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
