import { CheckCircle2, ToggleRight } from "lucide-react";
import { SectionCard } from "./ui";

export function OperationalStatusCard() {
  return (
    <SectionCard
      number="٧"
      title="الحالة التشغيلية"
      trailing={
        <ToggleRight className="w-5 h-5 text-[#7C8773]" strokeWidth={1.7} />
      }
    >
      {/* Default handover state */}
      <div className="bg-[#F1F5EB] rounded-[12px] px-4 py-4 text-center">
        <p className="text-[11.5px] text-[#7C8773]">
          الحالة الافتراضية عند التأسيس:
        </p>
        <div className="mt-2.5 h-[42px] rounded-[9px] bg-[#EAF1E8] flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2F8A3E]" />
          <span className="text-[17px] font-bold text-[#2F8A3E]">
            متاحة للحجز فورًا
          </span>
          <CheckCircle2
            className="w-4 h-4 text-[#2F8A3E]"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Platform regulation */}
      <div className="bg-[#F1F5EB] rounded-[12px] p-4 mt-3.5">
        <h3 className="text-[12.5px] font-bold text-[#181D17]">
          تنظيم المنصة:
        </h3>
        <p className="text-[11.5px] leading-[19px] text-[#4A5440] mt-1.5">
          تُدرج الوحدة الجديدة بحالة «متاحة» تلقائيًا عند الحفظ، ولا يمكن تفعيل
          حالات مثل «مشغولة» أو «تحت التنظيف» يدويًا من هنا، حيث تتحول الحالات
          تلقائيًا وفق جدول الحجوزات والملف التشغيلي في التطبيق الميداني.
        </p>
      </div>
    </SectionCard>
  );
}
