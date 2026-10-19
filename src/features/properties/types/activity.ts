export interface PropertyActivityEvent {
  id: string;
  title: string;
  badge: string;
  badgeType?: "owner" | "system" | "admin";
  timestamp: string;
  timeOnly?: string;
  actor?: {
    name: string;
    role: string;
    initials: string;
  };
  description?: string;
  diffInline?: {
    label: string;
    oldValue: string;
    newValue: string;
  };
  detailsData?: {
    actionType: string;
    performer: string;
    dateTime: string;
    entity: string;
    source: string;
    diff: {
      oldValue: string;
      newValue: string;
      justification: string;
    };
  };
  subtitleText?: string;
  highlightedText?: string;
  highlightedColor?: string;
  unitCode?: string;
  bookingCode?: string;
  taskStatus?: string;
  statusBadgeColor?: string;
  actionButtonText?: string;
  iconType: "edit" | "door" | "mobile" | "refresh" | "whatsapp" | "cleaning" | "maintenance";
}

export interface PropertyActivitySummary {
  propertyName: string;
  propertyType: string;
  address: string;
  facilityCode: string;
  ownerName: string;
  ownerCode: string;
  totalUnits: number;
  documentedPercentage: string;
}
