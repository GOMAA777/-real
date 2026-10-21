"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  SlidersHorizontal,
  Pause,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  Home,
  Check,
  Percent,
  Download,
  Receipt,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { SubscriptionDetailData } from "../types";
import { mockSubscriptionDetail } from "../data/mock-billing";

interface SubscriptionDetailViewProps {
  data?: SubscriptionDetailData;
}

export function SubscriptionDetailView({
  data = mockSubscriptionDetail,
}: SubscriptionDetailViewProps) {
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(data.subscription.status === "paused");

  const handleTogglePause = () => {
    const nextState = !isPaused;
    setIsPaused(nextState);
    toast.success(
      nextState
        ? "تم تعليق الاشتراك مؤقتاً بنجاح."
        : "تمت إعادة تفعيل الاشتراك بنجاح واستئناف دورة الفوترة."
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. Header Bar [1:27619] */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/billing"
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181d17]">تفاصيل الاشتراك</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e5eae0] text-[#34422a]">
                #{data.subscription.subscriptionCode}
              </span>
              {isPaused ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  معلق مؤقتاً
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4b5940]" />
                  اشتراك نشط
                </span>
              )}
            </div>
            <p className="text-xs text-[#454840] mt-1">
              ملف إدارة ومتابعة التعاقدات والحدود التشغيلية المباشرة للأصل العقاري
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleTogglePause}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              isPaused
                ? "bg-[#d8e8cb] text-[#34422a] hover:bg-[#c6dcbe]"
                : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
            }`}
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>إلغاء التعليق وتفعيل الاشتراك</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>تعليق الاشتراك</span>
              </>
            )}
          </button>

          <Link
            href="/dashboard/billing/pricing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#34422a] hover:bg-[#283320] text-white shadow-sm transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>تعديل سعة الشقق</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 2 Main Cards: Owner Info & Contract Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Right Card: Owner Details */}
        <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#ebefe6] text-[#34422a]">
              معتمد رسمياً
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#181d17]">بيانات مالك العقار</h2>
              <div className="w-8 h-8 rounded-lg bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Owner Profile Banner */}
          <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-gray-100 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#181d17]">{data.owner.name}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                  موثق عبر النفاذ الوطني
                </span>
              </div>
              <div className="text-xs text-gray-500">{data.owner.company}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ebefe6] text-[#34422a] font-bold text-sm flex items-center justify-center shadow-xs">
              {data.owner.avatarInitials}
            </div>
          </div>

          {/* Key Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="text-[11px] text-gray-400 block">رقم الجوال</span>
              <span className="font-mono font-bold text-[#181d17] text-xs mt-0.5 block">
                {data.owner.phone}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="text-[11px] text-gray-400 block">البريد الإلكتروني</span>
              <span className="font-mono text-gray-700 text-xs mt-0.5 block truncate">
                {data.owner.email}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="text-[11px] text-gray-400 block">العقار الرئيسي المرتبط</span>
              <span className="font-semibold text-[#181d17] text-xs mt-0.5 block">
                {data.owner.primaryProperty}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50">
              <span className="text-[11px] text-gray-400 block">تاريخ الانضمام للمنصة</span>
              <span className="font-medium text-gray-700 text-xs mt-0.5 block">
                {data.owner.joinDate}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-gray-400">{data.owner.city}</span>
            <Link
              href="/dashboard/owners/1"
              className="inline-flex items-center gap-1 font-semibold text-[#4b5940] hover:underline"
            >
              <span>فتح ملف المالك الشامل</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Left Card: Billing & Contract Details */}
        <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              سداد تلقائي نشط عبر Mada
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#181d17]">
                تفاصيل الفوترة والتسعير التعاقدي
              </h2>
              <div className="w-8 h-8 rounded-lg bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Pricing Highlight Banner */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-gray-100">
              <span className="text-[11px] text-gray-400 block">سعر الشقة الشهري</span>
              <div className="text-xl font-bold font-mono text-[#181d17] mt-1">
                {data.contract.monthlyPerUnitPrice}{" "}
                <span className="text-xs font-sans text-gray-500">ر.س / شقة / شهر</span>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">تطبيق الفئة المعتمدة B</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#f6fbf1] border border-[#d8e8cb]">
              <span className="text-[11px] text-[#454840] block">الإجمالي الشهري الحالي</span>
              <div className="text-xl font-bold font-mono text-[#34422a] mt-1">
                {data.contract.totalMonthlyAmount}{" "}
                <span className="text-xs font-sans text-gray-600">ر.س / شهر</span>
              </div>
              <span className="text-[10px] text-emerald-800 mt-1 block">
                شامل ضريبة 15% ZATCA
              </span>
            </div>
          </div>

          {/* Contract Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50">
              <span className="text-[10px] text-gray-400 block">التجديد القادم</span>
              <span className="font-bold text-[#181d17] text-xs mt-0.5 block">
                {data.contract.nextRenewalDate}
              </span>
              <span className="text-[10px] text-emerald-700">
                متبقي {data.contract.daysRemaining} يوماً
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50">
              <span className="text-[10px] text-gray-400 block">دورة الفوترة</span>
              <span className="font-bold text-[#181d17] text-xs mt-0.5 block">
                {data.contract.billingCycleLabel}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50">
              <span className="text-[10px] text-gray-400 block">تاريخ بدء الاشتراك</span>
              <span className="font-bold text-[#181d17] text-xs mt-0.5 block">
                {data.contract.startDate}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50">
              <span className="text-[10px] text-gray-400 block">طريقة الدفع</span>
              <span className="font-mono font-bold text-[#181d17] text-xs mt-0.5 block">
                {data.contract.paymentMethod}
              </span>
              <span className="text-[10px] text-gray-400">
                {data.contract.overdueClaimsCount} مطالبات متأخرة
              </span>
            </div>
          </div>

          {/* Payment method action */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[11px] text-gray-400 font-mono">
              الفاتورة القادمة تصدر مؤتمتة وتخصم تلقائياً بتاريخ 2026-11-01
            </span>
            <button
              type="button"
              onClick={() => toast.info("فتح نافذة تعديل البطاقة وطريقة الدفع")}
              className="text-xs font-semibold text-[#4b5940] hover:underline"
            >
              تعديل طريقة الدفع
            </button>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Apartment Entitlements [1:27619] */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#181d17]">
                رصيد وسعة الشقق (Apartment Entitlements)
              </h2>
              <div className="w-7 h-7 rounded-lg bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              توزيع تراخيص الوحدات السكنية المسموح بإدراجها وتأجيرها ضمن المنظومة
            </p>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            معيار التسعير: {data.entitlements.purchasedUnits} وحدات مرخصة
          </span>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <span className="text-xs text-gray-500">الشقق المشتراة (Purchased)</span>
            <div className="text-2xl font-bold font-mono text-[#181d17] mt-1">
              {data.entitlements.purchasedUnits}
            </div>
            <span className="text-[11px] text-gray-400">سقف الترخيص الحالي</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f6fbf1] border border-[#d8e8cb]">
            <span className="text-xs text-[#454840]">الشقق المستخدمة (Used)</span>
            <div className="text-2xl font-bold font-mono text-[#34422a] mt-1">
              {data.entitlements.usedUnits}
            </div>
            <span className="text-[11px] text-emerald-800 font-medium">
              شقق نشطة ومربوطة بالنظام
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <span className="text-xs text-amber-900">الشقق المتبقية (Remaining)</span>
            <div className="text-2xl font-bold font-mono text-amber-900 mt-1">
              {data.entitlements.remainingUnits}
            </div>
            <span className="text-[11px] text-amber-700">جاهزة لإضافة وحدات جديدة</span>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <span className="text-xs text-gray-500">نسبة استهلاك السعة</span>
            <div className="text-2xl font-bold font-mono text-[#181d17] mt-1">
              {data.entitlements.usagePercentage}%
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {data.entitlements.healthStatusLabel} (متبقي 33.3% من السعة)
            </span>
          </div>
        </div>

        {/* Horizontal Dual-Color Capacity Bar */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#FAFBF9] border border-gray-100">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#34422a]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34422a]" />
              المستخدم: {data.entitlements.usedUnits} شقق (66.7%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fde68a]" />
              المتاح للاستخدام: {data.entitlements.remainingUnits} شقق (33.3%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex">
            <div
              className="h-full bg-[#34422a] transition-all"
              style={{ width: "66.7%" }}
            />
            <div
              className="h-full bg-[#fde68a] transition-all"
              style={{ width: "33.3%" }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 font-mono">
            <span>0 شقق</span>
            <span>سعة الأساس (5)</span>
            <span>الحد الحالي (9 شقق)</span>
          </div>
        </div>

        {/* Real Units Linked Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#181d17]">
              الوحدات الفعلية المربوطة حالياً بالترخيص ({data.entitlements.units.length} وحدات)
            </span>
            <span className="text-gray-400">عمارة النخيل • حي الياسمين</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {data.entitlements.units.map((unit) => (
              <div
                key={unit.id}
                className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-right space-y-1 hover:border-[#4b5940] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-xs text-[#181d17]">{unit.unitNumber}</span>
                </div>
                <div className="text-[11px] text-gray-500 truncate">{unit.unitType}</div>
                <div className="text-[10px] text-emerald-800 font-medium pt-1">
                  {unit.statusLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom 2-Column Split: Invoices Table & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column: Invoices Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
              للقراءة فقط (سجل مقفل)
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#181d17]">
                الفواتير الصادرة وسجل السداد
              </h2>
              <div className="w-8 h-8 rounded-lg bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 -mt-2">
            سجل فواتير ZATCA الإلكترونية الضريبية المعتمدة
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-[#FAFBF9] border-b border-gray-100 text-[#454840] font-bold">
                  <th className="py-3 px-3">رقم الفاتورة</th>
                  <th className="py-3 px-3">تاريخ الإصدار</th>
                  <th className="py-3 px-3">الفترة المغطاة</th>
                  <th className="py-3 px-3">السعة</th>
                  <th className="py-3 px-3">الإجمالي</th>
                  <th className="py-3 px-3">وسيلة الدفع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#181d17]">
                {data.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-xs">{inv.invoiceNumber}</td>
                    <td className="py-3.5 px-3 text-gray-600">{inv.issueDate}</td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-gray-500">
                      {inv.periodCovered}
                    </td>
                    <td className="py-3.5 px-3 font-semibold">
                      {inv.capacityUnits} شقق
                      {inv.capacityExtra && (
                        <span className="text-[10px] text-emerald-700 ms-1">(+{inv.capacityExtra})</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-bold font-mono text-sm">{inv.totalFormatted}</td>
                    <td className="py-3.5 px-3 text-gray-600 font-mono text-[11px]">
                      {inv.paymentMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Left Column: Audit Timeline (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs text-gray-400 font-mono">6 أحداث مسجلة</span>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#181d17]">
                سجل التدقيق والتتبع الزمني
              </h2>
              <div className="w-8 h-8 rounded-lg bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="relative pr-4 space-y-4 before:absolute before:right-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 text-xs text-right">
            {data.auditTimeline.map((ev) => (
              <div key={ev.id} className="relative flex items-start gap-3">
                <div
                  className={`w-4 h-4 rounded-full mt-0.5 shrink-0 z-10 ring-4 ring-white ${
                    ev.type === "renewal" || ev.type === "payment"
                      ? "bg-emerald-500"
                      : ev.type === "upgrade"
                      ? "bg-amber-500"
                      : ev.type === "pause"
                      ? "bg-red-500"
                      : "bg-[#34422a]"
                  }`}
                />
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181d17] text-xs">{ev.title}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {ev.date} • {ev.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{ev.description}</p>
                  <div className="text-[10px] text-gray-400 font-medium pt-0.5">{ev.actor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
