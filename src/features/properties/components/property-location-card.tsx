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
    <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4" dir="rtl">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        {/* Right: Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Map className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#172115]">
            الموقع الجغرافي والوصول
          </h3>
        </div>

        {/* Left: Google Maps External Link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#172115] hover:text-[#34432E] flex items-center gap-1.5 transition-colors cursor-pointer select-none"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#172115]" />
          <span>فتح في خرائط Google</span>
        </a>
      </div>

      {/* 2. Map Visual Container */}
      <div className="relative rounded-3xl overflow-hidden aspect-[2/1] sm:aspect-[696/280] w-full border border-[#E2E6DC] bg-[#EEF2E6] shadow-2xs">
        {/* Interactive Google Maps embed */}
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

        {/* Map Type Switcher */}
        <button
          type="button"
          onClick={() => setMapType((prev) => (prev === "m" ? "k" : "m"))}
          className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-[#E2E6DC] text-[#172115] hover:bg-[#F6F8F4] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md z-10 transition-colors cursor-pointer select-none"
          title="تبديل وضع الخريطة"
        >
          <Layers className="w-3.5 h-3.5 text-[#7D8A78]" />
          <span>{mapType === "m" ? "قمر صناعي" : "خريطة شوارع"}</span>
        </button>

        {/* Floating Property Location Card on Bottom Right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-black/5 flex items-center gap-3.5 z-10 select-none">
          {/* Green MapPin Squircle Icon on the Right */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#34432E] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <MapPin className="w-5 h-5 text-white" />
          </div>

          {/* Text Details */}
          <div className="text-right">
            <h4 className="text-xs sm:text-sm font-black text-[#172115] leading-tight">
              عمارة النخيل
            </h4>
            <p className="text-[11px] sm:text-xs text-[#7D8A78] mt-1 font-medium whitespace-nowrap">
              طريق أنس بن مالك، الرياض
            </p>
          </div>
        </div>
      </div>

      {/* 3. Location Details Box */}
      <div className="bg-[#F2F5ED] rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-right">
        {/* Right in RTL: National Address */}
        <div className="space-y-1.5 text-right">
          <div className="text-xs text-[#7D8A78] font-medium">
            العنوان الوطني الموثق
          </div>
          <div className="font-black text-xs sm:text-sm text-[#172115] leading-relaxed">
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
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-[#172115]">
            <span dir="ltr">24.8143° N, 46.6341° E</span>
            <Crosshair className="w-4 h-4 text-[#172115] shrink-0" />
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#7D8A78] font-medium pt-1">
            <div className="leading-tight">
              <div>يبعد 18 دقيقة عن</div>
              <div>مطار الملك خالد</div>
            </div>
            <span className="text-[#7D8A78] shrink-0">▪</span>
            <div className="leading-tight">
              <div>12 دقيقة عن مركز</div>
              <div>الملك عبد الله المالي</div>
              <div>KAFD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
