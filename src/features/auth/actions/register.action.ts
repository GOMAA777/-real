"use server";

import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "../schemas/register.schema";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    // Mock simulation until backend API is ready
    const { fullName } = parsedInput;
    return {
      success: true,
      message: `تم إنشاء الحساب بنجاح مرحباً ${fullName}`,
    };
  });
