import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function DashboardStatusBreakdown() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E0E4D8] shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-sm font-bold text-[#172115]">حالة أصحاب العقارات</h2>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F4F6F0] border border-[#E0E4D8] text-[#34432E]">
            248 إجمالي
          </span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#EAEFE5] my-3">
          <div style={{ width: "86.2%" }} className="bg-[#374732] h-full" title="نشط 86.2%" />
          <div style={{ width: "8.9%" }} className="bg-[#9CA3AF] h-full" title="غير نشط 8.9%" />
          <div style={{ width: "4.9%" }} className="bg-[#F59E0B] h-full" title="بانتظار المراجعة 4.8%" />
        </div>

        {/* 3 Status Item Cards */}
        <div className="space-y-2.5 pt-2">
          {/* Active Status */}
          <div className="p-3 rounded-xl bg-[#F4F6F0] border border-[#E4E8DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#374732]" />
              <span className="text-xs font-bold text-[#172115]">نشط</span>
            </div>
            <div className="text-xs font-extrabold text-[#172115]">
              214 <span className="text-[11px] font-normal text-[#6E7B6A]">(86.2%)</span>
            </div>
          </div>

          {/* Inactive Status */}
          <div className="p-3 rounded-xl bg-[#F8F9F5] border border-[#EBEFE6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" />
              <span className="text-xs font-bold text-[#4B5563]">غير نشط</span>
            </div>
            <div className="text-xs font-bold text-[#4B5563]">
              22 <span className="text-[11px] font-normal text-[#9CA3AF]">(8.9%)</span>
            </div>
          </div>

          {/* Pending Status */}
          <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-xs font-bold text-[#92400E]">بانتظار المراجعة</span>
            </div>
            <div className="text-xs font-bold text-[#92400E]">
              12 <span className="text-[11px] font-normal text-[#B45309]">(4.8%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 mt-4 border-t border-[#F0F2EB] flex items-center justify-between text-[11px] text-[#6E7B6A]">
        <span>متوسط اعتماد الحساب: 24 ساعة</span>
        <Link
          href="/dashboard/owners?status=pending"
          className="font-bold text-[#34432E] hover:underline flex items-center gap-1"
        >
          <span>مراجعة فورية</span>
          <ArrowLeft className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
