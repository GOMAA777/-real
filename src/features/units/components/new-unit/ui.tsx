import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { C } from "./theme";

/** Card shell with the numbered badge at the start (right) of the header. */
export function SectionCard({
  number,
  title,
  required,
  trailing,
  children,
  className,
}: {
  number: string;
  title: string;
  required?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "bg-white rounded-[12px] p-5 shadow-[0_1px_2px_rgba(24,29,23,0.035)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-6 h-6 shrink-0 rounded-[7px] bg-[#EEF2E8] text-[10.5px] font-bold text-[#7C8773] flex items-center justify-center">
            {number}
          </span>
          <h2 className="text-[18px] font-bold text-[#181D17] truncate">
            {title}
            {required ? (
              <span className="text-[#E5484D] ms-1.5">*</span>
            ) : null}
          </h2>
        </div>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Radio indicator: empty ring or filled dark dot. */
export function RadioDot({
  selected,
  small,
  className,
}: {
  selected: boolean;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center transition-colors",
        small ? "w-3.5 h-3.5" : "w-[18px] h-[18px]",
        selected
          ? small
            ? "border-[1.5px] border-[#34422A]"
            : "border-[2px] border-[#34422A]"
          : small
            ? "border-[1.2px] border-[#A8B29E]"
            : "border-[1.5px] border-[#A8B29E]",
        className
      )}
    >
      {selected ? (
        <span
          className={cn(
            "rounded-full bg-[#34422A]",
            small ? "w-[7px] h-[7px]" : "w-[9px] h-[9px]"
          )}
        />
      ) : null}
    </span>
  );
}

/** Green circled tick used across the form. */
export function TickIcon({
  className = "w-4 h-4",
  color = C.green,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.6" stroke={color} strokeWidth="1.4" />
      <path
        d="M5 8.2L7 10.1L11 5.9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Sage inner panel used by the owner / property / status cards. */
export function InnerPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-[#F1F5EB] rounded-[12px] p-4", className)}>
      {children}
    </div>
  );
}

/** Light info panel used inside pricing / occupancy. */
export function InfoPanel({
  icon,
  title,
  iconTile = true,
  className,
  children,
}: {
  icon?: ReactNode;
  title?: string;
  iconTile?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-[#F0F5EF] rounded-[12px] p-4 flex items-start gap-3",
        className
      )}
    >
      {icon ? (
        iconTile ? (
          <span className="w-8 h-8 shrink-0 rounded-[9px] bg-[#E3EAD7] flex items-center justify-center text-[#3F4A36]">
            {icon}
          </span>
        ) : (
          <span className="shrink-0 text-[#3F4A36] mt-0.5">{icon}</span>
        )
      ) : null}
      <div className="min-w-0 text-[12px] leading-[19px] text-[#4A5440]">
        {title ? (
          <p className="text-[12.5px] font-bold text-[#181D17] mb-0.5">{title}</p>
        ) : null}
        <div>{children}</div>
      </div>
    </div>
  );
}

/** Muted caption with a leading glyph. */
export function CaptionLine({
  icon,
  children,
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-1.5 text-[11px] text-[#8A9384] leading-[17px]",
        className
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
    </p>
  );
}
