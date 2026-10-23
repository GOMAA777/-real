"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  fromIndex: number;
  toIndex: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  entityName: string; // e.g. "عقار", "مالك", "حجز", "فاتورة"
  pluralEntityName?: string; // e.g. "عقارات", "ملاك", "حجوزات", "فواتير"
  registeredLabel?: string; // e.g. "مسجل" or "مسجلة", defaults to "مسجل"
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalCount,
  fromIndex,
  toIndex,
  pageSize,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  entityName,
  pluralEntityName,
  registeredLabel = "مسجل",
  className,
}: TablePaginationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const safeTotalPages = Math.max(1, totalPages);
  const safeActivePage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const plural = pluralEntityName || entityName;

  // Sliding window of visible pages
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (current >= total - 2) {
      return [total - 4, total - 3, total - 2, total - 1, total];
    }
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  const visiblePages = getVisiblePages(safeActivePage, safeTotalPages);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "p-4 sm:px-6 border-t border-[#EEF2E6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D8A78]",
        className
      )}
    >
      {/* Right Side in RTL: Item Count & Rows Per Page Dropdown */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 font-medium">
        <span>
          عرض {fromIndex} إلى {toIndex} من أصل {totalCount} {entityName} {registeredLabel}
        </span>

        <span className="hidden sm:inline-block w-px h-4 bg-[#CCD5C5]/70" />

        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[#7D8A78]">الصفوف لكل صفحة:</span>
          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-[#E2E6DC] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#172115] flex items-center gap-1.5 shadow-2xs hover:bg-[#F9FAF7] transition-all cursor-pointer select-none"
            >
              <span>
                {pageSize} {plural}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7D8A78]" />
            </button>

            {/* Dropdown Menu (Opens upwards to prevent overflow clipping) */}
            {isOpen && (
              <div
                ref={menuRef}
                className="absolute start-0 bottom-full mb-1.5 w-32 bg-white border border-[#E2E6DC] rounded-xl shadow-lg py-1 z-30"
              >
                {pageSizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      onPageSizeChange(size);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-start px-3 py-1.5 text-xs transition-colors hover:bg-[#EEF2E6] cursor-pointer",
                      pageSize === size
                        ? "font-bold text-[#34432E] bg-[#EEF2E6]/50"
                        : "text-[#2C3825]"
                    )}
                  >
                    {size} {plural}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Left Side in RTL: Pagination Controls [السابق >]  [1]  [< التالي] */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button (Right in RTL) */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, safeActivePage - 1))}
          disabled={safeActivePage === 1}
          className={cn(
            "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
            safeActivePage === 1
              ? "opacity-40 cursor-not-allowed bg-white text-[#7D8A78]"
              : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
          )}
        >
          <span>السابق</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Dynamic Page Numbers */}
        {visiblePages.map((pageNum) => {
          const isActive = pageNum === safeActivePage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all select-none border border-[#CCD5C5] shadow-2xs cursor-pointer",
                isActive
                  ? "bg-[#EEF2E6] text-[#172115]"
                  : "bg-white text-[#7D8A78] hover:bg-[#F4F6F0] hover:text-[#172115]"
              )}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button (Left in RTL) */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, safeActivePage + 1))}
          disabled={safeActivePage === safeTotalPages}
          className={cn(
            "px-3.5 py-1.5 rounded-xl border border-[#CCD5C5] text-[#2C3825] flex items-center gap-1.5 font-medium text-xs transition-colors shadow-2xs select-none",
            safeActivePage === safeTotalPages
              ? "opacity-40 cursor-not-allowed bg-white text-[#7D8A78]"
              : "hover:bg-[#F4F6F0] cursor-pointer bg-white"
          )}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>التالي</span>
        </button>
      </div>
    </div>
  );
}
