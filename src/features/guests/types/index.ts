export interface GuestBooking {
  id: string;
  bookingCode: string;
  source: string;
  propertyName: string;
  propertyType: "apartment" | "building" | "villa";
  unitName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  currency: string;
  status: "upcoming" | "completed" | "cancelled";
  statusText: string;
}

export interface GuestDetail {
  id: string;
  guestCode: string; // "GUST-89324"
  name: string; // "خالد العتيبي"
  initials: string; // "خ"
  verified: boolean;
  verificationBadge: string; // "هوية موثقة (أبشر)"
  phone: string; // "+966 50 123 4567"
  email: string; // "khaled.otb@example.com"
  nationality: string; // "سعودي"
  idType: string; // "هوية وطنية"
  firstBookingDate: string; // "12 مايو 2025"

  // Metrics
  totalBookingsCount: number; // 4
  completedBookingsCount: number; // 2
  upcomingBookingsCount: number; // 1
  cancelledBookingsCount: number; // 1
  rating: number; // 4.9
  financialCommitmentRate: number; // 100

  // Bookings
  bookings: GuestBooking[];
  totalRevenue: number; // 10300
}
