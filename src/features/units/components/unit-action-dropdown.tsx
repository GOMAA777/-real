"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MoreVertical, Eye } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Unit } from "../types";

// Exact Calendar with Pencil icon matching Image 2
function CalendarEditIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 11V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
      <path d="M3 10h18" />
      <path d="M18.5 14.5a1.5 1.5 0 0 1 2.12 2.12l-4.24 4.24a1 1 0 0 1-.45.26l-2.43.49.49-2.43a1 1 0 0 1 .26-.45l4.25-4.23z" />
    </svg>
  );
}

interface UnitActionDropdownProps {
  unit: Unit;
}

export function UnitActionDropdown({ unit }: UnitActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 224; // w-56 = 14rem = 224px
    const estimatedHeight = 8 * 42 + 20;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Flip upwards if not enough space below AND there is room above
    const openUp = spaceBelow < estimatedHeight + 12 && spaceAbove > spaceBelow;

    // In RTL tables, the 3-dots button is on the left edge.
    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    if (openUp) {
      setCoords({
        bottom: Math.max(10, window.innerHeight - rect.top + 6),
        left,
      });
    } else {
      setCoords({
        top: Math.max(10, rect.bottom + 6),
        left,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleScrollOrResize() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setIsOpen(false);
      } else {
        updatePosition();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    {
      label: "تفاصيل الوحدة",
      icon: Eye,
      isHighlighted: true,
      href: `/dashboard/units/${unit.id}`,
      onClick: () => toast.info(`تفاصيل الوحدة رقم: ${unit.unitNumber}`),
    },
    {
      label: "تعديل الوحدة",
      icon: CalendarEditIcon,
      href: `/dashboard/units/new`,
      onClick: () => toast.info(`تعديل بيانات الوحدة رقم: ${unit.unitNumber}`),
    },
    {
      label: "عرض العقار",
      icon: Eye,
      href: `/dashboard/properties/${unit.propertyId}`,
      onClick: () => toast.info(`عرض عقار: ${unit.propertyName}`),
    },
    {
      label: "عرض المالك",
      icon: Eye,
      href: `/dashboard/owners/${unit.ownerId}`,
      onClick: () => toast.info(`عرض مالك: ${unit.ownerName}`),
    },
    {
      label: "عرض الحجوزات",
      icon: Eye,
      href: `/dashboard/bookings?unit=${unit.unitNumber}`,
      onClick: () => toast.info(`عرض حجوزات الوحدة رقم: ${unit.unitNumber}`),
    },
    {
      label: "إدارة كود الدخول",
      icon: Eye,
      href: `/dashboard/units/${unit.id}`,
      onClick: () => toast.info(`إدارة كود الدخول للوحدة: ${unit.unitNumber}`),
    },
    {
      label: "عرض سجل العمليات",
      icon: Eye,
      href: `/dashboard/units/${unit.id}`,
      onClick: () => toast.info(`سجل العمليات للوحدة: ${unit.unitNumber}`),
    },
    {
      label: "عرض سجل النشاط",
      icon: Eye,
      href: `/dashboard/units/${unit.id}`,
      onClick: () => toast.info(`سجل النشاط للوحدة: ${unit.unitNumber}`),
    },
  ];

  return (
    <>
      {/* Trigger Button: 3 Vertical Dots */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleDropdown}
        aria-label="خيارات الوحدة"
        aria-expanded={isOpen}
        className={cn(
          "w-8 h-8 rounded-full border border-transparent hover:border-[#D5DDD0] hover:bg-[#EEF2E6] text-[#7D8A78] hover:text-[#172115] inline-flex items-center justify-center transition-all cursor-pointer select-none",
          isOpen && "bg-[#EEF2E6] text-[#172115] border-[#CCD5C5] shadow-2xs"
        )}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {/* Popover Dropdown Menu rendered via Portal: 100% fidelity to Image 2 */}
      {isMounted && isOpen && coords &&
        createPortal(
          <div
            ref={menuRef}
            dir="rtl"
            style={{
              position: "fixed",
              ...(coords.top !== undefined ? { top: `${coords.top}px` } : {}),
              ...(coords.bottom !== undefined ? { bottom: `${coords.bottom}px` } : {}),
              left: `${coords.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-56 bg-white rounded-2xl p-2 border border-[#E2E6DC] shadow-[0_12px_32px_rgba(0,0,0,0.14)] z-[9999] animate-in fade-in zoom-in-95 duration-150 space-y-1"
          >
            {menuItems.map((item, idx) => {
              const Icon = item.icon;

              const itemClasses = cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none text-start",
                item.isHighlighted
                  ? "bg-[#EEF2E6] text-[#34432E] font-bold"
                  : "text-[#172115] hover:bg-[#F4F6F0]"
              );

              const content = (
                <>
                  {/* Icon on Right in RTL */}
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      item.isHighlighted ? "text-[#34432E]" : "text-[#172115]"
                    )}
                  />
                  {/* Label on Left of icon */}
                  <span className="truncate">{item.label}</span>
                </>
              );

              if (item.href) {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      if (item.onClick) item.onClick();
                    }}
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
          </div>,
          document.body
        )}
    </>
  );
}
