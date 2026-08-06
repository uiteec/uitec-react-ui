"use client";

import { cn } from "@/lib/utils";
import { DateInputAtom } from "./date-input.atom";

export interface DateRangeInputValue {
  de: string;  // ISO yyyy-mm-dd
  ate: string; // ISO yyyy-mm-dd
}

interface DateRangeInputAtomProps {
  label?: string;
  value: DateRangeInputValue;
  onChange: (value: DateRangeInputValue) => void;
  disabled?: boolean;
  className?: string;
}

export function DateRangeInputAtom({ label, value, onChange, disabled, className }: DateRangeInputAtomProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <span className="text-xs font-semibold text-font-vector">{label}</span>}
      <div className="flex items-center gap-2">
        <DateInputAtom
          value={value.de}
          onChange={(de) => onChange({ ...value, de })}
          placeholder="De"
          disabled={disabled}
        />
        <span className="shrink-0 text-xs text-font-vector">até</span>
        <DateInputAtom
          value={value.ate}
          onChange={(ate) => onChange({ ...value, ate })}
          placeholder="Até"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
