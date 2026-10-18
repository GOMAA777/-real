"use client";

import Image from "next/image";
import { Map, ExternalLink, Crosshair } from "lucide-react";
import { PropertyDetail } from "../types";

interface PropertyLocationCardProps {
  locationInfo: PropertyDetail["locationInfo"];
}

export function PropertyLocationCard({
  locationInfo,
}: PropertyLocationCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "24.8143,46.6341"
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
      {/* 1. Header matching target design exactly */}
      <div className="flex items-center justify-between">
        {/* Right in RTL: Icon Squircle in dark green + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#172115]">
            الموقع الجغرافي والوصول
          </h3>
        </div>

        {/* Left in RTL: External Google Maps Link with icon on the left */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#2C3825] hover:text-[#172115] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>فتح في خرائط Google</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#6B7865] group-hover:text-[#172115] transition-colors" />
        </a>
      </div>

      {/* 2. Map Visual matching target design exactly */}
      <div className="relative rounded-2xl overflow-hidden aspect-[696/271] w-full border border-[#E2E6DC] bg-[#EEF2E6] shadow-2xs">
        <Image
          src={locationInfo.mapImage}
          alt="خريطة الموقع الجغرافي - حي الياسمين الرياض"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 696px"
          className="object-cover"
        />
      </div>

      {/* 3. Location Details Box matching target design exactly */}
      <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs">
        {/* Right in RTL: National Address */}
        <div className="space-y-1.5 text-right">
          <div className="text-xs text-[#7D8A78] font-medium">
            العنوان الوطني الموثق
          </div>
          <div className="font-bold text-sm sm:text-base text-[#172115] leading-relaxed">
            طريق أنس بن مالك، حي الياسمين،
            <br />
            الرياض 13326، المملكة العربية
            <br />
            السعودية
          </div>
        </div>

        {/* Left in RTL: Accurate GPS & Travel Distances */}
        <div className="space-y-2 text-right">
          <div className="text-xs text-[#7D8A78] font-medium">
            الإحداثيات الدقيقة (GPS)
          </div>
          <div className="flex items-center gap-2 font-black text-sm sm:text-base text-[#172115]">
            <Crosshair className="w-4 h-4 text-[#2E3C29] shrink-0" />
            <span dir="ltr">24.8143° N, 46.6341° E</span>
          </div>
          <div className="text-xs text-[#7D8A78] font-medium space-y-1 pt-1">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-xs bg-[#7D8A78] shrink-0" />
              <span>يبعد 18 دقيقة عن مطار الملك خالد</span>
            </div>
            <div className="whitespace-nowrap">
              12 دقيقة عن مركز الملك عبد الله المالي KAFD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
