"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Calendar,
  Clock,
  DoorClosed,
  Key,
  Lock,
  Mail,
  Phone,
  Receipt,
  RotateCcw,
  Shield,
  ShieldCheck,
  Tag,
  Users,
  CreditCard,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Share2,
  BookmarkCheck,
  Check,
  Copy,
  Plus,
  Minus,
  MessageSquare,
  IdCard,
  AtSign,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { FloatingConfirmationBar } from "@/components/shared/floating-confirmation-bar";
import { ChangeUnitModal } from "./change-unit-modal";
import { CancelBookingModal } from "./cancel-booking-modal";

interface EditBookingFormProps {
  bookingId?: string;
}

export function EditBookingForm({ bookingId = "BK-10482" }: EditBookingFormProps) {
  const router = useRouter();


  // Modals state
  const [isChangeUnitOpen, setIsChangeUnitOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Form interactive states
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedProperty, setSelectedProperty] = useState("عمارة النخيل (الرياض - حي العليا)");
  const [selectedUnit, setSelectedUnit] = useState("وحدة 204 — جناح تنفيذي فاخر (الدور الثاني)");
  const [checkInDate, setCheckInDate] = useState("18 سبتمبر 2026");
  const [checkInTime, setCheckInTime] = useState("03:00 م");
  const [checkOutDate, setCheckOutDate] = useState("21 سبتمبر 2026");
  const [checkOutTime, setCheckOutTime] = useState("12:00 م");
  const [guestName, setGuestName] = useState("خالد بن فهد العتيبي");
  const [guestPhone, setGuestPhone] = useState("+966 50 123 4567");
  const [guestEmail, setGuestEmail] = useState("khaled.otb@example.com");
  const [bookingSource, setBookingSource] = useState("Whatsapp.com");
  const [totalAmount, setTotalAmount] = useState("2,450.00 ر.س");
  const [paymentStatus, setPaymentStatus] = useState("مدفوع بالكامل");
  const [notes, setNotes] = useState(
    "طلب النزيل تسجيل وصول مبكر في حال إمكانية ذلك، وتجهيز سرير إضافي للأطفال مع توفير بياضات قطنية إضافية."
  );

  const confirm = useConfirm();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const ok = await confirm({
      title: "حفظ تعديلات الحجز",
      message: `هل أنت متأكد من رغبتك في حفظ التعديلات على الحجز رقم ${bookingId}؟ سيتم تطبيق التعديلات وتحديث القنوات المرتبطة.`,
      confirmLabel: "حفظ التعديلات",
      variant: "default",
    });
    if (!ok) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("تم تحديث الحجز بنجاح", {
        description: "تمت مزامنة المواعيد مع القنوات الذكية وتحديث الرمز الرقمي",
      });
      router.push(`/dashboard/bookings/${bookingId}`);
    }, 600);
  };

  const handleCancel = () => {
    router.back();
  };

  const copyBookingCode = () => {
    navigator.clipboard.writeText(bookingId);
    toast.success(`تم نسخ رقم الحجز: ${bookingId}`);
  };

  return (
    <div className="space-y-6 pb-8" dir="rtl">

      {/* Top Header Card (Exact match to design screenshot) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        {/* Right side in RTL: Title, Badges & Subtitle */}
        <div className="space-y-1.5">
          <div className="flex items-center flex-wrap gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#172115] tracking-tight">
              تعديل الحجز
            </h1>

            {/* Booking Code Badge with Copy Icon */}
            <button
              type="button"
              onClick={copyBookingCode}
              title="نسخ رقم الحجز"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFE4DB] hover:bg-[#D5DCD0] text-[#2C3825] font-mono font-bold text-xs transition-colors cursor-pointer select-none"
            >
              <Copy className="w-3.5 h-3.5 text-[#5C6B57]" />
              <span>{bookingId}</span>
            </button>

            {/* Upcoming Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FC] text-[#2563EB] font-bold text-xs select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>قادم</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium leading-relaxed">
            تحديث مواعيد الإقامة، بيانات الوحدة، وتفاصيل الدفع والنزيل للحجز رقم {bookingId}
          </p>
        </div>

        {/* Left side in RTL: Summary Pill (القناة الناقلة والمبلغ الإجمالي) */}
        <div className="bg-[#F1F5EB] border border-[#DEE7D7] rounded-2xl px-5 py-2.5 flex items-center gap-5 shrink-0 self-start md:self-auto">
          {/* Right Column in RTL: القناة الناقلة */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-[#7A8774] font-medium">
              القناة الناقلة
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#172115]">
              <span className="w-2 h-2 rounded-full bg-[#3D8A55] shrink-0" />
              <span>(مباشر) {bookingSource}</span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-8 bg-[#DCE4D6]" />

          {/* Left Column in RTL: المبلغ الإجمالي */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-[#7A8774] font-medium">
              المبلغ الإجمالي
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#172115]">
              {totalAmount}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (33%) & Right Column (67%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL (67% width -> 8 cols) - Main Form Content */}
        <div className="lg:col-span-8 space-y-6 order-1">
          {/* 1. بيانات العقار والوحدة */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-xl font-bold text-[#172115]">
                  بيانات العقار والوحدة
                </h2>
              </div>

              <span className="px-3 py-1 rounded-lg bg-[#EFF3EB] text-[#556550] text-xs font-bold border border-[#DEE6D8] select-none">
                الخطوة 1 من 4
              </span>
            </div>

            {/* Property & Unit Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: Property */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  العقار
                </label>
                <div className="bg-[#F0F4EC] rounded-2xl px-4 py-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#172115] border border-transparent hover:border-[#D5E0CE] cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5 truncate">
                    <Building2 className="w-4 h-4 text-[#3D4C35] shrink-0" />
                    <span className="truncate">{selectedProperty}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#7A8875] shrink-0" />
                </div>
              </div>

              {/* Field 2: Unit */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  الوحدة المحجوزة
                </label>
                <div
                  onClick={() => setIsChangeUnitOpen(true)}
                  className="bg-[#F0F4EC] rounded-2xl px-4 py-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#172115] border border-transparent hover:border-[#D5E0CE] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <DoorClosed className="w-4 h-4 text-[#3D4C35] shrink-0" />
                    <span className="truncate">{selectedUnit}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#7A8875] shrink-0" />
                </div>
              </div>
            </div>

            {/* Central Calendar Validation Box */}
            <div className="bg-[#EEF5EB] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 border border-[#DEEAD9]">
              <div className="w-9 h-9 rounded-xl bg-[#DDECDC] text-[#3E6F3A] flex items-center justify-center shrink-0 shadow-3xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-[#273822]">
                  تم التحقق آلياً من التقويم المركزي
                </div>
                <div className="text-[11px] sm:text-xs text-[#556650] leading-relaxed">
                  الوحدة متاحة بالكامل للتواريخ المختارة دون تعارض مع أي حجوزات مسبقة أو جداول صيانة دورية.
                </div>
              </div>
            </div>
          </div>

          {/* 2. مواعيد الإقامة والنزلاء */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-xl font-bold text-[#172115]">
                  مواعيد الإقامة والنزلاء
                </h2>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D8E6D3] text-[#33462E] text-xs font-bold border border-[#C6D9C0] select-none">
                <Clock className="w-3.5 h-3.5" />
                <span>3 ليالٍ محسوبة</span>
              </span>
            </div>

            {/* Check-in & Check-out Side-by-Side Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check-in Box */}
              <div className="bg-[#F2F5EF] rounded-2xl p-4 sm:p-4.5 space-y-3 border border-[#E5EAE0]">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D3927]">
                  <ArrowRight className="w-4 h-4 text-[#3D4C35]" />
                  <span>موعد الوصول (Check-in)</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#7A8875] font-medium block">تاريخ الوصول</span>
                    <div className="bg-white rounded-xl px-3 py-2.5 flex items-center justify-between border border-[#E2E6DC] text-xs font-semibold text-[#172115] shadow-3xs">
                      <span>{checkInDate}</span>
                      <Calendar className="w-3.5 h-3.5 text-[#7A8875]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-[#7A8875] font-medium block">وقت الوصول</span>
                    <div className="bg-white rounded-xl px-3 py-2.5 flex items-center justify-between border border-[#E2E6DC] text-xs font-semibold text-[#172115] shadow-3xs">
                      <span>{checkInTime}</span>
                      <Clock className="w-3.5 h-3.5 text-[#7A8875]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Check-out Box */}
              <div className="bg-[#F2F5EF] rounded-2xl p-4 sm:p-4.5 space-y-3 border border-[#E5EAE0]">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D3927]">
                  <ArrowLeft className="w-4 h-4 text-[#3D4C35]" />
                  <span>موعد المغادرة (Check-out)</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#7A8875] font-medium block">تاريخ المغادرة</span>
                    <div className="bg-white rounded-xl px-3 py-2.5 flex items-center justify-between border border-[#E2E6DC] text-xs font-semibold text-[#172115] shadow-3xs">
                      <span>{checkOutDate}</span>
                      <Calendar className="w-3.5 h-3.5 text-[#7A8875]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-[#7A8875] font-medium block">وقت المغادرة</span>
                    <div className="bg-white rounded-xl px-3 py-2.5 flex items-center justify-between border border-[#E2E6DC] text-xs font-semibold text-[#172115] shadow-3xs">
                      <span>{checkOutTime}</span>
                      <Clock className="w-3.5 h-3.5 text-[#7A8875]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guests Stepper Row */}
            <div className="bg-[#F2F5EF] rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E5EAE0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E0E7DC] flex items-center justify-center text-[#3D4C35] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#172115]">
                    إجمالي النزلاء المصرح لهم
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#7A8875]">
                    الحد الأقصى لاستيعاب الوحدة هو 4 أفراد
                  </div>
                </div>
              </div>

              {/* Stepper Buttons */}
              <div className="bg-white rounded-2xl px-4 py-2 border border-[#DEE5DA] flex items-center gap-5 shadow-2xs self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setGuestsCount((prev) => Math.min(4, prev + 1))}
                  className="w-7 h-7 rounded-lg hover:bg-[#F0F4EC] text-[#2D3927] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                  aria-label="زيادة عدد النزلاء"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-[#172115] text-base min-w-[18px] text-center">
                  {guestsCount}
                </span>
                <button
                  type="button"
                  onClick={() => setGuestsCount((prev) => Math.max(1, prev - 1))}
                  className="w-7 h-7 rounded-lg hover:bg-[#F0F4EC] text-[#2D3927] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                  aria-label="إنقاص عدد النزلاء"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Smart Lock Integration Box */}
            <div className="bg-[#EEF5EB] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 border border-[#DEEAD9]">
              <div className="w-10 h-10 rounded-xl bg-[#DDECDC] text-[#3E6F3A] flex items-center justify-center shrink-0 shadow-3xs mt-0.5">
                <Key className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold text-[#273822]">
                  تزامن القفل الذكي (Smart Lock Integration)
                </div>
                <div className="text-[11px] sm:text-xs text-[#556650] leading-relaxed">
                  سيتم تحديث صلاحية كود الدخول تلقائياً وفقاً لتواريخ الحجز الجديدة. (صلاحية الكود ستبدأ في 18 سبتمبر 03:00 م وتنتهي في 21 سبتمبر 12:00 م). سيصل الرمز المحدث إلى جوال النزيل عبر رسالة WhatsApp وتطبيق رواق فور الحفظ.
                </div>
              </div>
            </div>
          </div>

          {/* 3. بيانات العميل والنزيل الرئيسي */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
                  <IdCard className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-xl font-bold text-[#172115]">
                  بيانات العميل والنزيل الرئيسي
                </h2>
              </div>

              <span className="text-xs text-[#7A8875] font-medium">
                ملف العميل مسجل وموثق عبر نفاذ
              </span>
            </div>

            {/* 3 Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Field 1: Name */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  الاسم الكامل
                </label>
                <div className="bg-[#F2F5EF] rounded-2xl px-4 py-3 flex items-center justify-between border border-transparent focus-within:border-[#3D4C35] transition-colors">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-[#172115] w-full"
                  />
                  <IdCard className="w-4 h-4 text-[#7A8875] shrink-0 me-1" />
                </div>
              </div>

              {/* Field 2: Phone */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  رقم الجوال
                </label>
                <div className="bg-[#F2F5EF] rounded-2xl px-4 py-3 flex items-center justify-between border border-transparent focus-within:border-[#3D4C35] transition-colors">
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    dir="ltr"
                    className="bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-[#172115] font-mono w-full text-right"
                  />
                  <Phone className="w-4 h-4 text-[#7A8875] shrink-0 me-1" />
                </div>
              </div>

              {/* Field 3: Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  البريد الإلكتروني
                </label>
                <div className="bg-[#F2F5EF] rounded-2xl px-4 py-3 flex items-center justify-between border border-transparent focus-within:border-[#3D4C35] transition-colors">
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    dir="ltr"
                    className="bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-[#172115] font-mono w-full text-right"
                  />
                  <AtSign className="w-4 h-4 text-[#7A8875] shrink-0 me-1" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. البيانات المالية ومصدر الحجز */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-xl font-bold text-[#172115]">
                  البيانات المالية ومصدر الحجز
                </h2>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8E6D3] text-[#33462E] text-xs font-bold border border-[#C6D9C0] select-none">
                <span>{paymentStatus}</span>
              </span>
            </div>

            {/* 3 Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Field 1: Source */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  مصدر الحجز
                </label>
                <div className="bg-[#F2F5EF] rounded-2xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#172115] border border-transparent hover:border-[#D5E0CE] cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#3D4C35]" />
                    <span>{bookingSource}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#7A8875]" />
                </div>
              </div>

              {/* Field 2: Total Amount */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  المبلغ الإجمالي (شامل الضريبة)
                </label>
                <div className="bg-[#F2F5EF] rounded-2xl px-4 py-3 flex items-center justify-between border border-transparent focus-within:border-[#3D4C35] transition-colors">
                  <input
                    type="text"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs sm:text-sm font-extrabold text-[#172115] w-full"
                  />
                  <Tag className="w-4 h-4 text-[#7A8875] shrink-0 me-1" />
                </div>
              </div>

              {/* Field 3: Payment Status */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#7A8875] font-semibold block">
                  حالة السداد
                </label>
                <div className="bg-[#F2F5EF] rounded-2xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#172115] border border-transparent hover:border-[#D5E0CE] cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#3D4C35]" />
                    <span>{paymentStatus}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#7A8875]" />
                </div>
              </div>
            </div>

            {/* Financial Calculation Box */}
            <div className="bg-[#F2F5EF] rounded-2xl p-4 sm:p-5 space-y-3.5 border border-[#E5EAE0]">
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm font-bold text-[#273822]">
                  تفصيل الحسبة المالية المحدثة
                </div>
                <div className="text-[11px] text-[#7A8875]">
                  تم تطبيق ضريبة القيمة المضافة 15%
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Rate card 1 */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 text-center border border-[#E2E6DC] space-y-1 shadow-3xs">
                  <div className="text-[11px] text-[#7A8875] font-medium">سعر الإقامة (3 ليالٍ)</div>
                  <div className="text-sm sm:text-base font-black text-[#172115]">1,950.00 ر.س</div>
                  <div className="text-[10px] text-[#8C9887]">650 ر.س / ليلة</div>
                </div>

                {/* Rate card 2 */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 text-center border border-[#E2E6DC] space-y-1 shadow-3xs">
                  <div className="text-[11px] text-[#7A8875] font-medium">رسوم التنظيف والتعقيم</div>
                  <div className="text-sm sm:text-base font-black text-[#172115]">180.00 ر.س</div>
                  <div className="text-[10px] text-[#8C9887]">رسوم إقامة ثابتة</div>
                </div>

                {/* Rate card 3 */}
                <div className="bg-white rounded-xl p-3 sm:p-3.5 text-center border border-[#E2E6DC] space-y-1 shadow-3xs">
                  <div className="text-[11px] text-[#7A8875] font-medium">ضريبة القيمة المضافة (15%)</div>
                  <div className="text-sm sm:text-base font-black text-[#172115]">320.00 ر.س</div>
                  <div className="text-[10px] text-[#8C9887]">VAT القياسية</div>
                </div>

                {/* Rate card 4 (Active / Highlighted Dark Olive) */}
                <div className="bg-[#3D4C35] rounded-xl p-3 sm:p-3.5 text-center text-white space-y-1 shadow-2xs">
                  <div className="text-[11px] text-[#D3DFC9] font-medium">صافي المطلوب تحصيله</div>
                  <div className="text-sm sm:text-base font-black text-white">2,450.00 ر.س</div>
                  <div className="text-[10px] text-[#B8C8AF]">المبلغ متوازن</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ملاحظات التشغيل والاستقبال */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-xl font-bold text-[#172115]">
                  ملاحظات التشغيل والاستقبال
                </h2>
              </div>

              <span className="text-xs text-[#7A8875] font-medium">
                تظهر هذه الملاحظة لمشرفي الضيافة والميدان
              </span>
            </div>

            <div className="bg-[#F2F5EF] rounded-2xl p-4 border border-transparent focus-within:border-[#3D4C35] transition-colors">
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[#2D3927] leading-relaxed resize-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* Left Column in RTL (33% width -> 4 cols) - Sidebar Cards */}
        <div className="lg:col-span-4 space-y-6 order-2">
          {/* Card 1: مالك العقار المسجل */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F0F4EC] border border-[#DEE7D7] flex items-center justify-center text-[#3D4C35] shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#172115]">
                    مالك العقار المسجل
                  </h3>
                  <p className="text-[11px] text-[#7A8875]">سجل الأصول المركزية</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFF3EB] text-[#556550] text-[11px] font-semibold border border-[#DEE6D8] select-none">
                <Lock className="w-3 h-3" />
                <span>للقراءة فقط</span>
              </span>
            </div>

            {/* Owner Info Box */}
            <div className="bg-[#EEF3EB] rounded-2xl p-4 flex items-center justify-between border border-[#DEE7D7]">
              <div className="space-y-0.5">
                <div className="font-bold text-[#172115] text-sm">
                  محمد بن سعود العتيبي
                </div>
                <div className="text-xs text-[#6F7E6B]">
                  رخصة فال: 1200028491
                </div>
              </div>

              <div className="w-11 h-11 rounded-xl bg-[#2D3927] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                ع.م
              </div>
            </div>

            {/* Metadata Rows */}
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between text-[#172115]">
                <div className="flex items-center gap-2 text-[#7A8875]">
                  <Phone className="w-3.5 h-3.5 text-[#3D4C35]" />
                  <span>الهاتف:</span>
                </div>
                <span className="font-semibold font-mono dir-ltr">+966 50 123 4567</span>
              </div>

              <div className="flex items-center justify-between text-[#172115]">
                <div className="flex items-center gap-2 text-[#7A8875]">
                  <Mail className="w-3.5 h-3.5 text-[#3D4C35]" />
                  <span>البريد:</span>
                </div>
                <span className="font-semibold font-mono text-[11px]">mohammed.otb@al-otaibi.sa</span>
              </div>

              <div className="flex items-center justify-between text-[#172115]">
                <div className="flex items-center gap-2 text-[#7A8875]">
                  <Receipt className="w-3.5 h-3.5 text-[#3D4C35]" />
                  <span>نسبة العقد:</span>
                </div>
                <span className="font-bold text-[#172115]">18% من إجمالي الإيراد</span>
              </div>
            </div>

            {/* Permissions Alert Box */}
            <div className="bg-[#F4F7F1] rounded-2xl p-3.5 space-y-1 border border-[#E8EEE3]">
              <div className="text-xs font-bold text-[#2E3C29]">
                تنبيه صلاحيات:
              </div>
              <div className="text-[11px] text-[#61715C] leading-relaxed">
                لتغيير تخصيص المالك أو تحويل ملكية العقار، يرجى الانتقال إلى وحدة إدارة أصحاب العقارات مع إرفاق وثائق الملكية المحدثة.
              </div>
            </div>

            {/* Link to Owner Button */}
            <Link
              href="/dashboard/owners/1"
              className="w-full py-3 rounded-2xl bg-[#E4ECE0] hover:bg-[#D9E3D4] text-[#2D3927] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-3xs active:scale-98"
            >
              <ArrowUpRight className="w-4 h-4 rtl:rotate-0" />
              <span>الانتقال لملف المالك</span>
            </Link>
          </div>

          {/* Card 2: سجل التدقيق والتعديلات */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] space-y-5 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F0F4EC] border border-[#DEE7D7] flex items-center justify-center text-[#3D4C35] shrink-0">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#172115]">
                سجل التدقيق والتعديلات
              </h3>
            </div>

            {/* Vertical timeline items */}
            <div className="space-y-4 pt-1">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#2D3927] mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#172115]">تاريخ الإنشاء الأصلي</div>
                  <div className="text-[11px] text-[#7A8875]">15 سبتمبر 2026 ▪ 11:32 ص</div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#82B57B] mt-1.5 shrink-0 ring-2 ring-[#82B57B]/30" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#172115]">طريقة الاستقبال</div>
                  <div className="text-[11px] text-[#7A8875]">مزامنة تلقائية عبر Whatsapp.com API</div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#2D3927] mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#172115]">المشرف المعتمد للجلسة</div>
                  <div className="text-[11px] text-[#7A8875]">محمد أحمد (مدير المنصة المركزية)</div>
                </div>
              </div>
            </div>

            {/* Channel Manager Warning Note */}
            <div className="bg-[#EEF3EB] rounded-2xl p-3.5 flex items-start gap-3 border border-[#E2EADF]">
              <RotateCcw className="w-4 h-4 text-[#3D4C35] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#556650] leading-relaxed">
                أي تعديل على المواعيد سيتم إرساله وتأكيده عبر بوابة مزامنة القنوات (Channel Manager) آلياً لمنع الحجوزات المزدوجة.
              </div>
            </div>
          </div>

          {/* Card 3: معاينة الوحدة (Unit Photo Preview) */}
          <div className="bg-white rounded-3xl p-3.5 border border-[#E2E6DC] space-y-3 shadow-2xs">
            <div className="relative h-44 rounded-2xl overflow-hidden group">
              <Image
                src="/properties/suite_204_interior.jpg"
                alt="جناح تنفيذي فاخر — عمارة النخيل"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5">
                <span className="text-white font-bold text-xs sm:text-sm tracking-wide">
                  جناح تنفيذي فاخر — عمارة النخيل
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#60705B] font-medium px-2 py-1">
              <span>المساحة: 120 م²</span>
              <span className="text-[#A4B3A0]">▪</span>
              <span>غرفة وصالة</span>
              <span className="text-[#A4B3A0]">▪</span>
              <span>إطلالة شمالية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Confirmation Bar */}
      <FloatingConfirmationBar
        noteText="جميع التعديلات تخضع لتوثيق فوري في سجل التدقيق ومزامنة الأقفال الرقمية."
        actions={[
          {
            label: "إلغاء",
            onClick: handleCancel,
            variant: "secondary",
          },
          {
            label: "حفظ التعديلات",
            onClick: handleSave,
            variant: "primary",
            icon: BookmarkCheck,
            iconPosition: "end",
            loading: isSaving,
            loadingText: "جارٍ الحفظ...",
          },
        ]}
      />

      {/* Modals */}
      <ChangeUnitModal
        isOpen={isChangeUnitOpen}
        onClose={() => setIsChangeUnitOpen(false)}
        bookingCode={bookingId}
        onConfirm={(newUnit) => setSelectedUnit(newUnit)}
      />

      <CancelBookingModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        bookingCode={bookingId}
      />
    </div>
  );
}
