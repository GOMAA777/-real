"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <div className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-6">
      {/* 1. Identity Row (Figma node 1:11041) */}
      <div className="bg-[rgba(241,245,235,0.4)] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Right in RTL: Avatar + Name + Verified Badge + Guest Code */}
        <div className="flex items-center gap-4">
          {/* Avatar (Figma node 1:11063) */}
          <div className="size-[64px] rounded-[16px] bg-[#34422A] text-white text-[30px] font-semibold flex items-center justify-center shrink-0 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] select-none leading-[42px] font-cairo">
            {guest.initials}
          </div>

          <div className="space-y-1 text-right">
            {/* Name + Verified Badge */}
            <div className="flex items-center flex-wrap gap-2">
              <h2 className="text-[20px] font-bold font-cairo text-[#181D17] leading-[30px]">
                {guest.name}
              </h2>
              {guest.verified && (
                <div className="bg-[#D8E8CB] text-[#121F0D] text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 select-none">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#121F0D]" />
                  <span>{guest.verificationBadge}</span>
                </div>
              )}
            </div>

            {/* Platform ID */}
            <div className="flex items-center gap-1 text-[13px] text-[#75786F]">
              <IdCard className="w-3.5 h-3.5 text-[#75786F] shrink-0" />
              <span>معرّف النزيل المنصي:</span>
              <span className="text-[#181D17] font-bold font-mono">{guest.guestCode}</span>
            </div>
          </div>
        </div>

        {/* Left in RTL: Quick WhatsApp CTA (Figma node 1:11042) */}
        <Link
          href={`/dashboard/bookings/${guest.bookings?.[0]?.bookingCode || "BK-10482"}/whatsapp`}
          className="bg-[#F1F5EB] hover:bg-[#E5EBDD] text-[#34422A] h-[40px] px-4 rounded-[12px] text-[12px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-98 self-start sm:self-auto"
        >
          <MessageSquare className="w-4 h-4 text-[#34422A]" />
          <span>تواصل سريع واتساب</span>
        </Link>
      </div>

      {/* 2. Detailed Meta Information Matrix (Figma node 1:11066) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Phone (Figma node 1:11099) */}
        <div className="bg-[#F1F5EB] rounded-[12px] h-[96px] p-4 flex flex-col justify-between text-right">
          <div className="flex items-center justify-between text-[11px] text-[#75786F] font-medium">
            <button
              type="button"
              onClick={() => handleCopy(guest.phone, "phone")}
              className="p-1 hover:text-[#181D17] hover:bg-white/60 rounded-md transition-colors cursor-pointer"
              title="نسخ رقم الجوال"
            >
              {copiedPhone ? (
                <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#75786F]" />
              )}
            </button>
            <div className="flex items-center gap-1">
              <span>رقم الجوال</span>
              <Smartphone className="w-3.5 h-3.5 text-[#75786F]" />
            </div>
          </div>
          <div className="text-[14px] font-bold font-mono text-[#181D17] text-right" dir="ltr">
            {guest.phone}
          </div>
        </div>

        {/* Card 2: Email (Figma node 1:11086) */}
        <div className="bg-[#F1F5EB] rounded-[12px] h-[96px] p-4 flex flex-col justify-between text-right">
          <div className="flex items-center justify-between text-[11px] text-[#75786F] font-medium">
            <button
              type="button"
              onClick={() => handleCopy(guest.email, "email")}
              className="p-1 hover:text-[#181D17] hover:bg-white/60 rounded-md transition-colors cursor-pointer"
              title="نسخ البريد الإلكتروني"
            >
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#75786F]" />
              )}
            </button>
            <div className="flex items-center gap-1">
              <span>البريد الإلكتروني</span>
              <Mail className="w-3.5 h-3.5 text-[#75786F]" />
            </div>
          </div>
          <div className="text-[12px] font-bold font-mono text-[#181D17] truncate text-right" dir="ltr">
            {guest.email}
          </div>
        </div>

        {/* Card 3: Nationality (Figma node 1:11075) */}
        <div className="bg-[#F1F5EB] rounded-[12px] h-[96px] p-4 flex flex-col justify-between text-right">
          <div className="flex items-center justify-end gap-1 text-[11px] text-[#75786F] font-medium">
            <span>الجنسية</span>
            <Flag className="w-3.5 h-3.5 text-[#75786F]" />
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-[11px] text-[#75786F] font-medium">
              ({guest.idType})
            </span>
            <span className="text-[14px] font-semibold text-[#181D17]">
              {guest.nationality}
            </span>
          </div>
        </div>

        {/* Card 4: First Booking Date (Figma node 1:11067) */}
        <div className="bg-[#F1F5EB] rounded-[12px] h-[96px] p-4 flex flex-col justify-between text-right">
          <div className="flex items-center justify-end gap-1 text-[11px] text-[#75786F] font-medium">
            <span>أول حجز على المنصة</span>
            <Calendar className="w-3.5 h-3.5 text-[#75786F]" />
          </div>
          <div className="text-[14px] font-semibold text-[#181D17]">
            {guest.firstBookingDate}
          </div>
        </div>
      </div>

      {/* 3. Quick Status Badges Summary (Figma node 1:11111) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
        {/* Stat 1: Total Bookings (Figma node 1:11145) */}
        <div className="bg-[rgba(229,234,224,0.6)] rounded-[12px] p-2 flex flex-col items-center justify-center text-center gap-0.5">
          <div className="text-[11px] font-medium text-[#75786F] leading-[16px]">
            إجمالي الحجوزات
          </div>
          <div className="text-[18px] font-bold text-[#181D17] leading-[28px]">
            {guest.totalBookingsCount}
          </div>
        </div>

        {/* Stat 2: Completed Bookings (Figma node 1:11139) */}
        <div className="bg-[rgba(216,232,203,0.5)] rounded-[12px] p-2 flex flex-col items-center justify-center text-center gap-0.5">
          <div className="text-[11px] font-medium text-[#3D4B36] leading-[16px]">
            حجوزات مكتملة
          </div>
          <div className="text-[18px] font-bold text-[#34422A] leading-[28px]">
            {guest.completedBookingsCount}
          </div>
        </div>

        {/* Stat 3: Upcoming Bookings (Figma node 1:11133) */}
        <div className="bg-[rgba(216,232,199,0.4)] rounded-[12px] p-2 flex flex-col items-center justify-center text-center gap-0.5">
          <div className="text-[11px] font-medium text-[#3D4B33] leading-[16px]">
            حجوزات قادمة
          </div>
          <div className="text-[18px] font-bold text-[#34422A] leading-[28px]">
            {guest.upcomingBookingsCount}
          </div>
        </div>

        {/* Stat 4: Cancelled Bookings (Figma node 1:11127) */}
        <div className="bg-[rgba(255,218,214,0.4)] rounded-[12px] p-2 flex flex-col items-center justify-center text-center gap-0.5">
          <div className="text-[11px] font-medium text-[#93000A] leading-[16px]">
            حجوزات ملغاة
          </div>
          <div className="text-[18px] font-bold text-[#BA1A1A] leading-[28px]">
            {guest.cancelledBookingsCount}
          </div>
        </div>

        {/* Stat 5: Rating (Figma node 1:11118) */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-2 flex flex-col items-center justify-center text-center gap-0.5">
          <div className="text-[11px] font-medium text-[#75786F] leading-[16px]">
            تقييم النزيل
          </div>
          <div className="text-[18px] font-bold text-[#181D17] leading-[28px] flex items-center justify-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{guest.rating}</span>
          </div>
        </div>

        {/* Stat 6: Financial Commitment (Figma node 1:11112) */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-2 flex flex-col items-center justify-center text-center gap-0.5">
          <div className="text-[11px] font-medium text-[#75786F] leading-[16px]">
            الالتزام المالي
          </div>
          <div className="text-[18px] font-bold text-[#54624C] leading-[28px]">
            {guest.financialCommitmentRate}%
          </div>
        </div>
      </div>
    </div>
  );
}
