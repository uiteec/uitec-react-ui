"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function maskTime(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 4);
  const hh = n.slice(0, 2);
  const mm = n.slice(2, 4);
  if (n.length > 2) return `${hh}:${mm}`;
  return hh;
}

interface FormTimepickerAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormTimepickerAtom({ control, name, placeholder = "HH:MM", disabled, isInvalid, className }: FormTimepickerAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          value={field.value ?? ""}
          onChange={(e) => field.onChange(maskTime(e.target.value))}
          onBlur={field.onBlur}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={5}
          className={cn("w-full h-10 px-3 rounded-lg text-sm outline-none transition-all", disabled && "opacity-60 cursor-not-allowed", className)}
          style={{
            background: disabled ? "var(--background-page)" : "var(--background-card)",
            border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
            color: "var(--font-default)",
          }}
        />
      )}
    />
  );
}
