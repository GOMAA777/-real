"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Sliders,
  FileText,
  Upload,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Bell,
  Lock,
  Calendar,
  ChevronDown,
  Phone,
  FileCheck,
  Check,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

export function CreateMaintenanceTicketView() {
  const router = useRouter();

  // Form states
  const [selectedOwner, setSelectedOwner] = useState("سارة القحطاني");
  const [selectedProperty, setSelectedProperty] = useState("برج الياسمين — الرياض");
  const [selectedUnit, setSelectedUnit] = useState("الوحدة 305 (الطابق 3)");
  const [category, setCategory] = useState("أقفال ومداخل إلكترونية");
  const [impactScope, setImpactScope] = useState("تعطيل وصول النزيل كلياً");
  const [priority, setPriority] = useState<"low" | "med" | "high" | "urgent">("urgent");
  const [description, setDescription] = useState(
    "قفل الباب الذكي الرقمي لا يستجيب للبطاقات أو الأكواد المزامنة، وتظهر ومضات متقطعة حمراء عند محاولة الفتح. يرجى فحص محول الطاقة ومستشعر المغلاق قبل موعد دخول النزيل القادم."
  );
  const [assignee, setAssignee] = useState("م. طارق العسيري");
  const [timeWindow, setTimeWindow] = useState("اليوم — الفترة الصباحية (خلال 90 دقيقة)");

  const [files, setFiles] = useState([
    { name: "lock_diagnostic_panel.jpg", size: "1.8 MB" },
    { name: "voltage_check_reading.png", size: "950 KB" },
  ]);

  const confirm = useConfirm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد إنشاء بلاغ الصيانة",
      message: `هل أنت متأكد من إنشاء بلاغ الصيانة لـ (${selectedUnit})؟ سيتم حظر الوحدة آلياً من التقويم المركزي وإخطار الفريق الفني.`,
      confirmLabel: "تأكيد وبدء البلاغ",
      variant: "default",
    });
    if (!ok) return;

    toast.success("تم إنشاء بلاغ الصيانة MT-2048 وحظر الوحدة آلياً من الحجوزات بنجاح!");
    router.push("/dashboard/operations/maintenance/MT-2048");
  };

  const removeFile = async (name: string) => {
    const ok = await confirm({
      title: "تأكيد حذف الملف المرفق",
      message: `هل أنت متأكد من رغبتك في حذف الملف "${name}" من مرفقات البلاغ؟`,
      confirmLabel: "حذف الملف",
      variant: "destructive",
    });
    if (!ok) return;

    setFiles(files.filter((f) => f.name !== name));
    toast.info(`تم حذف الملف ${name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/operations"
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">إنشاء بلاغ صيانة جديد</h1>
            <p className="text-xs text-[#6B7280] mt-1">
              تسجيل عطل تشغيلي أو بلاغ صيانة ميداني لربطه بالأصل العقاري وجدولته فورياً وفق بروتوكولات الحوكمة.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right Column: Form Fields (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Target Property Asset */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <Building2 className="w-5 h-5 text-[#1F3D2B]" />
                <span>الأصل العقاري المستهدف</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    المالك المسجل <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedOwner}
                      onChange={(e) => setSelectedOwner(e.target.value)}
                      className="w-full appearance-none p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                    >
                      <option>سارة القحطاني</option>
                      <option>محمد العتيبي</option>
                      <option>خالد الحربي</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    العقار المستضاف <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.target.value)}
                      className="w-full appearance-none p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                    >
                      <option>برج الياسمين — الرياض</option>
                      <option>عمارة النخيل</option>
                      <option>مجمع الواحة</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    الوحدة المحددة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full appearance-none p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                    >
                      <option>الوحدة 305 (الطابق 3)</option>
                      <option>الوحدة 204 (الطابق 2)</option>
                      <option>الوحدة 108 (الطابق 1)</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Unit Info Box */}
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1F2937]">
                      الوحدة 305 (جناح عائلي تنفيذي - 3 غرف نوم)
                    </p>
                    <p className="text-[11px] text-[#6B7280]">
                      عقد الاستثمار النشط: CON-9022# • نوع التشغيل: إيجار موسمي
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#EEF5EE] text-[#1F3D2B] rounded-full text-[11px] font-semibold border border-[#DCE8DC] flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>الوثيقة التأمينية سارية</span>
                </span>
              </div>
            </div>

            {/* Card 2: Classification and Operational Nature */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <Sliders className="w-5 h-5 text-[#1F3D2B]" />
                <span>تصنيف وطبيعة البلاغ التشغيلي</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    فئة العطل الفني <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                    >
                      <option>أقفال ومداخل إلكترونية</option>
                      <option>تكييف وتبريد</option>
                      <option>سباكة وصرف صحي</option>
                      <option>كهرباء وإنارة</option>
                      <option>أثاث وديكور</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    نطاق التأثر الميداني <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={impactScope}
                      onChange={(e) => setImpactScope(e.target.value)}
                      className="w-full appearance-none p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                    >
                      <option>تعطيل وصول النزيل كلياً</option>
                      <option>تأثير جزئي على إقامة النزيل</option>
                      <option>عطل جمالي لا يؤثر على التشغيل</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] block">
                    يتم بناءً عليه تحديد مهلة الاستجابة المتوقعة (SLA)
                  </span>
                </div>
              </div>

              {/* SLA Priority Selector */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#374151]">
                    درجة الأولوية وزمن الاستجابة <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-[#DC2626] font-semibold flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5" />
                    <span>يوجد حجز استلام مجدول خلال أقل من 24 ساعة</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPriority("low")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      priority === "low"
                        ? "bg-[#FAFBF9] border-[#1F3D2B] text-[#1F3D2B] font-bold"
                        : "bg-[#FAFBF9] border-[#EBEBEB] text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    <span className="block font-bold">عادية (Low)</span>
                    <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">خلال 48 ساعة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPriority("med")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      priority === "med"
                        ? "bg-[#FAFBF9] border-[#1F3D2B] text-[#1F3D2B] font-bold"
                        : "bg-[#FAFBF9] border-[#EBEBEB] text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    <span className="block font-bold">متوسطة (Med)</span>
                    <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">خلال 24 ساعة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPriority("high")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      priority === "high"
                        ? "bg-[#FAFBF9] border-[#1F3D2B] text-[#1F3D2B] font-bold"
                        : "bg-[#FAFBF9] border-[#EBEBEB] text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    <span className="block font-bold">عالية (High)</span>
                    <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">خلال 8 ساعات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPriority("urgent")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      priority === "urgent"
                        ? "bg-[#FEF2F2] border-[#EF4444] text-[#B91C1C] font-bold ring-2 ring-red-500/20"
                        : "bg-[#FAFBF9] border-[#EBEBEB] text-[#6B7280] hover:bg-gray-50"
                    }`}
                  >
                    <span className="block font-bold flex items-center justify-center gap-1">
                      <span>*</span> عاجلة وفورية
                    </span>
                    <span className="text-[10px] text-[#DC2626] mt-0.5 block font-semibold">
                      استجابة فورية (&lt; 2 ساعة)
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Technical Details and Description */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <FileText className="w-5 h-5 text-[#1F3D2B]" />
                <span>التفاصيل والوصف الفني للخلل</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-[#374151]">
                    وصف المشكلة بدقة والأعراض الميدانية <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[#9CA3AF] font-mono">{description.length} / 500 حرف</span>
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-xs md:text-sm text-[#1F2937] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    المسؤول المكلف بالمتابعة والمعالجة <span className="text-xs font-normal text-[#9CA3AF]">(اختياري)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value)}
                      className="w-full appearance-none p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#1F3D2B]"
                    >
                      <option>م. طارق العسيري</option>
                      <option>م. أنس الصالح</option>
                      <option>شركة الصيانة المعتمدة</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] block">
                    إرسال إشعار فوري إلى تطبيق الفني الميداني
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#374151]">
                    نافذة الزيارة الفنية المتاحة <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="w-full p-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#1F2937] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1F3D2B]" />
                        <span>{timeWindow}</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF] block">
                    تم التنسيق مع أمن مجمع برج الياسمين للتصاريح
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Attachments and Inspection Photos */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <Upload className="w-5 h-5 text-[#1F3D2B]" />
                <span>المرفقات وتوثيق المعاينة الميدانية</span>
              </div>

              {/* Dropzone */}
              <div className="border-2 border-dashed border-[#E5E7EB] bg-[#FAFBF9] rounded-2xl p-6 text-center space-y-2 hover:border-[#1F3D2B] transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#EEF5EE] text-[#1F3D2B] flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#374151] font-medium">
                  اسحب وأفلت صور العطل أو تقرير المعاينة هنا، أو{" "}
                  <span className="text-[#1F3D2B] font-bold underline">استعرض الملفات</span>
                </p>
                <p className="text-[10px] text-[#9CA3AF]">
                  يدعم الامتدادات (PNG, JPG, PDF, HEIC) بحد أقصى 15MB لكل ملف
                </p>
              </div>

              {/* Uploaded Files Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="p-3 bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF3EA] text-[#1F3D2B] flex items-center justify-center font-bold">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1F2937] text-xs font-mono">{file.name}</p>
                        <p className="text-[10px] text-[#16A34A]">تم الفحص بنجاح • {file.size}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(file.name)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column: Governance and Linked Asset (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Governance and Programmatic Impact */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F3F4F6] text-base font-bold text-[#1F2937]">
                <ShieldAlert className="w-5 h-5 text-[#1F3D2B]" />
                <span>حوكمة وأثر الإجراء البرمجي</span>
              </div>

              <div className="space-y-3 text-xs text-[#374151]">
                <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-[#EBEBEB] space-y-1">
                  <span className="font-bold text-[#1F2937] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1F3D2B]" />
                    <span>توليد تذكرة رسمية:</span>
                  </span>
                  <p className="text-[11px] text-[#6B7280]">
                    تتحول حالة البلاغ فوراً إلى «بلاغ صيانة» برقم تذكرة آلي موثق (MT-2048).
                  </p>
                </div>

                <div className="p-3 bg-[#FEF2F2] rounded-2xl border border-[#FEE2E2] space-y-1">
                  <span className="font-bold text-[#DC2626] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>حظر الوحدة آلياً:</span>
                  </span>
                  <p className="text-[11px] text-[#991B1B]">
                    تتحول حالة الوحدة 305 تلقائياً من «متاحة» إلى «تحت الصيانة» ويتم حظرها برمجياً من كافة محركات الحجز والقنوات المتصلة (OTAs).
                  </p>
                </div>

                <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-[#EBEBEB] space-y-1">
                  <span className="font-bold text-[#1F2937] flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#1F3D2B]" />
                    <span>سجل التدقيق المؤسسي:</span>
                  </span>
                  <p className="text-[11px] text-[#6B7280]">
                    إدراج قيد رسمي غير قابل للإلغاء في سجل نشاط العقار موثقاً باسم مدير المنصة المركزية (محمد أحمد).
                  </p>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between items-center text-[11px] font-semibold mb-1 text-[#1F3D2B]">
                    <span>مدى جاهزية الإجراء للأتمتة</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#1F3D2B] rounded-full w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Linked Asset */}
            <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#1F2937]">معاينة الأصل المرتبط</h3>

              {/* Property Image Banner */}
              <div className="relative rounded-2xl overflow-hidden h-36 bg-gray-900 group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{
                    backgroundImage: `url('/assets/operations/43efbbc00559a2457719e7e49b795cd6927bda6b.png')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 right-3 text-white">
                  <p className="text-sm font-bold">برج الياسمين الفاخر</p>
                  <p className="text-[11px] text-gray-200">شقة 305 • حي العقيق، الرياض</p>
                </div>
              </div>

              {/* Next Guest Box */}
              <div className="bg-[#FAFBF9] border border-[#EBEBEB] rounded-2xl p-3.5 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF]">النزيل القادم:</span>
                  <div className="text-left">
                    <span className="font-bold text-[#1F2937] block">سلطان الدوسري</span>
                    <span className="text-[10px] text-[#6B7280]">غداً 03:00 م</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#F0F2EE]">
                  <span className="text-[#9CA3AF]">رمز القفل الحالي:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-sm text-[#1F2937]">#6629*</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-red-600 font-semibold">
                      غير متجاوب
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Contact Button */}
              <button
                type="button"
                className="w-full p-2.5 rounded-xl border border-[#E5E7EB] bg-[#FAFBF9] hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-semibold text-[#374151] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1F3D2B]" />
                <span>التواصل المباشر مع مديرة العقار: سارة القحطاني</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-[#1F3D2B] text-white text-sm font-bold hover:bg-[#183022] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>إنشاء البلاغ وتثبيت الحالة</span>
              </button>

              <Link
                href="/dashboard/operations"
                className="w-full py-3 px-5 rounded-2xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <ArrowRight className="w-4 h-4" />
                <span>إلغاء والعودة لجدول البلاغات</span>
              </Link>

              <p className="text-[10px] text-center text-[#9CA3AF] leading-relaxed">
                بالضغط على "إنشاء البلاغ"، يتم تفويض وتوثيق أمر العمل فورياً وفق السياسات الإجرائية.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
