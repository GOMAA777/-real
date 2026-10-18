"use client";

import { useState, useMemo } from "react";
import {
  ClipboardList,
  Clock,
  ShieldCheck,
  RefreshCw,
  Search,
  ChevronDown,
  User,
  ArrowRightLeft,
  FileEdit,
  PlusCircle,
  LogIn,
  Tag,
  Key,
  Lock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  OwnerActivityFilterDrawer,
  ActivityFilterState,
} from "./owner-activity-filter-drawer";

export interface AuditEvent {
  id: string;
  uuid: string;
  date: string;
  time: string;
  actionTitle: string;
  actionCategory: string;
  actionTag: string;
  actionIcon: typeof FileEdit;
  actionIconColor: string;
  actionIconBg: string;
  actorName: string;
  actorInitials: string;
  actorBadge: string;
  actorBadgeStyle: string;
  actorAvatarBg: string;
  targetName: string;
  targetSub: string;
  changeSummary: string;
  // Detailed Inspector Information:
  inspector: {
    actorFullName: string;
    exactTimestamp: string;
    ipAddress: string;
    clientEnvironment: string;
    fieldDiffs: Array<{
      fieldName: string;
      prevValue: string;
      newValue: string;
      prevStrikethrough?: boolean;
    }>;
  };
}

