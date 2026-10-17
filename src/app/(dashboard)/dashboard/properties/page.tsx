import type { Metadata } from "next";
import { PropertiesHeader } from "@/features/properties/components/properties-header";
import { PropertiesTable } from "@/features/properties/components/properties-table";

export const metadata: Metadata = {
  title: "العقارات - ابراج",
  description: "إدارة ومتابعة جميع العقارات المسجلة على المنصة وحالة الوحدات التابعة لها.",
};

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <PropertiesHeader />

      {/* 2. Filters + Table + Pagination */}
      <PropertiesTable />
    </div>
  );
}
