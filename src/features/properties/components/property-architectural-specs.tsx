"use client";

import {
  FileText,
  Calendar,
  ShieldCheck,
  Zap,
  Car,
  Video,
  Building,
  Home,
  MapPin,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { PropertyDetail } from "../types";

interface PropertyArchitecturalSpecsProps {
  specs: PropertyDetail["specs"];
}

export function PropertyArchitecturalSpecs({
  specs,
}: PropertyArchitecturalSpecsProps) {
  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4" dir="rtl">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#172115]">
            بيانات العقار والمواصفات المعمارية
          </h3>
        </div>

        <button
          type="button"
          onClick={() => toast.info("فتح سجل الأصول الموثق")}
          className="text-xs font-medium text-[#7D8A78] hover:text-[#172115] transition-colors cursor-pointer select-none"
        >
          سجل الأصول الموثق
        </button>
      </div>

      {/* 2. 2x2 Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Box 1: نوع العقار */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 space-y-1">
          <div className="text-xs text-[#7D8A78] font-medium text-right">نوع العقار</div>
          <div className="flex items-center justify-between">
            <span className="font-black text-xs sm:text-sm text-[#172115]">
              {specs.propertyType}
            </span>
            <Building className="w-4 h-4 text-[#172115] shrink-0" />
          </div>
        </div>

        {/* Box 2: المدينة والمنطقة */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 space-y-1">
          <div className="text-xs text-[#7D8A78] font-medium text-right">المدينة والمنطقة</div>
          <div className="flex items-center justify-between">
            <span className="font-black text-xs sm:text-sm text-[#172115]">
              {specs.cityAndRegion}
            </span>
            <Building className="w-4 h-4 text-[#172115] shrink-0" />
          </div>
        </div>

        {/* Box 3: الحي السكني */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 space-y-1">
          <div className="text-xs text-[#7D8A78] font-medium text-right">الحي السكني</div>
          <div className="flex items-center justify-between">
            <span className="font-black text-xs sm:text-sm text-[#172115]">
              {specs.district}
            </span>
            <Home className="w-4 h-4 text-[#172115] shrink-0" />
          </div>
        </div>

        {/* Box 4: سنة البناء وبدء التشغيل */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 space-y-1">
          <div className="text-xs text-[#7D8A78] font-medium text-right">سنة البناء وبدء التشغيل</div>
          <div className="flex items-center justify-between">
            <span className="font-black text-xs sm:text-sm text-[#172115]">
              {specs.constructionYear}
            </span>
            <Calendar className="w-4 h-4 text-[#172115] shrink-0" />
          </div>
        </div>
      </div>

      {/* 3. Detailed Address Box */}
      <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 space-y-1">
        <div className="text-xs text-[#7D8A78] font-medium text-right">
          العنوان التفصيلي ومخطط القطعة
        </div>
        <div className="flex items-center justify-between">
          <span className="font-black text-xs sm:text-sm text-[#172115]">
            {specs.detailedAddress}
          </span>
          <svg className="w-4 h-4 text-[#172115] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
          </svg>
        </div>
      </div>

      {/* 4. License Box */}
      <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5 text-right">
          <div className="text-xs text-[#7D8A78] font-medium">تصريح الهيئة العامة للعقار</div>
          <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-[#172115]">
            <span>معتمد برقم {specs.licenseNumber}</span>
            <ShieldCheck className="w-4 h-4 text-[#172115] shrink-0" />
          </div>
        </div>
        <div className="text-xs text-[#7D8A78] font-medium">
          {specs.licenseExpiry}
        </div>
      </div>

      {/* 5. Architectural Description Box */}
      <div className="bg-[#F2F5ED] rounded-2xl p-4 sm:p-5 space-y-2.5 text-right">
        <div className="flex items-center gap-2 font-black text-sm text-[#172115]">
          <FileText className="w-4 h-4 text-[#172115] shrink-0" />
          <span>الوصف المعماري والتشغيلي</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#4A5745] font-medium">
          {specs.description}
        </p>
      </div>

      {/* 6. Feature Amenities 4 Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
        {/* Amenity 1: EV Chargers */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 flex items-center justify-between gap-2">
          <div className="text-right">
            <div className="text-xs font-bold text-[#172115]">شواحن EV</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">مخصصة</div>
          </div>
          <Zap className="w-4 h-4 text-[#172115] shrink-0" />
        </div>

        {/* Amenity 2: Smart Elevators */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 flex items-center justify-between gap-2">
          <div className="text-right">
            <div className="text-xs font-bold text-[#172115]">مصاعد أوتيس</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">الذكية</div>
          </div>
          <ArrowUpDown className="w-4 h-4 text-[#172115] shrink-0" />
        </div>

        {/* Amenity 3: Shaded Parking */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 flex items-center justify-between gap-2">
          <div className="text-right">
            <div className="text-xs font-bold text-[#172115]">مواقف</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">سفلية مظللة</div>
          </div>
          <span className="font-black text-sm text-[#172115] shrink-0">P</span>
        </div>

        {/* Amenity 4: 24/7 CCTV */}
        <div className="bg-[#F2F5ED] rounded-2xl p-3 flex items-center justify-between gap-2">
          <div className="text-right">
            <div className="text-xs font-bold text-[#172115]">مراقبة CCTV</div>
            <div className="text-[11px] text-[#7D8A78] font-medium">24/7</div>
          </div>
          <Video className="w-4 h-4 text-[#172115] shrink-0" />
        </div>
      </div>
    </div>
  );
}
