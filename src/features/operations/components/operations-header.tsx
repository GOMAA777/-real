"use client";

import Link from "next/link";
import { Download, Plus, History } from "lucide-react";
import { toast } from "sonner";

export function OperationsHeader() {
  const handleExport = () => {
    toast.success("جاري تصدير قائمة العمليات (CSV / Excel)...");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-[#EBEBEB] shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">العمليات</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          متابعة كل عمليات التنظيف والصيانة على مستوى المنصة.
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        <Link
          href="/dashboard/operations/log"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-[#E5E7EB] text-[#374151] hover:bg-gray-50 transition-colors"
        >
          <History className="w-4 h-4 text-[#6B7280]" />
          <span>سجل التشغيل الكامل</span>
        </Link>

        <Link
          href="/dashboard/operations/maintenance/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#1F3D2B] text-white hover:bg-[#183022] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء بلاغ صيانة</span>
        </Link>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[#E5E7EB] text-[#374151] hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4 text-[#6B7280]" />
          <span>تصدير القائمة (CSV / Excel)</span>
        </button>
      </div>
    </div>
  );
}
