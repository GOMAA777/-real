"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Link from "next/link";
import { MoreVertical, MoreHorizontal, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionDropdownItem {
  label: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "active" | "destructive";
}

interface ActionDropdownProps {
  items: ActionDropdownItem[];
  triggerIcon?: "vertical" | "horizontal" | ReactNode;
  triggerClassName?: string;
  align?: "end" | "start" | "center";
  ariaLabel?: string;
}

export function ActionDropdown({
  items,
  triggerIcon = "vertical",
  triggerClassName,
  align = "end",
  ariaLabel = "خيارات إضافية",
}: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-right" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        className={cn(
          "w-8 h-8 rounded-xl hover:bg-[#EEF2E6] text-[#7D8A78] hover:text-[#172115] inline-flex items-center justify-center transition-all cursor-pointer select-none",
          isOpen && "bg-[#EEF2E6] text-[#172115]",
          triggerClassName
        )}
      >
        {triggerIcon === "vertical" ? (
          <MoreVertical className="w-4 h-4" />
        ) : triggerIcon === "horizontal" ? (
          <MoreHorizontal className="w-4 h-4" />
        ) : (
          triggerIcon
        )}
      </button>

      {/* Popover Menu matching exact target design */}
      {isOpen && (
        <div
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute top-full mt-1.5 w-48 sm:w-52 bg-white rounded-2xl p-2 border border-[#E2E6DC] shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1",
            align === "end" && "end-0",
            align === "start" && "start-0",
            align === "center" && "left-1/2 -translate-x-1/2"
          )}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isDestructive = item.variant === "destructive";
            const isActive = item.variant === "active";

            const itemClasses = cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none text-right",
              isDestructive
                ? "text-[#C93B2B] hover:bg-red-50 hover:text-red-700"
                : isActive
                ? "bg-[#EEF2E6] text-[#2E3C29] hover:bg-[#E5EAE0]"
                : "text-[#172115] hover:bg-[#EEF2E6] hover:text-[#2E3C29]"
            );

            const content = (
              <>
                {/* Icon on the Right (First child in RTL) */}
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 stroke-[2.2]",
                    isDestructive
                      ? "text-[#C93B2B]"
                      : isActive
                      ? "text-[#2E3C29]"
                      : "text-[#172115]"
                  )}
                />

                {/* Text on the Left (Second child in RTL) */}
                <span className="truncate">{item.label}</span>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={itemClasses}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (item.onClick) item.onClick();
                }}
                className={itemClasses}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
