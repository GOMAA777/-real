"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";
import { ConfirmDialog, type ConfirmDialogProps } from "@/components/shared/confirm-dialog";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => Promise<void> | void;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    options: ConfirmOptions;
    loading: boolean;
    errorMessage: string | null;
  }>({
    open: false,
    options: { message: "" },
    loading: false,
    errorMessage: null,
  });

  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialogState({
        open: true,
        options,
        loading: false,
        errorMessage: null,
      });
    });
  }, []);

  const handleCancel = useCallback(() => {
    if (dialogState.loading) return;
    setDialogState((prev) => ({ ...prev, open: false, errorMessage: null }));
    if (resolverRef.current) {
      resolverRef.current(false);
      resolverRef.current = null;
    }
  }, [dialogState.loading]);

  const handleConfirm = useCallback(async () => {
    const { onConfirm } = dialogState.options;

    if (onConfirm) {
      try {
        setDialogState((prev) => ({ ...prev, loading: true, errorMessage: null }));
        await onConfirm();
        setDialogState((prev) => ({ ...prev, open: false, loading: false }));
        if (resolverRef.current) {
          resolverRef.current(true);
          resolverRef.current = null;
        }
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "حدث خطأ أثناء معالجة الإجراء، يرجى المحاولة مرة أخرى.";
        setDialogState((prev) => ({
          ...prev,
          loading: false,
          errorMessage: errorMsg,
        }));
      }
    } else {
      setDialogState((prev) => ({ ...prev, open: false, errorMessage: null }));
      if (resolverRef.current) {
        resolverRef.current(true);
        resolverRef.current = null;
      }
    }
  }, [dialogState.options]);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        open={dialogState.open}
        title={dialogState.options.title}
        message={dialogState.options.message}
        confirmLabel={dialogState.options.confirmLabel}
        cancelLabel={dialogState.options.cancelLabel}
        variant={dialogState.options.variant}
        loading={dialogState.loading}
        errorMessage={dialogState.errorMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context.confirm;
}
