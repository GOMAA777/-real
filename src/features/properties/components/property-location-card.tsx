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
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        {/* Right in RTL: Icon Squircle in dark green + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#384833] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#172115]">
            الموقع الجغرافي والوصول
          </h3>
        </div>

        {/* Left in RTL: External Google Maps Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#2C3825] hover:text-[#172115] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#6B7865] group-hover:text-[#172115] transition-colors" />
          <span>فتح في خرائط Google</span>
        </a>
      </div>

      {/* 2. Map Visual matching screenshot exactly */}
      <div className="relative rounded-2xl overflow-hidden h-[250px] sm:h-[270px] border border-[#E2E6DC] bg-[#EEF2E6] shadow-2xs">
        <Image
          src={locationInfo.mapImage}
          alt="خريطة الموقع الجغرافي - حي الياسمين الرياض"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 3. Location Details Box matching screenshot exactly */}
      <div className="bg-[#F0F4EB] border border-[#E5EAE0] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Right in RTL: National Address */}
        <div className="space-y-1.5">
          <div className="text-xs text-[#6B7865] font-medium">
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
        <div className="space-y-2">
          <div className="text-xs text-[#6B7865] font-medium">
            الإحداثيات الدقيقة (GPS)
          </div>
          <div className="flex items-center gap-2 font-black text-sm sm:text-base text-[#172115]" dir="ltr">
            <span>{locationInfo.gpsCoordinates}</span>
            <Crosshair className="w-4 h-4 text-[#2E3C29] shrink-0" />
          </div>
          <div className="text-xs text-[#6B7865] font-medium flex items-center gap-2 pt-1 flex-wrap">
            <span>يبعد 18 دقيقة عن مطار الملك خالد</span>
            <span className="w-1.5 h-1.5 rounded-xs bg-[#7D8A78]" />
            <span>12 دقيقة عن مركز الملك عبد الله المالي KAFD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
