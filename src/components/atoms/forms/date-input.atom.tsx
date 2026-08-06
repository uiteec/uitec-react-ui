"use client";

import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const [yyyy, mm, dd] = iso.split("-");
  return yyyy && mm && dd ? `${dd}/${mm}/${yyyy}` : iso;
}

interface DateInputAtomProps {
  value: string; // ISO yyyy-mm-dd
  onChange: (value: string) => void; // ISO yyyy-mm-dd
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateInputAtom({ value, onChange, placeholder = "DD/MM/AAAA", disabled, className }: DateInputAtomProps) {
  const display = isoToDisplay(value);

  return (
    <div
      className={cn(
        "relative flex h-9 w-full items-center gap-2 rounded-lg border border-background-stroke bg-background-default px-3 transition-colors focus-within:border-primary-default",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {/* Display formatado DD/MM/AAAA */}
      <span className={cn("flex-1 select-none text-sm", display ? "text-font-default" : "text-font-vector")}>
        {display || placeholder}
      </span>
      <CalendarDays size={14} className="shrink-0 text-font-vector" />

      {/* Input transparente sobreposto — abre o calendário nativo ao clicar */}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
      />
    </div>
  );
}
