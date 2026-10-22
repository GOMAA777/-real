"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

export function PricingSettingsView() {
  const router = useRouter();
  const confirm = useConfirm();

  // Dynamic pricing state for live recalculation
  const [monthlyPrice, setMonthlyPrice] = useState<number>(99);
  const [annualPrice, setAnnualPrice] = useState<number>(999);
  const [effectiveDate, setEffectiveDate] = useState<string>("1 نوفمبر 2026");
  const [notes, setNotes] = useState<string>(
    "تثبيت تعرفة التسعير السنوي الموحدة عند 999 ر.س لكل وحدة سكنية مع إبقاء التسعير التناسبي Prorated."
  );

  // Calculated values
  const yearlyFromMonthly = monthlyPrice * 12;
  const savings = Math.max(0, yearlyFromMonthly - annualPrice);
  const discountPercent =
    yearlyFromMonthly > 0 ? ((savings / yearlyFromMonthly) * 100).toFixed(1) : "0";

  // Tax calculations for monthly
  const monthlyVat = (monthlyPrice * 0.15 * (100 / 115)).toFixed(2);
  const monthlyBasic = (monthlyPrice - parseFloat(monthlyVat)).toFixed(2);

  // Tax calculations for annual
  const annualVat = (annualPrice * 0.15 * (100 / 115)).toFixed(2);
  const annualBasic = (annualPrice - parseFloat(annualVat)).toFixed(2);

  const handleSaveDraft = async () => {
    const ok = await confirm({
      title: "حفظ مسودة التسعير",
      message: "هل أنت متأكد من حفظ الإعدادات الحالية كمسودة غير منشورة؟",
      confirmLabel: "حفظ كمسودة",
      variant: "default",
    });
    if (!ok) return;
    toast.success("تم حفظ مسودة إعدادات التسعير بنجاح");
  };

  const handleConfirmPublish = async () => {
    const ok = await confirm({
      title: "تأكيد حفظ ونشر إعدادات التسعير",
      message: `هل أنت متأكد من اعتماد ونشر تعرفة الأسعار الجديدة (تاريخ السريان: ${effectiveDate})؟ سيتم تطبيق الأسعار على دورات الفوترة القادمة.`,
      confirmLabel: "حفظ ونشر التعديلات",
      variant: "default",
    });
    if (!ok) return;

    toast.success("تم تحديث وجدولة تعرفة الأسعار الجديدة بنجاح", {
      description: `تاريخ السريان: ${effectiveDate} | السعر السنوي: ${annualPrice} ر.س`,
    });
    router.push("/dashboard/billing");
  };

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full min-h-screen pb-24"
      dir="rtl"
      data-name="تعديل سعة الشقق"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 mb-6">
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-['Cairo'] font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات التسعير
          </h1>
          <p className="font-['Cairo'] font-medium text-[#454840] text-[13px] leading-[20px]">
            التحكم في سعر الاشتراك لكل شقة ودورة الفوترة وقواعد التسعير الديناميكي للمنظومة.
          </p>
        </div>
      </div>

      {/* SECTION 1: Current Pricing Cards */}
      <div className="w-full space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="font-['Cairo'] font-bold text-[#181d17] text-[20px] leading-[30px]">
            التسعير الحالي الساري
          </div>
          <div className="font-['Cairo'] font-semibold text-[#454840] text-[12px] leading-[18px]">
            الخطة النشطة المعتمدة في بوابات الدفع
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Annual Plan */}
          <div className="bg-[rgba(242,225,192,0.3)] flex flex-col justify-between overflow-hidden p-6 relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[rgba(242,225,192,0.6)]">
            <div className="absolute bg-[#695d43] h-[6px] left-0 right-0 top-0" />

            <div className="space-y-4 pt-1">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="flex gap-2 items-center">
                  <div className="bg-[#f2e1c0] flex items-center justify-center rounded-[12px] size-[40px] shrink-0">
                    <img
                      alt="Annual Plan"
                      className="size-5"
                      src="/assets/billing/266f37007e2eded4ab327e8f8431326a23fcc818.svg"
                    />
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <h3 className="font-['Cairo'] font-bold text-[#181d17] text-[18px] leading-[28px]">
                        الاشتراك السنوي
                      </h3>
                      <span className="bg-[#695d43] px-2 py-0.5 rounded-[4px] font-['Cairo'] font-bold text-[11px] text-white">
                        الأكثر كفاءة
                      </span>
                    </div>
                    <div className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[16px]">
                      دورة الفوترة: كل 365 يوماً
                    </div>
                  </div>
                </div>

                <div className="bg-[#d8e8c7] flex gap-1.5 items-center px-3 py-1 rounded-full">
                  <span className="bg-[#34422a] rounded-full size-1.5" />
                  <span className="font-['Cairo'] font-bold text-[#3d4b33] text-[11px] leading-[16px]">
                    نشط ومعتمد
                  </span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2">
                <span className="font-['Cairo'] font-bold text-[#181d17] text-[56px] leading-[68px] tracking-tight">
                  999
                </span>
                <span className="font-['Cairo'] font-semibold text-[#454840] text-[18px]">
                  ر.س
                </span>
                <span className="bg-[#ebefe6] px-2 py-0.5 rounded-[8px] font-['Cairo'] font-medium text-[#454840] text-[11px]">
                  لكل شقة / سنة
                </span>
              </div>

              {/* VAT Breakdown Box */}
              <div className="bg-[rgba(255,255,255,0.85)] flex flex-col gap-1.5 p-3 rounded-[8px] border border-white">
                <div className="flex items-center justify-between font-['Cairo'] text-[11px]">
                  <span className="text-[#454840]">شامل 15% ضريبة القيمة المضافة (VAT):</span>
                  <span className="font-bold text-[#181d17]">130.30 ر.س ضريبة</span>
                </div>
                <div className="flex items-center justify-between font-['Cairo'] text-[11px]">
                  <span className="text-[#454840]">المبلغ الخاضع للضريبة (الأساسي):</span>
                  <span className="font-bold text-[#181d17]">868.70 ر.س</span>
                </div>
                <div className="bg-[rgba(216,232,199,0.4)] flex items-center justify-between px-2 py-1 rounded-[4px] mt-1 font-['Cairo'] text-[11px]">
                  <span className="font-bold text-[#34422a]">التوفير السنوي الفعلي المعتمد:</span>
                  <span className="font-bold text-[#34422a]">وفر 189 ر.س للشقة (15.9% خصم)</span>
                </div>
              </div>
            </div>

            {/* Bottom active subscribers count */}
            <div className="mt-4 -mx-6 -mb-6 bg-[rgba(242,225,192,0.5)] flex items-center justify-between px-6 py-3 border-t border-[rgba(242,225,192,0.8)]">
              <div className="flex gap-1.5 items-center font-['Cairo'] text-[12px] text-[#454840]">
                <img
                  alt=""
                  className="size-4 opacity-80"
                  src="/assets/billing/4491f1404eaa45534624a07d14b7e1140ea5a6dd.svg"
                />
                <span className="font-semibold">عدد المشتركين النشطين:</span>
              </div>
              <div className="font-['Cairo'] text-[12px]">
                <strong className="text-[#181d17]">64 مالك </strong>
                <span className="text-[#454840]">(976 شقة مرخصة)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Monthly Plan */}
          <div className="bg-white flex flex-col justify-between overflow-hidden p-6 relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="absolute bg-[#4b5940] h-[6px] left-0 right-0 top-0" />

            <div className="space-y-4 pt-1">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="flex gap-2 items-center">
                  <div className="bg-[#ebefe6] flex items-center justify-center rounded-[12px] size-[40px] shrink-0">
                    <img
                      alt="Monthly Plan"
                      className="size-5"
                      src="/assets/billing/2ae73d1daec0f83843013b6588f86949b0f2f3de.svg"
                    />
                  </div>
                  <div>
                    <h3 className="font-['Cairo'] font-bold text-[#181d17] text-[18px] leading-[28px]">
                      الاشتراك الشهري
                    </h3>
                    <div className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[16px]">
                      دورة الفوترة: كل 30 يوماً
                    </div>
                  </div>
                </div>

                <div className="bg-[#d8e8c7] flex gap-1.5 items-center px-3 py-1 rounded-full">
                  <span className="bg-[#34422a] rounded-full size-1.5" />
                  <span className="font-['Cairo'] font-bold text-[#3d4b33] text-[11px] leading-[16px]">
                    نشط ومعتمد
                  </span>
                </div>
              </div>

              {/* Price display */}
              <div className="flex items-baseline gap-2">
                <span className="font-['Cairo'] font-bold text-[#181d17] text-[56px] leading-[68px] tracking-tight">
                  99
                </span>
                <span className="font-['Cairo'] font-semibold text-[#454840] text-[18px]">
                  ر.س
                </span>
                <span className="bg-[#ebefe6] px-2 py-0.5 rounded-[8px] font-['Cairo'] font-medium text-[#454840] text-[11px]">
                  لكل شقة / شهر
                </span>
              </div>

              {/* VAT Breakdown Box */}
              <div className="bg-[#f1f5eb] flex flex-col gap-1.5 p-3 rounded-[8px]">
                <div className="flex items-center justify-between font-['Cairo'] text-[11px]">
                  <span className="text-[#454840]">شامل 15% ضريبة القيمة المضافة (VAT):</span>
                  <span className="font-bold text-[#181d17]">12.91 ر.س ضريبة</span>
                </div>
                <div className="flex items-center justify-between font-['Cairo'] text-[11px]">
                  <span className="text-[#454840]">المبلغ الخاضع للضريبة (الأساسي):</span>
                  <span className="font-bold text-[#181d17]">86.09 ر.س</span>
                </div>
                <div className="h-6" /> {/* Placeholder to balance heights */}
              </div>
            </div>

            {/* Bottom active subscribers count */}
            <div className="mt-4 -mx-6 -mb-6 bg-[rgba(235,239,230,0.5)] flex items-center justify-between px-6 py-3 border-t border-[#e2e7dc]">
              <div className="flex gap-1.5 items-center font-['Cairo'] text-[12px] text-[#454840]">
                <img
                  alt=""
                  className="size-4 opacity-80"
                  src="/assets/billing/6a0991bdecca29a1d25280f23a64025744a33567.svg"
                />
                <span className="font-semibold">عدد المشتركين النشطين:</span>
              </div>
              <div className="font-['Cairo'] text-[12px]">
                <strong className="text-[#181d17]">184 مالك </strong>
                <span className="text-[#454840]">(1,920 شقة مرخصة)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Dynamic Form & Live Recalculation Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (Col 7) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6">
          <div className="space-y-1">
            <h2 className="font-['Cairo'] font-bold text-[#181d17] text-[20px] leading-[30px]">
              تعديل الأسعار والمحاكاة الفورية
            </h2>
            <p className="font-['Cairo'] font-normal text-[#454840] text-[14px] leading-[22px]">
              قم بتحديث القيم لإصدار تسعيري جديد. يتم تفعيل التسعير عند الوصول لتاريخ السريان المحدد
              أدناه وموافقات الحوكمة.
            </p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 1: Monthly New Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 font-['Cairo'] font-semibold text-[14px] text-[#181d17]">
                <span className="text-[#ba1a1a]">*</span>
                <span>السعر الشهري الجديد لكل شقة (ر.س)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(Number(e.target.value) || 0)}
                  className="w-full h-[48px] bg-[#f1f5eb] rounded-[12px] px-4 font-['Cairo'] font-bold text-[#181d17] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#34422a] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-['Cairo'] font-semibold text-[#454840] text-[12px]">
                  ر.س
                </span>
              </div>
              <p className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[16px]">
                السعر شامل 15% ضريبة القيمة المضافة
              </p>
            </div>

            {/* Field 2: Annual New Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 font-['Cairo'] font-semibold text-[14px] text-[#181d17]">
                <span className="text-[#ba1a1a]">*</span>
                <span>السعر السنوي الجديد لكل شقة (ر.س)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={annualPrice}
                  onChange={(e) => setAnnualPrice(Number(e.target.value) || 0)}
                  className="w-full h-[48px] bg-[#f1f5eb] rounded-[12px] px-4 font-['Cairo'] font-bold text-[#181d17] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#34422a] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-['Cairo'] font-semibold text-[#454840] text-[12px]">
                  ر.س
                </span>
              </div>
              <p className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[16px]">
                السعر المعتمد لكامل فترة 12 شهراً
              </p>
            </div>
          </div>

          {/* Field 3: Effective Date */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 font-['Cairo'] font-semibold text-[14px] text-[#181d17]">
              <span className="text-[#ba1a1a]">*</span>
              <span>تاريخ سريان الأسعار الجديدة</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full h-[48px] bg-[#f1f5eb] rounded-[12px] pr-12 pl-4 font-['Cairo'] font-normal text-[#181d17] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#34422a]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <img
                  alt="Calendar"
                  className="size-5"
                  src="/assets/billing/11094bd296faa5133bccedd0d99727bfd9da999c.svg"
                />
              </div>
            </div>
          </div>

          {/* Field 4: Internal Governance Memo */}
          <div className="space-y-1.5">
            <label className="font-['Cairo'] font-semibold text-[14px] text-[#181d17]">
              ملاحظات (اختياري)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#f1f5eb] rounded-[12px] p-4 font-['Cairo'] font-normal text-[#181d17] text-[14px] leading-[22px] focus:outline-none focus:ring-2 focus:ring-[#34422a] resize-none"
            />
          </div>
        </div>

        {/* Calculated Comparison Box & Validation Compliance (Col 5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-gray-100 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="font-['Cairo'] font-bold text-[#181d17] text-[18px] leading-[28px]">
              المقارنة المحتسبة رياضياً
            </h3>
            <span className="bg-[#d8e8c7] text-[#131f0b] px-2 py-0.5 rounded-[4px] font-['Cairo'] font-bold text-[11px]">
              تحديث لحظي
            </span>
          </div>

          <div className="space-y-3">
            {/* Item 1: Full Year Monthly */}
            <div className="bg-[#f1f5eb] flex items-center justify-between p-3 rounded-[8px]">
              <div>
                <div className="font-['Cairo'] font-bold text-[#181d17] text-[12px] leading-[18px]">
                  الإجمالي الشهري لعام كامل
                </div>
                <div className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[16px]">
                  ({monthlyPrice} ر.س × 12 شهراً)
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Cairo'] font-bold text-[#181d17] text-[20px] leading-[30px]">
                  {yearlyFromMonthly.toLocaleString()}
                </span>
                <span className="font-['Cairo'] font-medium text-[#454840] text-[11px]">
                  ر.س
                </span>
              </div>
            </div>

            {/* Item 2: Direct Annual */}
            <div className="bg-[#f1f5eb] flex items-center justify-between p-3 rounded-[8px]">
              <div>
                <div className="font-['Cairo'] font-bold text-[#181d17] text-[12px] leading-[18px]">
                  السعر السنوي المباشر المعتمد
                </div>
                <div className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[16px]">
                  دفعة فوترة واحدة
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Cairo'] font-bold text-[#181d17] text-[20px] leading-[30px]">
                  {annualPrice.toLocaleString()}
                </span>
                <span className="font-['Cairo'] font-medium text-[#454840] text-[11px]">
                  ر.س
                </span>
              </div>
            </div>

            {/* Item 3: Result Difference */}
            <div className="bg-[rgba(242,225,192,0.4)] p-4 rounded-[12px] space-y-3 border border-[rgba(242,225,192,0.8)]">
              <div className="flex items-center justify-between">
                <span className="font-['Cairo'] font-bold text-[#181d17] text-[14px]">
                  الفارق المحتسب الفعلي (التوفير):
                </span>
                <span className="bg-[#34422a] text-white px-2 py-0.5 rounded-[4px] font-['Cairo'] font-bold text-[11px]">
                  خصم {discountPercent}%
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-['Cairo'] font-bold text-[#181d17] text-[24px]">
                  وفر
                </span>
                <span className="font-['Cairo'] font-bold text-[#34422a] text-[40px] leading-[52px]">
                  {savings.toLocaleString()}
                </span>
                <span className="font-['Cairo'] font-semibold text-[#181d17] text-[18px]">
                  ر.س سنوياً لكل شقة
                </span>
              </div>

              <p className="font-['Cairo'] font-medium text-[#454840] text-[11px] leading-[18px]">
                يحقق للمالك وفراً حقيقياً بقيمة {savings} ر.س مع ثبات الإيراد السنوي المدفوع مقدماً
                للمنصة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[rgba(255,255,255,0.95)] backdrop-blur-[8px] shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.06)] border-t border-gray-200 px-8 py-4 flex items-center justify-between">
        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleConfirmPublish}
            className="bg-[#34422a] hover:bg-[#2b3823] text-white px-7 h-[44px] rounded-[12px] font-['Cairo'] font-semibold text-[14px] flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
          >
            <img
              alt=""
              className="size-4"
              src="/assets/billing/6cfd0460e19404a7551082c5c029d7a0ff13b969.svg"
            />
            <span>حفظ ونشر التعديلات</span>
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="bg-[#d8e8cb] hover:bg-[#cbdec0] text-[#5a6952] px-5 h-[44px] rounded-[12px] font-['Cairo'] font-semibold text-[14px] transition-colors cursor-pointer"
          >
            حفظ كمسودة
          </button>

          <Link
            href="/dashboard/billing"
            className="bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#181d17] px-6 h-[44px] rounded-[12px] font-['Cairo'] font-semibold text-[14px] flex items-center justify-center transition-colors"
          >
            إلغاء
          </Link>
        </div>

        {/* Left side auto-save status */}
        <div className="flex items-center gap-1.5 text-[#75786f] font-['Cairo'] font-medium text-[11px]">
          <img
            alt=""
            className="size-3.5 opacity-70"
            src="/assets/billing/9d8b4df50f329e3083a278afe6a1a56a31238d16.svg"
          />
          <span>آخر تحديث تلقائي للمسودة منذ دقيقة واحدة</span>
        </div>
      </div>
    </div>
  );
}