const defaultAuditEvents: AuditEvent[] = [
  {
    id: "aud-1",
    uuid: "UUID #AUD-98214-RYD",
    date: "16 سبتمبر 2026",
    time: "10:35 ص",
    actionTitle: "تعديل بيانات العقار",
    actionCategory: "إدارة الأصول",
    actionTag: "تعديل أصل",
    actionIcon: FileEdit,
    actionIconColor: "text-[#2563EB]",
    actionIconBg: "bg-[#DBEAFE]",
    actorName: "محمد العتيبي",
    actorInitials: "م",
    actorBadge: "مالك معتمد",
    actorBadgeStyle: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    actorAvatarBg: "bg-[#283820]",
    targetName: "عمارة النخيل",
    targetSub: "عقار رئيسي (10 وحدات)",
    changeSummary: "تم تحديث العنوان التفصيلي ورخصة الإشغال",
    inspector: {
      actorFullName: "محمد بن سالم العتيبي (PO-8821)",
      exactTimestamp: "2026-09-16 10:35:14.204 GMT+3",
      ipAddress: "176.44.18.92 (الرياض، STC)",
      clientEnvironment: "Safari 17.5 • macOS Sonoma",
      fieldDiffs: [
        {
          fieldName: "حقل: العنوان التفصيلي",
          prevValue: "حي النخيل - الرياض",
          newValue: "حي النخيل - طريق الأمير فيصل بن بندر، مبنى 4",
          prevStrikethrough: true,
        },
        {
          fieldName: "حقل: رخصة الإشغال",
          prevValue: "غير مدخل (Null)",
          newValue: "MOMRA-LIC-2026-90412",
        },
      ],
    },
  },
  {
    id: "aud-2",
    uuid: "UUID #AUD-98213-RYD",
    date: "16 سبتمبر 2026",
    time: "09:20 ص",
    actionTitle: "إضافة وحدة جديدة",
    actionCategory: "مخزون الوحدات",
    actionTag: "إضافة وحدة",
    actionIcon: PlusCircle,
    actionIconColor: "text-[#9333EA]",
    actionIconBg: "bg-[#F3E8FF]",
    actorName: "محمد العتيبي",
    actorInitials: "م",
    actorBadge: "مالك معتمد",
    actorBadgeStyle: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    actorAvatarBg: "bg-[#283820]",
    targetName: "الوحدة 105",
    targetSub: "عمارة النخيل (استوديو)",
    changeSummary: "تم إنشاء وحدة سكنية جديدة وربطها بالتسعير",
    inspector: {
      actorFullName: "محمد بن سالم العتيبي (PO-8821)",
      exactTimestamp: "2026-09-16 09:20:02.118 GMT+3",
      ipAddress: "176.44.18.92 (الرياض، STC)",
      clientEnvironment: "Safari 17.5 • macOS Sonoma",
      fieldDiffs: [
        {
          fieldName: "حقل: كود الوحدة",
          prevValue: "غير موجود",
          newValue: "UNIT-105-STUDIO",
        },
        {
          fieldName: "حقل: التسعير اليومي",
          prevValue: "0 ر.س",
          newValue: "350 ر.س / ليلة",
        },
      ],
    },
  },
  {
    id: "aud-3",
    uuid: "UUID #AUD-98212-RYD",
    date: "15 سبتمبر 2026",
    time: "06:15 م",
    actionTitle: "تسجيل دخول أمني",
    actionCategory: "مصادقة المستخدم",
    actionTag: "أمان الحساب",
    actionIcon: LogIn,
    actionIconColor: "text-[#16A34A]",
    actionIconBg: "bg-[#DCFCE7]",
    actorName: "محمد العتيبي",
    actorInitials: "م",
    actorBadge: "مالك معتمد",
    actorBadgeStyle: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    actorAvatarBg: "bg-[#283820]",
    targetName: "لوحة تحكم المالك",
    targetSub: "جلسة رقم #SESS-412",
    changeSummary: "تسجيل الدخول من جهاز معتمد عبر توثيق ثنائي",
    inspector: {
      actorFullName: "محمد بن سالم العتيبي (PO-8821)",
      exactTimestamp: "2026-09-15 18:15:44.892 GMT+3",
      ipAddress: "176.44.18.92 (الرياض، STC)",
      clientEnvironment: "Safari 17.5 • macOS Sonoma",
      fieldDiffs: [
        {
          fieldName: "حقل: حالة المصادقة",
          prevValue: "غير مسجل دخول",
          newValue: "تم التحقق الثنائي (2FA - SMS)",
        },
        {
          fieldName: "حقل: الجلسة النشطة",
          prevValue: "منتهية",
          newValue: "SESS-412 (صالحة حتى 24 ساعة)",
        },
      ],
    },
  },
  {
    id: "aud-4",
    uuid: "UUID #AUD-98211-RYD",
    date: "15 سبتمبر 2026",
    time: "03:40 م",
    actionTitle: "تحديث أسعار المواسم",
    actionCategory: "التسعير الديناميكي",
    actionTag: "تعديل تسعير",
    actionIcon: Tag,
    actionIconColor: "text-[#D97706]",
    actionIconBg: "bg-[#FEF3C7]",
    actorName: "محمد العتيبي",
    actorInitials: "م",
    actorBadge: "مالك معتمد",
    actorBadgeStyle: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    actorAvatarBg: "bg-[#283820]",
    targetName: "فلل الياسمين",
    targetSub: "فيلا رقم 4 الفاخرة",
    changeSummary: "تعديل سعر عطلة نهاية الأسبوع إلى 450 ر.س",
    inspector: {
      actorFullName: "محمد بن سالم العتيبي (PO-8821)",
      exactTimestamp: "2026-09-15 15:40:22.015 GMT+3",
      ipAddress: "176.44.18.92 (الرياض، STC)",
      clientEnvironment: "Safari 17.5 • macOS Sonoma",
      fieldDiffs: [
        {
          fieldName: "حقل: سعر عطلة الأسبوع",
          prevValue: "380 ر.س / ليلة",
          newValue: "450 ر.س / ليلة",
          prevStrikethrough: true,
        },
        {
          fieldName: "حقل: الخصم الأسبوعي",
          prevValue: "5%",
          newValue: "10% للحجوزات أكثر من 3 أيام",
        },
      ],
    },
  },
  {
    id: "aud-5",
    uuid: "UUID #AUD-98210-RYD",
    date: "14 سبتمبر 2026",
    time: "11:10 م",
    actionTitle: "إنشاء كود دخول مؤقت",
    actionCategory: "أقفال ذكية (Smart Lock)",
    actionTag: "قفل ذكي",
    actionIcon: Key,
    actionIconColor: "text-[#4F46E5]",
    actionIconBg: "bg-[#EEF2FF]",
    actorName: "النظام التلقائي",
    actorInitials: "آلي",
    actorBadge: "Webhook",
    actorBadgeStyle: "bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]",
    actorAvatarBg: "bg-[#4B5563]",
    targetName: "الوحدة 101",
    targetSub: "حجز النزيل #BK-1048",
    changeSummary: "توليد كود دخول إلكتروني مؤقت للنزيل صالح لمدة الحجز",
    inspector: {
      actorFullName: "النظام التلقائي (Service Worker Webhook)",
      exactTimestamp: "2026-09-14 23:10:05.612 GMT+3",
      ipAddress: "10.24.8.102 (Internal Cloud Gateway)",
      clientEnvironment: "Node.js v20 • Background Worker",
      fieldDiffs: [
        {
          fieldName: "حقل: كود القفل السري",
          prevValue: "غير مفعل",
          newValue: "PASS-**** (مشفر SHA-256)",
        },
        {
          fieldName: "حقل: صلاحية الدخول",
          prevValue: "غير محدد",
          newValue: "14 سبتمبر 2026 15:00 - 18 سبتمبر 12:00",
        },
      ],
    },
  },
  {
    id: "aud-6",
    uuid: "UUID #AUD-98209-RYD",
    date: "14 سبتمبر 2026",
    time: "02:15 م",
    actionTitle: "إلغاء تفعيل قفل ذكي",
    actionCategory: "إجراء أمني طارئ",
    actionTag: "أمان طارئ",
    actionIcon: Lock,
    actionIconColor: "text-[#EA580C]",
    actionIconBg: "bg-[#FFEDD5]",
    actorName: "محمد العتيبي",
    actorInitials: "م",
    actorBadge: "مالك معتمد",
    actorBadgeStyle: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    actorAvatarBg: "bg-[#283820]",
    targetName: "الوحدة 204",
    targetSub: "عمارة النخيل (حي النخيل)",
    changeSummary: "إعادة تعيين القفل الذكي وإلغاء صلاحيات المفاتيح السابقة",
    inspector: {
      actorFullName: "محمد بن سالم العتيبي (PO-8821)",
      exactTimestamp: "2026-09-14 14:15:33.441 GMT+3",
      ipAddress: "176.44.18.92 (الرياض، STC)",
      clientEnvironment: "Safari 17.5 • macOS Sonoma",
      fieldDiffs: [
        {
          fieldName: "حقل: حالة القفل الذكي",
          prevValue: "نشط ومتصل بالبلوتوث",
          newValue: "معطل ومغلق مؤقتاً (Safety Mode)",
          prevStrikethrough: true,
        },
      ],
    },
  },
  {
    id: "aud-7",
    uuid: "UUID #AUD-98208-RYD",
    date: "13 سبتمبر 2026",
    time: "08:45 ص",
    actionTitle: "مزامنة قنوات OTA",
    actionCategory: "Channel Manager",
    actionTag: "تزامن خارجي",
    actionIcon: RefreshCw,
    actionIconColor: "text-[#0284C7]",
    actionIconBg: "bg-[#E0F2FE]",
    actorName: "Booking.com",
    actorInitials: "B.",
    actorBadge: "تكامل خارجي",
    actorBadgeStyle: "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]",
    actorAvatarBg: "bg-[#1E3A8A]",
    targetName: "مجمع الواحة",
    targetSub: "غرف الواجهة البحرية (جدة)",
    changeSummary: "تحديث توفر الغرف والتقويم عبر الربط المباشر",
    inspector: {
      actorFullName: "Booking.com Channel Manager (API Integration)",
      exactTimestamp: "2026-09-13 08:45:10.902 GMT+3",
      ipAddress: "185.28.192.14 (Amsterdam Datacenter)",
      clientEnvironment: "Booking.com v2.4 Sync API",
      fieldDiffs: [
        {
          fieldName: "حقل: حالة التزامن",
          prevValue: "انتظار المزامنة",
          newValue: "تم التحديث بنجاح (200 OK)",
        },
        {
          fieldName: "حقل: الوحدات المحجوزة خارجياً",
          prevValue: "3 وحدات",
          newValue: "4 وحدات (تم تسجيل حجز جديد)",
        },
      ],
    },
  },
];

