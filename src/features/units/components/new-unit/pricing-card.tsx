import { BadgeCheck, CreditCard } from "lucide-react";
import { SectionCard, InfoPanel } from "./ui";

export function PricingCard() {
  return (
    <SectionCard
      number="٤"
      title="التسعير والرسوم"
      required
      trailing={
        <CreditCard className="w-[18px] h-[18px] text-[#7C8773]" strokeWidth={1.8} />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
        {/* السعر الأساسي */}
        <div>
          <span className="block text-[12.5px] font-bold text-[#181D17]">
            السعر الأساسي القياسي<span className="text-[#E5484D] ms-1">*</span>
          </span>
          <div className="mt-2 h-11 px-3.5 rounded-[10px] border border-[#EDF1E6] bg-white flex items-center justify-between">
            <span className="text-[16px] font-bold text-[#181D17]">320</span>
            <span className="text-[12.5px] text-[#7C8773]">ر.س</span>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            السعر المعتمد قبل المواسم والخصومات
          </p>
        </div>

        {/* دورة التسعير */}
        <div>
          <span className="block text-[12.5px] font-bold text-[#181D17]">
            دورة التسعير المستهدفة<span className="text-[#E5484D] ms-1">*</span>
          </span>
          <div className="mt-2 h-11 rounded-[10px] bg-[#F1F5EB] p-1 flex items-stretch gap-1">
            <button
              type="button"
              className="flex-1 rounded-[8px] bg-white shadow-[0_1px_2px_rgba(24,29,23,0.08)] text-[12.5px] font-bold text-[#181D17] transition-colors cursor-pointer"
            >
              ليلة واحدة
            </button>
            <button
              type="button"
              className="flex-1 rounded-[8px] text-[12.5px] text-[#7C8773] transition-colors cursor-pointer hover:text-[#3F4A36]"
            >
              للشهر
            </button>
          </div>
        </div>
      </div>

      <InfoPanel
        className="mt-5"
        iconTile={false}
        icon={<BadgeCheck className="w-[22px] h-[22px]" strokeWidth={1.7} />}
      >
        يشمل السعر تلقائيًا نسبة ضريبة القيمة المضافة (15%) ورسوم الخدمة
        والتنظيف المحددة في اشتراك المالك، مع إمكانية تعديل الأسعار عبر محرك
        التسعير الديناميكي.
      </InfoPanel>
    </SectionCard>
  );
}
