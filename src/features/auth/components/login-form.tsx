"use client";

import { useState, useEffect } from "react";
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
  SquareCheck,
} from "lucide-react";
import { loginSchema, type LoginInput } from "../schemas/login.schema";
import { loginAction } from "../actions/login.action";
import { isUserAuthenticated, setAuthSession } from "@/lib/auth-session";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isUserAuthenticated()) {
      router.replace("/dashboard");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

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
        setAuthSession({ identifier: data.identifier }, data.rememberMe);
        setFeedback(res.data.message || "تم تسجيل الدخول بنجاح");
        router.push("/dashboard");
      }
    } catch {
      setFeedback("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="w-full max-w-md mx-auto py-16 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#344230]/20 border-t-[#344230] animate-spin" />
        <span className="text-xs text-[#616E5D]">جاري التحقق من الجلسة...</span>
      </div>
    );
  }

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
              className="w-full h-12 pe-4 ps-12 rounded-2xl bg-white border border-[#E0E5D8]/80 text-sm text-[#182016] placeholder:text-[#9EA19A] placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#374732]/15 focus:border-[#374732] transition-all shadow-xs"
            />
            <div className="absolute start-4 flex items-center pointer-events-none text-[#75786F]">
              <AtSign className="w-[18px] h-[18px]" strokeWidth={1.8} />
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
              className="absolute end-4 flex items-center text-[#75786F] hover:text-[#273323] transition-colors focus:outline-none"
              tabIndex={-1}
              aria-label="تبديل إظهار كلمة المرور"
            >
              {showPassword ? (
                <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.8} />
              ) : (
                <Eye className="w-[18px] h-[18px]" strokeWidth={1.8} />
              )}
            </button>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••••••"
              className="w-full h-12 pe-12 ps-12 rounded-2xl bg-white border border-[#E0E5D8]/80 text-sm text-[#182016] placeholder:text-[#9EA19A] placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-[#374732]/15 focus:border-[#374732] transition-all shadow-xs text-start"
            />

            <div className="absolute start-4 flex items-center pointer-events-none text-[#75786F]">
              <Lock className="w-[18px] h-[18px]" strokeWidth={1.8} />
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
      <div className="p-4 sm:p-5 rounded-3xl bg-[#F1F5EB] flex items-center justify-between">
        {/* Right Metric in RTL */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center shrink-0 text-[#34422A]">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="text-start">
            <div className="text-sm font-bold text-[#172115] tracking-tight">
              +18,400 وحدة
            </div>
            <div className="text-xs text-[#717F6C]">
              تدار وتُشغّل نشطاً بالمنصة
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#E0E5D8]" />

        {/* Left Metric in RTL */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center shrink-0 text-[#34422A]">
            <SquareCheck className="w-5 h-5" />
          </div>
          <div className="text-start">
            <div className="text-sm font-bold text-[#172115] tracking-tight font-inter">
              99.98%
            </div>
            <div className="text-xs text-[#717F6C]">
              جاهزية واستقرار السيرفرات
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
