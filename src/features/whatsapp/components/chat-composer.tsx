"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface ChatComposerProps {
  workerName?: string;
  onSendMessage: (text: string) => void;
}

export function ChatComposer({
  workerName = "أحمد السالم",
  onSendMessage,
}: ChatComposerProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleAttachment = () => {
    toast.info("إرفاق ملف أو صورة أو مستند تشغيلي عبر WhatsApp API", {
      description: "الامتدادات المدعومة: PNG, JPG, PDF, MP4 (بحد أقصى 16MB)",
    });
  };

  return (
    <div
      className="bg-white px-4 py-3 border-t border-[#E5EADF] shrink-0"
      dir="rtl"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-[#EBEFE6] rounded-[16px] p-1.5 flex items-center gap-2 border border-[#CCD5C5]/40 shadow-3xs">
          {/* 1. Attachment Button (Right side in RTL) */}
          <button
            type="button"
            onClick={handleAttachment}
            className="w-10 h-10 rounded-[12px] hover:bg-[#DFE4DB] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="إرفاق ملف أو صورة"
          >
            <div className="w-[10.5px] h-[16.5px] relative">
              <Image
                src="/assets/whatsapp/4ac25473961b9c278d8f078cc6b01b56989687f6.svg"
                alt="Attach"
                fill
                className="object-contain"
              />
            </div>
          </button>

          {/* 2. Text Input */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`اكتب رسالة أو استفساراً تشغيلياً للعامل ${workerName}...`}
              className="w-full bg-transparent px-2 py-1.5 text-sm font-normal font-cairo text-[#181D17] placeholder:text-[#75786F] focus:outline-none"
            />
          </div>

          {/* 3. Send Button (Left side in RTL) */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-[#34422A] hover:bg-[#283320] disabled:opacity-50 disabled:cursor-not-allowed text-white h-10 px-4 rounded-[12px] flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer shrink-0 font-cairo font-semibold text-xs"
          >
            <div className="w-[13px] h-[11px] relative shrink-0">
              <Image
                src="/assets/whatsapp/3af4893cad02703a8bb0d55375b7169d4dae9d7f.svg"
                alt="Send"
                fill
                className="object-contain"
              />
            </div>
            <span>إرسال</span>
          </button>
        </div>
      </form>
    </div>
  );
}
