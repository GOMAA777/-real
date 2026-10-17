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
            "group toast select-none cursor-grab active:cursor-grabbing group-[.toaster]:bg-white group-[.toaster]:text-[#172115] group-[.toaster]:border-[#E2E6DC] group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:border group-[.toaster]:font-sans overflow-visible",
          description:
            "group-[.toast]:text-[#7D8A78] group-[.toast]:text-xs group-[.toast]:mt-1 font-sans leading-relaxed",
          actionButton:
            "group-[.toast]:bg-[#34432E] group-[.toast]:text-white group-[.toast]:rounded-xl group-[.toast]:font-bold group-[.toast]:text-xs",
          cancelButton:
            "group-[.toast]:bg-[#F4F6F0] group-[.toast]:text-[#172115] group-[.toast]:rounded-xl group-[.toast]:text-xs",
          closeButton:
            "!-top-2.5 !-left-2.5 !right-auto !bottom-auto !transform-none !bg-white !text-[#5C6A57] hover:!text-[#172115] hover:!bg-[#F4F6F0] !border !border-[#CCD5C5] !shadow-md !cursor-pointer !w-6 !h-6 !rounded-full !flex !items-center !justify-center !transition-all !z-20",
          info: "group-[.toaster]:border-[#CCD5C5]",
        },
      }}
      {...props}
    />
  );
}
