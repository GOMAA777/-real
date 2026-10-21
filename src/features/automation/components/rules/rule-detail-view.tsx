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
  AlertCircle,
  ExternalLink,
  Edit,
  Pause,
  Play,
  Trash2,
  Smartphone,
  ShieldCheck,
  Zap,
  Radio,
  Calendar,
  User,
  History,
  Check,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { AutomationRule } from "../../types";
import { PauseRuleModal } from "./modals/pause-rule-modal";
import { ActivateRuleModal } from "./modals/activate-rule-modal";
import { DeleteRuleModal } from "./modals/delete-rule-modal";

interface RuleDetailViewProps {
  rule: AutomationRule;
}

export function RuleDetailView({ rule: initialRule }: RuleDetailViewProps) {
  const router = useRouter();
  const [rule, setRule] = useState<AutomationRule>(initialRule);

  // Modals state
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePauseConfirm = () => {
    setShowPauseModal(false);
    setRule((prev) => ({
      ...prev,
      status: "paused",
      statusLabel: "متوقفة",
    }));
    toast.success(`تم إيقاف قاعدة الأتمتة (${rule.ruleCode}) بنجاح.`);
  };

  const handleActivateConfirm = () => {
    setShowActivateModal(false);
    setRule((prev) => ({
      ...prev,
      status: "active",
      statusLabel: "مفعلة",
    }));
    toast.success(`تم تفعيل قاعدة الأتمتة (${rule.ruleCode}) بنجاح.`);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    toast.success(`تم حذف قاعدة الأتمتة (${rule.ruleCode}) نهائياً.`);
    router.push("/dashboard/automation");
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/automation"
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181d17]">تفاصيل قاعدة الأتمتة</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e5eae0] text-[#454840]">
                #{rule.ruleCode}
              </span>
              {rule.status === "active" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a]">
                  <span className="w-2 h-2 rounded-full bg-[#4b5940]" />
                  مفعلة
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  متوقفة
                </span>
              )}
            </div>
            <p className="text-xs text-[#454840] mt-1">
              استعراض معايير التشغيل ومحفزات الإطلاق وسجل العمليات اللحظي لمحرك الأتمتة المركزي.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/automation/rules/${rule.ruleCode}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#4b5940] hover:bg-[#3d4934] text-white shadow-sm transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>تعديل القاعدة</span>
          </Link>

          {rule.status === "active" ? (
            <button
              type="button"
              onClick={() => setShowPauseModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#34422a] transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>إيقاف القاعدة</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowActivateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#d8e8cb] hover:bg-[#c6dcbe] text-[#34422a] transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>تفعيل القاعدة</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
            title="حذف القاعدة"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Factual KPI Cards [1:23373] */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total executions */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">إجمالي التنفيذ</span>
            <div className="w-8 h-8 rounded-lg bg-[#ebefe6] flex items-center justify-center text-[#4b5940]">
              <History className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#181d17]">142</span>
              <span className="text-xs text-[#454840]">عملية</span>
            </div>
            <div className="mt-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ebefe6] text-[#454840]">
                منذ إطلاق النظام
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Successful executions */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">عمليات ناجحة</span>
            <div className="w-8 h-8 rounded-lg bg-[#d8e8cb] flex items-center justify-center text-[#34422a]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#181d17]">139</span>
              <span className="text-xs text-[#454840]">عملية</span>
            </div>
            <div className="mt-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#d8e8cb] text-[#121f0d]">
                97.9% نسبة الإنجاز
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Incomplete / Failed */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">عمليات غير مكتملة</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#181d17]">3</span>
              <span className="text-xs text-[#454840]">عمليات</span>
            </div>
            <div className="mt-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#ffdad6] text-[#93000a]">
                تمت معالجتها يدويًا
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Response speed */}
        <div className="bg-white rounded-2xl p-4 border border-[#EBEBEB] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#454840]">سرعة الاستجابة</span>
            <div className="w-8 h-8 rounded-lg bg-[#ebefe6] flex items-center justify-center text-[#4b5940]">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#181d17]">1.2</span>
              <span className="text-xs text-[#454840]">ثانية</span>
            </div>
            <div className="mt-1">
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#d8e8cb] text-[#121f0d]">
                معالجة فورية
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column (8 Cols): Specifications & Executions */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Rule Specifications [1:23442] */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <h2 className="text-base font-bold text-[#181d17]">محددات وشروط القاعدة</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                Rule Definition
              </span>
            </div>

            {/* Trigger Block */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#454840]">
                <Clock className="w-4 h-4 text-[#4b5940]" />
                <span>محدد الإطلاق الأساسي (Trigger Event)</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FBFDFB] border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#181d17]">
                    عند إنشاء حجز جديد مؤكد (Booking Confirmed)
                  </div>
                  <div className="text-xs text-[#454840] mt-0.5">
                    يتم تحفيز القاعدة فور نجاح التحقق البنكي وتأكيد تفاصيل الحجز للمستأجر.
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#d8e8cb] text-[#34422a] shrink-0">
                  فوري
                </span>
              </div>
            </div>

            {/* Conditions Block */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#454840]">
                <ShieldCheck className="w-4 h-4 text-[#4b5940]" />
                <span>الشروط والقيود المعتمدة (Validation Conditions)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[11px] text-gray-500 font-semibold">حالة الحجز</div>
                  <div className="text-xs font-bold text-[#181d17] mt-1">مؤكد ومدفوع بالكامل</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[11px] text-gray-500 font-semibold">نطاق العقارات</div>
                  <div className="text-xs font-bold text-[#181d17] mt-1">كافة عقارات الرياض (18 عقاراً)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[11px] text-gray-500 font-semibold">نوع الوحدة</div>
                  <div className="text-xs font-bold text-[#181d17] mt-1">شقق فندقية ومنازل عطلات</div>
                </div>
              </div>
            </div>

            {/* Actions Block */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#454840]">
                <Send className="w-4 h-4 text-[#4b5940]" />
                <span>الإجراءات التلقائية المربوطة (Actions)</span>
              </div>

              {/* Action 1 & Message Preview */}
              <div className="p-4 rounded-2xl bg-[#f6fbf1] border border-[#d8e8cb] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#4b5940] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-xs font-bold text-[#181d17]">
                      إرسال رسالة واتساب رسمية عبر Meta Cloud API
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#34422a] border border-[#d8e8cb]">
                    tpl_booking_confirmation_v2
                  </span>
                </div>

                {/* WhatsApp Message Preview inside green bubble */}
                <div className="bg-white rounded-xl p-4 border border-[#d8e8cb] shadow-xs space-y-2 text-xs text-[#181d17] leading-relaxed">
                  <div className="font-semibold text-[#4b5940]">
                    مرحباً &#123;اسم العميل&#125;،
                  </div>
                  <p>
                    تم تأكيد حجزك في &#123;اسم العقار&#125; - الوحدة &#123;رقم الوحدة&#125;.
                    <br />
                    📅 موعد الوصول: &#123;تاريخ الوصول&#125; الساعة &#123;وقت الوصول&#125;
                    <br />
                    🔑 كود الدخول للباب الذكي: &#123;كود الدخول&#125;
                    <br />
                    نتمنى لكم إقامة ممتعة ونسعد بخدمتكم دائماً!
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#ebefe6] text-[11px] font-semibold text-[#34422a]">
                      📍 فتح الموقع بالخرائط
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#ebefe6] text-[11px] font-semibold text-[#34422a]">
                      📖 دليل التعليمات
                    </span>
                  </div>
                </div>
              </div>

              {/* Action 2 */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">
                      تحديث حالة الحجز في المنظومة وإشعار الإدارة المركزية
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      تعديل حالة التواصل إلى &quot;تم إرسال كود الدخول الأولي&quot;
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-gray-500">نظام تلقائي</span>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Executions Table [1:23566] */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
              <div>
                <h2 className="text-base font-bold text-[#181d17]">سجل تنفيذ القاعدة اللحظي</h2>
                <p className="text-xs text-gray-500 mt-0.5">آخر 5 عمليات تمت معالجتها عبر هذه القاعدة</p>
              </div>
              <Link
                href="/dashboard/automation?tab=logs"
                className="text-xs font-semibold text-[#4b5940] hover:underline"
              >
                عرض سجل العمليات الكامل
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 font-semibold">
                    <th className="pb-3 pr-2">معرّف العملية</th>
                    <th className="pb-3">التوقيت</th>
                    <th className="pb-3">المستلم والحجز</th>
                    <th className="pb-3">الحالة</th>
                    <th className="pb-3">زمن المعالجة</th>
                    <th className="pb-3 text-center">التفاصيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[#181d17]">
                  <tr className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-2 font-mono font-semibold">#EX-104829</td>
                    <td className="py-3 text-gray-500">منذ 3 دقائق</td>
                    <td className="py-3">
                      <div className="font-semibold">خالد العتيبي</div>
                      <div className="text-[11px] text-gray-400">BK-10482</div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        تم التسليم
                      </span>
                    </td>
                    <td className="py-3 font-mono text-gray-600">1.1 ثانية</td>
                    <td className="py-3 text-center">
                      <Link
                        href="/dashboard/automation/logs/EX-104829"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4b5940] hover:underline"
                      >
                        <span>معاينة</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-2 font-mono font-semibold">#EX-104828</td>
                    <td className="py-3 text-gray-500">منذ 18 دقيقة</td>
                    <td className="py-3">
                      <div className="font-semibold">فيصل السبيعي</div>
                      <div className="text-[11px] text-gray-400">BK-10481</div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        تم التسليم
                      </span>
                    </td>
                    <td className="py-3 font-mono text-gray-600">1.3 ثانية</td>
                    <td className="py-3 text-center">
                      <Link
                        href="/dashboard/automation/logs/EX-104828"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4b5940] hover:underline"
                      >
                        <span>معاينة</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 pr-2 font-mono font-semibold">#EX-104825</td>
                    <td className="py-3 text-gray-500">منذ ساعة</td>
                    <td className="py-3">
                      <div className="font-semibold">سارة المنصور</div>
                      <div className="text-[11px] text-gray-400">BK-10478</div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        تم التسليم
                      </span>
                    </td>
                    <td className="py-3 font-mono text-gray-600">0.9 ثانية</td>
                    <td className="py-3 text-center">
                      <Link
                        href="/dashboard/automation/logs/EX-104825"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4b5940] hover:underline"
                      >
                        <span>معاينة</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Left Column (4 Cols): Governance, Health & Upcoming */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Governance & Audit Card [1:23681] */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#181d17] pb-2 border-b border-gray-100">
              بيانات الحوكمة والتدقيق
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">رمز القاعدة</span>
                <span className="font-mono font-bold text-[#181d17]">#{rule.ruleCode}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">تاريخ الإنشاء</span>
                <span className="font-semibold text-[#181d17]">{rule.createdAt || "12 يناير 2026"}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">أنشئت بواسطة</span>
                <span className="font-semibold text-[#181d17]">{rule.creatorName || "م. طارق العسيري"}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">آخر تعديل</span>
                <span className="font-semibold text-[#181d17]">{rule.lastModified || "12 سبتمبر 2026"}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500">صلاحية الإدارة</span>
                <span className="font-semibold text-[#4b5940]">إدارة المنصة المركزية</span>
              </div>
            </div>
          </div>

          {/* Card 2: Real-time Channel Health Card [1:23715] */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#181d17] pb-2 border-b border-gray-100">
              حالة القنوات التشغيلية
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">Meta WhatsApp Cloud API</div>
                    <div className="text-[11px] text-gray-500">زمن الاستجابة: 48ms</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  متصل ومستقر
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">Smart Lock Gateway</div>
                    <div className="text-[11px] text-gray-500">مزامنة الأقفال الذكية</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  جاهز 100%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div>
                    <div className="text-xs font-bold text-[#181d17]">SMS Fallback Gateway</div>
                    <div className="text-[11px] text-gray-500">القناة البديلة للطوارئ</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  في وضع الاستعداد
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Upcoming Scheduled Triggers Card [1:23747] */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#181d17]">العمليات المجدولة القادمة</span>
              <Calendar className="w-4 h-4 text-[#4b5940]" />
            </div>
            <p className="text-xs text-[#454840] leading-relaxed">
              34 رسالة WhatsApp مجدولة للإرسال التلقائي للنزلاء خلال الـ 24 ساعة القادمة بحسب مواعيد الوصول.
            </p>
            <div className="p-3 rounded-xl bg-[#f6fbf1] border border-[#d8e8cb] text-center">
              <span className="text-xs font-bold text-[#34422a]">
                الجدولة اللحظية نشطة وتعمل بكفاءة
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showPauseModal && (
        <PauseRuleModal
          isOpen={showPauseModal}
          onClose={() => setShowPauseModal(false)}
          onConfirm={handlePauseConfirm}
          rule={rule}
        />
      )}

      {showActivateModal && (
        <ActivateRuleModal
          isOpen={showActivateModal}
          onClose={() => setShowActivateModal(false)}
          onConfirm={handleActivateConfirm}
          rule={rule}
        />
      )}

      {showDeleteModal && (
        <DeleteRuleModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          rule={rule}
        />
      )}
    </div>
  );
}
