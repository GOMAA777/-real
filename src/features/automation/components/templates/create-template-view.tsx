"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Send,
  MessageSquare,
  Sparkles,
  Smartphone,
  Check,
  CheckCheck,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Sliders,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Eye,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { PreviewTemplateModal } from "./modals/preview-template-modal";

export function CreateTemplateView() {
  const router = useRouter();

  // Form states
  const [templateCode, setTemplateCode] = useState("tpl_booking_confirmation_v2");
  const [templateName, setTemplateName] = useState("تأكيد حجز جديد وإرسال كود الدخول");
  const [category, setCategory] = useState("bookings");
  const [language, setLanguage] = useState("العربية (ar)");
  const [headerType, setHeaderType] = useState<"text" | "image" | "none">("text");
  const [headerText, setHeaderText] = useState("تأكيد الحجز - أبراج للضيافة");
  const [messageBody, setMessageBody] = useState(
    `مرحبًا {{1}}،\n\nيسعدنا استقبالكم في {{2}} - {{3}}.\n\n📅 تاريخ الوصول: {{4}}\n📅 تاريخ المغادرة: {{5}}\n🔑 كود الدخول للباب الذكي: {{6}}\n\nنتمنى لكم إقامة ممتعة ونسعد بخدمتكم دائماً!`
  );
  const [footerText, setFooterText] = useState("أبراج لإدارة الأصول العقارية - خدمة العملاء 24/7");
  const [button1Label, setButton1Label] = useState("فتح الموقع في خرائط Google");
  const [button2Label, setButton2Label] = useState("دليل كود الدخول والتعليمات");

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic variable insertion
  const insertVariable = (varName: string) => {
    setMessageBody((prev) => `${prev} {{${varName}}}`);
    toast.info(`تمت إضافة المتغير {{${varName}}} إلى نص الرسالة`);
  };

  // Preview replacement computation
  const previewBodyFormatted = messageBody
    .replace(/\{\{1\}\}|\{\{اسم العميل\}\}/g, "خالد العتيبي")
    .replace(/\{\{2\}\}|\{\{اسم العقار\}\}/g, "عمارة النخيل")
    .replace(/\{\{3\}\}|\{\{رقم الوحدة\}\}/g, "الوحدة 204")
    .replace(/\{\{4\}\}|\{\{تاريخ الوصول\}\}/g, "18 سبتمبر 2026 (02:00 م)")
    .replace(/\{\{5\}\}|\{\{تاريخ المغادرة\}\}/g, "21 سبتمبر 2026 (12:00 م)")
    .replace(/\{\{6\}\}|\{\{كود الدخول\}\}/g, "482913")
    .replace(/\{\{رابط الموقع\}\}/g, "https://maps.google.com/?q=24.77,46.68");

  const confirm = useConfirm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد اعتماد وحفظ القالب",
      message: `هل أنت متأكد من رغبتك في إرسال قالب واتساب "${templateName}" (${templateCode}) للاعتماد الرسمي عبر Meta Cloud API؟`,
      confirmLabel: "اعتماد وحفظ القالب",
      variant: "default",
    });
    if (!ok) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم إرسال قالب واتساب للاعتماد الفوري عبر Meta Cloud API بنجاح!");
      router.push("/dashboard/automation?tab=templates");
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/automation?tab=templates"
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#181d17]">إنشاء قالب واتساب</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d8e8cb] text-[#34422a] border border-[#c6dcbe] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4b5940]" />
                Meta Cloud API معتمد
              </span>
            </div>
            <p className="text-xs text-[#454840] mt-1">
              قم بإنشاء وصياغة قالب رسالة واتساب معتمد وقابل لإعادة الاستخدام وربطه بمحرك الأتمتة المركزي للمنصة.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPreviewModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 text-[#454840] bg-[#FAFBF9] hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-[#4b5940]" />
          <span>معاينة الرسالة الفعلية</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right Column: Editor Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Metadata */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#4b5940]" />
                  <h2 className="text-base font-bold text-[#181d17]">بيانات وتصنيف القالب</h2>
                </div>
                <span className="text-xs text-gray-400 font-normal">معايير Meta الرسمية</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      رمز القالب البرمجي (Code) *
                    </label>
                    <input
                      type="text"
                      value={templateCode}
                      onChange={(e) => setTemplateCode(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs font-mono focus:outline-none focus:border-[#4b5940] transition-colors"
                      placeholder="tpl_booking_confirmation_v2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      اسم القالب التعريفي *
                    </label>
                    <input
                      type="text"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] transition-colors"
                      placeholder="تأكيد حجز جديد وإرسال كود الدخول"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      تصنيف القالب *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4b5940] bg-white transition-colors"
                    >
                      <option value="bookings">حجوزات وإشعارات (Bookings)</option>
                      <option value="arrival">تفاصيل وإرشادات الوصول (Arrival)</option>
                      <option value="door_pin">كود الدخول الذكي (Door PIN)</option>
                      <option value="departure">المغادرة والتقييم (Checkout)</option>
                      <option value="operations">تشغيل وتنبيهات أمان (Operations)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                      اللغة المعتمدة
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4b5940] bg-white transition-colors"
                    >
                      <option value="العربية (ar)">العربية (ar-SA)</option>
                      <option value="English (en)">English (en-US)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Header (رأس الرسالة) */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#4b5940]" />
                  <h2 className="text-base font-bold text-[#181d17]">رأس الرسالة (Header - اختياري)</h2>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setHeaderType("text")}
                    className={`px-3 py-1 rounded-md transition-all font-semibold ${
                      headerType === "text" ? "bg-white text-[#4b5940] shadow-sm" : "text-gray-500"
                    }`}
                  >
                    نص (Text)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeaderType("image")}
                    className={`px-3 py-1 rounded-md transition-all font-semibold ${
                      headerType === "image" ? "bg-white text-[#4b5940] shadow-sm" : "text-gray-500"
                    }`}
                  >
                    صورة (Image)
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeaderType("none")}
                    className={`px-3 py-1 rounded-md transition-all font-semibold ${
                      headerType === "none" ? "bg-white text-[#4b5940] shadow-sm" : "text-gray-500"
                    }`}
                  >
                    بدون رأس
                  </button>
                </div>
              </div>

              {headerType === "text" && (
                <div>
                  <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                    نص العنوان البارز للرأس
                  </label>
                  <input
                    type="text"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] transition-colors"
                    placeholder="مثال: تأكيد الحجز - أبراج للضيافة"
                  />
                </div>
              )}

              {headerType === "image" && (
                <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 text-center space-y-1">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
                  <div className="text-xs font-semibold text-[#181d17]">
                    سيتم استخدام صورة الغلاف الافتراضية للعقار تلقائياً
                  </div>
                  <div className="text-[11px] text-gray-400">
                    تدعم Meta ملفات JPG و PNG بحد أقصى 5 ميجابايت
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Body & Variables */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#4b5940]" />
                  <h2 className="text-base font-bold text-[#181d17]">نص الرسالة الأساسي (Body) *</h2>
                </div>
                <span className="text-xs text-[#4b5940] font-semibold">يدعم الحقول الديناميكية</span>
              </div>

              {/* Variable Injection Buttons */}
              <div>
                <label className="block text-xs font-semibold text-[#181d17] mb-2">
                  إدراج حقل ديناميكي سريع:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => insertVariable("اسم العميل")}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[11px] font-semibold text-gray-700 hover:text-[#34422a] transition-colors"
                  >
                    + اسم العميل
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("اسم العقار")}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[11px] font-semibold text-gray-700 hover:text-[#34422a] transition-colors"
                  >
                    + اسم العقار
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("رقم الوحدة")}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[11px] font-semibold text-gray-700 hover:text-[#34422a] transition-colors"
                  >
                    + رقم الوحدة
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("تاريخ الوصول")}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[11px] font-semibold text-gray-700 hover:text-[#34422a] transition-colors"
                  >
                    + تاريخ الوصول
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("تاريخ المغادرة")}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#ebefe6] text-[11px] font-semibold text-gray-700 hover:text-[#34422a] transition-colors"
                  >
                    + تاريخ المغادرة
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("كود الدخول")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800 transition-colors"
                  >
                    + كود الدخول الذكي
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("رابط الموقع")}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-800 transition-colors"
                  >
                    + رابط الموقع
                  </button>
                </div>
              </div>

              <div>
                <textarea
                  rows={8}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4b5940] transition-colors leading-relaxed font-sans"
                  placeholder="اكتب نص الرسالة هنا..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181d17] mb-1.5">
                  تذييل الرسالة (Footer - اختياري)
                </label>
                <input
                  type="text"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#4b5940] transition-colors text-gray-600"
                  placeholder="مثال: أبراج لإدارة الأصول العقارية - خدمة العملاء 24/7"
                />
              </div>
            </div>

            {/* Section 4: Interactive Quick Action Buttons */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#4b5940]" />
                  <h2 className="text-base font-bold text-[#181d17]">أزرار التفاعل السريع (Quick Actions)</h2>
                </div>
                <span className="text-xs text-gray-400">بحد أقصى زرين</span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <div className="flex-1">
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                      زر رابط URL (فتح الموقع)
                    </label>
                    <input
                      type="text"
                      value={button1Label}
                      onChange={(e) => setButton1Label(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#4b5940]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <div className="flex-1">
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                      زر رابط URL (دليل التعليمات)
                    </label>
                    <input
                      type="text"
                      value={button2Label}
                      onChange={(e) => setButton2Label(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none focus:border-[#4b5940]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit & Cancel */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 rounded-xl bg-[#4b5940] hover:bg-[#3d4934] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitting ? "جارٍ إرسال القالب للاعتماد..." : "اعتماد وحفظ القالب (Meta API)"}</span>
              </button>

              <Link
                href="/dashboard/automation?tab=templates"
                className="px-6 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold flex items-center justify-center transition-colors"
              >
                إلغاء
              </Link>
            </div>
          </div>

          {/* Left Column: Live Realistic WhatsApp Smartphone Mockup (5 Cols) [1:24708] */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#111b21] rounded-[36px] p-3 shadow-2xl border-4 border-gray-800 overflow-hidden text-right">
              {/* Phone Speaker Notch Area */}
              <div className="pt-2 pb-3 px-6 flex items-center justify-between text-gray-400 text-[10px]">
                <div className="flex items-center gap-1">
                  <span>94%</span>
                  <div className="w-4 h-2 border border-gray-400 rounded-2xs flex items-center p-0.5">
                    <div className="w-full h-full bg-gray-400" />
                  </div>
                </div>
                <div className="w-16 h-3 bg-black rounded-full" />
                <span>09:41</span>
              </div>

              {/* WhatsApp App Header */}
              <div className="bg-[#202c33] px-4 py-3 rounded-t-2xl flex items-center justify-between border-b border-gray-700/50">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-xs">⋮</span>
                  <span className="text-xs">📞</span>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1 justify-end">
                      <span>أبراج للضيافة</span>
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-[10px] text-emerald-400">حساب أعمال موثّق</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#34422a] flex items-center justify-center text-white text-xs font-bold">
                    أ
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat Body */}
              <div className="bg-[#efeae2] p-4 min-h-[460px] flex flex-col justify-between space-y-3">
                {/* Date separator */}
                <div className="text-center">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-gray-600 text-[10px] font-semibold shadow-xs">
                    اليوم
                  </span>
                </div>

                {/* Message Bubble */}
                <div className="bg-[#e7ffdb] rounded-2xl rounded-tr-none p-3.5 shadow-sm border border-[#d6f0c8] space-y-2 text-right">
                  {/* Header text if enabled */}
                  {headerType === "text" && headerText && (
                    <div className="text-xs font-bold text-[#181d17] pb-1 border-b border-[#cde8bd]">
                      {headerText}
                    </div>
                  )}

                  {/* Body Text */}
                  <div className="text-xs text-[#181d17] leading-relaxed whitespace-pre-line">
                    {previewBodyFormatted}
                  </div>

                  {/* Footer Text */}
                  {footerText && (
                    <div className="text-[10px] text-gray-500 pt-1 border-t border-[#cde8bd]">
                      {footerText}
                    </div>
                  )}

                  {/* Message Time and Read ticks */}
                  <div className="flex items-center justify-end gap-1 text-[10px] text-gray-400 font-mono pt-1">
                    <span>14:32</span>
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  </div>

                  {/* Buttons */}
                  {(button1Label || button2Label) && (
                    <div className="pt-2 border-t border-[#cde8bd] space-y-1">
                      {button1Label && (
                        <div className="w-full py-1.5 px-3 rounded-lg bg-white text-blue-600 text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs">
                          <span>{button1Label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                      {button2Label && (
                        <div className="w-full py-1.5 px-3 rounded-lg bg-white text-blue-600 text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs">
                          <span>{button2Label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom interactive note */}
                <div className="p-2.5 rounded-xl bg-white/70 backdrop-blur-xs border border-white/60 text-center">
                  <p className="text-[11px] text-gray-600">
                    معاينة حية دقيقة: تتغير محتويات الهاتف لحظياً مع كتابتك للنص والمتغيرات.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      {previewModalOpen && (
        <PreviewTemplateModal
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          template={{
            id: templateCode,
            templateCode,
            title: templateName,
            category: category as any,
            categoryLabel: "الحجوزات",
            triggerLabel: "عند إنشاء حجز مؤكد",
            language,
            variables: ["{guest_name}", "{property_name}"],
            status: "active",
            statusLabel: "مفعلة",
            lastModifiedDate: "اليوم",
            lastModifiedAuthor: "م. طارق العسيري",
            content: messageBody,
          }}
        />
      )}
    </div>
  );
}
