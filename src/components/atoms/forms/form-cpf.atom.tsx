"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function maskCPF(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  return n
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

interface FormCPFAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormCPFAtom({ control, name, placeholder = "___.___.___-__", disabled, isInvalid, className }: FormCPFAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          value={field.value ?? ""}
          onChange={(e) => field.onChange(maskCPF(e.target.value))}
          onBlur={field.onBlur}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={14}
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
