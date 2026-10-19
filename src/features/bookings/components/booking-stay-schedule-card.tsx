import { CalendarDays, LogIn, LogOut, Moon } from "lucide-react";
import { BookingDetail } from "../types";

interface BookingStayScheduleCardProps {
  stay: BookingDetail["stay"];
}

export function BookingStayScheduleCard({ stay }: BookingStayScheduleCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        <h2 className="text-base sm:text-xl font-bold text-[#172115]">
          بيانات الإقامة والمواعيد
        </h2>
      </div>

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
    </div>
  );
}
