import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد - ابراج لإدارة الأملاك",
  description: "ابدأ بإدارة تطبيق عقاراتك، تدفقاتك المالية بمرونة فائقة.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
