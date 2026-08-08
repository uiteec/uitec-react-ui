"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaInputAtomProps {
  value:        string;
  onChange:     (value: string) => void;
  placeholder?: string;
  rows?:        number;
  disabled?:    boolean;
  isInvalid?:   boolean;
  className?:   string;
}

export const TextareaInputAtom = forwardRef<HTMLTextAreaElement, TextareaInputAtomProps>(function TextareaInputAtom({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled,
  isInvalid,
  className,
}, ref) {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={cn(
        "w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors",
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
});
