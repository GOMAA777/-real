import { CalendarDays, LogIn, LogOut, Moon } from "lucide-react";
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
        <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        <h2 className="text-base sm:text-xl font-bold text-[#172115]">
          بيانات الإقامة والمواعيد
        </h2>
      </div>

      {isCancelled ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Check-In Box */}
            <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 sm:p-5 text-right space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#7D8A78]">
                  موعد تسجيل الوصول (Check-in)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E8] text-[#D9383A] text-[11px] font-bold">
                  ملغى
                </span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
                  {stay.checkInDate}
                </div>
                <div className="text-xs text-[#7A8875] font-medium pt-0.5">
                  03:00 مساءً
                </div>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center text-xs text-[#6F7E6B] font-medium border border-[#E2E6DC]">
                تم تحرير اليوم من جدول الحجوزات وإتاحته للمنصات
              </div>
            </div>

            {/* 2. Check-Out Box */}
            <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 sm:p-5 text-right space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#7D8A78]">
                  موعد تسجيل المغادرة (Check-out)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E8] text-[#D9383A] text-[11px] font-bold">
                  ملغى
                </span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
                  {stay.checkOutDate}
                </div>
                <div className="text-xs text-[#7A8875] font-medium pt-0.5">
                  12:00 ظهراً
                </div>
              </div>
              <div className="bg-white rounded-xl p-2.5 text-center text-xs text-[#6F7E6B] font-medium border border-[#E2E6DC]">
                تم إلغاء مهمة الفحص والتنظيف المجدولة بعد الخروج
              </div>
            </div>
          </div>

          {/* Bottom 3 Columns Strip */}
          <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-right">
            <div>
              <div className="text-[#7A8875] text-[11px]">مدة الإقامة الأصلية</div>
              <div className="text-sm font-black text-[#172115]">
                {stay.nightsCount} ليال
              </div>
              <div className="text-[11px] text-[#6F7E6B]">محررة بالكامل</div>
            </div>

            <div>
              <div className="text-[#7A8875] text-[11px]">عدد الضيوف</div>
              <div className="text-sm font-black text-[#172115]">
                {stay.guestsCount} ضيوف بالغين
              </div>
              <div className="text-[11px] text-[#6F7E6B]">بدون مرافقين إضافيين</div>
            </div>

            <div>
              <div className="text-[#7A8875] text-[11px]">سياسة الإلغاء المطبقة</div>
              <div className="text-sm font-black text-[#2E7D32]">
                مرنة (استرداد كامل)
              </div>
              <div className="text-[11px] text-[#6F7E6B]">قبل 48 ساعة من الوصول</div>
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
