"use client";

import { Eye, Image as ImageIcon, Maximize2, Plus } from "lucide-react";
import { toast } from "sonner";

export function UnitGalleryCard() {
  const images = [
    {
      title: "غرفة النوم الرئيسية",
      sub: "سرير مزدوج كبير كينج وإضاءة محيطية",
      badge: "الصورة الرئيسية",
      bgGradient: "from-[#4B5940]/90 to-[#2A3524]/90",
    },
    {
      title: "دورة المياه والتعقيم الفندقي",
      sub: "تجهيزات حديثة ومستلزمات فندقية كاملة",
      badge: "مرافق",
      bgGradient: "from-[#5B6D50]/90 to-[#374431]/90",
    },
    {
      title: "ركن الجلوس والشاشة الذكية",
      sub: "شاشة 55 بوصة بدقة 4K ومكتب عمل تنفيذي",
      badge: "معيشة",
      bgGradient: "from-[#6D7F61]/90 to-[#42503B]/90",
    },
  ];

  return (
    <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-4 text-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-[#34422A]" />
          <h3 className="text-[17px] font-bold text-[#181D17]">
            معرض صور وتجهيزات الوحدة
          </h3>
        </div>

        <button
          type="button"
          onClick={() => toast.info("إضافة صور جديدة للوحدة")}
          className="text-[12px] font-bold text-[#34422A] hover:text-[#181D17] flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>إضافة صور</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => toast.info(`استعراض: ${img.title}`)}
            className="group relative h-44 rounded-[14px] overflow-hidden border border-[#EDF1E7] cursor-pointer shadow-2xs flex flex-col justify-between p-3.5 text-white"
          >
            {/* Background Styled Container with Ambient Depth */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${img.bgGradient} transition-transform duration-300 group-hover:scale-105`}
            />

            {/* Top Bar with Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {img.badge}
              </span>
              <span className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10">
              <div className="text-[14px] font-bold leading-snug drop-shadow-sm">
                {img.title}
              </div>
              <div className="text-[11px] text-white/80 mt-0.5 line-clamp-1">
                {img.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
