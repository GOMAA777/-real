import React from "react";

interface TableDateCellProps {
  date: string;
  relativeTime?: string;
  className?: string;
}

export function TableDateCell({
  date,
  relativeTime,
  className = "",
}: TableDateCellProps) {
  const parts = date.trim().split(" ");
  const dayAndMonth = parts.length >= 3 ? `${parts[0]} ${parts[1]}` : date;
  const year = parts.length >= 3 ? parts[2] : "";

  // Ensure relative time has parentheses (e.g. "(اليوم)") matching design exactly
  const formattedRelative = relativeTime
    ? relativeTime.startsWith("(") && relativeTime.endsWith(")")
      ? relativeTime
      : `(${relativeTime})`
    : null;

  const showRelative = Boolean(
    formattedRelative &&
      relativeTime !== dayAndMonth &&
      !relativeTime?.includes(parts[1] || "___")
  );

  return (
    <div
      className={`flex flex-col items-center justify-center text-center leading-tight select-none ${className}`}
    >
      <span className="text-xs text-[#615E59] font-medium leading-normal">
        {dayAndMonth}
      </span>
      {year && (
        <span className="text-xs text-[#615E59] font-medium leading-tight mt-0.5">
          {year}
        </span>
      )}
      {showRelative && (
        <span className="text-[11px] text-[#23896C] font-semibold leading-tight mt-0.5">
          {formattedRelative}
        </span>
      )}
    </div>
  );
}
