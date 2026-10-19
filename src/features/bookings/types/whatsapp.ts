export type WhatsAppMessageStatus =
  | "read"
  | "delivered"
  | "sent"
  | "cancelled_schedule"
  | "failed";

export interface WhatsAppTimelineEvent {
  title: string;
  timestamp: string;
  subtext: string;
}

export interface WhatsAppMessageItem {
  id: string;
  messageId: string;
  recipientPhone: string;
  templateName: string;
  language: string;
  title: string;
  categoryBadge: string;
  status: WhatsAppMessageStatus;
  statusText: string;
  timestamp: string;
  bubbleText: string;
  previewBubbleText: {
    sender: string;
    greeting: string;
    body: string;
    codeLabel?: string;
    codeValue?: string;
    validityNote?: string;
    helpNote?: string;
    time: string;
  };
  footerInfo: {
    template: string;
    leftNote: string;
    leftIconType?: "lock" | "financial" | "info" | "api";
  };
  errorReason?: string;
  timeline: WhatsAppTimelineEvent[];
}
