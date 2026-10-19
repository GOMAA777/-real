"use client";

import Image from "next/image";
import {
  MapPin,
  CheckCircle2,
  Maximize2,
  Camera,
  DoorClosed,
} from "lucide-react";
import { toast } from "sonner";
import { PropertyDetail } from "../types";

interface PropertyHeroCardProps {
  property: PropertyDetail;
}

export function PropertyHeroCard({ property }: PropertyHeroCardProps) {
  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-[#E2E6DC] shadow-2xs" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* 1. Hero Photo Column (RIGHT in RTL - 6 cols) */}
        <div className="lg:col-span-6 order-1">
          <div className="relative rounded-3xl overflow-hidden h-[300px] sm:h-[340px] border border-[#E2E6DC] shadow-2xs group bg-[#EEF2E6]">
            <Image
              src={property.heroImage}
              alt={property.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Top Right on Photo: Booking.com Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#2E3C2B]/85 backdrop-blur-xs text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 select-none">
                Booking . com
              </span>
            </div>

            {/* Bottom Right on Photo: Photography Credit */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="bg-[#2E3C2B]/85 backdrop-blur-xs text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 select-none">
                <Camera className="w-3.5 h-3.5 text-white/90" />
                <span>تصوير معماري حصري · 2024</span>
              </span>
            </div>

            {/* Bottom Left on Photo: Fullscreen Maximize Button */}
            <div className="absolute bottom-4 left-4 z-10">
              <button
                type="button"
                onClick={() => toast.info("عرض الصور بالحجم الكامل")}
                className="w-9 h-9 rounded-xl bg-black/45 backdrop-blur-xs text-white flex items-center justify-center hover:bg-black/65 transition-colors border border-white/15 cursor-pointer"
                aria-label="تكبير الصورة"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Content Column (LEFT in RTL - 6 cols) */}
        <div className="lg:col-span-6 space-y-4 order-2">
          {/* Top Row: Title/Location on Right, Edit Button on Left */}
          <div className="flex items-start justify-between gap-4">
            {/* Title and Location */}
            <div className="space-y-1 text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-[#172115] tracking-tight">
                {property.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7D8A78] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#7D8A78] shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => toast.info("فتح نافذة تعديل بيانات العقار")}
              className="inline-flex items-center gap-2 bg-[#EEF2E6] hover:bg-[#E5EAE0] text-[#172115] rounded-2xl px-4 py-2 text-xs font-bold transition-colors cursor-pointer select-none shrink-0"
            >
              <svg
                className="w-4 h-4 text-[#172115] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="16" y2="6" strokeWidth="2.5" />
                <line x1="4" y1="12" x2="13" y2="12" strokeWidth="2.5" />
                <line x1="4" y1="18" x2="9" y2="18" strokeWidth="2.5" />
                <path d="M14 17l5-5 2 2-5 5h-2v-2z" strokeWidth="2" />
              </svg>
              <span>تعديل</span>
            </button>
          </div>

          {/* 4 Metric KPI Cards with soft sage tint */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {/* 1. إجمالي الوحدات */}
            <div className="bg-[#F2F5ED] rounded-2xl p-3 text-center space-y-0.5">
              <div className="text-xs text-[#7D8A78] font-medium">إجمالي الوحدات</div>
              <div className="text-lg sm:text-xl font-black text-[#172115]">
                {property.totalUnits} وحدة
              </div>
            </div>

            {/* 2. الوحدات المشغولة */}
            <div className="bg-[#F2F5ED] rounded-2xl p-3 text-center space-y-0.5">
              <div className="text-xs text-[#7D8A78] font-medium">الوحدات المشغولة</div>
              <div className="text-lg sm:text-xl font-black text-[#172115]">
                {property.occupiedUnits} وحدات
              </div>
            </div>

            {/* 3. الوحدات المتاحة */}
            <div className="bg-[#F2F5ED] rounded-2xl p-3 text-center space-y-0.5">
              <div className="text-xs text-[#7D8A78] font-medium">الوحدات المتاحة</div>
              <div className="text-lg sm:text-xl font-black text-[#172115]">
                {property.availableUnits} وحدة
              </div>
            </div>

            {/* 4. معدل الإشغال */}
            <div className="bg-[#F2F5ED] rounded-2xl p-3 text-center space-y-0.5">
              <div className="text-xs text-[#7D8A78] font-medium">معدل الإشغال</div>
              <div className="text-lg sm:text-xl font-black text-[#172115]">
                {property.occupancyRate}%
              </div>
            </div>
          </div>

          {/* Connected Smart Locks Box */}
          <div className="bg-[#F2F5ED] rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2E6DC] flex items-center justify-center text-[#2C3825] shrink-0 shadow-2xs">
                <DoorClosed className="w-5 h-5 text-[#2C3825]" />
              </div>
              <div className="min-w-0 text-right">
                <div className="font-black text-xs sm:text-sm text-[#172115] truncate">
                  {property.smartLockStatus.title}
                </div>
                <div className="text-[11px] text-[#7D8A78] truncate mt-0.5 font-medium">
                  {property.smartLockStatus.description}
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-[#E5EEDD] text-[#2E4025] text-xs font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E4025]" />
                <span>{property.smartLockStatus.badgeText}</span>
              </span>
            </div>
          </div>

          {/* Badges / Tags Row */}
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            {/* Status Badge */}
            <span className="inline-flex items-center gap-1.5 bg-[#E5EEDD] text-[#2E4025] text-xs font-bold px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E4025]" />
              <span>{property.statusText}</span>
            </span>

            {/* Category */}
            <span className="bg-[#E8EDE2] text-[#4F5D4A] text-xs font-medium px-3.5 py-1.5 rounded-full">
              {property.category}
            </span>

            {/* Code */}
            <span className="bg-[#E8EDE2] text-[#4F5D4A] text-xs font-medium px-3.5 py-1.5 rounded-full" dir="ltr">
              {property.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
