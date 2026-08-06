"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function applyMask(v: string): string {
  const digits = v.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10) / 100;
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface FormCoinAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormCoinAtom({ control, name, placeholder = "0,00", disabled, isInvalid, className }: FormCoinAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none select-none"
            style={{ color: "var(--font-vector)" }}
          >
            R$
          </span>
          <input
            value={field.value ? applyMask(String(field.value)) : ""}
            onChange={(e) => field.onChange(applyMask(e.target.value))}
            onBlur={field.onBlur}
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            disabled={disabled}
            className={cn("w-full h-10 pl-9 pr-3 rounded-lg text-sm outline-none transition-all", disabled && "opacity-60 cursor-not-allowed", className)}
            style={{
              background: disabled ? "var(--background-page)" : "var(--background-card)",
              border: isInvalid ? "1.5px solid var(--error-300)" : "1.5px solid var(--background-stroke)",
              color: "var(--font-default)",
            }}
          />
        </div>
      )}
    />
  );
}
