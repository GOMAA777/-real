"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileDown,
  Ticket,
  Building2,
  User,
  Banknote,
  UserCheck,
  ShieldCheck,
  BarChart3,
  Calendar,
  Users,
  RotateCcw,
  Clock,
  CalendarX,
  History,
  Send,
  Bed,
  CalendarCheck,
  CheckCheck,
  CheckCircle2,
  FileText,
  Bot,
  Laptop,
} from "lucide-react";
import { toast } from "sonner";
import {
  BookingActivityEvent,
  BookingActivitySummary,
  ActivityCategory,
} from "../types/activity";
import {
  defaultBookingActivityEvents,
  defaultBookingActivitySummary,
} from "../data/mock-booking-activity-log";

interface BookingActivityLogViewProps {
  initialSummary?: BookingActivitySummary;
  initialEvents?: BookingActivityEvent[];
}

export function BookingActivityLogView({
  initialSummary = defaultBookingActivitySummary,
  initialEvents = defaultBookingActivityEvents,
}: BookingActivityLogViewProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ActivityCategory>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const summary = initialSummary;

  // Filter events based on active category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === "all") return initialEvents;
    return initialEvents.filter((ev) => ev.category === selectedCategory);
  }, [initialEvents, selectedCategory]);

  // Handle export PDF
  const handleExportPDF = () => {
    toast.info("جاري إنشاء ملف PDF وتصدير سجل التدقيق الشامل للحجز...");
    setTimeout(() => {
      toast.success("تم تصدير سجل نشاط الحجز (PDF) بنجاح!");
    }, 1200);
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث سجل النشاط وأحدث العمليات بنجاح!");
    }, 600);
  };

  // Helper for timeline circular badge
  const renderTimelineBadge = (type: BookingActivityEvent["timelineIconType"]) => {
    switch (type) {
      case "cancel":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#FEE4E2] border border-[#FECDCA] text-[#D9383A] flex items-center justify-center shrink-0 shadow-2xs">
            <CalendarX className="w-6 h-6" />
          </div>
        );
      case "clock":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#384633] flex items-center justify-center shrink-0 shadow-2xs">
            <History className="w-6 h-6" />
          </div>
        );
      case "message":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#384633] flex items-center justify-center shrink-0 shadow-2xs">
            <Send className="w-5 h-5 -rotate-45 ms-0.5" />
          </div>
        );
      case "unit":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#384633] flex items-center justify-center shrink-0 shadow-2xs">
            <Bed className="w-6 h-6" />
          </div>
        );
      case "create":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <CalendarCheck className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#384633] flex items-center justify-center shrink-0 shadow-2xs">
            <Clock className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-[1536px] w-full mx-auto" dir="rtl">
      {/* 1. Header Card */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E2E6DC] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title and Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
            سجل نشاط الحجز
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium leading-relaxed max-w-2xl">
            التتبع الزمني الدقيق وسجل التدقيق الإداري لجميع التغييرات والعمليات المنفذة على الحجز
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white hover:bg-[#F6F8F4] border border-[#E2E6DC] text-[#172115] text-xs sm:text-sm font-semibold rounded-xl px-4 py-2.5 flex items-center gap-2 transition-all cursor-pointer shadow-2xs select-none active:scale-[0.98]"
          >
            <span>العودة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="bg-[#384633] hover:bg-[#2E3C29] text-white text-xs sm:text-sm font-semibold rounded-xl px-4 py-2.5 flex items-center gap-2 transition-all cursor-pointer shadow-xs select-none active:scale-[0.98]"
          >
            <FileDown className="w-4 h-4" />
            <span>تصدير سجل النشاط (PDF)</span>
          </button>
        </div>
      </section>

      {/* 2. Metadata Strip Card */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E6DC] shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {/* Item 1: Booking Code */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-[#7D8A78] font-medium">رقم الحجز</div>
              <div className="text-base sm:text-lg font-bold text-[#172115] tracking-tight">
                {summary.bookingCode}
              </div>
            </div>
          </div>

          {/* Item 2: Property & Unit */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-[#7D8A78] font-medium">العقار والوحدة</div>
              <div className="text-sm sm:text-base font-bold text-[#172115] truncate max-w-[130px]">
                {summary.propertyName} • {summary.unitNumber}
              </div>
            </div>
          </div>

          {/* Item 3: Guest Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-[#7D8A78] font-medium">النزيل</div>
              <div className="text-sm sm:text-base font-bold text-[#172115] truncate max-w-[130px]">
                {summary.guestName}
              </div>
            </div>
          </div>

          {/* Item 4: Total Amount */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-[#7D8A78] font-medium">إجمالي القيمة</div>
              <div className="text-sm sm:text-base font-bold text-[#172115]">
                {summary.totalAmount}
              </div>
            </div>
          </div>

          {/* Item 5: Owner Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-[#7D8A78] font-medium">مالك العقار</div>
              <div className="text-sm sm:text-base font-bold text-[#172115] truncate max-w-[130px]">
                {summary.ownerName}
              </div>
            </div>
          </div>

          {/* Item 6: Security Audit Badge */}
          <div className="flex items-center gap-2.5 bg-[#EFF4EA] border border-[#DEE7D7] rounded-2xl px-3.5 py-2">
            <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#172115] leading-tight">
                سجل تدقيق محمي
              </div>
              <div className="text-[10px] text-[#7D8A78] font-medium">
                غير قابل للتعديل
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (lg:col-span-4): Audit Stats + Property Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card A: Audit Statistics (إحصائيات التدقيق) */}
          <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFF4EA] flex items-center justify-center text-[#34432E] shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                إحصائيات التدقيق
              </h2>
            </div>

            {/* 3 KPI Boxes */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Box 1: Recorded Events */}
              <div className="bg-[#EFF4EA] rounded-2xl p-3 text-center border border-[#DEE7D7]/60">
                <div className="text-2xl font-black text-[#172115]">
                  {summary.totalEvents}
                </div>
                <div className="text-[11px] text-[#7D8A78] font-medium mt-1 leading-tight">
                  أحداث مسجلة
                </div>
              </div>

              {/* Box 2: Unique Actors */}
              <div className="bg-[#EFF4EA] rounded-2xl p-3 text-center border border-[#DEE7D7]/60">
                <div className="text-2xl font-black text-[#172115]">
                  {summary.uniqueActors}
                </div>
                <div className="text-[11px] text-[#7D8A78] font-medium mt-1 leading-tight">
                  فاعلين مختلفين
                </div>
              </div>

              {/* Box 3: Operational Errors */}
              <div className="bg-[#EFF4EA] rounded-2xl p-3 text-center border border-[#DEE7D7]/60">
                <div className="text-2xl font-black text-[#172115]">
                  {summary.systemErrors}
                </div>
                <div className="text-[11px] text-[#7D8A78] font-medium mt-1 leading-tight">
                  أخطاء تشغيل
                </div>
              </div>
            </div>

            {/* Sequence Integrity Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7D8A78] font-medium">سلامة تسلسل الأحداث</span>
                <span className="font-bold text-[#172115]">{summary.integrityScore}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2E6DC] overflow-hidden">
                <div className="h-full rounded-full bg-[#34432E] w-full" />
              </div>
            </div>
          </section>

          {/* Card B: Related Property Details (بيانات الأصل المعني) */}
          <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                بيانات الأصل المعني
              </h2>
              <span className="text-[11px] text-[#4E5D49] bg-[#EFF4EA] px-2.5 py-0.5 rounded-full border border-[#DEE7D7] font-semibold select-none">
                {summary.propertyDetails.status}
              </span>
            </div>

            {/* Property Image & Info */}
            <div className="flex items-center gap-3.5">
              {/* Info on Right */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="text-sm font-bold text-[#172115] truncate">
                  {summary.propertyDetails.name}
                </div>
                <div className="text-xs text-[#7D8A78] truncate">
                  {summary.propertyDetails.address}
                </div>
                <div className="text-xs text-[#4E5D49] font-medium">
                  {summary.propertyDetails.unitSpec}
                </div>
              </div>

              {/* Thumbnail on Left */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-[#E2E6DC] shrink-0 bg-[#EFF4EA]">
                <Image
                  src={summary.propertyDetails.image}
                  alt={summary.propertyDetails.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>

            {/* Bottom Link */}
            <div className="pt-2 border-t border-[#F0F2EC]">
              <Link
                href="/dashboard/properties/1/activity"
                className="text-xs font-bold text-[#172115] hover:text-[#384633] inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
              >
                <span>عرض سجل الأحداث الكامل للعقار</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* Right Column (lg:col-span-8): Interactive Filter Tabs + Timeline */}
        <div className="lg:col-span-8 space-y-5">
          {/* Filter Tabs Bar */}
          <section className="bg-white rounded-2xl p-2 sm:p-2.5 border border-[#E2E6DC] shadow-2xs flex flex-wrap items-center justify-between gap-2">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              {/* Tab: All */}
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`text-xs font-bold rounded-xl px-3.5 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "all"
                    ? "bg-[#2E3C29] text-white shadow-xs"
                    : "text-[#4E5D49] hover:bg-[#EFF4EA]"
                }`}
              >
                <span>الكل</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedCategory === "all"
                      ? "bg-white/20 text-white"
                      : "bg-[#EFF4EA] text-[#4E5D49]"
                  }`}
                >
                  5
                </span>
              </button>

              {/* Tab: Assignment */}
              <button
                type="button"
                onClick={() => setSelectedCategory("assignment")}
                className={`text-xs font-bold rounded-xl px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "assignment"
                    ? "bg-[#2E3C29] text-white shadow-xs"
                    : "text-[#4E5D49] hover:bg-[#EFF4EA]"
                }`}
              >
                <span>إنشاء وتعيين</span>
                <span className="text-[11px] text-[#7D8A78]">2</span>
              </button>

              {/* Tab: Dates */}
              <button
                type="button"
                onClick={() => setSelectedCategory("dates")}
                className={`text-xs font-bold rounded-xl px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "dates"
                    ? "bg-[#2E3C29] text-white shadow-xs"
                    : "text-[#4E5D49] hover:bg-[#EFF4EA]"
                }`}
              >
                <span>تعديل المواعيد</span>
                <span className="text-[11px] text-[#7D8A78]">1</span>
              </button>

              {/* Tab: Messages */}
              <button
                type="button"
                onClick={() => setSelectedCategory("messages")}
                className={`text-xs font-bold rounded-xl px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "messages"
                    ? "bg-[#2E3C29] text-white shadow-xs"
                    : "text-[#4E5D49] hover:bg-[#EFF4EA]"
                }`}
              >
                <span>رسائل وأتمتة</span>
                <span className="text-[11px] text-[#7D8A78]">1</span>
              </button>

              {/* Tab: Cancellation */}
              <button
                type="button"
                onClick={() => setSelectedCategory("cancellation")}
                className={`text-xs font-bold rounded-xl px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "cancellation"
                    ? "bg-[#2E3C29] text-white shadow-xs"
                    : "text-[#4E5D49] hover:bg-[#EFF4EA]"
                }`}
              >
                <span>إلغاء وتسوية</span>
                <span className="text-[11px] text-[#7D8A78]">1</span>
              </button>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={handleRefresh}
              className="bg-[#EFF4EA] hover:bg-[#E2EAD8] text-[#34432E] rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer select-none"
            >
              <RotateCcw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>تحديث السجل</span>
            </button>
          </section>

          {/* Sub-Filters / Meta Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 px-1 text-xs text-[#7D8A78]">
            <div className="flex flex-wrap items-center gap-2">
              {/* Actor Pill */}
              <div className="bg-[#EFF4EA]/80 border border-[#DEE7D7] text-[#4E5D49] rounded-xl px-3 py-1.5 flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-[#34432E]" />
                <span>بواسطة: كافة الفاعلين (الكل)</span>
              </div>

              {/* Date Pill */}
              <div className="bg-[#EFF4EA]/80 border border-[#DEE7D7] text-[#4E5D49] rounded-xl px-3 py-1.5 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#34432E]" />
                <span>التاريخ: 15 - 18 سبتمبر 2026</span>
              </div>
            </div>

            {/* Order Text */}
            <div className="text-xs font-medium text-[#7D8A78]">
              ترتيب: الأحدث أولاً (تنازلي)
            </div>
          </div>

          {/* Timeline Events List */}
          <div className="space-y-6 pt-1">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 transition-all"
              >
                {/* Timeline Circular Icon Badge (Right side in RTL) */}
                <div className="pt-2">{renderTimelineBadge(event.timelineIconType)}</div>

                {/* Event Card (Left side in RTL) */}
                <div className="flex-1 bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-4 hover:border-[#CCD5C5] transition-all">
                  {/* Top Row: Title + Category Badge + Timestamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-bold text-[#172115]">
                        {event.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full select-none ${
                          event.categoryBadgeClass ||
                          "bg-[#EFF4EA] text-[#4E5D49] border border-[#DEE7D7]"
                        }`}
                      >
                        {event.categoryBadge}
                      </span>
                    </div>

                    <div className="text-xs text-[#7D8A78] font-medium flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.timestamp}</span>
                    </div>
                  </div>

                  {/* Actor Pill */}
                  <div className="flex items-center">
                    <div className="bg-[#EFF4EA] border border-[#DEE7D7]/70 rounded-full py-1 px-3 inline-flex items-center gap-2">
                      {event.actor.type === "system" ? (
                        <div className="w-6 h-6 rounded-full bg-[#2E3C29] text-white flex items-center justify-center shrink-0">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#2E3C29] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {event.actor.initials}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-[#172115]">
                        {event.actor.name}
                      </span>
                      <span className="text-xs text-[#7D8A78] font-normal">
                        • {event.actor.role}
                      </span>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-[#384633] leading-relaxed font-normal">
                    {event.description}
                  </p>

                  {/* Optional Footers */}
                  {(event.footerLeft || event.footerRight || event.footerPills) && (
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#7D8A78]">
                      {/* Left Side: Auth Ref or ID */}
                      {event.footerLeft && (
                        <div className="font-mono text-xs text-[#7D8A78] flex items-center gap-1.5">
                          <span>{event.footerLeft.text}</span>
                        </div>
                      )}

                      {/* Right Side: Financial Impact or Read Status or Occupancy */}
                      {event.footerRight && (
                        <div className="flex items-center gap-1.5 font-medium text-xs text-[#4E5D49]">
                          {event.footerRight.iconType === "check" && (
                            <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                          )}
                          {event.footerRight.iconType === "read" && (
                            <CheckCheck className="w-4 h-4 text-[#2E7D32]" />
                          )}
                          {event.footerRight.iconType === "financial" && (
                            <Banknote className="w-4 h-4 text-[#7D8A78]" />
                          )}
                          <span>{event.footerRight.text}</span>
                        </div>
                      )}

                      {/* Double Pills for Event 5 */}
                      {event.footerPills && event.footerPills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2.5 w-full">
                          {event.footerPills.map((pill, idx) => (
                            <div
                              key={idx}
                              className="bg-[#EFF4EA] text-[#34432E] text-xs font-medium px-3 py-1.5 rounded-xl border border-[#DEE7D7]/60 flex items-center gap-1.5"
                            >
                              {pill.iconType === "shield" && (
                                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                              )}
                              {pill.iconType === "bill" && (
                                <FileText className="w-3.5 h-3.5 text-[#34432E]" />
                              )}
                              <span>{pill.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredEvents.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E6DC] text-[#7D8A78] space-y-2">
                <Clock className="w-8 h-8 mx-auto text-[#A5B3A1]" />
                <p className="text-sm font-semibold">لا توجد أحداث مسجلة لهذا التصنيف حالياً</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
