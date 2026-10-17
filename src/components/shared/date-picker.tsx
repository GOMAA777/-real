"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: string; // Format: "YYYY-MM-DD"
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const ARABIC_WEEKDAYS = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

export function DatePicker({
  value,
  onChange,
  placeholder = "اختر التاريخ...",
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial selected date or default to current date
  const parsedDate = value ? new Date(value + "T00:00:00") : null;
  const today = new Date();

  const [currentYear, setCurrentYear] = useState<number>(
    parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : today.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.getMonth() : today.getMonth()
  );

  const handleToggleOpen = () => {
    if (!isOpen && value) {
      const d = new Date(value + "T00:00:00");
      if (!isNaN(d.getTime())) {
        setCurrentYear(d.getFullYear());
        setCurrentMonth(d.getMonth());
      }
    }
    setIsOpen((prev) => !prev);
  };

  // Close calendar on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Calendar calculations
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    onChange(dateString);
    setIsOpen(false);
  };

  const handleSetToday = () => {
    const now = new Date();
    const formattedMonth = String(now.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(now.getDate()).padStart(2, "0");
    const dateString = `${now.getFullYear()}-${formattedMonth}-${formattedDay}`;
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    onChange(dateString);
    setIsOpen(false);
  };

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange("");
  };

  // Format display text in Arabic (e.g. 17 أكتوبر 2026)
  const getDisplayValue = () => {
    if (!value) return null;
    const d = new Date(value + "T00:00:00");
    if (isNaN(d.getTime())) return value;
    return `${d.getDate()} ${ARABIC_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!parsedDate || isNaN(parsedDate.getTime())) return false;
    return (
      day === parsedDate.getDate() &&
      currentMonth === parsedDate.getMonth() &&
      currentYear === parsedDate.getFullYear()
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button Input */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleToggleOpen();
          }
        }}
        className={cn(
          "w-full h-10 px-3 text-xs text-[#172115] bg-white border rounded-xl flex items-center justify-between cursor-pointer select-none transition-all shadow-2xs group",
          isOpen
            ? "border-[#34432E] ring-1 ring-[#34432E]"
            : "border-[#CCD5C5] hover:border-[#34432E]",
          className
        )}
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarIcon className="w-4 h-4 text-[#7D8A78] shrink-0 group-hover:text-[#34432E] transition-colors" />
          {value ? (
            <span className="font-bold text-[#172115] truncate">
              {getDisplayValue()}
            </span>
          ) : (
            <span className="text-[#8D9B88] truncate">{placeholder}</span>
          )}
        </div>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="w-5 h-5 rounded-md hover:bg-[#EEF2E6] text-[#7D8A78] hover:text-[#DC2626] flex items-center justify-center transition-colors shrink-0"
            title="مسح التاريخ"
            aria-label="مسح التاريخ"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Popover Calendar Dropdown */}
      {isOpen && (
        <div
          dir="rtl"
          className="absolute z-50 top-full mt-2 start-0 w-[290px] bg-white rounded-2xl border border-[#E2E6DC] shadow-xl p-3.5 space-y-3 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Calendar Header: Month, Year, and Nav Arrows */}
          <div className="flex items-center justify-between pb-2 border-b border-[#EEF2E6]">
            {/* Previous Month in RTL (Arrow Right) */}
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-7 h-7 rounded-lg hover:bg-[#F4F6F0] text-[#34432E] flex items-center justify-center transition-colors cursor-pointer"
              title="الشهر السابق"
              aria-label="الشهر السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Current Month & Year Display */}
            <div className="text-xs font-bold text-[#172115] flex items-center gap-1.5 select-none">
              <span>{ARABIC_MONTHS[currentMonth]}</span>
              <span className="text-[#7D8A78]">{currentYear}</span>
            </div>

            {/* Next Month in RTL (Arrow Left) */}
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-7 h-7 rounded-lg hover:bg-[#F4F6F0] text-[#34432E] flex items-center justify-center transition-colors cursor-pointer"
              title="الشهر القادم"
              aria-label="الشهر القادم"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Weekdays Row */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {ARABIC_WEEKDAYS.map((wd) => (
              <div
                key={wd}
                className="text-[10px] font-bold text-[#7D8A78] py-1 select-none"
              >
                {wd}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Days of previous month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => {
              const dayNum = daysInPrevMonth - firstDayOfMonth + i + 1;
              return (
                <div
                  key={`prev-${i}`}
                  className="w-8 h-8 flex items-center justify-center text-[11px] text-[#CCD5C5] select-none"
                >
                  {dayNum}
                </div>
              );
            })}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const selected = isSelected(dayNum);
              const todayDate = isToday(dayNum);

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  onClick={() => handleSelectDay(dayNum)}
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold transition-all cursor-pointer select-none",
                    selected
                      ? "bg-[#34432E] text-white font-bold shadow-xs hover:bg-[#2A3725]"
                      : todayDate
                      ? "bg-[#EEF2E6] text-[#34432E] font-bold border border-[#CCD5C5] hover:bg-[#E2EAE0]"
                      : "text-[#172115] hover:bg-[#F6F8F4] hover:text-[#34432E]"
                  )}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Calendar Footer: Clear & Today */}
          <div className="flex items-center justify-between pt-2 border-t border-[#EEF2E6] text-xs">
            <button
              type="button"
              onClick={() => handleClear()}
              className="text-[11px] font-medium text-[#7D8A78] hover:text-[#DC2626] transition-colors cursor-pointer select-none"
            >
              مسح
            </button>
            <button
              type="button"
              onClick={handleSetToday}
              className="text-[11px] font-bold text-[#34432E] hover:underline transition-colors cursor-pointer select-none"
            >
              اليوم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
