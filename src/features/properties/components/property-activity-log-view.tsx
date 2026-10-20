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
  LayoutGrid,
  ExternalLink,
  X,
  Clock,
  Pencil,
  DoorClosed,
  Smartphone,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Wrench,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TablePagination } from "@/components/shared/table-pagination";
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
  const [pageSize, setPageSize] = useState(10);

  const summary = initialSummary;
  const events = initialEvents;

  // Selected event for the left inspector
  const activeEvent =
    events.find((e) => e.id === selectedEventId) || events[0];

  const handleExportPDF = () => {
    toast.info("جاري تجهيز وتصدير سجل الأحداث الشامل للعقار (PDF)...");
    setTimeout(() => {
      toast.success("تم تصدير سجل أحداث العقار (PDF) بنجاح!");
    }, 1200);
  };

  const renderBadgeIcon = (iconType: PropertyActivityEvent["iconType"], isActive: boolean) => {
    if (isActive) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
          <Pencil className="w-5 h-5" />
        </div>
      );
    }

    switch (iconType) {
      case "door":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <DoorClosed className="w-5 h-5" />
          </div>
        );
      case "mobile":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <Smartphone className="w-5 h-5" />
          </div>
        );
      case "refresh":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <RefreshCw className="w-5 h-5" />
          </div>
        );
      case "whatsapp":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <MessageSquare className="w-5 h-5" />
          </div>
        );
      case "cleaning":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
        );
      case "maintenance":
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <Wrench className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
            <Clock className="w-5 h-5" />
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
            سجل الأحداث الكامل للعقار
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium leading-relaxed max-w-2xl">
            تتبع غير قابل للتلاعب لكافة التغييرات والعمليات المنفذة على الأصل العقاري
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

      {/* 2. Property Overview Strip Card */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E6DC] shadow-2xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Right Section: Property Title, Category, Address */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-extrabold text-[#172115]">
                {summary.propertyName}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0F2EC] text-[#556350] border border-[#DEE7D7] select-none">
                {summary.propertyType}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#7D8A78] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#A5B3A1]" />
              <span>
                {summary.address} • كود المنشأة {summary.facilityCode}
              </span>
            </div>
          </div>
        </div>

        {/* Left Section: Owner & Units Info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs border-t lg:border-t-0 pt-3 lg:pt-0 border-[#F0F2EC]">
          {/* Owner Info */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#7D8A78]" />
            <span className="text-[#7D8A78] font-medium">المالك:</span>
            <span className="font-bold text-[#172115]">{summary.ownerName}</span>
            <span className="text-[#7D8A78] font-normal">({summary.ownerCode})</span>
          </div>

          <div className="h-4 w-px bg-[#E2E6DC] hidden sm:block" />

          {/* Units Info */}
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-[#7D8A78]" />
            <span className="text-[#7D8A78] font-medium">الوحدات:</span>
            <span className="font-bold text-[#172115]">{summary.totalUnits} وحدة</span>
            <span className="font-bold text-[#2E7D32]">({summary.documentedPercentage})</span>
          </div>
        </div>
      </section>

      {/* 3. Main Two-Column Layout (Right in RTL: Timeline, Left in RTL: Event Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL (lg:col-span-8): Timeline Events List */}
        <div className="lg:col-span-8 space-y-5">
          <div className="space-y-4">
            {events.map((event) => {
              const isActive = selectedEventId === event.id;

              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3.5 sm:gap-4 transition-all"
                >
                  {/* Circular Badge on the Right */}
                  <div className="pt-2">{renderBadgeIcon(event.iconType, isActive)}</div>

                  {/* Event Card on the Left */}
                  <div
                    onClick={() => {
                      setSelectedEventId(event.id);
                      setIsInspectorOpen(true);
                    }}
                    className={`flex-1 bg-white rounded-3xl p-4 sm:p-5 border transition-all cursor-pointer shadow-2xs space-y-3 ${
                      isActive
                        ? "border-[#384633] ring-1 ring-[#384633]/20"
                        : "border-[#E2E6DC] hover:border-[#CCD5C5]"
                    }`}
                  >
                    {/* Event 1: Special Detailed Diff Card */}
                    {event.diffInline ? (
                      <div className="space-y-3">
                        {/* Top Row: Title + Timestamp */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                          <h3 className="text-base sm:text-lg font-bold text-[#172115]">
                            {event.title}
                          </h3>
                          <div className="text-xs text-[#7D8A78] font-medium flex items-center gap-1.5 shrink-0">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{event.timestamp}</span>
                          </div>
                        </div>

                        {/* Actor Pill */}
                        {event.actor && (
                          <div className="flex items-center">
                            <div className="bg-[#EFF4EA] border border-[#DEE7D7]/70 rounded-full py-1 px-3 inline-flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#2E3C29] text-white text-xs font-bold flex items-center justify-center shrink-0">
                                {event.actor.initials}
                              </div>
                              <span className="text-xs font-semibold text-[#172115]">
                                {event.actor.name}
                              </span>
                              <span className="text-xs text-[#7D8A78] font-normal">
                                • {event.actor.role}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Description */}
                        {event.description && (
                          <p className="text-xs sm:text-sm text-[#384633] leading-relaxed font-normal">
                            {event.description}
                          </p>
                        )}

                        {/* Inline Diff Preview Strip */}
                        <div className="bg-[#EFF4EA]/80 border border-[#DEE7D7] rounded-2xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[#7D8A78] font-medium">
                              {event.diffInline.label}
                            </span>
                            <span className="line-through text-[#7D8A78]">
                              {event.diffInline.oldValue}
                            </span>
                            <span className="text-[#7D8A78]">◀</span>
                            <span className="font-bold text-[#172115]">
                              {event.diffInline.newValue}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEventId(event.id);
                              setIsInspectorOpen(true);
                            }}
                            className="text-xs font-bold text-[#34432E] hover:text-[#172115] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{event.actionButtonText || "عرض التفاصيل"}</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Standard Timeline Event Card */
                      <div className="space-y-2">
                        {/* Top Row: Title, Role Badge, Time, and Action Button */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-bold text-[#172115]">
                              {event.title}
                            </h3>
                            <span className="bg-[#EFF4EA] text-[#4E5D49] border border-[#DEE7D7] rounded-full px-2.5 py-0.5 text-xs font-semibold select-none">
                              {event.badge}
                            </span>
                            <span className="text-xs text-[#7D8A78] font-medium">
                              {event.timeOnly || event.timestamp}
                            </span>
                          </div>

                          {/* Action Button */}
                          {event.actionButtonText && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.info(`فتح تفاصيل: ${event.title}`);
                              }}
                              className="bg-[#EFF4EA] hover:bg-[#E2EAD8] text-[#34432E] text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer select-none"
                            >
                              {event.actionButtonText}
                            </button>
                          )}
                        </div>

                        {/* Bottom Row: Subtitle & Highlights */}
                        <div className="flex items-center gap-2 flex-wrap text-xs text-[#556350]">
                          {event.subtitleText && <span>{event.subtitleText}</span>}

                          {event.highlightedText && (
                            <span
                              className={`font-bold inline-flex items-center gap-1 ${
                                event.highlightedColor || "text-[#2E7D32]"
                              }`}
                            >
                              {event.iconType === "whatsapp" && (
                                <CheckCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                              )}
                              <span>{event.highlightedText}</span>
                            </span>
                          )}

                          {event.taskStatus && (
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                                event.statusBadgeColor || "bg-[#FEF6EE] text-[#B54708]"
                              }`}
                            >
                              {event.taskStatus}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Bottom Pagination Bar */}
          <div className="bg-white rounded-3xl border border-[#E2E6DC] overflow-hidden shadow-2xs">
            <TablePagination
              currentPage={currentPage}
              totalPages={20}
              totalCount={386}
              fromIndex={(currentPage - 1) * pageSize + 1}
              toIndex={Math.min(currentPage * pageSize, 386)}
              pageSize={pageSize}
              pageSizeOptions={[5, 10, 20, 50]}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              entityName="حدث"
              pluralEntityName="أحداث"
              registeredLabel="مسجل"
            />
          </div>
        </div>

        {/* Left Column in RTL (lg:col-span-4): Event Details Inspector */}
        <div className="lg:col-span-4 space-y-6">
          {isInspectorOpen ? (
            <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#172115]" />
                  <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                    تفاصيل الحدث
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInspectorOpen(false)}
                  className="text-[#7D8A78] hover:text-[#172115] p-1 rounded-lg hover:bg-[#F6F8F4] transition-colors cursor-pointer"
                  title="إغلاق التفاصيل"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Table / Key-Values */}
              <div className="rounded-2xl border border-[#E2E6DC]/80 overflow-hidden divide-y divide-[#E2E6DC]/70 text-xs">
                <div className="flex items-center justify-between p-3 bg-white">
                  <span className="text-[#7D8A78] font-medium">نوع الإجراء</span>
                  <span className="font-bold text-[#172115]">
                    {activeEvent.detailsData?.actionType || "تعديل بيانات الأصل"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FBFDF9]/60">
                  <span className="text-[#7D8A78] font-medium">المنفذ</span>
                  <span className="font-bold text-[#172115]">
                    {activeEvent.detailsData?.performer || "محمد أحمد (مدير المنصة)"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white">
                  <span className="text-[#7D8A78] font-medium">التاريخ والتوقيت</span>
                  <span className="font-bold text-[#172115]">
                    {activeEvent.detailsData?.dateTime || "18/09/2026 11:42 AM"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FBFDF9]/60">
                  <span className="text-[#7D8A78] font-medium">الكيان</span>
                  <span className="font-bold text-[#172115]">
                    {activeEvent.detailsData?.entity || "عمارة النخيل (PR-1048)"}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white">
                  <span className="text-[#7D8A78] font-medium">المصدر</span>
                  <span className="font-bold text-[#172115]">
                    {activeEvent.detailsData?.source || "لوحة الإدارة المركزية"}
                  </span>
                </div>
              </div>

              {/* Diff Section */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#172115]">
                  مقارنة التغييرات
                </h3>

                {/* Old Value Box */}
                <div className="bg-[#FDF2F2] border border-[#FECDCA] rounded-2xl p-3.5 space-y-1">
                  <div className="text-[11px] font-semibold text-[#D9383A]">
                    القيمة السابقة
                  </div>
                  <div className="text-xs text-[#556350] line-through font-medium">
                    {activeEvent.detailsData?.diff.oldValue ||
                      "حي النخيل، شارع الملك فهد، مبنى 14"}
                  </div>
                </div>

                {/* New Approved Value Box */}
                <div className="bg-[#EFF4EA] border border-[#DEE7D7] rounded-2xl p-3.5 space-y-1">
                  <div className="text-[11px] font-semibold text-[#2E7D32]">
                    القيمة الجديدة المعتمدة
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#172115]">
                    {activeEvent.detailsData?.diff.newValue ||
                      "حي العليا، شارع الملك فهد، مبنى 42"}
                  </div>
                </div>

                {/* Justification Box */}
                <div className="bg-[#F6F8F4] border border-[#E2E6DC] rounded-2xl p-3.5 space-y-1">
                  <div className="text-[11px] text-[#7D8A78] font-medium">
                    المبرر:
                  </div>
                  <div className="text-xs text-[#384633] font-medium leading-relaxed">
                    {activeEvent.detailsData?.diff.justification ||
                      "مطابقة ترخيص الهيئة العامة للعقار (REA-8819)."}
                  </div>
                </div>
              </div>

              {/* Action Button: Full Property Page */}
              <div className="pt-2">
                <Link
                  href={`/dashboard/properties/${propertyId}`}
                  className="bg-[#384633] hover:bg-[#2E3C29] text-white rounded-2xl py-3 px-4 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer select-none active:scale-[0.99] w-full"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>صفحة العقار الكاملة</span>
                </Link>
              </div>
            </section>
          ) : (
            <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs text-center space-y-3">
              <p className="text-xs text-[#7D8A78]">تم إخفاء صندوق تفاصيل الحدث</p>
              <button
                type="button"
                onClick={() => setIsInspectorOpen(true)}
                className="bg-[#EFF4EA] hover:bg-[#E2EAD8] text-[#34432E] text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
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
