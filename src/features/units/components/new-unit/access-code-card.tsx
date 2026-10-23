"use client";

import { useState } from "react";
import { Clock3, KeyRound, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionCard, RadioDot } from "./ui";

export function AccessCodeCard() {
  const [mode, setMode] = useState<"temporary" | "static">("temporary");

  return (
    <SectionCard
      number="٦"
      title="سياسة كود الدخول الذكي"
      trailing={
        <span className="h-[26px] px-2.5 rounded-full bg-[#D8E8CB] text-[10.5px] font-bold text-[#2F5A22] flex items-center whitespace-nowrap">
          بوابة Tuya / TTlock الذكية
        </span>
      }
    >
      <span className="block text-[12.5px] font-bold text-[#181D17]">
        طريقة تفعيل كود الدخول للأقفال الرقمية
        <span className="text-[#E5484D] ms-1">*</span>
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3.5">
        {/* كود مؤقت لكل حجز */}
        <button
          type="button"
          onClick={() => setMode("temporary")}
          className={cn(
            "text-start rounded-[14px] p-4 transition-colors cursor-pointer border",
            mode === "temporary"
              ? "bg-[#EAF1E8] border-[#EAF1E8]"
              : "bg-white border-[#EDF1E6] hover:bg-[#FAFBF7]"
          )}
        >
          <span
            className={cn(
              "inline-flex h-5 px-2 rounded-full text-[10.5px] font-bold items-center",
              mode === "temporary"
                ? "bg-[#D3E6C0] text-[#2F6B24]"
                : "bg-[#EDF1E4] text-[#6E7864]"
            )}
          >
            يوصى به أمنيًا
          </span>
          <span className="flex items-center gap-2.5 mt-3">
            <RadioDot selected={mode === "temporary"} />
            <span className="text-[15.5px] font-bold text-[#181D17]">
              كود مؤقت لكل حجز
            </span>
          </span>
          <p className="text-[12px] leading-[19px] text-[#3F4A36] mt-2.5">
            يقوم النظام آليًا بإنشاء وتعيين كود دخول مؤقت فريد ومشفر لكل ضيف،
            يبدأ تفعيله حصرًا عند موعد تسجيل الدخول وينتهي تلقائيًا فور إتمام
            المغادرة عبر قفل الباب الذكي.
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-[#7C8773] mt-3">
            <span>إلغاء تنشيط فوري عند انتهاء الحجز أو الإلغاء</span>
            <Clock3 className="w-[13px] h-[13px] shrink-0" strokeWidth={1.8} />
          </p>
        </button>

        {/* كود تشغيلي ثابت */}
        <button
          type="button"
          onClick={() => setMode("static")}
          className={cn(
            "text-start rounded-[14px] p-4 transition-colors cursor-pointer border",
            mode === "static"
              ? "bg-[#EAF1E8] border-[#EAF1E8]"
              : "bg-white border-[#EDF1E6] hover:bg-[#FAFBF7]"
          )}
        >
          <span
            className={cn(
              "inline-flex h-5 px-2 rounded-full text-[10.5px] font-bold items-center",
              mode === "static"
                ? "bg-[#D3E6C0] text-[#2F6B24]"
                : "bg-[#EDF1E4] text-[#6E7864]"
            )}
          >
            مخصص للصيانة
          </span>
          <span className="flex items-center gap-2.5 mt-3">
            <RadioDot selected={mode === "static"} />
            <span className="text-[15.5px] font-bold text-[#181D17]">
              كود تشغيلي ثابت
            </span>
          </span>
          <p className="text-[12px] leading-[19px] text-[#3F4A36] mt-2.5">
            يتم تحديد رمز رئيسي دائم تديره إدارة المنصة ومالك العقار فقط
            لاستخدامات الإشراف الدوري، الصيانة، أو التأجير التعاقدي طويل الأمد
            بدون أتمتة زمنية.
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-[#7C8773] mt-3">
            <span>يتطلب إعادة ضبط يدوية دورية لدواعي الأمان</span>
            <KeyRound className="w-[13px] h-[13px] shrink-0" strokeWidth={1.8} />
          </p>
        </button>
      </div>

      {/* Security banner (inside the card, per reference) */}
      <div className="mt-5 bg-[#F5F1E8] rounded-[12px] p-4 flex items-start gap-3">
        <span className="w-8 h-8 shrink-0 rounded-[9px] bg-[#EBE4D4] flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-[#6B6249]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[12.5px] font-bold text-[#3F3A2E]">
            ملاحظة أمان وتشفير قياسي
          </h3>
          <p className="text-[11.5px] leading-[19px] text-[#6E7666] mt-1">
            لا يتم توليد أو إظهار أرقام الأقفال الفعلية في هذه الواجهة منعًا
            لتسرب البيانات. سيتكفل الخادم السحابي بتوليد الرمز وإرساله مشفرًا في
            رسالة الحجز الرسمية (SMS / WhatsApp) إلى النزيل قبل الوصول بساعتين
            فقط.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
