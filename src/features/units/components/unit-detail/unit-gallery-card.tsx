"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

export function UnitGalleryCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      title: "غرفة النوم الرئيسية والمجلس",
      src: "/images/units/bedroom.png",
      alt: "غرفة النوم الرئيسية والمجلس",
    },
    {
      title: "المطبخ المفتوح وركن الطعام",
      src: "/images/units/kitchen.png",
      alt: "المطبخ المفتوح وركن الطعام",
    },
    {
      title: "دورة المياه والتجهيزات الفندقية",
      src: "/images/units/bathroom.png",
      alt: "دورة المياه والتجهيزات الفندقية",
    },
  ];

  return (
    <>
      <div
        className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-4"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5EB]/60">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
                معرض صور الوحدة
              </h2>
              <span className="bg-[#E5EAE0] rounded-full px-2 py-0.5 font-medium text-[#75786F] text-[11px] leading-[16px]">
                3 صور مسجلة
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedImage(images[0].src)}
            className="font-bold text-[#34422A] text-[12px] leading-[18px] hover:underline cursor-pointer select-none"
          >
            عرض جميع الصور
          </button>
        </div>

        {/* 3-Image Photographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img.src)}
              className="group relative h-[135px] rounded-[12px] overflow-hidden shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-[#E5EAE0] cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-transparent to-transparent flex items-end p-3">
                <span className="font-semibold text-white text-[11px] leading-[16px] text-right">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt=""
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
