"use client";

import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  DoorClosed,
  ExternalLink,
  History,
  KeyRound,
  Lock,
  Network,
  Radio,
  ShieldCheck,
  User,
  Wifi,
  Wind,
} from "lucide-react";
import { toast } from "sonner";

interface UnitSidebarProps {
  propertyName?: string;
  propertyId?: string;
  ownerName?: string;
  ownerId?: string;
  onOpenOperationsLog?: () => void;
  onOpenAccessCodeModal?: () => void;
}

export function UnitSidebar({
  propertyName = "عمارة النخيل",
  propertyId = "p1",
  ownerName = "محمد العتيبي",
  ownerId = "o1",
  onOpenOperationsLog,
  onOpenAccessCodeModal,
}: UnitSidebarProps) {
  return (
    <div className="space-y-4 text-start">
      {/* 1. Target Property Card */}
      <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-[#7C8773]">
            العقار المرتبط
          </span>
          <Link
            href={`/dashboard/properties/${propertyId}`}
            className="text-[11.5px] font-bold text-[#34422A] hover:underline flex items-center gap-1"
          >
            <span>الملف</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-11 h-11 rounded-[10px] bg-[#EAF1E8] text-[#34422A] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-[15px] font-bold text-[#181D17] truncate">
                {propertyName}
              </h4>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D8E8CB] text-[#2F5A22]">
                PR-1048
              </span>
            </div>
            <p className="text-[11.5px] text-[#7C8773] mt-1 line-clamp-1">
              الرياض — حي العليا • شارع موسى بن نصير
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#F1F5EB] flex items-center justify-between text-[11px] text-[#55694D]">
          <span className="flex items-center gap-1">
            <DoorClosed className="w-3.5 h-3.5" />
            12 وحدة قائمة
          </span>
          <span className="flex items-center gap-1 text-[#2F8A3E] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            رخصة إشغال نشطة
          </span>
        </div>
      </div>

      {/* 2. Owner Card */}
      <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold text-[#7C8773]">
            مالك العقار
          </span>
          <Link
            href={`/dashboard/owners/${ownerId}`}
            className="text-[11.5px] font-bold text-[#34422A] hover:underline flex items-center gap-1"
          >
            <span>الملف</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-11 h-11 rounded-[10px] bg-[#34422A] text-white text-[16px] font-bold flex items-center justify-center shrink-0">
            {ownerName.charAt(0)}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-[15px] font-bold text-[#181D17] truncate">
                {ownerName}
              </h4>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E4EFD7] text-[#3F7A2E]">
                معتمد
              </span>
            </div>
            <p className="text-[11.5px] text-[#7C8773] mt-1" dir="ltr">
              +966 50 123 4567 • OWN-4491
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#F1F5EB] flex items-center justify-between text-[11px] text-[#55694D]">
          <span>إجمالي العقارات: 4 عقارات</span>
          <span className="text-[#2F8A3E] font-semibold">عقد الإدارة نشط</span>
        </div>
      </div>

      {/* 3. Operational Health Checklist */}
      <div className="bg-white rounded-[16px] p-5 border border-[#EEF2E6] shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="text-[14px] font-bold text-[#181D17]">
            الفحص التشغيلي والسلامة (IoT)
          </h4>
          <span className="w-2 h-2 rounded-full bg-[#2F8A3E] animate-pulse" />
        </div>

        <div className="space-y-2.5 text-[12px]">
          {/* Smart Lock */}
          <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#F8FAF6]">
            <span className="flex items-center gap-2 text-[#4A5440]">
              <Lock className="w-3.5 h-3.5 text-[#2F8A3E]" />
              <span>القفل الذكي (البطارية 92%)</span>
            </span>
            <span className="text-[#2F8A3E] font-bold text-[11px]">متصل ومقفل</span>
          </div>

          {/* Wi-Fi */}
          <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#F8FAF6]">
            <span className="flex items-center gap-2 text-[#4A5440]">
              <Wifi className="w-3.5 h-3.5 text-[#2F8A3E]" />
              <span>شبكة Wi-Fi فايبر</span>
            </span>
            <span className="text-[#2F8A3E] font-bold text-[11px]">450 Mbps</span>
          </div>

          {/* Sensors */}
          <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#F8FAF6]">
            <span className="flex items-center gap-2 text-[#4A5440]">
              <Radio className="w-3.5 h-3.5 text-[#2F8A3E]" />
              <span>حساسات الدخان والسلامة</span>
            </span>
            <span className="text-[#2F8A3E] font-bold text-[11px]">تعمل بكفاءة</span>
          </div>

          {/* AC Climate */}
          <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#F8FAF6]">
            <span className="flex items-center gap-2 text-[#4A5440]">
              <Wind className="w-3.5 h-3.5 text-[#2F8A3E]" />
              <span>تكييف Nest المركزي</span>
            </span>
            <span className="text-[#34422A] font-bold text-[11px]">Eco Mode</span>
          </div>

          {/* Key Safe Box */}
          <div className="flex items-center justify-between p-2 rounded-[8px] bg-[#F8FAF6]">
            <span className="flex items-center gap-2 text-[#4A5440]">
              <KeyRound className="w-3.5 h-3.5 text-[#2F8A3E]" />
              <span>صندوق المفتاح الاحتياطي</span>
            </span>
            <span className="text-[#2F8A3E] font-bold text-[11px]">مؤمّن ومشفر</span>
          </div>
        </div>
      </div>

      {/* 4. Full Operations Log Button */}
      <div className="bg-[#EAF1E8] rounded-[16px] p-4 border border-[#D9E3D5] text-center space-y-2">
        <div className="w-9 h-9 rounded-full bg-[#34422A] text-white mx-auto flex items-center justify-center">
          <History className="w-4 h-4" />
        </div>
        <div className="text-[13px] font-bold text-[#181D17]">
          سجل العمليات الفندقية والميدانية
        </div>
        <p className="text-[11px] text-[#55694D]">
          استعراض جميع مهام التنظيف، الصيانة، وتاريخ فتح الأقفال السحابية
        </p>
        <button
          type="button"
          onClick={onOpenOperationsLog}
          className="w-full h-9 rounded-[8px] bg-[#34422A] text-white text-[12px] font-bold hover:bg-[#283420] transition-colors cursor-pointer select-none"
        >
          فتح سجل العمليات الكامل
        </button>
      </div>
    </div>
  );
}
