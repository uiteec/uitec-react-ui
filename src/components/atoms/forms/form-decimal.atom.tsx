"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function applyMask(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface FormDecimalAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormDecimalAtom({ control, name, placeholder = "0,00", disabled, isInvalid, className }: FormDecimalAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          value={field.value ? applyMask(String(field.value)) : ""}
          onChange={(e) => field.onChange(applyMask(e.target.value))}
          onBlur={field.onBlur}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          disabled={disabled}
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
