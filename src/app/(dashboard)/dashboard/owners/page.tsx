import { Suspense } from "react";
import type { Metadata } from "next";
import { OwnersPageContent } from "@/features/owners/components/owners-page-content";

export const metadata: Metadata = {
  title: "إدارة أصحاب العقارات - ابراج",
  description: "إدارة ومتابعة جميع أصحاب العقارات المسجلين وتراخيصهم على المنصة.",
};

export default function OwnersPage() {
  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" />}>
      <OwnersPageContent />
    </Suspense>
  );
}
