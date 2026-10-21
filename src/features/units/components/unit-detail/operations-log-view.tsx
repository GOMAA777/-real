"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Filter,
  RefreshCw,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

interface OperationsLogViewProps {
  onBack?: () => void;
  unitNumber?: string;
  propertyName?: string;
}

export function OperationsLogView({
  onBack,
  unitNumber = "204",
  propertyName = "عمارة النخيل",
}: OperationsLogViewProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const operations = [
    {
      id: "1",
      reference: "#CLN-2026-902",
      subref: "مهمة فندقية دورية",
      type: "تنظيف الوحدة والتعقيم الشامل",
      details: "تم فحص كافة المرافق وتطهير الأسطح",
      iconType: "cleaning",
      date: "17 سبتمبر 2026",
      teamInitials: "رع",
      teamName: "فريق التنظيف",
      teamSub: "شركة رعاية الفندقية",
      duration: "45 دقيقة",
      durationSub: "تم اجتياز الفحص 100%",
      status: "completed",
    },
    {
      id: "2",
      reference: "#CLN-2026-902",
      subref: "مهمة فندقية دورية",
      type: "صيانة القفل الذكي وبوابة الدخول",
      details: "تم استبدال خلايا الطاقة وإعادة المزامنة",
      iconType: "lock",
      date: "17 سبتمبر 2026",
      teamInitials: "عش",
      teamName: "م. عبد الله الشمري",
      teamSub: "فريق الصيانة الميدانية",
      duration: "25 دقيقة",
      durationSub: "استبدال بطارية القفل ومزامنة",
      status: "completed",
    },
    {
      id: "3",
      reference: "#CLN-2026-902",
      subref: "مهمة فندقية دورية",
      type: "تنظيف الوحدة والتعقيم الشامل",
      details: "تم فحص كافة المرافق واعتماد السلامة",
      iconType: "cleaning",
      date: "17 سبتمبر 2026",
      teamInitials: "سل",
      teamName: "فريق السلامة الوقائية",
      teamSub: "إدارة المخاطر - رواق",
      duration: "30 دقيقة",
      durationSub: "شهادة سلامة معتمدة",
      status: "completed",
    },
    {
      id: "4",
      reference: "#CLN-2026-902",
      subref: "مهمة فندقية دورية",
      type: "تنظيف الوحدة والتعقيم الشامل",
      details: "تم فحص كافة المرافق والفرش",
      iconType: "cleaning",
      date: "17 سبتمبر 2026",
      teamInitials: "نظ",
      teamName: "فريق النظافة المتخصص",
      teamSub: "مؤسسة البريق الماسي",
      duration: "90 دقيقة",
      durationSub: "تم الاعتماد المخبري",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-5 text-start">
      {/* Top Header Card */}
      <div className="bg-white rounded-[16px] p-6 border border-[#EEF2E6] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-xs font-semibold text-[#57534E] hover:text-[#181D17] transition-colors cursor-pointer"
              >
                ← العودة لتفاصيل الوحدة
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold text-[#181D17] mt-1">
            سجل العمليات — الوحدة {unitNumber}
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] mt-1">
            {propertyName} (PR-1048) • الرياض — حي العليا • المالك: محمد العتيبي (OWN-4491)
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => toast.info("جاري تحديث السجل التشغيلي...")}
            className="h-10 px-4 rounded-[10px] bg-white border border-[#D5DDD0] hover:bg-[#F4F6F0] text-[#181D17] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#57534E]" />
            <span>تحديث السجل</span>
          </button>
          <button
            type="button"
            onClick={() => toast.success("جاري تصدير سجل العمليات (CSV / Excel)...")}
            className="h-10 px-5 rounded-[10px] bg-[#34422A] hover:bg-[#2C3825] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>تصدير السجل (CSV / Excel)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#7D8A78] block">إجمالي العمليات المسجلة</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#181D17]">24</span>
              <span className="text-[11px] text-[#7D8A78]">عملية معتمدة</span>
            </div>
          </div>
          <span className="w-11 h-11 rounded-2xl bg-[#EAEFE4] text-[#34422A] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#7D8A78] block">مهام التنظيف المعتمدة</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#181D17]">16</span>
              <span className="text-[11px] text-[#2A6B3A] font-bold">مكتملة 100%</span>
            </div>
          </div>
          <span className="w-11 h-11 rounded-2xl bg-[#EAEFE4] text-[#34422A] flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#7D8A78] block">بلاغات الصيانة</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#181D17]">8</span>
              <span className="text-[11px] text-[#7D8A78]">7 مكتملة • 1 مؤرشف</span>
            </div>
          </div>
          <span className="w-11 h-11 rounded-2xl bg-[#EAEFE4] text-[#34422A] flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-[#7D8A78] block">متوسط زمن الاستجابة</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#181D17]">35</span>
              <span className="text-[11px] text-[#7D8A78]">دقيقة / مهمة</span>
            </div>
          </div>
          <span className="w-11 h-11 rounded-2xl bg-[#EAEFE4] text-[#34422A] flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-[16px] p-4 border border-[#EEF2E6] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#7D8A78] absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث في تفاصيل العملية، رقم التذكرة، أو اسم المنفذ..."
            className="w-full h-10 ps-10 pe-4 rounded-[10px] bg-[#F6F7F4] text-xs text-[#181D17] placeholder:text-[#A5A9A2] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="h-10 px-3.5 rounded-[10px] bg-[#F6F7F4] text-xs text-[#57534E] flex items-center gap-1.5 cursor-pointer"
          >
            <span>نوع العملية: الكل</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="h-10 px-3.5 rounded-[10px] bg-[#F6F7F4] text-xs text-[#57534E] flex items-center gap-1.5 cursor-pointer"
          >
            <span>الحالة: الكل</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="h-10 px-3.5 rounded-[10px] bg-[#F6F7F4] text-xs text-[#57534E] flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>النطاق: آخر 30 يوم</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Operations Table Card */}
      <div className="bg-white rounded-[16px] border border-[#EEF2E6] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="bg-[#F9FAF8] border-b border-[#EEF2E6] text-[11px] font-bold text-[#75786F]">
                <th className="py-4 px-4 text-start">رقم المرجع</th>
                <th className="py-4 px-4 text-start">نوع العملية وتفاصيل الإجراء</th>
                <th className="py-4 px-4 text-center">التاريخ والتوقيت الدقيق</th>
                <th className="py-4 px-4 text-start">الفريق / المنفذ المسؤول</th>
                <th className="py-4 px-4 text-center">المدة المستغرقة والفحص</th>
                <th className="py-4 px-4 text-center">الحالة التشغيلية</th>
                <th className="py-4 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2E6]">
              {operations.map((op) => (
                <tr key={op.id} className="hover:bg-[#FAFBF8] transition-colors">
                  {/* Reference */}
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-[#181D17] block">
                      {op.reference}
                    </span>
                    <span className="text-[10.5px] text-[#7D8A78] block">
                      {op.subref}
                    </span>
                  </td>

                  {/* Operation & Details */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#EAEFE4] text-[#34422A] flex items-center justify-center shrink-0">
                        {op.iconType === "cleaning" ? (
                          <RefreshCw className="w-4 h-4" />
                        ) : (
                          <Wrench className="w-4 h-4" />
                        )}
                      </span>
                      <div>
                        <span className="font-bold text-[#181D17] block">
                          {op.type}
                        </span>
                        <span className="text-[11px] text-[#7D8A78] block">
                          {op.details}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-center font-medium text-[#181D17]">
                    {op.date}
                  </td>

                  {/* Responsible team */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-[#EAEFE4] text-[#34422A] text-xs font-bold flex items-center justify-center shrink-0">
                        {op.teamInitials}
                      </span>
                      <div>
                        <span className="font-bold text-[#181D17] block text-xs">
                          {op.teamName}
                        </span>
                        <span className="text-[10px] text-[#7D8A78] block">
                          {op.teamSub}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-[#181D17] block">{op.duration}</span>
                    <span className="text-[10.5px] text-[#2A6B3A] block font-medium">
                      {op.durationSub}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D8E8CB] text-[10.5px] font-bold text-[#2A6B3A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2A6B3A]" />
                      مكتمل
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => toast.info(`تفاصيل العملية: ${op.type} (${op.reference})`)}
                      className="px-3 py-1 rounded-[8px] bg-[#F1F5EB] hover:bg-[#E6ECD9] text-[#181D17] text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3 text-[#34422A]" />
                      <span>عرض التفاصيل</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="px-6 py-4 bg-[#F9FAF8] border-t border-[#EEF2E6] flex items-center justify-between gap-4 flex-wrap text-xs text-[#57534E]">
          <div>
            عرض <span className="font-bold text-[#181D17]">1 - 5</span> من أصل 24 عملية تشغيلية مسجلة
          </div>
          <div className="flex items-center gap-2">
            <span>الصفوف لكل صفحة: 10 حجوزات</span>
            <div className="flex items-center gap-1 ms-2">
              <button
                type="button"
                className="w-7 h-7 rounded-[6px] bg-white border border-[#E2E6DC] flex items-center justify-center text-[#7C8773] hover:text-[#181D17] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-[6px] bg-[#34422A] text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <button
                type="button"
                className="w-7 h-7 rounded-[6px] bg-white border border-[#E2E6DC] flex items-center justify-center text-[#7C8773] hover:text-[#181D17] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Governance & Audit Note Banner */}
      <div className="p-4 rounded-[14px] bg-[#FAFBF8] border border-[#D5DDD0] flex items-start gap-3 text-start">
        <ShieldCheck className="w-5 h-5 text-[#34422A] shrink-0 mt-0.5" />
        <p className="text-xs leading-[20px] text-[#57534E]">
          <span className="font-bold text-[#181D17]">تنويه التدقيق والحوكمة:</span> سجل التدقيق التشغيلي موثق ومحمي برمجياً ضد التعديل أو الحذف اليدوي وفق اشتراطات الحوكمة لمنصة رواق لإدارة الأصول العقارية. يتاح للمشرفين الاطلاع الكامل وتصدير السجلات المعتمدة لأغراض الرقابة المالية والميدانية فقط.
        </p>
      </div>
    </div>
  );
}
