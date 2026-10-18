"use client";

import Image from "next/image";
import { Map, ExternalLink, MapPin, Navigation } from "lucide-react";
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E3C29] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Map className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#172115]">
            الموقع الجغرافي والوصول
          </h3>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#2C3825] hover:text-[#172115] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#7D8A78] group-hover:text-[#172115] transition-colors" />
          <span>فتح في خرائط Google</span>
        </a>
      </div>

      {/* 2. Map Visual with Custom Pin */}
      <div className="relative rounded-2xl overflow-hidden h-[240px] sm:h-[260px] border border-[#E2E6DC] bg-[#EEF2E6]">
        <Image
          src={locationInfo.mapImage}
          alt="خريطة الموقع الجغرافي"
          fill
          className="object-cover"
        />

        {/* Center / Custom Location Pin */}
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#172115] text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold border border-white/20 select-none animate-fade-in">
            <span className="w-6 h-6 rounded-lg bg-[#2E3C29] flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-[#89DF72]" />
            </span>
            <span>{locationInfo.pinText}</span>
          </div>
        </div>
      </div>

      {/* 3. Location Details Box */}
      <div className="bg-[#F6F8F4] border border-[#EEF2E6] rounded-2xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* National Address (Right in RTL) */}
        <div className="space-y-1">
          <div className="text-[11px] text-[#7D8A78] font-medium">
            العنوان الوطني الموثق
          </div>
          <div className="font-bold text-[#172115] leading-relaxed">
            {locationInfo.nationalAddress}
          </div>
        </div>

        {/* GPS and Travel Distances (Left in RTL) */}
        <div className="space-y-1">
          <div className="text-[11px] text-[#7D8A78] font-medium">
            الإحداثيات الدقيقة (GPS)
          </div>
          <div className="font-bold text-[#172115] flex items-center gap-1.5" dir="ltr">
            <Navigation className="w-3.5 h-3.5 text-[#2E3C29]" />
            <span>{locationInfo.gpsCoordinates}</span>
          </div>
          <div className="text-[11px] text-[#7D8A78] font-medium pt-1">
            {locationInfo.distances}
          </div>
        </div>
      </div>
    </div>
  );
}
