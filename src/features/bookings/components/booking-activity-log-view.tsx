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

  // Helper for timeline circular badge matching Figma Node 1:12015/12055/12087/12128/12163
  const renderTimelineBadge = (type: BookingActivityEvent["timelineIconType"]) => {
    switch (type) {
      case "cancel":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <CalendarX className="w-5 h-5" />
          </div>
        );
      case "clock":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#D8E8CB] text-[#34422A] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <History className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case "message":
        return (
          <div className="size-[48px] rounded-[16px] bg-[rgba(216,232,203,0.6)] text-[#34422A] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Send className="w-4 h-4 -rotate-45 ms-0.5 stroke-[2.2]" />
          </div>
        );
      case "unit":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#E5EAE0] text-[#34422A] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Bed className="w-5 h-5 stroke-[2]" />
          </div>
        );
      case "create":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#34422A] text-white flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <CalendarCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      default:
        return (
          <div className="size-[48px] rounded-[16px] bg-[#D8E8CB] text-[#34422A] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Clock className="w-5 h-5 stroke-[2]" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-[1536px] w-full mx-auto" dir="rtl">
      {/* 1. Header Card (Figma Node 1:11881: Section - TOP HERO GREETING BAR) */}
      <section className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h1 className="text-[24px] font-bold font-cairo text-[#181D17] leading-[34px] tracking-tight">
            سجل نشاط الحجز
          </h1>
          <p className="text-[14px] text-[#454840] leading-[22px] max-w-2xl font-normal">
            التتبع الزمني الدقيق وسجل التدقيق الإداري لجميع التغييرات والعمليات المنفذة على الحجز
          </p>
        </div>

        {/* Action Buttons (Figma Node 1:11890) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Back Button (Node 1:11896) */}
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white hover:bg-[#F9FAF7] border border-[#E5E8E2] text-[#252A24] text-[14px] font-medium h-[42px] px-4 rounded-[12px] flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer select-none active:scale-98"
          >
            <span>العودة</span>
            <ArrowLeft className="w-3.5 h-3.5 text-[#252A24]" />
          </button>

          {/* Export PDF Button (Node 1:11891) */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="bg-[#4B5940] hover:bg-[#3D4B33] text-white text-[14px] font-medium h-[42px] px-5 rounded-[12px] flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all cursor-pointer select-none active:scale-98"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>تصدير سجل النشاط (PDF)</span>
          </button>
        </div>
      </section>

      {/* 2. Metadata Strip Card (Figma Node 1:11901: Immutable Telemetry & Booking Meta Strip) */}
      <section className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {/* Item 1: Booking Code (Figma Node 1:11947) */}
          <div className="flex items-center gap-3">
            <div className="size-[40px] rounded-[12px] bg-[#F1F5EB] flex items-center justify-center text-[#34422A] shrink-0">
              <Ticket className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-[11px] text-[#75786F] font-medium">رقم الحجز</div>
              <div className="text-[18px] font-bold font-mono text-[#181D17] leading-[28px]">
                {summary.bookingCode}
              </div>
            </div>
          </div>

          {/* Item 2: Property & Unit (Figma Node 1:11938) */}
          <div className="flex items-center gap-3">
            <div className="size-[40px] rounded-[12px] bg-[#F1F5EB] flex items-center justify-center text-[#34422A] shrink-0">
              <Building2 className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-[11px] text-[#75786F] font-medium">العقار والوحدة</div>
              <div className="text-[14px] font-semibold text-[#181D17] leading-[20px] truncate max-w-[130px]">
                {summary.propertyName} • {summary.unitNumber}
              </div>
            </div>
          </div>

          {/* Item 3: Guest Name (Figma Node 1:11929) */}
          <div className="flex items-center gap-3">
            <div className="size-[40px] rounded-[12px] bg-[#F1F5EB] flex items-center justify-center text-[#34422A] shrink-0">
              <User className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-[11px] text-[#75786F] font-medium">النزيل</div>
              <div className="text-[14px] font-semibold text-[#181D17] leading-[20px] truncate max-w-[130px]">
                {summary.guestName}
              </div>
            </div>
          </div>

          {/* Item 4: Total Amount (Figma Node 1:11920) */}
          <div className="flex items-center gap-3">
            <div className="size-[40px] rounded-[12px] bg-[#F1F5EB] flex items-center justify-center text-[#34422A] shrink-0">
              <Banknote className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-[11px] text-[#75786F] font-medium">إجمالي القيمة</div>
              <div className="text-[14px] font-bold text-[#181D17] leading-[20px]">
                {summary.totalAmount}
              </div>
            </div>
          </div>

          {/* Item 5: Owner Name (Figma Node 1:11911) */}
          <div className="flex items-center gap-3">
            <div className="size-[40px] rounded-[12px] bg-[#F1F5EB] flex items-center justify-center text-[#34422A] shrink-0">
              <UserCheck className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-[11px] text-[#75786F] font-medium">مالك العقار</div>
              <div className="text-[14px] font-semibold text-[#181D17] leading-[20px] truncate max-w-[130px]">
                {summary.ownerName}
              </div>
            </div>
          </div>

          {/* Item 6: Security Audit Badge (Figma Node 1:11903) */}
          <div className="bg-[rgba(216,232,203,0.4)] rounded-[12px] px-3.5 py-2 flex items-center gap-2.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#34422A] shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-[#34422A] leading-tight">
                سجل تدقيق محمي
              </div>
              <div className="text-[11px] font-medium text-[#54624C] leading-tight">
                غير قابل للتعديل
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Layout (Figma Node 1:11956: Timeline on Right, Sidebar on Left in RTL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL (lg:col-span-8): Interactive Filter Tabs + Timeline */}
        <div className="lg:col-span-8 space-y-5 order-1">
          {/* Filter Controls Strip (Figma Node 1:11958) */}
          <section className="bg-white rounded-[16px] p-4 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-3">
            {/* Activity Type Tabs (Node 1:11959) */}
            <div className="bg-[#F1F5EB] rounded-[12px] p-1 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
              {/* Tab: All */}
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`text-[11px] font-bold rounded-[8px] px-3.5 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "all"
                    ? "bg-white text-[#34422A] shadow-3xs"
                    : "text-[#454840] hover:bg-white/50"
                }`}
              >
                <span
                  className={`text-[10px] size-5 rounded-full flex items-center justify-center font-bold ${
                    selectedCategory === "all"
                      ? "bg-[#4B5940] text-white"
                      : "bg-[#E5EAE0] text-[#75786F]"
                  }`}
                >
                  5
                </span>
                <span>الكل</span>
              </button>

              {/* Tab: Assignment */}
              <button
                type="button"
                onClick={() => setSelectedCategory("assignment")}
                className={`text-[11px] font-medium rounded-[8px] px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "assignment"
                    ? "bg-white text-[#34422A] font-bold shadow-3xs"
                    : "text-[#454840] hover:bg-white/50"
                }`}
              >
                <span className="text-[#75786F]">2</span>
                <span>إنشاء وتعيين</span>
              </button>

              {/* Tab: Dates */}
              <button
                type="button"
                onClick={() => setSelectedCategory("dates")}
                className={`text-[11px] font-medium rounded-[8px] px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "dates"
                    ? "bg-white text-[#34422A] font-bold shadow-3xs"
                    : "text-[#454840] hover:bg-white/50"
                }`}
              >
                <span className="text-[#75786F]">1</span>
                <span>تعديل المواعيد</span>
              </button>

              {/* Tab: Messages */}
              <button
                type="button"
                onClick={() => setSelectedCategory("messages")}
                className={`text-[11px] font-medium rounded-[8px] px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "messages"
                    ? "bg-white text-[#34422A] font-bold shadow-3xs"
                    : "text-[#454840] hover:bg-white/50"
                }`}
              >
                <span className="text-[#75786F]">1</span>
                <span>رسائل وأتمتة</span>
              </button>

              {/* Tab: Cancellation */}
              <button
                type="button"
                onClick={() => setSelectedCategory("cancellation")}
                className={`text-[11px] font-medium rounded-[8px] px-3 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === "cancellation"
                    ? "bg-white text-[#34422A] font-bold shadow-3xs"
                    : "text-[#454840] hover:bg-white/50"
                }`}
              >
                <span className="text-[#75786F]">1</span>
                <span>إلغاء وتسوية</span>
              </button>

              {/* Refresh Button (Node 1:11961) */}
              <button
                type="button"
                onClick={handleRefresh}
                className="bg-transparent hover:bg-white/50 text-[#454840] rounded-[8px] px-3 py-1.5 text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer select-none ms-auto"
              >
                <RotateCcw
                  className={`w-3 h-3 text-[#454840] ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span>تحديث السجل</span>
              </button>
            </div>

            {/* Filter Subrow (Node 1:11991) */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-[11px]">
              <div className="flex flex-wrap items-center gap-2">
                {/* Actor Pill */}
                <div className="bg-[#F1F5EB] text-[#181D17] rounded-[12px] px-3 py-1.5 flex items-center gap-2 font-medium">
                  <Users className="w-3.5 h-3.5 text-[#75786F]" />
                  <span className="text-[#75786F]">بواسطة:</span>
                  <span className="font-semibold text-[#181D17]">كافة الفاعلين (الكل)</span>
                </div>

                {/* Date Range Pill */}
                <div className="bg-[#F1F5EB] text-[#181D17] rounded-[12px] px-3 py-1.5 flex items-center gap-2 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#75786F]" />
                  <span className="text-[#75786F]">التاريخ:</span>
                  <span className="font-semibold text-[#181D17]">15 - 18 سبتمبر 2026</span>
                </div>
              </div>

              {/* Sort Order Text */}
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-[#75786F] font-medium">ترتيب:</span>
                <span className="font-semibold text-[#34422A]">الأحدث أولاً (تنازلي)</span>
              </div>
            </div>
          </section>

          {/* Chronological Audit Timeline Container (Figma Node 1:12013) */}
          <div className="relative space-y-6 pt-1">
            {/* Structural Spine Line (Figma Node 1:12014) */}
            <div className="absolute top-6 bottom-6 start-6 w-[2px] bg-[#E5EAE0] z-0" />

            {/* Events List */}
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-5 relative z-10"
              >
                {/* Timeline Node Dot Indicator (Right side in RTL) */}
                <div className="shrink-0">{renderTimelineBadge(event.timelineIconType)}</div>

                {/* Event Card (Figma Event Card Node) */}
                <div className="flex-1 bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-3.5 hover:border-[#CCD5C5] transition-all">
                  {/* Top Row: Timestamp on left, Heading & Badge on right in RTL */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-[18px] font-bold font-cairo text-[#181D17] leading-[28px]">
                        {event.title}
                      </h3>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full select-none ${
                          event.categoryBadgeClass ||
                          "bg-[#E5EAE0] text-[#454840]"
                        }`}
                      >
                        {event.categoryBadge}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#75786F] font-medium flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#75786F]" />
                      <span>{event.timestamp}</span>
                    </div>
                  </div>

                  {/* Actor Stamp (Figma Node 1:12028 / 1:12068 / etc.) */}
                  <div className="flex items-center">
                    <div className="bg-[#F1F5EB] rounded-[12px] px-3 py-1.5 inline-flex items-center gap-2 text-[11px]">
                      {event.actor.type === "system" ? (
                        <div className="size-6 rounded-full bg-[#34422A] text-white flex items-center justify-center shrink-0">
                          <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full bg-[#34422A] text-white text-[11px] font-bold flex items-center justify-center shrink-0 font-cairo">
                          {event.actor.initials}
                        </div>
                      )}
                      <span className="font-semibold text-[#181D17]">
                        {event.actor.name}
                      </span>
                      <span className="text-[#75786F]">•</span>
                      <span className="text-[#454840] font-medium">
                        {event.actor.role}
                      </span>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <div className="text-[14px] text-[#454840] leading-[22.75px] font-normal">
                    {event.id === "evt-2" ? (
                      <p>
                        تعديل موعد تسجيل الدخول من{" "}
                        <span className="line-through text-[#75786F]">03:00 م</span>{" "}
                        إلى{" "}
                        <strong className="font-bold text-[#34422A]">02:00 م</strong>{" "}
                        تلبية لطلب النزيل المسبق عبر المحادثة المباشرة، وتحديث موعد تفعيل الكود الرقمي ومواعيد تنظيف الوحدة وفقاً لذلك.
                      </p>
                    ) : event.id === "evt-1" ? (
                      <p>
                        سبب الإلغاء:{" "}
                        <strong className="font-semibold text-[#181D17]">"طلب العميل المباشر"</strong>
                        . تم تحرير الوحدة 204 وإعادة إدراجها شاغرة في التقويم الموحّد، إلغاء صلاحية كود الدخول الذكي للباب رقم #4820، وبدء إجراءات التسوية المالية واسترداد المبلغ عبر بوابة الدفع.
                      </p>
                    ) : (
                      <p>{event.description}</p>
                    )}
                  </div>

                  {/* Footers Payload */}
                  {(event.footerLeft || event.footerRight || event.footerPills) && (
                    <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#75786F]">
                      {/* Left Side: Auth Ref or ID */}
                      {event.footerLeft && (
                        <div className="font-mono text-[12px] text-[#181D17] flex items-center gap-1.5">
                          <span>{event.footerLeft.text}</span>
                        </div>
                      )}

                      {/* Right Side: Financial Impact or Read Status or Occupancy */}
                      {event.footerRight && (
                        <div className="flex items-center gap-1.5 font-medium text-[11px] text-[#75786F]">
                          {event.footerRight.iconType === "check" && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#34422A]" />
                          )}
                          {event.footerRight.iconType === "read" && (
                            <CheckCheck className="w-3.5 h-3.5 text-[#34422A]" />
                          )}
                          {event.footerRight.iconType === "financial" && (
                            <Banknote className="w-3.5 h-3.5 text-[#75786F]" />
                          )}
                          <span>{event.footerRight.text}</span>
                        </div>
                      )}

                      {/* Double Pills for Event 5 (Figma Node 1:12192) */}
                      {event.footerPills && event.footerPills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 w-full pt-1">
                          {event.footerPills.map((pill, idx) => (
                            <div
                              key={idx}
                              className="bg-[#F1F5EB] text-[#454840] text-[11px] font-medium px-3 py-2 rounded-[12px] flex items-center gap-2"
                            >
                              {pill.iconType === "shield" && (
                                <ShieldCheck className="w-3.5 h-3.5 text-[#34422A]" />
                              )}
                              {pill.iconType === "bill" && (
                                <FileText className="w-3.5 h-3.5 text-[#34422A]" />
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
              <div className="bg-white rounded-[16px] p-12 text-center drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[#75786F] space-y-2">
                <Clock className="w-8 h-8 mx-auto text-[#A5B3A1]" />
                <p className="text-[14px] font-semibold">لا توجد أحداث مسجلة لهذا التصنيف حالياً</p>
              </div>
            )}
          </div>
        </div>

        {/* Left Column in RTL (lg:col-span-4): Audit Stats + Property Info (Figma Node 1:12206) */}
        <div className="lg:col-span-4 space-y-6 order-2">
          {/* Card A: Audit Statistics (Figma Node 1:12207: Card 2: Activity Breakdown Metrics) */}
          <section className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#34422A]" />
              <h2 className="text-[18px] font-bold font-cairo text-[#181D17]">
                إحصائيات التدقيق
              </h2>
            </div>

            {/* 3 KPI Boxes (Figma Node 1:12213) */}
            <div className="grid grid-cols-3 gap-2">
              {/* Box 1: Recorded Events (Node 1:12226) */}
              <div className="bg-[#F1F5EB] rounded-[12px] p-3 text-center flex flex-col items-center justify-center">
                <div className="text-[30px] font-bold font-cairo text-[#34422A] leading-[42px]">
                  {summary.totalEvents}
                </div>
                <div className="text-[11px] text-[#75786F] font-medium leading-[16px] mt-1">
                  أحداث مسجلة
                </div>
              </div>

              {/* Box 2: Unique Actors (Node 1:12220) */}
              <div className="bg-[#F1F5EB] rounded-[12px] p-3 text-center flex flex-col items-center justify-center">
                <div className="text-[30px] font-bold font-cairo text-[#54624C] leading-[42px]">
                  {summary.uniqueActors}
                </div>
                <div className="text-[11px] text-[#75786F] font-medium leading-[16px] mt-1">
                  فاعلين مختلفين
                </div>
              </div>

              {/* Box 3: Operational Errors (Node 1:12214) */}
              <div className="bg-[#F1F5EB] rounded-[12px] p-3 text-center flex flex-col items-center justify-center">
                <div className="text-[30px] font-bold font-cairo text-[#4B5940] leading-[42px]">
                  {summary.systemErrors}
                </div>
                <div className="text-[11px] text-[#75786F] font-medium leading-[16px] mt-1">
                  أخطاء تشغيل
                </div>
              </div>
            </div>

            {/* Sequence Integrity Meter (Figma Node 1:12232) */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#454840] font-semibold">سلامة تسلسل الأحداث</span>
                <span className="font-bold text-[#34422A]">{summary.integrityScore}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E5EAE0] overflow-hidden">
                <div className="h-full rounded-full bg-[#34422A] w-full" />
              </div>
            </div>
          </section>

          {/* Card B: Related Property Details (Figma Node 1:12240: Card 3: Property & Unit Context) */}
          <section className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold font-cairo text-[#181D17]">
                بيانات الأصل المعني
              </h2>
              <span className="text-[11px] text-[#34422A] font-semibold select-none">
                {summary.propertyDetails.status}
              </span>
            </div>

            {/* Property Image & Info (Figma Node 1:12246) */}
            <div className="flex items-center gap-3">
              {/* Info on Right */}
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[#181D17] truncate">
                  {summary.propertyDetails.name}
                </div>
                <div className="text-[13px] text-[#75786F] truncate">
                  {summary.propertyDetails.address}
                </div>
                <div className="text-[11px] text-[#54624C] font-semibold pt-0.5">
                  {summary.propertyDetails.unitSpec}
                </div>
              </div>

              {/* Thumbnail on Left in RTL */}
              <div className="size-[64px] rounded-[12px] overflow-hidden relative border border-[#E2E6DC] shrink-0 bg-[#F1F5EB]">
                <Image
                  src={summary.propertyDetails.image}
                  alt={summary.propertyDetails.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>

            {/* Bottom Link (Figma Node 1:12257) */}
            <div className="pt-2">
              <Link
                href="/dashboard/properties/1/activity"
                className="text-[11px] font-bold text-[#34422A] hover:underline inline-flex items-center gap-1.5 transition-colors cursor-pointer select-none"
              >
                <span>عرض سجل الأحداث الكامل للعقار</span>
                <ArrowLeft className="w-3 h-3 text-[#34422A]" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
