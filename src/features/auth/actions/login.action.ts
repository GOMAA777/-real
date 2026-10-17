"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "../schemas/login.schema";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    // Mock simulation until backend API is ready
    const { identifier } = parsedInput;
    return {
      success: true,
      message: `تم تسجيل الدخول بنجاح مرحباً ${identifier}`,
    };
  });
