"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function maskCRP(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 8);
  return n.replace(/(\d{2})(\d{0,6})/, (_, a, b) => b ? `${a}/${b}` : a);
}

interface FormCRPAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormCRPAtom({ control, name, placeholder = "__/______", disabled, isInvalid, className }: FormCRPAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          value={field.value ?? ""}
          onChange={(e) => field.onChange(maskCRP(e.target.value))}
          onBlur={field.onBlur}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={9}
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
