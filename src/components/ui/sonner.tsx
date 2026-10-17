"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      dir="rtl"
      position="bottom-left"
      closeButton
      swipeDirections={["left", "right", "bottom"]}
      className="toaster group font-sans"
      toastOptions={{
        classNames: {
          toast:
            "group toast select-none cursor-grab active:cursor-grabbing group-[.toaster]:bg-white group-[.toaster]:text-[#172115] group-[.toaster]:border-[#E2E6DC] group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:font-sans",
          description:
            "group-[.toast]:text-[#7D8A78] group-[.toast]:text-xs group-[.toast]:mt-1 font-sans leading-relaxed",
          actionButton:
            "group-[.toast]:bg-[#34432E] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-bold group-[.toast]:text-xs",
          cancelButton:
            "group-[.toast]:bg-[#F4F6F0] group-[.toast]:text-[#172115] group-[.toast]:rounded-xl group-[.toast]:text-xs",
          closeButton:
            "!left-3 !right-auto !top-3 !transform-none !bg-white !text-[#7D8A78] hover:!text-[#172115] hover:!bg-[#F4F6F0] !border-[#E2E6DC] !shadow-2xs !cursor-pointer !w-6 !h-6 !rounded-full transition-colors",
          info: "group-[.toaster]:border-[#CCD5C5]",
        },
      }}
      {...props}
    />
  );
}
