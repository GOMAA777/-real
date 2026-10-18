import { OwnerBookingsTabView } from "@/features/owners/components/owner-bookings-tab-view";

export const metadata = {
  title: "الحجوزات | منصة أبراج",
  description: "إدارة ومتابعة جميع الحجوزات المسجلة على المنصة وحالات الوصول والمغادرة والمدفوعات المتزامنة",
};

export default function BookingsPage() {
  return (
    <div className="pb-12">
      <OwnerBookingsTabView />
    </div>
  );
}
