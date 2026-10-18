"use client";

import { useState } from "react";
import { Map, ExternalLink, Crosshair, MapPin, Layers } from "lucide-react";
import { PropertyDetail } from "../types";

interface PropertyLocationCardProps {
  locationInfo: PropertyDetail["locationInfo"];
}

export function PropertyLocationCard({
  locationInfo,
}: PropertyLocationCardProps) {
  const [mapType, setMapType] = useState<"m" | "k">("m"); // 'm' for roadmap, 'k' for satellite
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "24.8143,46.6341"
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
      {/* 1. Header matching target design */}
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

      {/* 2. Live Interactive Map Visual with floating property card */}
      <div className="relative rounded-3xl overflow-hidden aspect-[696/280] w-full border border-[#E2E6DC] bg-[#EEF2E6] shadow-2xs">
        {/* Live Interactive Google Map */}
        <iframe
          src={`https://maps.google.com/maps?q=24.8143,46.6341&hl=ar&z=15&t=${mapType}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0 absolute inset-0"
          title="خريطة الموقع الجغرافي الحية - عمارة النخيل"
        />

        {/* Map Type Toggle (Satellite / Roadmap) */}
        <button
          type="button"
          onClick={() => setMapType((prev) => (prev === "m" ? "k" : "m"))}
          className="absolute top-3 start-3 bg-white/95 backdrop-blur-md border border-[#E2E6DC] text-[#2C3825] hover:bg-[#F6F8F4] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md z-10 transition-colors cursor-pointer select-none"
          title="تبديل وضع الخريطة (قمر صناعي / شوارع)"
        >
          <Layers className="w-3.5 h-3.5 text-[#7D8A78]" />
          <span>{mapType === "m" ? "قمر صناعي" : "خريطة شوارع"}</span>
        </button>

        {/* Floating Property Location Card inside the map with margins/spacing */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[22px] px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-black/5 flex items-center gap-3.5 z-10 max-w-[90%] select-none pointer-events-auto">
          {/* Text Details (Left in RTL, text aligned towards the icon) */}
          <div className="text-right">
            <h4 className="text-xs sm:text-sm md:text-base font-bold text-[#172115] leading-tight">
              عمارة النخيل
            </h4>
            <p className="text-[11px] sm:text-xs text-[#7D8A78] mt-1 font-medium whitespace-nowrap">
              طريق أنس بن مالك، الرياض
            </p>
          </div>

          {/* Green MapPin Squircle Icon on the right in RTL */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>
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
