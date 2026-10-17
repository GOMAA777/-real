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
