"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileDown,
  Building2,
  MapPin,
  User,
  DoorClosed,
  ExternalLink,
  X,
  Clock,
  Pencil,
  Smartphone,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Wrench,
  CheckCheck,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import {
  PropertyActivityEvent,
  PropertyActivitySummary,
} from "../types/activity";
import {
  defaultPropertyActivityEvents,
  defaultPropertyActivitySummary,
} from "../data/mock-property-activity-log";

interface PropertyActivityLogViewProps {
  initialSummary?: PropertyActivitySummary;
  initialEvents?: PropertyActivityEvent[];
  propertyId?: string;
}

export function PropertyActivityLogView({
  initialSummary = defaultPropertyActivitySummary,
  initialEvents = defaultPropertyActivityEvents,
  propertyId = "1",
}: PropertyActivityLogViewProps) {
  const router = useRouter();
  const [selectedEventId, setSelectedEventId] = useState<string>("prop-evt-1");
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const summary = initialSummary;
  const events = initialEvents;

  // Selected event for the left inspector
  const activeEvent =
    events.find((e) => e.id === selectedEventId) || events[0];

  const handleExportPDF = () => {
    toast.info("جاري تجهيز وتصدير سجل النشاط (PDF)...");
    setTimeout(() => {
      toast.success("تم تصدير سجل نشاط العقار (PDF) بنجاح!");
    }, 1200);
  };

  const renderBadgeIcon = (iconType: PropertyActivityEvent["iconType"], isActive: boolean) => {
    if (isActive) {
      return (
        <div className="size-[48px] rounded-[16px] bg-[#34422a] text-white flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
          <Pencil className="size-[15px]" />
        </div>
      );
    }

    switch (iconType) {
      case "door":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#d8e8cb] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <DoorClosed className="size-[15px]" />
          </div>
        );
      case "mobile":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#e2edd8] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Smartphone className="size-[15px]" />
          </div>
        );
      case "refresh":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#e2edd8] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <RefreshCw className="size-[15px]" />
          </div>
        );
      case "whatsapp":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#e2edd8] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <MessageSquare className="size-[15px]" />
          </div>
        );
      case "cleaning":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#e2edd8] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Sparkles className="size-[15px]" />
          </div>
        );
      case "maintenance":
        return (
          <div className="size-[48px] rounded-[16px] bg-[#e2edd8] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Wrench className="size-[15px]" />
          </div>
        );
      default:
        return (
          <div className="size-[48px] rounded-[16px] bg-[#e2edd8] text-[#34422a] flex items-center justify-center shrink-0 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Clock className="size-[15px]" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-[16px] max-w-[1536px] w-full mx-auto" dir="rtl">
      {/* 1. Header Card (Section - TOP HERO GREETING BAR) */}
      <section className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-[20px] py-[16px] sm:px-[24px] sm:py-[20px] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[4px]">
          <h1 className="text-[24px] font-bold text-[#181d17] leading-[34px]">
            سجل الأحداث الكامل للعقار
          </h1>
          <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
            تتبع غير قابل للتلاعب لكافة التغييرات والعمليات المنفذة على الأصل العقاري
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-[12px] shrink-0">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white hover:bg-[#f6f8f4] border border-[#e5e8e2] rounded-[12px] px-[17px] py-[11px] flex items-center gap-[8px] transition-colors cursor-pointer select-none active:scale-[0.98]"
          >
            <span className="text-[#252a24] text-[14px] font-medium leading-[20px]">
              العودة
            </span>
            <ArrowLeft className="size-[14px] text-[#252a24]" />
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="bg-[#4b5940] hover:bg-[#3d4934] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] px-[20px] py-[10px] flex items-center gap-[8px] transition-colors cursor-pointer select-none active:scale-[0.98]"
          >
            <FileDown className="size-[15px] text-white" />
            <span className="text-white text-[14px] font-medium leading-[20px]">
              تصدير سجل النشاط (PDF)
            </span>
          </button>
        </div>
      </section>

      {/* 2. Property Context Banner */}
      <section className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] px-[20px] py-[16px] sm:px-[24px] sm:py-[18px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Right Section: Property Title, Category, Address */}
        <div className="flex items-center gap-[16px]">
          <div className="size-[48px] rounded-[8px] bg-[#d8e8cb] flex items-center justify-center text-[#34422a] shrink-0">
            <Building2 className="size-[20px]" />
          </div>
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center gap-[8px] flex-wrap">
              <span className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                {summary.propertyName}
              </span>
              <span className="bg-[#ebefe6] text-[#75786f] text-[11px] font-medium px-[10px] py-[2px] rounded-full select-none">
                {summary.propertyType}
              </span>
            </div>
            <div className="flex items-center gap-[4px] text-[13px] text-[#75786f] font-normal leading-[20px]">
              <MapPin className="size-[12px] text-[#75786f] shrink-0" />
              <span>{summary.address}</span>
            </div>
          </div>
        </div>

        {/* Left Section: Owner & Units Info */}
        <div className="flex flex-wrap items-center gap-[24px] border-t lg:border-t-0 pt-3 lg:pt-0 border-[#ebefe6]">
          {/* Units Info */}
          <div className="flex items-center gap-[8px]">
            <DoorClosed className="size-[15px] text-[#75786f]" />
            <span className="text-[13px] text-[#75786f] font-normal leading-[20px]">الوحدات:</span>
            <span className="text-[13px] text-[#181d17] font-semibold leading-[20px]">{summary.totalUnits} وحدة</span>
            <span className="text-[11px] text-[#3e8a5a] font-semibold leading-[16px]">({summary.documentedPercentage})</span>
          </div>

          <div className="w-px h-[20px] bg-[#ebefe6] hidden sm:block" />

          {/* Owner Info */}
          <div className="flex items-center gap-[8px]">
            <User className="size-[12px] text-[#75786f]" />
            <span className="text-[13px] text-[#75786f] font-normal leading-[20px]">المالك:</span>
            <span className="text-[13px] text-[#181d17] font-semibold leading-[20px]">{summary.ownerName}</span>
            <span className="text-[11px] text-[#c5c8bd] font-normal leading-[16px]">({summary.ownerCode})</span>
          </div>
        </div>
      </section>

      {/* 3. Main Two-Column Layout (Right in RTL: Timeline, Left in RTL: Event Details Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start pt-[4px]">
        {/* Right Column in RTL (lg:col-span-8): Timeline Events List */}
        <div className="lg:col-span-8 space-y-[24px]">
          {/* Chronological Audit Timeline Container */}
          <div className="relative pl-[8px] pr-[16px] py-[8px]">
            {/* Structural Spine Line */}
            <div className="absolute bg-[#e5eae0] top-[24px] bottom-[24px] right-[40px] -translate-x-1/2 w-[2px] pointer-events-none" />

            {/* Events List */}
            <div className="space-y-[24px]">
              {events.map((event) => {
                const isActive = selectedEventId === event.id;

                return (
                  <div
                    key={event.id}
                    className="flex gap-[20px] items-start w-full relative z-10"
                  >
                    {/* Node Dot Indicator on the Right in RTL */}
                    <div
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setIsInspectorOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      {renderBadgeIcon(event.iconType, isActive)}
                    </div>

                    {/* Event Card on the Left in RTL */}
                    <div
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setIsInspectorOpen(true);
                      }}
                      className={`flex-1 min-w-0 bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] transition-all cursor-pointer ${
                        event.diffInline && event.actor
                          ? "p-[24px] flex flex-col gap-[12px]"
                          : "p-[16px] flex items-center justify-between"
                      } ${
                        isActive
                          ? "ring-1 ring-[#34422a] border border-[#34422a]"
                          : "border border-transparent hover:border-[#e5eae0]"
                      }`}
                    >
                      {/* Event 1: Special Detailed Diff Card */}
                      {event.diffInline && event.actor ? (
                        <>
                          {/* Top Row: Title + Timestamp */}
                          <div className="flex items-center justify-between w-full">
                            <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-[8px] text-[11px] font-medium text-[#75786f] leading-[16px] shrink-0">
                              <Clock className="size-[13px] text-[#75786f]" />
                              <span>{event.timestamp}</span>
                            </div>
                          </div>

                          {/* Actor Stamp Pill */}
                          <div className="bg-[#f1f5eb] rounded-[12px] px-[12px] py-[6px] inline-flex items-center gap-[8px] self-start">
                            <div className="size-[24px] rounded-full bg-[#34422a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                              {event.actor.initials}
                            </div>
                            <span className="text-[11px] font-semibold text-[#181d17] leading-[16px]">
                              {event.actor.name}
                            </span>
                            <span className="text-[12px] text-[#75786f]">•</span>
                            <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                              {event.actor.role}
                            </span>
                          </div>

                          {/* Detail & Operational Impact */}
                          {event.description && (
                            <p className="text-[14px] leading-[22.75px] text-right text-[#454840]">
                              <span>سبب الإلغاء: </span>
                              <span className="font-semibold text-[#181d17]">"طلب العميل المباشر"</span>
                              <span>
                                . تم تحرير الوحدة 204 وإعادة إدراجها شاغرة في التقويم الموحّد، إلغاء صلاحية كود الدخول الذكي للباب رقم #4820، وبدء إجراءات التسوية المالية واسترداد المبلغ عبر بوابة الدفع.
                              </span>
                            </p>
                          )}

                          {/* Compact Diff Strip */}
                          <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex items-center justify-between w-full gap-2">
                            {/* Right: Values */}
                            <div className="flex items-center gap-[8px] flex-wrap">
                              <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                                {event.diffInline.label}
                              </span>
                              <span className="text-[11px] font-medium text-[#75786f] line-through leading-[16px]">
                                {event.diffInline.oldValue}
                              </span>
                              <ChevronLeft className="size-[12px] text-[#75786f]" />
                              <span className="bg-[#eaf1e8] rounded-[4px] px-[8px] py-[2px] text-[11px] font-bold text-[#1e281a] leading-[16px]">
                                {event.diffInline.newValue}
                              </span>
                            </div>

                            {/* Left: Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEventId(event.id);
                                setIsInspectorOpen(true);
                              }}
                              className="flex items-center gap-[4px] text-[#34422a] text-[11px] font-bold hover:underline cursor-pointer shrink-0"
                            >
                              <span>{event.actionButtonText || "عرض التفاصيل"}</span>
                              <ChevronLeft className="size-[12px]" />
                            </button>
                          </div>
                        </>
                      ) : (
                        /* Standard Timeline Event Card */
                        <>
                          {/* Right Content */}
                          <div className="flex flex-col gap-[2px]">
                            {/* Top Line: Title + Badge + Time */}
                            <div className="flex items-center gap-[8px] flex-wrap">
                              <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                                {event.title}
                              </h3>

                              {/* Badge */}
                              <span
                                className={`rounded-[6px] px-[8px] py-[2px] text-[11px] font-semibold leading-[22px] select-none ${
                                  event.badgeType === "owner"
                                    ? "bg-[#f5f1e8] text-[#4b5940]"
                                    : event.iconType === "whatsapp"
                                    ? "bg-[#eaf1e8] text-[#3e8a5a]"
                                    : "bg-[#ebefe6] text-[#454840]"
                                }`}
                              >
                                {event.badge}
                              </span>

                              {/* Time */}
                              <span className="text-[11px] font-normal text-[#75786f] leading-[16px]">
                                {event.timeOnly || event.timestamp}
                              </span>
                            </div>

                            {/* Bottom Line: Details */}
                            <div className="flex items-center gap-[8px] flex-wrap text-[13px] leading-[20px]">
                              {event.unitCode && (
                                <span className="font-semibold text-[#181d17]">
                                  {event.unitCode}
                                </span>
                              )}

                              {event.bookingCode && (
                                <span className="font-bold text-[#34422a]">
                                  {event.bookingCode}
                                </span>
                              )}

                              {event.bookingCode && <span className="text-[#454840]">•</span>}

                              {event.subtitleText && (
                                <span className="text-[#454840] font-normal">
                                  {event.subtitleText}
                                </span>
                              )}

                              {event.diffInline && (
                                <div className="flex items-center gap-[6px]">
                                  <span className="text-[#75786f] line-through font-normal">
                                    {event.diffInline.oldValue}
                                  </span>
                                  <ChevronLeft className="size-[10px] text-[#75786f]" />
                                  <span className="text-[#3e8a5a] font-bold">
                                    {event.diffInline.newValue}
                                  </span>
                                </div>
                              )}

                              {event.highlightedText && !event.diffInline && (
                                <>
                                  <span className="text-[#454840]">•</span>
                                  <span
                                    className={`font-semibold inline-flex items-center gap-1 ${
                                      event.highlightedColor || "text-[#3e8a5a]"
                                    }`}
                                  >
                                    {event.iconType === "whatsapp" && (
                                      <CheckCheck className="size-[14px] text-[#3e8a5a]" />
                                    )}
                                    <span>{event.highlightedText}</span>
                                  </span>
                                </>
                              )}

                              {event.taskStatus && (
                                <>
                                  <span className="text-[#454840]">•</span>
                                  <span
                                    className={`rounded-[4px] px-[8px] text-[11px] font-semibold leading-[20px] select-none ${
                                      event.statusBadgeColor || "bg-[#fff4e5] text-[#e99a38]"
                                    }`}
                                  >
                                    {event.taskStatus}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Left Action Button */}
                          {event.actionButtonText && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEventId(event.id);
                                setIsInspectorOpen(true);
                              }}
                              className="bg-[#f1f5eb] hover:bg-[#e6ebdf] rounded-[12px] px-[12px] py-[6px] text-[#181d17] text-[12px] font-medium leading-[18px] transition-colors cursor-pointer select-none shrink-0"
                            >
                              {event.actionButtonText}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Minimalist Pagination Bar */}
          <div className="bg-white border border-[#ebefe6] rounded-[16px] p-[9px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs">
            {/* Right: Record count */}
            <div className="text-[13px] font-normal text-[#454840] leading-[20px] pr-2">
              عرض 1–8 من إجمالي 386 حدثاً
            </div>

            {/* Left: Pagination Buttons */}
            <div className="flex items-center gap-[4px] self-center sm:self-auto">
              {/* Next / التالي */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(20, p + 1))}
                className="bg-[#f1f5eb] hover:bg-[#e4ebd9] rounded-[8px] px-[12px] py-[4px] text-[11px] font-medium text-[#181d17] leading-[16px] transition-colors cursor-pointer"
              >
                التالي
              </button>

              {/* Page 20 */}
              <button
                type="button"
                onClick={() => setCurrentPage(20)}
                className={`size-[28px] rounded-[8px] flex items-center justify-center text-[11px] font-medium leading-[16px] transition-colors cursor-pointer ${
                  currentPage === 20
                    ? "bg-[#34422a] text-white font-bold"
                    : "text-[#181d17] hover:bg-[#f1f5eb]"
                }`}
              >
                20
              </button>

              {/* Ellipsis */}
              <span className="text-[#75786f] text-[14px] px-[4px] select-none">
                ...
              </span>

              {/* Page 3 */}
              <button
                type="button"
                onClick={() => setCurrentPage(3)}
                className={`size-[28px] rounded-[8px] flex items-center justify-center text-[11px] font-medium leading-[16px] transition-colors cursor-pointer ${
                  currentPage === 3
                    ? "bg-[#34422a] text-white font-bold"
                    : "text-[#181d17] hover:bg-[#f1f5eb]"
                }`}
              >
                3
              </button>

              {/* Page 2 */}
              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                className={`size-[28px] rounded-[8px] flex items-center justify-center text-[11px] font-medium leading-[16px] transition-colors cursor-pointer ${
                  currentPage === 2
                    ? "bg-[#34422a] text-white font-bold"
                    : "text-[#181d17] hover:bg-[#f1f5eb]"
                }`}
              >
                2
              </button>

              {/* Page 1 */}
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className={`size-[28px] rounded-[8px] flex items-center justify-center text-[11px] font-medium leading-[16px] transition-colors cursor-pointer ${
                  currentPage === 1
                    ? "bg-[#34422a] text-white font-bold"
                    : "text-[#181d17] hover:bg-[#f1f5eb]"
                }`}
              >
                1
              </button>

              {/* Previous / السابق */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="bg-[#f1f5eb] hover:bg-[#e4ebd9] opacity-60 rounded-[8px] px-[12px] py-[4px] text-[11px] font-medium text-[#181d17] leading-[16px] transition-colors cursor-pointer"
              >
                السابق
              </button>
            </div>
          </div>
        </div>

        {/* Left Column in RTL (lg:col-span-4): Streamlined Event Details Inspector Drawer */}
        <div className="lg:col-span-4 space-y-6">
          {isInspectorOpen ? (
            <section className="bg-white border border-[#ebefe6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[17px] flex flex-col gap-[16px] w-full">
              {/* Header */}
              <div className="border-b border-[#ebefe6] pb-[10px] flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  <div className="bg-[#34422a] size-[8px] rounded-full shrink-0" />
                  <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                    تفاصيل الحدث
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-1 rounded-[8px] text-[#75786f] hover:text-[#181d17] hover:bg-[#f1f5eb] transition-colors cursor-pointer"
                  title="إغلاق التفاصيل"
                >
                  <X className="size-[14px]" />
                </button>
              </div>

              {/* Structured Clean Metadata Pairs */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[8px] flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#75786f]">نوع الإجراء</span>
                  <span className="text-[11px] font-semibold text-[#181d17]">
                    {activeEvent.detailsData?.actionType || "تعديل بيانات الأصل"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#75786f]">المنفذ</span>
                  <span className="text-[11px] font-semibold text-[#34422a]">
                    {activeEvent.detailsData?.performer || "محمد أحمد (مدير المنصة)"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#75786f]">التاريخ والتوقيت</span>
                  <span className="text-[11px] font-normal text-[#181d17]">
                    {activeEvent.detailsData?.dateTime || "18/09/2026 11:42 AM"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#75786f]">الكيان</span>
                  <span className="text-[11px] font-semibold text-[#181d17]">
                    {activeEvent.detailsData?.entity || "عمارة النخيل (PR-1048)"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#75786f]">المصدر</span>
                  <span className="text-[11px] font-medium text-[#181d17]">
                    {activeEvent.detailsData?.source || "لوحة الإدارة المركزية"}
                  </span>
                </div>
              </div>

              {/* Comparative Diff Box */}
              <div className="flex flex-col gap-[6px] w-full">
                <div className="text-[11px] font-bold text-[#181d17] leading-[16px]">
                  مقارنة التغييرات
                </div>

                <div className="flex flex-col gap-[6px]">
                  {/* Previous Value */}
                  <div className="bg-[#f1f5eb] border border-[#ebefe6] rounded-[8px] p-[9px] flex flex-col gap-[2px]">
                    <span className="text-[11px] font-semibold text-[#d85c5c] leading-[22px]">
                      القيمة السابقة
                    </span>
                    <span className="text-[13px] font-normal text-[#75786f] line-through leading-[20px]">
                      {activeEvent.detailsData?.diff.oldValue ||
                        "حي النخيل، شارع الملك فهد، مبنى 14"}
                    </span>
                  </div>

                  {/* New Approved Value */}
                  <div className="bg-[#eaf1e8] border border-[#d8e8c7] rounded-[8px] p-[9px] flex flex-col gap-[2px]">
                    <span className="text-[11px] font-semibold text-[#3e8a5a] leading-[22px]">
                      القيمة الجديدة المعتمدة
                    </span>
                    <span className="text-[13px] font-bold text-[#1e281a] leading-[20px]">
                      {activeEvent.detailsData?.diff.newValue ||
                        "حي العليا، شارع الملك فهد، مبنى 42"}
                    </span>
                  </div>
                </div>

                {/* Justification Box */}
                <div className="bg-[#f1f5eb] rounded-[8px] p-[8px] flex flex-col gap-[2px]">
                  <span className="text-[11px] font-semibold text-[#75786f] leading-[20px]">
                    المبرر:
                  </span>
                  <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                    {activeEvent.detailsData?.diff.justification ||
                      "مطابقة ترخيص الهيئة العامة للعقار (REA-8819)."}
                  </p>
                </div>
              </div>

              {/* Drawer Action CTA */}
              <div className="pt-1">
                <Link
                  href={`/dashboard/properties/${propertyId}`}
                  className="bg-[#34422a] hover:bg-[#283320] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] px-[12px] py-[8px] flex items-center justify-center gap-[6px] w-full text-white cursor-pointer transition-colors active:scale-[0.99]"
                >
                  <ExternalLink className="size-[12px] text-white" />
                  <span className="text-[12px] font-semibold leading-[18px]">
                    صفحة العقار الكاملة
                  </span>
                </Link>
              </div>
            </section>
          ) : (
            <div className="bg-white border border-[#ebefe6] rounded-[16px] p-5 shadow-2xs text-center space-y-3">
              <p className="text-[13px] text-[#75786f]">تم إخفاء صندوق تفاصيل الحدث</p>
              <button
                type="button"
                onClick={() => setIsInspectorOpen(true)}
                className="bg-[#f1f5eb] hover:bg-[#e4ebd9] text-[#34422a] text-[12px] font-bold px-4 py-2 rounded-[12px] transition-colors cursor-pointer"
              >
                إظهار تفاصيل الحدث
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
