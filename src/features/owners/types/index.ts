export type OwnerStatus = "active" | "pending" | "inactive";

export interface Owner {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  propertiesCount: number;
  unitsCount: number;
  registrationDate: string;
  relativeTime: string;
  status: OwnerStatus;
}

export interface OwnersKPIData {
  totalOwners: number;
  totalGrowth: string;
  totalSubtext: string;
  activeAccounts: number;
  activePercentage: string;
  activeSubtext: string;
  pendingReview: number;
  pendingBadge: string;
  pendingSubtext: string;
  newRegistrations: number;
  newGrowth: string;
  newSubtext: string;
}

export type OwnerBookingFilterStatus = "all" | "active" | "upcoming" | "completed" | "cancelled";

export type BookingStatus =
  | "active"
  | "upcoming"
  | "checkout_today"
  | "completed"
  | "cancelled";

export interface OwnerBookingItem {
  id: string;
  guestName: string;
  guestInitials: string;
  bookingCode: string;
  phone: string;
  propertyName: string;
  propertyLocation: string;
  unitNumber: string;
  unitDescription: string;
  unitHighlightColor?: string;
  source: string;
  sourceId: string;
  checkInDate: string;
  checkInTime: string;
  checkInBadge?: string;
  checkInIsToday?: boolean;
  checkInSubtext?: string;
  checkOutDate: string;
  checkOutTime: string;
  checkOutBadge?: string;
  checkOutIsToday?: boolean;
  checkOutSubtext?: string;
  status: BookingStatus;
  statusText: string;
  accessCode: string;
  accessDevice: string;
  accessStatus: "connected" | "pending" | "expiring" | "disabled";
}

export interface OwnerBookingsKPIData {
  currentBookings: {
    count: number;
    badgeText: string;
    subtext: string;
  };
  monthlyTotal: {
    count: number;
    growthText: string;
    nightsCount: number;
  };
  upcomingConfirmed: {
    count: number;
    badgeText: string;
    subtext: string;
  };
  cancelled: {
    count: number;
    badgeText: string;
    subtext: string;
  };
}
