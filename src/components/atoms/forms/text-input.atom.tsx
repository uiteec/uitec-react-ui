"use client";

import { cn } from "@/lib/utils";

interface TextInputAtomProps {
  value:        string;
  onChange:     (value: string) => void;
  placeholder?: string;
  maxLength?:   number;
  disabled?:    boolean;
  isInvalid?:   boolean;
  className?:   string;
}

export function TextInputAtom({
  value,
  onChange,
  placeholder,
  maxLength,
  disabled,
  isInvalid,
  className,
}: TextInputAtomProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      className={cn(
        "w-full h-10 rounded-xl border px-3 text-sm outline-none transition-colors",
        "text-font-default placeholder:text-font-vector",
        "bg-background-default",
        isInvalid
          ? "border-error-300 focus:border-error-300"
          : "border-background-stroke focus:border-primary-pastel",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    />
  );
}
