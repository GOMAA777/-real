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
  const showRelative = Boolean(relativeTime && relativeTime !== dayAndMonth);

  return (
    <div
      className={`flex flex-col items-center justify-center text-center leading-tight ${className}`}
    >
      <span className="text-xs text-[#57534E] font-medium">{dayAndMonth}</span>
      {year && <span className="text-xs text-[#57534E]">{year}</span>}
      {showRelative && (
        <span className="text-[11px] text-[#23896C] font-medium mt-0.5">
          {relativeTime}
        </span>
      )}
    </div>
  );
}
