import { RefreshCw } from "lucide-react";

export function NewUnitHeaderCard() {
  return (
    <div className="bg-white rounded-[12px] px-5 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_1px_2px_rgba(24,29,23,0.035)]">
      <div className="min-w-0">
        <h1 className="text-[25px] leading-[33px] font-bold text-[#181D17]">
          إضافة وحدة
        </h1>
        <p className="text-[13px] leading-[21px] text-[#7C8773] mt-1">
          تحديد المالك، ربط العقار، ومواءمة سياسات الإقفال الذكي ومواصفات الوحدة
          السكنية.
        </p>
      </div>

      <div className="shrink-0 h-7 px-3 rounded-full bg-[#F1F5EB] flex items-center gap-1.5 text-[11.5px] font-semibold text-[#3F4A36] w-fit">
        <span>الحفظ التلقائي: نشط</span>
        <RefreshCw className="w-[13px] h-[13px]" strokeWidth={2.2} />
      </div>
    </div>
  );
}
