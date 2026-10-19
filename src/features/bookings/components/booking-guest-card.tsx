"use client";

import { useState } from "react";
import {
  User,
  BadgeCheck,
  Phone,
  Mail,
  Copy,
  Check,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { BookingDetail } from "../types";

interface BookingGuestCardProps {
  guest: BookingDetail["guest"];
}

export function BookingGuestCard({ guest }: BookingGuestCardProps) {
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
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E6DC] space-y-5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EFF4EA] border border-[#DEE7D7] flex items-center justify-center text-[#34432E] shrink-0">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#172115]">
            ملف الضيف / النزيل
          </h2>
        </div>

        {/* Verified Badge */}
        {guest.verified && (
          <span className="inline-flex items-center gap-1 bg-[#E3EFE1] border border-[#C6DEC2] text-[#2E7D32] text-xs font-semibold px-2.5 py-0.5 rounded-full select-none">
            موثق
          </span>
        )}
      </div>

      {/* Guest Name & Avatar */}
      <div className="flex items-center gap-3.5 pt-1">
        <div className="w-12 h-12 rounded-2xl bg-[#3D4C35] text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs select-none">
          {guest.initials}
        </div>
        <div className="space-y-0.5">
          <div className="text-base font-extrabold text-[#172115]">
            {guest.name}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#7D8A78] font-medium">
            <BadgeCheck className="w-4 h-4 text-[#3D4C35]" />
            <span>{guest.badgeText}</span>
          </div>
        </div>
      </div>

      {/* Contact Boxes */}
      <div className="space-y-2.5">
        {/* Phone */}
        <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleCopy(guest.phone, "phone")}
            className="p-1.5 text-[#7D8A78] hover:text-[#172115] hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
            title="نسخ رقم الجوال"
            aria-label="نسخ رقم الجوال"
          >
            {copiedPhone ? (
              <Check className="w-4 h-4 text-[#2E7D32]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#172115]" dir="ltr">
            <span>{guest.phone}</span>
            <Phone className="w-4 h-4 text-[#7D8A78]" />
          </div>
        </div>

        {/* Email */}
        <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleCopy(guest.email, "email")}
            className="p-1.5 text-[#7D8A78] hover:text-[#172115] hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
            title="نسخ البريد الإلكتروني"
            aria-label="نسخ البريد الإلكتروني"
          >
            {copiedEmail ? (
              <Check className="w-4 h-4 text-[#2E7D32]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#172115] truncate" dir="ltr">
            <span className="truncate">{guest.email}</span>
            <Mail className="w-4 h-4 text-[#7D8A78] shrink-0" />
          </div>
        </div>

        {/* Nationality & Identity Verification */}
        <div className="bg-[#EFF3EA] border border-[#DFE5D8] rounded-2xl p-3 flex items-center justify-between text-xs">
          <div className="text-[#172115] font-bold">
            {guest.nationality} • {guest.idVerification}
          </div>
          <div className="text-[#7D8A78] font-medium">
            الجنسية والهوية:
          </div>
        </div>
      </div>

      {/* Two Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {/* Customer Data */}
        <button
          type="button"
          onClick={() => toast.info(`عرض الملف الكامل للعميل: ${guest.name}`)}
          className="bg-[#EFF3EA] hover:bg-[#E5ECE0] text-[#2E3C29] py-2.5 px-3 rounded-xl text-xs font-bold border border-[#D8E1D2] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-3xs active:scale-95"
        >
          <UserCheck className="w-4 h-4" />
          <span>بيانات العميل</span>
        </button>

        {/* Chat History */}
        <button
          type="button"
          onClick={() => toast.info(`فتح سجل محادثة WhatsApp مع: ${guest.name}`)}
          className="bg-[#EFF3EA] hover:bg-[#E5ECE0] text-[#2E3C29] py-2.5 px-3 rounded-xl text-xs font-bold border border-[#D8E1D2] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-3xs active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>سجل المحادثة</span>
        </button>
      </div>
    </div>
  );
}
