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

export interface PropertyUnitItem {
  id: string;
  unitNumber: string;
  title: string;
  floor: string;
  area: string;
  accessStatus: string;
  status: "rented" | "available" | "maintenance";
  statusText: string;
}

export interface PropertyBookingItem {
  id: string;
  bookingCode: string;
  guestName: string;
  guestInitials: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
  unitNumber: string;
  checkInDate: string;
  checkOutDate: string;
  source: string;
  status: "active" | "confirmed_upcoming" | "completed" | "cancelled";
  statusText: string;
}

export interface PropertyDetail {
  id: string;
  name: string;
  code: string;
  category: string;
  statusText: string;
  location: string;
  city: string;
  district: string;
  totalUnits: number;
  occupiedUnits: number;
  availableUnits: number;
  occupancyRate: number;
  smartLockStatus: {
    title: string;
    description: string;
    badgeText: string;
  };
  heroImage: string;
  specs: {
    propertyType: string;
    cityAndRegion: string;
    district: string;
    constructionYear: string;
    detailedAddress: string;
    licenseNumber: string;
    licenseExpiry: string;
    description: string;
    amenities: {
      id: string;
      title: string;
      iconName: string;
    }[];
  };
  locationInfo: {
    mapImage: string;
    pinText: string;
    nationalAddress: string;
    gpsCoordinates: string;
    distances: string;
  };
  units: PropertyUnitItem[];
  recentBookings: PropertyBookingItem[];
}
