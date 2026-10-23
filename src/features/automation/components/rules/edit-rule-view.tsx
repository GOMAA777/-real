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
  AlertTriangle,
  History,
  Save,
  RotateCcw,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { AutomationRule } from "../../types";

interface EditRuleViewProps {
  rule?: AutomationRule;
}

export function EditRuleView({ rule }: EditRuleViewProps) {
  const router = useRouter();

  // Form states initialized with rule AUT-102 values
  const [ruleCode] = useState(rule?.ruleCode || "AUT-102");
  const [ruleName, setRuleName] = useState(rule?.title || "إرسال تفاصيل الوصول وكود الدخول الذكي");
  useSetBreadcrumbTitle(`تعديل ${ruleName}`, `#${ruleCode}`);
  const [category, setCategory] = useState("وصول ذاتي وكود الدخول");
  const [description, setDescription] = useState(
    rule?.description ||
      "مشاركة الموقع الجغرافي للوحدة ورقم الباب ورمز القفل الذكي التلقائي للنزيل بدقة قبل موعد الوصول بـ 24 ساعة لضمان وصول سلس وسريع دون تدخل يدوي."
  );
  const [ruleStatus, setRuleStatus] = useState<"active" | "draft">("active");
  const [triggerEvent, setTriggerEvent] = useState("قبل موعد الوصول (Before Check-in)");
  const [triggerTime, setTriggerTime] = useState("الساعة 03:00 م (قبل الوصول بـ 24 ساعة)");
  const [conditionsType, setConditionsType] = useState<"all" | "any">("all");
  const [scope, setScope] = useState<"all" | "custom">("all");

  const [simulationRunning, setSimulationRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulate = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      toast.success("تم تشغيل محاكاة القاعدة بنجاح: الحجز مؤهل ومطابق 100% لكافة معايير الإطلاق المعتمدة!");
    }, 900);
  };

  const confirm = useConfirm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد حفظ تعديلات قاعدة الأتمتة",
      message: `هل أنت متأكد من حفظ التعديلات على قاعدة الأتمتة "${ruleName}" (#${ruleCode})؟ سيتم تحديث معايير الإطلاق المعتمدة.`,
      confirmLabel: "حفظ التعديلات",
      variant: "default",
    });
    if (!ok) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم حفظ تعديلات قاعدة الأتمتة بنجاح وتحديث معايير الجدولة القادمة!");
      router.push(`/dashboard/automation/rules/${ruleCode}`);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/automation/rules/${ruleCode}`}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181d17]">تعديل قاعدة الأتمتة</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e5eae0] text-[#454840]">
                #{ruleCode}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a]">
                <span className="w-2 h-2 rounded-full bg-[#4b5940]" />
                مفعلة نشطة
              </span>
            </div>
            <p className="text-xs text-[#454840] mt-1">
              تعديل محددات الإطلاق والشروط والإجراءات التلقائية المعتمدة للمنظومة المركزية.
            </p>
          </div>
        </div>

        <Link
          href={`/dashboard/automation/rules/${ruleCode}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 text-[#454840] bg-[#FAFBF9] hover:bg-gray-50 transition-colors"
        >
          <History className="w-3.5 h-3.5 text-[#4b5940]" />
          <span>سجل تنفيذ القاعدة (142 عملية ناجحة)</span>
        </Link>
      </div>

      {/* Governance Warning Banner [1:22997] */}
      <div className="bg-[#fffbeb] border border-[#fde68a] rounded-2xl p-5 shadow-sm space-y-2">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#fef3c7] text-[#92400e] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#78350f]">
              تنبيه الحوكمة: تعديل هذه القاعدة سيؤثر على عمليات التنفيذ القادمة المجدولة
            </h3>
            <p className="text-xs text-[#92400e] leading-relaxed">
              السجلات التاريخية لعمليات التنفيذ السابقة ستبقى محفوظة ومؤرشفة دون تغيير وفق سياسات الامتثال العقاري المؤسسي.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/80 border border-[#fef3c7] text-[11px] font-semibold text-[#78350f]">
                خلال الـ 24 ساعة القادمة سيتم تحديث معايير إطلاقها فور حفظ التعديل.
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#34422a] text-white text-[11px] font-semibold">
                34 رسالة WhatsApp مجدولة
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Rule Details */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#181d17]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#4b5940]" />
                  <span>بيانات القاعدة والتصنيف</span>
                </div>
                <span className="text-xs text-gray-400 font-normal">حقول إلزامية (*)</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                    اسم القاعدة التعريفي *
                  </label>
                  <input
                    type="text"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] transition-colors"
                    placeholder="مثال: إرسال تفاصيل الوصول الذاتي"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      التصنيف الوظيفي *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] bg-white transition-colors"
                    >
                      <option value="وصول ذاتي وكود الدخول">وصول ذاتي وكود الدخول</option>
                      <option value="تأكيد ومغادرة الحجز">تأكيد ومغادرة الحجز</option>
                      <option value="تشغيل وتنظيف">تشغيل وتنظيف</option>
                      <option value="حوكمة وتنبيهات أمان">حوكمة وتنبيهات أمان</option>
                      <option value="تسويق وتجربة العميل">تسويق وتجربة العميل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      رمز القاعدة البرمجي
                    </label>
                    <input
                      type="text"
                      value={ruleCode}
                      disabled
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-mono text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                    الوصف التفصيلي والهدف التشغيلي *
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] transition-colors resize-none leading-relaxed"
                    placeholder="وضح متى تعمل هذه القاعدة وما الأثر الناتج عنها..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Trigger (المحفز) */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#181d17]">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#4b5940]" />
                  <span>محدد الإطلاق (Trigger)</span>
                </div>
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  معالجة تلقائية
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                    حدث الإطلاق الأساسي *
                  </label>
                  <select
                    value={triggerEvent}
                    onChange={(e) => setTriggerEvent(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] bg-white transition-colors"
                  >
                    <option value="قبل موعد الوصول (Before Check-in)">قبل موعد الوصول (Before Check-in)</option>
                    <option value="عند إنشاء حجز جديد مؤكد (Booking Confirmed)">عند إنشاء حجز جديد مؤكد (Booking Confirmed)</option>
                    <option value="قبل موعد المغادرة (Before Checkout)">قبل موعد المغادرة (Before Checkout)</option>
                    <option value="عند إتمام تسجيل الخروج (Checkout Completed)">عند إتمام تسجيل الخروج (Checkout Completed)</option>
                    <option value="انخفاض شحن بطارية القفل الذكي">انخفاض شحن بطارية القفل الذكي (&lt; 20%)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      التوقيت الزمني المحدد *
                    </label>
                    <input
                      type="text"
                      value={triggerTime}
                      onChange={(e) => setTriggerTime(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] transition-colors"
                      placeholder="الساعة 03:00 م (قبل الوصول بـ 24 ساعة)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      نافذة المعالجة الفورية
                    </label>
                    <div className="w-full h-11 px-3.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-600">
                      <span>إرسال فوري دون تأخير اصطناعي</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Conditions (الشروط) */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#181d17]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#4b5940]" />
                  <span>شروط التحقق والامتثال</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setConditionsType("all")}
                    className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                      conditionsType === "all" ? "bg-white text-[#4b5940] shadow-sm" : "text-gray-500"
                    }`}
                  >
                    مطابقة كافة الشروط (AND)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConditionsType("any")}
                    className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                      conditionsType === "any" ? "bg-white text-[#4b5940] shadow-sm" : "text-gray-500"
                    }`}
                  >
                    أي شرط (OR)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="font-semibold text-[#181d17]">حالة الحجز:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px]">
                      مؤكد ومدفوع (CONFIRMED)
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">شرط إلزامي</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="font-semibold text-[#181d17]">توفر القفل الذكي:</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px]">
                      الوحدة مزودة بقفل إلكتروني متصل (CONNECTED_LOCK)
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">شرط إلزامي</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="font-semibold text-[#181d17]">رقم الهاتف:</span>
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-mono text-[11px]">
                      صيغة دولية صالحة (E.164) ومفعل على واتساب
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">شرط إلزامي</span>
                </div>
              </div>
            </div>

            {/* Card 4: Actions (الإجراءات) */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#181d17]">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#4b5940]" />
                  <span>الإجراءات المنفذة تلقائياً</span>
                </div>
                <span className="text-xs font-semibold text-[#4b5940]">إجراءان متسلسلان</span>
              </div>

              <div className="space-y-3">
                {/* Action 1 */}
                <div className="p-4 rounded-2xl bg-[#f6fbf1] border border-[#d8e8cb] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#4b5940] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <span className="text-xs font-bold text-[#181d17]">
                        إرسال رسالة واتساب عبر Meta Cloud API
                      </span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#34422a] border border-[#d8e8cb]">
                      tpl_arrival_guide_v3
                    </span>
                  </div>
                  <p className="text-xs text-[#454840] leading-relaxed">
                    إرسال قالب تفاصيل الوصول مع رابط الخريطة وكود الدخول الإلكتروني المشفر (PIN Code).
                  </p>
                </div>

                {/* Action 2 */}
                <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <span className="text-xs font-bold text-[#181d17]">
                        إنشاء تنبيه فوري لفريق العمليات الميداني
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                      إشعار لوحة العمليات
                    </span>
                  </div>
                  <p className="text-xs text-[#454840] leading-relaxed">
                    إدراج مهمة التحقق من جاهزية كود القفل الذكي في سجل تشغيل العمليات.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column - Governance, Scope & Actions (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#181d17] pb-2 border-b border-gray-100">
                الوضع التشغيلي للقاعدة
              </h3>

              <div className="space-y-2.5">
                <label
                  onClick={() => setRuleStatus("active")}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    ruleStatus === "active"
                      ? "bg-[#f6fbf1] border-[#4b5940] shadow-sm"
                      : "bg-[#FBFDFB] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="ruleStatus"
                    checked={ruleStatus === "active"}
                    onChange={() => setRuleStatus("active")}
                    className="mt-1 text-[#4b5940] focus:ring-[#4b5940]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">مفعلة فور الحفظ</div>
                    <div className="text-[11px] text-[#454840] mt-0.5">
                      ستباشر القاعدة العمل ومعالجة الأحداث القادمة فور اعتماد التعديلات.
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setRuleStatus("draft")}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    ruleStatus === "draft"
                      ? "bg-amber-50/60 border-amber-600 shadow-sm"
                      : "bg-[#FBFDFB] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="ruleStatus"
                    checked={ruleStatus === "draft"}
                    onChange={() => setRuleStatus("draft")}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">مسودة غير مفعلة</div>
                    <div className="text-[11px] text-[#454840] mt-0.5">
                      حفظ التعديلات دون تفعيل القاعدة أو التأثير على أي جدولة قادمة.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Scope Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#181d17] pb-2 border-b border-gray-100">
                نطاق التطبيق والمحفظة
              </h3>

              <div className="space-y-2.5">
                <label
                  onClick={() => setScope("all")}
                  className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    scope === "all"
                      ? "bg-[#f6fbf1] border-[#4b5940]"
                      : "bg-[#FBFDFB] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="scope"
                    checked={scope === "all"}
                    onChange={() => setScope("all")}
                    className="mt-1 text-[#4b5940]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">كافة العقارات والمحافظ</div>
                    <div className="text-[11px] text-[#454840]">تطبيق تلقائي على 18 عقاراً و 142 وحدة سكنية</div>
                  </div>
                </label>

                <label
                  onClick={() => setScope("custom")}
                  className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    scope === "custom"
                      ? "bg-[#f6fbf1] border-[#4b5940]"
                      : "bg-[#FBFDFB] border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="scope"
                    checked={scope === "custom"}
                    onChange={() => setScope("custom")}
                    className="mt-1 text-[#4b5940]"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">حصر التطبيق على محفظة معينة</div>
                    <div className="text-[11px] text-[#454840]">مثال: كافة عقارات مدينة الرياض أو نوع وحدات محدد</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Simulation Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#181d17]">محاكاة الاختبار الفوري</span>
                <Sparkles className="w-4 h-4 text-[#4b5940]" />
              </div>
              <p className="text-xs text-[#454840] leading-relaxed">
                اختبر استجابة المحفز وسلامة الشروط وتوليد الرسالة على حجز تجريبي دون إرسال فعلي.
              </p>
              <button
                type="button"
                onClick={handleSimulate}
                disabled={simulationRunning}
                className="w-full h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{simulationRunning ? "جارٍ فحص الشروط والمحاكاة..." : "تشغيل محاكاة تجريبية"}</span>
              </button>
            </div>

            {/* Submit & Cancel Buttons [1:22980] */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#4b5940] hover:bg-[#3d4934] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? "جارٍ حفظ التعديلات..." : "حفظ التعديلات"}</span>
              </button>

              <Link
                href={`/dashboard/automation/rules/${ruleCode}`}
                className="w-full h-11 rounded-xl bg-[#ebefe6] hover:bg-[#dfe4db] text-[#181d17] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إلغاء والتراجع عن التغييرات</span>
              </Link>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-[#454840] leading-tight">
                  آخر تعديل: 12 سبتمبر 2026 بواسطة م. طارق العسيري | السجلات المؤرشفة غير قابلة للتغيير
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
