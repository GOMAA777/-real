"use client";

import { useSearchParams } from "next/navigation";
import { AddPropertyForm } from "./add-property-form";
import { AddPropertySuccessView } from "./add-property-success-view";

export function NewPropertyClientContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  if (isSuccess) {
    return <AddPropertySuccessView />;
  }

  return <AddPropertyForm />;
}
