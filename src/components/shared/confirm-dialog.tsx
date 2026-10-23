"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertTriangle,
  HelpCircle,
  Loader2,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
  errorMessage?: string | null;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "إلغاء",
  variant = "default",
  loading = false,
  errorMessage,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const isDestructive = variant === "destructive";

  const defaultTitle = isDestructive
    ? "هل أنت متأكد من الحذف؟"
    : "هل أنت متأكد من تأكيد الإجراء؟";

  const defaultConfirmLabel = isDestructive ? "نعم، احذف" : "تأكيد ومتابعة";

  const IconComponent = isDestructive ? Trash2 : AlertCircle;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        open={open}
        onClose={loading ? undefined : onCancel}
        preventCloseOnBackdrop={true}
      >
        <div className="flex items-start gap-3.5">
          {/* Status Icon */}
          <div
            className={cn(
              "w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-xs",
              isDestructive
                ? "bg-[#FFDAD6] text-[#BA1A1A]"
                : "bg-[#F1F5EB] text-[#34422A] border border-[#DEE7D7]"
            )}
          >
            <IconComponent className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Texts */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <AlertDialogTitle className="text-[#181D17]">
              {title || defaultTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#454840]">
              {message}
            </AlertDialogDescription>
          </div>
        </div>

        {/* Error message banner if an error occurred during execution */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-[12px] bg-[#FFDAD6]/70 border border-[#BA1A1A]/20 flex items-center gap-2 text-xs font-semibold text-[#BA1A1A]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Footer Actions in RTL */}
        <AlertDialogFooter className="mt-6 flex-row items-center justify-start gap-2.5">
          {/* 1. Confirm Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (!loading) {
                onConfirm();
              }
            }}
            disabled={loading}
            className={cn(
              "h-11 px-6 rounded-[12px] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed select-none",
              isDestructive
                ? "bg-[#BA1A1A] hover:bg-[#961F12] text-white"
                : "bg-[#34422A] hover:bg-[#252F1E] text-white"
            )}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
            <span>{confirmLabel || defaultConfirmLabel}</span>
          </button>

          {/* 2. Cancel Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (!loading) {
                onCancel();
              }
            }}
            disabled={loading}
            className="h-11 px-5 rounded-[12px] bg-white hover:bg-[#F1F5EB] text-[#181D17] border border-[#CCD4C6] font-semibold text-sm transition-colors cursor-pointer shadow-3xs disabled:opacity-60 select-none"
          >
            {cancelLabel}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
