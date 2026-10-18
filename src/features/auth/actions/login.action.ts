import { loginSchema } from "../schemas/login.schema";
import { LoginInput } from "../schemas/login.schema";

export async function loginAction(input: LoginInput) {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { validationErrors: parsed.error.format() };
  }
  const { identifier } = parsed.data;
  return {
    data: {
      success: true,
      message: `تم تسجيل الدخول بنجاح مرحباً ${identifier}`,
    },
  };
}
