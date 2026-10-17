"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { registerSchema, type RegisterInput } from "../schemas/register.schema";
import { registerAction } from "../actions/register.action";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const passwordValue = useWatch({ control, name: "password" });
  const confirmPasswordValue = useWatch({ control, name: "confirmPassword" });
  const passwordsMatch =
    Boolean(passwordValue) &&
    Boolean(confirmPasswordValue) &&
    passwordValue === confirmPasswordValue;

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await registerAction(data);
      if (res?.data?.success) {
        setFeedback(res.data.message || "تم إنشاء الحساب بنجاح");
      }
    } catch {
      setFeedback("حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-7">
      {/* Form Title & Subtitle */}
      <div className="space-y-2 text-center sm:text-start">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172115] tracking-tight">
          إنشاء حساب جديد
        </h1>
        <p className="text-xs sm:text-sm text-[#616E5D] leading-relaxed">
          ابدأ بإدارة تطبيق عقاراتك، تدفقاتك المالية بمرونة فائقة
        </p>
      </div>

      {feedback && (
        <div className="p-3 text-xs rounded-xl bg-[#E8ECE2] border border-[#CCD4C5] text-[#2C3829] font-medium">
          {feedback}
        </div>
      )}

      {/* Main Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1: Full Name & Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-[#273323]"
            >
              الاسم الكامل
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              placeholder="عبد العزيز بن محمد آل مقرن"
              className="w-full h-12 px-4 rounded-xl bg-white border border-[#E0E4D8] text-sm text-[#182016] placeholder:text-[#9BA596] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#374732]/20 focus:border-[#374732] transition-all shadow-xs"
            />
            {errors.fullName && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-password"
              className="block text-xs font-semibold text-[#273323]"
            >
              كلمة المرور
            </label>
            <div className="relative flex items-center">
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
                id="reg-password"
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
        </div>

        {/* Row 2: Email & Confirm Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-[#273323]"
            >
              البريد الإلكتروني المعتمد
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              dir="ltr"
              placeholder="name@company.sa"
              className="w-full h-12 px-4 rounded-xl bg-white border border-[#E0E4D8] text-sm text-[#182016] placeholder:text-[#9BA596] placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#374732]/20 focus:border-[#374732] transition-all shadow-xs text-end"
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Confirm Password with Match Badge */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-[#273323]"
              >
                تأكيد كلمة المرور
              </label>
              {passwordsMatch && (
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C7A39]">
                  <Check className="w-3.5 h-3.5" />
                  <span>متطابقة</span>
                </div>
              )}
            </div>

            <div className="relative flex items-center">
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••••••"
                className="w-full h-12 pe-4 ps-11 rounded-xl bg-white border border-[#E0E4D8] text-sm text-[#182016] placeholder:text-[#9BA596] placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-[#374732]/20 focus:border-[#374732] transition-all shadow-xs text-start"
              />

              <div className="absolute start-3.5 flex items-center pointer-events-none text-[#2C7A39]">
                <Check className="w-4 h-4" />
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-[#273323]"
          >
            رقم الجوال
          </label>
          <div className="flex items-center rounded-xl bg-white border border-[#E0E4D8] focus-within:ring-2 focus-within:ring-[#374732]/20 focus-within:border-[#374732] transition-all shadow-xs overflow-hidden">
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              dir="ltr"
              placeholder="501234567"
              className="flex-1 h-12 px-4 text-sm text-[#182016] placeholder:text-[#9BA596] placeholder:text-xs focus:outline-none text-end"
            />
            <div className="h-12 px-3.5 bg-[#F4F6F0] border-s border-[#E0E4D8] text-xs font-semibold text-[#4A5745] flex items-center justify-center select-none">
              +966
            </div>
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#4D5A49] leading-relaxed">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-0.5 w-4 h-4 rounded border-[#D3D8CB] text-[#374732] accent-[#374732] focus:ring-[#374732] shrink-0"
            />
            <span>
              أوافق على الشروط والأحكام وسياسة حماية البيانات والخصوصية المتبعة لدى
              منصة ابراج.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-[11px] text-red-600 font-medium mt-1">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 mt-4 rounded-xl bg-[#344230] hover:bg-[#283424] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
        >
          <span>{isSubmitting ? "جاري إنشاء الحساب..." : "متابعة إنشاء الحساب"}</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </form>

      {/* Switch to Login link */}
      <div className="text-center text-xs text-[#5D6B59] pt-1">
        <span>لديك حساب بالفعل؟ </span>
        <Link
          href="/login"
          className="font-bold text-[#182016] hover:underline"
        >
          تسجيل الدخول إلى البوابة
        </Link>
      </div>
    </div>
  );
}
