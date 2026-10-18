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
  DoorClosed,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowLeft,
  ArrowRightLeft,
  Phone,
  Check,
  Menu,
  IdCard,
  Workflow,
  ToggleRight,
  UserSearch,
  BadgeCheck,
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
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC]/80 shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="bg-[#D8E4D0] text-[#3C4A37] text-xs font-bold px-3.5 py-1 rounded-full select-none">
                مطلوب إلزامياً
              </span>

              <div className="flex items-center gap-3">
                <div className="text-end">
                  <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                    مالك العقار
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                    المالك القانوني المقيد في هيئة العقار ووثائق الملكية
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2E8] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                  <IdCard className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Owner Search/Selection Bar */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172115] text-end">
                البحث عن المالك وتحديده
              </label>
              <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-2xs">
                {/* Left: تغيير button */}
                <button
                  type="button"
                  onClick={() => toast.info("البحث عن مالك آخر")}
                  className="bg-[#DDE5D6] hover:bg-[#D2DDD6] text-[#2C3825] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>تغيير</span>
                </button>

                {/* Right: User icon + text */}
                <div className="flex items-center gap-2.5 text-xs text-[#172115] font-semibold px-2">
                  <span>{ownerSearch}</span>
                  <UserSearch className="w-4 h-4 text-[#7D8A78]" />
                </div>
              </div>
            </div>

            {/* Selected Owner Preview Box */}
            <div className="bg-[#F3F6EF] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E5EAE0]">
              {/* View Owner Profile Button on the far left */}
              <Link
                href="/dashboard/owners/1"
                className="bg-white hover:bg-[#FAFBF9] border border-[#E2E6DC] text-[#2C3825] px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0 self-start sm:self-center order-2 sm:order-1"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#7D8A78]" />
                <span>ملف المالك</span>
              </Link>

              {/* Owner Info with Avatar on the far right in RTL */}
              <div className="flex items-center gap-3.5 order-1 sm:order-2">
                <div className="space-y-1 text-end">
                  <div className="flex items-center justify-end gap-2.5">
                    <span className="bg-[#DDE5D7] text-[#34432E] text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                      حساب موثق
                    </span>
                    <h3 className="text-base font-bold text-[#172115]">
                      محمد بن سعود العتيبي
                    </h3>
                  </div>

                  <div className="flex items-center justify-end gap-2 text-xs text-[#7D8A78] flex-wrap font-medium">
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-[#172115]">
                      <span dir="ltr">1200028491</span>
                      <span>:رخصة فال</span>
                      <BadgeCheck className="w-3.5 h-3.5 text-[#7D8A78]" />
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span dir="ltr">+966 55 123 4567</span>
                      <Phone className="w-3.5 h-3.5 text-[#7D8A78]" />
                    </span>
                  </div>

                  <div className="text-xs text-[#7D8A78] font-medium text-end">
                    مؤسسة محمد العتيبي للتطوير العقاري
                  </div>
                </div>

                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#4B5945] text-white font-bold flex items-center justify-center text-lg shadow-2xs">
                    م
                  </div>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-white absolute bottom-0 left-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: بيانات العقار الأساسية */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC]/80 shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center justify-end gap-3">
              <div className="text-end">
                <h2 className="text-base sm:text-lg font-bold text-[#172115]">
                  بيانات العقار الأساسية
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  الاسم التجاري وتصنيف الأصل وموقعه الإداري
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E8] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            {/* Row 1: اسم العقار */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7D8A78] font-medium">
                  كما يظهر في منصات التأجير والعقود
                </span>
                <label className="text-xs font-bold text-[#172115]">
                  اسم العقار <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="text"
                required
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                placeholder="أدخل اسم العقار..."
                className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 px-4 text-xs font-bold text-[#172115] focus:outline-none transition-all shadow-2xs text-end"
              />
            </div>

            {/* Row 2: نوع العقار & المدينة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* المدينة on the left in RTL (order-2 sm:order-1) */}
              <div className="space-y-1.5 order-2 sm:order-1">
                <label className="block text-xs font-bold text-[#172115] text-end">
                  المدينة <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 pr-4 pl-10 text-xs text-[#172115] font-semibold appearance-none focus:outline-none transition-all shadow-2xs cursor-pointer text-end"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="الخبر">الخبر</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7D8A78] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* نوع العقار on the right in RTL (order-1 sm:order-2) */}
              <div className="space-y-1.5 order-1 sm:order-2">
                <label className="block text-xs font-bold text-[#172115] text-end">
                  نوع العقار <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 pr-4 pl-10 text-xs text-[#172115] font-semibold appearance-none focus:outline-none transition-all shadow-2xs cursor-pointer text-end"
                  >
                    <option value="عمارة سكنية تجارية">عمارة سكنية تجارية</option>
                    <option value="مجمع سكني">مجمع سكني</option>
                    <option value="أبراج سكنية">أبراج سكنية</option>
                    <option value="فيلا استثمارية">فيلا استثمارية</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7D8A78] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: الحي & عدد الوحدات التقديري */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* عدد الوحدات التقديري on the left in RTL (order-2 sm:order-1) */}
              <div className="space-y-1.5 order-2 sm:order-1">
                <label className="block text-xs font-bold text-[#172115] text-end">
                  عدد الوحدات التقديري
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(e.target.value)}
                    placeholder="24"
                    className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 pr-4 pl-11 text-xs font-semibold text-[#172115] text-end focus:outline-none transition-all shadow-2xs"
                  />
                  <DoorClosed className="w-4 h-4 text-[#7D8A78] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* الحي on the right in RTL (order-1 sm:order-2) */}
              <div className="space-y-1.5 order-1 sm:order-2">
                <label className="block text-xs font-bold text-[#172115] text-end">
                  الحي <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="أدخل اسم الحي..."
                  className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 px-4 text-xs font-semibold text-[#172115] focus:outline-none transition-all shadow-2xs text-end"
                />
              </div>
            </div>

            {/* Row 4: العنوان التفصيلي والشارع */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172115] text-end">
                العنوان التفصيلي والشارع
              </label>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder="أدخل الشارع والتقاطع والمبنى..."
                className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 px-4 text-xs font-semibold text-[#172115] focus:outline-none transition-all shadow-2xs text-end"
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
            <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toast.info("تم تأكيد النقطة الجغرافية للعقار")}
                className="bg-[#2E3C29] hover:bg-[#232F1F] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                تأكيد النقطة
              </button>
              <div className="flex items-center gap-2 text-xs text-[#172115] font-semibold px-2">
                <span>حي النخيل، الرياض، المملكة العربية السعودية</span>
                <MapPin className="w-4 h-4 text-[#7D8A78]" />
              </div>
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

        {/* Left Column in exact order: 1. بيانات إضافية, 2. الحالة التشغيلية */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: بيانات إضافية */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC]/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-end gap-3">
              <div className="text-end">
                <h3 className="text-base font-bold text-[#172115]">
                  بيانات إضافية
                </h3>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  معلومات تسويقية وتفاصيل تشغيلية
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E8] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                <Menu className="w-5 h-5" />
              </div>
            </div>

            {/* Field: وصف العقار */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7D8A78] font-medium">
                  اختياري
                </span>
                <label className="text-xs font-bold text-[#172115]">
                  وصف العقار
                </label>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أدخل وصف العقار والمواصفات المعمارية..."
                className="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 focus:bg-white focus:border-[#CCD5C5] rounded-2xl p-4 text-xs text-[#172115] leading-relaxed focus:outline-none transition-all shadow-2xs text-end"
              />
            </div>

            {/* Callout: إعداد الوحدات الفردية */}
            <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-end gap-2 text-end">
                <h4 className="text-xs font-bold text-[#172115]">
                  إعداد الوحدات الفردية
                </h4>
                <Workflow className="w-4 h-4 text-[#34432E] shrink-0" />
              </div>
              <p className="text-[11px] text-[#7D8A78] leading-relaxed text-end">
                سيتم إنشاء وترقيم الوحدات الفردية (شقق، أجنحة، مكاتب) ومساحاتها وأسعار عقودها فور الانتهاء من حفظ العقار.
              </p>
            </div>
          </div>

          {/* Card 2: الحالة التشغيلية */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E6DC]/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-end gap-3">
              <div className="text-end">
                <h3 className="text-base font-bold text-[#172115]">
                  الحالة التشغيلية
                </h3>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  تحديد إمكانية التسكين والظهور
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E8] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                <ToggleRight className="w-5 h-5" />
              </div>
            </div>

            {/* Two Radio Cards */}
            <div className="space-y-2.5">
              {/* Option 1: عقار نشط (موصى به) */}
              <div
                onClick={() => setOperationalStatus("active")}
                className={cn(
                  "rounded-2xl p-4 transition-all cursor-pointer select-none border",
                  operationalStatus === "active"
                    ? "bg-[#EEF2E8] border-[#D5DFC8] shadow-2xs"
                    : "bg-[#EEF2E8] border-[#E0E5D8]/70 hover:bg-[#E8EDE2]"
                )}
              >
                <div className="flex items-center justify-end gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                  <span className="font-bold text-xs text-[#172115]">
                    عقار نشط (موصى به)
                  </span>
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      operationalStatus === "active"
                        ? "border-[#34432E] bg-white"
                        : "border-[#7D8A78]/60 bg-white"
                    )}
                  >
                    {operationalStatus === "active" && (
                      <span className="w-2 h-2 rounded-full bg-[#34432E]" />
                    )}
                  </span>
                </div>
                <p className="text-xs text-[#7D8A78] mt-1.5 leading-relaxed text-end">
                  جاهز للإدراج الفوري، قبول العقود، وربط المستأجرين والوحدات بالنظام.
                </p>
              </div>

              {/* Option 2: غير نشط (قيد التجهيز) */}
              <div
                onClick={() => setOperationalStatus("inactive")}
                className={cn(
                  "rounded-2xl p-4 transition-all cursor-pointer select-none border",
                  operationalStatus === "inactive"
                    ? "bg-[#EEF2E8] border-[#D5DFC8] shadow-2xs"
                    : "bg-[#EEF2E8] border-[#E0E5D8]/70 hover:bg-[#E8EDE2]"
                )}
              >
                <div className="flex items-center justify-end gap-2">
                  <span className="font-bold text-xs text-[#172115]">
                    غير نشط (قيد التجهيز)
                  </span>
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      operationalStatus === "inactive"
                        ? "border-[#34432E] bg-white"
                        : "border-[#7D8A78]/60 bg-white"
                    )}
                  >
                    {operationalStatus === "inactive" && (
                      <span className="w-2 h-2 rounded-full bg-[#34432E]" />
                    )}
                  </span>
                </div>
                <p className="text-xs text-[#7D8A78] mt-1.5 leading-relaxed text-end">
                  يُحفظ كمسودة أولية معطلة عن العمليات المالية لحين اكتمال أوراق التراخيص.
                </p>
              </div>
            </div>

            {/* Callout: توثيق سجل العمليات الإدارية (Audit Trail) */}
            <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center justify-end gap-2 text-xs font-bold text-[#172115]">
                <span>توثيق سجل العمليات الإدارية (Audit Trail)</span>
                <Shield className="w-4 h-4 text-[#34432E]" />
              </div>
              <div className="text-xs text-[#7D8A78] leading-relaxed space-y-0.5 text-end">
                <div>المشرف المنفذ: محمد أحمد (مدير المنصة).</div>
                <div>سيتم تسجيل وقت الإضافة والبصمة الرقمية للنظام تلقائياً.</div>
              </div>
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
