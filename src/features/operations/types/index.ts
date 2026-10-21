export type OperationType = "cleaning" | "maintenance";

export type OperationStatus =
  | "needs_cleaning"
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface OperationTask {
  id: string;
  taskNumber: string;
  type: OperationType;
  unitId: string;
  unitName: string;
  floor: string;
  propertyId: string;
  propertyName: string;
  city: string;
  ownerId: string;
  ownerName: string;
  ownerCode: string;
  createdAt: string;
  createdAtTime?: string;
  status: OperationStatus;
  statusLabel: string;
  assigneeName?: string;
  assigneeCompany?: string;
  assigneeAvatar?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  bookingId?: string;
  notes?: string;
}

export type OperationCategoryFilter = "all" | "cleaning" | "maintenance";
export type OperationSubFilter = "all" | "pending" | "current" | "in_progress";

export interface OperationFilterState {
  type: "all" | "cleaning" | "maintenance";
  status: "all" | "needs_cleaning" | "pending" | "in_progress" | "completed" | "cancelled";
  priority: "all" | "urgent" | "high" | "medium" | "low";
  city: string;
  property: string;
  assigneeStatus: "all" | "assigned" | "unassigned";
  sortBy: "default" | "date_desc" | "date_asc" | "priority_desc" | "task_asc";
}

export const initialOperationFilterState: OperationFilterState = {
  type: "all",
  status: "all",
  priority: "all",
  city: "all",
  property: "all",
  assigneeStatus: "all",
  sortBy: "default",
};
