interface OwnerTransferableBalanceProps {
  amount?: string;
  cycle?: string;
  nextTransferDate?: string;
  bankName?: string;
}

export function OwnerTransferableBalance({
  amount = "32,150",
  cycle = "دورة أسبوعية",
  nextTransferDate = "22 سبتمبر 2026",
  bankName = "مصرف الراجحي",
}: OwnerTransferableBalanceProps) {
  return (
    <div className="bg-[#F1F5EB] rounded-3xl p-6 border border-[#E0E5D9]/60 shadow-2xs space-y-3">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#7D8A78] font-medium">الرصيد القابل للتحويل</span>
        <span className="text-xs font-bold text-[#172115]">{cycle}</span>
      </div>

      {/* Main Amount */}
      <div className="flex items-baseline justify-between pt-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-[#172115]">{amount}</span>
          <span className="text-xs font-bold text-[#7D8A78]">ر.س</span>
        </div>
      </div>

      {/* Details Description */}
      <p className="text-xs text-[#7D8A78] leading-relaxed">
        التحويل التلقائي القادم مجدول في تاريخ <span className="font-bold text-[#172115]">{nextTransferDate}</span> إلى الحساب البنكي المعتمد ({bankName}).
      </p>
    </div>
  );
}
