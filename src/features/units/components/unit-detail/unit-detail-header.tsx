"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  ArrowRight,
  BatteryMedium,
  CheckCircle2,
  Clock,
  DoorOpen,
  Edit,
  History,
  KeyRound,
  Lock,
  Sparkles,
  Wifi,
  Wrench,
} from "lucide-react";
import { UnitStatus } from "../../types";

interface UnitDetailHeaderProps {
  unitNumber?: string;
  propertyName?: string;
  status: UnitStatus;
  onChangeStatus?: (status: UnitStatus) => void;
  onOpenAccessCodeModal?: () => void;
  onOpenOperationsLog?: () => void;
}

export function UnitDetailHeader({
  unitNumber = "204",
  propertyName = "عمارة النخيل",
  status,
  onChangeStatus,
  onOpenAccessCodeModal,
  onOpenOperationsLog,
}: UnitDetailHeaderProps) {
  // Status badge config matching exact Figma tokens
  const statusConfig = {
    occupied: {
      label: "مشغولة حالياً",
      bg: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      dot: "bg-[#D97706]",
      icon: Clock,
    },
    available: {
      label: "متاحة للحجز",
      bg: "bg-[#D8E8CB] text-[#2F5A22] border-[#C2D8B1]",
      dot: "bg-[#2F8A3E]",
      icon: CheckCircle2,
    },
    cleaning: {
      label: "تحت التنظيف",
      bg: "bg-[#E0E7FF] text-[#3730A3] border-[#C7D2FE]",
      dot: "bg-[#4F46E5]",
      icon: Sparkles,
    },
    maintenance: {
      label: "تحت الصيانة",
      bg: "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]",
      dot: "bg-[#DC2626]",
      icon: Wrench,
    },
  }[status];

  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#EEF2E6] shadow-2xs space-y-4">
      {/* Top Breadcrumb & Status Quick-Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-start">
        {/* Central Breadcrumb */}
        <div className="flex items-center">
          <Breadcrumb variant="navbar" />
        </div>

        {/* Operational States Switcher (for previewing all 4 Figma states: 1:14845, 1:16655, 1:17332, 1:17982) */}
        {onChangeStatus && (
          <div className="flex items-center gap-1.5 bg-[#F1F5EB] p-1 rounded-full text-[11px] self-start sm:self-auto">
            <span className="text-[#7C8773] px-2 font-medium">معاينة الحالة:</span>
            {(
              [
                { key: "occupied", label: "مشغولة" },
                { key: "available", label: "متاحة" },
                { key: "cleaning", label: "تنظيف" },
                { key: "maintenance", label: "صيانة" },
              ] as const
            ).map((st) => (
              <button
                key={st.key}
                type="button"
                onClick={() => onChangeStatus(st.key)}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                  status === st.key
                    ? "bg-[#34422A] text-white shadow-2xs"
                    : "text-[#55694D] hover:text-[#181D17] hover:bg-white/60"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Title, Badges & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
        {/* Left / Start Info */}
        <div className="flex items-start sm:items-center gap-3.5 text-start">
          <div className="w-14 h-14 rounded-[14px] bg-[#EAF1E8] border border-[#D9E3D5] flex items-center justify-center shrink-0 text-[#34422A]">
            <DoorOpen className="w-7 h-7" strokeWidth={1.8} />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-[24px] sm:text-[26px] font-bold text-[#181D17] leading-tight">
                وحدة {unitNumber}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold border ${statusConfig.bg}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`} />
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{statusConfig.label}</span>
              </span>

              {/* TTLock IoT online badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F1F5EB] text-[#4A5440] border border-[#E2E8DC]">
                <Wifi className="w-3 h-3 text-[#2F8A3E]" />
                <span>القفل الذكي متصل</span>
                <span className="text-[#8A9384]">(TTLock v4.2)</span>
              </span>
            </div>

            <p className="text-[13px] text-[#7C8773] mt-1">
              {propertyName} • الطابق الثاني • استوديو تنفيذي فاخر • رمز الأصل: UNT-1048-204
            </p>
          </div>
        </div>

        {/* Action Buttons: تعديل الوحدة, إدارة كود الدخول, سجل العمليات */}
        <div className="flex items-center gap-2.5 flex-wrap self-end lg:self-auto">
          {/* سجل العمليات Button */}
          <button
            type="button"
            onClick={onOpenOperationsLog}
            className="h-10 px-4 rounded-[10px] bg-[#F1F5EB] border border-[#E2E8DC] text-[#34422A] text-[12.5px] font-bold flex items-center gap-2 hover:bg-[#E5ECE0] transition-colors cursor-pointer select-none"
          >
            <History className="w-4 h-4 text-[#55694D]" />
            <span>سجل العمليات</span>
          </button>

          {/* إدارة كود الدخول Button */}
          <button
            type="button"
            onClick={onOpenAccessCodeModal}
            className="h-10 px-4 rounded-[10px] bg-[#D8E8CB] border border-[#C2D8B1] text-[#24351D] text-[12.5px] font-bold flex items-center gap-2 hover:bg-[#CCE0BD] transition-colors cursor-pointer select-none"
          >
            <KeyRound className="w-4 h-4 text-[#2F8A3E]" />
            <span>إدارة كود الدخول</span>
          </button>

          {/* تعديل الوحدة Button */}
          <Link
            href="/dashboard/units/new"
            className="h-10 px-4 rounded-[10px] bg-[#34422A] text-white text-[12.5px] font-bold flex items-center gap-2 hover:bg-[#283420] transition-colors cursor-pointer select-none"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>تعديل الوحدة</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
