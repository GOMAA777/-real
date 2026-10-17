import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "تسجيل الدخول - ابراج لإدارة الأملاك",
  description: "سجّل الدخول لإدارة عقاراتك ووحداتك ومتابعة مؤشرات الأداء الحية بسهولة.",
};

export default function LoginPage() {
  return <LoginForm />;
}
