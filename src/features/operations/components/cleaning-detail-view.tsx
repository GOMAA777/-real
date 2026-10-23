"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  UserPlus,
  Play,
  XCircle,
  Building2,
  Sliders,
  Calendar,
  Lock,
  Battery,
  Wifi,
  CheckCircle2,
  Hourglass,
  Circle,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { CleaningAssignModal } from "./cleaning-assign-modal";
import { CleaningStartModal } from "./cleaning-start-modal";
import { CleaningCompleteModal } from "./cleaning-complete-modal";

interface CleaningDetailViewProps {
  taskId?: string;
}

export function CleaningDetailView({ taskId = "CL-10482" }: CleaningDetailViewProps) {
  useSetBreadcrumbTitle(`مهمة تنظيف #${taskId}`, `#${taskId}`);
  const confirm = useConfirm();
  // Interactive state
  const [status, setStatus] = useState<"needs_cleaning" | "in_progress" | "completed">("needs_cleaning");
  const [assignee, setAssignee] = useState<string>("غير معين");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleCancelTask = async () => {
    const ok = await confirm({
      title: "إلغاء مهمة التنظيف",
      message: `هل أنت متأكد من إلغاء مهمة التنظيف المجدولة (${taskId})؟ سيتم توثيق سبب الإلغاء في سجل العقار وإشعار المشرف.`,
      confirmLabel: "نعم، إلغاء المهمة",
      cancelLabel: "تراجع",
      variant: "destructive",
    });
    if (!ok) return;

    toast.error("تم إلغاء المهمة المجدولة وتوثيق السبب في سجل العقار.");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
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
              مهمة تنظيف {taskId}
            </h1>
            {status === "needs_cleaning" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                يحتاج تنظيف
              </span>
            )}
            {status === "in_progress" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                جاري التنظيف
              </span>
            )}
            {status === "completed" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                مكتملة
              </span>
            )}
          </div>
          <p className="text-xs text-[#6B7280] mt-2 mr-11 leading-relaxed">
            معرف المهمة: {taskId} • تاريخ الإنشاء: 18 سبتمبر 2026 — 12:05 م • السبب التشغيلي: مغادرة نزيل وتسليم فوري
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {status === "needs_cleaning" && (
            <>
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1F3D2B] text-white hover:bg-[#183022] transition-colors shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>تعيين مسؤول</span>
              </button>

              <button
                type="button"
                onClick={() => setIsStartModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[#1F3D2B] text-[#1F3D2B] bg-[#EEF5EE] hover:bg-[#E2EDE2] transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>بدء التنظيف</span>
              </button>
            </>
          )}

          {status === "in_progress" && (
            <button
              type="button"
              onClick={() => setIsCompleteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1F3D2B] text-white hover:bg-[#183022] transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تأكيد اكتمال التنظيف</span>
            </button>
          )}

          {status === "completed" && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم اعتماد واكتمال المهمة</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleCancelTask}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            <span>إلغاء المهمة المجدولة</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Main Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Property and Task Context */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-2 font-bold text-base text-[#1F2937]">
                <Building2 className="w-5 h-5 text-[#1F3D2B]" />
                <span>سياق الأصل العقاري والمهمة</span>
              </div>
              <span className="text-xs font-mono text-[#9CA3AF]">
                رمز العقار: BLD-RYD-042
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4">
                <span className="text-xs text-[#9CA3AF] block">الوحدة المستهدفة</span>
                <p className="text-base font-bold text-[#1F2937] mt-1">
                  الوحدة 204 (الطابق الثاني)
                </p>
                <div className="mt-2 text-xs text-[#6B7280] space-y-0.5">
                  <p>عمارة النخيل السكنية</p>
                  <p>الرياض — حي العليا</p>
                </div>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF]">المالك المسجل للأصل</span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-white border border-[#E5E7EB] rounded-md text-[#374151]">
                    OWN-4491
                  </span>
                </div>
                <p className="text-base font-bold text-[#1F2937] mt-1">
                  محمد العتيبي
                </p>
                <div className="mt-2 text-xs text-[#1F3D2B] flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>سبب المهمة: انتهاء الحجز وتسجيل المغادرة</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-xl p-3 flex items-center justify-between text-xs text-[#374151]">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#1F3D2B]" />
                <span>تم إنشاء المهمة آلياً فور تأكيد إغلاق القفل الذكي من قبل النزيل السابق</span>
              </div>
              <span className="font-semibold text-[#1F3D2B]">الحجز المرتبط: BK-10482</span>
            </div>
          </div>

          {/* Card 2: Execution and Operation Details */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-2 font-bold text-base text-[#1F2937]">
                <Sliders className="w-5 h-5 text-[#1F3D2B]" />
                <span>بيانات التنفيذ والتشغيل</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C]">
                {status === "needs_cleaning" ? "معلقة بانتظار الإسناد" : status === "in_progress" ? "جاري العمل الميداني" : "تم الاعتماد والإنجاز"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[11px] text-[#9CA3AF] block">الحالة التشغيلية</span>
                <p className="text-sm font-bold text-[#1F2937] mt-1 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${status === "completed" ? "bg-[#16A34A]" : status === "in_progress" ? "bg-[#2563EB]" : "bg-[#EA580C]"}`} />
                  {status === "completed" ? "مكتملة" : status === "in_progress" ? "جاري التنظيف" : "يحتاج تنظيف"}
                </p>
                <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">
                  {status === "completed" ? "معتمدة للاستقبال" : status === "in_progress" ? "المشرف في الموقع" : "في انتظار تسليم الطاقم"}
                </span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#9CA3AF]">المسؤول الميداني</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">
                    {assignee === "غير معين" ? "شاغر" : "معين"}
                  </span>
                </div>
                <p className="text-sm font-bold text-[#1F2937] mt-1">{assignee}</p>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-[11px] text-[#1F3D2B] font-semibold mt-0.5 block hover:underline"
                >
                  {assignee === "غير معين" ? "+ إسناد مشرف أو مقاول" : "تغيير المشرف المكلف"}
                </button>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[11px] text-[#9CA3AF] block">تاريخ ووقت الإنشاء</span>
                <p className="text-sm font-bold text-[#1F2937] mt-1">18 سبتمبر 2026</p>
                <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">12:05 ظهراً</span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[11px] text-[#9CA3AF] block">وقت البدء الفعلي</span>
                <p className="text-sm font-bold text-[#1F2937] mt-1">
                  {status === "needs_cleaning" ? "—" : "12:25 م"}
                </p>
                <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">
                  {status === "needs_cleaning" ? "لم يبدأ طاقم العمل بعد" : "تسجيل ذاتي بالقفل"}
                </span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[11px] text-[#9CA3AF] block">المدة المقدرة للإنجاز</span>
                <p className="text-sm font-bold text-[#1F2937] mt-1">45 دقيقة</p>
                <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">تبدأ تلقائياً فور الدخول</span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[11px] text-[#9CA3AF] block">وقت الإكمال المتوقع</span>
                <p className="text-sm font-bold text-[#1F2937] mt-1">
                  {status === "completed" ? "01:07 م" : status === "in_progress" ? "01:10 م" : "—"}
                </p>
                <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">
                  {status === "completed" ? "تم الإنجاز في 42 دقيقة" : "يحتسب بعد مباشرة العمل"}
                </span>
              </div>
            </div>

            {/* Standards & Notes Box */}
            <div className="p-4 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl space-y-1.5">
              <h4 className="text-xs font-bold text-[#1F2937]">نوع النظافة ومعايير الخدمة المطلوبة:</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                تنظيف وتعقيم دوري شامل عالي المعايير؛ يشمل تبديل وتجهيز البياضات الفندقية بالكامل، تعقيم الحمامات والمطبخ التحضيري، تنظيف الزجاج والأرضيات، وتجهيز سلة الضيافة وفق كود الضيافة الفاخر لمنصة ابراج.
              </p>
            </div>
          </div>

          {/* Card 3: Ended Booking Details */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-2 font-bold text-base text-[#1F2937]">
                <Calendar className="w-5 h-5 text-[#1F3D2B]" />
                <span>بيانات الحجز المنتهي المرتبط</span>
              </div>
              <button
                type="button"
                className="text-xs text-[#1F3D2B] font-semibold flex items-center gap-1 hover:underline"
              >
                <span>عرض ملف الحجز الكامل (BK-10482)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">النزيل المغادر</span>
                <p className="font-bold text-[#1F2937] text-sm mt-1">خالد العتيبي</p>
                <span className="text-[#9CA3AF] block text-[10px] mt-0.5" dir="ltr">
                  +966 54 *** 2311
                </span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">تاريخ ووقت الخروج</span>
                <p className="font-bold text-[#1F2937] text-sm mt-1">18 سبتمبر 2026</p>
                <span className="text-[#9CA3AF] block text-[10px] mt-0.5">12:00 ظهراً (ذاتي)</span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">مدة الإقامة</span>
                <p className="font-bold text-[#1F2937] text-sm mt-1">3 ليال</p>
                <span className="text-[#9CA3AF] block text-[10px] mt-0.5">15 — 18 سبتمبر 2026</span>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">كود الدخول للنزيل</span>
                <p className="font-bold text-[#DC2626] text-sm mt-1">منتهي وملغى</p>
                <span className="text-[#9CA3AF] block text-[10px] mt-0.5">تم الإلغاء آلياً 12:30 م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Sidebar Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Timeline Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <h3 className="font-bold text-base text-[#1F2937]">التسلسل الزمني</h3>
              <span className="text-xs text-[#9CA3AF]">سجل العمليات الفعلي</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">انتهاء الحجز وتسجيل المغادرة</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    18 سبتمبر 2026 — 12:00 ظهراً
                  </p>
                  <p className="text-[11px] text-[#6B7280]">
                    بواسطة النزيل خالد العتيبي تسجيل ذاتي
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">إنشاء مهمة التنظيف آلياً</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    18 سبتمبر 2026 — 12:05 ظهراً
                  </p>
                  <p className="text-[11px] text-[#6B7280]">
                    محرك العمليات المؤتمت — منصة ابراج
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    assignee !== "غير معين"
                      ? "bg-[#16A34A] text-white"
                      : "bg-[#D97706] text-white"
                  }`}
                >
                  {assignee !== "غير معين" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Hourglass className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">تعيين مسؤول التنظيف</p>
                  <p className="text-[11px] text-[#D97706] mt-0.5 font-medium">
                    {assignee !== "غير معين" ? `تم التعيين: ${assignee}` : "قيد الانتظار لمباشرة العملية"}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    status === "in_progress" || status === "completed"
                      ? "bg-[#16A34A] text-white"
                      : "border-2 border-gray-300 text-gray-300"
                  }`}
                >
                  {status === "in_progress" || status === "completed" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Circle className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">بدء أعمال التنظيف الميداني</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    {status === "needs_cleaning"
                      ? "لم تبدأ بعد (تتطلب إسناد مسؤول)"
                      : "تم المباشرة بنجاح عبر كود الدخول"}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    status === "completed"
                      ? "bg-[#16A34A] text-white"
                      : "border-2 border-gray-300 text-gray-300"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">اكتمال التنظيف والفحص الذاتي</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    {status === "completed"
                      ? "تم الاعتماد وتفعيل الإتاحة"
                      : "بانتظار إنهاء القائمة واعتمادها"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Central Governance Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
              <h3 className="font-bold text-sm text-[#1F2937]">حوكمة المنصة المركزية</h3>
            </div>

            <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 text-xs space-y-2">
              <span className="text-[#9CA3AF] block text-[11px]">حالة الوحدة الحالية في المنظومة:</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1F2937]">تحت التنظيف (مغلقة)</span>
                <span className="px-2 py-0.5 bg-[#FFF7ED] text-[#C2410C] rounded-full text-[10px] font-semibold">
                  غير متاحة للحجز
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280]">الوحدة 204 — عمارة النخيل السكنية</p>
            </div>

            <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#374151]">
              <Lock className="w-4 h-4 text-[#1F3D2B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1F3D2B] block mb-0.5">حظر استقبال النزلاء آلياً</span>
                <p className="text-[11px] leading-relaxed text-[#4B6350]">
                  لا تصبح الوحدة متاحة للحجز والاستقبال في محركات التوزيع إلا بعد اكتمال التنظيف، وإغلاق الباب الذكي من الخارج.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Lock and Access Codes Panel */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <h3 className="font-bold text-sm text-[#1F2937]">القفل الذكي وأكواد الدخول</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                متصل سحابياً
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#1F3D2B]" />
                  <span className="text-[#6B7280]">حالة الباب الفعلي:</span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-[#1F2937] block">مغلق بإحكام</span>
                  <span className="text-[10px] text-[#9CA3AF]">مستشعر المزلاج الإلكتروني</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#1F3D2B]" />
                  <span className="text-[#6B7280]">طراز البوابة والسحابة:</span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-[#1F2937] block">TTLock Gateway G3</span>
                  <span className="text-[10px] text-[#9CA3AF]">سحابي مباشر Wi-Fi</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-[#6B7280]">طاقة بطارية القفل:</span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-[#16A34A] block">92% (ممتازة)</span>
                  <span className="text-[10px] text-[#9CA3AF]">آخر تحديث قبل 5 دقائق</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1F2937]">كود طاقم النظافة المؤقت</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]">
                  {status === "needs_cleaning" ? "غير مفعل" : "مفعل ومتاح"}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                {status === "needs_cleaning"
                  ? "يتم توليد وإرسال كود دخول مؤقت (صالحة لمرة واحدة أو لمدة ساعتين) آلياً إلى هاتف المشرف فور الضغط على «بدء التنظيف»."
                  : "الكود المؤقت النشط: #9281-OTP (صالح لمدة ساعتين)."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CleaningAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onConfirm={(newAssignee) => {
          setAssignee(newAssignee);
        }}
      />

      <CleaningStartModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        onConfirm={() => {
          setStatus("in_progress");
          if (assignee === "غير معين") {
            setAssignee("أحمد سالم");
          }
        }}
      />

      <CleaningCompleteModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        onConfirm={() => {
          setStatus("completed");
        }}
      />
    </div>
  );
}
