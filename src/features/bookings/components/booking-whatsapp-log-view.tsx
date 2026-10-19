"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  RotateCcw,
  SendHorizontal,
  CheckCircle2,
  Key,
  XCircle,
  Clock,
  AlertCircle,
  AlertTriangle,
  Eye,
  Lock,
  Share2,
  FileText,
  Info,
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { defaultWhatsAppMessages } from "../data/mock-whatsapp-messages";
import { WhatsAppMessageItem } from "../types/whatsapp";

interface BookingWhatsAppLogViewProps {
  bookingCode?: string;
  guestName?: string;
  guestPhone?: string;
  unitName?: string;
  propertyName?: string;
}

export function BookingWhatsAppLogView({
  bookingCode = "BK-10482",
  guestName = "خالد العتيبي",
  guestPhone = "+966 50 123 4567",
  unitName = "الوحدة 204",
  propertyName = "عمارة النخيل (الرياض)",
}: BookingWhatsAppLogViewProps) {
  // Filter tab state
  const [filterTab, setFilterTab] = useState<"all" | "delivered" | "scheduled" | "failed">("all");
  
  // Selected message for left-column inspection (default: Message 2 as in screenshot)
  const [selectedMessageId, setSelectedMessageId] = useState<string>("msg-2");

  // Manual message modal state
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualMessageText, setManualMessageText] = useState("");
  const [manualTemplate, setManualTemplate] = useState("sa_custom_support");

  // Selected message object
  const selectedMessage = useMemo(() => {
    return (
      defaultWhatsAppMessages.find((m) => m.id === selectedMessageId) ||
      defaultWhatsAppMessages[1]
    );
  }, [selectedMessageId]);

  // Dynamic counts
  const counts = useMemo(() => {
    return {
      all: defaultWhatsAppMessages.length,
      delivered: defaultWhatsAppMessages.filter(
        (m) => m.status === "delivered" || m.status === "read"
      ).length,
      scheduled: defaultWhatsAppMessages.filter(
        (m) => m.status === "cancelled_schedule" || m.status === "sent"
      ).length,
      failed: defaultWhatsAppMessages.filter((m) => m.status === "failed").length,
    };
  }, []);

  // Filtered message cards
  const filteredMessages = useMemo(() => {
    return defaultWhatsAppMessages.filter((m) => {
      if (filterTab === "delivered") return m.status === "delivered" || m.status === "read";
      if (filterTab === "scheduled") return m.status === "cancelled_schedule" || m.status === "sent";
      if (filterTab === "failed") return m.status === "failed";
      return true;
    });
  }, [filterTab]);

  const handleRefresh = () => {
    toast.info("جاري تحديث حالات تسليم وقراءة الرسائل عبر Meta API...", {
      description: "تمت مزامنة السجلات اللحظية بنجاح بنسبة 100%",
    });
  };

  const handleResend = (msg: WhatsAppMessageItem) => {
    toast.success("تمت إعادة جدولة وإرسال الرسالة بنجاح", {
      description: `تم الإرسال إلى ${msg.recipientPhone} عبر خوادم WhatsApp Business`,
    });
  };

  const handleSendManual = () => {
    if (!manualMessageText.trim()) {
      toast.error("يرجى كتابة نص الرسالة أولاً");
      return;
    }
    toast.success("تم إرسال الرسالة اليدوية بنجاح إلى النزيل", {
      description: `المستلم: ${guestPhone} عبر Meta Cloud API`,
    });
    setManualMessageText("");
    setIsManualModalOpen(false);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. Page Header Card (Exact match to Image 2) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xs">
        {/* Right side: Title & Description */}
        <div className="space-y-1.5 text-right">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#172115] tracking-tight">
              سجل رسائل WhatsApp
            </h1>
            <span className="bg-[#EFF4EA] border border-[#DEE7D7] text-[#2E6B22] text-xs font-bold px-3 py-1 rounded-full">
              متصل لحظياً
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-normal leading-relaxed">
            متابعة الخط الزمني المباشر لرسائل الأتمتة التشغيلية المرسلة والمجدولة للنزيل عبر بوابة WhatsApp Business API
          </p>
        </div>

        {/* Left side: Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0 flex-wrap">
          {/* Refresh State Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-[#F1F5EB] hover:bg-[#E5ECE0] text-[#172115] border border-[#DEE7D7] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
          >
            <span>تحديث الحالة اللحظية</span>
            <RotateCcw className="w-4 h-4 text-[#384633]" />
          </button>

          {/* Send Manual Message Button */}
          <button
            type="button"
            onClick={() => setIsManualModalOpen(true)}
            className="bg-[#2E3C29] hover:bg-[#232F1F] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none active:scale-95"
          >
            <SendHorizontal className="w-4 h-4 text-white" />
            <span>إرسال رسالة يدوية</span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT COLUMN (7 Cols in RTL): Timeline Filter & Message Cards List */}
        <div className="lg:col-span-7 space-y-4 order-1">
          {/* Top Filter Tabs Bar (Exact match to Image 2) */}
          <div className="bg-white rounded-2xl p-2 border border-[#E2E6DC] flex items-center gap-2 overflow-x-auto no-scrollbar shadow-2xs">
            {/* Tab 1: الكل */}
            <button
              type="button"
              onClick={() => setFilterTab("all")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none flex items-center gap-2",
                filterTab === "all"
                  ? "bg-[#2E3C29] text-white shadow-2xs"
                  : "text-[#717E6E] hover:text-[#172115]"
              )}
            >
              <span>الكل</span>
              <span
                className={cn(
                  "w-5 h-5 rounded-full text-[11px] inline-flex items-center justify-center font-bold",
                  filterTab === "all"
                    ? "bg-white/20 text-white"
                    : "bg-[#EFF2EB] text-[#556350]"
                )}
              >
                {counts.all}
              </span>
            </button>

            {/* Tab 2: تم التسليم / القراءة */}
            <button
              type="button"
              onClick={() => setFilterTab("delivered")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none flex items-center gap-2",
                filterTab === "delivered"
                  ? "bg-[#2E3C29] text-white shadow-2xs"
                  : "text-[#717E6E] hover:text-[#172115]"
              )}
            >
              <span>تم التسليم / القراءة</span>
              <span
                className={cn(
                  "w-5 h-5 rounded-full text-[11px] inline-flex items-center justify-center font-bold",
                  filterTab === "delivered"
                    ? "bg-white/20 text-white"
                    : "bg-[#EFF2EB] text-[#556350]"
                )}
              >
                {counts.delivered}
              </span>
            </button>

            {/* Tab 3: مجدول */}
            <button
              type="button"
              onClick={() => setFilterTab("scheduled")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none flex items-center gap-2",
                filterTab === "scheduled"
                  ? "bg-[#2E3C29] text-white shadow-2xs"
                  : "text-[#717E6E] hover:text-[#172115]"
              )}
            >
              <span>مجدول</span>
              <span
                className={cn(
                  "w-5 h-5 rounded-full text-[11px] inline-flex items-center justify-center font-bold",
                  filterTab === "scheduled"
                    ? "bg-white/20 text-white"
                    : "bg-[#EFF2EB] text-[#556350]"
                )}
              >
                {counts.scheduled}
              </span>
            </button>

            {/* Tab 4: فشل الإرسال */}
            <button
              type="button"
              onClick={() => setFilterTab("failed")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer select-none flex items-center gap-2",
                filterTab === "failed"
                  ? "bg-[#2E3C29] text-white shadow-2xs"
                  : "text-[#717E6E] hover:text-[#172115]"
              )}
            >
              <span>فشل الإرسال</span>
              {counts.failed > 0 && (
                <span
                  className={cn(
                    "w-5 h-5 rounded-full text-[11px] inline-flex items-center justify-center font-bold",
                    filterTab === "failed"
                      ? "bg-white/20 text-white"
                      : "bg-[#FDE8E8] text-[#DC2626]"
                  )}
                >
                  {counts.failed}
                </span>
              )}
            </button>
          </div>

          {/* Messages Cards Stack */}
          <div className="space-y-4">
            {filteredMessages.map((msg) => {
              const isSelected = selectedMessageId === msg.id;
              const isScheduledCancelled = msg.status === "cancelled_schedule";
              const isFailed = msg.status === "failed";

              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessageId(msg.id)}
                  className={cn(
                    "rounded-3xl p-5 transition-all cursor-pointer relative space-y-3.5",
                    isScheduledCancelled
                      ? "border-2 border-dashed border-[#CCD5C5] bg-[#FAFCF8]/60 shadow-2xs"
                      : isSelected
                      ? "border-2 border-[#384633] bg-white shadow-md ring-1 ring-[#384633]/15"
                      : "border border-[#E2E6DC] bg-white hover:border-[#CCD5C5] shadow-2xs"
                  )}
                >
                  {/* Top Row: Icon + Title + Category Badge on Right | Status Badge + Timestamp on Left */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    {/* Right in RTL: Icon + Title + Badges */}
                    <div className="flex items-center gap-3">
                      {/* Status Circle Icon */}
                      {msg.id === "msg-1" ? (
                        <div className="w-9 h-9 rounded-full bg-[#EAF3E6] text-[#2E7D32] flex items-center justify-center shrink-0">
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      ) : msg.id === "msg-2" ? (
                        <div className="w-9 h-9 rounded-full bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Key className="w-4 h-4 stroke-[2.2]" />
                        </div>
                      ) : msg.id === "msg-3" ? (
                        <div className="w-9 h-9 rounded-full bg-[#EFF2EB] text-[#717E6E] flex items-center justify-center shrink-0">
                          <XCircle className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      ) : msg.id === "msg-4" ? (
                        <div className="w-9 h-9 rounded-full bg-[#EFF2EB] text-[#717E6E] flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#FEECEC] text-[#DC2626] flex items-center justify-center shrink-0">
                          <AlertCircle className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm sm:text-base text-[#172115]">
                            {msg.title}
                          </h3>

                          {/* Category Badge */}
                          <span
                            className={cn(
                              "text-[11px] font-bold px-2.5 py-0.5 rounded-full select-none",
                              msg.id === "msg-2"
                                ? "bg-[#E2EBDC] text-[#25501C]"
                                : isFailed
                                ? "bg-[#FEECEC] text-[#DC2626]"
                                : "bg-[#EFF3EA] text-[#556350] border border-[#DEE5D8]"
                            )}
                          >
                            {msg.categoryBadge}
                          </span>

                          {/* Active Selection Badge (Shown on Card 2 in screenshot) */}
                          {isSelected && (
                            <span className="bg-[#2E3C29] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full select-none">
                              معروضة حالياً
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Left in RTL: Status Badge & Timestamp */}
                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
                      <span className="text-[11px] text-[#7D8A78] font-medium">
                        {msg.timestamp}
                      </span>

                      {/* Status Badge */}
                      {msg.status === "read" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full select-none">
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>{msg.statusText}</span>
                        </span>
                      ) : msg.status === "delivered" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#E9F3E6] border border-[#CFDFCA] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full select-none">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{msg.statusText}</span>
                        </span>
                      ) : msg.status === "sent" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EFF2EB] border border-[#DFE4DA] text-[#556350] text-xs font-bold px-3 py-1 rounded-full select-none">
                          <Check className="w-3.5 h-3.5" />
                          <span>{msg.statusText}</span>
                        </span>
                      ) : msg.status === "cancelled_schedule" ? (
                        <span className="inline-flex items-center gap-1.5 bg-[#EFF2EB] border border-[#DFE4DA] text-[#717E6E] text-xs font-bold px-3 py-1 rounded-full select-none">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{msg.statusText}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-[#FEECEC] border border-[#F8C8C8] text-[#DC2626] text-xs font-bold px-3 py-1 rounded-full select-none">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{msg.statusText}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle: Bubble Text OR Red Error Box (Exact match) */}
                  {isFailed && msg.errorReason ? (
                    <div className="bg-[#FFF5F5] border border-[#FADCDD] rounded-2xl p-4 text-xs text-[#B91C1C] flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <span className="font-bold">سبب الفشل: </span>
                        <span>
                          خطأ في استجابة الخادم 429 - تجاوز حد المحاولات المؤقت عبر بوابة مزود الرسائل (Rate Limit Exceeded).
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "rounded-2xl p-4 text-xs leading-relaxed transition-colors",
                        isSelected
                          ? "bg-[#F1F6EC] border border-[#DEE7D7] text-[#172115] font-semibold"
                          : isScheduledCancelled
                          ? "bg-white/80 border border-[#E2E6DC] text-[#717E6E] font-medium"
                          : "bg-[#F6F8F4] border border-[#E8EDE4] text-[#2C3825] font-medium"
                      )}
                    >
                      {msg.bubbleText}
                    </div>
                  )}

                  {/* Bottom Row: Details link, Template name, Provider notes */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs">
                    {/* Right side: View Details / Status indicator */}
                    <div className="flex items-center gap-3">
                      {isFailed ? (
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResend(msg);
                            }}
                            className="bg-[#2E3C29] hover:bg-[#232F1F] text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>إعادة المحاولة الآن</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMessageId(msg.id);
                            }}
                            className="text-xs font-bold text-[#7D8A78] hover:text-[#172115] cursor-pointer"
                          >
                            عرض التفاصيل
                          </button>
                        </div>
                      ) : isSelected ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E3C29]">
                          <Eye className="w-4 h-4 text-[#2E3C29]" />
                          <span>قيد المعاينة التفصيلية</span>
                        </div>
                      ) : isScheduledCancelled ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessageId(msg.id);
                          }}
                          className="text-xs font-bold text-[#717E6E] hover:text-[#172115] flex items-center gap-1 cursor-pointer"
                        >
                          <span>عرض السجل الزمني</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessageId(msg.id);
                          }}
                          className="text-xs font-bold text-[#172115] hover:text-[#384633] flex items-center gap-1 cursor-pointer"
                        >
                          <span>عرض تفاصيل الرسالة</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Center: Template ID */}
                    <div className="text-[11px] text-[#7D8A78] font-mono">
                      <span>template: </span>
                      <span className="font-semibold">{msg.footerInfo.template}</span>
                    </div>

                    {/* Left side: Gateway / Provider Note with Icon */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7D8A78]">
                      {msg.footerInfo.leftIconType === "lock" ? (
                        <Lock className="w-3.5 h-3.5 text-[#7D8A78]" />
                      ) : msg.footerInfo.leftIconType === "financial" ? (
                        <FileText className="w-3.5 h-3.5 text-[#7D8A78]" />
                      ) : msg.footerInfo.leftIconType === "info" ? (
                        <Info className="w-3.5 h-3.5 text-[#7D8A78]" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5 text-[#7D8A78]" />
                      )}
                      <span>{msg.footerInfo.leftNote}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LEFT COLUMN (5 Cols in RTL): Inspector & Live Preview (Exact match to Images 1 & 2) */}
        <div className="lg:col-span-5 space-y-6 order-2">
          {/* Card A: Selected Message Details */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header: Title + Active Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
                <h2 className="text-base font-bold text-[#172115]">
                  تفاصيل الرسالة المحددة
                </h2>
              </div>

              <span className="bg-[#E2EBDC] text-[#25501C] text-xs font-bold px-3 py-1 rounded-full select-none">
                {selectedMessage.categoryBadge}
              </span>
            </div>

            {/* Metadata 2x2 Grid Box */}
            <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#E8EDE4] text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* Col 1 */}
                <div className="space-y-1">
                  <span className="text-[#7D8A78] block">معرف الرسالة (Message ID)</span>
                  <span className="font-mono font-bold text-[#172115] block truncate text-[11px] sm:text-xs">
                    {selectedMessage.messageId}
                  </span>
                </div>

                {/* Col 2 */}
                <div className="space-y-1">
                  <span className="text-[#7D8A78] block">رقم المستلم المعتمد</span>
                  <span
                    className="font-bold text-[#172115] block text-[11px] sm:text-xs"
                    dir="ltr"
                  >
                    {selectedMessage.recipientPhone}
                  </span>
                </div>

                {/* Col 3 */}
                <div className="space-y-1 pt-1">
                  <span className="text-[#7D8A78] block">القالب المعتمد (Template)</span>
                  <span className="font-mono font-bold text-[#172115] block truncate text-[11px] sm:text-xs">
                    {selectedMessage.templateName}
                  </span>
                </div>

                {/* Col 4 */}
                <div className="space-y-1 pt-1">
                  <span className="text-[#7D8A78] block">لغة الإرسال</span>
                  <span className="font-bold text-[#172115] block text-[11px] sm:text-xs">
                    {selectedMessage.language}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Real-Time Timeline */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <TrendingUp className="w-4 h-4 text-[#34432E]" />
                <span>سجل الحالات اللحظي الدقيق</span>
              </div>

              <div className="space-y-4 pe-2 relative before:absolute before:top-2 before:bottom-2 before:start-[7px] before:w-0.5 before:bg-[#DEE7D7]">
                {selectedMessage.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative z-10 text-xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#2E7D32] ring-4 ring-white shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-bold text-[#172115]">{item.title}</div>
                      <div className="text-[11px] text-[#7D8A78]">
                        <span className="font-medium">{item.timestamp}</span>
                        <span className="mx-1.5">—</span>
                        <span>{item.subtext}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Section Header */}
            <div className="pt-2 border-t border-[#EEF2E6] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#172115]">
                  معاينة النص كما يظهر للنزيل
                </span>
                <span className="text-[#7D8A78] font-medium">رسالة أتمتة منسقة</span>
              </div>

              {/* Styled WhatsApp Chat Bubble (Exact match to Image 1) */}
              <div className="bg-[#F0F4EC] border border-[#DEE7D7] rounded-3xl p-4 sm:p-5 shadow-2xs space-y-3 text-right">
                <div className="bg-white rounded-2xl p-4 border border-[#DEE7D7] shadow-2xs space-y-3 text-xs text-[#172115]">
                  {/* Sender Header */}
                  <div className="font-bold text-xs text-[#34432E]">
                    {selectedMessage.previewBubbleText.sender}
                  </div>

                  {/* Greeting & Body */}
                  <p className="leading-relaxed font-medium">
                    {selectedMessage.previewBubbleText.greeting}
                  </p>

                  <p className="leading-relaxed font-medium">
                    {selectedMessage.previewBubbleText.body}
                  </p>

                  {/* Highlighted Smart Lock Code (Exact match) */}
                  {selectedMessage.previewBubbleText.codeValue && (
                    <div className="py-1">
                      <div className="bg-[#E2EBDC] text-[#25501C] rounded-xl py-2 px-5 text-center font-bold font-mono text-xl tracking-wider shadow-2xs inline-block">
                        {selectedMessage.previewBubbleText.codeValue}
                      </div>
                    </div>
                  )}

                  {/* Validity Note */}
                  {selectedMessage.previewBubbleText.validityNote && (
                    <p className="text-[11px] text-[#556350] font-medium">
                      {selectedMessage.previewBubbleText.validityNote}
                    </p>
                  )}

                  {/* Help Note */}
                  {selectedMessage.previewBubbleText.helpNote && (
                    <p className="text-[11px] text-[#7D8A78] leading-relaxed pt-1 border-t border-[#F2F5ED]">
                      {selectedMessage.previewBubbleText.helpNote}
                    </p>
                  )}

                  {/* Timestamp & Double Checkmarks (Exact match) */}
                  <div className="flex items-center justify-start gap-1 pt-1 text-[11px] text-[#7D8A78]">
                    <CheckCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>{selectedMessage.previewBubbleText.time}</span>
                  </div>
                </div>
              </div>

              {/* Guest Phone Stats Box (Exact match to Image 1) */}
              <div className="bg-[#EFF4EA] border border-[#DEE7D7] rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                    <BarChart2 className="w-4 h-4 text-[#34432E]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#172115] block">
                      إحصائيات الرقم للنزيل
                    </span>
                    <span className="text-[11px] text-[#556350] block mt-0.5">
                      إجمالي الرسائل: 4 • نسبة التسليم الناجح: 100%
                    </span>
                  </div>
                </div>

                <span className="bg-[#E2EBDC] text-[#25501C] border border-[#CAD9C1] text-xs font-bold px-3 py-1 rounded-full select-none shrink-0">
                  موثوق
                </span>
              </div>

              {/* Resend Action Button (Exact match to Image 1) */}
              <button
                type="button"
                onClick={() => handleResend(selectedMessage)}
                className="bg-[#2E3C29] hover:bg-[#232F1F] text-white w-full py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer select-none active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                <span>إعادة إرسال نفس الرسالة</span>
              </button>
            </div>
          </div>

          {/* Card B: Meta Cloud API Policy Card (Exact match to Image 1) */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-2 text-right">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#172115]">
              <ShieldCheck className="w-4 h-4 text-[#34432E] shrink-0" />
              <span>ضوابط وسياسات Meta Cloud API</span>
            </div>
            <p className="text-xs text-[#7D8A78] leading-relaxed">
              تخضع جميع القوالب التشغيلية لسياسات الاعتماد المسبق من Meta لضمان عدم حظر الحساب الرقمي للمنشأة. يتم تسجيل كافة أحداث القراءة وتحديث الرموز الذكية تلقائياً مع نظام التحكم المركزي بالأبواب.
            </p>
          </div>
        </div>
      </div>

      {/* Manual Message Modal */}
      {isManualModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          dir="rtl"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsManualModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#E2E6DC] text-right z-10 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EEF2E6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F0F4EC] text-[#34432E] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#172115]">
                    إرسال رسالة يدوية عبر WhatsApp
                  </h3>
                  <p className="text-xs text-[#7D8A78]">
                    المستلم: {guestName} ({guestPhone})
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[#E2E6DC] flex items-center justify-center text-[#7D8A78] hover:text-[#172115] hover:bg-[#F6F8F4] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172115]">قالب الرسالة</label>
              <select
                value={manualTemplate}
                onChange={(e) => setManualTemplate(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#F0F4EC] border border-transparent text-xs text-[#172115] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all"
              >
                <option value="sa_custom_support">رسالة دعم وتنسيق مخصصة (sa_custom_support)</option>
                <option value="sa_checkin_instructions_v2">تعليمات الدخول الذكي المحدثة (sa_checkin_instructions_v2)</option>
                <option value="sa_luggage_coordination">تنسيق استلام وحفظ الأمتعة (sa_luggage_coordination)</option>
              </select>
            </div>

            {/* Message Body Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172115]">نص الرسالة للنزيل</label>
              <textarea
                rows={4}
                value={manualMessageText}
                onChange={(e) => setManualMessageText(e.target.value)}
                placeholder="اكتب رسالتك هنا... (سيتم التحقق من معايير المحتوى وإرسالها فوراً)"
                className="w-full p-3.5 rounded-xl bg-[#F0F4EC] border border-transparent text-xs text-[#172115] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all placeholder:text-[#7D8A78] resize-none"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#EFF3EB] hover:bg-[#E2E8DD] text-[#2C3825] font-bold text-xs transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleSendManual}
                className="px-6 py-2.5 rounded-xl bg-[#2E3C29] hover:bg-[#232F1F] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <SendHorizontal className="w-4 h-4 text-white" />
                <span>إرسال فوري للنزيل</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
