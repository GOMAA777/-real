import type { Metadata } from "next";
import { OperationsBoardView } from "@/features/operations/components/operations-board-view";

export const metadata: Metadata = {
  title: "العمليات والصيانة - ابراج",
  description: "متابعة كل عمليات التنظيف والصيانة على مستوى المنصة.",
};

export default function OperationsPage() {
  return <OperationsBoardView />;
}
