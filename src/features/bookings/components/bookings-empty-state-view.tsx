"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Plus,
  UserPlus,
  RotateCcw,
  Info,
} from "lucide-react";
import { toast } from "sonner";

interface BookingsEmptyStateViewProps {
  onAddBooking?: () => void;
  onRefresh?: () => void;
}

export function BookingsEmptyStateView({
  onAddBooking,
  onRefresh,
}: BookingsEmptyStateViewProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) {
      onRefresh();
    } else {
      router.refresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("تم تحديث قائمة الحجوزات بنجاح");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-[1536px] w-full mx-auto" dir="rtl">
      {/* 1. Header Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Right side: Title & Description */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
            الحجوزات
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium leading-relaxed">
            إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة.
          </p>
        </div>

        {/* Left side: Add Booking Button */}
        <div className="shrink-0">
          <Link
            href="/dashboard/bookings/new"
            onClick={onAddBooking}
            className="bg-[#384633] hover:bg-[#2E3C29] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة حجز</span>
          </Link>
        </div>
      </section>

      {/* 2. Main Empty State Card */}
      <section className="bg-white rounded-3xl p-8 sm:p-14 lg:p-20 border border-[#E2E6DC] shadow-2xs text-center flex flex-col items-center justify-center space-y-6">
        {/* Calendar Icon Box with Plus Badge on Top Right */}
        <div className="relative mx-auto">
          <div className="w-20 h-20 bg-[#EFF4EA] border border-[#DEE7D7] rounded-3xl flex items-center justify-center text-[#34432E] shadow-2xs">
            <Calendar className="w-9 h-9 text-[#34432E]" strokeWidth={1.75} />
          </div>
          {/* Small Top-Right Dark Green Badge */}
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#2E3C29] text-white flex items-center justify-center border-2 border-white shadow-2xs">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 max-w-lg mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
            لا توجد حجوزات حتى الآن
          </h2>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-medium leading-relaxed">
            لم يتم تسجيل أي حجوزات على المنصة حتى الآن. يمكنك إضافة حجز يدوي مباشر أو مزامنة التقويمات عبر مزودي الخدمة.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          {/* Add Booking Button (Right in RTL) */}
          <Link
            href="/dashboard/bookings/new"
            onClick={onAddBooking}
            className="bg-[#384633] hover:bg-[#2E3C29] text-white text-xs sm:text-sm font-bold rounded-xl px-5 py-2.5 flex items-center gap-2 shadow-xs transition-all cursor-pointer select-none active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة حجز</span>
          </Link>

          {/* Refresh Button (Left in RTL) */}
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-[#F5F7F1] hover:bg-[#EAEFE3] border border-[#DEE7D7] text-[#34432E] text-xs sm:text-sm font-bold rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all cursor-pointer select-none active:scale-[0.98]"
          >
            <RotateCcw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>تحديث الصفحة</span>
          </button>
        </div>

        {/* Bottom Info Banner */}
        <div className="bg-[#EFF4EA]/70 border border-[#DEE7D7]/80 rounded-2xl px-5 py-3.5 flex items-center gap-3 text-xs text-[#556350] max-w-2xl mx-auto mt-6 text-right shadow-2xs">
          <Info className="w-4 h-4 text-[#7D8A78] shrink-0" />
          <p className="leading-relaxed font-normal">
            بمجرد قيام ملاك العقارات بربط منصات الحجز (Booking.com, Airbnb) أو إنشاء حجوزات مباشرة، ستظهر تفاصيل الحجوزات وحالات الأقفال الذكية هنا تلقائياً.
          </p>
        </div>
      </section>
    </div>
  );
}
