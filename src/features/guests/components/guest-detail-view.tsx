"use client";

import { GuestDetail } from "../types";
import { GuestProfileHeader } from "./guest-profile-header";
import { GuestInfoMetricsCard } from "./guest-info-metrics-card";
import { GuestBookingsTableCard } from "./guest-bookings-table-card";

interface GuestDetailViewProps {
  guest: GuestDetail;
}

export function GuestDetailView({ guest }: GuestDetailViewProps) {
  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* 1. Top Header Card */}
      <GuestProfileHeader guestName={guest.name} />

      {/* 2. Main Profile & KPI Metrics Card */}
      <GuestInfoMetricsCard guest={guest} />

      {/* 3. Bookings History Table Card */}
      <GuestBookingsTableCard
        bookings={guest.bookings}
        totalRevenue={guest.totalRevenue}
      />
    </div>
  );
}
