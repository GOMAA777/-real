import { registerSchema, RegisterInput } from "../schemas/register.schema";

export async function registerAction(input: RegisterInput) {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { validationErrors: parsed.error.format() };
  }
  const { fullName } = parsed.data;
  return {
    data: {
      success: true,
      message: `تم إنشاء الحساب بنجاح مرحباً ${fullName}`,
    },
  };
}
