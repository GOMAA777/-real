"use client";

import { ShieldCheck, BookmarkCheck } from "lucide-react";
import { FloatingConfirmationBar } from "@/components/shared/floating-confirmation-bar";

interface FormFooterBarProps {
  onSaveDraft: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function FormFooterBar({
  onSaveDraft,
  onCancel,
  onSave,
}: FormFooterBarProps) {
  return (
    <FloatingConfirmationBar
      noteText="جميع التعديلات تخضع لتوثيق فوري في سجل التدقيق ومزامنة الأقفال الرقمية."
      noteIcon={ShieldCheck}
      actions={[
        {
          label: "إلغاء",
          onClick: onCancel,
          variant: "secondary",
        },
        {
          label: "حفظ كمسودة",
          onClick: onSaveDraft,
          variant: "draft",
        },
        {
          label: "حفظ التعديلات",
          onClick: onSave,
          variant: "primary",
          icon: BookmarkCheck,
          iconPosition: "end",
        },
      ]}
    />
  );
}
