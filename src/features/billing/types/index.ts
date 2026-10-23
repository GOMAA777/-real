export type BillingCycle = "monthly" | "annual";

export type SubscriptionStatus =
  | "active"
  | "pending_payment"
  | "expiring_soon"
  | "paused"
  | "trial"
  | "cancelled";

export interface Subscription {
  id: string;
  subscriptionCode: string;
  ownerId: string;
  ownerName: string;
  ownerCompany?: string;
  ownerPhone: string;
  avatarInitials: string;
  billingCycle: BillingCycle;
  billingCycleLabel: string;
  purchasedUnits: number;
  usedUnits: number;
  remainingUnits: number;
  usagePercentage: number;
  subscriptionPrice: number;
  priceFormatted: string;
  vatNotice: string;
  startDate: string;
  renewalDate: string;
  renewalCountdownDays: number;
  status: SubscriptionStatus;
  statusLabel: string;
  statusBadgeVariant: "active" | "pending" | "warning" | "paused" | "trial" | "cancelled";
  statusSubText?: string;
}

export interface UnitEntitlement {
  id: string;
  unitNumber: string;
  unitType: string;
  propertyName: string;
  district: string;
  status: "rented" | "ready" | "maintenance";
  statusLabel: string;
}

export interface ZatcaInvoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  periodCovered: string;
  capacityUnits: number;
  capacityExtra?: number;
  totalAmount: number;
  totalFormatted: string;
  paymentMethod: string;
  status: "paid" | "pending" | "failed";
}

export interface AuditEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  actor: string;
  type: "payment" | "upgrade" | "renewal" | "unpause" | "pause" | "contract_created";
}

export interface SubscriptionDetailData {
  subscription: Subscription;
  owner: {
    name: string;
    company: string;
    avatarInitials: string;
    isVerifiedSSO: boolean;
    phone: string;
    email: string;
    joinDate: string;
    primaryProperty: string;
    city: string;
  };
  contract: {
    monthlyPerUnitPrice: number;
    totalMonthlyAmount: number;
    vatRate: number;
    nextRenewalDate: string;
    daysRemaining: number;
    billingCycleLabel: string;
    startDate: string;
    paymentMethod: string;
    overdueClaimsCount: number;
  };
  entitlements: {
    purchasedUnits: number;
    usedUnits: number;
    remainingUnits: number;
    usagePercentage: number;
    healthStatusLabel: string;
    units: UnitEntitlement[];
  };
  invoices: ZatcaInvoice[];
  auditTimeline: AuditEvent[];
}

export interface PricingPlan {
  monthlyPrice: number;
  monthlyVat: number;
  monthlyTaxable: number;
  monthlySubscribers: number;
  monthlyLicensedUnits: number;

  annualPrice: number;
  annualVat: number;
  annualTaxable: number;
  annualSavingsPerUnit: number;
  annualDiscountPercentage: number;
  annualSubscribers: number;
  annualLicensedUnits: number;
}
