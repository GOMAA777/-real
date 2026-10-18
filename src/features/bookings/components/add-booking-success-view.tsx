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
      {/* 1. Top Success Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E6DC] shadow-2xs text-center space-y-4">
        {/* Success Icon Circle Badge */}
        <div className="relative w-20 h-20 rounded-full bg-[#dce6d5] flex items-center justify-center mx-auto">
          <Check className="w-9 h-9 text-[#2E3C29] stroke-[3]" />
          {/* Bottom badge with zap */}
          <div className="w-6 h-6 rounded-full bg-white border border-[#CCD5C5] shadow-xs flex items-center justify-center absolute -bottom-1 -end-1 text-[#2E3C29]">
            <Zap className="w-3.5 h-3.5 fill-[#2E3C29] text-[#2E3C29]" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#172115]">
            تم إنشاء الحجز بنجاح
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] max-w-xl mx-auto leading-relaxed">
            تم تسجيل وتأكيد الحجز ومزامنة التوافر مع القنوات الخارجية، وتجهيز كود الدخول الذكي وإرسال إشعار التأكيد للعميل والمالك.
          </p>
        </div>

        {/* Booking Reference Pill */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 bg-[#F6F8F4] border border-[#E2E6DC] px-4 py-2 rounded-xl text-xs shadow-2xs">
            <span className="text-[#7D8A78]">رقم الحجز:</span>
            <span className="font-bold font-mono text-[#172115]">{bookingCode}</span>
            <button
              type="button"
              onClick={copyCode}
              title="نسخ رقم الحجز"
              className="text-[#7D8A78] hover:text-[#172115] transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#CCD5C5] mx-1">|</span>
            <span className="bg-[#EAF5EA] text-[#2E7D32] text-[10px] font-bold px-2 py-0.5 rounded-full">
              مؤكد ومعتمد
            </span>
          </div>
        </div>
      </div>

      {/* 2. Operational Booking Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
        {/* Card Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEF2E6] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#172115]">
                ملخص بيانات الحجز التشغيلي
              </h2>
              <p className="text-xs text-[#7D8A78] mt-0.5">
                المرجع المالي والمكاني المعتمد لنظام الأصول
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold px-3 py-1.5 rounded-full self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
            <span>مزامنة WhatsApp</span>
          </span>
        </div>

        {/* 8 Grid Cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Cell 1: مرجع المعاملة */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">مرجع المعاملة</div>
            <div className="font-bold text-sm text-[#172115] font-mono">{bookingCode}</div>
            <div className="text-[10px] text-[#7D8A78]">إنشاء يدوي عبر الإدارة المركزية</div>
          </div>

          {/* Cell 2: العميل / النزيل */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">العميل / النزيل</div>
            <div className="font-bold text-sm text-[#172115] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7D8A78]" />
              <span>خالد العتيبي</span>
            </div>
            <div className="text-[10px] text-[#7D8A78] font-mono" dir="ltr">
              +966 50 123 4567
            </div>
          </div>

          {/* Cell 3: العقار الرئيسي */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">العقار الرئيسي</div>
            <div className="font-bold text-sm text-[#172115]">عمارة النخيل</div>
            <div className="text-[10px] text-[#7D8A78]">الرياض، حي العليا • PR-1048</div>
          </div>

          {/* Cell 4: الوحدة المحجوزة */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">الوحدة المحجوزة</div>
            <div className="font-bold text-sm text-[#172115]">وحدة 204 (جناح تنفيذي)</div>
            <div className="text-[10px] text-[#7D8A78]">الدور الثاني • إطلالة أمامية</div>
          </div>

          {/* Cell 5: موعد الوصول */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">موعد الوصول</div>
            <div className="font-bold text-sm text-[#172115]">18 سبتمبر 2026</div>
            <div className="text-[10px] text-[#7D8A78]">تسجيل الوصول: ابتداءً من 03:00 م</div>
          </div>

          {/* Cell 6: موعد المغادرة */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">موعد المغادرة</div>
            <div className="font-bold text-sm text-[#172115]">21 سبتمبر 2026</div>
            <div className="text-[10px] text-[#7D8A78]">تسجيل الخروج: حتى 12:00 م</div>
          </div>

          {/* Cell 7: مالك العقار والترخيص */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">مالك العقار والترخيص</div>
            <div className="font-bold text-sm text-[#172115]">محمد بن سعود العتيبي</div>
            <div className="text-[10px] text-[#7D8A78]">رخصة فال: 1200028491</div>
          </div>

          {/* Cell 8: المدة والقيمة الإجمالية */}
          <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 space-y-1">
            <div className="text-[11px] text-[#7D8A78] font-medium">المدة والقيمة الإجمالية</div>
            <div className="font-bold text-sm text-[#172115]">2,450 ر.س</div>
            <div className="text-[10px] text-[#7D8A78]">3 ليال • مدفوع مسبقاً بالكامل</div>
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

      {/* 4. Bottom Action Buttons Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        {/* Button 1: عرض الحجز */}
        <Link
          href="/dashboard/bookings"
          className="bg-[#2E3C29] hover:bg-[#232F1F] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>عرض الحجز</span>
        </Link>

        {/* Button 2: إضافة حجز آخر */}
        <button
          type="button"
          onClick={onReset}
          className="bg-white hover:bg-[#F9FAF7] border border-[#E2E6DC] text-[#172115] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#7D8A78]" />
          <span>إضافة حجز آخر</span>
        </button>

        {/* Button 3: العودة إلى الحجوزات */}
        <Link
          href="/dashboard/bookings"
          className="text-xs font-bold text-[#7D8A78] hover:text-[#172115] px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>العودة إلى الحجوزات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
