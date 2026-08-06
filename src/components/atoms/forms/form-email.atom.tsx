"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormEmailAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormEmailAtom({
  control,
  name,
  placeholder,
  disabled,
  isInvalid,
  className,
}: FormEmailAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          {...field}
          value={field.value ?? ""}
          onChange={(e) => field.onChange(e.target.value.toLowerCase())}
          type="email"
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="email"
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
