import { Receipt } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingFinancialSettlementCardProps {
  financial: BookingDetail["financial"];
  isCancelled?: boolean;
}

export function BookingFinancialSettlementCard({
  financial,
  isCancelled = false,
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
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
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

        {/* Payment / Refund Status Badge */}
        {isCancelled ? (
          <span className="inline-flex items-center gap-1.5 bg-[#EFF3EB] border border-[#DFE5D8] text-[#556650] text-xs font-bold px-3 py-1 rounded-full select-none">
            <span>قيد التسوية الآلية عبر القناة</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full select-none">
            <span>{financial.paymentStatus}</span>
          </span>
        )}
      </div>

      {isCancelled ? (
        <>
          {/* Cancelled Settlement Box */}
          <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-[#7A8875] font-medium">
                إجمالي الحجز الأصلي (مدفوع مسبقاً)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#172115] tracking-tight">
                2,450.00 <span className="text-base font-bold text-[#7A8875]">ر.س</span>
              </div>
            </div>

            {/* Refund Status Subcard */}
            <div className="bg-white rounded-xl p-3 sm:px-4 border border-[#E2E6DC] space-y-1 text-right shadow-3xs">
              <div className="text-[11px] text-[#7A8875] font-medium">حالة الاسترداد</div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706]">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span>جاري تسوية الاسترداد عبر Whatsapp</span>
              </div>
              <div className="text-[11px] text-[#7A8875]">
                المدة المتوقعة: 3-5 أيام عمل لحساب العميل البنكي
              </div>
            </div>
          </div>

          {/* Pricing Breakdown Rows */}
          <div className="space-y-3 pt-1 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-[#172115]">
              <span className="text-[#616E5D] font-medium">
                سعر الإقامة لـ 3 ليالٍ (700 ر.س / ليلة)
              </span>
              <span className="font-bold">2,100.00 ر.س</span>
            </div>

            <div className="flex items-center justify-between text-[#172115]">
              <span className="text-[#616E5D] font-medium">
                رسوم النظافة والتعقيم
              </span>
              <span className="font-bold">150.00 ر.س</span>
            </div>

            <div className="flex items-center justify-between text-[#172115]">
              <span className="text-[#616E5D] font-medium">
                ضريبة القيمة المضافة (15%)
              </span>
              <span className="font-bold">200.00 ر.س</span>
            </div>

            <div className="flex items-center justify-between text-[#D9383A] font-bold">
              <span>رسوم إلغاء مطبقة</span>
              <span>0.00 ر.س (إلغاء مجاني كامل)</span>
            </div>
          </div>

          {/* Refund Amount Highlight Strip */}
          <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-2xl p-4 sm:px-6 flex items-center justify-between text-[#172115] shadow-3xs">
            <span className="text-xs sm:text-sm font-bold text-[#2E7D32]">
              المبلغ المستحق إرجاعه للنزيل
            </span>
            <span className="text-lg sm:text-xl font-black text-[#172115]">
              2,450.00 ر.س
            </span>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
