"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Plus,
  RotateCcw,
  Sliders,
  ChevronDown,
  Building2,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  MoreVertical,
  SlidersHorizontal,
  FileText,
  Percent,
} from "lucide-react";
import { toast } from "sonner";
import { Subscription } from "../types";
import { initialSubscriptions } from "../data/mock-billing";

export function SubscriptionsListView() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "trial" | "expiring_soon" | "paused" | "cancelled"
  >("all");
  const [billingCycleFilter, setBillingCycleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث بيانات الاشتراكات والفوترة اللحظية.");
    }, 600);
  };

  const handleExport = () => {
    toast.info("جارٍ تجهيز سجل الاشتراكات الضريبية بصيغة CSV...");
    setTimeout(() => {
      toast.success("تم تصدير سجل الاشتراكات بنجاح!");
    }, 800);
  };

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.ownerPhone.includes(searchQuery) ||
        (sub.ownerCompany && sub.ownerCompany.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sub.subscriptionCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && sub.status === "active") ||
        (activeTab === "trial" && sub.status === "trial") ||
        (activeTab === "expiring_soon" && (sub.status === "expiring_soon" || sub.status === "pending_payment")) ||
        (activeTab === "paused" && sub.status === "paused") ||
        (activeTab === "cancelled" && sub.status === "cancelled");

      const matchesCycle =
        billingCycleFilter === "all" || sub.billingCycle === billingCycleFilter;

      return matchesSearch && matchesTab && matchesCycle;
    });
  }, [subscriptions, searchQuery, activeTab, billingCycleFilter]);

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. Header Card [1:26926] */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#181d17]">الاشتراكات</h1>
          <p className="text-xs text-[#454840] mt-1">
            إدارة اشتراكات أصحاب العقارات ومتابعة الباقات وحالات الدفع والأرصدة المستهلكة بدقة فائقة.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/dashboard/billing/pricing"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FAFBF9] hover:bg-gray-100 text-[#181d17] border border-gray-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#4b5940]" />
            <span>تعديل سعة الشقق والأسعار</span>
          </Link>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FAFBF9] hover:bg-gray-100 text-[#181d17] border border-gray-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#4b5940]" />
            <span>تصدير السجل</span>
          </button>

          <button
            type="button"
            onClick={() => toast.info("نافذة إضافة اشتراك جديد متاحة لمدراء النظام")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#34422a] hover:bg-[#283320] text-white shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة اشتراك</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Total */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">إجمالي الاشتراكات</span>
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-[#181d17]">248</div>
            <div className="text-[11px] text-gray-400 mt-0.5">كل المسجل</div>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">نشطة</span>
            <div className="w-7 h-7 rounded-lg bg-[#d8e8cb] flex items-center justify-center text-[#34422a]">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-2xl font-bold font-mono text-[#181d17]">214</div>
            <span className="text-[11px] font-semibold text-emerald-700">86.3%</span>
          </div>
        </div>

        {/* Card 3: Trial */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">تجريبية</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-blue-900">12</div>
            <div className="text-[11px] text-blue-600 mt-0.5">فترة مجانية</div>
          </div>
        </div>

        {/* Card 4: Expiring */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">منتهية</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-700">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-red-900">14</div>
            <div className="text-[11px] text-red-600 font-semibold mt-0.5">بحاجة للتجديد</div>
          </div>
        </div>

        {/* Card 5: Paused */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">متوقفة</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-amber-900">8</div>
            <div className="text-[11px] text-amber-700 mt-0.5">تعليق إداري</div>
          </div>
        </div>
      </div>

      {/* 3. Main Data Card: Tabs, Filters, Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-5">
        {/* Sub-Tabs Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-[#34422a] text-white shadow-xs"
                  : "bg-gray-100 text-[#454840] hover:bg-gray-200"
              }`}
            >
              الكل (248)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "active"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-gray-100 text-[#454840] hover:bg-gray-200"
              }`}
            >
              نشطة (214)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("trial")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "trial"
                  ? "bg-blue-700 text-white shadow-xs"
                  : "bg-gray-100 text-[#454840] hover:bg-gray-200"
              }`}
            >
              تجريبية (12)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("expiring_soon")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "expiring_soon"
                  ? "bg-red-700 text-white shadow-xs"
                  : "bg-gray-100 text-[#454840] hover:bg-gray-200"
              }`}
            >
              منتهية (14)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("paused")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "paused"
                  ? "bg-amber-700 text-white shadow-xs"
                  : "bg-gray-100 text-[#454840] hover:bg-gray-200"
              }`}
            >
              موقوفة (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cancelled")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "cancelled"
                  ? "bg-gray-700 text-white shadow-xs"
                  : "bg-gray-100 text-[#454840] hover:bg-gray-200"
              }`}
            >
              ملغاة (0)
            </button>
          </div>

          <div className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>آخر تحديث: منذ دقيقتين</span>
          </div>
        </div>

        {/* Search & Select Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المالك، المعرّف، أو رقم الاشتراك..."
              className="w-full h-10 pr-10 pl-4 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4b5940] transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <select
              value={billingCycleFilter}
              onChange={(e) => setBillingCycleFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-gray-200 text-xs text-[#454840] bg-white focus:outline-none focus:border-[#4b5940]"
            >
              <option value="all">دورة الفوترة: الكل</option>
              <option value="monthly">شهري</option>
              <option value="annual">سنوي</option>
            </select>

            <select
              defaultValue="all"
              className="h-10 px-3 rounded-xl border border-gray-200 text-xs text-[#454840] bg-white focus:outline-none focus:border-[#4b5940]"
            >
              <option value="all">حالة الدفع: الكل</option>
              <option value="paid">مسدد</option>
              <option value="pending">بانتظار الدفع</option>
            </select>

            <select
              defaultValue="all"
              className="h-10 px-3 rounded-xl border border-gray-200 text-xs text-[#454840] bg-white focus:outline-none focus:border-[#4b5940]"
            >
              <option value="all">الباقة: الكل</option>
              <option value="custom">باقة الشقق المرخصة</option>
            </select>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              title="تحديث القائمة"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* 4. Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-gray-100 text-[#454840] font-bold">
                <th className="py-3.5 pr-4">صاحب العقار</th>
                <th className="py-3.5 px-3">دورة الفوترة</th>
                <th className="py-3.5 px-3">الشقق المشتراة</th>
                <th className="py-3.5 px-3">استهلاك الوحدات</th>
                <th className="py-3.5 px-3">المتبقي</th>
                <th className="py-3.5 px-3">قيمة الاشتراك</th>
                <th className="py-3.5 px-3">تاريخ البداية</th>
                <th className="py-3.5 px-3">تاريخ التجديد / الانتهاء</th>
                <th className="py-3.5 px-3">الحالة</th>
                <th className="py-3.5 pl-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#181d17]">
              {filteredSubscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-[#FAFBF9]/80 transition-colors group cursor-pointer"
                >
                  {/* Owner */}
                  <td className="py-4 pr-4">
                    <Link
                      href={`/dashboard/billing/${sub.id}`}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#ebefe6] text-[#34422a] font-bold text-xs flex items-center justify-center shrink-0">
                        {sub.avatarInitials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#181d17] group-hover:text-[#4b5940] transition-colors">
                          {sub.ownerName}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {sub.ownerCompany || sub.ownerPhone}
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* Billing Cycle */}
                  <td className="py-4 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-100 text-gray-700">
                      {sub.billingCycleLabel}
                    </span>
                  </td>

                  {/* Purchased Units */}
                  <td className="py-4 px-3">
                    <div className="font-bold text-xs font-mono">{sub.purchasedUnits} شقق</div>
                  </td>

                  {/* Units Usage Progress */}
                  <td className="py-4 px-3 min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-gray-700">
                          {sub.usedUnits} مستخدمة
                        </span>
                        <span className="text-gray-400 font-mono">{sub.usagePercentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#34422a] transition-all"
                          style={{ width: `${sub.usagePercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Remaining Units */}
                  <td className="py-4 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                        sub.remainingUnits > 0
                          ? "bg-[#ebefe6] text-[#34422a]"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {sub.remainingUnits} شقق
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-3">
                    <div className="font-bold font-mono text-sm text-[#181d17]">
                      {sub.priceFormatted}
                    </div>
                    <div className="text-[10px] text-gray-400">{sub.vatNotice}</div>
                  </td>

                  {/* Start Date */}
                  <td className="py-4 px-3 text-gray-600">
                    <div>{sub.startDate}</div>
                  </td>

                  {/* Renewal Date & Countdown */}
                  <td className="py-4 px-3">
                    <div className="font-semibold text-xs text-[#181d17]">{sub.renewalDate}</div>
                    <div
                      className={`text-[10px] font-medium mt-0.5 ${
                        sub.status === "expiring_soon"
                          ? "text-red-600 font-bold"
                          : sub.status === "paused"
                          ? "text-amber-700"
                          : "text-gray-400"
                      }`}
                    >
                      {sub.statusSubText || `متبقي ${sub.renewalCountdownDays} يوماً`}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-3">
                    {sub.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4b5940]" />
                        {sub.statusLabel}
                      </span>
                    ) : sub.status === "pending_payment" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        {sub.statusLabel}
                      </span>
                    ) : sub.status === "expiring_soon" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                        {sub.statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                        {sub.statusLabel}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 pl-4 text-center">
                    <Link
                      href={`/dashboard/billing/${sub.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#ebefe6] text-[#454840] hover:text-[#34422a] text-[11px] font-semibold transition-colors"
                    >
                      <span>عرض</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-gray-500">
          <div>عرض 1-8 من أصل 248 اشتراك مسجل</div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              السابق
            </button>
            <span className="w-8 h-8 rounded-lg bg-[#34422a] text-white font-bold flex items-center justify-center">
              1
            </span>
            <button
              type="button"
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              3
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button
              type="button"
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              31
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* 6. Policy Notice Banner [1:26926] */}
      <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#EBEBEB] flex items-start gap-3 text-xs text-gray-600">
        <div className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-[#181d17]">
            سياسة احتساب استهلاك العقارات وتعديل الباقات
          </h4>
          <p className="text-[11px] leading-relaxed text-[#454840]">
            يتم احتساب عدد العقارات بناءً على العقارات النشطة فقط والمسندة لمالك العقار. عند تخفيض
            الباقة أو انتهاء مدتها، لا يتم مسح أو تجميد العقارات الفائضة تلقائياً لضمان سلامة العمليات
            التشغيلية، بل يتم إرسال إشعار للمالك وظهور تنبيه تجاوز الحد لإدارة المنصة لاتخاذ الإجراء
            المناسب.
          </p>
        </div>
      </div>
    </div>
  );
}
