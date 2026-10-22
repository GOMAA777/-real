"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  KeyRound,
  Lock,
  PhoneCall,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Wifi,
  Wind,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UnitStatus } from "../../types";
import { UnitOccupancyTimeline } from "./unit-occupancy-timeline";

interface UnitStatusContentProps {
  status: UnitStatus;
  unitNumber?: string;
  propertyName?: string;
  onOpenShowCode?: () => void;
  onOpenAccessCodeModal?: () => void;
}

export function UnitStatusContent({
  status,
  unitNumber = "204",
  propertyName = "عمارة النخيل",
  onOpenShowCode,
  onOpenAccessCodeModal,
}: UnitStatusContentProps) {
  const confirm = useConfirm();
  // Case 1: Occupied State [1:14845]
  if (status === "occupied") {
    return (
      <div className="space-y-4">
        {/* Active Booking Card */}
        <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-5 text-start">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5EB]">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-[10px] bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[17px] font-bold text-[#181D17]">
                    الحجز الحالي النشط
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF1E8] text-[#2F5A22]">
                    #BK-10482
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                    Booking.com
                  </span>
                </div>
                <p className="text-[12px] text-[#7C8773] mt-0.5">
                  تم تسجيل الدخول بنجاح • النزيل متواجد داخل الوحدة حالياً
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toast.info("الانتقال لملف الحجز #BK-10482")}
              className="text-[12px] font-bold text-[#34422A] hover:text-[#181D17] flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>تفاصيل الحجز الكاملة</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guest & Stay Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Guest */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
              <div className="text-[11px] text-[#7C8773] font-medium flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-[#55694D]" />
                <span>بيانات النزيل</span>
              </div>
              <div className="text-[15px] font-bold text-[#181D17]">
                خالد العتيبي
              </div>
              <div className="text-[11.5px] text-[#55694D] mt-0.5" dir="ltr">
                +966 50 123 4567
              </div>
            </div>

            {/* Dates */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
              <div className="text-[11px] text-[#7C8773] font-medium flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#55694D]" />
                <span>فترة الإقامة (4 ليالٍ)</span>
              </div>
              <div className="text-[14px] font-bold text-[#181D17]">
                16 سبت — 20 سبت 2026
              </div>
              <div className="text-[11px] text-[#8A9384] mt-0.5">
                المغادرة: 12:00 ظهراً
              </div>
            </div>

            {/* Financials */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
              <div className="text-[11px] text-[#7C8773] font-medium flex items-center gap-1.5 mb-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-[#2F8A3E]" />
                <span>القيمة والمدفوعات</span>
              </div>
              <div className="text-[16px] font-bold text-[#181D17]">
                1,000 ر.س
              </div>
              <div className="text-[11px] text-[#2F8A3E] font-semibold mt-0.5">
                مدفوع بالكامل (بطاقة ائتمان)
              </div>
            </div>

            {/* Verification */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-3.5 border border-[#EDF1E7]">
              <div className="text-[11px] text-[#7C8773] font-medium flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F8A3E]" />
                <span>توثيق الهوية (شموس)</span>
              </div>
              <div className="text-[13px] font-bold text-[#181D17]">
                موثق نظامياً
              </div>
              <div className="text-[11px] text-[#8A9384] mt-0.5">
                هوية وطنية: 1088492019
              </div>
            </div>
          </div>

          {/* Smart Lock Passcode Banner for this booking */}
          <div className="bg-[#F3F7EE] rounded-[14px] p-4 border border-[#DFE8D7] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[10px] bg-[#34422A] text-white flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </span>
              <div>
                <div className="text-[14px] font-bold text-[#181D17]">
                  كود الدخول الذكي المخصص للنزيل:{" "}
                  <span className="font-mono text-[16px] text-[#2F5A22] bg-white px-2 py-0.5 rounded border border-[#C2D8B1] tracking-widest ms-1">
                    1 2 9 3 8 5
                  </span>
                </div>
                <p className="text-[11.5px] text-[#55694D] mt-0.5">
                  الكود نشط الآن على القفل الذكي وينتهي تلقائياً عند موعد المغادرة (20 سبتمبر 2026 - 12:00 م)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                type="button"
                onClick={onOpenShowCode}
                className="h-9 px-3.5 rounded-[8px] bg-white border border-[#CCD5C5] text-[#181D17] text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#F8FAF6] transition-colors cursor-pointer select-none"
              >
                <Eye className="w-3.5 h-3.5 text-[#34422A]" />
                <span>عرض الكود</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("129385");
                  toast.success("تم نسخ كود الدخول: 129385");
                }}
                className="h-9 px-3.5 rounded-[8px] bg-[#34422A] text-white text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#283420] transition-colors cursor-pointer select-none"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ الكود</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Available State [1:16655]
  if (status === "available") {
    return (
      <div className="space-y-4">
        {/* 7-Day Timeline */}
        <UnitOccupancyTimeline />

        {/* Readiness & Preparation Overview */}
        <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-5 text-start">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5EB]">
            <div>
              <h3 className="text-[17px] font-bold text-[#181D17]">
                جاهزية واستعداد الوحدة للاستقبال الفوري
              </h3>
              <p className="text-[12px] text-[#7C8773] mt-0.5">
                تم اجتياز جميع معايير التدقيق الفندقي بعد آخر عملية تنظيف وتعقيم
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#D8E8CB] text-[#2F5A22] border border-[#C2D8B1]">
              جاهزية 100%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Cleaning */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-4 border border-[#EDF1E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#181D17]">
                  النظافة والتعقيم
                </span>
                <Sparkles className="w-4 h-4 text-[#2F8A3E]" />
              </div>
              <div className="text-[13px] text-[#2F5A22] font-semibold">
                تم التعقيم والفرش
              </div>
              <div className="text-[10.5px] text-[#7C8773] mt-1">
                بواسطة: شركة رعاية الفندقية (أمس 04:30 م)
              </div>
            </div>

            {/* Smart Lock */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-4 border border-[#EDF1E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#181D17]">
                  القفل الذكي
                </span>
                <KeyRound className="w-4 h-4 text-[#2F8A3E]" />
              </div>
              <div className="text-[13px] text-[#2F5A22] font-semibold">
                نشط بانتظار الحجز
              </div>
              <div className="text-[10.5px] text-[#7C8773] mt-1">
                البطارية: 92% • التوليد الآلي مفعّل
              </div>
            </div>

            {/* AC / Climate */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-4 border border-[#EDF1E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#181D17]">
                  التكييف الذكي
                </span>
                <Wind className="w-4 h-4 text-[#55694D]" />
              </div>
              <div className="text-[13px] text-[#181D17] font-semibold">
                وضع التوفير (24°C)
              </div>
              <div className="text-[10.5px] text-[#7C8773] mt-1">
                سيبدأ التبريد التلقائي قبل وصول النزيل بساعة
              </div>
            </div>

            {/* Multi-channel listing */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-4 border border-[#EDF1E7]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#181D17]">
                  قنوات التوزيع
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#2F8A3E]" />
              </div>
              <div className="text-[13px] text-[#181D17] font-semibold">
                معروضة ومتاحة
              </div>
              <div className="text-[10.5px] text-[#7C8773] mt-1">
                Booking • Airbnb • موقع المنصة
              </div>
            </div>
          </div>

          {/* Upcoming Booking Preview */}
          <div className="bg-[#FEF9EE] rounded-[12px] p-4 border border-[#FBEAC4] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-[8px] bg-[#FDE68A] text-[#92400E] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[13px] font-bold text-[#92400E]">
                  الحجز القادم المؤكد: #BK-10490 (السبت 20 سبتمبر 2026)
                </span>
                <p className="text-[11.5px] text-[#78350F] mt-0.5">
                  النزيل: فهد السبيعي • 3 ليالٍ • سيتم توليد كود الدخول تلقائياً قبل الوصول بساعتين
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toast.info("حجز قادم: #BK-10490")}
              className="text-[12px] font-bold text-[#92400E] hover:underline shrink-0"
            >
              عرض الحجز
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Cleaning State [1:17332]
  if (status === "cleaning") {
    return (
      <div className="space-y-4">
        {/* 7-Day Timeline */}
        <UnitOccupancyTimeline />

        {/* Active Cleaning Task Card */}
        <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-5 text-start">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5EB]">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-[10px] bg-[#E0E7FF] text-[#3730A3] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[17px] font-bold text-[#181D17]">
                    مهمة التنظيف الفندقي والتعقيم قيد التنفيذ
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0E7FF] text-[#3730A3]">
                    #CLN-8832
                  </span>
                </div>
                <p className="text-[12px] text-[#7C8773] mt-0.5">
                  بدأت 01:15 م • الوقت المتبقي المقدر: 30 دقيقة (المغادرة المتوقعة 02:30 م)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-[#FEF3C7] text-[#92400E]">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>قيد التنفيذ (75%)</span>
              </span>
            </div>
          </div>

          {/* Details & Live Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Mission Info */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-4 border border-[#EDF1E7] space-y-3">
              <div className="text-[13px] font-bold text-[#181D17]">
                بيانات فريق التجهيز الفندقي:
              </div>
              <div className="space-y-2 text-[12px] text-[#4A5440]">
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">الشركة المعتمدة:</span>
                  <span className="font-bold text-[#181D17]">شركة رعاية الفندقية</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">المشرف الميداني:</span>
                  <span className="font-bold text-[#181D17]">طارق المحمود (+966 55 889 1234)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">كود الدخول المخصص للعمالة:</span>
                  <span className="font-mono font-bold text-[#2F5A22]">كود خدمة مؤقت (صالح حتى 03:00 م)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">حالة القفل الذكي:</span>
                  <span className="font-bold text-[#2F8A3E]">الباب مفتوح - الطاقم بالداخل</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-[#F8FAF6] rounded-[12px] p-4 border border-[#EDF1E7] space-y-2.5">
              <div className="text-[13px] font-bold text-[#181D17] mb-2">
                قائمة الفحص والتحقق الميداني:
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#2F5A22]">
                <CheckCircle2 className="w-4 h-4 text-[#2F8A3E] shrink-0" />
                <span>إخلاء الوحدة ومراجعة مفقودات النزيل السابق</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#2F5A22]">
                <CheckCircle2 className="w-4 h-4 text-[#2F8A3E] shrink-0" />
                <span>استبدال المفارش والبياضات الفندقية بالكامل</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#2F5A22]">
                <CheckCircle2 className="w-4 h-4 text-[#2F8A3E] shrink-0" />
                <span>تعقيم دورة المياه ومرافق المطبخ وتطهير الأسطح</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#D97706] font-semibold">
                <Clock className="w-4 h-4 text-[#D97706] shrink-0 animate-spin" />
                <span>تجهيز سلة الضيافة والتعطير الفندقي (قيد الإنجاز)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => toast.success("تم إرسال تنبيه للمشرف الميداني")}
              className="h-9 px-4 rounded-[8px] bg-[#F1F5EB] text-[#34422A] text-[12px] font-bold hover:bg-[#E5ECE0] transition-colors cursor-pointer"
            >
              مراسلة المشرف
            </button>
            <button
              type="button"
              onClick={async () => {
                const ok = await confirm({
                  title: "تأكيد انتهاء التنظيف الفندقي",
                  message: `هل أنت متأكد من اكتمال أعمال التنظيف والتعقيم للوحدة ${unitNumber} (${propertyName}) وتحويل حالتها إلى «متاحة»؟`,
                  confirmLabel: "نعم، تأكيد الاكتمال",
                  cancelLabel: "إلغاء",
                  variant: "default",
                });
                if (ok) {
                  toast.success("تم تأكيد اكتمال التنظيف وتحويل الوحدة إلى متاحة");
                }
              }}
              className="h-9 px-4 rounded-[8px] bg-[#34422A] text-white text-[12px] font-bold hover:bg-[#283420] transition-colors cursor-pointer"
            >
              تأكيد انتهاء التنظيف فوراً
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 4: Maintenance State [1:17982]
  if (status === "maintenance") {
    return (
      <div className="space-y-4">
        {/* 7-Day Timeline */}
        <UnitOccupancyTimeline />

        {/* Critical Maintenance Card */}
        <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#FEE2E2] shadow-2xs space-y-5 text-start">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#FEE2E2]">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-[10px] bg-[#FEE2E2] text-[#991B1B] flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[17px] font-bold text-[#991B1B]">
                    تنبيه تشغيلي: الوحدة خارج الخدمة مؤقتاً لأعمال الصيانة
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#991B1B]">
                    #MT-1082
                  </span>
                </div>
                <p className="text-[12px] text-[#7C8773] mt-0.5">
                  تم تعليق الإتاحة على جميع المنصات تلقائياً حتى انتهاء أعمال الصيانة
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
              صيانة عاجلة
            </span>
          </div>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#FFF8F8] rounded-[12px] p-4 border border-[#FDE2E2] space-y-3">
              <div className="text-[13px] font-bold text-[#991B1B]">
                تفاصيل البلاغ الفني:
              </div>
              <div className="space-y-2 text-[12px] text-[#4A5440]">
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">نوع العطل / الصيانة:</span>
                  <span className="font-bold text-[#181D17]">فحص دوري للقفل الذكي وبطاريات البوابة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">الفني المسؤول:</span>
                  <span className="font-bold text-[#181D17]">م. خالد الشمري (فريق الدعم الميداني)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">فترة التوقف المقدرة:</span>
                  <span className="font-bold text-[#991B1B]">ساعتان (انتهاء متوقع 05:00 م)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7C8773]">وضع القفل الذكي:</span>
                  <span className="font-bold text-[#DC2626]">وضع الصيانة المشفر (Lockout Mode)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF8F8] rounded-[12px] p-4 border border-[#FDE2E2] space-y-3">
              <div className="text-[13px] font-bold text-[#991B1B]">
                الإجراءات المتخذة:
              </div>
              <ul className="space-y-2 text-[12px] text-[#4A5440]">
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>تم إيقاف توليد الأكواد المؤقتة لمنع أي دخول غير مصرح أثناء عمل الفني.</span>
                </li>
                <li className="flex items-start gap-2">
                  <RefreshCw className="w-4 h-4 text-[#55694D] shrink-0 mt-0.5" />
                  <span>جاري استبدال خلايا الطاقة وإعادة معايرة مستشعر غلق الباب.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2F8A3E] shrink-0 mt-0.5" />
                  <span>سيتم إجراء اختبار فتح وتأكيد الإقفال التلقائي قبل إعادة الوحدة للمنصات.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => toast.info("فتح تفاصيل تذكرة الصيانة #MT-1082")}
              className="h-9 px-4 rounded-[8px] bg-[#F1F5EB] text-[#34422A] text-[12px] font-bold hover:bg-[#E5ECE0] transition-colors cursor-pointer"
            >
              تحديث التذكرة
            </button>
            <button
              type="button"
              onClick={async () => {
                const ok = await confirm({
                  title: "إكمال الصيانة وإعادة الإتاحة",
                  message: `هل أنت متأكد من انتهاء أعمال الصيانة للبلاغ #MT-1082 بالكامل وإعادة الوحدة ${unitNumber} (${propertyName}) إلى الخدمة وجدول الإتاحة؟`,
                  confirmLabel: "نعم، إكمال الصيانة",
                  cancelLabel: "إلغاء",
                  variant: "default",
                });
                if (ok) {
                  toast.success("تم إغلاق البلاغ بنجاح وإعادة الوحدة لحالة متاحة");
                }
              }}
              className="h-9 px-4 rounded-[8px] bg-[#991B1B] text-white text-[12px] font-bold hover:bg-[#7F1D1D] transition-colors cursor-pointer"
            >
              إكمال الصيانة وإعادة الإتاحة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
