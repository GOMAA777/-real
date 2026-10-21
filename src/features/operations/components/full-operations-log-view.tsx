"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Zap,
  Sliders,
  Search,
  Filter,
  ChevronDown,
  Wrench,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  Lock,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OperationsAdvancedFilterDrawer } from "./operations-advanced-filter-drawer";
import { OperationFilterState, initialOperationFilterState } from "../types";

interface FullOperationsLogViewProps {
  unitId?: string;
}

export function FullOperationsLogView({ unitId = "204" }: FullOperationsLogViewProps) {
  const [filterCategory, setFilterCategory] = useState<"all" | "cleaning" | "maintenance">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<OperationFilterState>(initialOperationFilterState);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.type !== "all") count++;
    if (advancedFilters.status !== "all") count++;
    if (advancedFilters.priority !== "all") count++;
    if (advancedFilters.city !== "all") count++;
    if (advancedFilters.property !== "all") count++;
    if (advancedFilters.assigneeStatus !== "all") count++;
    if (advancedFilters.assigneeName !== "all") count++;
    if (advancedFilters.timePeriod !== "all") count++;
    if (advancedFilters.sortBy !== "default") count++;
    return count;
  }, [advancedFilters]);

  const handleExport = () => {
    toast.success("جاري تصدير سجل التشغيل الكامل للوحدة (PDF / Excel)...");
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/operations"
              className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-[#1F2937]">
              سجل التشغيل — الوحدة {unitId}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              متاحة للحجز
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-2 mr-11 leading-relaxed">
            التوثيق الزمني التشغيلي الصارم لمهام النظافة والتعقيم وبلاغات الصيانة والأعطال الفنية للوحدة العقارية.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/dashboard/operations/maintenance/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1F3D2B] text-white hover:bg-[#183022] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>إنشاء بلاغ صيانة</span>
          </Link>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span>تصدير السجل (PDF/Excel)</span>
          </button>
        </div>
      </div>

      {/* 2. Property Metadata Bar */}
      <div className="bg-white rounded-3xl p-4 border border-[#EBEBEB] shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
          <div className="flex items-center gap-3 pt-2 md:pt-0">
            <div className="w-8 h-8 rounded-xl bg-[#FAFBF9] border border-[#EBEBEB] flex items-center justify-center text-[#1F3D2B] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF] block">الوحدة والتفاصيل</span>
              <p className="font-bold text-[#1F2937] text-xs mt-0.5">204 (الطابق الثاني - 3 غرف وصالة)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 pr-0 md:pr-4">
            <div className="w-8 h-8 rounded-xl bg-[#FAFBF9] border border-[#EBEBEB] flex items-center justify-center text-[#1F3D2B] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF] block">العقار والموقع</span>
              <p className="font-bold text-[#1F2937] text-xs mt-0.5">عمارة النخيل (حي العليا - الرياض)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 pr-0 md:pr-4">
            <div className="w-8 h-8 rounded-xl bg-[#FAFBF9] border border-[#EBEBEB] flex items-center justify-center text-[#1F3D2B] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF] block">مالك العقار</span>
              <p className="font-bold text-[#1F2937] text-xs mt-0.5">محمد العتيبي (OWN-4491)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 md:pt-0 pr-0 md:pr-4">
            <div className="w-8 h-8 rounded-xl bg-[#EEF5EE] border border-[#DCE8DC] flex items-center justify-center text-[#1F3D2B] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#9CA3AF] block">مؤشر الجاهزية</span>
              <p className="font-bold text-[#1F3D2B] text-xs mt-0.5">100% معتمدة بالكامل</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-[#EBEBEB] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B7280]">عمليات الشهر الحالي</span>
            <p className="text-xl font-bold text-[#1F2937] mt-1">8 عمليات مسجلة</p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5">5 تنظيف • 3 صيانة فنية</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF5EE] text-[#1F3D2B] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EBEBEB] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B7280]">متوسط دورة التنظيف</span>
            <p className="text-xl font-bold text-[#1F2937] mt-1">48 دقيقة / دورة</p>
            <p className="text-[11px] text-[#16A34A] font-medium mt-0.5">ضمن النطاق القياسي (أقل من 60 د)</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EBEBEB] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B7280]">معدل استجابة الصيانة</span>
            <p className="text-xl font-bold text-[#1F2937] mt-1">35 دقيقة للاستجابة</p>
            <p className="text-[11px] text-[#16A34A] font-medium mt-0.5">أسرع بـ 12 دقيقة من SLA المنصة</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#EBEBEB] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B7280]">الالتزام بقوائم الفحص</span>
            <p className="text-xl font-bold text-[#1F2937] mt-1">100% ممتاز</p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5">اعتماد رقمي بالصور والشفافية</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Segmented Filter Pills */}
      <div className="flex justify-center my-2">
        <div className="inline-flex items-center gap-1.5 bg-[#EDF2EC] p-1.5 rounded-full border border-[#E0E7DE]">
          <button
            type="button"
            onClick={() => setFilterCategory("all")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filterCategory === "all"
                ? "bg-white text-[#1F2937] shadow-sm font-semibold"
                : "text-[#4B5563] hover:text-[#1F2937]"
            }`}
          >
            <span>الكل</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EDF2EC] text-[#1F3D2B]">
              24
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory("cleaning")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filterCategory === "cleaning"
                ? "bg-white text-[#1F2937] shadow-sm font-semibold"
                : "text-[#4B5563] hover:text-[#1F2937]"
            }`}
          >
            <span>التنظيف والتعقيم</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E2E8E0] text-[#6B7280]">
              16
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory("maintenance")}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filterCategory === "maintenance"
                ? "bg-white text-[#1F2937] shadow-sm font-semibold"
                : "text-[#4B5563] hover:text-[#1F2937]"
            }`}
          >
            <span>الصيانة الفنية</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E2E8E0] text-[#6B7280]">
              8
            </span>
          </button>
        </div>
      </div>

      {/* 5. Filters Bar */}
      <div className="bg-white rounded-3xl p-3 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث برقم المهمة، المنفذ، أو نوع الإجراء..."
            className="w-full pl-4 pr-9 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1F3D2B]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Advanced Filter Button */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className={cn(
              "h-9 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer select-none",
              activeFiltersCount > 0
                ? "bg-[#4B5940] text-white shadow-xs"
                : "bg-[#EFF2EB] hover:bg-[#E2E7DE] text-[#252A24]"
            )}
            title="التصفية المتقدمة"
          >
            <span>فلتر</span>
            <SlidersHorizontal
              className={cn(
                "w-3.5 h-3.5",
                activeFiltersCount > 0 ? "text-white" : "text-[#252A24]"
              )}
            />
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#4B5940] text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs text-gray-700">
            <Calendar className="w-3.5 h-3.5 text-[#1F3D2B]" />
            <span>آخر 30 يوماً (سبتمبر 2026)</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs text-gray-700">
            <Filter className="w-3.5 h-3.5 text-[#1F3D2B]" />
            <span>جميع الحالات</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs text-gray-700">
            <span>كافة الفرق والمنفذين</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1" />
          </div>
        </div>
      </div>

      {/* 6. Operations Log History Stream */}
      <div className="space-y-8">
        {/* Day 1: 18 September 2026 (Cleaning Track) */}
        {(filterCategory === "all" || filterCategory === "cleaning") && (
          <div className="space-y-4">
            {/* Day Header */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-[#EBEBEB]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EEF5EE] text-[#1F3D2B] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1F2937]">18 سبتمبر 2026</h3>
                  <p className="text-[11px] text-[#6B7280]">
                    دورة تنظيف وتسليم كاملة — المهمة CL-10482
                  </p>
                </div>
              </div>
            </div>

            {/* Event 1: Completed cleaning with 4 photos */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#EEF5EE] text-[#1F3D2B] rounded-full text-xs font-semibold border border-[#DCE8DC]">
                    تنظيف وتعقيم (CL-10482)
                  </span>
                  <h4 className="font-bold text-sm text-[#1F2937]">
                    اكتمل التنظيف واعتماد الجودة الفنية
                  </h4>
                </div>
                <span className="text-xs text-[#9CA3AF] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  01:07 م
                </span>
              </div>

              <p className="text-xs text-[#4B5563] leading-relaxed">
                اكتملت أعمال التنظيف والتعقيم الشاملة بنجاح عقب مغادرة النزيل في الحجز (BK-2026-1048). تم اعتماد قائمة الفحص الرقمية بنسبة 5/5 وتوثيق 4 صور ميدانية للأثاث، دورات المياه ومفاتيح التكييف.
              </p>

              {/* 4 Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFBF9] group">
                  <div
                    className="h-28 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('/assets/operations/1ffb7edd8c66d494a0b93c2e975fad7a317c6a79.png')`,
                    }}
                  />
                  <div className="p-2 text-center text-[11px] font-bold text-[#1F2937]">
                    المطبخ والأجهزة
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFBF9] group">
                  <div
                    className="h-28 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('/assets/operations/0f0efae597a6954b97f7e1aff00492f3c9e3e436.png')`,
                    }}
                  />
                  <div className="p-2 text-center text-[11px] font-bold text-[#1F2937]">
                    دورة المياه
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFBF9] group">
                  <div
                    className="h-28 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('/assets/operations/25bc465c95de65e25236f3886563b7d1a8bd193d.png')`,
                    }}
                  />
                  <div className="p-2 text-center text-[11px] font-bold text-[#1F2937]">
                    غرفة النوم الرئيسية
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFBF9] group">
                  <div
                    className="h-28 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('/assets/operations/43efbbc00559a2457719e7e49b795cd6927bda6b.png')`,
                    }}
                  />
                  <div className="p-2 text-center text-[11px] font-bold text-[#1F2937]">
                    الصالة الرئيسية
                  </div>
                </div>
              </div>

              {/* Event Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#F3F4F6] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center font-bold text-[10px]">
                    أس
                  </div>
                  <div>
                    <span className="font-bold text-[#1F2937]">أحمد سالم</span>
                    <span className="text-[#9CA3AF] mr-1.5">(مشرف ميداني — شركة النقاء للنظافة)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#F0FDF4] text-[#16A34A] rounded-full text-[11px] font-semibold border border-[#DCFCE7]">
                    تم تحويل تلقائي لحالة الوحدة إلى متاحة
                  </span>
                  <Link
                    href="/dashboard/operations/cleaning/CL-10482"
                    className="inline-flex items-center gap-1 text-[#1F3D2B] font-bold hover:underline"
                  >
                    <span>عرض مهمة التنظيف CL-10482</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 2: Start cleaning */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-xs flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    تنظيف وتعقيم (CL-10482)
                  </span>
                  <span className="font-bold text-[#1F2937]">بدأ التنظيف والمباشرة الميدانية</span>
                </div>
                <p className="text-[#6B7280]">
                  تم تسجيل دخول الطاقم الميداني للوحدة عبر كود الدخول المؤقت الذكي <strong className="font-mono text-[#1F2937]">#9281-OTP</strong> (صالح لمدة 90 دقيقة).
                </p>
                <p className="text-[10px] text-[#9CA3AF]">المنفذ: أحمد سالم</p>
              </div>
              <span className="text-gray-400 font-mono">12:25 م</span>
            </div>

            {/* Event 3: Assign task */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-xs flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    تنظيف وتعقيم (CL-10482)
                  </span>
                  <span className="font-bold text-[#1F2937]">تم تعيين المهمة إلى طاقم النظافة</span>
                </div>
                <p className="text-[#6B7280]">
                  قام محرك التوزيع التلقائي بتعيين المشرف أحمد سالم مع إرسال إشعار فوري عبر تطبيق الجوال ورسالة WhatsApp لمركز عمليات شركة النقاء.
                </p>
                <p className="text-[10px] text-[#9CA3AF]">نظام الأتمتة الذكي (الإشراف: محمد أحمد)</p>
              </div>
              <span className="text-gray-400 font-mono">11:40 ص</span>
            </div>

            {/* Event 4: Auto Create Task */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-xs flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    تنظيف وتعقيم (CL-10482)
                  </span>
                  <span className="font-bold text-[#1F2937]">تم إنشاء مهمة التنظيف تلقائياً</span>
                </div>
                <p className="text-[#6B7280]">
                  تم إنشاء البلاغ آلياً إثر تسجيل مغادرة النزيل (Check-out) في موعده المحدد من الحجز BK-2026-1048.
                </p>
                <p className="text-[10px] text-[#9CA3AF]">أتمتة النظام (Check-out Trigger)</p>
              </div>
              <span className="text-gray-400 font-mono">11:00 ص</span>
            </div>
          </div>
        )}

        {/* Day 2: 17 September 2026 (Maintenance Track) */}
        {(filterCategory === "all" || filterCategory === "maintenance") && (
          <div className="space-y-4">
            {/* Day Header */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-[#EBEBEB]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1F2937]">17 سبتمبر 2026</h3>
                  <p className="text-[11px] text-[#6B7280]">
                    بلاغ صيانة فنية عاجل — البلاغ MT-2048
                  </p>
                </div>
              </div>
            </div>

            {/* Event 1: Completed Maintenance */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#FEF2F2] text-[#DC2626] rounded-full text-xs font-semibold border border-[#FEE2E2]">
                    صيانة فنية طارئة (MT-2048)
                  </span>
                  <h4 className="font-bold text-sm text-[#1F2937]">
                    تم إكمال الصيانة بنجاح واختبار الربط السحابي
                  </h4>
                </div>
                <span className="text-xs text-[#9CA3AF] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  05:40 م
                </span>
              </div>

              <p className="text-xs text-[#4B5563] leading-relaxed">
                استبدال تروس محرك القفل الذكي (Smart Lock Actuator) وتحديث حزمة البرامج الثابتة (Firmware v4.12) واختبار كود الدخول الرقمي عبر البوابة بنجاح 3 مرات متتالية. تم فحص البطارية وهي عند مستوى 100%.
              </p>

              {/* Hardware Spec Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl text-xs">
                <div>
                  <span className="text-[#9CA3AF] block text-[10px]">الجزء المستبدل</span>
                  <span className="font-bold text-[#1F2937]">محرك قفل باب إلكتروني Gen-3</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[10px]">حالة الاتصال السحابي</span>
                  <span className="font-bold text-[#16A34A]">متصل بنجاح (زمن استجابة 118ms)</span>
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[10px]">طاقة مستشعر القفل</span>
                  <span className="font-bold text-[#1F2937]">بطاريات ليثيوم جديدة 100%</span>
                </div>
              </div>

              {/* Event Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#F3F4F6] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center font-bold text-[10px]">
                    ط
                  </div>
                  <div>
                    <span className="font-bold text-[#1F2937]">م. طارق العسيري</span>
                    <span className="text-[#9CA3AF] mr-1.5">(مهندس أنظمة أمنية — فريق الصيانة المعتمد)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#FFF7ED] text-[#C2410C] rounded-full text-[11px] font-semibold border border-[#FFEDD5]">
                    تم تحويل الوحدة لمرحلة تحت التنظيف
                  </span>
                  <Link
                    href="/dashboard/operations/maintenance/MT-2048"
                    className="inline-flex items-center gap-1 text-[#1F3D2B] font-bold hover:underline"
                  >
                    <span>عرض بلاغ الصيانة MT-2048</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 2: Start maintenance */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-xs flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    صيانة فنية (MT-2048)
                  </span>
                  <span className="font-bold text-[#1F2937]">بدأت أعمال الصيانة الميدانية</span>
                </div>
                <p className="text-[#6B7280]">
                  وصول مهندس الصيانة للوحدة وفك الغطاء الخارجي للقفل الرقمي لتشخيص أعطال حساس الاستجابة الحركية.
                </p>
                <p className="text-[10px] text-[#9CA3AF]">المنفذ: م. طارق العسيري</p>
              </div>
              <span className="text-gray-400 font-mono">05:10 م</span>
            </div>

            {/* Event 3: Assign ticket */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-xs flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    صيانة فنية (MT-2048)
                  </span>
                  <span className="font-bold text-[#1F2937]">تم تعيين البلاغ إلى فريق الصيانة المعتمد</span>
                </div>
                <p className="text-[#6B7280]">
                  تمت المراجعة والتكليف العاجل لضمان جاهزية الوحدة قبل موعد وصول النزيل القادم صباح اليوم التالي.
                </p>
                <p className="text-[10px] text-[#9CA3AF]">المشرفة: سارة القحطاني (مديرة العقار)</p>
              </div>
              <span className="text-gray-400 font-mono">04:40 م</span>
            </div>

            {/* Event 4: Create ticket */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-xs flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                    صيانة فنية (MT-2048)
                  </span>
                  <span className="font-bold text-[#1F2937]">تم إنشاء بلاغ صيانة MT-2048</span>
                </div>
                <p className="text-[#6B7280]">
                  رصد إشارة تحذيرية من بوابة القفل السحابي بتعطل مستشعر فتح القفل الذكي (Smart Lock Failure Alert).
                </p>
                <p className="text-[10px] text-[#9CA3AF]">مستشعر بوابة القفل السحابي Alert</p>
              </div>
              <span className="text-gray-400 font-mono">04:15 م</span>
            </div>
          </div>
        )}
      </div>

      {/* 7. Pagination Footer */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#EBEBEB] text-xs text-[#6B7280]">
        <span>صفحة 1 من 3</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed flex items-center gap-1"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span>السابق</span>
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1"
          >
            <span>التالي</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      <OperationsAdvancedFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={advancedFilters}
        onApplyFilters={(newFilters) => {
          setAdvancedFilters(newFilters);
        }}
        onResetFilters={() => {
          setAdvancedFilters(initialOperationFilterState);
        }}
        totalResultsCount={12}
      />
    </div>
  );
}
