import { BookingDetail } from "../types";
import { BookingDetailHeader } from "./booking-detail-header";
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
  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* 1. Top Header Card */}
      <BookingDetailHeader bookingCode={booking.bookingCode} />

      {/* 2. Main Two-Column Grid matching Design Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column in RTL: 65% width (col-span-8 on desktop) */}
        <div className="lg:col-span-8 space-y-6 order-1">
          {/* R1: Stay Dates & Schedule */}
          <BookingStayScheduleCard stay={booking.stay} />

          {/* R2: Assigned Unit & Property */}
          <BookingAssignedUnitCard assigned={booking.assigned} />

          {/* R3: Payment & Financial Settlement */}
          <BookingFinancialSettlementCard financial={booking.financial} />

          {/* R4: WhatsApp Automation */}
          <BookingWhatsAppAutomationCard automation={booking.automation} />
        </div>

        {/* Left Column in RTL: 35% width (col-span-4 on desktop) */}
        <div className="lg:col-span-4 space-y-6 order-2">
          {/* L1: Guest Profile */}
          <BookingGuestCard guest={booking.guest} />

          {/* L2: Smart Lock Access Code */}
          <BookingSmartLockCard smartLock={booking.smartLock} />

          {/* L3: Activity Log Timeline */}
          <BookingActivityTimelineCard activityLog={booking.activityLog} />
        </div>
      </div>
    </div>
  );
}
