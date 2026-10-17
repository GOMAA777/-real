import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "الاسم الكامل مطلوب (3 أحرف على الأقل)"),
    email: z
      .string()
      .email("البريد الإلكتروني غير صالح"),
    phone: z
      .string()
      .min(8, "رقم الجوال غير صالح"),
    password: z
      .string()
      .min(8, "كلمة المرور يجب أن لا تقل عن 8 أحرف"),
    confirmPassword: z
      .string()
      .min(1, "تأكيد كلمة المرور مطلوب"),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "يجب الموافقة على الشروط والأحكام",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
