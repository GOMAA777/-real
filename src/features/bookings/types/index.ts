export interface BookingDetail {
  id: string;
  bookingCode: string;
  status: "active" | "upcoming" | "completed" | "cancelled";
  statusText: string;
  
  // Guest Profile
  guest: {
    name: string;
    initials: string;
    verified: boolean;
    badgeText: string;
    phone: string;
    email: string;
    nationality: string;
    idVerification: string;
  };

  // Smart Access Code
  smartLock: {
    unitNumber: string;
    pinCode: string;
    maskedCode: string;
    scheduleText: string;
    connected: boolean;
  };

  // Stay & Schedule
  stay: {
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    nightsCount: number;
    guestsCount: number;
    guestsDescription: string;
    cancellationPolicy: string;
  };

  // Unit & Property
  assigned: {
    propertyName: string;
    propertyCode: string;
    propertyLocation: string;
    propertyId: string;
    ownerName: string;
    ownerId: string;
    falLicense: string;
    unitNumber: string;
    unitTitle: string;
    unitFloor: string;
    unitView: string;
    unitSpecs: string;
    operationalStatus: string;
  };

  // Financial Settlement
  financial: {
    totalAmount: number;
    collectedAmount: number;
    remainingAmount: number;
    currency: string;
    paymentStatus: string;
    baseStayRate: number;
    baseStayNights: number;
    baseStayTotal: number;
    cleaningFee: number;
    vatAmount: number;
    vatRate: number;
    paymentMethod: string;
  };

  // WhatsApp Automation
  automation: {
    channelStatus: string;
    steps: Array<{
      id: string;
      stepNumber: number;
      title: string;
      description: string;
      timestamp: string;
      status: "completed" | "scheduled" | "pending";
    }>;
  };

  // Activity Log
  activityLog: Array<{
    id: string;
    title: string;
    timestamp: string;
    type?: string;
  }>;
}
