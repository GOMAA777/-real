"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  UserCheck,
  CheckCircle2,
  Lock,
  Clock,
  AlertTriangle,
  Wrench,
  Calendar,
  Plane,
  Bell,
  Cpu,
  BatteryCharging,
  WifiOff,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Hourglass,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { MaintenanceStartModal } from "./maintenance-start-modal";

interface MaintenanceDetailViewProps {
  ticketId?: string;
}

export function MaintenanceDetailView({ ticketId = "MT-2048" }: MaintenanceDetailViewProps) {
  const [status, setStatus] = useState<"in_progress" | "completed">("in_progress");
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const handleCompleteMaintenance = () => {
    setStatus("completed");
    toast.success("تم إكمال الصيانة وتحويل الوحدة آلياً إلى مرحلة التنظيف!");
  };

  const handleAssignOther = () => {
    toast.info("تم فتح طلب إعادة توجيه الفني الميداني.");
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
              بلاغ صيانة {ticketId}
            </h1>
            {status === "in_progress" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                قيد التنفيذ
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                مكتملة
              </span>
            )}
          </div>
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
            onClick={handleAssignOther}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-amber-200 text-amber-800 bg-[#FFFBEB] hover:bg-amber-100 transition-colors"
          >
            <UserCheck className="w-4 h-4" />
            <span>تعيين فني آخر</span>
          </button>

          {status === "in_progress" ? (
            <button
              type="button"
              onClick={handleCompleteMaintenance}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span>إكمال الصيانة</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsStartModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[#1F3D2B] text-[#1F3D2B] bg-[#EEF5EE] hover:bg-[#E2EDE2] transition-colors"
            >
              <Wrench className="w-4 h-4" />
              <span>بدء تنفيذ الصيانة (Modal)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Main Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Asset and Ticket Data */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
              <Lock className="w-5 h-5 text-[#1F3D2B]" />
              <span>بيانات الأصل العقاري والبلاغ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 space-y-1">
                <span className="text-[#9CA3AF] block text-[11px]">الوحدة المستهدفة</span>
                <p className="font-bold text-base text-[#1F2937]">الوحدة 305 (الطابق الثالث - جناح A)</p>
                <p className="text-[#6B7280]">برج الياسمين • حي الملقا، الرياض</p>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#9CA3AF] block text-[11px]">مالك العقار المسجل</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-[#E5E7EB] text-gray-700">
                    OWN-8823
                  </span>
                </div>
                <p className="font-bold text-base text-[#1F2937]">سارة القحطاني</p>
                <div className="flex items-center gap-1.5 text-red-600 font-medium pt-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>نوع المشكلة: قفل الباب الذكي (Smart Lock Failure)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[#9CA3AF] block text-[11px]">تاريخ وتوقيت البلاغ</span>
                  <p className="font-bold text-[#1F2937] text-sm mt-0.5">17 سبتمبر 2026 - 04:15 م</p>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center font-bold text-xs">
                  ط
                </div>
                <div>
                  <span className="text-[#9CA3AF] block text-[11px]">المسؤول المعين للمهمة</span>
                  <p className="font-bold text-[#1F2937] text-xs">م. طارق العسيري</p>
                  <p className="text-[10px] text-[#6B7280]">فريق الصيانة الفنية المعتمد - تخصص أقفال ذكية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Symptoms and Technician Notes */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
              <Wrench className="w-5 h-5 text-[#1F3D2B]" />
              <span>تفاصيل الوصف والأعراض التشغيلية</span>
            </div>

            {/* Operational Description */}
            <div className="p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-2xl space-y-1.5 text-xs text-[#374151]">
              <div className="flex items-center gap-2 text-[#DC2626] font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>الوصف التشغيلي للبلاغ</span>
              </div>
              <p className="text-xs leading-relaxed text-[#991B1B]">
                قفل الباب الذكي لا يستجيب عند محاولة فتح الوحدة، وتظهر ومضات حمراء متقطعة على لوحة المفاتيح الرقمية مع عدم قبول أكواد الدخول المعتمدة الصادرة عبر بوابة التكامل السحابي.
              </p>
            </div>

            {/* Technician Field Notes */}
            <div className="p-4 bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl space-y-1.5 text-xs text-[#374151]">
              <div className="flex items-center gap-2 text-[#1F3D2B] font-bold text-xs">
                <Wrench className="w-4 h-4" />
                <span>الملاحظات الفنية الميدانية (تحديث مباشر من الفني)</span>
              </div>
              <p className="text-xs leading-relaxed text-[#4B6350]">
                تم فحص محول الطاقة ومستشعر الباب، وجاري استبدال مجموعة التروس الداخلية وتحديث برمجة اللوحة الرئيسية للقفل الذكي للتوافق مع وحدة الاتصال اللاسلكية بالبوابة المركزية.
              </p>
            </div>

            {/* Inspection Photos */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#1F2937] block">صور البلاغ والفحص الميداني الموثقة:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl bg-gray-200 bg-cover bg-center shrink-0 border border-gray-300"
                    style={{
                      backgroundImage: `url('/assets/operations/117189a045a7d298bbe42b788d51c79af6017e3a.png')`,
                    }}
                  />
                  <div className="text-xs">
                    <p className="font-bold text-[#1F2937]">لوحة المفاتيح الرقمية للقفل</p>
                    <p className="text-[10px] text-red-600 mt-0.5">توثيق وميض الخطأ الأحمر</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">17 سبتمبر - 05:14 م</p>
                  </div>
                </div>

                <div className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl bg-gray-200 bg-cover bg-center shrink-0 border border-gray-300"
                    style={{
                      backgroundImage: `url('/assets/operations/c8aee9b42126e0acff492f85b787e0f9afd3c774.png')`,
                    }}
                  />
                  <div className="text-xs">
                    <p className="font-bold text-[#1F2937]">فحص الجهد الكهربائي للبطارية</p>
                    <p className="text-[10px] text-amber-600 mt-0.5">قياس البطاريات الداخلية (18%)</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">17 سبتمبر - 05:22 م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Affected Linked Booking */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-2 font-bold text-base text-[#1F2937]">
                <Calendar className="w-5 h-5 text-[#1F3D2B]" />
                <span>بيانات الحجز المرتبط والمتأثر بالبلاغ</span>
              </div>
              <span className="px-2.5 py-1 bg-[#EEF5EE] text-[#1F3D2B] rounded-full text-[11px] font-semibold border border-[#DCE8DC]">
                حجز قادم (مؤكد)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">رقم الحجز</span>
                <p className="font-bold text-sm text-[#1F2937] mt-1 font-mono">BK-2026-8942</p>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">اسم النزيل القادم</span>
                <p className="font-bold text-sm text-[#1F2937] mt-1">فهد السبيعي</p>
                <p className="text-[10px] text-[#9CA3AF]" dir="ltr">+966 50 *** 7712</p>
              </div>

              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5">
                <span className="text-[#9CA3AF] block text-[11px]">موعد الوصول المتوقع</span>
                <p className="font-bold text-sm text-[#1F2937] mt-1 flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-[#1F3D2B]" />
                  <span>18 سبتمبر 2026 - 03:00 م</span>
                </p>
                <p className="text-[10px] text-red-600 font-semibold mt-0.5">المتبقي: أقل من 22 ساعة</p>
              </div>
            </div>

            {/* Critical Alert Box */}
            <div className="p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl flex items-start gap-3 text-xs text-[#92400E]">
              <Bell className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">تنبيه حرج للجدول التشغيلي:</span>
                <p className="text-[11px] leading-relaxed">
                  يرجى إنهاء الصيانة والتنظيف قبل الساعة 01:30 م لضمان عدم تأخر تسجيل الدخول الذاتي للنزيل.
                </p>
              </div>
            </div>

            <div className="pt-1 text-left">
              <button
                type="button"
                className="text-xs text-[#1F3D2B] font-semibold flex items-center gap-1 hover:underline"
              >
                <span>عرض ملف الحجز الكامل</span>
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Left Sidebar Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Current Unit Status Governance Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3F4F6]">
              <span className="text-xs font-bold text-[#1F2937]">الحالة الحالية للوحدة 305</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#DC2626] border border-[#FEE2E2]">
                تحت الصيانة
              </span>
            </div>

            <div className="p-3 bg-[#EEF5EE] border border-[#DCE8DC] rounded-2xl text-xs space-y-1.5 text-[#374151]">
              <span className="font-bold text-[#1F3D2B] block">تنويه الحوكمة الإلزامية للمنظومة:</span>
              <p className="text-[11px] leading-relaxed text-[#4B6350]">
                بعد إكمال الصيانة تنتقل الوحدة تلقائياً إلى مرحلة التنظيف قبل أن تصبح متاحة.
              </p>
              <p className="text-[10px] text-[#6B7280] pt-1">
                * المنظومة تحظر الاستقبال أو تغيير الحالة يدوياً حتى استيفاء بروتوكول التعقيم والفحص الرقمي.
              </p>
            </div>
          </div>

          {/* Maintenance Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#1F2937] pb-3 border-b border-[#F3F4F6]">
              التسلسل الزمني لأعمال الصيانة
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">تم إنشاء بلاغ الصيانة</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    بواسطة مديرة العقار عبر التطبيق الإداري
                  </p>
                  <p className="text-[10px] text-[#6B7280]">17 سبتمبر 2026 - 04:15 م</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">تم تعيين فريق الصيانة</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    إسناد البلاغ إلى م. طارق العسيري
                  </p>
                  <p className="text-[10px] text-[#6B7280]">17 سبتمبر 2026 - 04:50 م</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#D97706] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#1F2937]">بدأت أعمال الصيانة الميدانية</p>
                    <span className="px-1.5 py-0.2 bg-[#FEF3C7] text-[#92400E] rounded text-[9px] font-bold">
                      المرحلة الراهنة
                    </span>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    باشر الفني العمل في موقع الوحدة (استبدال التروس والبرمجة)
                  </p>
                  <p className="text-[10px] text-[#6B7280]">17 سبتمبر 2026 - 05:10 م</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 text-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Hourglass className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">تم إكمال الصيانة</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    في انتظار اعتماد الإنجاز واختبار القفل السحابي
                  </p>
                  <p className="text-[10px] text-gray-400">مرحلة قادمة</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 text-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937]">تحويل الوحدة إلى التنظيف</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    خطوة تالية مجدولة آلياً فور إغلاق البلاغ
                  </p>
                  <p className="text-[10px] text-gray-400">مجدولة تلقائياً</p>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Lock Hardware Specs & Panel */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#1F2937] pb-3 border-b border-[#F3F4F6]">
              مواصفات القفل الذكي والاتصال
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                <div>
                  <span className="text-[#9CA3AF] block text-[10px]">طراز القفل (Hardware Model)</span>
                  <span className="font-bold text-[#1F2937] text-xs">Smart Bolt Enterprise V4</span>
                </div>
                <Cpu className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex justify-between items-center p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                <div>
                  <span className="text-[#9CA3AF] block text-[10px]">المعرف السحابي (Device UUID)</span>
                  <span className="font-mono font-bold text-[#1F2937] text-xs">DEV-LK-305</span>
                </div>
                <Lock className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex justify-between items-center p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                <div>
                  <span className="text-[#9CA3AF] block text-[10px]">حالة الاتصال بالبوابة المركزية</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-red-600 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    غير متصل (Offline)
                  </span>
                </div>
                <WifiOff className="w-4 h-4 text-red-500" />
              </div>

              <div className="p-3 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] text-[10px]">نسبة البطارية المتبقية</span>
                  <span className="text-red-600 font-bold text-xs">18% (منخفضة)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full w-[18%]" />
                </div>
                <p className="text-[10px] text-[#6B7280] pt-0.5">
                  سيتم تركيب طقم بطاريات ليثيوم AA جديد عند إنهاء الصيانة.
                </p>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-xl text-[11px] text-[#6B7280] text-center">
                يستلزم إعادة المزامنة اليدوية مع Hub الطابق الثالث فور انتهاء التركيب.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Modal */}
      <MaintenanceStartModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        onConfirm={() => {
          setStatus("in_progress");
        }}
      />
    </div>
  );
}
