"use client";

import { cn } from "@/lib/utils";

export interface SelectInputOption {
  value: string;
  label: string;
}

interface SelectInputAtomProps {
  value:        string;
  onChange:     (value: string) => void;
  options:      SelectInputOption[];
  placeholder?: string;
  disabled?:    boolean;
  isInvalid?:   boolean;
  className?:   string;
}

export function SelectInputAtom({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  isInvalid,
  className,
}: SelectInputAtomProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors cursor-pointer",
        "text-font-default bg-background-default",
        isInvalid
          ? "border-error-300 focus:border-error-300"
          : "border-background-stroke focus:border-primary-pastel",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
