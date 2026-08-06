"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormTextareaAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
}

export function FormTextareaAtom({
  control,
  name,
  placeholder,
  disabled,
  isInvalid,
  maxLength,
  rows = 4,
  className,
}: FormTextareaAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <textarea
            {...field}
            value={field.value ?? ""}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            className={cn(
              "w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all resize-none",
              maxLength && "pb-6",
              disabled && "opacity-60 cursor-not-allowed",
              className
            )}
            style={{
              background: disabled ? "var(--background-page)" : "var(--background-card)",
              border: isInvalid
                ? "1.5px solid var(--error-300)"
                : "1.5px solid var(--background-stroke)",
              color: "var(--font-default)",
            }}
          />
          {maxLength && (
            <span
              className="absolute bottom-2 right-3 text-xs pointer-events-none"
              style={{ color: "var(--font-vector)" }}
            >
              {String(field.value ?? "").length}/{maxLength}
            </span>
          )}
        </div>
      )}
    />
  );
}
