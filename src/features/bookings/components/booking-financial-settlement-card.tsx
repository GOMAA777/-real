import { Receipt } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingFinancialSettlementCardProps {
  financial: BookingDetail["financial"];
}

export function BookingFinancialSettlementCard({
  financial,
}: BookingFinancialSettlementCardProps) {
  const formatMoney = (val: number) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val) + " ر.س"
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-xl font-bold text-[#172115]">
            الدفع والتسوية المالية
          </h2>
        </div>

        {/* Payment Status Badge */}
        <span className="inline-flex items-center gap-1.5 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full select-none">
          <span>{financial.paymentStatus}</span>
        </span>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Total (Right in RTL) */}
        <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-right space-y-1.5">
          <div className="text-xs font-semibold text-[#7D8A78]">
            إجمالي قيمة الحجز
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
            {formatMoney(financial.totalAmount)}
          </div>
        </div>

        {/* 2. Collected (Middle in RTL) */}
        <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-right space-y-1.5">
          <div className="text-xs font-semibold text-[#7D8A78]">
            المبلغ المحصل فعلياً
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
            {formatMoney(financial.collectedAmount)}
          </div>
        </div>

        {/* 3. Remaining (Left in RTL) */}
        <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-right space-y-1.5">
          <div className="text-xs font-semibold text-[#7D8A78]">
            المتبقي على النزيل
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
            {formatMoney(financial.remainingAmount)}
          </div>
        </div>
      </div>

      {/* Line Items Breakdown */}
      <div className="space-y-3 pt-2 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-[#172115]">
          <span className="text-[#616E5D] font-medium">
            سعر الإقامة الأساسي ({financial.baseStayNights} ليالٍ ×{" "}
            {financial.baseStayRate.toFixed(2)} ر.س)
          </span>
          <span className="font-bold">
            {formatMoney(financial.baseStayTotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[#172115]">
          <span className="text-[#616E5D] font-medium">
            رسوم خدمات النظافة والتجهيز الفندقي
          </span>
          <span className="font-bold">{formatMoney(financial.cleaningFee)}</span>
        </div>

        <div className="flex items-center justify-between text-[#172115]">
          <span className="text-[#616E5D] font-medium">
            ضريبة القيمة المضافة ({financial.vatRate}% VAT)
          </span>
          <span className="font-bold">{formatMoney(financial.vatAmount)}</span>
        </div>
      </div>

      {/* Payment Channel Strip */}
      <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-3.5 sm:px-5 flex items-center justify-between text-xs">
        <span className="font-bold text-[#172115]">
          {financial.paymentMethod}
        </span>
        <span className="text-[#7D8A78] font-medium">
          طريقة الدفع وقناة التسوية
        </span>
      </div>
    </div>
  );
}
