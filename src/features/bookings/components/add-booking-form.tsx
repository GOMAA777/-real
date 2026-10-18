"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Copy,
  Receipt,
  CheckCircle2,
  Clock,
  Lock,
  Building2,
  User,
  ChevronDown,
  DoorOpen,
  AlertTriangle,
  Calendar,
  Plane,
  Plus,
  Minus,
  Users,
  Phone,
  Mail,
  Key,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";

interface AddBookingFormProps {
  onSuccess: () => void;
}

export function AddBookingForm({ onSuccess }: AddBookingFormProps) {
  // Guest Steppers State
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);

  // Form Fields State
  const [guestName, setGuestName] = useState("سلطان بن فهد الدوسري");
  const [guestPhone, setGuestPhone] = useState("+966 54 892 1104");
  const [guestEmail, setGuestEmail] = useState("sultan.aldosari@example.com");
  const [checkInDate, setCheckInDate] = useState("22 سبتمبر 2026");
  const [checkInTime, setCheckInTime] = useState("03:00 م");
  const [checkOutDate, setCheckOutDate] = useState("26 سبتمبر 2026");
  const [checkOutTime, setCheckOutTime] = useState("12:00 م");
  const [notes, setNotes] = useState(
    "طلب النزيل تسجيل وصول مبكر الساعة 1:00 م إن أمكن. تم التنسيق المبدئي مع فريق الاستقبال لتجهيز باقة الضيافة الترحيبية وتجهيز المواقف السفلية رقم 14-B."
  );

  const copyBookingCode = () => {
    navigator.clipboard.writeText("BK-10483");
    toast.success("تم نسخ رقم المعاملة: BK-10483");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="space-y-6 pb-28" dir="rtl">
      {/* 1. Page Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        {/* Right side: Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-[#172115] tracking-tight">
            إضافة حجز
          </h1>
          <p className="text-sm text-[#7D8A78] mt-1 font-normal leading-relaxed">
            إدراج عقار جديد وتعيينه لمالك مسجل في المنصة وربط التراخيص والبيانات الجغرافية بدقة.
          </p>
        </div>

        {/* Left side: Auto Transaction ID Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-xl px-3.5 py-2 text-xs flex items-center gap-2 text-[#172115] shadow-2xs">
            <span className="text-[#7D8A78]">رقم المعاملة التلقائي:</span>
            <span className="font-bold font-mono">BK-10483</span>
            <button
              type="button"
              onClick={copyBookingCode}
              title="نسخ رقم المعاملة"
              className="text-[#7D8A78] hover:text-[#172115] transition-colors cursor-pointer ms-1"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT COLUMN (8 cols): Main Form Sections */}
        <div className="lg:col-span-8 space-y-6 order-1">
          {/* Section 1: بيانات تخصيص الأصل العقاري */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6F8F4] border border-[#EEF2E6] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#2E3C29]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  بيانات تخصيص الأصل العقاري
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5">
                  حدد المالك أولاً لاستعراض العقارات والوحدات المتاحة المرتبطة به
                </p>
              </div>
            </div>

            {/* Field: مالك العقار */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#172115]">
                  مالك العقار <span className="text-red-500">*</span>
                </label>
                <span className="text-[#7D8A78] text-[11px]">
                  مرخص برخصة فال العقارية
                </span>
              </div>

              {/* Owner Input / Selector */}
              <div className="bg-[#F6F8F4] border border-[#CCD5C5] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-[#172115]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#7D8A78]" />
                  <span className="font-bold">محمد بن سعود العتيبي</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("تغيير المالك")}
                  className="bg-white hover:bg-[#EEF2E6] border border-[#E2E6DC] text-xs font-semibold text-[#172115] px-3 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  تغيير
                </button>
              </div>

              {/* Selected Owner Detail Box */}
              <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#dce6d5] text-[#2E3C29] font-bold text-xs flex items-center justify-center shrink-0">
                    ع.م
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#172115]">
                        محمد بن سعود العتيبي
                      </span>
                      <span className="bg-[#EEF2E6] text-[#2E3C29] text-[10px] font-bold px-2 py-0.5 rounded-md">
                        مالك معتمد
                      </span>
                    </div>
                    <div className="text-xs text-[#7D8A78] mt-0.5 font-mono" dir="ltr">
                      +966 50 123 4567
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard/owners/1"
                  className="bg-white hover:bg-[#EEF2E6] border border-[#E2E6DC] text-xs font-bold text-[#172115] px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <span>عرض ملف المالك</span>
                  <span className="text-xs">↗</span>
                </Link>
              </div>
            </div>

            {/* Selectors: العقار التابع & الوحدة المستهدفة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* العقار التابع */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172115]">
                  العقار التابع <span className="text-red-500">*</span>
                </label>
                <div className="bg-[#F6F8F4] border border-[#E2E6DC] hover:border-[#CCD5C5] rounded-2xl p-3 flex items-center justify-between gap-2 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-[#172115] truncate">
                        عمارة النخيل (الرياض - حي العليا)
                      </div>
                      <div className="text-[10px] text-[#7D8A78] mt-0.5">
                        كود العقار: PR-1048 • 12 وحدة مسجلة
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#7D8A78] shrink-0" />
                </div>
              </div>

              {/* الوحدة المستهدفة */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172115]">
                  الوحدة المستهدفة <span className="text-red-500">*</span>
                </label>
                <div className="bg-[#F6F8F4] border border-[#E2E6DC] hover:border-[#CCD5C5] rounded-2xl p-3 flex items-center justify-between gap-2 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shrink-0">
                      <DoorOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#172115]">
                          وحدة 204 - جناح تنفيذي
                        </span>
                        <span className="bg-[#dce6d5] text-[#2E3C29] text-[9px] font-bold px-1.5 py-0.5 rounded">
                          الدور الثاني
                        </span>
                      </div>
                      <div className="text-[10px] text-[#7D8A78] mt-0.5 flex items-center gap-1.5">
                        <span>غرفتين نوم، صالة متكاملة</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        <span className="text-[#2E7D32] font-semibold">متاحة للحجز</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#7D8A78] shrink-0" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#7D8A78]">
              يتم عرض الوحدات التابعة للعقار المحدد فقط وتحديث حالتها بالوقت الفعلي
            </p>

            {/* Warning Alert Banner */}
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-[#92400E]">
                    تنبيه فحص التوافر الزمني:
                  </div>
                  <div className="text-xs text-[#B45309] mt-0.5">
                    الوحدة غير متاحة في بعض أيام التمديد المحتملة لوجود حجز تالٍ مؤكد.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.info("عرض الحجوزات المتعارضة: BK-10476")}
                className="bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FCD34D] text-[#92400E] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              >
                <span>عرض الحجوزات المتعارضة (BK-10476)</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
          </div>

          {/* Section 2: بيانات الإقامة والمواعيد */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F6F8F4] border border-[#EEF2E6] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#2E3C29]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#172115]">
                    بيانات الإقامة والمواعيد
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5">
                    تحديد فترات تسجيل الوصول، المغادرة ومصدر الحجز الوارد
                  </p>
                </div>
              </div>

              <span className="bg-[#EEF2E6] text-[#2E3C29] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                <span>مدة الإقامة: 4 ليال</span>
              </span>
            </div>

            {/* Check-in & Check-out Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check-in Card */}
              <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                  <Plane className="w-4 h-4 text-[#2E3C29] rotate-45" />
                  <span>تاريخ ووقت الوصول (Check-in)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-[#E2E6DC] rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-[#7D8A78]">التاريخ</div>
                      <div className="font-bold text-[#172115] mt-0.5">
                        {checkInDate}
                      </div>
                    </div>
                    <Calendar className="w-3.5 h-3.5 text-[#7D8A78]" />
                  </div>
                  <div className="bg-white border border-[#E2E6DC] rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-[#7D8A78]">وقت الدخول</div>
                      <div className="font-bold text-[#172115] mt-0.5">
                        {checkInTime}
                      </div>
                    </div>
                    <Clock className="w-3.5 h-3.5 text-[#7D8A78]" />
                  </div>
                </div>
              </div>

              {/* Check-out Card */}
              <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                  <Plane className="w-4 h-4 text-[#2E3C29] -rotate-45" />
                  <span>تاريخ ووقت المغادرة (Check-out)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-[#E2E6DC] rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-[#7D8A78]">التاريخ</div>
                      <div className="font-bold text-[#172115] mt-0.5">
                        {checkOutDate}
                      </div>
                    </div>
                    <Calendar className="w-3.5 h-3.5 text-[#7D8A78]" />
                  </div>
                  <div className="bg-white border border-[#E2E6DC] rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-[#7D8A78]">وقت الخروج</div>
                      <div className="font-bold text-[#172115] mt-0.5">
                        {checkOutTime}
                      </div>
                    </div>
                    <Clock className="w-3.5 h-3.5 text-[#7D8A78]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Steppers: توزيع النزلاء والمرافقين */}
            <div className="space-y-2.5 pt-1">
              <label className="block text-xs font-bold text-[#172115]">
                توزيع النزلاء والمرافقين
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. البالغون */}
                <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-2xl p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#172115]">البالغون</div>
                    <div className="text-[10px] text-[#7D8A78]">عمر 13 سنة وأكثر</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#172115]">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 2. الأطفال */}
                <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-2xl p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#172115]">الأطفال</div>
                    <div className="text-[10px] text-[#7D8A78]">من عمر 2 إلى 12 سنة</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#172115]">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 3. الرضع */}
                <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-2xl p-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#172115]">الرضع</div>
                    <div className="text-[10px] text-[#7D8A78]">أقل من عامين</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#172115]">
                      {infants}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInfants((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E2E6DC] flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: بيانات العميل (النزيل الرئيسي) */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F6F8F4] border border-[#EEF2E6] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#2E3C29]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#172115]">
                    بيانات العميل (النزيل الرئيسي)
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5">
                    معلومات الاتصال والتحقق لإرسال بيانات الدخول الرقمية
                  </p>
                </div>
              </div>

              <span className="bg-[#EEF2E6] text-[#2E7D32] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                <span>إرسال آلي عبر WhatsApp</span>
              </span>
            </div>

            {/* Inputs: الاسم ورقم الجوال */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* اسم العميل */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172115]">
                  اسم العميل الكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-xl px-4 py-2.5 pe-10 text-xs font-medium text-[#172115] focus:outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* رقم الجوال */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172115]">
                  رقم الجوال النشط <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-xl px-4 py-2.5 pe-10 text-xs font-medium text-[#172115] focus:outline-none transition-all text-right"
                  />
                  <Phone className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172115]">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  dir="ltr"
                  className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-xl px-4 py-2.5 pe-10 text-xs font-medium text-[#172115] focus:outline-none transition-all text-right"
                />
                <Mail className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Smart Lock Generation Note */}
            <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-3.5 flex items-start gap-2.5">
              <Key className="w-4 h-4 text-[#7D8A78] shrink-0 mt-0.5" />
              <p className="text-xs text-[#7D8A78] leading-relaxed">
                سيتم توليد رمز القفل الذكي للباب الخارجي للوحدة 204 تلقائياً ومشاركته مع النزيل قبل موعد الوصول بـ 3 ساعات عبر رسالة نصية وقناة الواتساب الرسمية الموثقة.
              </p>
            </div>
          </div>

          {/* Section 4: ملاحظات وتشغيل داخلي */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F6F8F4] border border-[#EEF2E6] flex items-center justify-center shrink-0">
                  <StickyNote className="w-5 h-5 text-[#2E3C29]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#172115]">
                    ملاحظات وتشغيل داخلي
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5">
                    مخصصة لفريق الاستقبال ومديري العمليات والضيافة فقط
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#7D8A78] font-medium">
                لا تظهر للنزيل
              </span>
            </div>

            {/* Textarea */}
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F6F8F4] border border-transparent focus:border-[#CCD5C5] rounded-2xl p-4 text-xs text-[#172115] focus:outline-none leading-relaxed transition-all resize-none"
            />
          </div>
        </div>

        {/* LEFT COLUMN (4 cols): Summary, Unit Preview & System Actions */}
        <div className="lg:col-span-4 space-y-6 order-2">
          {/* Card 1: الدفع والرسوم */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EEF2E6] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6F8F4] flex items-center justify-center text-[#2E3C29]">
                  <Receipt className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#172115]">الدفع والرسوم</h3>
              </div>
              <span className="bg-[#EEF2E6] text-[#2E3C29] text-[10px] font-bold px-2 py-0.5 rounded">
                ريال سعودي
              </span>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#7D8A78]">
                <span>سعر الليلة الأساسي (× 4 ليال)</span>
                <span className="font-bold text-[#172115]">2,800 ر.س</span>
              </div>
              <div className="flex items-center justify-between text-[#7D8A78]">
                <span>رسوم الخدمة والنظافة المعتمدة</span>
                <span className="font-bold text-[#172115]">156 ر.س</span>
              </div>
              <div className="flex items-center justify-between text-[#7D8A78]">
                <span>ضريبة القيمة المضافة (15%)</span>
                <span className="font-bold text-[#172115]">444 ر.س</span>
              </div>
            </div>

            {/* Total Highlight Box */}
            <div className="bg-[#F6F8F4] rounded-2xl p-4 flex items-center justify-between border border-[#EEF2E6]">
              <div>
                <div className="font-bold text-xs text-[#172115]">
                  المبلغ الإجمالي المستحق
                </div>
                <div className="text-[10px] text-[#7D8A78] mt-0.5">
                  شامل الضريبة والرسوم
                </div>
              </div>
              <div className="text-start">
                <span className="text-2xl font-black text-[#172115]">3,400</span>
                <span className="text-xs text-[#7D8A78] ms-1">ر.س</span>
              </div>
            </div>

            {/* Split Status Pills */}
            <div className="space-y-2">
              <div className="bg-[#EAF5EA] border border-[#C8E6C9] rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span className="font-semibold text-[#172115]">
                    المبلغ المدفوع (مسبقاً)
                  </span>
                </div>
                <span className="font-bold text-[#2E7D32]">1,700 ر.س</span>
              </div>

              <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7D8A78]" />
                  <span className="font-semibold text-[#172115]">
                    المتبقي عند الوصول
                  </span>
                </div>
                <span className="font-bold text-[#172115]">1,700 ر.س</span>
              </div>
            </div>

            {/* Escrow Guarantee Note */}
            <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-xl p-3 flex items-center gap-2.5 text-[11px] text-[#7D8A78]">
              <Lock className="w-4 h-4 text-[#7D8A78] shrink-0" />
              <span>
                طريقة الاستلام: حساب وسيط المنصة لضمان حقوق المالك والمستأجر.
              </span>
            </div>
          </div>

          {/* Card 2: معاينة الوحدة */}
          <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Image Preview with Overlay */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-[#E2E6DC] bg-[#EEF2E6]">
              <Image
                src="/properties/nakheel_hd.jpg"
                alt="جناح تنفيذي 204"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Furnished Badge at top-left */}
              <div className="absolute top-3 start-3">
                <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  مفروشة بالكامل
                </span>
              </div>

              {/* Title at bottom */}
              <div className="absolute bottom-3 start-3 end-3 text-white">
                <div className="font-bold text-sm">جناح تنفيذي 204</div>
                <div className="text-[11px] text-white/80 mt-0.5">
                  عمارة النخيل • العليا
                </div>
              </div>
            </div>

            {/* Unit Details Grid */}
            <div className="space-y-2 text-xs divide-y divide-[#EEF2E6]">
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#7D8A78]">مساحة الوحدة:</span>
                <span className="font-bold text-[#172115]">94 م²</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#7D8A78]">نوع التأجير:</span>
                <span className="font-bold text-[#172115]">يومي / قصير المدى</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[#7D8A78]">كود القفل الرقمي:</span>
                <span className="font-bold font-mono text-[#172115]">#9284-A</span>
              </div>
            </div>
          </div>

          {/* Card 3: إجراءات النظام الفورية بعد الحفظ */}
          <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
              <CheckCircle2 className="w-4 h-4 text-[#2E3C29]" />
              <span>إجراءات النظام الفورية بعد الحفظ</span>
            </div>
            <ul className="space-y-2 text-xs text-[#7D8A78]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                <span>تحديث حالة التقويم في Whatsapp API</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                <span>إصدار سند قبض إلكتروني بمبلغ 1,700 ر.س</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] mt-1.5 shrink-0" />
                <span>إشعار مالك العقار عبر لوحة تحكم الشركاء</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Fixed Sticky Bottom Bar */}
      <div className="fixed bottom-0 start-0 end-0 bg-white/95 backdrop-blur-md border-t border-[#E2E6DC] py-4 px-6 sm:px-8 z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Status Indicator (Right in RTL) */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse shrink-0" />
            <div>
              <div className="font-bold text-xs text-[#172115]">
                جاهز للتأكيد والمزامنة الفورية
              </div>
              <div className="text-[11px] text-[#7D8A78] mt-0.5">
                سيتم قفل التواريخ ومزامنة الأقفال الذكية وقنوات التوزيع فور الاعتماد
              </div>
            </div>
          </div>

          {/* Action Buttons (Left in RTL) */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Cancel Button */}
            <Link
              href="/dashboard/bookings"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#7D8A78] hover:text-[#172115] transition-colors"
            >
              إلغاء
            </Link>

            {/* Save as Draft Button */}
            <button
              type="button"
              onClick={() => toast.info("تم حفظ مسودة الحجز بنجاح")}
              className="bg-[#dce6d5] hover:bg-[#cdddc4] text-[#2E3C29] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
            >
              حفظ كمسودة
            </button>

            {/* Save & Confirm Booking Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#2E3C29] hover:bg-[#232F1F] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>حفظ واعتماد الحجز</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
