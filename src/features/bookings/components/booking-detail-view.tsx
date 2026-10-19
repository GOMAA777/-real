"use client";

import { useState } from "react";
import { BookingDetail } from "../types";
import { BookingDetailHeader } from "./booking-detail-header";
import { BookingCancellationBanner } from "./booking-cancellation-banner";
import { BookingGuestCard } from "./booking-guest-card";
import { BookingSmartLockCard } from "./booking-smart-lock-card";
import { BookingActivityTimelineCard } from "./booking-activity-timeline-card";
import { BookingStayScheduleCard } from "./booking-stay-schedule-card";
import { BookingAssignedUnitCard } from "./booking-assigned-unit-card";
import { BookingFinancialSettlementCard } from "./booking-financial-settlement-card";
import { BookingWhatsAppAutomationCard } from "./booking-whatsapp-automation-card";

interface BookingDetailViewProps {
  booking: BookingDetail;
}

export function BookingDetailView({ booking }: BookingDetailViewProps) {
  const [currentStatus, setCurrentStatus] = useState<BookingDetail["status"]>(booking.status);

  const isCancelled = currentStatus === "cancelled";

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* 1. Top Header Card */}
      <BookingDetailHeader
        bookingCode={booking.bookingCode}
        status={currentStatus}
      />

      {/* 2. Cancellation Top Banner (Visible when cancelled as in Screenshot 1) */}
      {isCancelled && (
        <BookingCancellationBanner
          cancelledBy="مدير المنصة (محمد أحمد)"
          reason="طلب العميل المباشر"
          cancelledAt="اليوم ▪ 02:45 م"
          refundAmount="2,450.00 ر.س (قيد الاسترداد)"
        />
      )}

      {/* 3. Main Two-Column Grid matching Design Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL: 65% width (col-span-8 on desktop) */}
        <div className="lg:col-span-8 space-y-6 order-1">
          {/* R1: Stay Dates & Schedule */}
          <BookingStayScheduleCard
            stay={booking.stay}
            isCancelled={isCancelled}
          />

          {/* R2: Assigned Unit & Property */}
          <BookingAssignedUnitCard assigned={booking.assigned} />

          {/* R3: Payment & Financial Settlement */}
          <BookingFinancialSettlementCard
            financial={booking.financial}
            isCancelled={isCancelled}
          />

          {/* R4: WhatsApp Automation */}
          <BookingWhatsAppAutomationCard
            automation={booking.automation}
            isCancelled={isCancelled}
            bookingCode={booking.bookingCode || "BK-10482"}
          />
        </div>

        {/* Left Column in RTL: 35% width (col-span-4 on desktop) */}
        <div className="lg:col-span-4 space-y-6 order-2">
          {/* L1: Guest Profile */}
          <BookingGuestCard guest={booking.guest} />

          {/* L2: Smart Lock Access Code */}
          <BookingSmartLockCard
            smartLock={booking.smartLock}
            isCancelled={isCancelled}
          />

          {/* L3: Activity Log Timeline */}
          <BookingActivityTimelineCard
            activityLog={booking.activityLog}
            isCancelled={isCancelled}
          />
        </div>
      </div>
    </div>
  );
}
