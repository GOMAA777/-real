"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface AlertDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, children }: AlertDialogProps) {
  if (!open) return null;
  return <>{children}</>;
}

interface AlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  preventCloseOnBackdrop?: boolean;
}

export function AlertDialogContent({
  children,
  className,
  onClose,
  preventCloseOnBackdrop = true,
  ...props
}: AlertDialogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on Escape only
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="alertdialog"
      aria-modal="true"
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-cairo select-none"
    >
      {/* Backdrop - ignores clicks strictly when preventCloseOnBackdrop is true */}
      <div
        className="absolute inset-0"
        onClick={(e) => {
          e.preventDefault();
          if (!preventCloseOnBackdrop && onClose) {
            onClose();
          }
        }}
      />

      {/* Dialog Surface */}
      <div
        ref={contentRef}
        className={cn(
          "relative bg-white rounded-[16px] max-w-[490px] w-full p-6 sm:p-7 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-[#E2E6DC] text-right z-10 transition-all",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-right", className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-start gap-2.5 pt-5",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg sm:text-[20px] font-bold text-[#181D17] leading-snug tracking-tight font-cairo",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm sm:text-[14px] text-[#54624C] leading-relaxed pt-1",
        className
      )}
      {...props}
    />
  );
}
