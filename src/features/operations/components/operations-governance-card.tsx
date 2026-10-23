import { ShieldCheck } from "lucide-react";

export function OperationsGovernanceCard() {
  return (
    <div className="bg-[#EEF5EE] border border-[#DCE8DC] rounded-3xl p-5 shadow-sm flex items-start gap-4">
      <div className="w-10 h-10 rounded-2xl bg-[#D6E6D6] flex items-center justify-center shrink-0 text-[#1F3D2B]">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#1F3D2B]">
          حوكمة العمليات المركزية
        </h3>
        <p className="text-xs md:text-sm text-[#4B6350] mt-1 leading-relaxed">
          لا تتطلب المنصة إنشاء مهام التنظيف يدوياً، حيث يتم رصد انتهاء الحجوزات وإصدار التذاكر آلياً، كما تربط مهام الصيانة بأكواد الدخول المؤقتة وحالة الأقفال الذكية لضمان سلامة الأصول العقارية.
        </p>
      </div>
    </div>
  );
}
