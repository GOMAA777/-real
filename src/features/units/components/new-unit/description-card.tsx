"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionCard } from "./ui";

const QUICK_TAGS = [
  "مطبخ مجهز",
  "إطلالة بانورامية",
  "موقف خاص مظلل",
  "مكتب عمل تنفيذي",
];

export function DescriptionCard() {
  const [description, setDescription] = useState("");

  const addTag = (tag: string) => {
    setDescription((prev) => {
      if (prev.includes(tag)) return prev;
      return prev.trim() ? `${prev.trim()}، ${tag}` : tag;
    });
  };

  return (
    <SectionCard
      number="٨"
      title="وصف وتجهيزات الوحدة"
      trailing={
        <span className="text-[11px] text-[#8A9384] whitespace-nowrap">
          اختياري - يظهر في عقد النزيل والموقع
        </span>
      }
    >
      <span className="block text-[12.5px] font-bold text-[#181D17]">
        الوصف العام والمميزات الخاصة
      </span>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="أدخل وصفًا تفصيليًا للوحدة وتجهيزاتها الأساسية (مثل: إطلالة علوية هادئة، مطبخ متكامل ومجهز بماكينة قهوة، أثاث عصري مخصص، شاشة ذكية 65 بوصة، إنترنت ألياف بصرية فائق السرعة...)"
        className="mt-2.5 w-full h-[195px] rounded-[9px] border border-[#EDF1E6] bg-white px-4 py-3 text-[12px] leading-[20px] text-start text-[#181D17] placeholder:text-[#A3AC9E] focus:outline-none focus:border-[#C9D4BC] transition-colors resize-none"
      />

      <div className="flex flex-wrap items-center gap-2 mt-3.5">
        <span className="text-[11px] text-[#8A9384] me-1">
          إضافة وسم سريع:
        </span>
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => addTag(tag)}
            className="h-7 ps-2 pe-2.5 rounded-full bg-[#F1F5EB] text-[10.5px] text-[#3C4733] flex items-center gap-1 transition-colors cursor-pointer hover:bg-[#E8EEDD]"
          >
            <Plus className="w-3 h-3 text-[#7C8773]" strokeWidth={2} />
            {tag}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
