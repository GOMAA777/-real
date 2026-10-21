export type UnitStatus = "available" | "occupied" | "cleaning" | "maintenance";

export type UnitType = "استوديو" | "غرفة" | "شقة" | "جناح رئاسي" | string;

export type UnitIconType = "door" | "maintenance" | "cleaning" | "suite";

export interface Unit {
  id: string;
  unitNumber: string;
  floor: string;
  floorNumber: number;
  iconType: UnitIconType;
  propertyId: string;
  propertyName: string;
  ownerId: string;
  ownerName: string;
  ownerInitials: string;
  type: UnitType;
  pricePerNight: number;
  status: UnitStatus;
  currentBookingCode?: string | null;
  lastUpdateDate: string;
  lastUpdateTime: string;
}

export interface UnitFilterState {
  property: string; // "all" | propertyName
  status: string; // "all" | UnitStatus
  unitType: string; // "all" | UnitType
  floor: string; // "all" | floorNumber string
  priceRange: string; // "all" | "less200" | "200-350" | "more350"
  sortBy: string; // "default" | "price_asc" | "price_desc" | "unit_asc"
}
