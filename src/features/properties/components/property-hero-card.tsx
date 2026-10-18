"use client";

import Image from "next/image";
import {
  MapPin,
  CheckCircle2,
  SlidersHorizontal,
  DoorClosed,
  Maximize2,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { PropertyDetail } from "../types";

interface PropertyHeroCardProps {
  property: PropertyDetail;
}

export function PropertyHeroCard({ property }: PropertyHeroCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Content Column (Right in RTL - 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Row: Edit Button */}
          <div>
            <button
              type="button"
              onClick={() => toast.info("فتح نافذة تعديل بيانات العقار")}
              className="inline-flex items-center gap-1.5 bg-[#EEF2E6] hover:bg-[#E5EAE0] text-[#2C3825] border border-[#D5DDCF] rounded-xl px-4 py-2 text-xs font-bold transition-colors cursor-pointer select-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#2C3825]" />
              <span>تعديل</span>
            </button>
          </div>

          {/* Title and Location */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#172115] tracking-tight">
              {property.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#6B7865] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#6B7865] shrink-0" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* 4 Metric KPI Cards with exact soft sage tint */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {/* Total Units */}
            <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-3.5 text-center">
              <div className="text-xs text-[#6B7865] font-medium">إجمالي الوحدات</div>
              <div className="text-xl sm:text-2xl font-black text-[#172115] mt-1">
                {property.totalUnits} وحدة
              </div>
            </div>

            {/* Occupied Units */}
            <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-3.5 text-center">
              <div className="text-xs text-[#6B7865] font-medium">الوحدات المشغولة</div>
              <div className="text-xl sm:text-2xl font-black text-[#172115] mt-1">
                {property.occupiedUnits} وحدات
              </div>
            </div>

            {/* Available Units */}
            <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-3.5 text-center">
              <div className="text-xs text-[#6B7865] font-medium">الوحدات المتاحة</div>
              <div className="text-xl sm:text-2xl font-black text-[#172115] mt-1">
                {property.availableUnits} وحدة
              </div>
            </div>

            {/* Occupancy Rate */}
            <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-3.5 text-center">
              <div className="text-xs text-[#6B7865] font-medium">معدل الإشغال</div>
              <div className="text-xl sm:text-2xl font-black text-[#172115] mt-1">
                {property.occupancyRate}%
              </div>
            </div>
          </div>

          {/* Connected Smart Locks Box */}
          <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#2C3825] shrink-0 shadow-2xs">
                <DoorClosed className="w-5 h-5 text-[#2C3825]" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-[#172115] truncate">
                  {property.smartLockStatus.title}
                </div>
                <div className="text-[11px] text-[#6B7865] truncate mt-0.5">
                  {property.smartLockStatus.description}
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-semibold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>{property.smartLockStatus.badgeText}</span>
              </span>
            </div>
          </div>

          {/* Badges / Tags Row */}
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            {/* Status Badge */}
            <span className="inline-flex items-center gap-1.5 bg-[#EAF5EA] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
              <span>{property.statusText}</span>
            </span>

            {/* Category */}
            <span className="bg-[#EEF2E6] border border-[#DCE3D6] text-[#4A5745] text-xs font-semibold px-3.5 py-1.5 rounded-full">
              {property.category}
            </span>

            {/* Code */}
            <span className="bg-[#EEF2E6] border border-[#DCE3D6] text-[#2C3825] text-xs font-bold px-3.5 py-1.5 rounded-full" dir="ltr">
              {property.code}
            </span>
          </div>
        </div>

        {/* Hero Photo Column (Left in RTL - 5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden h-[290px] sm:h-[320px] border border-[#E2E6DC] shadow-2xs group bg-[#EEF2E6]">
            <Image
              src={property.heroImage}
              alt={property.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Top Right Overlay on Photo: Booking.com Badge */}
            <div className="absolute top-3 end-3">
              <span className="bg-[#2A3727]/85 backdrop-blur-xs text-white text-xs font-bold px-3.5 py-1 rounded-full border border-white/20 select-none">
                Booking . com
              </span>
            </div>

            {/* Bottom Right Overlay: Photography Credit */}
            <div className="absolute bottom-3 end-3">
              <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-3.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 select-none">
                <Camera className="w-3.5 h-3.5 text-white/80" />
                <span>تصوير معماري حصري • 2024</span>
              </span>
            </div>

            {/* Bottom Left Overlay: Fullscreen Maximize Button */}
            <div className="absolute bottom-3 start-3">
              <button
                type="button"
                onClick={() => toast.info("عرض الصور بالحجم الكامل")}
                className="w-8 h-8 rounded-xl bg-black/60 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/20 cursor-pointer"
                aria-label="تكبير الصورة"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
