export type PropertyStatus = "active" | "inactive" | "archived";

export interface Property {
  id: string;
  title: string;
  type: string;
  code: string;
  ownerName: string;
  ownerInitials: string;
  ownerEmail: string;
  city: string;
  district: string;
  totalUnits: number;
  occupiedUnits: number;
  availableUnits: number;
  activeBookings: number;
  dateAdded: string;
  relativeTime: string;
  status: PropertyStatus;
}
