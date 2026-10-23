import { Building2, ExternalLink, Info } from "lucide-react";
import { SectionCard, InnerPanel, TickIcon, CaptionLine } from "./ui";

export function OwnerCard() {
  return (
    <SectionCard
      number="١"
      title="مالك العقار"
      required
      trailing={
        <button
          type="button"
          className="text-[11.5px] font-semibold text-[#2C3527] transition-colors hover:text-[#181D17] cursor-pointer"
        >
          تغيير المالك
        </button>
      }
    >
      <InnerPanel>
        {/* Owner identity */}
        <div className="flex items-start gap-3">
          {/* The reference uses a "P" glyph inside the owner avatar. */}
          <span className="w-11 h-11 shrink-0 rounded-[11px] bg-[#4B5940] text-white text-[18px] font-bold flex items-center justify-center">
            P
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[18px] leading-[25px] font-bold text-[#181D17]">
                محمد العتيبي
              </span>
              <span className="shrink-0 h-[22px] ps-1.5 pe-2 rounded-full bg-[#E4EFD7] text-[10.5px] font-bold text-[#3F7A2E] flex items-center gap-1">
                <TickIcon className="w-[12px] h-[12px]" />
                <span>مؤهل</span>
              </span>
            </div>
            <p className="text-[11.5px] leading-[17px] text-[#7C8773] mt-1.5">
              سجل تجاري / هوية وطنية: ‎+966 50 123 4567 • OWN-4491
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2C3527] transition-colors hover:text-[#181D17] cursor-pointer"
          >
            <span>الملف</span>
            <ExternalLink className="w-[13px] h-[13px]" strokeWidth={1.9} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-[11.5px] text-[#4A5440]">
            <Building2 className="w-3.5 h-3.5 text-[#4B5940]" strokeWidth={1.8} />
            إجمالي العقارات المسجلة للمالك: 4 عقارات
          </span>
          <span className="text-[11.5px] text-[#6E7A66]">نشط ومعتمد</span>
        </div>
      </InnerPanel>

      <CaptionLine
        className="mt-3"
        icon={<Info className="w-3.5 h-3.5" strokeWidth={1.8} />}
      >
        يتم ترشيح وحصر العقارات المتاحة بناءً على المالك المختار تلقائيًا.
      </CaptionLine>
    </SectionCard>
  );
}
