"use client";

import Link from "next/link";
import {
  Check,
  BadgeCheck,
  CheckCircle,
  FileSignature,
  FileCheck,
  Building2,
  MapPin,
  DoorOpen,
  Home,
  Eye,
  PlusCircle,
  ArrowLeft,
  Flag,
  Send,
  CheckCheck,
  ChevronLeft,
} from "lucide-react";

interface AddPropertySuccessViewProps {
  propertyName?: string;
  onReset?: () => void;
}

export function AddPropertySuccessView({
  propertyName = "عمارة النخيل ٠٤",
  onReset,
}: AddPropertySuccessViewProps) {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Top Success Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E6DC] shadow-2xs text-center space-y-5">
        {/* Success Circular Badge matching image */}
        <div className="relative w-20 h-20 rounded-full bg-[#D4E2CD] flex items-center justify-center mx-auto">
          {/* Inner dark green circle with checkmark */}
          <div className="w-12 h-12 rounded-full bg-[#3D4C38] text-white flex items-center justify-center shadow-xs">
            <Check className="w-6 h-6 text-white stroke-[3]" />
          </div>

          {/* Rosette/Verified Badge on bottom-right edge of circle */}
          <div className="w-6 h-6 rounded-full bg-white border border-[#D5E3CD] shadow-2xs flex items-center justify-center text-[#3D4C38] absolute -bottom-1 -end-1">
            <BadgeCheck className="w-4 h-4 text-[#3D4C38]" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#172115]">
            تمت إضافة العقار بنجاح
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] max-w-xl mx-auto leading-relaxed">
            تم تسجيل وتفعيل بيانات العقار واعتماده رقمياً، وربطه بمحفظة المالك الاستثمارية في سجلات منصة ابراج
          </p>
        </div>

        {/* Approved ID Pill Badge */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-2 bg-[#F0F4EB] px-5 py-2 rounded-full text-xs font-bold text-[#2C3825]">
            <span className="text-[#2C3825] font-black">#</span>
            <span>معرّف العقار المعتمد:</span>
            <span dir="ltr" className="font-black">#PR-9014-RYD</span>
            <span className="text-[#A8B3A0]">•</span>
            <span className="flex items-center gap-1 font-bold">
              <FileSignature className="w-3.5 h-3.5 text-[#2C3825]" />
              موثق ومطابق لنظام فال العقاري
            </span>
          </span>
        </div>
      </div>

      {/* 2. Middle Summary Card: ملخص السجل العقاري المعتمد */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-6">
        {/* Card Header Strip */}
        <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Right in RTL: Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#3D4C38] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#172115]">
                ملخص السجل العقاري المعتمد
              </h2>
              <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                البيانات الإدارية والمكانية الموثقة في السحابة العقارية
              </p>
            </div>
          </div>

          {/* Left in RTL: Status Badge */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#DCEAD4] text-[#2C3825] text-xs font-bold px-4 py-1.5 rounded-full">
              <span>حالة العقار: نشط ومفعل</span>
              <span className="w-2 h-2 rounded-full bg-[#2C3825]" />
            </span>
          </div>
        </div>

        {/* 6 Information Tiles Grid (2 rows x 3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tile 1: اسم العقار والنوع */}
          <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium">
              <span>اسم العقار والنوع</span>
              <Building2 className="w-4 h-4 text-[#4A5D44]" />
            </div>
            <div className="text-lg font-black text-[#172115]">
              عمارة النخيل ٠٤
            </div>
            <div>
              <span className="inline-block bg-[#E7EFE1] text-[#556350] text-xs font-bold px-3 py-1 rounded-md">
                عمارة سكنية تجارية متكاملة
              </span>
            </div>
          </div>

          {/* Tile 2: مالك العقار والترخيص */}
          <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium">
              <span>مالك العقار والترخيص</span>
              <BadgeCheck className="w-4 h-4 text-[#4A5D44]" />
            </div>
            <div className="text-lg font-black text-[#172115] flex items-center gap-1.5">
              <span>محمد بن صالح العتيبي</span>
              <CheckCircle className="w-4 h-4 text-[#4A5D44]" />
            </div>
          </div>

          {/* Tile 3: الموقع الجغرافي والحي */}
          <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium">
              <span>الموقع الجغرافي والحي</span>
              <MapPin className="w-4 h-4 text-[#4A5D44]" />
            </div>
            <div className="text-lg font-black text-[#172115]">
              الرياض، حي العليا
            </div>
            <div className="text-xs text-[#7D8A78] font-medium">
              تقاطع طريق الإمام سعود بن فيصل
            </div>
          </div>

          {/* Tile 4: جاهزية الوحدات */}
          <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium">
              <span>جاهزية الوحدات</span>
              <DoorOpen className="w-4 h-4 text-[#4A5D44]" />
            </div>
            <div className="text-lg font-black text-[#172115]">
              جاهز لربط الوحدات
            </div>
            <div className="text-xs text-[#7D8A78] font-medium">
              إضافة الوحدات الفردية وترقيم الطوابق متاح فوراً
            </div>
          </div>

          {/* Tile 5: نمط التعاقد وإدارة الأصول */}
          <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium">
              <span>نمط التعاقد وإدارة الأصول</span>
              <Home className="w-4 h-4 text-[#4A5D44]" />
            </div>
            <div className="text-lg font-black text-[#172115]">
              إدارة مباشرة كاملة
            </div>
            <div className="text-xs text-[#7D8A78] font-medium">
              إشراف كلي ، تشغيل ومتابعة عقود وصيانة
            </div>
          </div>

          {/* Tile 6: سجل التنفيذ الإداري */}
          <div className="bg-[#F5F8F2] rounded-2xl p-4 sm:p-5 space-y-2 text-right">
            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium">
              <span>سجل التنفيذ الإداري</span>
              <FileSignature className="w-4 h-4 text-[#4A5D44]" />
            </div>
            <div className="text-lg font-black text-[#172115]">
              محمد أحمد (مدير المنصة)
            </div>
            <div className="text-xs text-[#7D8A78] font-medium">
              15 سبتمبر 2026 10:42 صباحاً
            </div>
          </div>
        </div>

        {/* Card Actions Footer matching design exactly */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EEF2E6]">
          {/* Right Action Buttons in RTL */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/dashboard/properties/prop-1"
              className="bg-[#2D3928] hover:bg-[#232D1F] text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Eye className="w-4 h-4" />
              <span>عرض تفاصيل العقار</span>
            </Link>

            <button
              type="button"
              onClick={onReset}
              className="bg-[#DEE7D7] hover:bg-[#D2DDD5] text-[#2C3825] px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة عقار</span>
            </button>
          </div>

          {/* Left Return Link in RTL */}
          <div>
            <Link
              href="/dashboard/properties"
              className="text-xs sm:text-sm text-[#2C3825] hover:text-[#172115] font-bold flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة لقائمة العقارات</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: الإجراءات الإدارية المقترحة التالية */}
      <div className="space-y-4">
        {/* Header with Flag matching image */}
        <div className="flex items-center gap-2 text-[#172115] font-black text-base sm:text-lg">
          <Flag className="w-5 h-5 text-[#2C3825]" />
          <h3>الإجراءات الإدارية المقترحة التالية</h3>
        </div>

        {/* 2 Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action Card 1: إضافة وحدات العقار */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[#172115]">
                  إضافة وحدات العقار
                </h4>
                <div className="w-11 h-11 rounded-2xl bg-[#E2EAD9] text-[#2C3825] flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-[#7D8A78] leading-relaxed">
                تحديد أرقام الشقق، المساحات الدقيقة، ملحقات كل وحدة، وبرمجة الأقفال الذكية المرتبطة.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/dashboard/properties/prop-1"
                className="text-xs font-bold text-[#2C3825] hover:text-[#172115] flex items-center gap-1 transition-colors"
              >
                <span>الانتقال لإضافة الوحدات</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Action Card 2: إشعار المالك بالاعتماد */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-[#172115]">
                  إشعار المالك بالاعتماد
                </h4>
                <div className="w-11 h-11 rounded-2xl bg-[#E2EAD9] text-[#2C3825] flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-[#7D8A78] leading-relaxed">
                تم إرسال إشعار فوري آلي للمالك عبر WhatsApp والبريد المعتمد يؤكد استكمال تسجيل العقار.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-[#7D8A78] flex items-center gap-1.5">
              <CheckCheck className="w-4 h-4 text-[#7D8A78]" />
              <span>تم الإرسال تلقائياً</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
