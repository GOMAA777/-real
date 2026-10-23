"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sliders,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Wrench,
  Key,
  ShieldCheck,
  ChevronDown,
  Trash2,
  Plus,
  Play,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

export function CreateRuleView() {
  const router = useRouter();

  // Form states
  const [ruleName, setRuleName] = useState("إرسال تفاصيل الوصول الذاتي وموقع الوحدة");
  const [category, setCategory] = useState("وصول ذاتي وكود الدخول");
  const [description, setDescription] = useState(
    "إرسال رسالة واتساب رسمية تتضمن موقع العقار الجغرافي، رقم الوحدة وكود القفل الإلكتروني المشفر قبل موعد الدخول المحدد بـ 24 ساعة بدقة."
  );
  const [initialStatus, setInitialStatus] = useState<"active" | "draft">("active");
  const [triggerEvent, setTriggerEvent] = useState("قبل موعد الوصول (Before Check-in)");
  const [triggerTime, setTriggerTime] = useState("الساعة 3 م");
  const [conditionsType, setConditionsType] = useState<"all" | "any">("all");
  const [scope, setScope] = useState<"all" | "custom" | "regional">("all");

  const [simulationRunning, setSimulationRunning] = useState(false);

  const handleSimulate = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      toast.success("تم تشغيل المحاكاة بنجاح: الحجز مؤهل ومطابق 100% لكافة الشروط!");
    }, 1000);
  };

  const confirm = useConfirm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد حفظ وتفعيل قاعدة الأتمتة",
      message: `هل أنت متأكد من حفظ وتفعيل قاعدة الأتمتة الجديدة "${ruleName}"؟ سيتم تطبيق شروط الإطلاق التلقائية فوراً.`,
      confirmLabel: "حفظ وتفعيل القاعدة",
      variant: "default",
    });
    if (!ok) return;

    toast.success("تم إنشاء وتفعيل قاعدة الأتمتة بنجاح!");
    router.push("/dashboard/automation");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/automation"
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1F2937]">إنشاء قاعدة أتمتة</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF5EE] text-[#1F3D2B] border border-[#DCE8DC]">
                اعتمادية إدارة المنصة المعيارية
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              حدد الحدث الذي يشغل القاعدة والإجراءات التي يتم تنفيذها تلقائياً وفق قواعد الحوكمة والتشغيل لجميع المحافظ العقارية.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.info("تم فتح مساعد هيكل سير العمل")}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-gray-700 bg-[#FAFBF9] hover:bg-gray-50 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-[#1F3D2B]" />
          <span>هيكل سير العمل الذكي</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Rule Details & Category */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#1F3D2B]" />
                  <span>بيانات القاعدة والتصنيف</span>
                </div>
                <span className="text-[11px] text-[#9CA3AF]">حقول إلزامية (*)</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">
                  اسم القاعدة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                />
              </div>

              {/* Operational Classification */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">
                  التصنيف التشغيلي <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    "وصول ذاتي وكود الدخول",
                    "تشغيل وتنظيف",
                    "تأكيد ومغادرة",
                    "حوكمة وأمان",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        category === cat
                          ? "bg-[#1F3D2B] text-white shadow-xs"
                          : "bg-[#FAFBF9] border border-[#EBEBEB] text-[#4B5563] hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">
                  الوصف الإيضاحي للمشغلين
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs text-[#1F2937] leading-relaxed focus:outline-none focus:border-[#1F3D2B]"
                />
              </div>

              {/* Initial Status */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-[#374151]">
                  الحالة التشغيلية الأولية
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    onClick={() => setInitialStatus("active")}
                    className={`p-3 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      initialStatus === "active"
                        ? "bg-[#EEF5EE] border-[#1F3D2B] text-[#1F3D2B]"
                        : "bg-[#FAFBF9] border-[#EBEBEB] text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="initialStatus"
                      checked={initialStatus === "active"}
                      onChange={() => setInitialStatus("active")}
                      className="mt-0.5 text-[#1F3D2B]"
                    />
                    <div>
                      <span className="font-bold block">مفعلة فور الحفظ</span>
                      <span className="text-[10px] text-[#6B7280]">تبدأ المعالجة مع أول حدث مؤهل</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setInitialStatus("draft")}
                    className={`p-3 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      initialStatus === "draft"
                        ? "bg-[#EEF5EE] border-[#1F3D2B] text-[#1F3D2B]"
                        : "bg-[#FAFBF9] border-[#EBEBEB] text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="initialStatus"
                      checked={initialStatus === "draft"}
                      onChange={() => setInitialStatus("draft")}
                      className="mt-0.5 text-[#1F3D2B]"
                    />
                    <div>
                      <span className="font-bold block">مسودة غير مفعلة</span>
                      <span className="text-[10px] text-[#6B7280]">حفظ القاعدة للتعطيل دون تنفيذ فعلي</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Card 2: Trigger & Timing */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <Clock className="w-5 h-5 text-[#1F3D2B]" />
                <span>المحفّز وموعد التشغيل</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">
                  الحدث المحفّز الرئيسي <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={triggerEvent}
                    onChange={(e) => setTriggerEvent(e.target.value)}
                    className="w-full appearance-none p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                  >
                    <option>قبل موعد الوصول (Before Check-in)</option>
                    <option>عند إنشاء حجز مؤكد (Booking Created)</option>
                    <option>قبل انتهاء الحجز والمغادرة (Before Check-out)</option>
                    <option>عند انتهاء الحجز وتسجيل الخروج (Check-out Done)</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="p-4 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#6B7280]">
                  <span className="font-semibold text-[#1F2937] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1F3D2B]" />
                    <span>توقيت الإطلاق بالنسبة للحدث:</span>
                  </span>
                  <span className="text-[10px] font-mono">توقيت الرياض القياسي (UTC+3)</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-center font-bold text-xs text-[#1F2937]">
                    قبل موعد الوصول المحدد بـ 24 ساعة
                  </div>
                  <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl text-center font-bold text-xs text-[#1F3D2B]">
                    {triggerTime}
                  </div>
                </div>

                <p className="text-[11px] text-[#6B7280] leading-relaxed pt-1">
                  سيتم إرسال الرسالة آلياً في تمام الساعة 03:00 مساءً من اليوم السابق لتاريخ حجز النزيل.
                </p>
              </div>
            </div>

            {/* Card 3: Conditions */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <h3 className="font-bold text-base text-[#1F2937]">شروط التفعيل الدقيقة</h3>
                <div className="flex items-center gap-1 bg-[#EDF2EC] p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setConditionsType("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      conditionsType === "all" ? "bg-white text-[#1F3D2B] shadow-xs" : "text-[#4B5563]"
                    }`}
                  >
                    كافة الشروط
                  </button>
                  <button
                    type="button"
                    onClick={() => setConditionsType("any")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      conditionsType === "any" ? "bg-white text-[#1F3D2B] shadow-xs" : "text-[#4B5563]"
                    }`}
                  >
                    أي شرط
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1F3D2B]" />
                    <span className="font-bold text-[#1F2937]">مصدر الحجز</span>
                  </div>
                  <div className="w-64 p-2 bg-white border border-gray-200 rounded-xl text-center font-semibold text-gray-700">
                    Whatsapp.com
                  </div>
                  <button type="button" className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1F3D2B]" />
                    <span className="font-bold text-[#1F2937]">طريقة كود الدخول</span>
                  </div>
                  <div className="w-64 p-2 bg-white border border-gray-200 rounded-xl text-center font-semibold text-gray-700">
                    كود مخصص لكل حجز
                  </div>
                  <button type="button" className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Actions Executed */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#1F2937] pb-3 border-b border-[#F3F4F6]">
                الإجراءات التلقائية المنفذة
              </h3>

              {/* Action 1 */}
              <div className="p-4 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAEFE9]">
                  <div className="flex items-center gap-2 font-bold text-[#1F2937]">
                    <Send className="w-4 h-4 text-[#1F3D2B]" />
                    <span>إرسال رسالة WhatsApp للنزيل</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600">
                    إجراء 1
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#9CA3AF] block text-[10px]">قالب الرسالة المعتمد</span>
                    <span className="font-bold text-[#1F2937] text-xs">تفاصيل الوصول وكود القفل</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF] block text-[10px]">المستلم المستهدف</span>
                    <span className="font-bold text-[#1F2937] text-xs">
                      رقم جوال النزيل الأساسي المسجل بالحجز
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#EAEFE9] rounded-xl text-[11px] text-[#4B5563] leading-relaxed">
                  <span className="font-semibold text-[#1F3D2B] block mb-1">
                    معاينة محتوى القالب التلقائي:
                  </span>
                  مرحباً {"{{guest_name}}"}، يسعدنا استضافتكم في {"{{property_name}}"}. موعد تسجيل الوصول يبدأ من الساعة 03:00 م. كود دخول الوحدة الخاص بكم هو: {"{{access_code}}"} ، رابط موقع العقار: https://rwq.sa/t/Doc_token0
                </div>
              </div>

              {/* Action 2 */}
              <div className="p-4 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAEFE9]">
                  <div className="flex items-center gap-2 font-bold text-[#1F2937]">
                    <ShieldCheck className="w-4 h-4 text-[#1F3D2B]" />
                    <span>تسجيل حدث رسمي في سجل التدقيق والحوكمة</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600">
                    إجراء 2
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  توثيق إرسال تفاصيل الوصول آلياً عبر محرك الأتمتة المركزي لحجز المنصة.
                </p>
              </div>

              {/* Add Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <button
                  type="button"
                  onClick={() => toast.info("إجراء WhatsApp إضافي")}
                  className="px-3 py-1.5 rounded-xl border border-dashed border-[#1F3D2B] text-[#1F3D2B] text-xs font-semibold hover:bg-[#EEF5EE]"
                >
                  + إضافة إجراء: إرسال WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => toast.info("إجراء مهمة تنظيف إضافية")}
                  className="px-3 py-1.5 rounded-xl border border-dashed border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50"
                >
                  + إنشاء مهمة تنظيف
                </button>
                <button
                  type="button"
                  onClick={() => toast.info("إجراء تنبيه فوري")}
                  className="px-3 py-1.5 rounded-xl border border-dashed border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50"
                >
                  + إنشاء تنبيه فوري
                </button>
              </div>
            </div>

            {/* Card 5: Rule Scope */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
              <h3 className="font-bold text-base text-[#1F2937] pb-3 border-b border-[#F3F4F6]">
                نطاق شمول القاعدة
              </h3>

              <div className="space-y-2.5 text-xs">
                <label
                  onClick={() => setScope("all")}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    scope === "all"
                      ? "bg-[#EEF5EE] border-[#1F3D2B] text-[#1F3D2B]"
                      : "bg-[#FAFBF9] border-[#EBEBEB] text-[#374151]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="scope"
                      checked={scope === "all"}
                      onChange={() => setScope("all")}
                      className="text-[#1F3D2B]"
                    />
                    <div>
                      <span className="font-bold block">جميع العقارات المسجلة بالمنصة</span>
                      <span className="text-[11px] text-[#6B7280]">
                        تطبق القاعدة تلقائياً على كافة الأصول الحالية وأي عقار أو وحدة جديدة تضاف للمنظومة مستقبلاً.
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#DCE8DC] text-[#1F3D2B] font-bold">
                    18 عقاراً • 142 وحدة
                  </span>
                </label>

                <label
                  onClick={() => setScope("custom")}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    scope === "custom"
                      ? "bg-[#EEF5EE] border-[#1F3D2B] text-[#1F3D2B]"
                      : "bg-[#FAFBF9] border-[#EBEBEB] text-[#374151]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="scope"
                      checked={scope === "custom"}
                      onChange={() => setScope("custom")}
                      className="text-[#1F3D2B]"
                    />
                    <div>
                      <span className="font-bold block">عقارات محددة (اختيار مخصص)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        تحديد مشاريع أو أبراج سكنية بعينها (مثال: برج روق العليا فقط).
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </label>

                <label
                  onClick={() => setScope("regional")}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    scope === "regional"
                      ? "bg-[#EEF5EE] border-[#1F3D2B] text-[#1F3D2B]"
                      : "bg-[#FAFBF9] border-[#EBEBEB] text-[#374151]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="scope"
                      checked={scope === "regional"}
                      onChange={() => setScope("regional")}
                      className="text-[#1F3D2B]"
                    />
                    <div>
                      <span className="font-bold block">مجموعة عقارية أو نطاق جغرافي (المدينة / الحي)</span>
                      <span className="text-[11px] text-[#6B7280]">
                        حصر التطبيق على محافظة معينة (مثال: كافة عقارات مدينة الرياض).
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </label>
              </div>
            </div>
          </div>

          {/* Left Column: Summary and Simulation (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Approved Workflow Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <h3 className="font-bold text-sm text-[#1F2937]">ملخص سير العمل المعتمد</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]">
                  جاهز
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                  <span className="text-[10px] text-[#9CA3AF] block">المحفز الزمني</span>
                  <span className="font-bold text-[#1F2937]">قبل موعد الوصول بـ 24 ساعة</span>
                </div>

                <div className="p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                  <span className="text-[10px] text-[#9CA3AF] block">شروط التحقق (2)</span>
                  <span className="font-medium text-[#1F2937]">مصدر الحجز عبر whatsapp.com + قفل إلكتروني ذكي</span>
                </div>

                <div className="p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                  <span className="text-[10px] text-[#9CA3AF] block">الإجراءات التلقائية (2)</span>
                  <span className="font-medium text-[#1F2937]">إرسال WhatsApp + قيد سجل التدقيق</span>
                </div>

                <div className="p-2.5 bg-[#FAFBF9] rounded-xl border border-[#EBEBEB]">
                  <span className="text-[10px] text-[#9CA3AF] block">النطاق والشمول</span>
                  <span className="font-bold text-[#1F2937]">شامل لكافة العقارات (18 عقاراً • 142 وحدة)</span>
                </div>
              </div>

              <div className="p-3 bg-[#EEF5EE] border border-[#DCE8DC] rounded-xl text-[11px] text-[#374151] leading-relaxed">
                <span className="font-bold text-[#1F3D2B] block mb-0.5">صياغة القاعدة:</span>
                "عند اقتراب الوصول بـ 24 ساعة وكان الحجز عبر whatsapp.com ولديه كود ذكي ← إرسال رسالة WhatsApp للنزيل وتوثيق تدقيق آلي في كافة العقارات."
              </div>
            </div>

            {/* Quick Simulation Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-sm text-[#1F2937]">اختبار المحاكاة السريعة</h3>
              <p className="text-[11px] text-[#6B7280]">
                تحقق من مسار معالجة الشروط دون إرسال رسائل فعلية للنزلاء.
              </p>

              <div className="space-y-1.5">
                <span className="text-[10px] text-[#9CA3AF] block">عينة حجز نشطة للاختبار</span>
                <div className="p-2.5 bg-[#FAFBF9] border border-gray-200 rounded-xl font-bold text-[#1F2937]">
                  أحمد محمد - عمارة النخيل
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#FAFBF9] rounded-xl border border-gray-200">
                <span className="font-semibold text-gray-700">وضع المحاكاة الآمنة</span>
                <span className="w-8 h-4 bg-[#1F3D2B] rounded-full relative inline-block">
                  <span className="w-3 h-3 bg-white rounded-full absolute top-0.5 end-0.5" />
                </span>
              </div>

              <div className="p-3 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl flex items-center justify-between text-[#16A34A]">
                <span className="font-semibold">نتيجة الفحص التجريبي:</span>
                <span className="font-bold">مؤهل للتنفيذ (100%)</span>
              </div>

              <button
                type="button"
                onClick={handleSimulate}
                disabled={simulationRunning}
                className="w-full py-2.5 rounded-xl border border-[#1F3D2B] text-[#1F3D2B] bg-[#EEF5EE] hover:bg-[#E2EDE2] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{simulationRunning ? "جاري الاختبار..." : "تشغيل محاكاة الاختبار الآن"}</span>
              </button>
            </div>

            {/* Estimated Impact Box */}
            <div className="p-4 bg-white rounded-3xl border border-[#EBEBEB] shadow-sm space-y-2 text-xs">
              <span className="text-[#9CA3AF] block text-[10px]">الأثر المتوقع خلال 7 أيام القادمة</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-[#FAFBF9] rounded-xl border border-gray-100">
                  <span className="text-xl font-bold text-[#1F2937] block">34</span>
                  <span className="text-[10px] text-[#6B7280]">رسالة مؤهلة</span>
                </div>
                <div className="p-2.5 bg-[#FAFBF9] rounded-xl border border-gray-100">
                  <span className="text-xl font-bold text-[#16A34A] block">0%</span>
                  <span className="text-[10px] text-[#6B7280]">تعارض مع القواعد</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>حفظ وتفعيل القاعدة</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success("تم حفظ القاعدة كمسودة بنجاح");
                  router.push("/dashboard/automation");
                }}
                className="w-full py-3 px-5 rounded-2xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Bookmark className="w-4 h-4 text-gray-500" />
                <span>حفظ كمسودة</span>
              </button>

              <Link
                href="/dashboard/automation"
                className="block text-center text-xs text-[#9CA3AF] hover:text-[#1F2937] py-1"
              >
                إلغاء والتراجع عن التغييرات
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
