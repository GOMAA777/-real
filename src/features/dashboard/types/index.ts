export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface OwnerRecord {
  id: string;
  name: string;
  email: string;
  propertiesCount: number;
  unitsCount: number;
  registerDate: string;
  status: "active" | "pending" | "inactive";
}

export interface PropertyRecord {
  id: string;
  name: string;
  city: string;
  unitsCount: number;
  ownerName: string;
  statusColor: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  highlight?: string;
  tag?: string;
  timestamp: string;
  type: "user" | "property" | "booking" | "update";
}
