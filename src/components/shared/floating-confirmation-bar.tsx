"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, LucideIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DockingBottomBar } from "./docking-bottom-bar";

export interface FloatingActionButton {
  label: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "draft" | "danger" | "ghost";
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  iconPosition?: "start" | "end";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  className?: string;
}

export interface FloatingConfirmationBarProps {
  /**
   * Note text displayed on the right side in RTL.
   * Default: "جميع التعديلات تخضع لتوثيق فوري في سجل التدقيق ومزامنة الأقفال الرقمية."
   */
  noteText?: ReactNode;
  /**
   * Note icon displayed next to note text.
   * Default: ShieldCheck in #3E6F3A
   */
  noteIcon?: LucideIcon | React.ComponentType<{ className?: string }> | null;
  /**
   * Optional custom right-side content in RTL (overrides noteText & noteIcon)
   */
  rightContent?: ReactNode;
  /**
   * Array of action buttons to render on the left side in RTL
   */
  actions?: FloatingActionButton[];
  /**
   * Alternatively, pass custom buttons / elements as children
   */
  children?: ReactNode;
  /**
   * Additional classes for the floating card container
   */
  className?: string;
  /**
   * Classes for inner wrapper (default: "max-w-[1536px] mx-auto")
   */
  innerClassName?: string;
  /**
   * Docked class name override
   */
  dockedClassName?: string;
  /**
   * Floating class name override
   */
  floatingClassName?: string;
}

export function FloatingConfirmationBar({
  noteText = "جميع التعديلات تخضع لتوثيق فوري في سجل التدقيق ومزامنة الأقفال الرقمية.",
  noteIcon: NoteIcon = ShieldCheck,
  rightContent,
  actions,
  children,
  className,
  innerClassName = "max-w-[1536px] mx-auto",
  dockedClassName = "mt-8 mb-4",
  floatingClassName = "p-3 sm:p-4",
}: FloatingConfirmationBarProps) {
  const renderButton = (btn: FloatingActionButton, idx: number) => {
    const Icon = btn.icon;
    const isLoading = btn.loading;
    const isDisabled = btn.disabled || isLoading;

    let variantClasses =
      "px-6 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-3xs";

    switch (btn.variant) {
      case "primary":
        variantClasses = cn(
          variantClasses,
          "bg-[#2E3C29] hover:bg-[#232F1F] text-white shadow-sm disabled:opacity-70"
        );
        break;
      case "draft":
        variantClasses = cn(
          variantClasses,
          "bg-[#D6E2CE] hover:bg-[#CAD9C1] text-[#2E3C29] disabled:opacity-70"
        );
        break;
      case "danger":
        variantClasses = cn(
          variantClasses,
          "bg-[#FDE8E8] hover:bg-[#FCD2D2] text-[#DC2626] disabled:opacity-70"
        );
        break;
      case "ghost":
        variantClasses = cn(
          variantClasses,
          "bg-transparent hover:bg-[#EFF3EB] text-[#717E6E] hover:text-[#172115] shadow-none"
        );
        break;
      case "secondary":
      default:
        variantClasses = cn(
          variantClasses,
          "bg-[#EFF3EB] hover:bg-[#E2E8DD] text-[#2C3825] disabled:opacity-70"
        );
        break;
    }

    const content = (
      <div className="flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : Icon && btn.iconPosition !== "end" ? (
          <Icon className="w-4 h-4 text-current" />
        ) : null}

        <span>{isLoading && btn.loadingText ? btn.loadingText : btn.label}</span>

        {!isLoading && Icon && btn.iconPosition === "end" ? (
          <Icon className="w-4 h-4 text-current" />
        ) : null}
      </div>
    );

    if (btn.href) {
      return (
        <Link
          key={idx}
          href={btn.href}
          className={cn(variantClasses, btn.className)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        key={idx}
        type={btn.type || "button"}
        onClick={btn.onClick}
        disabled={isDisabled}
        className={cn(variantClasses, btn.className)}
      >
        {content}
      </button>
    );
  };

  return (
    <DockingBottomBar
      dockedClassName={dockedClassName}
      floatingClassName={floatingClassName}
      innerClassName={innerClassName}
    >
      <div
        dir="rtl"
        className={cn(
          "bg-white/95 backdrop-blur-md border border-[#E2E6DC] rounded-3xl px-5 sm:px-6 py-3.5 sm:py-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200",
          className
        )}
      >
        {/* Right side in RTL: Audit Note / Status / Info */}
        {rightContent ? (
          rightContent
        ) : (
          <div className="flex items-center gap-2.5 text-[#556650] text-xs sm:text-sm font-medium text-right">
            {NoteIcon && <NoteIcon className="w-5 h-5 text-[#3E6F3A] shrink-0" />}
            <span>{noteText}</span>
          </div>
        )}

        {/* Left side in RTL: Action Buttons */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 flex-wrap">
          {actions && actions.map((act, idx) => renderButton(act, idx))}
          {children}
        </div>
      </div>
    </DockingBottomBar>
  );
}

// Alias for convenience
export const FloatingActionBar = FloatingConfirmationBar;
