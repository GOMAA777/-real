export type ActivityCategory =
  | "all"
  | "assignment"
  | "dates"
  | "messages"
  | "cancellation";

export interface BookingActivityEvent {
  id: string;
  title: string;
  category: ActivityCategory;
  categoryBadge: string;
  categoryBadgeClass?: string;
  timestamp: string;
  actor: {
    name: string;
    role: string;
    initials: string;
    type: "admin" | "owner" | "system";
  };
  description: string;
  timelineIconType: "cancel" | "clock" | "message" | "unit" | "create";
  footerLeft?: {
    text: string;
    iconType?: "auth" | "id" | "bill";
  };
  footerRight?: {
    text: string;
    iconType?: "financial" | "check" | "read";
  };
  footerPills?: Array<{
    text: string;
    iconType?: "shield" | "bill";
  }>;
}

export interface BookingActivitySummary {
  bookingCode: string;
  propertyName: string;
  unitNumber: string;
  guestName: string;
  totalAmount: string;
  ownerName: string;
  totalEvents: number;
  uniqueActors: number;
  systemErrors: number;
  integrityScore: string;
  propertyDetails: {
    name: string;
    address: string;
    unitSpec: string;
    image: string;
    status: string;
  };
}
