"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import { Search, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. CIRCLE ICON BUTTON (From the 4 Circular Action Buttons in Design Spec)
// ============================================================================
export interface CircleIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "destructive" | "neutral";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}

export const CircleIconButton = forwardRef<HTMLButtonElement, CircleIconButtonProps>(
  ({ className, variant = "primary", size = "md", icon: Icon, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8 rounded-full",
      md: "w-10 h-10 rounded-full",
      lg: "w-12 h-12 rounded-full",
    }[size];

    const iconSizeClasses = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }[size];

    const variantClasses = {
      // Circle 1: Dark olive green (Wand / Magic / Action)
      primary: "bg-[#4B5940] hover:bg-[#3E4A35] text-white shadow-xs",
      // Circle 2: Warm brown / Sand tone (Shapes / Categories / Units)
      secondary: "bg-[#7C694E] hover:bg-[#68573F] text-white shadow-xs",
      // Circle 3: Deep pine olive (Tag / Prices / Filters)
      tertiary: "bg-[#303A2C] hover:bg-[#232B20] text-white shadow-xs",
      // Circle 4: Rich Crimson Red (Trash / Delete / Danger)
      destructive: "bg-[#C02828] hover:bg-[#A31F1F] text-white shadow-xs",
      // Neutral: Dark Charcoal Olive
      neutral: "bg-[#252A24] hover:bg-[#1A1E19] text-white shadow-xs",
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center shrink-0 transition-all select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          sizeClasses,
          variantClasses,
          className
        )}
        {...props}
      >
        {Icon ? <Icon className={iconSizeClasses} /> : children}
      </button>
    );
  }
);
CircleIconButton.displayName = "CircleIconButton";

// ============================================================================
// 2. SQUARE ROUNDED ICON BUTTON (From Bottom-Center of Design Spec)
// ============================================================================
export interface SquareIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}

export const SquareIconButton = forwardRef<HTMLButtonElement, SquareIconButtonProps>(
  ({ className, size = "md", icon: Icon, children, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8 rounded-lg",
      md: "w-10 h-10 rounded-xl",
      lg: "w-12 h-12 rounded-2xl",
    }[size];

    const iconSizeClasses = {
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center shrink-0 bg-[#4B5940] hover:bg-[#3E4A35] text-white shadow-xs transition-all select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          sizeClasses,
          className
        )}
        {...props}
      >
        {Icon ? <Icon className={iconSizeClasses} /> : children}
      </button>
    );
  }
);
SquareIconButton.displayName = "SquareIconButton";

// ============================================================================
// 3. ICON + LABEL BUTTON (Pill style button with icon + text)
// ============================================================================
export interface IconLabelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  label: string;
}

export const IconLabelButton = forwardRef<HTMLButtonElement, IconLabelButtonProps>(
  ({ className, icon: Icon, label, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "h-10 px-4 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white font-cairo font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs transition-all select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          className
        )}
        {...props}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </button>
    );
  }
);
IconLabelButton.displayName = "IconLabelButton";

// ============================================================================
// 4. DESIGN SYSTEM SEARCH INPUT (From Top Right of Design Spec)
// ============================================================================
export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  containerClassName?: string;
}

export const DesignSystemSearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(({ className, containerClassName, placeholder = "Search", ...props }, ref) => {
  return (
    <div className={cn("relative w-full", containerClassName)}>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full h-10 ps-10 pe-4 rounded-xl bg-[#EAEFE6] border border-[#CCD4C6] text-xs sm:text-sm text-[#252A24] placeholder:text-[#727A6E] font-cairo focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 transition-all shadow-2xs",
          className
        )}
        {...props}
      />
      <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727A6E]">
        <Search className="w-4 h-4" />
      </div>
    </div>
  );
});
DesignSystemSearchInput.displayName = "DesignSystemSearchInput";

// ============================================================================
// 5. FLOATING NAV / PILL BAR (From Middle Right of Design Spec)
// ============================================================================
export interface FloatingNavItem {
  id: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  label?: string;
  onClick?: () => void;
}

export function FloatingNavPillBar({
  items,
  activeId,
  onSelect,
  className,
}: {
  items: FloatingNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 p-1.5 rounded-full bg-[#E6ECE2] border border-[#D8DFD3] shadow-xs select-none",
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              item.onClick?.();
              onSelect?.(item.id);
            }}
            title={item.label}
            aria-label={item.label}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer",
              isActive
                ? "bg-[#4B5940] text-white shadow-xs scale-100"
                : "text-[#252A24] hover:text-[#4B5940] hover:bg-white/40"
            )}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// 6. DESIGN SYSTEM ACCENT / PROGRESS BARS (From Middle Center of Design Spec)
// ============================================================================
export function DesignSystemAccentBars({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2.5 w-full max-w-xs", className)}>
      {/* Top Bar: Primary (#4B5940) */}
      <div className="h-2 w-full bg-[#E2E7DE] rounded-full overflow-hidden">
        <div className="h-full bg-[#4B5940] rounded-full w-3/4" />
      </div>
      {/* Middle Bar: Secondary Khaki / Brown (#7C694E) */}
      <div className="h-2 w-full bg-[#E2E7DE] rounded-full overflow-hidden">
        <div className="h-full bg-[#7C694E] rounded-full w-5/6" />
      </div>
      {/* Bottom Bar: Tertiary Pine (#303A2C) */}
      <div className="h-2 w-full bg-[#E2E7DE] rounded-full overflow-hidden">
        <div className="h-full bg-[#303A2C] rounded-full w-1/2" />
      </div>
    </div>
  );
}
