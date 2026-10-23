import type { Metadata } from "next";
import { FullOperationsLogView } from "@/features/operations/components/full-operations-log-view";

export const metadata: Metadata = {
  title: "سجل التشغيل الكامل — الوحدة 204 - ابراج",
  description: "التوثيق الزمني التشغيلي الصارم لمهام النظافة والتعقيم وبلاغات الصيانة.",
};

export default function OperationsLogPage() {
  return <FullOperationsLogView unitId="204" />;
}
