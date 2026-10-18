"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  User,
  ShieldCheck,
  Shield,
  MapPin,
  Crosshair,
  DoorOpen,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowLeft,
  ArrowRightLeft,
  Phone,
  Check,
  AlignRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AddPropertyFormProps {
  onSuccess?: () => void;
}

export function AddPropertyForm({ onSuccess }: AddPropertyFormProps) {
  const router = useRouter();

  // Form State
  const [ownerSearch, setOwnerSearch] = useState("محمد العتيبي (مؤسسة محمد العتيبي العقارية)");
  const [propertyName, setPropertyName] = useState("عمارة النخيل السكنية");
  const [propertyType, setPropertyType] = useState("عمارة سكنية تجارية");
  const [city, setCity] = useState("الرياض");
  const [district, setDistrict] = useState("حي النخيل الغربي");
  const [unitsCount, setUnitsCount] = useState("24");
  const [addressDetails, setAddressDetails] = useState(
    "طريق الإمام سعود بن فيصل، بالقرب من تقاطع الملك فهد، مبنى رقم 482"
  );
  const [description, setDescription] = useState(
    "عقار سكني حديث التشطيب مكون من 4 أدوار، مزود بمصعدين حديثين ومواقف سفلية مخصصة لكل وحدة، كاميرات مراقبة وحراسة أمنية متكاملة على مدار الساعة."
  );
  const [operationalStatus, setOperationalStatus] = useState<"active" | "inactive">("active");
  const [mapType, setMapType] = useState<"m" | "k">("m"); // 'm' for roadmap, 'k' for satellite
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم تسجيل وتفعيل بيانات العقار واعتماده بنجاح");
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/properties/new?success=true");
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-36 animate-in fade-in duration-300">
      {/* 1. Page Header matching design */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xs">
        {/* Right side: Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#172115]">
            إضافة عقار جديد
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium leading-relaxed">
            إدراج عقار جديد وتعيينه لمالك مسجل في المنصة وربط التراخيص والبيانات الجغرافية بدقة.
          </p>
        </div>

        {/* Left side: Administrative Certification Badge */}
        <div className="bg-[#F0F4EB] border border-[#E2E6DC] rounded-2xl p-3 sm:px-4 sm:py-2.5 flex items-center gap-3 w-fit">
          <div className="text-right">
            <div className="text-xs font-bold text-[#172115]">
              إجراء إداري معتمد
            </div>
            <div className="text-[11px] text-[#7D8A78] font-medium">
              يرتبط العقار مباشرة بمحفظة المالك المحددة مع إشعار فوري.
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column (Main Form Fields: 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: مالك العقار */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                    مالك العقار
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                    المالك القانوني المقيد في هيئة العقار ووثائق الملكية
                  </p>
                </div>
              </div>

              <span className="bg-[#E2F0D9] text-[#2E7D32] text-xs font-bold px-3.5 py-1 rounded-full">
                مطلوب إلزامياً
              </span>
            </div>

            {/* Owner Search/Selection Bar */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172115]">
                البحث عن المالك وتحديده
              </label>
              <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5 text-xs text-[#172115] font-bold px-1">
                  <User className="w-4 h-4 text-[#7D8A78]" />
                  <span>{ownerSearch}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("البحث عن مالك آخر")}
                  className="bg-[#E2EAD9] hover:bg-[#D4E0CA] text-[#2C3825] px-3.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>تغيير</span>
                </button>
              </div>
            </div>

            {/* Selected Owner Preview Box */}
            <div className="bg-[#F8FAF6] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#EEF2E6]">
              {/* Owner Info with Avatar */}
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#3D4C38] text-white font-bold flex items-center justify-center text-lg shadow-2xs">
                    م
                  </div>
                  <span className="w-3 h-3 rounded-full bg-[#10B981] border-2 border-white absolute bottom-0 end-0" />
                </div>
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#172115]">
                      محمد بن سعود العتيبي
                    </h3>
                    <span className="bg-[#E2EAD9] text-[#2C3825] text-[10px] font-bold px-2 py-0.5 rounded-md">
                      حساب موثق
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#7D8A78] flex-wrap font-medium">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#7D8A78]" />
                      <span dir="ltr">+966 55 123 4567</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#2E7D32] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>رخصة فال: 1200028491</span>
                    </span>
                    <span>•</span>
                    <span>مؤسسة محمد العتيبي للتطوير العقاري</span>
                  </div>
                </div>
              </div>

              {/* View Owner Profile Button */}
              <Link
                href="/dashboard/owners/1"
                className="bg-white hover:bg-[#F4F6F0] border border-[#E2E6DC] text-[#2C3825] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs shrink-0 self-start sm:self-center"
              >
                <span>ملف المالك</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7D8A78]" />
              </Link>
            </div>
          </div>

          {/* Card 2: بيانات العقار الأساسية */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                  بيانات العقار الأساسية
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  الاسم التجاري وتصنيف الأصل وموقعه الإداري
                </p>
              </div>
            </div>

            {/* Row 1: اسم العقار */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#172115]">
                  اسم العقار <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-[#7D8A78] font-medium">
                  كما يظهر في منصات التأجير والعقود
                </span>
              </div>
              <input
                type="text"
                required
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="أدخل اسم العقار..."
                className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-xl h-11 px-4 text-xs font-bold text-[#172115] focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* Row 2: نوع العقار & المدينة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172115]">
                  نوع العقار <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-xl h-11 px-4 pe-9 text-xs text-[#172115] font-semibold appearance-none focus:outline-none transition-all shadow-2xs cursor-pointer"
                  >
                    <option value="عمارة سكنية تجارية">عمارة سكنية تجارية</option>
                    <option value="مجمع سكني">مجمع سكني</option>
                    <option value="أبراج سكنية">أبراج سكنية</option>
                    <option value="فيلا استثمارية">فيلا استثمارية</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7D8A78] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172115]">
                  المدينة <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-xl h-11 px-4 pe-9 text-xs text-[#172115] font-semibold appearance-none focus:outline-none transition-all shadow-2xs cursor-pointer"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="الخبر">الخبر</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7D8A78] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: الحي & عدد الوحدات التقديري */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172115]">
                  الحي <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="أدخل اسم الحي..."
                  className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-xl h-11 px-4 text-xs font-semibold text-[#172115] focus:outline-none transition-all shadow-2xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172115]">
                  عدد الوحدات التقديري
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(e.target.value)}
                    placeholder="24"
                    className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-xl h-11 ps-10 pe-4 text-xs font-semibold text-[#172115] focus:outline-none transition-all shadow-2xs"
                  />
                  <DoorOpen className="w-4 h-4 text-[#7D8A78] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 4: العنوان التفصيلي والشارع */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172115]">
                العنوان التفصيلي والشارع
              </label>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder="أدخل الشارع والتقاطع والمبنى..."
                className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-xl h-11 px-4 text-xs font-semibold text-[#172115] focus:outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Card 3: الموقع الجغرافي وإحداثيات الخريطة */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                    الموقع الجغرافي وإحداثيات الخريطة
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                    تثبيت الموقع لربطه بالخدمات اللوجستية وعقود منصة إيجار
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.success("تم تحديث الإحداثيات عبر نظام GPS بدقة")}
                className="bg-[#F0F4EB] hover:bg-[#E2E6DC] text-[#2E3C29] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-[#E2E6DC] transition-colors cursor-pointer"
              >
                <Crosshair className="w-3.5 h-3.5 text-[#2E3C29]" />
                <span>تحديد الموقع عبر GPS</span>
              </button>
            </div>

            {/* Address input bar */}
            <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#172115] font-semibold px-2">
                <MapPin className="w-4 h-4 text-[#7D8A78]" />
                <span>حي النخيل، الرياض، المملكة العربية السعودية</span>
              </div>
              <button
                type="button"
                onClick={() => toast.info("تم تأكيد النقطة الجغرافية للعقار")}
                className="bg-[#2E3C29] hover:bg-[#232F1F] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                تأكيد النقطة
              </button>
            </div>

            {/* Visual Map matching design with Center Pin and Bottom Floating Info Bar */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E2E6DC] bg-[#EEF2E6] shadow-2xs w-full aspect-[696/340]">
              {/* Live Interactive Google Map */}
              <iframe
                src={`https://maps.google.com/maps?q=24.7136,46.6753&hl=ar&z=15&t=${mapType}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 absolute inset-0"
                title="خريطة الموقع الجغرافي الحية للعقار"
              />

              {/* Center Pin & Property Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
                <div className="w-12 h-12 rounded-full bg-[#34432E] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="bg-[#2E3C29] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20 mt-1.5">
                  <span>عمارة النخيل السكنية (محدد بدقة)</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                </div>
              </div>

              {/* Floating Bottom Bar inside the map matching user screenshot */}
              <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 border border-black/5 z-20">
                {/* Coordinates & Zone Info */}
                <div className="flex items-center gap-2 text-xs flex-wrap text-right">
                  <Crosshair className="w-4 h-4 text-[#2E3C29] shrink-0" />
                  <span className="font-bold text-[#172115]">الإحداثيات:</span>
                  <span dir="ltr" className="font-mono font-bold text-[#172115]">
                    24.7136° N, 46.6753° E
                  </span>
                  <span className="text-[#CCD5C5] mx-1">|</span>
                  <span className="text-[#7D8A78] font-medium">
                    المنطقة الوسطى • نطاق أمانة منطقة الرياض
                  </span>
                </div>

                {/* Satellite & External Google Maps Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setMapType((prev) => (prev === "m" ? "k" : "m"))}
                    className="border border-[#E2E6DC] bg-white hover:bg-[#F6F8F4] text-[#2C3825] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="تبديل وضع الخريطة (قمر صناعي / شوارع)"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#7D8A78]" />
                    <span>{mapType === "m" ? "قمر صناعي" : "خريطة شوارع"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/search/?api=1&query=24.7136,46.6753",
                        "_blank"
                      )
                    }
                    className="bg-[#2E3C29] hover:bg-[#232F1F] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>خرائط Google</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column in exact order: 1. بيانات إضافية, 2. الحالة التشغيلية, 3. سعة المحفظة */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: بيانات إضافية */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                <AlignRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172115]">
                  بيانات إضافية
                </h3>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  معلومات تسويقية وتفاصيل تشغيلية
                </p>
              </div>
            </div>

            {/* Field: وصف العقار */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#172115]">
                  وصف العقار
                </label>
                <span className="text-xs text-[#7D8A78] font-medium">
                  اختياري
                </span>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أدخل وصف العقار والمواصفات المعمارية..."
                className="w-full bg-[#F8FAF6] border border-[#E2E6DC] focus:border-[#CCD5C5] focus:bg-white rounded-2xl p-3.5 text-xs text-[#2C3825] leading-relaxed focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* Callout: إعداد الوحدات الفردية */}
            <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EEF2E6] text-[#34432E] flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-right">
                <h4 className="text-xs font-bold text-[#172115]">
                  إعداد الوحدات الفردية
                </h4>
                <p className="text-[11px] text-[#7D8A78] leading-relaxed">
                  سيتم إنشاء وترقيم الوحدات الفردية (شقق، أجنحة، مكاتب) ومساحاتها وأسعار عقودها فور الانتهاء من حفظ العقار.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: الحالة التشغيلية */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#172115]">
                  الحالة التشغيلية
                </h3>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تحديد إمكانية التسكين والظهور
                </p>
              </div>
              {/* Visual toggle switch */}
              <button
                type="button"
                onClick={() =>
                  setOperationalStatus((prev) => (prev === "active" ? "inactive" : "active"))
                }
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                  operationalStatus === "active" ? "bg-[#34432E]" : "bg-[#CCD5C5]"
                )}
                aria-label="تغيير الحالة التشغيلية"
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform absolute top-1",
                    operationalStatus === "active" ? "start-6" : "start-1"
                  )}
                />
              </button>
            </div>

            {/* Two Radio Cards */}
            <div className="space-y-2.5">
              {/* Option 1: عقار نشط (موصى به) */}
              <div
                onClick={() => setOperationalStatus("active")}
                className={cn(
                  "rounded-2xl p-3.5 transition-all cursor-pointer select-none border",
                  operationalStatus === "active"
                    ? "bg-[#F0F7ED] border-2 border-[#34432E] shadow-2xs"
                    : "bg-[#F8FAF6] border-[#E2E6DC] hover:bg-[#F0F4EB]"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        operationalStatus === "active"
                          ? "border-[#34432E] bg-[#34432E]"
                          : "border-[#CCD5C5]"
                      )}
                    >
                      {operationalStatus === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="font-bold text-xs text-[#172115]">
                      عقار نشط (موصى به)
                    </span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <p className="text-xs text-[#6B7865] mt-1.5 leading-relaxed ps-6">
                  جاهز للإدراج الفوري، قبول العقود، وربط المستأجرين والوحدات بالنظام.
                </p>
              </div>

              {/* Option 2: غير نشط (قيد التجهيز) */}
              <div
                onClick={() => setOperationalStatus("inactive")}
                className={cn(
                  "rounded-2xl p-3.5 transition-all cursor-pointer select-none border",
                  operationalStatus === "inactive"
                    ? "bg-[#F0F7ED] border-2 border-[#34432E] shadow-2xs"
                    : "bg-[#F8FAF6] border-[#E2E6DC] hover:bg-[#F0F4EB]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      operationalStatus === "inactive"
                        ? "border-[#34432E] bg-[#34432E]"
                        : "border-[#CCD5C5]"
                    )}
                  >
                    {operationalStatus === "inactive" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="font-bold text-xs text-[#172115]">
                    غير نشط (قيد التجهيز)
                  </span>
                </div>
                <p className="text-xs text-[#7D8A78] mt-1.5 leading-relaxed ps-6">
                  يحفظ كمسودة أولية معطلة عن العمليات المالية لحين اكتمال أوراق التراخيص.
                </p>
              </div>
            </div>

            {/* Callout: توثيق سجل العمليات الإدارية (Audit Trail) */}
            <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Shield className="w-4 h-4 text-[#7D8A78]" />
                <span>توثيق سجل العمليات الإدارية (Audit Trail)</span>
              </div>
              <div className="text-xs text-[#7D8A78] leading-relaxed space-y-0.5">
                <div>المشرف المنفذ: محمد أحمد (مدير المنصة).</div>
                <div>سيتم تسجيل وقت الإضافة والبصمة الرقمية للنظام تلقائياً.</div>
              </div>
            </div>
          </div>

          {/* Card 3: سعة المحفظة الحالية للمالك */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-[#172115]">
                6 عقارات
              </span>
              <span className="text-xs text-[#7D8A78] font-medium">
                سعة المحفظة الحالية للمالك
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-[#EEF2E6] rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-[#34432E] rounded-full" />
            </div>

            <div className="flex items-center justify-between text-xs text-[#7D8A78] font-medium pt-1">
              <span>المستخدم: 70% من باقة المحفظة</span>
              <span>باقة أعمال غير محدودة</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Bottom Confirmation & Save Bar (عائم في الصفحة) matching Image 3 */}
      <div className="fixed bottom-0 start-0 end-0 bg-white/95 backdrop-blur-md border-t border-[#E2E6DC] py-4 px-6 sm:px-10 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status message on the right in RTL */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#172115]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span>جميع الحقول الأساسية مكتملة وجاهزة للاعتماد في النظام المركزي.</span>
          </div>

          {/* Action buttons on the left in RTL */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/dashboard/properties"
              className="bg-[#F0F2ED] hover:bg-[#E5E8E1] text-[#2C3825] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
            >
              إلغاء
            </Link>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit()}
              className="bg-[#DEE7D7] hover:bg-[#D2DDD5] text-[#2C3825] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>حفظ ومتابعة لإضافة الوحدات</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2D3928] hover:bg-[#232D1F] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "جاري الحفظ..." : "حفظ العقار"}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
