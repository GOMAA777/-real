"use client";

import { useState } from "react";
import {
  BadgeCheck,
  IdCard,
  MessageSquare,
  Smartphone,
  Mail,
  Flag,
  Calendar,
  Copy,
  Check,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { GuestDetail } from "../types";

interface GuestInfoMetricsCardProps {
  guest: GuestDetail;
}

export function GuestInfoMetricsCard({ guest }: GuestInfoMetricsCardProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast.success("تم نسخ رقم الجوال");
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      toast.success("تم نسخ البريد الإلكتروني");
    }
  };

  const handleWhatsApp = () => {
    toast.info(`فتح محادثة واتساب سريعة مع: ${guest.name} (${guest.phone})`);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#E2E6DC] space-y-6 shadow-2xs">
      {/* 1. Guest Identity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Right: Avatar + Name + Verified Badge + Guest Code */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#3D4C35] text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs select-none">
            {guest.initials}
          </div>

          <div className="space-y-1 text-right">
            <div className="flex items-center flex-wrap gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#172115] tracking-tight">
                {guest.name}
              </h2>
              {guest.verified && (
                <span className="inline-flex items-center gap-1.5 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full select-none">
                  <BadgeCheck className="w-4 h-4 text-[#2E7D32]" />
                  <span>{guest.verificationBadge}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#616E5D] font-medium">
              <IdCard className="w-4 h-4 text-[#7A8875]" />
              <span>معرّف النزيل المنصي: {guest.guestCode}</span>
            </div>
          </div>
        </div>

        {/* Left: Quick WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="bg-[#EFF4EA] hover:bg-[#E5ECE0] text-[#34432E] border border-[#DEE7D7] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-3xs transition-all cursor-pointer select-none active:scale-95 self-start sm:self-auto"
        >
          <MessageSquare className="w-4 h-4 text-[#34432E]" />
          <span>تواصل سريع واتساب</span>
        </button>
      </div>

      {/* 2. Four Info / Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Phone */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 flex flex-col justify-between min-h-[100px] text-right">
          <div className="flex items-center justify-between text-xs text-[#7A8875] font-medium">
            <button
              type="button"
              onClick={() => handleCopy(guest.phone, "phone")}
              className="p-1 hover:text-[#172115] hover:bg-white/70 rounded-md transition-colors cursor-pointer"
              title="نسخ رقم الجوال"
            >
              {copiedPhone ? (
                <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <div className="flex items-center gap-1.5">
              <span>رقم الجوال</span>
              <Smartphone className="w-4 h-4 text-[#7A8875]" />
            </div>
          </div>
          <div className="text-sm sm:text-base font-black text-[#172115] pt-2" dir="ltr">
            {guest.phone}
          </div>
        </div>

        {/* Card 2: Email */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 flex flex-col justify-between min-h-[100px] text-right">
          <div className="flex items-center justify-between text-xs text-[#7A8875] font-medium">
            <button
              type="button"
              onClick={() => handleCopy(guest.email, "email")}
              className="p-1 hover:text-[#172115] hover:bg-white/70 rounded-md transition-colors cursor-pointer"
              title="نسخ البريد الإلكتروني"
            >
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <div className="flex items-center gap-1.5">
              <span>البريد الإلكتروني</span>
              <Mail className="w-4 h-4 text-[#7A8875]" />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-black text-[#172115] pt-2 truncate" dir="ltr">
            {guest.email}
          </div>
        </div>

        {/* Card 3: Nationality */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 flex flex-col justify-between min-h-[100px] text-right">
          <div className="flex items-center justify-end gap-1.5 text-xs text-[#7A8875] font-medium">
            <span>الجنسية</span>
            <Flag className="w-4 h-4 text-[#7A8875]" />
          </div>
          <div className="pt-2">
            <div className="text-sm sm:text-base font-black text-[#172115]">
              {guest.nationality}
            </div>
            <div className="text-[11px] text-[#7A8875] font-medium">
              ({guest.idType})
            </div>
          </div>
        </div>

        {/* Card 4: First Booking Date */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-4 flex flex-col justify-between min-h-[100px] text-right">
          <div className="flex items-center justify-end gap-1.5 text-xs text-[#7A8875] font-medium">
            <span>أول حجز على المنصة</span>
            <Calendar className="w-4 h-4 text-[#7A8875]" />
          </div>
          <div className="text-sm sm:text-base font-black text-[#172115] pt-2">
            {guest.firstBookingDate}
          </div>
        </div>
      </div>

      {/* 3. Six Metric KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Stat 1: Total Bookings */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-3.5 text-center space-y-1">
          <div className="text-xs text-[#7A8875] font-semibold">إجمالي الحجوزات</div>
          <div className="text-xl sm:text-2xl font-black text-[#172115]">
            {guest.totalBookingsCount}
          </div>
        </div>

        {/* Stat 2: Completed Bookings */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-3.5 text-center space-y-1">
          <div className="text-xs text-[#7A8875] font-semibold">حجوزات مكتملة</div>
          <div className="text-xl sm:text-2xl font-black text-[#172115]">
            {guest.completedBookingsCount}
          </div>
        </div>

        {/* Stat 3: Upcoming Bookings */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-3.5 text-center space-y-1">
          <div className="text-xs text-[#7A8875] font-semibold">حجوزات قادمة</div>
          <div className="text-xl sm:text-2xl font-black text-[#172115]">
            {guest.upcomingBookingsCount}
          </div>
        </div>

        {/* Stat 4: Cancelled Bookings (Soft Red Alert Pill) */}
        <div className="bg-[#FEF5F5] border border-[#FADCDD] rounded-2xl p-3.5 text-center space-y-1">
          <div className="text-xs text-[#D9383A] font-bold">حجوزات ملغاة</div>
          <div className="text-xl sm:text-2xl font-black text-[#D9383A]">
            {guest.cancelledBookingsCount}
          </div>
        </div>

        {/* Stat 5: Rating */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-3.5 text-center space-y-1">
          <div className="text-xs text-[#7A8875] font-semibold">تقييم النزيل</div>
          <div className="text-xl sm:text-2xl font-black text-[#172115] flex items-center justify-center gap-1.5">
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{guest.rating}</span>
          </div>
        </div>

        {/* Stat 6: Financial Commitment */}
        <div className="bg-[#F8FAF6] border border-[#DEE7D7] rounded-2xl p-3.5 text-center space-y-1">
          <div className="text-xs text-[#7A8875] font-semibold">الالتزام المالي</div>
          <div className="text-xl sm:text-2xl font-black text-[#172115]">
            {guest.financialCommitmentRate}%
          </div>
        </div>
      </div>
    </div>
  );
}
