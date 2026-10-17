"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { loginSchema, type LoginInput } from "../schemas/login.schema";
import { loginAction } from "../actions/login.action";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await loginAction(data);
      if (res?.data?.success) {
        setFeedback(res.data.message || "تم تسجيل الدخول بنجاح");
        router.push("/dashboard");
      }
    } catch {
      setFeedback("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-7">
      {/* Form Title & Subtitle */}
      <div className="space-y-2 text-center sm:text-start">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
          مرحبًا بعودتك
        </h1>
        <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed">
          سجّل الدخول لإدارة عقاراتك ووحداتك ومتابعة مؤشرات الأداء الحية بسهولة.
        </p>
      </div>

      {feedback && (
        <div className="p-3 text-xs rounded-xl bg-[#E8ECE2] border border-[#CCD4C5] text-[#2C3829] font-medium">
          {feedback}
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Identifier Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="identifier"
            className="block text-xs font-semibold text-[#273323]"
          >
            رقم الجوال أو البريد الإلكتروني
          </label>
          <div className="relative flex items-center">
            <input
              id="identifier"
              type="text"
              {...register("identifier")}
              dir="auto"
              placeholder="مثال: 0501234567 أو name@company.sa"
              className="w-full h-12 pe-4 ps-11 rounded-xl bg-white border border-[#E0E4D8] text-sm text-[#182016] placeholder:text-[#9BA596] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#374732]/20 focus:border-[#374732] transition-all shadow-xs"
            />
            <div className="absolute start-3.5 flex items-center pointer-events-none text-[#7D8A78]">
              <AtSign className="w-4 h-4" />
            </div>
          </div>
          {errors.identifier && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-[#273323]"
          >
            كلمة المرور
          </label>
          <div className="relative flex items-center">
            {/* Toggle show/hide password button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-3.5 flex items-center text-[#7D8A78] hover:text-[#273323] transition-colors focus:outline-none"
              tabIndex={-1}
              aria-label="تبديل إظهار كلمة المرور"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••••••"
              className="w-full h-12 pe-11 ps-11 rounded-xl bg-white border border-[#E0E4D8] text-sm text-[#182016] placeholder:text-[#9BA596] placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-[#374732]/20 focus:border-[#374732] transition-all shadow-xs text-start"
            />

            <div className="absolute start-3.5 flex items-center pointer-events-none text-[#7D8A78]">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-[#4D5A49]">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded border-[#D3D8CB] text-[#374732] accent-[#374732] focus:ring-[#374732]"
            />
            <span>تذكّرني على هذا الجهاز</span>
          </label>

          <Link
            href="#"
            className="text-xs font-medium text-[#4D5A49] hover:text-[#273323] transition-colors"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-[#344230] hover:bg-[#283424] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
        >
          <span>{isSubmitting ? "جاري التحقق..." : "تسجيل الدخول"}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </form>

      {/* Switch to Register link */}
      <div className="text-center text-xs text-[#5D6B59] pt-1">
        <span>ليس لديك حساب منشأة عقارية؟ </span>
        <Link
          href="/register"
          className="font-bold text-[#182016] hover:underline"
        >
          إنشاء حساب جديد
        </Link>
      </div>

      {/* Stats Container (18,400+ Units & 99.98% uptime) */}
      <div className="p-4 rounded-2xl bg-white/80 border border-[#E0E4D8] backdrop-blur-xs shadow-xs flex items-center justify-between">
        {/* Right Metric */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4F6F0] border border-[#E2E6DC] flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-[#374732]" />
          </div>
          <div className="text-start">
            <div className="text-xs sm:text-sm font-bold text-[#172115]">
              +18,400 وحدة
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#717F6C]">
              تُدار وتُشغّل نشطاً بالمنصة
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-[#E2E6DC]" />

        {/* Left Metric */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4F6F0] border border-[#E2E6DC] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#374732]" />
          </div>
          <div className="text-start">
            <div className="text-xs sm:text-sm font-bold text-[#172115]">
              99.98%
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#717F6C]">
              جاهزية واستقرار السيرفرات
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
