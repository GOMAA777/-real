"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Building2,
  User,
  Phone,
  Key,
  ExternalLink,
  Download,
  Share2,
  Lock,
  Calendar,
  CheckCheck,
  Check,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { ExecutionLog } from "../../types";

interface ExecutionLogDetailViewProps {
  log: ExecutionLog;
}

export function ExecutionLogDetailView({ log }: ExecutionLogDetailViewProps) {
  const router = useRouter();

  const handleExportAudit = () => {
    toast.info("جارٍ إنشاء شهادة التدقيق الرقمية المعتمدة...");
    setTimeout(() => {
      toast.success("تم تصدير سجل التدقيق الرقمي بنجاح!");
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card [1:25713] */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/automation?tab=logs"
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181d17]">
                تفاصيل تنفيذ الأتمتة — {log.id}
              </h1>
              {log.status === "success" ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a] border border-[#c6dcbe] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4b5940]" />
                  حالة العملية: نجح التوصيل
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  حالة العملية: تعذر الإرسال
                </span>
              )}
            </div>
            <p className="text-xs text-[#454840] mt-1">
              سجل التدقيق الشامل لعملية التشغيل التلقائي وحالة تسليم الرسالة المشفرة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ebefe6] text-[#454840]">
            نوع الإجراء: {log.actionBadgeLabel}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            سجل تاريخي للقراءة فقط
          </span>
        </div>
      </div>

      {/* Main Grid: 8 Cols for Process & Message, 4 Cols for Technical Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column: Execution Data & Timeline (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section A: Execution Metadata Bento [1:25738] */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#181d17] pb-3 border-b border-[#F3F4F6]">
              ملخص مسار التنفيذ والارتباط المباشر
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                <span className="text-[11px] text-gray-400">القاعدة المرتبطة</span>
                <div className="font-bold text-[#181d17] mt-1">{log.ruleName}</div>
                <div className="font-mono text-[11px] text-[#4b5940] mt-0.5">#{log.ruleId}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                <span className="text-[11px] text-gray-400">رقم الحجز المرجعي</span>
                <div className="font-bold font-mono text-[#34422a] mt-1">{log.bookingId}</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">حجز مؤكد ومدفوع</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                <span className="text-[11px] text-gray-400">النزيل المستلم</span>
                <div className="font-bold text-[#181d17] mt-1">{log.guestName}</div>
                <div className="font-mono text-[11px] text-gray-500 mt-0.5">{log.guestPhone}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                <span className="text-[11px] text-gray-400">العقار والوحدة</span>
                <div className="font-bold text-[#181d17] mt-1">{log.propertyName}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{log.unitName}</div>
              </div>
            </div>
          </div>

          {/* Section B: Detailed Execution Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#181d17] pb-3 border-b border-[#F3F4F6]">
              مخطط زمني تفصيلي لمراحل التنفيذ (Execution Timeline)
            </h2>

            <div className="relative pl-4 space-y-4 before:absolute before:right-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 text-xs text-right">
              {/* Step 1 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181d17]">
                      استقبال محفز الحجز من المنصة (Booking Created Event)
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">09:00:10 ص</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    تم استلام حدث تأكيد الحجز فورياً عبر Webhook الداخلي للمنظومة.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181d17]">
                      مطابقة وفحص الشروط والقيود (Validation Passed)
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">09:00:11 ص</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    التحقق من حالة الحجز المؤكد، توفر رقم هاتف صالح، وتوافق نوع الوحدة بنسبة 100%.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181d17]">
                      استرجاع كود القفل الذكي المشفر من البوابة
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">09:00:12 ص</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    توليد الرمز المؤقت (482913) ومزامنته مع قفل باب الوحدة بنجاح.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-[#FBFDFB] border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181d17]">
                      إرسال الرسالة عبر Meta WhatsApp Cloud API
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">09:00:14 ص</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    استجابة خادم Meta بالرمز HTTP 200 OK وتعيين معرف الرسالة wamid.HBjgM104.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-3 relative">
                <div className="w-6 h-6 rounded-full bg-[#4b5940] text-white flex items-center justify-center shrink-0 text-xs font-bold z-10">
                  <CheckCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-[#f6fbf1] border border-[#d8e8cb]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#181d17]">
                      استلام إشعار التسليم والقراءة على جهاز النزيل (Delivered & Read)
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">09:00:15 ص</span>
                  </div>
                  <p className="text-[11px] text-[#454840] mt-0.5">
                    اكتملت دورة المعالجة بزمن إجمالي 4.2 ثانية بنجاح تام.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Resolved Variables Table */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#181d17] pb-3 border-b border-[#F3F4F6]">
              حل المتغيرات الديناميكية (Resolved Template Variables)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-[#454840] font-bold">
                    <th className="py-2.5 px-3">المتغير البرمجي</th>
                    <th className="py-2.5 px-3">القيمة المحلولة والمستبدلة</th>
                    <th className="py-2.5 px-3">الحقل المصدر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#ba1a1a]">{"{{1}}"}</td>
                    <td className="py-2.5 px-3 font-bold text-[#181d17]">{log.guestName}</td>
                    <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">booking.guest_name</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#ba1a1a]">{"{{2}}"}</td>
                    <td className="py-2.5 px-3 font-bold text-[#181d17]">{log.propertyName}</td>
                    <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">property.name_ar</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#ba1a1a]">{"{{3}}"}</td>
                    <td className="py-2.5 px-3 font-bold text-[#181d17]">{log.unitName}</td>
                    <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">unit.unit_number</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#ba1a1a]">{"{{4}}"}</td>
                    <td className="py-2.5 px-3 font-bold text-[#181d17]">18 سبتمبر 2026 (02:00 م)</td>
                    <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">booking.checkin_time</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#ba1a1a]">{"{{5}}"}</td>
                    <td className="py-2.5 px-3 font-bold text-[#34422a] bg-[#ebefe6] px-2 py-0.5 rounded font-mono">
                      482913
                    </td>
                    <td className="py-2.5 px-3 text-gray-500 font-mono text-[11px]">smart_lock.generated_otp</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Left Column: Diagnostics, Payload & Audit (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Technical Meta Cloud Payload */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#181d17] pb-2 border-b border-gray-100">
              بيانات المعالجة الفنية (Meta Cloud API)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-gray-400">Meta Message ID</span>
                <div className="font-mono font-semibold text-[#181d17] bg-gray-50 p-2 rounded-lg border border-gray-100 text-[11px] break-all mt-1">
                  {log.metaCloudMessageId || "wamid.HBjgM104ODkyNTM2MjEwOAAA"}
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">رمز استجابة المزود</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  200 OK (Accepted)
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">زمن المعالجة الإجمالي</span>
                <span className="font-mono font-bold text-[#181d17]">{log.responseTime || "4.2 ثانية"}</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-gray-500">التشفير المعتمد</span>
                <span className="font-semibold text-emerald-800 flex items-center gap-1 text-[11px]">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  AES-256 E2EE Verified
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Received WhatsApp Bubble Preview */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#181d17]">الرسالة المسلمة لهاتف النزيل</span>
              <MessageSquare className="w-4 h-4 text-[#4b5940]" />
            </div>

            <div className="bg-[#efeae2] p-3 rounded-2xl">
              <div className="bg-[#e7ffdb] rounded-xl rounded-tr-none p-3 border border-[#d6f0c8] space-y-1.5 text-right text-xs leading-relaxed">
                <div className="font-bold text-[#181d17]">مرحبًا {log.guestName}،</div>
                <p>
                  يسعدنا استقبالكم في <span className="font-bold text-[#34422a]">{log.propertyName}</span> - {log.unitName}.
                </p>
                <p className="text-[11px] text-gray-700">
                  🔑 كود القفل الذكي: <span className="font-bold font-mono">482913</span>
                </p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 font-mono pt-1">
                  <span>{log.time}</span>
                  <CheckCheck className="w-3 h-3 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Actions */}
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-3">
            <button
              type="button"
              onClick={handleExportAudit}
              className="w-full h-11 rounded-xl bg-[#4b5940] hover:bg-[#3d4934] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>تصدير شهادة التدقيق الرقمية (PDF)</span>
            </button>

            <Link
              href="/dashboard/automation?tab=logs"
              className="w-full h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center transition-colors"
            >
              الرجوع لسجل العمليات الكامل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
