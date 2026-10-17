import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "يرجى إدخال رقم الجوال أو البريد الإلكتروني"),
  password: z
    .string()
    .min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"),
  rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
