import {
  ArrowLeftRight,
  Building,
  DoorClosed,
  ExternalLink,
  Network,
  ShieldCheck,
} from "lucide-react";
import { SectionCard, InnerPanel, CaptionLine } from "./ui";

export function PropertyCard() {
  return (
    <SectionCard
      number="٢"
      title="العقار المستهدف"
      required
      trailing={
        <button
          type="button"
          className="text-[11.5px] font-semibold text-[#2C3527] transition-colors hover:text-[#181D17] cursor-pointer"
        >
          تغيير العقار
        </button>
      }
    >
      <InnerPanel>
        {/* Property identity */}
        <div className="flex items-start gap-3">
          <span className="w-11 h-11 shrink-0 rounded-[11px] bg-[#E3EAD7] flex items-center justify-center">
            <Building
              className="w-[21px] h-[21px] text-[#34422A]"
              strokeWidth={1.9}
            />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[18px] leading-[25px] font-bold text-[#181D17]">
                عمارة النخيل
              </span>
              <span className="shrink-0 h-[22px] px-2 rounded-full bg-[#D8E8CB] text-[10.5px] font-bold text-[#2F5A22] flex items-center">
                PR-1048
              </span>
            </div>
            <p className="text-[11.5px] leading-[17px] text-[#7C8773] mt-1.5">
              الرياض — حي العليا • شارع موسى بن نصير
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2C3527] transition-colors hover:text-[#181D17] cursor-pointer"
          >
            <span>العقار</span>
            <ExternalLink className="w-[13px] h-[13px]" strokeWidth={1.9} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-x-4 gap-y-2 flex-wrap text-[11.5px] text-[#4A5440]">
          <span className="flex items-center gap-1.5">
            <DoorClosed className="w-3.5 h-3.5 text-[#4B5940]" strokeWidth={1.7} />
            12 وحدة قائمة
          </span>
          <span className="flex items-center gap-1.5 text-[#3F8A3F]">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.9} />
            رخصة إشغال نشطة
          </span>
          <span className="flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-[#4B5940]" strokeWidth={1.8} />
            ربط بلدي وشموس متصل
          </span>
        </div>
      </InnerPanel>

      <CaptionLine
        className="mt-3"
        icon={<ArrowLeftRight className="w-3.5 h-3.5" strokeWidth={1.8} />}
      >
        تتبع الوحدة كود المجمع الإلكتروني وبوابة الدخول المركزية لهذا العقار.
      </CaptionLine>
    </SectionCard>
  );
}
