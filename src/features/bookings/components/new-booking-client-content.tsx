"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AddBookingForm } from "./add-booking-form";
import { AddBookingSuccessView } from "./add-booking-success-view";

export function NewBookingClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [localSuccess, setLocalSuccess] = useState(
    searchParams.get("success") === "true"
  );

  const handleSuccess = () => {
    setLocalSuccess(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("success", "true");
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setLocalSuccess(false);
    router.push("/dashboard/bookings/new");
  };

  if (localSuccess) {
    return <AddBookingSuccessView onReset={handleReset} />;
  }

  return <AddBookingForm onSuccess={handleSuccess} />;
}
