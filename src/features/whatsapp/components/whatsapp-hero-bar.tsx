"use client";

import Image from "next/image";
import { toast } from "sonner";

export function WhatsAppHeroBar() {
  const handleSync = () => {
    toast.info("جاري المزامنة اللحظية مع WhatsApp Cloud API...", {
      description: "زمن الاستجابة: 0.8s — جميع المحادثات والعمليات التشغيلية متزامنة بالكامل",
    });
  };

  return (
    <div
      className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#E2E6DC]/80 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-4"
      dir="rtl"
    >
      {/* Right side (RTL start): Title, Cloud API badge, and description */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold font-cairo text-[#181D17] tracking-tight">
            واتساب
          </h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-cairo bg-[#EAF1E8] text-[#4B5940] border border-[#D5E1D1]">
            Cloud API متصل
          </span>
        </div>
        <p className="text-sm font-normal font-cairo text-[#454840] leading-relaxed">
          محادثات وطلبات المستأجرين والنزلاء المرتبطة بالحجوزات والعمليات التشغيلية التلقائية.
        </p>
      </div>

      {/* Left side (RTL end): Real-time sync indicator */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={handleSync}
          className="bg-[#EBEFE6] hover:bg-[#E2E7DC] transition-colors flex items-center gap-2 px-3 py-1.5 rounded-[12px] cursor-pointer shadow-3xs"
          title="انقر لتحديث المزامنة"
        >
          <div className="w-3 h-3 relative shrink-0">
            <Image
              src="/assets/whatsapp/aea3990d2fd1ed794e65daeab59e7f4792082a91.svg"
              alt="Sync icon"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs font-semibold font-cairo text-[#454840]">
            مزامنة فورية للطلبات
          </span>
          <span className="text-[11px] font-bold font-cairo text-[#75786F] ps-1 border-s border-[#D5DDD0]">
            0.8s
          </span>
        </button>
      </div>
    </div>
  );
}
