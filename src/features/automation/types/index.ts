export type RuleCategory =
  | "self_checkin"
  | "cleaning_ops"
  | "confirm_checkout"
  | "governance_security"
  | "marketing_review";

export type RuleStatus = "active" | "paused" | "draft";

export interface AutomationRule {
  id: string;
  ruleCode: string;
  title: string;
  description: string;
  category: RuleCategory;
  categoryLabel: string;
  triggerType: string;
  triggerLabel: string;
  triggerTime: string;
  actionSummary: string;
  actionType: "whatsapp" | "cleaning_task" | "security_alert" | "smart_lock" | "review";
  scope: string;
  status: RuleStatus;
  statusLabel: string;
  lastExecution: string;
  bookingRef?: string;
  successRate: string;
  creatorName?: string;
  createdAt?: string;
  lastModified?: string;
}

export type TemplateCategory =
  | "bookings"
  | "arrival"
  | "departure"
  | "door_pin"
  | "operations"
  | "other";

export type TemplateStatus = "active" | "paused" | "draft";

export interface WhatsAppTemplate {
  id: string;
  templateCode: string;
  title: string;
  category: TemplateCategory;
  categoryLabel: string;
  triggerLabel: string;
  language: string;
  variables: string[];
  status: TemplateStatus;
  statusLabel: string;
  lastModifiedDate: string;
  lastModifiedAuthor: string;
  content: string;
  quickActions?: { label: string; type: string }[];
}

export type ExecutionStatus = "success" | "failed" | "in_progress";

export interface ExecutionLog {
  id: string;
  logCode: string;
  date: string;
  time: string;
  ruleId: string;
  ruleName: string;
  triggerDetails: string;
  bookingId: string;
  guestName: string;
  guestPhone: string;
  propertyName: string;
  unitName: string;
  actionType: string;
  actionBadgeLabel: string;
  status: ExecutionStatus;
  statusSummary: string;
  responseTime?: string;
  failureReason?: string;
  metaCloudMessageId?: string;
}

export type AutomationMainTab = "rules" | "templates" | "logs";