export function OwnerActivityTabView() {
  const [events] = useState<AuditEvent[]>(defaultAuditEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>("aud-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [activityFilters, setActivityFilters] = useState<ActivityFilterState>({
    category: "all",
    actor: "all",
    timeRange: "all",
    sortBy: "latest",
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activityFilters.category !== "all") count++;
    if (activityFilters.actor !== "all") count++;
    if (activityFilters.timeRange !== "all") count++;
    if (activityFilters.sortBy !== "latest") count++;
    return count;
  }, [activityFilters]);

  const selectedEvent = useMemo(() => {
    return events.find((e) => e.id === selectedEventId) || events[0];
  }, [events, selectedEventId]);

  const filteredEvents = useMemo(() => {
    const result = events.filter((evt) => {
      // Category filter
      if (activityFilters.category !== "all" && evt.actionCategory !== activityFilters.category) {
        return false;
      }

      // Actor filter
      if (activityFilters.actor !== "all" && !evt.actorName.includes(activityFilters.actor)) {
        return false;
      }

      // Time range filter
      if (activityFilters.timeRange === "today" && !evt.date.includes("16 سبتمبر")) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = evt.actionTitle.toLowerCase().includes(q);
        const matchesActor = evt.actorName.toLowerCase().includes(q);
        const matchesTarget = evt.targetName.toLowerCase().includes(q);
        const matchesSummary = evt.changeSummary.toLowerCase().includes(q);
        if (!matchesTitle && !matchesActor && !matchesTarget && !matchesSummary) {
          return false;
        }
      }
      return true;
    });

    if (activityFilters.sortBy === "oldest") {
      return [...result].reverse();
    }

    return result;
  }, [events, activityFilters, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. Four Top Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: إجمالي العمليات المسجلة */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs text-[#7D8A78] font-medium">إجمالي العمليات المسجلة</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#172115]">24</span>
              <span className="text-xs text-[#7D8A78]">عملية هذا الشهر</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#F5F2EB] text-[#6D6352] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: آخر عملية مسجلة */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs text-[#7D8A78] font-medium">آخر عملية مسجلة</div>
            <div className="text-base sm:text-lg font-bold text-[#172115]">منذ 18 دقيقة</div>
            <div className="text-xs text-[#2E7D32] font-semibold">تعديل بيانات عقار</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#EAF5EA] text-[#2E7D32] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: عمليات أمنية / دخول */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs text-[#7D8A78] font-medium">عمليات أمنية / دخول</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#172115]">9</span>
              <span className="text-xs text-[#7D8A78]">جلسات نشطة</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#EBF5FB] text-[#2980B9] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: عمليات النظام الآلي */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2E6DC] shadow-2xs flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs text-[#7D8A78] font-medium">عمليات النظام الآلي</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#172115]">12</span>
              <span className="text-xs text-[#2E7D32] font-semibold">مزامنة ناجحة</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#4A5D44] flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Main Content Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL: Activity Log Table (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5 order-2 lg:order-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                سجل النشاط والتدقيق الأمني (Activity Log)
              </h2>
              <p className="text-xs text-[#7D8A78] mt-0.5 leading-relaxed">
                تتبع وتوثيق كافة العمليات والإجراءات التشغيلية والأمنية المرتبطة بحساب مالك العقار وموظفيه.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-xs font-bold px-3 py-1 rounded-full shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>تحديث فوري</span>
            </span>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-3xl p-2 sm:p-2.5 border border-[#E0E4D8]/60 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full md:w-96 lg:w-[440px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في سجل النشاط (نوع الإجراء، العنصر، المنفذ...)"
                className="w-full h-10 pe-4 ps-11 rounded-2xl bg-[#F1F5EB] border border-transparent text-xs text-[#172115] placeholder:text-[#8D9B88] focus:bg-white focus:border-[#CCD5C5] focus:outline-none transition-all shadow-2xs"
              />
              <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#7D8A78]">
                <Search className="w-4 h-4" />
              </div>
            </div>

            {/* Filter and Action Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(true)}
                className={cn(
                  "h-10 px-4 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
                  activeFiltersCount > 0
                    ? "bg-[#34432E] text-white shadow-xs"
                    : "bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#172115]"
                )}
                title="تصفية سجل النشاط"
              >
                <span>فلتر</span>
                <SlidersHorizontal
                  className={cn(
                    "w-3.5 h-3.5",
                    activeFiltersCount > 0 ? "text-white" : "text-[#172115]"
                  )}
                />
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-[#34432E] text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => toast.success("تم تحديث سجل العمليات بنجاح")}
                className="w-10 h-10 rounded-2xl bg-[#F1F5EB] hover:bg-[#E5EBDD] flex items-center justify-center text-[#172115] transition-colors cursor-pointer shrink-0 select-none"
                title="تحديث السجل"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-[#E2E6DC] text-[#7D8A78] text-xs font-bold">
                  <th className="px-4 py-3.5 whitespace-nowrap">التاريخ والوقت</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">الإجراء والنوع</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">منفذ الإجراء</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">العنصر المرتبط</th>
                  <th className="px-4 py-3.5 whitespace-nowrap">تفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF2E6]">
                {filteredEvents.map((event) => {
                  const Icon = event.actionIcon;
                  const isSelected = event.id === selectedEventId;
                  return (
                    <tr
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#F6F8F4] border-s-4 border-s-[#2E7D32]"
                          : "hover:bg-[#F6F8F4]/60"
                      }`}
                    >
                      {/* 1. التاريخ والوقت */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="font-bold text-xs text-[#172115]">{event.date}</div>
                        <div className="text-[11px] text-[#7D8A78] mt-0.5">{event.time}</div>
                      </td>

                      {/* 2. الإجراء والنوع */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl ${event.actionIconBg} ${event.actionIconColor} flex items-center justify-center shrink-0`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#172115]">
                              {event.actionTitle}
                            </div>
                            <div className="text-[11px] text-[#7D8A78] mt-0.5">
                              {event.actionCategory}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 3. منفذ الإجراء */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full ${event.actorAvatarBg} text-white text-xs font-bold flex items-center justify-center shrink-0`}
                          >
                            {event.actorInitials}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#172115]">
                              {event.actorName}
                            </div>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mt-0.5 ${event.actorBadgeStyle}`}
                            >
                              {event.actorBadge}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 4. العنصر المرتبط */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="font-bold text-xs text-[#172115]">
                          {event.targetName}
                        </div>
                        <div className="text-[11px] text-[#7D8A78] mt-0.5">
                          {event.targetSub}
                        </div>
                      </td>

                      {/* 5. تفاصيل التغيير */}
                      <td className="px-4 py-3.5 text-xs text-[#7D8A78] max-w-[200px] truncate">
                        {event.changeSummary}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="pt-4 border-t border-[#E2E6DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-[#7D8A78] font-medium order-3 sm:order-1">
              عرض {filteredEvents.length} من أصل 24 عملية تدقيق مسجلة
            </div>

            <div className="order-1 sm:order-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>سجلات التدقيق غير قابلة للتعديل أو المسح</span>
              </span>
            </div>

            <div className="flex items-center gap-1 order-2 sm:order-3">
              <button
                type="button"
                disabled
                className="px-2.5 py-1 rounded-lg border border-[#E2E6DC] text-[#A2ADA0] cursor-not-allowed select-none"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg bg-[#2E3C29] text-white font-bold border border-[#2E3C29] select-none text-xs"
              >
                1
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-[#E2E6DC] text-[#172115] hover:bg-[#F6F8F4] select-none text-xs"
              >
                2
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-[#E2E6DC] text-[#172115] hover:bg-[#F6F8F4] select-none text-xs"
              >
                3
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-[#E2E6DC] text-[#172115] hover:bg-[#F6F8F4] select-none"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Selected Event Inspector Card (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-5 order-1 lg:order-2 sticky top-6">
          {/* Inspector Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#172115]">
                لوحة فحص العملية المحددة
              </h3>
              <p className="text-[11px] text-[#7D8A78] font-mono mt-0.5" dir="ltr">
                {selectedEvent.uuid}
              </p>
            </div>
            <div className="bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[10px] font-bold px-2.5 py-1 rounded-lg text-center leading-tight shrink-0">
              <div>موثق رقمياً</div>
              <div className="font-mono text-[9px]">SHA-256</div>
            </div>
          </div>

          {/* Selected Action Banner */}
          <div className="bg-[#F6F8F4] rounded-2xl p-3.5 border border-[#EEF2E6] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] text-[#7D8A78] font-medium">الإجراء المنفذ</div>
              <div className="text-xs sm:text-sm font-bold text-[#172115] mt-0.5 truncate">
                {selectedEvent.actionTitle} لعقار {selectedEvent.targetName}
              </div>
            </div>
            <span className="bg-white border border-[#E2E6DC] text-[#4A5D44] font-bold text-xs px-3 py-2 rounded-xl shrink-0 text-center shadow-2xs">
              {selectedEvent.actionTag}
            </span>
          </div>

          {/* Section 1: بيانات المنفذ والبيئة التقنية */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#172115]">
              <User className="w-4 h-4 text-[#7D8A78]" />
              <span>بيانات المنفذ والبيئة التقنية</span>
            </div>
            <div className="bg-[#F6F8F4] rounded-2xl p-4 border border-[#EEF2E6] space-y-2 text-xs">
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[#7D8A78] text-[11px]">اسم المنفذ:</span>
                <span className="font-bold text-[#172115] text-end">
                  {selectedEvent.inspector.actorFullName}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[#7D8A78] text-[11px]">التوقيت الدقيق:</span>
                <span className="text-[#172115] font-mono text-[10px]" dir="ltr">
                  {selectedEvent.inspector.exactTimestamp}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[#7D8A78] text-[11px]">عنوان IP:</span>
                <span className="text-[#172115] font-mono text-[10px]" dir="ltr">
                  {selectedEvent.inspector.ipAddress}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[#7D8A78] text-[11px]">المتصفح والنظام:</span>
                <span className="text-[#172115] text-[11px]">
                  {selectedEvent.inspector.clientEnvironment}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: مقارنة التغييرات بالحقول */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#172115]">
              <ArrowRightLeft className="w-4 h-4 text-[#7D8A78]" />
              <span>مقارنة التغييرات بالحقول</span>
            </div>
            <div className="space-y-2.5">
              {selectedEvent.inspector.fieldDiffs.map((diff, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-3.5 border border-[#EEF2E6] space-y-2 shadow-2xs"
                >
                  <div className="text-xs font-bold text-[#172115]">{diff.fieldName}</div>
                  {/* Previous Value */}
                  <div className="bg-[#FDF2F2] text-[#DC2626] border border-[#FEE2E2] rounded-xl px-3 py-1.5 text-xs flex items-center justify-between gap-2">
                    <span className="font-bold text-[11px] shrink-0">السابق:</span>
                    <span
                      className={`text-end truncate text-[11px] ${
                        diff.prevStrikethrough ? "line-through decoration-[#DC2626]" : ""
                      }`}
                    >
                      {diff.prevValue}
                    </span>
                  </div>
                  {/* New Value */}
                  <div className="bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] rounded-xl px-3 py-1.5 text-xs flex items-center justify-between gap-2">
                    <span className="font-bold text-[11px] shrink-0">الجديد:</span>
                    <span className="font-semibold text-end truncate text-[11px]">
                      {diff.newValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Filter Drawer */}
      <OwnerActivityFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={activityFilters}
        onApplyFilters={(newFilters) => {
          setActivityFilters(newFilters);
        }}
        onResetFilters={() => {
          setActivityFilters({
            category: "all",
            actor: "all",
            timeRange: "all",
            sortBy: "latest",
          });
        }}
        totalResultsCount={filteredEvents.length}
      />
    </div>
  );
}
