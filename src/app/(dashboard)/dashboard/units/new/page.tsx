import { Suspense } from "react";
import type { Metadata } from "next";
import { NewUnitPage } from "@/features/units/components/new-unit/new-unit-page";

export const metadata: Metadata = {
  title: "إضافة وحدة - ابراج",
  description:
    "سجّل وحدة جديدة ضمن أحد العقارات المسجلة وحدد جميع مواصفاتها وتسعيرها وحالتها التشغيلية.",
};

export default function AddUnitPage() {
  return (
    <Suspense fallback={null}>
      <NewUnitPage />
    </Suspense>
  );
}
