"use client";

import {
  Building2,
  Calendar,
  Compass,
  FileText,
  ShieldCheck,
  Zap,
  ArrowUpDown,
  Car,
  Video,
  Landmark,
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
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#172115]">
            بيانات العقار والمواصفات المعمارية
          </h3>
        </div>

        <button
          type="button"
          onClick={() => toast.info("فتح سجل الأصول الموثق")}
          className="text-xs font-medium text-[#6B7865] hover:text-[#172115] transition-colors cursor-pointer"
        >
          سجل الأصول الموثق
        </button>
      </div>

      {/* 2. 2x2 Specs Grid with exact soft sage tint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Box 1: نوع العقار */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-4 space-y-1.5">
          <div className="text-xs text-[#6B7865] font-medium">نوع العقار</div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-[#172115]">
              {specs.propertyType}
            </span>
            <Building2 className="w-4 h-4 text-[#2E3C29]" />
          </div>
        </div>

        {/* Box 2: المدينة والمنطقة */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-4 space-y-1.5">
          <div className="text-xs text-[#6B7865] font-medium">المدينة والمنطقة</div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-[#172115]">
              {specs.cityAndRegion}
            </span>
            <Landmark className="w-4 h-4 text-[#2E3C29]" />
          </div>
        </div>

        {/* Box 3: الحي السكني */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-4 space-y-1.5">
          <div className="text-xs text-[#6B7865] font-medium">الحي السكني</div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-[#172115]">
              {specs.district}
            </span>
            <Compass className="w-4 h-4 text-[#2E3C29]" />
          </div>
        </div>

        {/* Box 4: سنة البناء وبدء التشغيل */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-4 space-y-1.5">
          <div className="text-xs text-[#6B7865] font-medium">سنة البناء وبدء التشغيل</div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-[#172115]">
              {specs.constructionYear}
            </span>
            <Calendar className="w-4 h-4 text-[#2E3C29]" />
          </div>
        </div>
      </div>

      {/* 3. Detailed Address Box */}
      <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-4 space-y-1.5">
        <div className="text-xs text-[#6B7865] font-medium">
          العنوان التفصيلي ومخطط القطعة
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-[#172115]">
            {specs.detailedAddress}
          </span>
          <Compass className="w-4 h-4 text-[#2E3C29]" />
        </div>
      </div>

      {/* 4. License Banner */}
      <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-[#172115]">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
          <span>
            تصريح الهيئة العامة للعقار:{" "}
            <span className="font-bold text-[#172115]">معتمد برقم {specs.licenseNumber}</span>
          </span>
        </div>
        <div className="text-xs text-[#6B7865] font-medium">
          {specs.licenseExpiry}
        </div>
      </div>

      {/* 5. Architectural Description */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-2 text-sm font-bold text-[#172115]">
          <FileText className="w-4 h-4 text-[#2E3C29]" />
          <span>الوصف المعماري والتشغيلي</span>
        </div>
        <p className="text-xs leading-relaxed text-[#4A5745]">
          {specs.description}
        </p>
      </div>

      {/* 6. Feature Amenities Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {/* Amenity 1: EV Chargers */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-[#172115]">
          <Zap className="w-3.5 h-3.5 text-[#2E3C29]" />
          <span>شواحن EV مخصصة</span>
        </div>

        {/* Amenity 2: Smart Elevators */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-[#172115]">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#2E3C29]" />
          <span>مصاعد أوتيس الذكية</span>
        </div>

        {/* Amenity 3: Shaded Parking */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-[#172115]">
          <Car className="w-3.5 h-3.5 text-[#2E3C29]" />
          <span>مواقف سفلية مظللة</span>
        </div>

        {/* Amenity 4: 24/7 CCTV */}
        <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-[#172115]">
          <Video className="w-3.5 h-3.5 text-[#2E3C29]" />
          <span>مراقبة CCTV 24/7</span>
        </div>
      </div>
    </div>
  );
}
