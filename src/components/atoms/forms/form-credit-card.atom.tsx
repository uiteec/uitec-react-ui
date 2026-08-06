"use client";

import { Controller, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";

function maskCreditCard(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 16);
  return n.replace(/(\d{4})(?=\d)/g, "$1 ");
}

interface FormCreditCardAtomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function FormCreditCardAtom({ control, name, placeholder = "____ ____ ____ ____", disabled, isInvalid, className }: FormCreditCardAtomProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          value={field.value ?? ""}
          onChange={(e) => field.onChange(maskCreditCard(e.target.value))}
          onBlur={field.onBlur}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={19}
          className={cn("w-full h-10 px-3 rounded-lg text-sm outline-none transition-all tracking-widest", disabled && "opacity-60 cursor-not-allowed", className)}
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
