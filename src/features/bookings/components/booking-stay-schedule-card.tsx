import { BedDouble, LogIn, LogOut, Moon } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingStayScheduleCardProps {
  stay: BookingDetail["stay"];
  isCancelled?: boolean;
}

export function BookingStayScheduleCard({
  stay,
  isCancelled = false,
}: BookingStayScheduleCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#E4ECDD] flex items-center justify-center text-[#34432E] shrink-0">
          <BedDouble className="w-5 h-5 stroke-[2.2]" />
        </div>
        <h2 className="text-base sm:text-xl font-bold font-cairo text-[#172115]">
          بيانات الإقامة والمواعيد
        </h2>
      </div>

      {isCancelled ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Check-In Box (Right in RTL) */}
            <div className="bg-[#F1F5EB] rounded-[16px] p-5 text-right space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#454840] text-[13px]">
                  موعد تسجيل الوصول (Check-in)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6]/60 text-[#BA1A1A] text-[11px] font-bold">
                  ملغى
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-[28px] font-bold font-cairo text-[#576550] line-through tracking-tight">
                  {stay.checkInDate || "18 سبتمبر 2026"}
                </div>
                <div className="text-xs text-[#576550] font-medium">
                  03:00 مساءً
                </div>
              </div>
              <div className="bg-white rounded-[10px] p-2.5 px-3 text-center text-xs text-[#454840] font-medium shadow-3xs">
                تم تحرير اليوم من جدول الحجوزات وإتاحته للمنصات
              </div>
            </div>

            {/* 2. Check-Out Box (Left in RTL) */}
            <div className="bg-[#F1F5EB] rounded-[16px] p-5 text-right space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#454840] text-[13px]">
                  موعد تسجيل المغادرة (Check-out)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFDAD6]/60 text-[#BA1A1A] text-[11px] font-bold">
                  ملغى
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-[28px] font-bold font-cairo text-[#576550] line-through tracking-tight">
                  {stay.checkOutDate || "21 سبتمبر 2026"}
                </div>
                <div className="text-xs text-[#576550] font-medium">
                  12:00 ظهراً
                </div>
              </div>
              <div className="bg-white rounded-[10px] p-2.5 px-3 text-center text-xs text-[#454840] font-medium shadow-3xs">
                تم إلغاء مهمة الفحص والتنظيف المجدولة بعد الخروج
              </div>
            </div>
          </div>

          {/* Bottom 3 Columns Strip */}
          <div className="bg-[#F1F5EB] rounded-[16px] p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
            <div className="space-y-1">
              <div className="text-[#75786F] text-[11px] font-medium">مدة الإقامة الأصلية</div>
              <div className="text-lg font-bold font-cairo text-[#181D17]">
                {stay.nightsCount || 3} ليالٍ
              </div>
              <div className="text-[11px] text-[#576550]">محررة بالكامل</div>
            </div>

            <div className="space-y-1">
              <div className="text-[#75786F] text-[11px] font-medium">عدد الضيوف</div>
              <div className="text-lg font-bold font-cairo text-[#181D17]">
                {stay.guestsCount || 2} ضيوف بالغين
              </div>
              <div className="text-[11px] text-[#576550]">بدون مرافقين إضافيين</div>
            </div>

            <div className="space-y-1">
              <div className="text-[#75786F] text-[11px] font-medium">سياسة الإلغاء المطبقة</div>
              <div className="text-lg font-bold font-cairo text-[#2E7D32]">
                مرنة (استرداد كامل)
              </div>
              <div className="text-[11px] text-[#576550]">قبل 48 ساعة من الوصول</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 3 Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Check-In (Right in RTL) */}
            <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-right space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#7D8A78]">
                <LogIn className="w-4 h-4 text-[#3D4C35]" />
                <span>موعد تسجيل الوصول</span>
              </div>
              <div className="text-base sm:text-lg font-black text-[#172115] tracking-tight">
                {stay.checkInDate}
              </div>
              <div className="text-xs text-[#616E5D] font-medium">
                {stay.checkInTime}
              </div>
            </div>

            {/* 2. Check-Out (Middle in RTL) */}
            <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-right space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#7D8A78]">
                <LogOut className="w-4 h-4 text-[#3D4C35]" />
                <span>موعد تسجيل المغادرة</span>
              </div>
              <div className="text-base sm:text-lg font-black text-[#172115] tracking-tight">
                {stay.checkOutDate}
              </div>
              <div className="text-xs text-[#616E5D] font-medium">
                {stay.checkOutTime}
              </div>
            </div>

            {/* 3. Duration & Guests (Left in RTL) */}
            <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-4 sm:p-5 text-right space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#7D8A78]">
                <Moon className="w-4 h-4 text-[#3D4C35]" />
                <span>مدة الحجز وطاقم الإقامة</span>
              </div>
              <div className="text-base sm:text-lg font-black text-[#172115] tracking-tight">
                {stay.nightsCount} ليالٍ • {stay.guestsCount} ضيوف
              </div>
              <div className="text-xs text-[#616E5D] font-medium">
                {stay.guestsDescription}
              </div>
            </div>
          </div>

          {/* Cancellation Policy Footer */}
          <div className="pt-1 text-xs text-[#7D8A78] font-medium text-right">
            {stay.cancellationPolicy}
          </div>
        </>
      )}
    </div>
  );
}
