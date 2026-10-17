import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error("Action error:", error.message);
    return error.message || "An unexpected error occurred.";
  },
});
