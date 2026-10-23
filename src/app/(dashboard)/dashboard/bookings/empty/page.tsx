import type { Metadata } from "next";
import { BookingsEmptyStateView } from "@/features/bookings/components/bookings-empty-state-view";

export const metadata: Metadata = {
  title: "الحجوزات فارغة | منصة أبراج",
  description: "إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة",
};

export default function BookingsEmptyPage() {
  return (
    <div className="pb-12">
      <BookingsEmptyStateView />
    </div>
  );
}
