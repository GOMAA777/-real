"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Building,
  UserCheck,
  MapPin,
  DoorOpen,
  KeyRound,
  ShieldCheck,
  Eye,
  Plus,
  ArrowRight,
  Home,
  Send,
  ExternalLink,
} from "lucide-react";

interface AddPropertySuccessViewProps {
  propertyName?: string;
  onReset?: () => void;
}

export function AddPropertySuccessView({
  propertyName = "عمارة النخيل 4",
  onReset,
}: AddPropertySuccessViewProps) {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Top Success Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E6DC] shadow-2xs text-center space-y-4">
        {/* Large Success Checkmark Circle */}
        <div className="w-16 h-16 rounded-full bg-[#EAF5EA] text-[#2E7D32] border border-[#C8E6C9] flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-[#172115]">
            تمت إضافة العقار بنجاح
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] max-w-xl mx-auto leading-relaxed">
            تم تسجيل وتفعيل بيانات العقار واعتماده رقمياً، وربطه بمحفظة المالك الاستثمارية في سجلات منصة أبراج
          </p>
        </div>

        {/* Approved ID Pill Badge */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 bg-[#F6F8F4] border border-[#E2E6DC] px-4 py-2 rounded-full text-xs font-bold text-[#172115] shadow-2xs">
            <span># معرّف العقار المعتمد: PR-9014-RYD</span>
            <span className="text-[#CCD5C5]">•</span>
            <span className="text-[#2E7D32] flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              موثق ومطابق لنظام فال العقاري
            </span>
          </span>
        </div>
      </div>

      {/* 2. Middle Summary Card: ملخص السجل العقاري المعتمد */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E6DC] shadow-2xs space-y-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Right in RTL: Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                ملخص السجل العقاري المعتمد
              </h2>
              <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                البيانات الإدارية والمكانية الموثقة في السحابة العقارية
              </p>
            </div>
          </div>

          {/* Left in RTL: Status Badge */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#EAF5EA] text-[#2E7D32] border border-[#C8E6C9] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
              <span>حالة العقار: نشط ومفعل</span>
            </span>
          </div>
        </div>

        {/* 6 Information Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tile 1: اسم العقار والنوع */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5 text-right">
            <div className="flex items-center gap-2 text-xs text-[#7D8A78] font-medium">
              <Building className="w-4 h-4 text-[#7D8A78]" />
              <span>اسم العقار والنوع</span>
            </div>
            <div className="text-base font-bold text-[#172115]">
              {propertyName}
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              عمارة سكنية تجارية متكاملة
            </div>
          </div>

          {/* Tile 2: مالك العقار والترخيص */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5 text-right">
            <div className="flex items-center gap-2 text-xs text-[#7D8A78] font-medium">
              <UserCheck className="w-4 h-4 text-[#7D8A78]" />
              <span>مالك العقار والترخيص</span>
            </div>
            <div className="text-base font-bold text-[#172115] flex items-center gap-1.5">
              <span>محمد بن صالح العتيبي</span>
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              مؤسسة العتيبي العقارية (رخصة فال 1200028491)
            </div>
          </div>

          {/* Tile 3: الموقع الجغرافي والحي */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5 text-right">
            <div className="flex items-center gap-2 text-xs text-[#7D8A78] font-medium">
              <MapPin className="w-4 h-4 text-[#7D8A78]" />
              <span>الموقع الجغرافي والحي</span>
            </div>
            <div className="text-base font-bold text-[#172115]">
              الرياض، حي العليا
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              تقاطع طريق الإمام سعود بن فيصل
            </div>
          </div>

          {/* Tile 4: جاهزية الوحدات */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5 text-right">
            <div className="flex items-center gap-2 text-xs text-[#7D8A78] font-medium">
              <DoorOpen className="w-4 h-4 text-[#7D8A78]" />
              <span>جاهزية الوحدات</span>
            </div>
            <div className="text-base font-bold text-[#172115]">
              جاهز لربط الوحدات
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              إضافة الوحدات الفردية وترقيم الطوابق متاح فوراً
            </div>
          </div>

          {/* Tile 5: نمط التعاقد وإدارة الأصول */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5 text-right">
            <div className="flex items-center gap-2 text-xs text-[#7D8A78] font-medium">
              <KeyRound className="w-4 h-4 text-[#7D8A78]" />
              <span>نمط التعاقد وإدارة الأصول</span>
            </div>
            <div className="text-base font-bold text-[#172115]">
              إدارة مباشرة كاملة
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              إشراف كلي ، تشغيل ومتابعة عقود وصيانة
            </div>
          </div>

          {/* Tile 6: سجل التنفيذ الإداري */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5 text-right">
            <div className="flex items-center gap-2 text-xs text-[#7D8A78] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#7D8A78]" />
              <span>سجل التنفيذ الإداري</span>
            </div>
            <div className="text-base font-bold text-[#172115]">
              محمد أحمد (مدير المنصة)
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              15 سبتمبر 2026 10:42 صباحاً
            </div>
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EEF2E6]">
          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/dashboard/properties/prop-1"
              className="bg-[#34432E] hover:bg-[#253121] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Eye className="w-4 h-4" />
              <span>عرض تفاصيل العقار</span>
            </Link>

            <button
              type="button"
              onClick={onReset}
              className="bg-[#E2E6DC] hover:bg-[#D5DBCF] text-[#2E3C29] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة عقار</span>
            </button>
          </div>

          {/* Left Return Link */}
          <div>
            <Link
              href="/dashboard/properties"
              className="text-xs text-[#7D8A78] hover:text-[#172115] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لقائمة العقارات</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Card: الإجراءات الإدارية المقترحة التالية */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#172115]">
          <span className="text-base">🚩</span>
          <h3>الإجراءات الإدارية المقترحة التالية</h3>
        </div>

        {/* 2 Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action Card 1: إضافة وحدات العقار */}
          <div className="border border-[#E2E6DC] bg-white hover:bg-[#F9FAF7] rounded-2xl p-5 space-y-2 transition-all group">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-[#172115] pt-1">
              إضافة وحدات العقار
            </h4>
            <p className="text-xs text-[#7D8A78] leading-relaxed">
              تحديد أرقام الشقق، المساحات الدقيقة، ملحقات كل وحدة، وبرمجة الأقفال الذكية المرتبطة.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard/properties/prop-1"
                className="text-xs font-bold text-[#2E3C29] group-hover:text-[#172115] flex items-center gap-1 transition-colors"
              >
                <span>الانتقال لإضافة الوحدات</span>
                <span className="text-sm">›</span>
              </Link>
            </div>
          </div>

          {/* Action Card 2: إشعار المالك بالاعتماد */}
          <div className="border border-[#E2E6DC] bg-white rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-[#172115] pt-1">
              إشعار المالك بالاعتماد
            </h4>
            <p className="text-xs text-[#7D8A78] leading-relaxed">
              تم إرسال إشعار فوري آلي للمالك عبر WhatsApp والبريد المعتمد يؤكد استكمال تسجيل العقار.
            </p>
            <div className="pt-2 text-xs font-bold text-[#7D8A78] flex items-center gap-1.5">
              <span>تم الإرسال تلقائياً</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
