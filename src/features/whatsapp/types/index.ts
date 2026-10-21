export interface TaskDetails {
  code: string;
  title: string;
  priority: "urgent" | "normal" | "low";
  priorityLabel: string;
  propertyName: string;
  propertyLocation: string;
  unitName: string;
  unitLevel: string;
  departureTime: string;
  departureStatus: string;
  arrivalTime: string;
  arrivalUrgency: string;
  directivesTitle: string;
  directivesContent: string;
  coordinatesUrl: string;
  status: "pending" | "accepted" | "in_progress" | "photos_uploaded" | "completed";
}

export interface WhatsAppChatMessage {
  id: string;
  sender: "system" | "staff" | "agent";
  type: "system_notice" | "welcome" | "task_card" | "text";
  time: string;
  content?: string;
  smartKey?: string;
  unitTitle?: string;
  status?: "sent" | "delivered" | "read";
  taskDetails?: TaskDetails;
}

export interface WhatsAppConversationItem {
  id: string;
  name: string;
  role: string;
  unitCode?: string;
  time: string;
  lastMessage: string;
  unreadCount?: number;
  tag?: {
    text: string;
    type?: "task" | "inspected" | "quality" | "inventory";
  };
  avatarText?: string;
  avatarBg?: string;
  isOnline?: boolean;
  isIconAvatar?: boolean;
  category: "all" | "active_tasks" | "supervisors";
}

export type WhatsAppTopFilter = "all" | "unread" | "maintenance" | "extension";
export type ConversationFilter = "all" | "active_tasks" | "supervisors";
