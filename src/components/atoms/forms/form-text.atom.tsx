"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormTextAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  maxLength?: number;
  className?: string;
}

export function FormTextAtom({
  control,
  name,
  placeholder,
  disabled,
  isInvalid,
  maxLength,
  className,
}: FormTextAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          {...field}
          value={field.value ?? ""}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            "w-full h-10 px-3 rounded-lg text-sm outline-none transition-all",
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
      )}
    />
  );
}
