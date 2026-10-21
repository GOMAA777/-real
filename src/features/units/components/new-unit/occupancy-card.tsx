import { BedDouble, ChevronDown, Minus, Plus, Users } from "lucide-react";
import { SectionCard, InfoPanel } from "./ui";

export function OccupancyCard() {
  return (
    <SectionCard
      number="٥"
      title="السعة القصوى والإشغال"
      required
      trailing={<Users className="w-[18px] h-[18px] text-[#7C8773]" strokeWidth={1.8} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
        {/* الحد الأقصى للضيوف */}
        <div>
          <span className="block text-[12.5px] font-bold text-[#181D17]">
            الحد الأقصى للضيوف<span className="text-[#E5484D] ms-1">*</span>
          </span>
          <div className="mt-2 flex items-center gap-3.5">
            <button
              type="button"
              aria-label="إنقاص"
              className="w-11 h-11 rounded-[10px] bg-[#F1F5EB] text-[#3F4A36] flex items-center justify-center transition-colors cursor-pointer hover:bg-[#E8EEDD]"
            >
              <Minus className="w-[18px] h-[18px]" strokeWidth={1.9} />
            </button>
            <span className="text-[19px] font-bold text-[#181D17]">3 ضيوف</span>
            <button
              type="button"
              aria-label="زيادة"
              className="w-11 h-11 rounded-[10px] bg-[#F1F5EB] text-[#3F4A36] flex items-center justify-center transition-colors cursor-pointer hover:bg-[#E8EEDD]"
            >
              <Plus className="w-[18px] h-[18px]" strokeWidth={1.9} />
            </button>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            العدد الإجمالي المصرح به في العقود
          </p>
        </div>

        {/* توزيع الأسرّة */}
        <div>
          <span className="block text-[12.5px] font-bold text-[#181D17]">
            توزيع الأسرّة الأساسية
          </span>
          <div className="mt-2 h-11 px-3.5 rounded-[10px] border border-[#EDF1E6] bg-white flex items-center justify-between gap-2">
            <span className="text-[13px] text-[#181D17]">
              1 سرير مزدوج كبير
            </span>
            <ChevronDown
              className="w-4 h-4 shrink-0 text-[#7C8773]"
              strokeWidth={1.8}
            />
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            مطابق لاشتراطات السياحة والسلامة
          </p>
        </div>
      </div>

      <InfoPanel
        className="mt-5"
        title="تجهيز قياسي معتمد"
        icon={<BedDouble className="w-[18px] h-[18px]" strokeWidth={1.7} />}
      >
        تتسع لعائلة صغيرة أو حتى 3 نزلاء بالغين مع مساحة كافية.
      </InfoPanel>
    </SectionCard>
  );
}
